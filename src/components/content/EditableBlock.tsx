import ContentEditable from "react-contenteditable";
import { Block } from "@src/types/content";

interface EditableBlockProps {
  html: string;
  tag: string;
  updateBlock: (block: Block) => void;
  addBlock: (block: Block) => void;
  deleteBlock: (block: Block) => void;
}

const EditableBlock = (props: EditableBlockProps) => {
  const { html, tag, updateBlock, addBlock, deleteBlock } = props;

  function onKeyDown(e: any) {
    if (e.key === "/") {
    }
  }

  const onChange = () => {};
  return (
    <ContentEditable
      html={html}
      tagName={tag}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default EditableBlock;
