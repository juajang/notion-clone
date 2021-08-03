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
  element?.focus();
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
  return { x, y };
};
