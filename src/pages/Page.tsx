import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "@components/header";
import { uid } from "@src/utils/utils";
import Content from "@components/content/Content";
import { Blocks } from "@src/types/content";

const initialBlock = { id: uid(), html: "", tag: "p" };

const Page = () => {
  const [blocks, setBlocks] = useState<Blocks>([initialBlock]);

  return (
    <Container>
      <Title />
      <Content blocks={blocks} setBlocks={setBlocks} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  width: 900px;
  max-width: 100%;
  padding: 5rem calc(96px + env(safe-area-inset-right)) 5rem
    calc(96px + env(safe-area-inset-left));
`;

export default Page;
