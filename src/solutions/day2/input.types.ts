export type Color = "red" | "green" | "blue";

export type Input = Game[];

export interface Game {
  id: number;
  picks: Pick[];
}

export type Pick = Cubes[];

export interface Cubes {
  color: Color;
  value: number;
}
