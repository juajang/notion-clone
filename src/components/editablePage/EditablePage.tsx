import React, { useEffect, useState } from "react";
import { Block, Blocks, EditMode, Tag } from "@src/types/editable";
import { setCaretToEnd, uid } from "@src/utils/utils";
import EditableBlock from "@components/editablePage/EditableBlock";

interface EditablePageProps {
  blocks: Blocks;
  setBlocks: (blocks: Blocks) => void;
}

const EditablePage = ({ blocks, setBlocks }: EditablePageProps) => {
  const [editMode, setEditMode] = useState<EditMode>({
    command: "",
  });

  useEffect(() => {
    const setFocus = () => {
      const { currentBlock, command } = editMode;
      if (!currentBlock) {
        return;
      }
      if (command === "add" && "ref" in currentBlock) {
        const nextBlock = currentBlock.ref?.nextElementSibling as HTMLElement;
        nextBlock?.focus();
      } else if (command === "delete" && "focus" in currentBlock) {
        setCaretToEnd(currentBlock);
        currentBlock?.focus();
      }
    };

    setFocus();
  }, [blocks, editMode]);

  function updateBlock(updatedBlock: Block) {
    const index = blocks.map((block) => block.id).indexOf(updatedBlock.id);
    const updatedBlocks: Blocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    };
    setBlocks(updatedBlocks);
  }

  function addBlock(currentBlock: Block, tag: Tag) {
    const newBlock = {
      id: uid(),
      html: "",
      tag: tag.tag,
      placeholder: tag.placeholder ?? tag.label,
    };
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
    setEditMode({
      command: "add",
      currentBlock,
    });
  }

  function deleteBlock(currentBlock: Block) {
    const previousBlock = currentBlock.ref
      ?.previousElementSibling as HTMLElement;
    if (previousBlock) {
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
      setEditMode({
        command: "delete",
        currentBlock: previousBlock,
      });
    }
  }

  return (
    <>
      {blocks.map((block) => (
        <EditableBlock
          id={block.id}
          key={block.id}
          html={block.html}
          tag={block.tag}
          placeholder={block.placeholder}
          updateBlock={updateBlock}
          addBlock={addBlock}
          deleteBlock={deleteBlock}
        />
      ))}
    </>
  );
};

export default EditablePage;
