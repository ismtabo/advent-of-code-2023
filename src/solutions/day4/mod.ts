import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function validate(text: string): boolean {
  return text.trim().split("\n").length > 0 &&
    text.trim().split("\n").every((line) =>
      line.trim().match(/^Card\s+\d+:(\s+\d+)+ \|(\s+\d+)+$/)
    );
}

export function preprocess(text: string) {
  return text.trim().split("\n")
    .map((line) => {
      const [info, numbers] = line.trim().split(": ", 2);
      const [_, rawId] = info.trim().split(/\s+/, 2);
      const id = parseInt(rawId);
      const [winningNumbers, myNumbers] = numbers.trim().split("|", 2);
      return {
        id,
        winningNumbers: winningNumbers.trim().split(/\s+/).map((n) =>
          parseInt(n)
        ),
        myNumbers: myNumbers.trim().split(/\s+/).map((n) => parseInt(n)),
      };
    });
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
