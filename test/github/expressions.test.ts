import { toGitHubExpr } from "../../src/github/private/util";

test.each([
  [1, "1"],
  [true, "true"],
  [["a", "b"], `fromJSON('["a","b"]')`],
  [{ a: "b" }, `fromJSON('{"a":"b"}')`],
  [null, "null"],
  ["asdf", "'asdf'"],
  ["don't", "'don''t'"],
  [["don't", "don't", "do", "it"], `fromJSON('["don''t","don''t","do","it"]')`],
])("%p in GitHub syntax is %p", (input, expected) => {
  expect(toGitHubExpr(input)).toEqual(expected);
});
