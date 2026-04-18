import { defineStore } from "pinia";
import { toMMV } from "../helpers/helpers.js";

import { useLocalStorage } from "@vueuse/core";

export const usePrinterSettings = defineStore("printerSettings", () => {
  const paperSize = useLocalStorage("paperSize", "a5");
  const orientation = useLocalStorage("orientation", "portrait");
  const paddingYInMM = useLocalStorage("paddingYyInMM", toMMV(0, 250, 30));
  const paddingXInMM = useLocalStorage("paddingXInMM", toMMV(0, 250, 30));
  const penWidthInMM = useLocalStorage("penWidthInMM", toMMV(0, 100, 40));
  const fitToMargins = useLocalStorage("fitToMargins", true);
  const lineMerge = useLocalStorage("lineMerge", false);

  return {
    paddingYInMM,
    paddingXInMM,
    paperSize,
    orientation,
    penWidthInMM,
    fitToMargins,
    lineMerge,
  };
});
