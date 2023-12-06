import { Input, Race } from "../types.ts";

export function partOne(input: Input) {
  return input.races.map(getWinningOportunities).reduce((a, b) => a * b, 1);
}

export function getWinningOportunities(race: Race): number {
  const minimumTime = getMimimunTime(race);
  const maximumTime = race.time - minimumTime;
  // NOTE: The +1 is because the time is inclusive
  return maximumTime - minimumTime + 1;
}

function getMimimunTime(race: Race): number {
  for (let t = 1; t < race.time; t++) {
    if ((race.time - t) * t > race.distance) {
      return t;
    }
  }
  return Infinity;
}
