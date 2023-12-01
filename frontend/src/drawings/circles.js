import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { line, curveBasisClosed } from "d3";

export default {
  name: "circles",
  draw: (settings) => {
    let { rows, columns, spacing, size, rotationMultiplier } = toRaw(settings);

    const output = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        output.push(
          `
          <g>
            <circle
              cx=${x * spacing + size / 2}
              cy=${y * spacing + size / 2}
              r=${size / 2}
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
    rows: toMMV(0, 300, 20),
    columns: toMMV(0, 300, 20),
    spacing: toMMV(0, 100, 24),
    size: toMMV(0, 50, 40),
  },
};
