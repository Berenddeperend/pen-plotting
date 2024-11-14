import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";

export default {
  name: "circles-wavy",
  draw: (settings) => {
    let { rows, columns, spacing, size } = toRaw(settings);

    const output = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        output.push(
          `
          <g>
            <circle
              cx=${x * spacing}
              cy=${y * spacing}
              r=${((2 + Math.sin(y / 4 + x)) * size) / 2}
              fill="none"
              stroke="black"
            ></circle>
          </g>
        `
            .split("\n")
            .join(""),
        );
      }
    }

    return output.join("\n");
  },

  settings: {
    rows: toMMV(0, 60, 20),
    columns: toMMV(0, 60, 13),
    spacing: toMMV(0, 100, 6),
    size: toMMV(0, 50, 1),
  },
};
