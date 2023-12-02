import { Input, Pick } from "./input.types.ts";
import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

const GAME_REGEX = /^Game (?<id>\d+): ((\d+ (red|green|blue))(, (\d+ (red|green|blue)))*)(; (\d+ (red|green|blue))(, (\d+ (red|green|blue)))*)*$/;

export function validate(text: string): boolean {
  return text.trim().split("\n")
    .every((line) => line.trim().match(GAME_REGEX) !== null);
}

export function preprocess(text: string) {
  return text.trim().split("\n")
    .map((line) => {
      const [game, picksRaw] = line.trim().split(": ", 2);
      const [_, idRaw] = game.trim().split(" ");
      const picks = picksRaw.trim().split("; ")
        .map((pickRaw) =>
          pickRaw.trim().split(", ")
            .map((cubeRaw) => {
              const [valueRaw, color] = cubeRaw.trim().split(" ");
              const value = +valueRaw;
              return { color, value };
            })
        ) as Pick[];
      const id = +idRaw;
      return { id, picks };
    }) as Input;
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
