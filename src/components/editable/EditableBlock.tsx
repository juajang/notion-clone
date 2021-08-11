import ContentEditable from "react-contenteditable";
import { Block, Menu, Tag } from "@src/types/editable";
import { useEffect, useRef, useState } from "react";
import React from "react";
import SelectMenu from "@components/editable/SelectMenu";
import { getCaretCoordinates, uid } from "@src/utils/utils";

interface EditableBlockProps extends Block {
  position: number;
  updateBlock: (block: Block) => void;
  addBlock: (block: Block) => void;
  deleteBlock: (block: Block) => void;
}

const EditableBlock = (props: EditableBlockProps) => {
  const {
    id,
    html: initialHtml = "",
    tag: initialTag,
    position,
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

  useEffect(() => {
    const editableBlockElement = editableBlockRef.current;

    const handleKeypress = (e: KeyboardEvent) => {
      if (e.isComposing) {
        return;
      }
      if (e.key === "/") {
        setHtmlBackup(editableBlockElement.innerHTML);
      }
      if (e.key === "Enter" && previousKey !== "Shift") {
        e.preventDefault();
        addBlock({
          id,
          tag: "p",
          ref: editableBlockElement,
        });
      }
      if (
        editableBlockRef.current.innerHTML.length === 0 &&
        e.key === "Backspace"
      ) {
        e.preventDefault();
        deleteBlock({
          id,
          ref: editableBlockElement,
        });
      }
      setPreviousKey(e.key);
    };

    editableBlockElement.addEventListener("keydown", handleKeypress);

    return () => {
      editableBlockElement.removeEventListener("keydown", handleKeypress);
    };
  }, [addBlock, deleteBlock, id, previousKey]);

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

  function handleKeyUp(e: any) {
    if (e.key === "/") {
      openSelectMenu();
    }
  }

  function selectTag(tag: Tag) {
    setHtml(htmlBackup);
    addBlock({
      id,
      tag: tag.tag,
      ref: editableBlockRef.current,
    });
  }

  useEffect(() => {
    closeSelectMenu();
  }, [html]);

  function handleChange(e: any) {
    setHtml(e.target.value);
    updateBlock({
      html: e.target?.value,
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
        data-position={position}
        tagName={tag}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </>
  );
};

export default EditableBlock;
