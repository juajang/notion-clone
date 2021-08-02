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
