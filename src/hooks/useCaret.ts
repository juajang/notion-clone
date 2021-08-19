import { useEffect, useState } from "react";
import { getCaretOffset, getSelectionRangeInfo, setCaretOffset } from "@src/utils/utils";

interface Caret {
  offset: number;
  container?: HTMLElement;
}

export default function useCaret() {
  const [caret, setCaret] = useState<Caret>({
    offset: 0
  });

  useEffect(() => {
    if (caret.container) {
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
      setCaret((prevState) => ({
        container: currentNode,
        offset: prevState.offset + 1
      }));
    }
  };

  const setCaretToUp = (element: Element) => {
    const previousElement = element?.previousElementSibling as HTMLElement;

    // 위나 아래로 이동시 이전의 caret offset 유지
    if (previousElement) {
      setCaret((prevState) => ({
          ...prevState,
          container: previousElement
        })
      );
    }
  };

  const setCaretToDown = (element: Element) => {
    const nextElement = element?.nextElementSibling as HTMLElement;

    if (nextElement) {
      setCaret((prevState) => ({
        ...prevState,
        container: nextElement,
      }))
    }
  }

  return {
    setCaretToLeft,
    setCaretToRight,
    setCaretToDown,
    setCaretToUp
  };
}