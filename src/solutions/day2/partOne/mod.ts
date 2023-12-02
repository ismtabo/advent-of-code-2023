import { Cubes, Game, Input, Pick } from "../input.types.ts";

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

export function partOne(input: Input) {
  return input
    .filter(validGame)
    .map((game) => game.id)
    .reduce((sum, id) => sum + id, 0);
}

function validGame(game: Game) {
  return game.picks.every(validPick);
}

function validPick(pick: Pick) {
  return pick.every(validCube);
}

function validCube(cube: Cubes) {
  switch (cube.color) {
    case "red":
      return MAX_RED_CUBES >= cube.value;
    case "green":
      return MAX_GREEN_CUBES >= cube.value;
    case "blue":
      return MAX_BLUE_CUBES >= cube.value;
  }
  throw new Error(`Invalid color: ${cube.color}`);
}
