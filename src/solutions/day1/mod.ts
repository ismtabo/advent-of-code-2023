import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function validate(text: string): boolean {
  return text.trim().split("\n").length > 0 &&
    text.trim().split("\n").every((line) => /[0-9a-z]/.test(line));
}

export function preprocess(text: string) {
  return text.trim().split("\n");
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

const partTwoAvailable = true

export { partOne, partTwo, partTwoAvailable };
