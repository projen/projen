# Go Project (RFC #1051)

Just like TS, Node and Python, having support for a Go project would be great.

## Builds

Get dependencies if vendoring is disabled, run `go fmt`, run the linter, run go test, and finally run build.

## Releases

Setup semantic versioning and release using semantic-release.

## Tests

Expose an API that interacts with `go test`, allows arguments to be passed.

## Linting

Setup linting using [golangci-lint](https://github.com/golangci/golangci-lint).

## Dependency management

Expose an API that interacts with the go.mod file, following https://golang.org/ref/mod#go-mod-file

An option to setup vendoring.

## Compile Binary

Expose API that interacts with the build command.

## Flow

1. `go get` // disabled if vendoring is setup.
2. `go fmt`
3. `golangci-lint` 
4. `go test`
5. `go build`