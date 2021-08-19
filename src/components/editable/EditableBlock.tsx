import ContentEditable from "react-contenteditable";
import {Block, Menu, Tag} from "@src/types/editable";
import React, {useEffect, useRef, useState} from "react";
import SelectMenu from "@components/editable/SelectMenu";
import {getCaretCoordinates} from "@src/utils/utils";
import {tags} from "@components/common";

interface EditableBlockProps extends Block {
  position: number;
  updateBlock: (block: Block) => void;
  addBlock: (currentBock: Block, newTag: Tag) => void;
  deleteBlock: (block: Block) => void;
  handleArrowUp: Function
  handleArrowDown: Function
  handleArrowLeft: Function
  handleArrowRight: Function
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
    handleArrowDown,
    handleArrowLeft,
    handleArrowRight,
    handleArrowUp
  } = props;
  const editableBlockRef = useRef<any>();
  const [previousKey, setPreviousKey] = useState("");
  const [selectMenu, setSelectMenu] = useState<Menu>({
    isOpen: false,
  });

  useEffect(() => {
    const handleKeydown = (e: any) => {
      const editableBlockElement = editableBlockRef.current;
      const {key} = e;
      setPreviousKey(key);
      if (e.isComposing || selectMenu.isOpen) {
        return;
      }
      if (key === "Enter" && previousKey !== "Shift") {
        e.preventDefault();
        addBlock(
          {
            id,
            ref: editableBlockElement,
          },
          tags.p
        );
      }
      else if (editableBlockElement.innerHTML.length === 0 && key === "Backspace") {
        e.preventDefault();
        deleteBlock({
          id,
          ref: editableBlockElement,
        });
      } else if (key === "ArrowUp") {
        e.preventDefault();
        handleArrowUp(editableBlockElement);
      } else if (key === "ArrowDown") {
        e.preventDefault();
        handleArrowDown(editableBlockElement);
      } else if (key === "ArrowLeft") {
        e.preventDefault();
        handleArrowLeft(e, editableBlockElement);
      } else if (key === "ArrowRight") {
        e.preventDefault();
        handleArrowRight(e, editableBlockElement);
      }
    };

    const editableBlockElement = editableBlockRef.current;
    editableBlockElement.addEventListener("keydown", handleKeydown);
    return () => {
      editableBlockElement.removeEventListener("keydown", handleKeydown);
    };
  }, [
    addBlock,
    deleteBlock,
    id,
    previousKey,
    selectMenu.isOpen,
  ]);

  function openSelectMenu() {
    const {x, y} = getCaretCoordinates();
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
        className={`e-${position}`}
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
