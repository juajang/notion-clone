import React, {useCallback, useEffect, useState} from "react";
import {Block, Blocks, Tag} from "@src/types/editable";
import {
  setCaretToEnd,
  uid,
  getCaretOffset,
} from "@src/utils/utils";
import useCaret from "@src/hooks/useCaret";
import EditableBlock from "@components/editable/EditableBlock";
import {usePrevious} from "@src/hooks/usePrevious";
import {tags} from "@components/common";

const initialBlock = {
  id: uid(),
  html: "",
  ...tags.p,
};

const EditablePage = () => {
  const [blocks, setBlocks] = useState<Blocks>([initialBlock]);
  const [currentBlockId, setCurrentBlockId] = useState(blocks[0]?.id);
  const {
    setCaretToLeft,
    setCaretToRight,
    setCaretToDown,
    setCaretToUp
  } = useCaret();
  const prevBlocks = usePrevious(blocks);

  const setFocusOnNextBlock = useCallback(
    (currentBlockId: string) => {
      const nextBlockPosition =
        blocks.map((b) => b.id).indexOf(currentBlockId) + 1;
      const nextBlock: any = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      );
      if (nextBlock) {
        nextBlock.focus();
      }
    },
    [blocks]
  );

  const setFocusOnPreviousBlock = useCallback(
    (currentBlockId: string) => {
      if (!prevBlocks) {
        return;
      }
      const lastBlockPosition =
        prevBlocks.map((b) => b.id).indexOf(currentBlockId) - 1;
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      ) as HTMLElement;
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    },
    [prevBlocks]
  );

  useEffect(() => {
    if (!prevBlocks) {
      return;
    }
    if (prevBlocks.length + 1 === blocks.length) {
      setFocusOnNextBlock(currentBlockId);
    } else if (prevBlocks.length - 1 === blocks.length) {
      setFocusOnPreviousBlock(currentBlockId);
    }
  }, [
    blocks.length,
    currentBlockId,
    prevBlocks,
    setFocusOnNextBlock,
    setFocusOnPreviousBlock,
  ]);

  const updateBlock = useCallback((updatedBlock: Block) => {
    setBlocks((blocks: Blocks) => {
      const index = blocks.map((block) => block.id).indexOf(updatedBlock.id);
      const updatedBlocks: Blocks = [...blocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        ...updatedBlock,
      };
      return updatedBlocks;
    });
  }, []);

  const addBlock = useCallback((currentBlock: Block, newTag: Tag) => {
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
  }, []);

  const deleteBlock = useCallback((currentBlock: Block) => {
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
  }, []);

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
          handleArrowDown={setCaretToDown}
          handleArrowLeft={setCaretToLeft}
          handleArrowRight={setCaretToRight}
          handleArrowUp={setCaretToUp}
        />
      ))}
    </>
  );
};

export default EditablePage;
