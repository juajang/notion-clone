import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popover, tags } from "@src/components/common";
import { Menu } from "@src/types/editable";
import palette from "@src/utils/palette";

interface SelectMenuProps extends Menu {
  close: () => void;
  selectItem: Function;
}

const SelectMenu = (props: SelectMenuProps) => {
  const { xPosition, yPosition, selectItem, close } = props;
  const [command, setCommand] = useState("");
  const [matchedItems, setMatchedItems] = useState(Object.values(tags));
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          selectItem(matchedItems[selectedItemIndex]);
          close();
          break;
        case "Backspace":
          if (!command) {
            close();
          }
          setCommand(command.substring(0, command.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedItemIndex(
            selectedItemIndex === 0
              ? matchedItems.length - 1
              : selectedItemIndex - 1
          );
          break;
        case "ArrowDown":
        case "Tab":
          e.preventDefault();
          setSelectedItemIndex(
            selectedItemIndex === matchedItems.length - 1
              ? 0
              : selectedItemIndex + 1
          );
          break;
        default:
          setCommand(command.concat(command, e.key));
          break;
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [close, command, matchedItems, selectItem, selectedItemIndex]);

  return (
    <Popover left={xPosition && xPosition} top={yPosition && yPosition + 26}>
      <H4> 기본 블록 </H4>
      <ul>
        {matchedItems.map((item, index) => (
          <Li
            key={index}
            role="button"
            isSelected={selectedItemIndex === index}
            onClick={() => {
              selectItem(item);
              close();
            }}
          >
            {item.label} <span> {item.subLabel}</span>
          </Li>
        ))}
      </ul>
    </Popover>
  );
};

const H4 = styled.h4`
  color: ${palette.grey2};
  font-size: 12px;
  padding: 1rem;
`;

const Li = styled.li<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.isSelected ? palette.grey0 : "white")};

  &:hover {
    background-color: ${palette.grey0};
  }

  span {
    padding: 6px 0;
    font-size: 12px;
    color: ${palette.grey2};
  }
`;

export default SelectMenu;
