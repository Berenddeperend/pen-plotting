export const toMMV = (min, max, value) => {
  return {
    min,
    max,
    value: Number.isInteger(value) ? value : parseInt(min + max / 2),
  };
};
