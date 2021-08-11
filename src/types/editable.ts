export interface Tag {
  id: string;
  tag?: string;
  label?: string;
  subLabel?: string;
  placeholder?: string;
}

export interface Block extends Tag {
  html?: string;
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
