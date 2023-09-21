export const getRandomNumbers = (min: number, max: number, length: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const numbers: number[] = [];

  for (let i = 0; i < length; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1) + min));
  }

  return numbers;
};
