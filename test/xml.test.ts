import { Project, Testing, XmlFile } from "../src";

test("simple use", () => {
  // WHEN
  const project = new Project({ name: "my-project" });

  const file = new XmlFile(project, "pom.xml", {
    obj: {
      project: {
        modelVersion: "4.0.0",
        groupId: "com.myorg",
        artifactId: "play-202101050157",
        version: "0.1",
      },
    },
  });

  file.addOverride("project.properties", {
    "project.build.sourceEncoding": "UTF-8",
  });

  // THEN
  expect(Testing.synth(project)["pom.xml"]).toMatchSnapshot();
});
