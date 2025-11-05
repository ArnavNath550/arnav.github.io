export const toHindiNumerals = (input: number | string): string => {
  // Map of Western digits to Hindi numerals
  const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  // Convert input to string, then replace each digit with its Hindi equivalent
  return input
    .toString()
    .replace(/\d/g, digit => hindiDigits[Number(digit)]);
}

export function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined; // Handle empty array case
  }
  const randomIndex: number = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
