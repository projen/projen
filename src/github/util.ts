export function secretToString(secretName: string): string {
  return `\${{ secrets.${secretName} }}`;
}

/**
 * Bash if equivalent execution of scripts that is compatible with shx.
 * Execution will fail, if the when or then command fails.
 *
 * @param condition The condition to evaluate. Usually a `test`
 * @param when The script to run when the condition is true.
 * @param then The script to run when the condition is false.
 */
export function shxIf(
  condition: string,
  when: string,
  then: string = 'echo "OK"'
): string {
  return `${condition} && ((${when}) || exit 1) || ${then}`;
}
