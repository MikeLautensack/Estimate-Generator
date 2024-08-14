export const roundUpToNiceNumber = (num: number) => {
  const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
  const normalized = num / magnitude;
  let rounded;

  if (normalized <= 1.5) {
    rounded = 2;
  } else if (normalized <= 3) {
    rounded = 5;
  } else {
    rounded = 10;
  }

  return rounded * magnitude;
};
