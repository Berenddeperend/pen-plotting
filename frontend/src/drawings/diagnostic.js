import { paperSizeMapping } from "../helpers/helpers.js";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { storeToRefs } from "pinia";

const printerSettings = usePrinterSettings();

const { paddingXInMM, paddingYInMM, paperSize, penWidthInMM } =
  storeToRefs(printerSettings);

console.log(penWidthInMM.value.value);

export default {
  name: "diagnostic",
  draw: (settings) => {
    const output = [];

    console.log(paddingXInMM.value);

    //draw a square
    output.push(
      `<rect x="0" y="0" width="${
        paperSizeMapping[paperSize.value].width -
        // penWidthInMM.value.value / 10 -
        paddingXInMM.value.value * 2
      }" height="${
        paperSizeMapping[paperSize.value].height -
        // penWidthInMM.value.value / 10 -
        paddingYInMM.value.value * 2
      }" fill="none" stroke="black" />`,
    );

    return output.join("\n");
  },

  settings: {},
};
