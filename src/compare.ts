export interface ICompareString {
  /**
   *
   * @param a The first string
   * @param b The second string
   * @returns It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise.
   */
  compare(a: string, b: string): number;
}
