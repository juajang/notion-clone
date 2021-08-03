import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popover } from "@src/components/common";
import { Menu } from "@src/types/content";

const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title",
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph",
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
  }, []);

  return (
    <Popover xPosition={xPosition} yPosition={yPosition}>
      <h1> Select Menu </h1>
      <List>
        {matchedItems.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </List>
    </Popover>
  );
};

const List = styled.ul``;

export default SelectMenu;
