const fs = require('fs');
const path = require('path');

function sortGroupsInFrontOfTLTopics(a, b) {
  if (a.label === 'projen') return -1;
  if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
  if (a.label.toLowerCase() === b.label.toLowerCase()) return 0;
  if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
}


function getSidebarItems(allFilenames) {
  return allFilenames.reduce((acc, curr) => {
    const [subModule] = curr.replace('api/').split('.');

    const extensionStrippedFilename = curr.replace('.md', '');
    const itemPath = `api/${extensionStrippedFilename}`;

    acc[curr] = {
      type: 'doc',
      id: itemPath,
      label: subModule, // because this is actually the class name for TLC
    };
    return acc;


  }, {});
}


module.exports = () => {
  const apiDirs = fs.readdirSync(path.join(__dirname, '..', 'docs', 'api'));
  const sidebarItems = getSidebarItems(apiDirs);
  return Object.values(sidebarItems).sort(sortGroupsInFrontOfTLTopics);
};
