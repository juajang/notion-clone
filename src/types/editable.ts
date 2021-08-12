export interface Tag {
  tag?: string;
  label?: string;
  subLabel?: string;
  placeholder?: string;
}

export interface Block extends Tag {
  id: string;
  html?: string;
  ref?: HTMLElement;
}

export type Blocks = Array<Block>;

export interface Menu {
  isOpen: boolean;
  xPosition?: number;
  yPosition?: number;
}
