import React from "react";
import styled from "styled-components";
import { Title } from "@components/header";

const Page = () => {
  return (
    <Container>
      <Title />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  padding: 5rem calc(96px + env(safe-area-inset-right)) 5rem
    calc(96px + env(safe-area-inset-left));
`;

export default Page;
