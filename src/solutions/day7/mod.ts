import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function validate(text: string): boolean {
  return text.trim().split("\n")
    .every((line) => /^[2-9TJQKA]{5} \d+$/.test(line.trim()));
}

export function preprocess(text: string) {
  return text.trim().split("\n")
    .map((line) => line.trim().split(/\s+/))
    .map(([cards, bid]) => ({ cards, bid: parseInt(bid, 10) }));
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

// TODO: Change to true once both parts are solved
const partTwoAvailable = false;

export { partOne, partTwo, partTwoAvailable };
