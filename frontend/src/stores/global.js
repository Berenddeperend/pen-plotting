import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { toMMV } from "../helpers/helpers.js";
import { useLocalStorage } from "@vueuse/core";

export const useGlobalSettings = defineStore("global", () => {
  const selectedDrawing = useLocalStorage("selectedDrawing");
  const drawings = useLocalStorage("drawings", []);
  const svgElement = ref();
  const zoomMultiplier = ref(toMMV(1, 1000, 377.95275591));
  const importedDrawing = ref();
  const settings = ref();
  const currentDrawingSettings = useLocalStorage("currentDrawingSettings", {});

  const resetZoom = () => {
    zoomMultiplier.value.value = 377.95275591;
  };

  return {
    selectedDrawing,
    drawings,
    currentDrawingSettings,
    importedDrawing,
    settings,
    svgElement,
    zoomMultiplier,
    resetZoom,
  };
});
