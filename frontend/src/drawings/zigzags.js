import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { line } from "d3";

export default {
  name: "zigzags",
  draw: (settings) => {
    let { intensity, count } = toRaw(settings);

    const output = [];

    for (let i = 0; i < count; i++) {
      let points = "";

      for (let j = 0; j < 10; j++) {
        points += `${j * 10},${j % 2 ? intensity + i : 0 + i} `;
      }

      output.push(`<polyline points="${points}" fill="none" stroke="black" />`);
    }

    return output.join("\n");
  },

  settings: {
    intensity: toMMV(0, 300, 15),
    count: toMMV(0, 50),
  },
};
