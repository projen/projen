#!/usr/bin/env node
/**
 * This script removes bundled dependencies from the dependencies section
 * of package.json during the pack process. This prevents consumers from
 * installing dependencies that are already bundled in the package.
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (pkg.bundledDependencies && pkg.bundledDependencies.length > 0) {
  const bundled = new Set(pkg.bundledDependencies);
  const originalDepsCount = Object.keys(pkg.dependencies || {}).length;
  
  // Remove bundled dependencies from dependencies
  if (pkg.dependencies) {
    for (const dep of bundled) {
      if (pkg.dependencies[dep]) {
        delete pkg.dependencies[dep];
      }
    }
  }
  
  const newDepsCount = Object.keys(pkg.dependencies || {}).length;
  const removed = originalDepsCount - newDepsCount;
  
  if (removed > 0) {
    console.log(`Removed ${removed} bundled dependencies from dependencies array`);
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
  }
}
