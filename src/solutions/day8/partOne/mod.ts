import { Input, Node } from "../types.ts";

export function partOne(input: Input) {
  const { instructions, nodes } = input;
  let current = "AAA";
  let steps = 0;
  for (const instruction of infiniteInstructions(instructions)) {
    switch (instruction) {
      case "L":
        current = nodeMap(nodes).L.get(current)!;
        break;
      case "R":
        current = nodeMap(nodes).R.get(current)!;
        break;
      default:
        return current;
    }
    steps++;
    if (current === "ZZZ") {
      return steps;
    }
  }
  return NaN;
}

export function* infiniteInstructions(instructions: string) {
  let i = 0;
  while (true) {
    yield instructions[i % instructions.length];
    i++;
  }
}

export function nodeMap(nodes: Node[]): NodeMap {
  const L = new Map<string, string>();
  const R = new Map<string, string>();
  for (const node of nodes) {
    L.set(node.name, node.links.left);
    R.set(node.name, node.links.right);
  }
  return { L, R };
}

export interface NodeMap {
  L: Map<string, string>;
  R: Map<string, string>;
}
