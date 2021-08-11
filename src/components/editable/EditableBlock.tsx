import ContentEditable from "react-contenteditable";
import { Block, Menu, Tag } from "@src/types/editable";
import { useEffect, useRef, useState } from "react";
import React from "react";
import SelectMenu from "@components/editable/SelectMenu";
import { getCaretCoordinates } from "@src/utils/utils";
import { tags } from "@components/common";

interface EditableBlockProps extends Block {
  position: number;
  updateBlock: (block: Block) => void;
  addBlock: (currentBock: Block, newTag: Tag) => void;
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
        addBlock(
          {
            id,
            ref: editableBlockElement,
          },
          tags.p
        );
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

  function selectTag(selectedTag: Tag) {
    const innerHTML = editableBlockRef.current.innerHTML;
    updateBlock({
      id,
      html: innerHTML.substr(0, innerHTML.length - 1),
    });
    addBlock(
      {
        id,
        ref: editableBlockRef.current,
      },
      selectedTag
    );
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
