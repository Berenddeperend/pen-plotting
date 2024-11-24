import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { arc } from "d3";

export default {
  name: "truchet-blobs",
  draw: (settings) => {
    let { columns, rows, size } = toRaw(settings);

    const makeQuarterCircle = (radius, x, y, rotation) => {
      const moduloRotate = rotation % 4;
      const newX = moduloRotate >= 2 ? x + size / 2 : x - size / 2;
      const newY = moduloRotate === 0 || moduloRotate === 3 ? y + size : y;

      const arcGenerator = arc()
        .outerRadius(radius)
        .innerRadius(radius)
        .startAngle((Math.PI / 2) * rotation)
        .endAngle((Math.PI / 2) * rotation + Math.PI / 2);

      return `<path transform="translate(${newX}, ${newY})" d="${arcGenerator()}" fill="none" />`;
    };

    const randomNumberBetween = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const output = [];

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const rand = randomNumberBetween(0, 4);

        output.push(
          makeQuarterCircle(size / 2, i * size, j * size, rand),
          makeQuarterCircle(size / 2, i * size, j * size, rand + 2),
        );
      }
    }

    return output.join("\n");
  },

  settings: {
    size: toMMV(0, 100, 5),
    rows: toMMV(0, 300, 22),
    columns: toMMV(0, 200, 15),
    rotation: toMMV(0, 4, 1),
  },
};
