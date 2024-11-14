import { toMMV } from "../helpers/helpers.js";

export default {
  name: "alternating-sine-lines",
  draw: (settings) => {
    let { columns, columnTightness, intensity } = settings;

    const output = [];

    for (let column = 0; column < columns; column++) {
      output.push(
        `<line x1="${(column * columnTightness) / 10}" y1="${0}" x2="${
          (column * columnTightness) / 10
        }" y2="${Math.sin(column) * intensity}"></line>`,
      );
    }

    return output.join("\n");
  },

  settings: {
    columns: toMMV(0, 100, 90),
    columnTightness: toMMV(0, 100, 30),
    intensity: toMMV(0, 200, 60),
  },
};
