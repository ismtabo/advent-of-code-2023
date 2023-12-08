import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function validate(text: string): boolean {
  if (text.trim().length < 3) return false;
  const [instructions, ...rest] = text.trim().split("\n");
  if (/[^LR]/.test(instructions)) return false;
  if (rest.length < 2) return false;
  rest.shift();
  if (rest.some((line) => !/^[A-Z0-9]+ = \([A-Z0-9]+, [A-Z0-9]+\)$/.test(line.trim()))) {
    return false;
  }
  return true;
}

export function preprocess(text: string) {
  const [instructions, ...rest] = text.trim().split("\n");
  rest.shift();
  const nodes = rest.map((line) => {
    const [name, links] = line.trim().split(" = ", 2);
    const [left, right] = links.replace(/[\(\)]/g, "").split(", ", 2);
    return { name, links: { left, right } };
  });
  return { instructions, nodes };
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
