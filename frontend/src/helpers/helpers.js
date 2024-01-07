export const toMMV = (min, max, value) => {
  return {
    min,
    max,
    value: Number.isInteger(value) ? value : parseInt(min + max / 2),
  };
};

export const paperSizeMapping = {
  a4: { width: 210, height: 297 }, // this assumes portrait. Todo: rewrite to 'tall' and 'short' maybe?
  a5: { width: 148, height: 210 },
  a6: { width: 105, height: 148 },
};
