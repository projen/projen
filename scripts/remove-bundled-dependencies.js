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
const zlib = require('zlib');
const tar = require('tar-stream');

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

async function processTarball() {
  // Read and decompress the tarball
  const gzipData = fs.readFileSync(tarballPath);
  const tarData = zlib.gunzipSync(gzipData);

  // Parse the tar file and collect all entries
  const entries = [];
  let packageJsonEntry = null;
  let packageJsonContent = null;

  const extract = tar.extract();

  return new Promise((resolve, reject) => {
    extract.on('entry', (header, stream, next) => {
      const chunks = [];
      
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      stream.on('end', () => {
        const content = Buffer.concat(chunks);
        
        if (header.name === 'package/package.json') {
          packageJsonEntry = header;
          packageJsonContent = content.toString('utf8');
        } else {
          entries.push({ header, content });
        }
        
        next();
      });
      
      stream.resume();
    });

    extract.on('finish', () => {
      if (!packageJsonContent) {
        reject(new Error('Could not find package/package.json in tarball'));
        return;
      }

      // Parse and modify package.json
      const pkg = JSON.parse(packageJsonContent);

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
          
          // Create new package.json content
          const newPackageJsonContent = JSON.stringify(pkg, null, 2) + '\n';
          const newPackageJsonBuffer = Buffer.from(newPackageJsonContent, 'utf8');
          
          // Update the header size
          packageJsonEntry.size = newPackageJsonBuffer.length;
          
          // Create a new tarball with all entries
          const pack = tar.pack();
          
          // Add all entries except package.json
          for (const { header, content } of entries) {
            pack.entry(header, content);
          }
          
          // Add the modified package.json
          pack.entry(packageJsonEntry, newPackageJsonBuffer);
          
          pack.finalize();
          
          // Collect the new tar data
          const newTarChunks = [];
          pack.on('data', (chunk) => {
            newTarChunks.push(chunk);
          });
          
          pack.on('end', () => {
            const newTarData = Buffer.concat(newTarChunks);
            const newGzipData = zlib.gzipSync(newTarData);
            fs.writeFileSync(tarballPath, newGzipData);
            console.log(`Repacked tarball: ${tarball}`);
            resolve();
          });
        } else {
          console.log('No bundled dependencies to remove');
          resolve();
        }
      } else {
        console.log('No bundled dependencies found, skipping cleanup');
        resolve();
      }
    });

    extract.on('error', reject);
    
    // Write the tar data to the extract stream
    extract.end(tarData);
  });
}

processTarball().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
