<script setup>
import Drawing from "./components/Drawing.vue";
import { onMounted, ref, watch } from "vue";
import PrinterStatus from "./components/PrinterStatus.vue";
import { usePrinterSettings } from "./stores/printerSettings.js";
import PrintSettings from "./components/PrintSettings.vue";
import { useGlobalSettings } from "./stores/global.js";
import { storeToRefs } from "pinia";
import DrawingParameters from "./components/DrawingParameters.vue";

const printSettingsStore = usePrinterSettings();
const globalSettings = useGlobalSettings();

const { selectedDrawing, drawings, importedDrawing, settings } =
  storeToRefs(globalSettings);

const getDrawings = async () => {
  const response = await fetch("http://localhost:8080/files");
  const data = await response.json();
  drawings.value = data;
  selectedDrawing.value = data[0];
};

const asyncImport = async () => {
  importedDrawing.value = await import(
    /* @vite-ignore */
    `./drawings/${selectedDrawing.value}`
  );
  settings.value = importedDrawing.value.default.settings;
};

asyncImport();

watch(
  () => selectedDrawing.value,
  () => {
    asyncImport();
  },
);

addEventListener("keypress", (event) => {
  if (event.key === "[") {
    const index = drawings.value.indexOf(selectedDrawing.value);
    if (index > 0) {
      selectedDrawing.value = drawings.value[index - 1];
    }
  } else if (event.key === "]") {
    const index = drawings.value.indexOf(selectedDrawing.value);
    if (index < drawings.value.length - 1) {
      selectedDrawing.value = drawings.value[index + 1];
    }
  }
});

getDrawings();
</script>

<template>
  <select v-model="selectedDrawing" style="margin-bottom: 2rem">
    <option v-for="drawing in drawings" :value="drawing">{{ drawing }}</option>
  </select>

  <PrinterStatus />
  <PrintSettings />
  <DrawingParameters />
  <Drawing />
</template>

<style scoped></style>
