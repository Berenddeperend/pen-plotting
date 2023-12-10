import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { line, curveBasisClosed } from "d3";

export default {
  name: "lines-grid",
  draw: (settings) => {
    let { rows, columns, spacing, size, rotationMultiplier } = toRaw(settings);

    const output = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        output.push(
          `
          <g>
            <line
              transform="rotate(${y * x * rotationMultiplier} ${
                x * spacing + size / 2
              } ${y * spacing + size / 2})"
              x1=${x * spacing}
              x2=${x * spacing + size}
              y1=${y * spacing}
              y2=${y * spacing + size}
            ></line>
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
    rows: toMMV(0, 300),
    columns: toMMV(0, 300, 76),
    spacing: toMMV(0, 100, 9),
    size: toMMV(0, 50, 5),
    rotationMultiplier: toMMV(0, 10, 7),
  },
};
