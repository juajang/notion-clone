import {useEffect, useState} from "react";
import {setCaretOffset, getCaretOffset} from "@src/utils/utils";

interface Caret {
  offset: number;
  container?: HTMLElement;
}

export default function useCaret() {
  const [caret, setCaret] = useState<Caret>({
    offset: 0,
  })
  const [previousKey, setPreviousKey] = useState("");
  // selection change를 관찰하고 있어야 함
  // prev key가 방향키가 아니라면 offset 갱신

  useEffect(() => {
    if (caret.container) {
      setCaretOffset(caret.container, caret.offset)
    }
  }, [caret])

  const setCaretToLeft = (element: HTMLElement) => {
    const textNode = element?.firstChild?.textContent;
    const currentOffset = getCaretOffset();
    const previousElement = element.previousElementSibling as HTMLElement
    setPreviousKey("ArrowLeft");

    // 왼쪽 끝에 caret이 있는 경우, 위의 block 끝으로 이동
    if (textNode?.length === 0 || currentOffset === 0) {
      if (previousElement) {
        const prevOffset = previousElement?.firstChild?.textContent?.length as number;
        setCaret({
          container: previousElement,
          offset: prevOffset
        })
      }
    } else {
      setCaret({
        container: element,
        offset: currentOffset - 1
      })
    }
  };

  const setCaretToRight = (element: HTMLElement) => {
    const textNode = element?.firstChild?.textContent;
    const currentOffset = getCaretOffset();
    setPreviousKey("ArrowRight");

    // 오른쪽 끝에 caret이 있는 경우, 아래의 block 처음으로 이동
    if (currentOffset === textNode?.length) {
      const nextElement = element.nextElementSibling as HTMLElement
      if (nextElement) {
        setCaret({
          container: nextElement,
          offset: 0,
        })
      }
    } else {
      setCaret({
        container: element,
        offset: currentOffset + 1
      })
    }
  }

  const setCaretToUp = (element: Element) => {
    const previousElement = element?.previousElementSibling as HTMLElement;
    setPreviousKey("ArrowUp");

    // 위나 아래로 이동시 이전의 caret offset 유지
    if (previousElement) {
      setCaret((prevState) => ({
        ...prevState,
          container: previousElement,
        })
      )
    }
  }

  const setCaretToDown = (element: Element) => {
    const nextElement = element?.nextElementSibling as HTMLElement;
    setPreviousKey("ArrowDown");

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