type Match = {value: number, index: number};

const NUMBERS = [
  {label: "one", value: 1},
  {label: "two", value: 2},
  {label: "three", value: 3},
  {label: "four", value: 4},
  {label: "five", value: 5},
  {label: "six", value: 6},
  {label: "seven", value: 7},
  {label: "eight", value: 8},
  {label: "nine", value: 9},
]

export function partTwo(input: string[]) {
  return input
    .map((line) => {
      const foundDigits: Array<{value: number, index: number}> = NUMBERS.map((number) => ({...number, matches: Array.from(line.matchAll(new RegExp(`${number.label}|${number.value}`, "g")))}))
        .filter(({matches}) => matches.length > 0)
        .flatMap(({value, matches}) => matches.map(({index}) => ({value, index})))
        .filter((digitMatch): digitMatch is Match => digitMatch.index !== undefined);
      const sortedDigist = foundDigits.sort((a, b) => a.index - b.index);
      const first = sortedDigist.at(0)!;
      const last = sortedDigist.at(-1)!;
      return Number(`${first.value}${last.value}`)
    })
    .reduce((acc: number, curr: number) => acc + curr, 0);
}
