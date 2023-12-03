export interface Input {
  numbers: Rect<number>[];
  symbols: Rect<string>[];
  size: Size;
}

export interface Rect<T = unknown> {
  value: T;
  begin: Position;
  end: Position;
}

export interface Position {
  row: number;
  col: number;
}

export interface Size {
  rows: number;
  cols: number;
}
