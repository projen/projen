export function secretToString(secretName: string): string {
  return `\${{ secrets.${secretName} }}`;
}

/**
 * Bash if equivalent execution of scripts that is compatible with shx.
 * Execution will fail, if the when or then command fails.
 *
 * @param when The condition to evaluate. Usually a `test` command. This command may be executed twice. Make sure it is non mutating.
 * @param then The script to run if the condition is true.
 * @param otherwise The script to run if the condition is false.
 */
export function shxIf(when: string, then: string, otherwise?: string): string {
  // Connect the condition and the 'then' command with a logical AND.
  // If the condition is true, this will execute the 'then' command.
  // This case is equivalent to TRUE && then()
  // If the condition is false, this will exit with a non-zero status code
  // (indicating an error) without executing the 'then' command.
  // This case is equivalent to FALSE && then()
  const if_clause = `${when} && (${then})`;

  // For the else clause, we need to check the 'when' condition again,
  // because the if clause can also return FALSE if the 'then' command fails.
  // However in this situation we don't want to execute the else clause but report an error.
  const else_clause = `${when} || (${otherwise})`;

  // Try the if_clause first. If it fails try the else clause.
  if (otherwise) {
    return `(${if_clause}) || (${else_clause})`;
  }

  // Just run the if clause
  return if_clause;
}
