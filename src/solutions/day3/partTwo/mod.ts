import { getBoundingRect, isIntersecting } from "../partOne/mod.ts";
import { Input } from "../types.ts";

export function partTwo(input: Input) {
  return input.symbols
    .filter((symbol) => symbol.value === "*")
    .map((symbol) => {
      const collidingNumbers = input.numbers.filter((num) => {
        const boundingRect = getBoundingRect(num, input.size);
        return isIntersecting(boundingRect, symbol);
      });
      return collidingNumbers.length === 2
        ? collidingNumbers.reduce(
          (acc, { value }) => acc * value,
          1,
        )
        : 0;
    })
    .reduce((acc, value) => acc + value, 0);
}
