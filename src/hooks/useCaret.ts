import { useEffect, useState } from "react";
import { getCaretOffset, getSelectionRangeInfo, setCaretOffset } from "@src/utils/utils";

interface Caret {
  offset?: number;
  container?: HTMLElement;
}

export default function useCaret() {
  const [caret, setCaret] = useState<Caret>({});

  useEffect(() => {
    if (caret.container && caret.offset !== undefined) {
      setCaretOffset(caret.container, caret.offset);
    }
  }, [caret]);

  const setCaretToLeft = (e: any, element: HTMLElement) => {
    const selection: Selection | null = window.getSelection();
    const { isStart, isEnd } = getSelectionRangeInfo(element);
    const range = document.createRange();

    const currentOffset = getCaretOffset();
    const currentNode = selection?.anchorNode as HTMLElement
    const textContent = currentNode?.textContent;

    if (currentOffset == 0) {
      if (isStart && element.previousElementSibling) {
        const previousElement = element.previousElementSibling.lastChild as HTMLElement;
        setCaret({
          container: previousElement,
          offset: previousElement.textContent?.length as number,
        });
      } else if (currentNode?.previousSibling) {
        const previousSibling = currentNode?.previousSibling as HTMLElement;
        setCaret({
          container: previousSibling,
          offset: previousSibling.textContent?.length as number -  1,
        });
      }
    } else {
      setCaret({
        container: currentNode,
        offset: currentOffset - 1
      });
    }
  };


  const setCaretToRight = (e: any, element: HTMLElement) => {
    const selection: Selection | null = window.getSelection();
    const { isStart, isEnd } = getSelectionRangeInfo(element);
    const range = document.createRange();

    const currentOffset = getCaretOffset();
    const currentNode = selection?.anchorNode as HTMLElement
    const textContent = currentNode?.textContent;

    if (!currentNode || !textContent) {
      return;
    }

    if (currentOffset === textContent.length) {
      if (isEnd && element.nextElementSibling) {
        setCaret({
          container: element.nextElementSibling.firstChild as HTMLElement,
          offset: 0
        });
      } else {
        setCaret({
          container: currentNode?.nextSibling as HTMLElement,
          offset: 1
        });
      }
    } else {
      setCaret({
        container: currentNode,
        offset: currentOffset + 1
      });
    }
  };

  const setCaretToUp = (element: HTMLElement) => {
      const selection: Selection | null = window.getSelection();
      const { isStart, isEnd } = getSelectionRangeInfo(element);
      const range = document.createRange();

      const currentOffset = getCaretOffset();
      const currentNode = selection?.anchorNode as HTMLElement;

      if (!currentNode) {
        return;
      }

      let container: HTMLElement;
      if (!currentNode?.textContent || currentNode === element.firstChild) {
        if (element.previousElementSibling?.lastChild) {
          container = element.previousElementSibling.lastChild as HTMLElement;
        } else {
          container = element.previousElementSibling as HTMLElement;
        }
      } else {
        container = currentNode?.previousSibling?.previousSibling as HTMLElement;
      }

      setCaret((prevState) => ({
        container,
        offset: prevState.offset ?? currentOffset
      }));
    }
  ;

  const setCaretToDown = (element: HTMLElement) => {
    const selection: Selection | null = window.getSelection();
    const { isStart, isEnd } = getSelectionRangeInfo(element);
    const range = document.createRange();

    const currentOffset = getCaretOffset();
    const currentNode = selection?.anchorNode as HTMLElement;

    let container: HTMLElement;
    if (!currentNode?.textContent || currentNode === element.lastChild) {
      if (element.nextElementSibling?.firstChild) {
        container = element.nextElementSibling.firstChild as HTMLElement;
      } else {
        container = element.nextElementSibling as HTMLElement;
      }
    } else {
      container = currentNode?.nextSibling?.nextSibling as HTMLElement;
    }

    setCaret((prevState) => ({
      container,
      offset: prevState.offset ?? currentOffset
    }));
  };

  return {
    setCaretToLeft,
    setCaretToRight,
    setCaretToDown,
    setCaretToUp
  };
}