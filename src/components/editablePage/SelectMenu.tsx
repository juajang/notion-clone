import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popover } from "@src/components/common";
import { Menu } from "@src/types/content";
import palette from "@src/utils/palette";

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
}

const SelectMenu = ({ xPosition, yPosition, close }: SelectMenuProps) => {
  const [command, setCommand] = useState("");
  const [matchedItems, setMatchedItems] = useState(allowedTags);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          break;
        case "Backspace":
          if (!command) {
            close();
          }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [close, command]);

  return (
    <Popover
      left={xPosition && xPosition + 20}
      top={yPosition && yPosition + 26}
    >
      <H3> 기본 블록 </H3>
      <List>
        {matchedItems.map((item) => (
          <li key={item.id} role="button" tabIndex={0}>
            {item.label} <span> {item.subLabel}</span>
          </li>
        ))}
      </List>
    </Popover>
  );
};

const H3 = styled.h3`
  color: ${palette.grey2};
  font-size: 12px;
  padding: 1rem;
`;

const List = styled.ul`
  li {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: ${palette.grey0};
    }
  }

  span {
    padding: 6px 0;
    font-size: 12px;
    color: ${palette.grey2};
  }
`;

export default SelectMenu;
