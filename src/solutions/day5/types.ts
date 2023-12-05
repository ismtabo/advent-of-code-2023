export interface Input {
  seeds: number[];
  lookups: Lookups;
}

export interface Lookups {
  "seed-to-soil": Lookup[];
  "soil-to-fertilizer": Lookup[];
  "fertilizer-to-water": Lookup[];
  "water-to-light": Lookup[];
  "light-to-temperature": Lookup[];
  "temperature-to-humidity": Lookup[];
  "humidity-to-location": Lookup[];
}

export type Lookup = {
  dest: Range;
  target: Range;
};

export interface Range {
  start: number;
  length: number;
}
