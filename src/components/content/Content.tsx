import React from "react";
import styled from "styled-components";
import { Block, Blocks } from "@src/types/content";
import { uid } from "@src/utils/utils";
import EditableBlock from "@components/content/EditableBlock";

interface ContentProps {
  blocks: Blocks;
  setBlocks: (blocks: Blocks, f?: Function) => void;
}

const Content = ({ blocks, setBlocks }: ContentProps) => {
  function updateBlock(block: Block) {
    const index = blocks.map((block) => block.id).indexOf(block.id);
    const updatedBlocks: Blocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: block.tag,
      html: block.html,
    };
    setBlocks(updatedBlocks);
  }

  function addBlock(block: Block) {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const index = blocks.map((block) => block.id).indexOf(block.id);
    const updatedBlocks: Blocks = blocks.concat(blocks, [newBlock]);
    setBlocks(updatedBlocks, () => {});
  }

  function deleteBlock(block: Block) {
    const previousBlock = block.ref?.previousElementSibling;
    if (previousBlock) {
      const index = blocks.map((block) => block.id).indexOf(block.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks, () => {});
    }
  }

  return (
    <Container>
      {blocks.map((block) => (
        <EditableBlock html={block.html} tag={block.tag} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  font-size: 16px;
`;

export default Content;
