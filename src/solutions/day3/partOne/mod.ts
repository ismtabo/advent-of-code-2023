import { Input, Rect } from "../types.ts";

export function partOne(input: Input) {
  return input.numbers
    .filter((number) => {
      const boundingRect = getBoundingRect(number, input.size);
      return input.symbols.some((symbol) => {
        return isIntersecting(boundingRect, symbol);
      });
    })
    .reduce((acc, { value }) => acc + value, 0);
}

export function getBoundingRect(number: Rect, limits: Input["size"]) {
  return {
    top: Math.max(number.begin.row - 1, 0),
    bottom: Math.min(number.end.row + 1, limits.rows),
    left: Math.max(number.begin.col - 1, 0),
    right: Math.min(number.end.col + 1, limits.cols),
  };
}

export function isIntersecting(
  rect: ReturnType<typeof getBoundingRect>,
  symbol: Rect,
) {
  return symbol.begin.row >= rect.top &&
    symbol.end.row <= rect.bottom &&
    symbol.begin.col >= rect.left &&
    symbol.end.col <= rect.right;
}
