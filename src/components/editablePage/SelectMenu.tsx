import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Popover } from "@src/components/common";
import { Menu } from "@src/types/content";
import palette from "@src/utils/palette";
import { matchSorter } from "match-sorter";

const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "제목1",
    subLabel: "섹션 제목(대)",
  },
  {
    id: "heading",
    tag: "h2",
    label: "제목2",
    subLabel: "섹션 제목(중)",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "제목3",
    subLabel: "섹션 제목(소)",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "텍스트",
    subLabel: "일반 텍스트를 사용해 쓰기를 시작하세요.",
  },
];

interface SelectMenuProps extends Menu {
  close: () => void;
  selectItem: (item: string) => void;
}

const SelectMenu = (props: SelectMenuProps) => {
  const { xPosition, yPosition, selectItem, close } = props;
  const [command, setCommand] = useState("");
  const [matchedItems, setMatchedItems] = useState(allowedTags);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          selectItem(matchedItems[selectedItemIndex].tag);
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
      <H3> 기본 블록 </H3>
      <ul>
        {matchedItems.map((item, index) => (
          <Li
            key={item.id}
            role="button"
            tabIndex={0}
            isSelected={selectedItemIndex === index}
            onClick={() => {
              selectItem(item.tag);
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

const H3 = styled.h3`
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
