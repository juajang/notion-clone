export interface Block {
  id: string;
  html: string;
  tag: string;
  ref?: HTMLElement;
}

export type Blocks = Array<Block>;
