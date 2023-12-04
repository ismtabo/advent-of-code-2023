import { Input } from "../types.ts";

export function partOne(input: Input) {
  return input
    .map((card) => {
      const existentNumbers = card.winningNumbers.filter((n) =>
        card.myNumbers.includes(n)
      );
      return existentNumbers.length;
    })
    .map((n) => n > 0 ? Math.pow(2, n - 1) : 0)
    .reduce((a, b) => a + b, 0);
}
