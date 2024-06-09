import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { line } from "d3";

export default {
  name: "zigzags",
  draw: (settings) => {
    let { intensity, lines, zigs, width } = toRaw(settings);

    const output = [];

    for (let i = 0; i < lines; i++) {
      let points = "";

      for (let j = 0; j < zigs; j++) {
        points += `${(j * width) / zigs},${j % 2 ? intensity + i : i} `;
      }

      output.push(`<polyline points="${points}" fill="none" stroke="black" />`);
    }

    return output.join("\n");
  },

  settings: {
    intensity: toMMV(0, 300, 15),
    zigs: toMMV(0, 30, 10),
    lines: toMMV(0, 500, 100),
    width: toMMV(0, 300, 100),
  },
};
