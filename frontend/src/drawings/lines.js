import { ref, toRaw, unref } from "vue";
import { toMMV } from "../helpers/helpers.js";

export default {
  name: "lines",
  // draw: (x = 0, y = 0, count = 10, spacing = 4) => {
  draw: (settings) => {
    let { x1, y1, x2, y2, count, spacing } = toRaw(settings);

    const lines = [];
    for (let i = 0; i < count; i++) {
      lines.push(
        `<line x1="${x1 + i}" y1="${y1 + i}" x2="${x2}" y2="${y2}" />`,
      );
      y1 += spacing;
    }
    return lines.join("\n");
  },

  settings: {
    x1: toMMV(0, 1000),
    y1: toMMV(0, 2000),
    x2: toMMV(0, 1000, 0),
    y2: toMMV(0, 2000, 0),
    count: toMMV(0, 100),
    spacing: toMMV(0, 30),
  },
};
