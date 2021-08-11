import ContentEditable from "react-contenteditable";
import { Block, Menu } from "@src/types/editable";
import { useEffect, useRef, useState } from "react";
import React from "react";
import SelectMenu from "@components/editable/SelectMenu";
import { getCaretCoordinates } from "@src/utils/utils";

interface EditableBlockProps extends Block {
  position: number;
  updateBlock: (block: Block) => void;
  addBlock: (block: Block) => void;
  deleteBlock: (block: Block) => void;
}

const EditableBlock = (props: EditableBlockProps) => {
  const {
    id,
    html = "",
    tag,
    position,
    updateBlock,
    addBlock,
    placeholder,
    deleteBlock,
  } = props;
  const editableBlockRef = useRef<any>();
  const [previousKey, setPreviousKey] = useState("");
  const [selectMenu, setSelectMenu] = useState<Menu>({
    isOpen: false,
  });

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const editableBlockElement = editableBlockRef.current;
      setPreviousKey(e.key);
      if (e.isComposing) {
        return;
      }
      if (!selectMenu.isOpen && e.key === "Enter" && previousKey !== "Shift") {
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
    };

    const editableBlockElement = editableBlockRef.current;
    editableBlockElement.addEventListener("keydown", handleKeydown);
    return () => {
      editableBlockElement.removeEventListener("keydown", handleKeydown);
    };
  }, [addBlock, deleteBlock, id, previousKey, selectMenu.isOpen]);

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

  function selectTag(selectedTag: string) {
    const innerHTML = editableBlockRef.current.innerHTML;
    updateBlock({
      id,
      tag,
      html: innerHTML.substr(0, innerHTML.length - 1),
    });
    addBlock({
      id,
      tag: selectedTag,
      ref: editableBlockRef.current,
    });
  }

  useEffect(() => {
    closeSelectMenu();
  }, [html]);

  function handleChange(e: any) {
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
