import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { line, curveBasisClosed } from "d3";

export default {
  name: "lines-grid",
  draw: (settings) => {
    let { rows, columns, spacing, size, rotation } = toRaw(settings);

    const output = [];

    let i = 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        i++;

        const rotated = `rotate(${rotation} ${x * spacing + size / 2} ${
          y * spacing + size / 2
        })`;

        output.push(
          `
          <g transform="${i % 2 ? rotated : ""}">
            <line
              x1=${x * spacing}
              x2=${x * spacing + size}
              y1=${y * spacing + size / 2}
              y2=${y * spacing + size / 2}
            ></line>
            <line
              x1=${x * spacing + size / 2}
              x2=${x * spacing + size / 2}
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
    rows: toMMV(0, 60, 20),
    columns: toMMV(0, 60, 13),
    spacing: toMMV(0, 100, 19),
    size: toMMV(0, 50, 10),
    rotation: toMMV(0, 100, 45),
  },
};
