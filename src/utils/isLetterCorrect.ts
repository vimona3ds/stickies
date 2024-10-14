const conversionMap: Record<string, string> = {
  "‘": "'",
  "’": "'",
  "“": '"',
  "”": '"',
};

export function isLetterCorrect(letter: string, key: string) {
  letter = conversionMap[letter] || letter;
  key = conversionMap[key] || key;

  return letter === key;
}
