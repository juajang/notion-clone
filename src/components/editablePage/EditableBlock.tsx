import ContentEditable from "react-contenteditable";
import { Block, Menu, Tag } from "@src/types/editable";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import React from "react";
import SelectMenu from "@components/editablePage/SelectMenu";
import { getCaretCoordinates, uid } from "@src/utils/utils";

interface EditableBlockProps {
  id: string;
  html?: string;
  tag?: string;
  placeholder?: string;
  updateBlock: (block: Block) => void;
  addBlock: (block: Block, tag: Tag) => void;
  deleteBlock: (block: Block) => void;
}

const EditableBlock = (props: EditableBlockProps) => {
  const {
    id,
    html: initialHtml = "",
    tag: initialTag = "p",
    updateBlock,
    addBlock,
    placeholder,
    deleteBlock,
  } = props;
  const editableBlockRef = useRef<any>();
  const [html, setHtml] = useState(initialHtml);
  const [tag, setTag] = useState(initialTag);
  const [htmlBackup, setHtmlBackup] = useState("");
  const [previousKey, setPreviousKey] = useState("");
  const [selectMenu, setSelectMenu] = useState<Menu>({
    isOpen: false,
  });

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const editableBlockElement = editableBlockRef.current;
    if (e.key === "/") {
      setHtmlBackup(editableBlockElement.innerHTML);
    }
    if (e.key === "Enter" && previousKey !== "Shift") {
      e.preventDefault();
      addBlock(
        {
          id,
          ref: editableBlockElement,
        },
        {
          id: uid(),
          tag: "p",
        }
      );
    }
    if (editableBlockElement.innerHTML.length === 0 && e.key === "Backspace") {
      e.preventDefault();
      deleteBlock({
        id,
        ref: editableBlockElement,
      });
    }
    setPreviousKey(e.key);
  }

  function openSelectMenu() {
    const { x, y } = getCaretCoordinates();
    setSelectMenu({
      isOpen: true,
      xPosition: x,
      yPosition: y,
    });
  }

  function closeSelectMenu() {
    setSelectMenu({
      isOpen: false,
    });
  }

  function handleKeyUp(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "/") {
      openSelectMenu();
    }
  }

  function selectTag(tag: Tag) {
    setHtml(htmlBackup);
    addBlock(
      {
        id,
        ref: editableBlockRef.current,
      },
      tag
    );
  }

  useEffect(() => {
    closeSelectMenu();
  }, [html]);

  function handleChange(e: any) {
    setHtml(e.target.value);
    updateBlock({
      html: e.target.value,
      tag,
      id,
    });
  }

  return (
    <>
      {selectMenu.isOpen && (
        <SelectMenu
          isOpen={selectMenu.isOpen}
          close={closeSelectMenu}
          selectItem={selectTag}
          xPosition={selectMenu.xPosition}
          yPosition={selectMenu.yPosition}
        />
      )}
      <ContentEditable
        html={html}
        innerRef={editableBlockRef}
        data-placeholder={placeholder}
        tagName={tag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    </>
  );
};

export default EditableBlock;
