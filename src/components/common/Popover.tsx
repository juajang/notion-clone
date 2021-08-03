import React, { ReactNode } from "react";
import styled from "styled-components";
import palette from "@src/utils/palette";

interface PopoverProps {
  children?: ReactNode;
  xPosition?: number;
  yPosition?: number;
}

const Popover = ({ children, xPosition, yPosition }: PopoverProps) => {
  return (
    <Container xPosition={xPosition} yPosition={yPosition}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ xPosition?: number; yPosition?: number }>`
  width: 300px;
  max-height: 300px;
  overflow: auto;
  padding: 1rem;
  background: white;
  position: absolute;
  z-index: 100;
  top: ${(props) => props.yPosition};
  left: ${(props) => props.xPosition};
  border-radius: 3px;
  box-shadow: ${palette.boxShadow};
`;

export default Popover;
