import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

const INPUT_REGEX = /^Time:\s+\d+(\s+\d+)+\s?\nDistance:\s+(\d+)(\s+\d+)+\s?$/;

export function validate(text: string): boolean {
  return INPUT_REGEX.test(text.trim());
}

export function preprocess(text: string) {
  const [timeLine, distLine] = text.trim().split("\n");
  const [_, timesRaw] = timeLine.split(":", 2);
  const times = timesRaw.trim().split(/\s+/).map((x) => parseInt(x, 10));
  const [__, distRaw] = distLine.split(":", 2);
  const distances = distRaw.trim().split(/\s+/).map((x) => parseInt(x, 10));
  return {
    races: times.map((time, i) => ({ time, distance: distances[i] })),
  };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

// TODO: Change to true once both parts are solved
const partTwoAvailable = true;

export { partOne, partTwo, partTwoAvailable };
