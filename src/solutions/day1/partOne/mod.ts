export function partOne(input: string[]) {
  return input
    .map((line) => {
      const first = Array.from(line).find((char) => /[0-9]/.test(char))
      const last = Array.from(line).findLast((char) => /[0-9]/.test(char))
      return Number(`${first}${last}`);
    })
    .reduce((acc: number, curr: number) => acc + curr, 0);
}
