import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { line } from "d3";

export default {
  name: "zigzags",
  draw: (settings) => {
    let { intensity, lines, zigs, width, spacing } = toRaw(settings);

    const output = [];

    for (let i = 0; i < lines; i++) {
      let points = "";

      for (let j = 0; j < zigs + 1; j++) {
        points += `${(j * width) / zigs},${
          j % 2 ? intensity + i * spacing : i * spacing
        } `;
      }

      output.push(`<polyline points="${points}" fill="none" stroke="black" />`);
    }

    return output.join("\n");
  },

  settings: {
    intensity: toMMV(0, 300, 6),
    zigs: toMMV(0, 30, 10),
    lines: toMMV(0, 500, 118),
    width: toMMV(0, 300, 86),
    spacing: toMMV(0, 10, 2),
  },
};
