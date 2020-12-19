# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.6.17 (2020-12-19)


### Features

* **gitpod:** Support Gitpod ([#360](https://github.com/projen/projen/issues/360)) ([8be15d6](https://github.com/projen/projen/commit/8be15d60ee5a5738c3a851c87a507ce8a5de9ac6))

### 0.6.16 (2020-12-17)

### 0.6.15 (2020-12-17)


### Bug Fixes

* fix sample code for specify app entrypoint ([#365](https://github.com/projen/projen/issues/365)) ([0a0797c](https://github.com/projen/projen/commit/0a0797c81c40d3398650713937832879a0fa06b0))

### 0.6.14 (2020-12-17)


### Bug Fixes

* tasks not executing on Windows due to invalid PATH values ([#377](https://github.com/projen/projen/issues/377)) ([5af18db](https://github.com/projen/projen/commit/5af18db8aef84c0e96832b18e6864701bee747d5)), closes [#370](https://github.com/projen/projen/issues/370)

### 0.6.13 (2020-12-16)

### 0.6.12 (2020-12-14)

### 0.6.11 (2020-12-14)

### 0.6.10 (2020-12-11)

### 0.6.9 (2020-12-11)

### 0.6.8 (2020-12-07)

### 0.6.7 (2020-12-07)

### 0.6.6 (2020-12-06)


### Bug Fixes

* **node:** rebuild-bot does not work on forks ([edaf1c4](https://github.com/projen/projen/commit/edaf1c415503e44f1995760145996a1700b8cfcd))

### 0.6.5 (2020-12-06)


### Bug Fixes

* **node:** CI always evaluated as true ([#353](https://github.com/projen/projen/issues/353)) ([e4f0c8a](https://github.com/projen/projen/commit/e4f0c8a6c7a82d2d400766940dcea6d244a49675)), closes [#352](https://github.com/projen/projen/issues/352)

### 0.6.4 (2020-12-05)

### 0.6.3 (2020-12-04)


### Features

* Add VSCodeLaunchConfiguration ([#316](https://github.com/projen/projen/issues/316)) ([83b30cc](https://github.com/projen/projen/commit/83b30cc139aa7c2ee1911c61a6bf20912b460b85)), closes [#314](https://github.com/projen/projen/issues/314)

### 0.6.2 (2020-12-04)


### Bug Fixes

* **node:** rebuild-bot did not commit files ([#350](https://github.com/projen/projen/issues/350)) ([59bfb47](https://github.com/projen/projen/commit/59bfb4755f7cb74c5345eb37cdec6827ef898aba))

### 0.6.1 (2020-12-03)

## 0.6.0 (2020-12-02)


### ⚠ BREAKING CHANGES

* **node:** `bootstrapTask` is no longer available. To obtain the bootstrapping steps for GitHub workflows, use `installWorkflowSteps`.
* **node:** the `workflowBootstrapSteps` is no longer available. The equivalent is `[ { uses: 'actions/checkout@v2' }, project.installWorkflowSteps ]`.
* **node:** the `NodeBuildWorkflowOptions` struct is no now internal.

### Features

* **node:** rebuild bot ([#349](https://github.com/projen/projen/issues/349)) ([b891fb7](https://github.com/projen/projen/commit/b891fb7cf8720b862142d5451f5c6b697aa8d50c))

### 0.5.10 (2020-12-02)


### Bug Fixes

* **cli:** git setup not creating initial repo ([#346](https://github.com/projen/projen/issues/346)) ([2558c5c](https://github.com/projen/projen/commit/2558c5c84bd7361e231ffb5265968a0beda7d349))

### 0.5.9 (2020-12-02)


### Bug Fixes

* project setup fails when git config is not set ([#348](https://github.com/projen/projen/issues/348)) ([1408517](https://github.com/projen/projen/commit/1408517271ba899d31059a853470b965cdc8cd55)), closes [#344](https://github.com/projen/projen/issues/344)

### 0.5.8 (2020-12-01)


### Features

* lint .projenrc.js ([#343](https://github.com/projen/projen/issues/343)) ([1f39d12](https://github.com/projen/projen/commit/1f39d12d6d31b5d63540a5b5882dc98e5411b959))

### 0.5.7 (2020-12-01)


### Features

* projen tasks ([#337](https://github.com/projen/projen/issues/337)) ([9511227](https://github.com/projen/projen/commit/95112272c2b192144293c1064c77b2d8da354b8f))

### 0.5.6 (2020-11-30)


### Features

* **cli:** add switch for post-synthesis operations ([#339](https://github.com/projen/projen/issues/339)) ([08dbee1](https://github.com/projen/projen/commit/08dbee185881ff87761c1c848b5db926d9e3be34)), closes [#322](https://github.com/projen/projen/issues/322)

### 0.5.5 (2020-11-29)


### Features

* Add version pinning option to construct project ([#340](https://github.com/projen/projen/issues/340)) ([a6dc7cb](https://github.com/projen/projen/commit/a6dc7cb0b990178082acec2bb3b51857034eb79b))

### 0.5.4 (2020-11-28)


### Features

* create github repository ([#336](https://github.com/projen/projen/issues/336)) ([5590e08](https://github.com/projen/projen/commit/5590e0838b202de1902f1ab697be5296192bb85d)), closes [#310](https://github.com/projen/projen/issues/310)

### 0.5.3 (2020-11-26)


### Features

* **nextjs:** add tailwindcss option ([#326](https://github.com/projen/projen/issues/326)) ([e02eb65](https://github.com/projen/projen/commit/e02eb650256b2a3f6421b42629ed8e5e4d654642)), closes [#325](https://github.com/projen/projen/issues/325)

### 0.5.2 (2020-11-25)


### Bug Fixes

* **new:** cannot pass string paramaeters as CLI switches ([#335](https://github.com/projen/projen/issues/335)) ([db51548](https://github.com/projen/projen/commit/db515481e14a59ec014209e082c57496a56dc769)), closes [#305](https://github.com/projen/projen/issues/305)

### 0.5.1 (2020-11-24)


### Bug Fixes

* github/vscode accessors should not be available in subprojects ([#333](https://github.com/projen/projen/issues/333)) ([0a06f75](https://github.com/projen/projen/commit/0a06f751e05e0dbc81966fcc09bfcba0fe981690))

## 0.5.0 (2020-11-24)


### ⚠ BREAKING CHANGES

* there are multiple breaking changes in in how github components are used.

### Features

* consolidate github capabilities behind a centralized api ([#319](https://github.com/projen/projen/issues/319)) ([19815c1](https://github.com/projen/projen/commit/19815c19c8aa6185311dd2851510c7bb91abb120)), closes [#318](https://github.com/projen/projen/issues/318)

## 0.4.0 (2020-11-24)


### ⚠ BREAKING CHANGES

* The `CompositeProject` and `ProjectComponent` classes have been superseded by subprojects in order to allow safely accessing the parent project during subproject initialization phase. Use `new Project({ parent, outdir })` to define this relationship.
* The various `synth()` methods no longer accept an `outdir`. Instead, specify `outdir` in the project options.

### Features

* subprojects ([#332](https://github.com/projen/projen/issues/332)) ([53244ae](https://github.com/projen/projen/commit/53244aef42258344c90e5f08241cb61c2e4566b6)), closes [#289](https://github.com/projen/projen/issues/289)

### 0.3.178 (2020-11-23)


### Features

* add full jest config support ([#331](https://github.com/projen/projen/issues/331)) ([a3d1ed0](https://github.com/projen/projen/commit/a3d1ed09a038f45385546dadbe182b6f268ce042)), closes [#320](https://github.com/projen/projen/issues/320) [/github.com/facebook/jest/blob/master/packages/jest-types/src/Config.ts#L118](https://github.com/projen//github.com/facebook/jest/blob/master/packages/jest-types/src/Config.ts/issues/L118) [#320](https://github.com/projen/projen/issues/320)

### 0.3.177 (2020-11-23)


### Bug Fixes

* **composite-project:** prevent child NodeProjects failure during synth ([#324](https://github.com/projen/projen/issues/324)) ([ee9af0e](https://github.com/projen/projen/commit/ee9af0efa037d6dc23b43f93bd7c51a3d3bf2117)), closes [#323](https://github.com/projen/projen/issues/323)

### 0.3.176 (2020-11-23)

### 0.3.175 (2020-11-23)

### 0.3.174 (2020-11-23)


### Bug Fixes

* **cdk8s-construct:** converts cdk8s-plus to cdk8s-plus-17 AND bumps constructs ([#329](https://github.com/projen/projen/issues/329)) ([333948e](https://github.com/projen/projen/commit/333948efc8fee629b0e0ed17648bf5fa6f81cb55)), closes [/github.com/awslabs/cdk8s/blob/master/CHANGELOG.md#100-beta1-2020-11-18](https://github.com/projen//github.com/awslabs/cdk8s/blob/master/CHANGELOG.md/issues/100-beta1-2020-11-18) [#327](https://github.com/projen/projen/issues/327)

### 0.3.173 (2020-11-18)

### 0.3.172 (2020-11-17)

### 0.3.171 (2020-11-17)


### Features

* **jest:** test results processing ([#279](https://github.com/projen/projen/issues/279)) ([453ad63](https://github.com/projen/projen/commit/453ad63194cfd4862ef624401cf80aa57ba61db6)), closes [#278](https://github.com/projen/projen/issues/278)

### 0.3.170 (2020-11-16)


### Bug Fixes

* cdk app starter test code syntax and linting errors ([#312](https://github.com/projen/projen/issues/312)) ([e574217](https://github.com/projen/projen/commit/e5742171a97bd40797953926a0e8af181c7175a3))

### 0.3.169 (2020-11-15)


### Features

* prefer ts files for ts-node ([#308](https://github.com/projen/projen/issues/308)) ([4dd57aa](https://github.com/projen/projen/commit/4dd57aa59c7df7c6a7dd127b542a44067af0a733))

### 0.3.168 (2020-11-15)

### 0.3.167 (2020-11-12)


### Bug Fixes

* add missing yaml export ([#303](https://github.com/projen/projen/issues/303)) ([90c853c](https://github.com/projen/projen/commit/90c853c82ced3b560cb9381d7eb7350ddec3ce94))

### 0.3.166 (2020-11-12)


### Bug Fixes

* **typescript:** typescript uses semi colons ([#302](https://github.com/projen/projen/issues/302)) ([6f7f725](https://github.com/projen/projen/commit/6f7f7258941eb0e89c5ac7d922b541804dfb98d7)), closes [#203](https://github.com/projen/projen/issues/203) [#203](https://github.com/projen/projen/issues/203)

### 0.3.165 (2020-11-11)


### Bug Fixes

* CompositeProject tests reference unreleased projen version after bump ([#300](https://github.com/projen/projen/issues/300)) ([0c2382e](https://github.com/projen/projen/commit/0c2382eb282600dac7c8d5af1ef333054a398b9e)), closes [#289](https://github.com/projen/projen/issues/289)

### 0.3.164 (2020-11-10)


### Bug Fixes

* **cli:** new --from scoped packages is broken ([#297](https://github.com/projen/projen/issues/297)) ([97bd338](https://github.com/projen/projen/commit/97bd338146b2c9e90c4114714d71979131467a02)), closes [#296](https://github.com/projen/projen/issues/296)

### 0.3.163 (2020-11-10)


### Bug Fixes

* **awscdk-construct:** constructs 3.2.0 is required for latest CDK ([#291](https://github.com/projen/projen/issues/291)) ([51e34e2](https://github.com/projen/projen/commit/51e34e2291195f8c91131f5ddbb869f15089cc73)), closes [#290](https://github.com/projen/projen/issues/290)

### 0.3.162 (2020-11-09)

### 0.3.161 (2020-11-09)

### 0.3.160 (2020-11-08)


### Features

* codecov.io ([#266](https://github.com/projen/projen/issues/266)) ([24f2dc6](https://github.com/projen/projen/commit/24f2dc603719af4526cbb1358078a769920fb7b6))

### 0.3.159 (2020-11-08)


### Features

* **eslint:** add file extension and ignore pattern options ([#288](https://github.com/projen/projen/issues/288)) ([ebe65fa](https://github.com/projen/projen/commit/ebe65fa0c7e0dfe19662248f7095e78fa32ad1f9))

### 0.3.158 (2020-11-08)


### Features

* README samples (again) ([#276](https://github.com/projen/projen/issues/276)) ([1a34ca8](https://github.com/projen/projen/commit/1a34ca81602a01cc46193a9eae1d062e78e218cf))

### 0.3.157 (2020-11-08)

### 0.3.156 (2020-11-06)

### 0.3.155 (2020-11-05)


### Features

* **license:** adds some common licenses ([#264](https://github.com/projen/projen/issues/264)) ([20615c3](https://github.com/projen/projen/commit/20615c3637fa82b802b68aca70513893b8b06343))

### 0.3.154 (2020-11-05)

### 0.3.153 (2020-11-03)

### 0.3.152 (2020-11-03)


### Bug Fixes

* **eslint:** Fixes [#273](https://github.com/projen/projen/issues/273) by adding `--no-error-on-unmatched-pattern` to match `jest --passWithNoTests` ([#274](https://github.com/projen/projen/issues/274)) ([46340a8](https://github.com/projen/projen/commit/46340a8c121aee0b58fdd98dd64fc6141e1fedf9))

### 0.3.151 (2020-11-03)


### Bug Fixes

* cannot read property version of undefined ([4dca5be](https://github.com/projen/projen/commit/4dca5be6af24550cf645f8dd0423e644ca4848f6))

### 0.3.150 (2020-11-03)

### 0.3.149 (2020-11-03)

### 0.3.148 (2020-11-03)


### Bug Fixes

* macro values are unquoted ([a180b6a](https://github.com/projen/projen/commit/a180b6a22b6bdf18d273f105917d4c92bc998d3b))

### 0.3.147 (2020-11-03)


### Bug Fixes

* non-default assigned values are double-quoted ([52c2c9b](https://github.com/projen/projen/commit/52c2c9b20cadacf1b62797b0301e428fd653c969)), closes [#272](https://github.com/projen/projen/issues/272)

### 0.3.146 (2020-11-03)

### 0.3.145 (2020-11-03)


### Bug Fixes

* **cli:** improve git config detection ([#270](https://github.com/projen/projen/issues/270)) ([de229f9](https://github.com/projen/projen/commit/de229f951305e1498316856fc0737cc68c003038))

### 0.3.144 (2020-11-03)


### Features

* README samples ([#203](https://github.com/projen/projen/issues/203)) ([28e85dc](https://github.com/projen/projen/commit/28e85dc54d5900b8802a3de9d60ebc8252caae9e))

### 0.3.143 (2020-11-03)


### Features

* initialize projenrc.js with commented options ([#227](https://github.com/projen/projen/issues/227)) ([b868fa3](https://github.com/projen/projen/commit/b868fa3e2612e74accba1ed497102642364a65a5)), closes [#168](https://github.com/projen/projen/issues/168)

### 0.3.142 (2020-11-03)

### 0.3.141 (2020-11-01)

### 0.3.140 (2020-11-01)

### 0.3.139 (2020-11-01)


### Bug Fixes

* **node:** fixes spelling issues in comments ([#254](https://github.com/eladb/projen/issues/254)) ([3a68deb](https://github.com/eladb/projen/commit/3a68deb759fac51c1a43fa8a73edf3a04d89eb03))

### 0.3.138 (2020-10-30)

### 0.3.137 (2020-10-29)


### Features

* **scripts:** adds `destroy` -> cdk destroy for awscdk-app-ts ([#248](https://github.com/eladb/projen/issues/248)) ([bd56136](https://github.com/eladb/projen/commit/bd56136f2d8facd770673db09efadf8f62a3ea52))

### 0.3.136 (2020-10-29)

### 0.3.135 (2020-10-28)


### Features

* updates to awscdk-construct documentation ([3ae3e09](https://github.com/eladb/projen/commit/3ae3e0996259356515d37d8fefcae58b83525d11))

### 0.3.134 (2020-10-28)

### 0.3.133 (2020-10-27)


### Features

* **node:** deprecate "xxxDependencies" in favor of "xxxDeps" (warning) ([a9f3890](https://github.com/eladb/projen/commit/a9f3890fbabcb12db3b4ee30d1d1327ef3dca3ff))

### 0.3.132 (2020-10-27)


### Bug Fixes

* duplicate "sampleCode" options in next/react projects ([0efba69](https://github.com/eladb/projen/commit/0efba69b33f937572f625d6e7295b5c5705ab8cc))

### 0.3.131 (2020-10-27)


### Features

* add .idea to .npmignore for webstorm developers ([#236](https://github.com/eladb/projen/issues/236)) ([4e6382a](https://github.com/eladb/projen/commit/4e6382afe12269337e62cd775739c94b6cebbacb)), closes [#222](https://github.com/eladb/projen/issues/222)

### 0.3.130 (2020-10-27)


### Features

* add support for docker-compose.yml ([#230](https://github.com/eladb/projen/issues/230)) ([f385c45](https://github.com/eladb/projen/commit/f385c4538ffb13b53cbd18c64722cf9ea83caa5b))

### 0.3.129 (2020-10-27)

### 0.3.128 (2020-10-26)

### 0.3.127 (2020-10-26)

### 0.3.126 (2020-10-26)


### Bug Fixes

* **react:** build error caused by API change ([#235](https://github.com/eladb/projen/issues/235)) ([d2bfb25](https://github.com/eladb/projen/commit/d2bfb25cc1685a90d585c6e26ffaca3f9a411760)), closes [#228](https://github.com/eladb/projen/issues/228) [#229](https://github.com/eladb/projen/issues/229)

### 0.3.125 (2020-10-26)

### 0.3.124 (2020-10-25)


### Bug Fixes

* **typescript:** compilerOptions merging properly ([#226](https://github.com/eladb/projen/issues/226)) ([81b4e41](https://github.com/eladb/projen/commit/81b4e41c8f16ab203179ad661c1ae3a74a969fc5)), closes [#221](https://github.com/eladb/projen/issues/221)

### 0.3.123 (2020-10-25)

### 0.3.122 (2020-10-23)


### Features

* typescript nextjs projects ([#197](https://github.com/eladb/projen/issues/197)) ([68e5206](https://github.com/eladb/projen/commit/68e5206ab781a2dee68394f6ccb106b986262234))

### 0.3.121 (2020-10-23)


### Features

* projects from external modules (--from) ([#212](https://github.com/eladb/projen/issues/212)) ([abae45f](https://github.com/eladb/projen/commit/abae45f8a56cadc2e9651c68be2568dd430f833e))

### 0.3.120 (2020-10-23)

### 0.3.119 (2020-10-22)


### Features

* **makefile:** add support for makefiles ([#199](https://github.com/eladb/projen/issues/199)) ([35406a9](https://github.com/eladb/projen/commit/35406a9f17e6e93c3eff0636e8091704fa6340d4))

### 0.3.118 (2020-10-22)

### 0.3.117 (2020-10-21)

### 0.3.116 (2020-10-20)


### Features

* **awscdk-construct:** documentation ([#179](https://github.com/eladb/projen/issues/179)) ([4624e36](https://github.com/eladb/projen/commit/4624e362047ff055f7dac306038ec01c72f50e85))

### 0.3.115 (2020-10-20)

### 0.3.114 (2020-10-19)

### 0.3.113 (2020-10-18)


### Bug Fixes

* **node:** wrong npmIgnore field used ([#181](https://github.com/eladb/projen/issues/181)) ([4bb4c9d](https://github.com/eladb/projen/commit/4bb4c9dbe6df632cfdc3f06a7e209af8ba1fc7b8)), closes [#139](https://github.com/eladb/projen/issues/139)

### 0.3.112 (2020-10-16)

### 0.3.111 (2020-10-15)

### 0.3.110 (2020-10-14)

### 0.3.109 (2020-10-13)


### Features

* **nextjs:** add support for nextjs projects ([#167](https://github.com/eladb/projen/issues/167)) ([2613604](https://github.com/eladb/projen/commit/261360425a1cd24ecaad28b9abaa98dab26d710e)), closes [#158](https://github.com/eladb/projen/issues/158)

### 0.3.108 (2020-10-13)

### 0.3.107 (2020-10-12)

### 0.3.106 (2020-10-11)


### Bug Fixes

* paths are not compatible with windows ([#175](https://github.com/eladb/projen/issues/175)) ([cffdec2](https://github.com/eladb/projen/commit/cffdec204ca5979808d01127876374a6927247b8))

### 0.3.105 (2020-10-11)

### 0.3.104 (2020-10-09)

### 0.3.103 (2020-10-08)

### 0.3.102 (2020-10-07)

### 0.3.101 (2020-10-07)


### Features

* **jsii:** allowing twine registry to be set ([#140](https://github.com/eladb/projen/issues/140)) ([5b0918c](https://github.com/eladb/projen/commit/5b0918c99e64d859ca737a6a9ff432857f43906a)), closes [#124](https://github.com/eladb/projen/issues/124)

### 0.3.100 (2020-10-07)


### Bug Fixes

* **node:** typo in help-text ([#170](https://github.com/eladb/projen/issues/170)) ([688372f](https://github.com/eladb/projen/commit/688372f4c1ed05e9667057077c3a50efda1c2989))

### 0.3.99 (2020-10-07)


### Bug Fixes

* **typescript:** "package" script fails with "Command "pack" not found." ([52f8b33](https://github.com/eladb/projen/commit/52f8b332c3c2433ca35b8d4fd0a6a0651c8de0d3)), closes [#157](https://github.com/eladb/projen/issues/157)

### 0.3.98 (2020-10-07)

### 0.3.97 (2020-10-07)


### Features

* **node:** projen upgrade schedule ([#155](https://github.com/eladb/projen/issues/155)) ([16169b8](https://github.com/eladb/projen/commit/16169b8f5b978bd15a0fe3126b5a93f9de7dc016)), closes [eladb/projen#153](https://github.com/eladb/projen/issues/153)

### 0.3.96 (2020-10-06)

### 0.3.95 (2020-10-06)

### 0.3.94 (2020-10-06)


### Features

* **node:** support 'npm' as a package manager ([#157](https://github.com/eladb/projen/issues/157)) ([f2a03d3](https://github.com/eladb/projen/commit/f2a03d3b1f554df41142112d03f6c55786258a75)), closes [#156](https://github.com/eladb/projen/issues/156)

### 0.3.93 (2020-10-06)


### Bug Fixes

* **node:** typo in addScript docstring ([#160](https://github.com/eladb/projen/issues/160)) ([d743bb9](https://github.com/eladb/projen/commit/d743bb989f7222ad97e64793ac031333a2debcbf))

### 0.3.92 (2020-10-05)


### Bug Fixes

* projen upgrades always require workflow changes ([960f9b3](https://github.com/eladb/projen/commit/960f9b379a178b5133ea4123d3b3fd980710d614)), closes [#65](https://github.com/eladb/projen/issues/65)

### 0.3.91 (2020-10-05)

### 0.3.90 (2020-10-04)

### 0.3.89 (2020-10-04)


### Features

* add version pinning for CDK ([#147](https://github.com/eladb/projen/issues/147)) ([2957542](https://github.com/eladb/projen/commit/29575425a9b930b655b715736458ba6da711538e))

### 0.3.88 (2020-10-04)


### Features

* configure cdk.json via projen ([#142](https://github.com/eladb/projen/issues/142)) ([6bd24c8](https://github.com/eladb/projen/commit/6bd24c8d85b319b538b636d194488b701661e37b))

### 0.3.87 (2020-10-04)


### Features

* exclude cdk folders from git, npm and tsc ([#141](https://github.com/eladb/projen/issues/141)) ([c848ede](https://github.com/eladb/projen/commit/c848edec33281e6c28796545432b4c5b39c6070d))

### 0.3.86 (2020-10-04)


### Bug Fixes

* post synth directory ([#143](https://github.com/eladb/projen/issues/143)) ([8aa5e31](https://github.com/eladb/projen/commit/8aa5e311e298acc11a5df833fcc838bd70401a01))

### 0.3.85 (2020-10-04)


### Bug Fixes

* eslint fails in nested projects ([#144](https://github.com/eladb/projen/issues/144)) ([eabd2c7](https://github.com/eladb/projen/commit/eabd2c786b45fad651fbeb9d494d51e4ee15b535))

### 0.3.84 (2020-10-02)

### 0.3.83 (2020-10-02)

### 0.3.82 (2020-10-01)


### Features

* **node,jsii:** allowing npm registry to be set ([#136](https://github.com/eladb/projen/issues/136)) ([b13dffb](https://github.com/eladb/projen/commit/b13dffb5d8ec5fb16548aa3da4991f9fb57c2c71))

### 0.3.81 (2020-10-01)

### 0.3.80 (2020-10-01)


### Features

* **awscdk-app-ts:** no compilation needed ([062643d](https://github.com/eladb/projen/commit/062643dbd066f78cb9f9e919b2e1db1511941e4a))

### 0.3.79 (2020-10-01)

### 0.3.78 (2020-09-30)


### Bug Fixes

* **typescript:** Add missing `/` to default types path  ([#133](https://github.com/eladb/projen/issues/133)) ([c6a1f20](https://github.com/eladb/projen/commit/c6a1f200a034659993b4b984fd2d21bfedc9d7f5)), closes [#132](https://github.com/eladb/projen/issues/132)

### 0.3.77 (2020-09-30)

### 0.3.76 (2020-09-29)

### 0.3.75 (2020-09-28)

### 0.3.74 (2020-09-24)


### Bug Fixes

* **typescript-app:** does not include sample code ([ccb0aa9](https://github.com/eladb/projen/commit/ccb0aa946d9be7c328676396b58c9cb0bba1aebb))

### 0.3.73 (2020-09-24)

### 0.3.72 (2020-09-23)

### 0.3.71 (2020-09-22)

### 0.3.70 (2020-09-22)

### 0.3.69 (2020-09-21)

### 0.3.68 (2020-09-18)

### 0.3.67 (2020-09-17)

### 0.3.66 (2020-09-16)


### Bug Fixes

* **node:** Cannot read property 'pinnedDevDependency' of undefined ([6ec1a55](https://github.com/eladb/projen/commit/6ec1a5529576c2cd78e127e5c04c4891b3944d35))

### 0.3.65 (2020-09-16)

### 0.3.64 (2020-09-15)

### 0.3.63 (2020-09-14)

### 0.3.62 (2020-09-11)

### 0.3.61 (2020-09-10)

### 0.3.60 (2020-09-09)

### 0.3.59 (2020-09-08)

### 0.3.58 (2020-09-04)

### 0.3.57 (2020-09-03)

### 0.3.56 (2020-09-03)

### 0.3.55 (2020-09-02)


### Bug Fixes

* **upgrade:** can't upgrade with --frozen-lockfile ([f6c0694](https://github.com/eladb/projen/commit/f6c0694fbdda10d1a14a320462c4e1695c7f9021))

### 0.3.54 (2020-09-02)


### Bug Fixes

* **node:** operation not permitted: unlink 'node_modules/projen' ([e310054](https://github.com/eladb/projen/commit/e3100545ee382b72b0f7c249f8054b5b438b1031)), closes [#93](https://github.com/eladb/projen/issues/93)

### 0.3.53 (2020-09-02)

### 0.3.52 (2020-09-01)

### 0.3.51 (2020-08-31)

### 0.3.50 (2020-08-31)

### 0.3.49 (2020-08-31)

### 0.3.48 (2020-08-27)


### Bug Fixes

* start app path should be relative ([aef4fd2](https://github.com/eladb/projen/commit/aef4fd24df3ed74db358948b08d344bc6283eea2))

### 0.3.47 (2020-08-27)

### 0.3.46 (2020-08-26)


### Features

* aws-cdk construct-library project type ([4d8c140](https://github.com/eladb/projen/commit/4d8c140726d5634d4f853a64a3e404c58403896e))

### 0.3.45 (2020-08-26)

### 0.3.44 (2020-08-26)


### Features

* upgrade download-artifact action to 2.0.1 ([#84](https://github.com/eladb/projen/issues/84)) ([1e56981](https://github.com/eladb/projen/commit/1e5698157b36666ae71b4ca747a881f9d660a517))

### 0.3.43 (2020-08-26)

### 0.3.42 (2020-08-25)

### 0.3.41 (2020-08-25)

### 0.3.40 (2020-08-24)

### 0.3.39 (2020-08-21)

### 0.3.38 (2020-08-20)

### 0.3.37 (2020-08-18)

### 0.3.36 (2020-08-18)

### 0.3.35 (2020-08-17)

### 0.3.34 (2020-08-14)

### 0.3.33 (2020-08-13)

### 0.3.32 (2020-08-12)


### Bug Fixes

* projen:upgrade should be included even if workflow is disabled ([b641d63](https://github.com/eladb/projen/commit/b641d639fdf7181dafa0ce00b0d0675d6737a0dc))

### 0.3.31 (2020-08-12)

### 0.3.30 (2020-08-12)

### 0.3.29 (2020-08-12)

### 0.3.28 (2020-08-11)


### Features

* add MIT license ([#57](https://github.com/eladb/projen/issues/57)) ([ac712cb](https://github.com/eladb/projen/commit/ac712cb305a1f467162e63e35f20e2ab2d18b616))

### 0.3.27 (2020-08-11)

### 0.3.26 (2020-08-09)


### Bug Fixes

* **core:** peerDependencyOptions not passed ([#54](https://github.com/eladb/projen/issues/54)) ([9fdbd31](https://github.com/eladb/projen/commit/9fdbd31abc7ddd303e4085172378f5e2f3e4dd1c)), closes [#53](https://github.com/eladb/projen/issues/53)

### 0.3.25 (2020-08-07)

### 0.3.24 (2020-08-06)

### 0.3.23 (2020-08-04)


### Bug Fixes

* projen upgrade workflow corrupted ([8d5d556](https://github.com/eladb/projen/commit/8d5d55682113c05b24d120e126bfee59beae35c5))

### 0.3.22 (2020-08-04)


### Features

* auto-upgrade projen through a daily pull request ([6bb1b5f](https://github.com/eladb/projen/commit/6bb1b5fd62125b8e7469959857eed6412c9d829a))

### 0.3.21 (2020-08-04)

### 0.3.20 (2020-08-03)

### 0.3.19 (2020-08-03)


### Features

* **dependabot:** ignore `projen` since it cannot be updated without anti-tamper failures ([1c8ee2f](https://github.com/eladb/projen/commit/1c8ee2f76b7c37735f3d96182e6ec723ca3ae2cb))

### 0.3.18 (2020-08-03)

### 0.3.17 (2020-07-31)

### 0.3.16 (2020-07-30)

### 0.3.15 (2020-07-29)


### Bug Fixes

* EEXIST after first 'npx projen' ([a4bf22c](https://github.com/eladb/projen/commit/a4bf22cd4d32ea9a4afca640f66ed86e74cf3eb9)), closes [#20](https://github.com/eladb/projen/issues/20)

### 0.3.14 (2020-07-29)


### Features

* do not depend on "constructs" ([#36](https://github.com/eladb/projen/issues/36)) ([a715a06](https://github.com/eladb/projen/commit/a715a069e1d6f0ed4608a93f04ae086f567ed94b))

### 0.3.13 (2020-07-29)

### 0.3.12 (2020-07-29)


### Bug Fixes

* projen anti-tamper does not work in release ([926e4e2](https://github.com/eladb/projen/commit/926e4e2d1cb41fbc2f75d75079cdcf831fb8b487))

### 0.3.11 (2020-07-29)


### Bug Fixes

* projen:upgrade fails because package.json is read-only ([e86bbe0](https://github.com/eladb/projen/commit/e86bbe0dbdf760574e2e7a6100db398775ad6efe))

### 0.3.10 (2020-07-29)


### Features

* use jest -u if project has anti-tamper check ([aa85cde](https://github.com/eladb/projen/commit/aa85cdedccf00b1c7a216e00669d792664c53098))

### [0.3.9](https://github.com/eladb/projen/compare/v0.3.8...v0.3.9) (2020-07-29)


### Features

* auto-bump ([a90b29c](https://github.com/eladb/projen/commit/a90b29c666c29d7d743d49b7af4ea23c3a0ee3dd))
* make "bump" and "release" idempotent ([2ac0a85](https://github.com/eladb/projen/commit/2ac0a85b8a61843fbcc8e5f5dd7ea1696c3469db))


### Bug Fixes

* no-changes cannot be executed on ubuntu ([6024c8b](https://github.com/eladb/projen/commit/6024c8b2b4503df84a6abd96a1eb6bae5e825170))

### [0.3.8](https://github.com/eladb/projen/compare/v0.3.6...v0.3.8) (2020-07-29)


### Features

* auto-merge depedabot PRs if CI passes ([5af3b32](https://github.com/eladb/projen/commit/5af3b326a736ad7c703199c97fd30a06bd0ed820))
* dependabot support ([1b33016](https://github.com/eladb/projen/commit/1b33016c68bca1e08e9faead8d98fc64ceb2e4a7))
* upgrade @types/jest to 26.0.7 ([b02c0b3](https://github.com/eladb/projen/commit/b02c0b317735e49354de2ba0c6514b28db04c1cf))

### [0.3.7](https://github.com/eladb/projen/compare/v0.3.6...v0.3.7) (2020-07-28)


### Features

* dependabot support ([1b33016](https://github.com/eladb/projen/commit/1b33016c68bca1e08e9faead8d98fc64ceb2e4a7))
* upgrade @types/jest to 26.0.7 ([b02c0b3](https://github.com/eladb/projen/commit/b02c0b317735e49354de2ba0c6514b28db04c1cf))

### [0.3.6](https://github.com/eladb/projen/compare/v0.3.5...v0.3.6) (2020-07-28)


### Features

* upgrade upload-artifact github action to 2.1.1 ([a281892](https://github.com/eladb/projen/commit/a281892a946670bfe7e6a6f6d58a392de9bdde15))

### [0.3.5](https://github.com/eladb/projen/compare/v0.3.4...v0.3.5) (2020-07-15)


### Features

* compileBeforeTest ([8beda76](https://github.com/eladb/projen/commit/8beda76c1041da27bda5e7ee912f120a9388bc9e))
* projen:upgrade now always update to latest ([56eb1f7](https://github.com/eladb/projen/commit/56eb1f741f84c5286e58b15d70b5d0b130a26f4d))

### [0.3.4](https://github.com/eladb/projen/compare/v0.3.3...v0.3.4) (2020-07-15)


### Features

* "projen new" (replaces "projen init") ([4897598](https://github.com/eladb/projen/commit/48975989a4ae1c03c63649215aeed807144e2b62))

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
