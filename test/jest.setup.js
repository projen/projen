// Global setup for all tests

// projen is a dev tool, run on both local machines and CI/CD
// We default our test suite to NOT run in CI mode, and explicitly re-enable it for some test cases.
delete process.env.CI;
