export function isHTMLInputElement(
  element: HTMLElement,
): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}
