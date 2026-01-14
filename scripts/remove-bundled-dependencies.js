#!/usr/bin/env node
/**
 * This script modifies the packed tarball to remove bundled dependencies
 * from the dependencies section of package.json. This prevents consumers
 * from installing dependencies that are already bundled in the package.
 * 
 * Usage: node scripts/remove-bundled-dependencies.js <directory>
 * Example: node scripts/remove-bundled-dependencies.js dist/js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// Get directory from command line argument
const targetDir = process.argv[2];
if (!targetDir) {
  console.error('Error: Directory argument required');
  console.error('Usage: node scripts/remove-bundled-dependencies.js <directory>');
  process.exit(1);
}

const fullPath = path.resolve(targetDir);
if (!fs.existsSync(fullPath)) {
  console.error(`Error: Directory not found: ${fullPath}`);
  process.exit(1);
}

// Find the projen tarball
const files = fs.readdirSync(fullPath);
const tarball = files.find(f => f.startsWith('projen@') && f.endsWith('.tgz'));

if (!tarball) {
  console.log('No projen tarball found, skipping bundled dependency cleanup');
  process.exit(0);
}

const tarballPath = path.join(fullPath, tarball);
console.log(`Processing tarball: ${tarball}`);

// Create a temporary directory for working files
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'projen-pack-'));

try {
  const tarPath = path.join(tmpDir, 'archive.tar');
  
  // Step 1: Decompress the gzip file
  execSync(`gzip -d -c "${tarballPath}" > "${tarPath}"`, { stdio: 'pipe' });
  
  // Step 2: Extract only package.json from the tar file
  const pkgJsonPath = path.join(tmpDir, 'package.json');
  execSync(`tar -xf "${tarPath}" -C "${tmpDir}" --strip-components=1 package/package.json`, { stdio: 'pipe' });
  
  if (!fs.existsSync(pkgJsonPath)) {
    console.error('Error: Could not find package/package.json in tarball');
    process.exit(1);
  }
  
  // Step 3: Read and modify package.json
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  
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
      
      // Step 4: Write the modified package.json
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');
      
      // Step 5: Create the directory structure for tar
      const packageDir = path.join(tmpDir, 'package');
      fs.mkdirSync(packageDir);
      fs.renameSync(pkgJsonPath, path.join(packageDir, 'package.json'));
      
      // Step 6: Update the tar file with the modified package.json
      execSync(`tar -uf "${tarPath}" -C "${tmpDir}" package/package.json`, { stdio: 'pipe' });
      
      // Step 7: Recompress the tar file
      execSync(`gzip "${tarPath}"`, { stdio: 'pipe' });
      
      // Step 8: Replace the original tarball
      fs.renameSync(`${tarPath}.gz`, tarballPath);
      
      console.log(`Repacked tarball: ${tarball}`);
    } else {
      console.log('No bundled dependencies to remove');
    }
  } else {
    console.log('No bundled dependencies found, skipping cleanup');
  }
} finally {
  // Clean up temp directory
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
