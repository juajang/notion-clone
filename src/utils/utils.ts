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

export const getSelectionRangeInfo = (element: HTMLElement) => {
  let isStart = false, isEnd = false;
  let selectionRange, testRange;
  const selection: Selection | null = window.getSelection();

  if (selection?.rangeCount) {
    selectionRange = selection.getRangeAt(0);
    testRange = selectionRange.cloneRange();

    testRange.selectNodeContents(element);
    testRange.setEnd(selectionRange.startContainer, selectionRange.startOffset);
    isStart = (testRange.toString() == "");

    testRange.selectNodeContents(element);
    testRange.setStart(selectionRange.endContainer, selectionRange.endOffset);
    isEnd = (testRange.toString() == "");
  }

  return { isStart: isStart, isEnd: isEnd };
};


export const setCaretOffset = (element: Node, offset: number) => {
  const selection: Selection | null = window.getSelection();
  const range = document.createRange();

  let rangeOffset = 0;
  if (element.textContent) {
    rangeOffset = offset < element.textContent.length ? offset : element.textContent.length
  }

  range.setStart(element, rangeOffset);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

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
