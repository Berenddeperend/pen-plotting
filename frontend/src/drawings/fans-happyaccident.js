import { ref, toRaw } from "vue";
import { lerp, toMMV } from "../helpers/helpers.js";

export default {
  name: "honeycomb",
  draw: (settings) => {
    let { columns, rows, size, strands, alternate, box } = toRaw(settings);
    console.log(settings, " vanuit ding");

    const output = [];

    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        // const x = column * size + size * 0.5;
        const x = alternate
          ? column * size + size * 0.5 + size / 2
          : column * size + size * 0.5;
        const y = row * size;

        if (box) {
          output.push(
            `<rect x="${
              column * size
            }" y="${y}" width="${size}" height="${size}" />`,
          );
        }

        for (let strand = 0; strand < strands; strand++) {
          const lerpedX = lerp(
            column * size,
            column * size + size,
            strand / (strands - 1),
          );

          output.push(
            // `<path d="M ${x} ${y})}" fill="none" stroke="black"></path>`,
            `<line x1="${x}" y1="${y}" x2="${lerpedX}" y2="${
              y + size
            }"  fill="none" stroke="black"></line>`,
          );
        }
      }
    }

    return output.join("\n");
  },

  settings: {
    columns: toMMV(0, 100, 4),
    rows: toMMV(1, 30, 4),
    size: toMMV(0, 100, 30),
    strands: toMMV(1, 100, 30),
    alternate: { value: false },
    box: { value: false },
  },
};
