import { getWinningOportunities } from "../partOne/mod.ts";
import { Input } from "../types.ts";

export function partTwo(input: Input) {
  const totalTime = parseInt(input.races.reduce((a, b) => a + b.time, ""), 10);
  const totalDistance = parseInt(
    input.races.reduce((a, b) => a + b.distance, ""),
    10,
  );
  return getWinningOportunities({ time: totalTime, distance: totalDistance });
}
