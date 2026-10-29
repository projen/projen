const fs = require("fs");
const path = require("path");
const api = require("../lib");

process.on("message", async (request) => {
  if (request.kind !== "start") return;
  try {
    let plan;
    if (request.serialized !== undefined) {
      plan = api.SynthesisPlan.deserialize(request.root, request.serialized);
    } else {
      const project = new api.Project({ name: "review", outdir: request.root });
      const files = request.files.map(([name, contents]) =>
        new api.TextFile(project, name, { lines: [contents], marker: false, readonly: false }));
      plan = project.planSynthesis(files);
    }
    if (request.preview) {
      process.send({ event: "done", serialized: plan.serialize(), fingerprint: plan.fingerprint, entries: plan.entries });
      return;
    }
    let held = false;
    const result = await plan.apply({
      afterWrite: async (filePath) => {
        const content = fs.existsSync(path.join(request.root, filePath))
          ? fs.readFileSync(path.join(request.root, filePath)).toString("base64") : null;
        process.send({ event: "written", path: filePath, content });
        if (request.hold && !held) {
          held = true;
          await new Promise((resolve) => {
            function resume(message) {
              if (message.kind === "release") { process.off("message", resume); resolve(); }
            }
            process.on("message", resume);
          });
        }
      },
      onBusy: async () => {
        process.send({ event: "busy" });
        if (request.holdBusy) {
          await new Promise((resolve) => {
            function resume(message) {
              if (message.kind === "releaseBusy") { process.off("message", resume); resolve(); }
            }
            process.on("message", resume);
          });
        }
        if (request.rejectBusy) throw new Error("Observer cancelled while busy");
      },
    });
    process.send({ event: "done", result });
  } catch (error) {
    process.send({ event: "error", code: error.code, message: error.message });
  }
});
process.send({ event: "ready" });
