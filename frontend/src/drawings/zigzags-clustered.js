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
              ? intensity + j * (lineSpacing / 10) + (clusterSpacing / 10) * i
              : i + j * (lineSpacing / 10) + (clusterSpacing / 10) * i;

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
    intensity: toMMV(0, 300, 20),
    zigs: toMMV(0, 30, 10),
    clusters: toMMV(0, 500, 40),
    width: toMMV(0, 300, 73),
    linesPerCluster: toMMV(0, 10, 1),
    clusterSpacing: toMMV(0, 100, 10),
    lineSpacing: toMMV(0, 10, 5),
  },
};
