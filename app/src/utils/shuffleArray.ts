/**
 * Shuffles an array in place.
 * @param array - The array to shuffle.
 * @returns The shuffled array.
 */
export const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};
