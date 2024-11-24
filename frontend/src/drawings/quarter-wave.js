import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { arc } from "d3";

export default {
  name: "truchet-blobs",
  draw: (settings) => {
    let { columns, rows, rotation, size } = toRaw(settings);

    const makeQuarterCircle = (radius, x, y) => {
      const arcGenerator = arc()
        .outerRadius(radius)
        .innerRadius(radius)
        .startAngle((Math.PI / 2) * rotation)
        .endAngle((Math.PI / 2) * rotation + Math.PI / 2);

      return `<path  transform="translate(${x}, ${y})" d="${arcGenerator()}" fill="none" />`;
    };

    const output = [];

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        output.push(makeQuarterCircle(size, i * size, j * size));
      }
    }

    return output.join("\n");
  },

  settings: {
    size: toMMV(0, 100, 2),
    rows: toMMV(0, 300),
    columns: toMMV(0, 200),
    rotation: toMMV(0, 4),
  },
};
