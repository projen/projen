.PHONY: all
all: clobber compile test-compile test build test-watch test-update bump unbump upgrade-dependencies default watch package eslint compat publish-npm publish-maven publish-pypi docgen readme-macros devenv-setup contributors-update

.PHONY: clobber
clobber:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	export BRANCH=$(git branch --show-current)
	git checkout -b scratch
	git checkout $BRANCH
	git fetch origin
	git reset --hard origin/$BRANCH
	git clean -fdx
	echo ready to rock! (unpushed commits are under the "scratch" branch)

.PHONY: compile
compile:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	jsii --silence-warnings=reserved-word --no-fix-peer-dependencies
	make docgen

.PHONY: test-compile
test-compile:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")

.PHONY: test
test:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	make test:compile
	jest --passWithNoTests --all --updateSnapshot
	make eslint

.PHONY: build
build:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	/bin/bash ./projen.bash
	make compile
	make test
	make package
	make readme-macros

.PHONY: test-watch
test-watch:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	jest --watch

.PHONY: test-update
test-update:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	jest --updateSnapshot

.PHONY: bump
bump:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	export OUTFILE=package.json
	export CHANGELOG=dist/changelog.md
	export BUMPFILE=dist/version.txt
	/Users/rybickic/.nvm/versions/node/v14.16.1/bin/node /Users/rybickic/Developer/projen/lib/release/bump-version.task.js

.PHONY: unbump
unbump:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	export OUTFILE=package.json
	export CHANGELOG=dist/changelog.md
	export BUMPFILE=dist/version.txt
	/Users/rybickic/.nvm/versions/node/v14.16.1/bin/node /Users/rybickic/Developer/projen/lib/release/reset-version.task.js

.PHONY: upgrade-dependencies
upgrade-dependencies:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	export CI=0
	npm-check-updates --upgrade --target=minor --reject='projen'
	yarn install --check-files
	yarn upgrade @types/fs-extra @types/glob @types/ini @types/jest @types/node @types/semver @types/yargs @typescript-eslint/eslint-plugin @typescript-eslint/parser all-contributors-cli eslint eslint-import-resolver-node eslint-import-resolver-typescript eslint-plugin-import jest jest-junit jsii jsii-diff jsii-docgen jsii-pacmak json-schema markmac npm-check-updates standard-version typescript @iarna/toml chalk decamelize fs-extra glob ini semver shx xmlbuilder2 yaml yargs
	/bin/bash ./projen.bash

.PHONY: default
default:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	node .projenrc.js

.PHONY: watch
watch:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	jsii -w --silence-warnings=reserved-word --no-fix-peer-dependencies

.PHONY: package
package:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	jsii-pacmak

.PHONY: eslint
eslint:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern src src/__tests__ build-tools .projenrc.js

.PHONY: compat
compat:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	jsii-diff npm:$(node -p "require('./package.json').name") -k --ignore-file .compatignore || (echo "
UNEXPECTED BREAKING CHANGES: add keys such as 'removed:constructs.Node.of' to .compatignore to skip.
" && exit 1)

.PHONY: publish-npm
publish-npm:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	export NPM_DIST_TAG=latest
	export NPM_REGISTRY=registry.npmjs.org
	npx -p jsii-release@latest jsii-release-npm

.PHONY: publish-maven
publish-maven:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	export MAVEN_ENDPOINT=undefined
	export MAVEN_SERVER_ID=undefined
	export MAVEN_REPOSITORY_URL=undefined
	npx -p jsii-release@latest jsii-release-maven

.PHONY: publish-pypi
publish-pypi:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	export TWINE_REPOSITORY_URL=undefined
	npx -p jsii-release@latest jsii-release-pypi

.PHONY: docgen
docgen:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	jsii-docgen

.PHONY: readme-macros
readme-macros:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	mv README.md README.md.bak
	cat README.md.bak | markmac > README.md
	rm README.md.bak

.PHONY: devenv-setup
devenv-setup:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	yarn install
	make build

.PHONY: contributors-update
contributors-update:
	export PATH=$(npx -c "node -e \"console.log(process.env.PATH)\"")
	all-contributors check | grep "Missing contributors" -A 1 | tail -n1 | sed -e "s/,//g" | xargs -n1 | grep -v "[bot]" | xargs -n1 -I{} all-contributors add {} code
