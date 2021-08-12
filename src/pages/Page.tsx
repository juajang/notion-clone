import React from "react";
import styled from "styled-components";
import Header from "@components/header";
import Editable from "@components/editable";

const Page = () => {
  return (
    <Container>
      <Content>
        <Header>
          <Header.Title />
          <Header.Date />
        </Header>
        <Editable>
          <Editable.Page />
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
