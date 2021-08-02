export interface Block {
  id: string;
  html?: string;
  tag?: string;
  ref?: HTMLElement;
}

export interface EditMode {
  command: "add" | "delete" | "update" | "";
  currentBlock?: Block | HTMLElement;
}

export type Blocks = Array<Block>;
