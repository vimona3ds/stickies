import { GameElements } from "../types";

export function isGameElements(value: { [K: string]: Element | null; }): value is GameElements {
  for (const [key, element] of Object.entries(value)) {
    if (key === 'inputElement' && !(element instanceof HTMLInputElement)) {
      return false;
    }

    if (!(element instanceof HTMLElement)) {
      return false;
    }
  }

  return true;
}