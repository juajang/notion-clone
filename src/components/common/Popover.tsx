import React, { ReactNode } from "react";
import styled from "styled-components";
import palette from "@src/utils/palette";

interface PopoverProps {
  children?: ReactNode;
  top?: number;
  left?: number;
}

const Popover = ({ children, top, left }: PopoverProps) => {
  return (
    <Container top={top} left={left}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ top?: number; left?: number }>`
  width: 300px;
  max-height: 300px;
  overflow: auto;
  background: white;
  position: absolute;
  z-index: 100;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  border-radius: 3px;
  box-shadow: ${palette.boxShadow};
  animation: pop 0.2s ease-in-out;
  transform-origin: top left;

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Popover;
