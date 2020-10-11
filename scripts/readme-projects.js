const inventory = require('../lib/inventory');

for (const p of inventory.discover()) {
  console.log(`* [${p.pjid}](${p.docsurl}) - ${p.docs}`);
}