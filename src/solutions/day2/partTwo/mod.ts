import { Game, Input } from "../input.types.ts";

export function partTwo(input: Input) {
  return input
    .map((game) => power(game))
    .reduce((sum, power) => sum + power, 0);
}

function power(game: Game) {
  const redCubes = game.picks.map((pick) => pick.filter((cube) => cube.color === "red"))
    .flat();
  const maxRedCubes = Math.max(...redCubes.map((cube) => cube.value))
  const greenCubes = game.picks.map((pick) => pick.filter((cube) => cube.color === "green"))
    .flat();
  const maxGreenCubes = Math.max(...greenCubes.map((cube) => cube.value))
  const blueCubes = game.picks.map((pick) => pick.filter((cube) => cube.color === "blue"))
    .flat();
  const maxBlueCubes = Math.max(...blueCubes.map((cube) => cube.value))
  return maxRedCubes * maxGreenCubes * maxBlueCubes;
}
