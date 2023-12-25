import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { useLocalStorage } from "@vueuse/core";

export const useGlobalSettings = defineStore("global", () => {
  const selectedDrawing = useLocalStorage("selectedDrawing");
  const drawings = useLocalStorage("drawings", []);
  const svgElement = ref();

  const importedDrawing = ref();
  const settings = ref();

  const currentDrawingSettings = useLocalStorage("currentDrawingSettings", {});

  return {
    selectedDrawing,
    drawings,
    currentDrawingSettings,
    importedDrawing,
    settings,
    svgElement,
  };
});
