const path = require("path");
const libtest = "lib/__tests__";
const srctest= "src/__tests__";
module.exports = {
  resolveSnapshotPath: (test, ext) => {
                const fullpath = test.replace(libtest, srctest);
                return path.join(path.dirname(fullpath), '__snapshots__', path.basename(fullpath, '.js') + '.ts' + ext);
            },
  resolveTestPath: (snap, ext) => {
                const filename = path.basename(snap, '.ts' + ext) + '.js';
                const dir = path.dirname(path.dirname(snap)).replace(srctest, libtest);
                return path.join(dir, filename);
            },
  testPathForConsistencyCheck: path.join('some', '__tests__', 'example.test.js')
};