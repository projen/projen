#!/usr/bin/env node

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypes = void 0;

const fs = require('node:fs')
const path = require('node:path')
const json2ts = require('json-schema-to-typescript')

const createTypes = async (
  typesFile = path.join(__dirname, '..', 'src', 'javascript', 'biome', 'biome-config.ts'),
) => {
  const biomePackagePath = path.join(
        __dirname,
        '..',
        'node_modules',
        '@biomejs',
        'biome',
      );
  const biomeVersion = JSON.parse(fs.readFileSync(path.join(biomePackagePath, 'package.json'), 'utf8')).version;

  const versionString = `// Types for Biome version: ${biomeVersion}`;
  
  // Update types only if there are changes on version
  if (!fs.existsSync(typesFile) || !fs.readFileSync(typesFile, 'utf8').includes(versionString)) {
    const types = (
      await json2ts.compileFromFile(
        path.join(
          biomePackagePath,
          'configuration_schema.json',
        ),
        {
          customName: (_schema, keyName) => {
            const name = keyName ?? _schema.title ?? _schema.$id
            if (!name) {
              return undefined
            }
            return `I${name}`
          },
        },
      )
    )
      // JSII doesn't like optional values that can also be null
      .replace(/(\?:.*) \| null;/g, '$1;')
      // Removing or undefined, as that should be optional in TS sense like it is marked also
      .replace(/ \| undefined/g, '')
      // JSII wants interfaces with PascalCase
      .replace(/IA11Y/g, 'IA11y')
      // Change type to be OK for JSII
      .replace('boolean | [number, ...number[]]', 'boolean | number[]')
      .replace('$schema', '//$schema')
    fs.writeFileSync(typesFile, [
      versionString,
      types
    ].join('\n'));
    console.log(`Types file was generated from version ${biomeVersion}`)
  } else {
    console.log(`Types file was already valid for version ${biomeVersion}`)
  }
}

createTypes();

exports.createTypes = createTypes;