# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.3](https://github.com/eladb/projen/compare/v0.3.2...v0.3.3) (2020-07-14)


### Features

* allow "init" in a non-empty directory ([a7d3b93](https://github.com/eladb/projen/commit/a7d3b93f2a99984e8ac049af6cf7e4565439ac4b))
* allow configuring eslint ([52f8237](https://github.com/eladb/projen/commit/52f8237838ddc15491c2f0b75c44e9c6a7ee6f94))
* allow configuring jest ([ef5aa9d](https://github.com/eladb/projen/commit/ef5aa9dd0342208fcd2960b7b557ee12cb3e133a))


### Bug Fixes

* "init" should not execute projen ([f94bfe1](https://github.com/eladb/projen/commit/f94bfe15ebdb0d2cb4c12b6e06cc192df2e1c65c))

### [0.3.2](https://github.com/eladb/projen/compare/v0.3.1...v0.3.2) (2020-07-14)


### Features

* **jsii:** do not perform api compatibility check by default ([aefe376](https://github.com/eladb/projen/commit/aefe376ebf771a9a0194004c0aee64b1f391aadc))

### [0.3.1](https://github.com/eladb/projen/compare/v0.3.0...v0.3.1) (2020-07-14)


### Bug Fixes

* security issue with standard-version 8.0.0 ([722ed05](https://github.com/eladb/projen/commit/722ed05ace94270bff0cb93a38948c1a2c7c9142))

## [0.3.0](https://github.com/eladb/projen/compare/v0.2.5...v0.3.0) (2020-07-13)


### ⚠ BREAKING CHANGES

* **typescript:** sources in typescript project are now under `src` instead of `lib`. before upgrading make sure to `mv lib src` so you don't lose any files (`yarn test` also DELETES `lib`).
* **ts:** `options` is now required for `TypescriptConfig`.


By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of your choice.

### Features

* **typescript:** out of tree artifacts (src/lib) ([fef3de3](https://github.com/eladb/projen/commit/fef3de3f004831ad8a06a39fc38c55dcd9c61725))
* generate read-only files ([#16](https://github.com/eladb/projen/issues/16)) ([a108ca4](https://github.com/eladb/projen/commit/a108ca416077cc39234a30b9bc29d2df97b9d40d)), closes [#15](https://github.com/eladb/projen/issues/15)
* projen init ([#12](https://github.com/eladb/projen/issues/12)) ([cd4727c](https://github.com/eladb/projen/commit/cd4727c9dfdfe61dc79d12c39a04c46eb2a1090a))
* **ts:** docgen / more docstrings ([#8](https://github.com/eladb/projen/issues/8)) ([6e11f02](https://github.com/eladb/projen/commit/6e11f02ffb44a89910ee068b15900826b8e06ab6))


### Bug Fixes

* **core:** version / custom outdir ([#7](https://github.com/eladb/projen/issues/7)) ([e85cee6](https://github.com/eladb/projen/commit/e85cee62036305918e79c2e12c67402dfe595b96))

### [0.2.5](https://github.com/eladb/projen/compare/v0.2.4...v0.2.5) (2020-07-05)


### Features

* **license:** copyright period and owner ([7a695a7](https://github.com/eladb/projen/commit/7a695a76460ceb6ee6a8db1e07a34c29a2fbbcae))
* **node,jsii:** authorOrganization ([e773a0d](https://github.com/eladb/projen/commit/e773a0dcab0ace15cabca4db8dbc95924248e7ad))
* **node,jsii:** releaseBranches ([752c080](https://github.com/eladb/projen/commit/752c080ba45da5dcaca9a225ffc787713ffd11c0))

### [0.2.4](https://github.com/eladb/projen/compare/v0.2.3...v0.2.4) (2020-07-05)


### Features

* **eslint:** ignore "coverage" directory ([6249d0e](https://github.com/eladb/projen/commit/6249d0eba49edc484d16c3409694b85a0fe0becf))
* **jsii:** API compatibility checks by default ([d9f6a9a](https://github.com/eladb/projen/commit/d9f6a9a1dd6277522df1d205d7db1f99b4c7fd25))
* **node,jsii:** npmDistTag ([142e591](https://github.com/eladb/projen/commit/142e5918f793784e1c8c80e515b798b598449b0e))

### [0.2.3](https://github.com/eladb/projen/compare/v0.2.2...v0.2.3) (2020-06-23)


### Features

* **typescript:** npm ignore tsconfig.jest.json ([fda5367](https://github.com/eladb/projen/commit/fda53671428782afd674da161c6fde9b459b1816))

### [0.2.2](https://github.com/eladb/projen/compare/v0.2.1...v0.2.2) (2020-06-19)


### Features

* delete "lib/" before running tests and switch the order of compile and test in build ([7b8a846](https://github.com/eladb/projen/commit/7b8a8463eaa9d23012a70eb746be4ccc64f78bf4))
* **jsii:** expose eslint configuration ([3e0b393](https://github.com/eladb/projen/commit/3e0b3938f64da467e363fde8aa4071fe9a9191c5))
* **node:** auto-detect "bin" ([8c42f8e](https://github.com/eladb/projen/commit/8c42f8e180d1bd2c38c35fa3e3efc3581d74f239))


### Bug Fixes

* **eslint:** typescript indent not working ([5eddfa2](https://github.com/eladb/projen/commit/5eddfa2720be33ec61502ddb67bab5ca7bd9414b))
* **jsii:** jest does not include test files ([48e92db](https://github.com/eladb/projen/commit/48e92db9fc0f361a6ba5b95cb8afab1764d325a7))

### [0.2.1](https://github.com/eladb/projen/compare/v0.2.0...v0.2.1) (2020-06-19)


### Bug Fixes

* cannot find module when runninng projen ([86d77b6](https://github.com/eladb/projen/commit/86d77b60e41c14ddb9e63d31a53156b1ed5b10a8))

## [0.2.0](https://github.com/eladb/projen/compare/v0.1.36...v0.2.0) (2020-06-19)


### ⚠ BREAKING CHANGES

* **jsii:** sources in jsii projects are expected to be under `src` while `lib` is only `.d.ts` and `.js` files
* **jest:** jest.globalCoverageThreshold is now 'coverage'

### Features

* **eslint:** consistent quote-props ([2043582](https://github.com/eladb/projen/commit/204358275b2a2c32967c8293f96671c6ac09201a))
* **eslint:** exclude coverage report from npm and git and eslintrc from npm ([ffa9718](https://github.com/eladb/projen/commit/ffa9718d76005fa9e46aa49437ed61eab1483b33))
* **jest:** rename 'globalCoverageThreshold' to 'coverage' ([5ab6608](https://github.com/eladb/projen/commit/5ab6608b029870504e2e0efa36c45133b0436b07))
* **jsii:** move sources to "src" and outputs to "lib" ([2333739](https://github.com/eladb/projen/commit/2333739128cbbb9d9574b60e53491da6bff96aa7))

### [0.1.36](https://github.com/eladb/projen/compare/v0.1.35...v0.1.36) (2020-06-17)


### Features

* **jest:** match only .ts files when typescript is enabled. ([a7b4270](https://github.com/eladb/projen/commit/a7b427035ea4f7a601efbf233440bce67fae51a1))

### [0.1.35](https://github.com/eladb/projen/compare/v0.1.33...v0.1.35) (2020-06-17)


### Features

* **typescript/jsii:** use ts-jest ([e03557d](https://github.com/eladb/projen/commit/e03557dc12b68bb1323ce5c72f070ab281e56f72))

### [0.1.34](https://github.com/eladb/projen/compare/v0.1.33...v0.1.34) (2020-06-17)


### Features

* **typescript/jsii:** use ts-jest ([e03557d](https://github.com/eladb/projen/commit/e03557dc12b68bb1323ce5c72f070ab281e56f72))

### [0.1.33](https://github.com/eladb/projen/compare/v0.1.32...v0.1.33) (2020-06-17)


### Bug Fixes

* **eslint:** File 'tsconfig.json' not found ([211a2a0](https://github.com/eladb/projen/commit/211a2a001ecb5feac7124e4a7586f033b5642878))

### [0.1.32](https://github.com/eladb/projen/compare/v0.1.31...v0.1.32) (2020-06-17)


### Features

* allow specifying explicit node version for GitHub workflow ([d9a2021](https://github.com/eladb/projen/commit/d9a2021ea5feebe6993889fd3a07b2a25487d27c))

### [0.1.31](https://github.com/eladb/projen/compare/v0.1.30...v0.1.31) (2020-06-17)

### [0.1.30](https://github.com/eladb/projen/compare/v0.1.29...v0.1.30) (2020-06-17)


### Bug Fixes

* min node version for jsii 1.6 is 10.3.0 ([5e51dc6](https://github.com/eladb/projen/commit/5e51dc6ea2721142a8c6f6bc3b9eb0f9f8cb9490))

### [0.1.29](https://github.com/eladb/projen/compare/v0.1.28...v0.1.29) (2020-06-17)

### [0.1.28](https://github.com/eladb/projen/compare/v0.1.27...v0.1.28) (2020-06-16)


### Features

* commit synthesized files by default ([a038ef1](https://github.com/eladb/projen/commit/a038ef10f4e64c4bbeaafd1b1081d486fef8fdfe))

### [0.1.27](https://github.com/eladb/projen/compare/v0.1.26...v0.1.27) (2020-06-15)

### [0.1.26](https://github.com/eladb/projen/compare/v0.1.24...v0.1.26) (2020-06-15)

### [0.1.24](https://github.com/eladb/projen/compare/v0.1.23...v0.1.24) (2020-06-15)


### Features

* add --silence-warnings to "watch" ([50077ec](https://github.com/eladb/projen/commit/50077ec4e237fa2f0191be4d86bbf1137fd3a382))
* feature bundle ([6a23f20](https://github.com/eladb/projen/commit/6a23f2097d7a67471772727eca2c12df8f29e36c))

### [0.1.23](https://github.com/eladb/projen/compare/v0.1.22...v0.1.23) (2020-06-15)


### Features

* initial readme ([613c7e2](https://github.com/eladb/projen/commit/613c7e245d87c2809fde6aa98ebb565e74b25562))

### [0.1.22](https://github.com/eladb/projen/compare/v0.1.21...v0.1.22) (2020-06-14)


### Features

* upgrade to jsii-docgenn ^1.3.2 ([5f807b5](https://github.com/eladb/projen/commit/5f807b5c502e2bc0a1e5303b19a04cd04066a532))

### [0.1.21](https://github.com/eladb/projen/compare/v0.1.20...v0.1.21) (2020-06-14)


### Features

* **node:** anti-tamper during ci builds ([a7f6230](https://github.com/eladb/projen/commit/a7f62309a15ac99069261b129747a60a897de464))
* **node:** keywords ([5acfada](https://github.com/eladb/projen/commit/5acfadafcf7de4c148485e73831b3abf8f3862bb))

### [0.1.20](https://github.com/eladb/projen/compare/v0.1.19...v0.1.20) (2020-06-14)


### Features

* **jsii:** auto-generate API.md using jsii-docgen ([facad6a](https://github.com/eladb/projen/commit/facad6af84a3d6bb64732adfcd0da78a5e092c81))

### [0.1.19](https://github.com/eladb/projen/compare/v0.1.18...v0.1.19) (2020-06-14)


### Features

* **node:** support disabling GitHub workflows ([f12ab7a](https://github.com/eladb/projen/commit/f12ab7a18fb18b3d8b745c84e443f6e64e30ed21))

### [0.1.18](https://github.com/eladb/projen/compare/v0.1.17...v0.1.18) (2020-06-09)

### [0.1.17](https://github.com/eladb/projen/compare/v0.1.16...v0.1.17) (2020-05-25)


### Bug Fixes

* unable to publish to npm ([692555e](https://github.com/eladb/projen/commit/692555e570ae1dcec855bbcdecc35edf83fd1404))

### [0.1.16](https://github.com/eladb/projen/compare/v0.1.15...v0.1.16) (2020-05-25)


### Features

* typescript projects ([a5d302e](https://github.com/eladb/projen/commit/a5d302e79165db8cd0c1c6d3b28886193deccabd))

### [0.1.15](https://github.com/eladb/projen/compare/v0.1.14...v0.1.15) (2020-05-18)


### Features

* mergify ([5974506](https://github.com/eladb/projen/commit/5974506b281f7204dcef41e712614d8600da9b39))

### [0.1.14](https://github.com/eladb/projen/compare/v0.1.13...v0.1.14) (2020-05-12)


### Features

* add "projen:upgrade" command ([a1aa633](https://github.com/eladb/projen/commit/a1aa633716881fab4cde0fc94a527b0c7502807f))


### Bug Fixes

* license file should be in the repo ([d01409f](https://github.com/eladb/projen/commit/d01409f5a25676f9be6b4b3ee32cf525b8351379))

### [0.1.13](https://github.com/eladb/projen/compare/v0.1.12...v0.1.13) (2020-05-12)


### Features

* jest support ([631adfc](https://github.com/eladb/projen/commit/631adfc94b537c0e849a726b489611677f686567))

### [0.1.12](https://github.com/eladb/projen/compare/v0.1.11...v0.1.12) (2020-05-12)


### Bug Fixes

* ts-eslint-parser requires json-schema ([456040e](https://github.com/eladb/projen/commit/456040e325e86ad93843668d926c9fedcc2b0e09))

### [0.1.11](https://github.com/eladb/projen/compare/v0.1.10...v0.1.11) (2020-05-12)


### Bug Fixes

* unable to install projen in workflow ([a956f4e](https://github.com/eladb/projen/commit/a956f4e13d343ae2d33d9e9f303c0d4f2ab1ff48))

### [0.1.10](https://github.com/eladb/projen/compare/v0.1.9...v0.1.10) (2020-05-12)


### Features

* allow specifying GitHub workflow bootstrap options ([55b2f73](https://github.com/eladb/projen/commit/55b2f73b3cb28cbc18e2b25aad4e51297ed02e06))

### [0.1.9](https://github.com/eladb/projen/compare/v0.1.8...v0.1.9) (2020-05-12)


### Features

* add "release" script (bump + push) ([91e8673](https://github.com/eladb/projen/commit/91e8673628e1ce4fe2df30c77b01a47c0cd5905b))
* rename projen.js to .projenrc.js ([63a4538](https://github.com/eladb/projen/commit/63a45384552e9e26fcece2adc51112295cfa0281))
* support bootstrapping from an empty repo ([b38a6dc](https://github.com/eladb/projen/commit/b38a6dce56b9dec8a142bd012afbafc7c8aff1f8))

### [0.1.8](https://github.com/eladb/projen/compare/v0.1.7...v0.1.8) (2020-05-12)


### Features

* do not commit most generated files ([fcc9fcc](https://github.com/eladb/projen/commit/fcc9fcc893ca151ac1cf2ead73d0e4aadff6cfb5))
* support committing package.json at the project level ([3ff069c](https://github.com/eladb/projen/commit/3ff069c2590884bc100349066f15ea0fcb11d997))


### Bug Fixes

* missing typescript (peer of eslint) ([dd31348](https://github.com/eladb/projen/commit/dd313480e0c9319825ce3918e74df780c9030cb8))

### [0.1.7](https://github.com/eladb/projen/compare/v0.1.6...v0.1.7) (2020-05-11)


### Features

* allow tokens in rendered files ([0876dcd](https://github.com/eladb/projen/commit/0876dcd85c7221faa02be6a7890818cf2108ea4e))
* eslint npm script ([dae0c83](https://github.com/eladb/projen/commit/dae0c83ed1530f4293ad709f4c7fb44e51d69d59))
* nodeProject.addTestCommands(...commands) ([5a08eb0](https://github.com/eladb/projen/commit/5a08eb059b2e8cddace44bb2f7ed5719e4eaef59))
* run eslint as a test ([d873704](https://github.com/eladb/projen/commit/d8737040d6a977047193f2d905d17f01d2c2b360))

### [0.1.6](https://github.com/eladb/projen/compare/v0.1.5...v0.1.6) (2020-05-11)


### Bug Fixes

* version.json file corrupted ([99018a9](https://github.com/eladb/projen/commit/99018a9513749d95b98a2a51bd7ad549aeb92536))

### [0.1.5](https://github.com/eladb/projen/compare/v0.1.4...v0.1.5) (2020-05-11)


### Bug Fixes

* actually export all types ([5bcdd75](https://github.com/eladb/projen/commit/5bcdd75712ea9477677c41a4e3cd06215ef50490))

### [0.1.4](https://github.com/eladb/projen/compare/v0.1.3...v0.1.4) (2020-05-11)


### Features

* automatically install projen as a dev-dependency ([2d4fa5c](https://github.com/eladb/projen/commit/2d4fa5c09d3b1979befcdb045fc113dc81d30870))

### [0.1.3](https://github.com/eladb/projen/compare/v0.1.2...v0.1.3) (2020-05-11)


### Bug Fixes

* "projen" cli does not work ([25d4714](https://github.com/eladb/projen/commit/25d4714761256bea59789fafa325d0c77fff38c6))

### [0.1.2](https://github.com/eladb/projen/compare/v0.1.1...v0.1.2) (2020-05-11)


### Features

* store & bump version in version.json ([a861b00](https://github.com/eladb/projen/commit/a861b00bff724ae03ace306d20f93766407631ed))

### 0.1.1 (2020-05-11)


### Features

* projen cli ([e05f6d4](https://github.com/eladb/projen/commit/e05f6d4e54e6998ac209ca20854d3a9da3f554d2))
* support "bin" in node projects ([6e77ffb](https://github.com/eladb/projen/commit/6e77ffb5a072ad7f01e0990bcc693532d85f9b41))
* update disclaimer to include instructions ([250a856](https://github.com/eladb/projen/commit/250a8562687a5b851f6f788e9b897fdd45e30dbb))

## 1.1.0 (2020-05-10)


### Features

* install deps with fronzen lockfile ([6697dd4](https://github.com/eladb/jsii-library-template/commit/6697dd43ee9be647bb8f379e0d76100f13c697a8))

## 1.0.0 (2020-05-10)

Initial release
