import { ref, toRaw, unref } from "vue";

export default {
  name: "lines",
  // draw: (x = 0, y = 0, count = 10, spacing = 4) => {
  draw: (settings) => {
    let { x = 0, y = 0, count = 10, spacing = 4 } = toRaw(settings);

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
    x: 0,
    y: 0,
    count: 10,
    spacing: 4,
  },
};
