export interface Block {
  id: string;
  html?: string;
  tag?: string;
  ref?: HTMLElement;
}

export type Blocks = Array<Block>;

export interface EditMode {
  command: "add" | "delete" | "update" | "";
  currentBlock?: Block | HTMLElement;
}

export interface Menu {
  isOpen: boolean;
  xPosition?: number;
  yPosition?: number;
}
