import React, { useState } from "react";
import styled from "styled-components";
import Header from "@components/header";
import { uid } from "@src/utils/utils";
import Editable from "@components/editable";
import { Blocks } from "@src/types/editable";
import { tags } from "@components/common";

const initialBlock = {
  id: uid(),
  html: "",
  ...tags.p,
};

const Page = () => {
  const [blocks, setBlocks] = useState<Blocks>([initialBlock]);

  return (
    <Container>
      <Content>
        <Header>
          <Header.Title />
        </Header>
        <Editable>
          <Editable.Page blocks={blocks} setBlocks={setBlocks} />
        </Editable>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
`;

const Content = styled.div`
  width: 900px;
  max-width: 100%;
`;

export default Page;
