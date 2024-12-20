import { toRaw } from "vue";
import { toMMV } from "../helpers/helpers.js";

export default {
  name: "zigzags-clustered",
  draw: (settings) => {
    let {
      intensity,
      clusters,
      zigs,
      width,
      linesPerCluster,
      clusterSpacing,
      lineSpacing,
    } = toRaw(settings);

    const output = [];

    for (let i = 0; i < clusters; i++) {
      let points = "";

      for (let j = 0; j < linesPerCluster; j++) {
        for (let k = 0; k < zigs + 1; k++) {
          const x = (k * width) / zigs;
          const y =
            k % 2
              ? intensity + i + j * (lineSpacing / 10) + clusterSpacing * i
              : i + j * (lineSpacing / 10) + clusterSpacing * i;

          points += `${x},${y} `;
        }
        output.push(
          `<polyline points="${points}" fill="none" stroke="black" />`,
        );
        points = "";
      }
    }
    return output.join("\n");
  },

  settings: {
    intensity: toMMV(0, 300, 6),
    zigs: toMMV(0, 30, 10),
    clusters: toMMV(0, 500, 2),
    width: toMMV(0, 300, 86),
    linesPerCluster: toMMV(0, 10, 5),
    clusterSpacing: toMMV(0, 10, 3),
    lineSpacing: toMMV(0, 10, 3),
  },
};
