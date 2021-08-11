import React, { useEffect, useState } from "react";
import { Block, Blocks, Tag } from "@src/types/editable";
import { setCaretToEnd, uid } from "@src/utils/utils";
import EditableBlock from "@components/editable/EditableBlock";
import { usePrevious } from "@src/hooks/usePrevious";

interface EditablePageProps {
  blocks: Blocks;
  setBlocks: Function;
}

const EditablePage = ({ blocks, setBlocks }: EditablePageProps) => {
  const prevBlocks = usePrevious(blocks);
  const [currentBlockId, setCurrentBlockId] = useState(blocks[0]?.id);

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
    setBlocks((blocks: Blocks) => {
      const index = blocks.map((block) => block.id).indexOf(updatedBlock.id);
      const updatedBlocks: Blocks = [...blocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        ...updatedBlock,
      };
      return updatedBlocks;
    });
  }

  function addBlock(currentBlock: Block, newTag: Tag) {
    setCurrentBlockId(currentBlock.id);
    setBlocks((blocks: Blocks) => {
      const newBlock = {
        id: uid(),
        html: "",
        ...newTag,
        placeholder: newTag.placeholder ?? newTag.label,
      };
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index + 1, 0, newBlock);
      return updatedBlocks;
    });
  }

  function deleteBlock(currentBlock: Block) {
    setCurrentBlockId(currentBlock.id);
    setBlocks((blocks: Blocks) => {
      if (blocks.length === 1) {
        return blocks;
      }
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      return updatedBlocks;
    });
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
