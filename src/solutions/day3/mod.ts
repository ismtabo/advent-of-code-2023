import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Input } from "./types.ts";

export function validate(text: string): boolean {
  return text.trim().split("\n").length > 0 &&
    text.trim().split("\n").every((line) => line.trim().length > 0) &&
    text.trim().split("\n").every((line) => line.trim().match(/^[0-9#%&*+-/=@$]+$/));
}

export function preprocess(text: string): Input {
  const cleanText = text.trim().split("\n").map((line) => line.trim());
  const rows = cleanText.length;
  const cols = Math.max(...cleanText.map((line) => line.length));
  const { numbers, symbols } = cleanText
    .map((line, row) => {
      const cleanedLine = line.trim();
      const numbers = Array.from(cleanedLine.matchAll(/(\d+)/g))
        .map((match) => ({
          value: parseInt(match[0], 10),
          begin: { row, col: match.index! },
          end: { row, col: match.index! + match[0].length },
        }));
      const symbols = Array.from(cleanedLine.matchAll(/([^\s\w.])/g))
        .map((match) => ({
          value: match[0],
          begin: { row, col: match.index! },
          end: { row, col: match.index! + match[0].length },
        }));
      return { numbers, symbols };
    })
    .reduce((acc, { numbers, symbols }) => {
      acc.numbers.push(...numbers);
      acc.symbols.push(...symbols);
      return acc;
    }, { numbers: [], symbols: [] });
  return {
    numbers,
    symbols,
    size: { rows, cols },
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
