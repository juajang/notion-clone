export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const setCaretToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const selection: Selection | null = window.getSelection();
  if (!selection) {
    return;
  }
  range?.selectNodeContents(element);
  range?.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};

export const getCaretOffset = () => {
  let offset = 0;
  const selection: Selection | null = window.getSelection();
  if (selection?.rangeCount && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    offset = range.startOffset;
  }
  return offset;
}

export const setCaretOffset = (element: Element, offset: number) => {
  const selection: Selection | null = window.getSelection();
  const range = document.createRange();
  const textNode = element?.firstChild?.textContent;

  if (!element || !element?.firstChild || !textNode) {
    return;
  }

  const rangeOffset = offset <= textNode?.length ? offset : textNode.length;
  range.setStart(element.firstChild, rangeOffset);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export const getCaretCoordinates = () => {
  let x, y;
  const selection: Selection | null = window.getSelection();
  if (selection?.rangeCount && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top;
    }
  }
  return {x, y};
};

export const setCaretToLeft = (element: Element) => {
  const textNode = element?.firstChild?.textContent;
  const currentOffset = getCaretOffset();
  const previousElement = element.previousElementSibling as HTMLElement

  // 왼쪽 끝에 caret이 있는 경우, 위의 block 끝으로 이동
  if (textNode?.length === 0 || currentOffset === 0) {
    if (previousElement) {
      setCaretOffset(previousElement, previousElement?.firstChild?.textContent?.length as number)
    }
  } else {
    setCaretOffset(element, currentOffset - 1)
  }
};

export const setCaretToRight = (element: Element) => {
  const textNode = element?.firstChild?.textContent;
  const currentOffset = getCaretOffset();

  // 오른쪽 끝에 caret이 있는 경우, 아래의 block 처음으로 이동
  if (currentOffset === textNode?.length) {
    const nextElement = element.nextElementSibling as HTMLElement
    if (nextElement) {
      setCaretOffset(nextElement, 0);
    }
  } else {
    setCaretOffset(element, currentOffset + 1);
  }
}

export const setCaretToUp = (element: Element) => {
  const previousElement = element?.previousElementSibling;
  const textNode: any = previousElement?.firstChild;
  const currentOffset = getCaretOffset();

  if (previousElement) {
    setCaretOffset(previousElement, currentOffset);
  }
}

export const setCaretToDown = (element: Element) => {
  const nextElement = element?.nextElementSibling;
  const textNode: any = nextElement?.firstChild;
  const currentOffset = getCaretOffset();

  if (nextElement) {
    setCaretOffset(nextElement, currentOffset);
  }
}
