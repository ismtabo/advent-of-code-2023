import solutions from "../../../solutions/mod.ts";
import React, { useMemo } from "react";

interface DaySolution<Input = unknown, Output = number> {
  partTwoAvailable: boolean;
  validate: (_: string) => boolean;
  preprocess: (_: string) => Input;
  partOne: (_: Input) => Output;
  partTwo: (_: Input) => Output;
}

export function useDay(dayKey: number) {
  return useMemo(() => {
    return Object.fromEntries(
      Object.entries(solutions),
    )[`day${dayKey + 1}`] as DaySolution;
  }, [dayKey]);
}
