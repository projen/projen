#!/usr/bin/env node
/**
 * This script modifies the packed tarball to remove bundled dependencies
 * from the dependencies section of package.json. This prevents consumers
 * from installing dependencies that are already bundled in the package.
 * 
 * This runs as a postpack script, after npm has created the tarball with
 * bundled dependencies included.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// Find the tarball that was just created
const files = fs.readdirSync('.');
const tarball = files.find(f => f.endsWith('.tgz'));

if (!tarball) {
  console.log('No tarball found, skipping bundled dependency cleanup');
  process.exit(0);
}

console.log(`Processing tarball: ${tarball}`);

// Create a temporary directory
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'projen-pack-'));

try {
  // Extract the tarball
  execSync(`tar -xzf ${tarball} -C ${tmpDir}`, { stdio: 'inherit' });
  
  // Read the package.json from the extracted tarball
  const pkgPath = path.join(tmpDir, 'package', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  
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
      console.log(`Removed ${removed} bundled dependencies from tarball package.json`);
      
      // Write the modified package.json back
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      
      // Remove the old tarball
      fs.unlinkSync(tarball);
      
      // Create a new tarball with the modified package.json
      execSync(`tar -czf ${tarball} -C ${tmpDir} package`, { stdio: 'inherit' });
      
      console.log(`Repacked tarball: ${tarball}`);
    }
  }
} finally {
  // Clean up temp directory
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
