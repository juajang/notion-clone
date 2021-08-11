import React, { useEffect, useState } from "react";
import { Block, Blocks, Tag } from "@src/types/editable";
import { setCaretToEnd, uid } from "@src/utils/utils";
import EditableBlock from "@components/editable/EditableBlock";
import { usePrevious } from "@src/hooks/usePrevious";

interface EditablePageProps {
  blocks: Blocks;
  setBlocks: (blocks: Blocks) => void;
}

const EditablePage = ({ blocks, setBlocks }: EditablePageProps) => {
  const prevBlocks = usePrevious(blocks);
  const [currentBlockId, setCurrentBlockId] = useState(blocks[0].id);

  useEffect(() => {
    if (!prevBlocks) {
      return;
    }

    // focus to new block
    if (prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition =
        blocks.map((b) => b.id).indexOf(currentBlockId) + 1;
      const nextBlock: any = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      );
      if (nextBlock) {
        nextBlock.focus();
      }
    }

    // focus to previous block
    else if (prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition =
        prevBlocks.map((b) => b.id).indexOf(currentBlockId) - 1;
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      ) as HTMLElement;
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, currentBlockId, prevBlocks]);

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

  function addBlock(currentBlock: Block) {
    setCurrentBlockId(currentBlock.id);
    const newBlock = {
      id: uid(),
      html: "",
      tag: currentBlock.tag,
      placeholder: currentBlock.placeholder ?? currentBlock.label,
    };
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
  }

  function deleteBlock(currentBlock: Block) {
    setCurrentBlockId(currentBlock.id);
    if (blocks.length > 1) {
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
    }
  }

  return (
    <>
      {blocks.map((block) => (
        <EditableBlock
          id={block.id}
          position={blocks.map((b) => b.id).indexOf(block.id)}
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