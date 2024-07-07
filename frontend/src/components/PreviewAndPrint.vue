<script setup>
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { computed, ref } from "vue";
import { usePrinterSettings } from "../stores/printerSettings.js";

const globalSettings = useGlobalSettings();
const printerSettings = usePrinterSettings();

const { settings, svgElement } = storeToRefs(globalSettings);
const { paddingXInMM, paddingYInMM, penWidthInMM, orientation, paperSize } =
  storeToRefs(printerSettings);

const loadingPreview = ref();
const loadingPrint = ref();

const getPostSettings = () => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      svg: svgElement.value?.outerHTML,
      paddingXInMM: paddingXInMM.value.value,
      paddingYInMM: paddingYInMM.value.value,
      penWidthInMM: penWidthInMM.value.value / 100,
      orientation: orientation.value,
      size: paperSize.value,
    }),
  };
};

const createPost = (body) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

const getCommonPostBody = () => {
  return {
    paddingXInMM: paddingXInMM.value.value,
    paddingYInMM: paddingYInMM.value.value,
    penWidthInMM: penWidthInMM.value.value / 100,
    orientation: orientation.value,
    size: paperSize.value,
  };
};

const print = async () => {
  if (loadingPrint.value) return;
  loadingPrint.value = true;
  await fetch(
    "http://localhost:8080/print",
    createPost({
      ...getCommonPostBody(),
      svg: svgElement.value?.outerHTML,
    }),
  );
  loadingPrint.value = false;
};

const preview = async () => {
  if (loadingPreview.value) return;
  loadingPreview.value = true;
  await fetch(
    "http://localhost:8080/preview",
    createPost({
      ...getCommonPostBody(),
      svg: svgElement.value?.outerHTML,
    }),
  );
  loadingPreview.value = false;
};

const previewCodeAsText = async () => {
  if (loadingPreview.value) return;
  loadingPreview.value = true;

  await fetch(
    "http://localhost:8080/preview-code-as-text",
    createPost({
      ...getCommonPostBody(),
      code: "ni hau bitches",
    }),
  );
  loadingPreview.value = false;
};
</script>

<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    {{ postSettings }}
    <button
      @click="print"
      type="button"
      class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      :class="[loadingPrint ? 'cursor-pointer opacity-50' : '']"
    >
      {{ loadingPrint ? "Printing..." : "Print" }}
    </button>
    <button
      type="button"
      @click="preview"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      :class="[loadingPreview ? 'cursor-pointer opacity-50' : '']"
    >
      {{ loadingPreview ? "Generating..." : "Preview" }}
    </button>
    <button
      type="button"
      @click="previewCodeAsText"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      :class="[loadingPreview ? 'cursor-pointer opacity-50' : '']"
    >
      {{ loadingPreview ? "Generating..." : "Preview code as text" }}
    </button>
  </span>
</template>
