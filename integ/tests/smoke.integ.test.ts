/**
 * Smoke test - verifies the integ harness test runner is wired up correctly.
 *
 * Following the aws-cdk-cli strategy of adding a trivially-succeeding suite
 * first, before real suites are introduced.
 */
test("integ harness smoke test", () => {
  expect(true).toBe(true);
});
