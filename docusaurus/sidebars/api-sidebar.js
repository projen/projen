const fs = require('fs');
const path = require('path');

function sortGroupsInFrontOfTLTopics(a, b) {
  if (a.type === 'category' && b.type === 'doc') return -1;
  if (a.type === 'doc' && b.type === 'category') return 1;
  if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
  if (a.label.toLowerCase() === b.label.toLowerCase()) return 0;
  if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
}


function getSidebarItems(allFilenames) {
  return allFilenames.reduce((acc, curr) => {
    const [_projen, subModule, className, extension] = curr.replace('api/').split('.');
    const isTopLevel = extension === undefined;
    const extensionStrippedFilename = curr.replace('.md', '');
    const itemPath = `api/${extensionStrippedFilename}`;

    if (isTopLevel) {
      acc[curr] = {
        type: 'doc',
        id: itemPath,
        label: subModule, // because this is actually the class name for TLC
      };
      return acc;
    }
    if (!acc[subModule]) acc[subModule] = {
      type: 'category',
      label: subModule,
      collapsed: true,
      items: []
    };
    acc[subModule].items.push({
      type: 'doc',
      id: itemPath,
      label: className, // because this is actually the class name for TLC
    });
    return acc;
  }, {});
}


module.exports = () => {
  const apiDirs = fs.readdirSync(path.join(__dirname, '..', 'docs', 'api'))
    .filter(x => x !== '_category_.json' && x !== 'projen.md');
  const sidebarItems = getSidebarItems(apiDirs);
  return Object.values(sidebarItems).sort(sortGroupsInFrontOfTLTopics);
};
