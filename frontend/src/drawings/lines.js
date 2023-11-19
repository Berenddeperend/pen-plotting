import { ref, toRaw, unref } from "vue";

const toMMV = (min, max, value) => {
  return {
    min,
    max,
    value: value ? value : parseInt(min + max / 2),
  };
};

const toValues = (mmvObj) => {
  return Object.entries(mmvObj).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {});
};

export default {
  name: "lines",
  // draw: (x = 0, y = 0, count = 10, spacing = 4) => {
  draw: (settings) => {
    let { x = 0, y = 0, count = 10, spacing = 4 } = toRaw(toValues(settings));

    const lines = [];
    for (let i = 0; i < count; i++) {
      lines.push(
        `<line x1="${x + i}" y1="${
          y + i
        }" x2="100" y2="100"  stroke="black" />`,
      );
      y += spacing;
    }
    return lines.join("\n");
  },

  settings: {
    x: toMMV(0, 1000),
    y: toMMV(0, 200),
    count: toMMV(0, 100),
    spacing: toMMV(0, 30),
  },
};
