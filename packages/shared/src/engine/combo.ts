export function nextCombo(currentCombo: number, wasCorrect: boolean): number {
  return wasCorrect ? currentCombo + 1 : 0;
}
