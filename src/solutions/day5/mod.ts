import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Lookup, Lookups } from "./types.ts";

export function validate(text: string): boolean {
  try {
    preprocess(text);
    return true;
  } catch (_err) {
    return false;
  }
}

export function preprocess(text: string) {
  const cleanedText = text.trim().split("\n");
  const [_, seedsLine] = cleanedText[0].split(": ", 2);
  const seeds = seedsLine.split(/\s+/).map((seed) => parseInt(seed, 10));
  cleanedText.shift();
  const lookups = new Map<string, Lookup[]>();
  const restOfLines = cleanedText.slice();
  while (restOfLines.length > 0) {
    const line = restOfLines.shift();
    if (!line || line.trim() === "") {
      continue;
    }
    const lookupName = line.trimEnd()
      .slice(0, -(" map:".length));
    const lookup = new Array<Lookup>();
    while (restOfLines.length > 0) {
      const line = restOfLines.shift();
      if (!line || line.trim() === "") {
        break;
      }
      const [destStart, targetStart, length] = line.trim().split(" ", 3);
      lookup.push({
        dest: {
          start: parseInt(destStart, 10),
          length: parseInt(length, 10),
        },
        target: {
          start: parseInt(targetStart, 10),
          length: parseInt(length, 10),
        },
      });
    }
    lookups.set(lookupName, lookup);
  }
  return {
    seeds,
    lookups: Object.fromEntries(lookups) as unknown as Lookups,
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
const partTwoAvailable = false;

export { partOne, partTwo, partTwoAvailable };
