import React, { ReactNode } from "react";
import styled from "styled-components";

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
  width: 500px;
  position: absolute;
  top: ${(props) => props.yPosition};
  left: ${(props) => props.xPosition};
`;

export default Popover;
