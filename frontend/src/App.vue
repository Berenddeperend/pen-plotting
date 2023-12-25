<script setup>
import Drawing from "./components/Drawing.vue";
import { onMounted, ref, watch } from "vue";
import PrinterStatus from "./components/PrinterStatus.vue";
import { usePrinterSettings } from "./stores/printerSettings.js";
import PrintSettings from "./components/PrintSettings.vue";
import { useGlobalSettings } from "./stores/global.js";
import { storeToRefs } from "pinia";
import DrawingParameters from "./components/DrawingParameters.vue";
import DrawingSelector from "./components/DrawingSelector.vue";
import PreviewAndPrint from "./components/PreviewAndPrint.vue";

const globalSettings = useGlobalSettings();

const { selectedDrawing, drawings, importedDrawing, settings } =
  storeToRefs(globalSettings);

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
</script>

<template>
  <div class="topbar mb-6 px-4 py-2 bg-stone-600">
    <div class="max-w-[1200px] m-auto flex items-center gap-5 justify-between">
      <PrinterStatus class="text-white" />
      <DrawingSelector class="drawing-selector min-w-52" />
    </div>
  </div>
  <div class="max-w-[1200px] px-4 m-auto">
    <div class="flex gap-4 justify-between">
      <PrintSettings class="print-settings" />
      <Drawing class="drawing bg-white" />
      <div>
        <DrawingParameters class="drawing-parameters rounded-sm" />
        <PreviewAndPrint />
      </div>
    </div>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>
