import ContentEditable from "react-contenteditable";
import { Block } from "@src/types/content";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import Page from "@src/pages/Page";

interface EditableBlockProps {
  id: string;
  html?: string;
  tag?: string;
  updateBlock: (block: Block) => void;
  addBlock: (block: Block) => void;
  deleteBlock: (block: Block) => void;
}

const EditableBlock = (props: EditableBlockProps) => {
  const {
    id,
    html: initialHtml = "",
    tag: initialTag = "p",
    updateBlock,
    addBlock,
    deleteBlock,
  } = props;
  const editableBlockRef = useRef<any>();
  const [html, setHtml] = useState(initialHtml);
  const [tag, setTag] = useState(initialTag);
  const [htmlBackup, setHtmlBackup] = useState("");
  const [previousKey, setPreviousKey] = useState("");

  function handleKeydown(e: any) {
    if (e.key === "/") {
      setHtmlBackup(html);
    }
    if (e.key === "Enter" && previousKey !== "Shift") {
      e.preventDefault();
      addBlock({
        id,
        ref: editableBlockRef.current,
      });
    }
    if (
      editableBlockRef.current.innerHTML.length === 0 &&
      e.key === "Backspace"
    ) {
      e.preventDefault();
      deleteBlock({
        id,
        ref: editableBlockRef.current,
      });
    }
    setPreviousKey(e.key);
  }

  const handleChange = (e: any) => {
    setHtml(e.target.value);
    updateBlock({
      html: e.target.value,
      tag,
      id,
    });
  };

  return (
    <ContentEditable
      html={html}
      innerRef={editableBlockRef}
      tagName={tag}
      onChange={handleChange}
      onKeyDown={handleKeydown}
    />
  );
};

export default EditableBlock;
