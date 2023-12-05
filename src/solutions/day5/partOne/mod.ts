import { Input, Lookup, Lookups } from "../types.ts";

export function partOne(input: Input) {
  return Math.min(
    ...input.seeds.map((seed) => getLocation(seed, input.lookups)),
  );
}

export function getLocation(seed: number, lookups: Lookups): number {
  const soil = getDestination(seed, lookups["seed-to-soil"]);
  const fertilizer = getDestination(soil, lookups["soil-to-fertilizer"]);
  const water = getDestination(fertilizer, lookups["fertilizer-to-water"]);
  const light = getDestination(water, lookups["water-to-light"]);
  const temperature = getDestination(light, lookups["light-to-temperature"]);
  const humidity = getDestination(
    temperature,
    lookups["temperature-to-humidity"],
  );
  const location = getDestination(humidity, lookups["humidity-to-location"]);
  return location!;
}

export function getDestination(target: number, lookup: Lookup[]): number {
  const range = lookup.find((range) =>
    range.target.start <= target &&
    target < range.target.start + range.target.length
  );
  if (!range) {
    return target;
  }
  const offset = target - range.target.start;
  return range.dest.start + offset;
}
