export interface Input {
  instructions: string;
  nodes: Node[];
}

export interface Node {
  name: string;
  links: {
    left: string;
    right: string;
  };
}
