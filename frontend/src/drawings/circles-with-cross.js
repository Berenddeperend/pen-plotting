import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";

export default {
  name: "circles-wavy",
  draw: (settings) => {
    let { rows, columns, spacing, size, lineSize } = toRaw(settings);

    const output = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        output.push(
          `
          <g>
            <line
              stroke="black"
              x1=${x * spacing - lineSize / 2}
              x2=${x * spacing + lineSize / 2}
              y1=${y * spacing}
              y2=${y * spacing}
            ></line>
            
            <line
              stroke="black"
              x1=${x * spacing}
              x2=${x * spacing}
              y1=${y * spacing - lineSize / 2}
              y2=${y * spacing + lineSize / 2}
            ></line>
            
            <circle
              cx=${x * spacing}
              cy=${y * spacing}
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
    rows: toMMV(0, 300, 8),
    columns: toMMV(0, 300, 5),
    spacing: toMMV(0, 100, 15),
    size: toMMV(0, 50, 21),
    lineSize: toMMV(0, 50, 4),
  },
};
