const getUniqueCombinations = (
  variants: { name: string; values: string[] }[]
) => {
  const result: string[][] = [];

  const backtrack = (index: number, currentCombination: string[]) => {
    // If the current combination is complete, add it to the result
    if (index === variants.length) {
      result.push([...currentCombination]);
      return;
    }

    // Iterate through the values of the current variant
    for (const value of variants[index].values) {
      currentCombination.push(value); // Add the current value
      backtrack(index + 1, currentCombination); // Move to the next variant
      currentCombination.pop(); // Remove the last value to backtrack
    }
  };

  backtrack(0, []); // Start the backtracking process
  return result;
};

export default getUniqueCombinations;
