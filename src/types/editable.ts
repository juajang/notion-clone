export interface Block {
  id: string;
  html?: string;
  tag?: string;
  ref?: HTMLElement;
  placeholder?: string;
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

export interface Tag {
  id: string;
  tag: string;
  label?: string;
  subLabel?: string;
  placeholder?: string;
}
