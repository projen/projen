export function secretToString(secretName: string): string {
  return `\${{ secrets.${secretName} }}`;
}
