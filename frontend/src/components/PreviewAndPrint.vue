<script setup>
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { ref } from "vue";

const globalSettings = useGlobalSettings();

const { settings, svgElement } = storeToRefs(globalSettings);

const loadingPreview = ref();
const loadingPrint = ref();

const print = async () => {
  if (loadingPrint.value) return;
  loadingPrint.value = true;
  await fetch("http://localhost:8080/print", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      svg: svgElement.value.outerHTML,
    }),
  });
  loadingPrint.value = false;
};

const preview = async () => {
  if (loadingPreview.value) return;
  loadingPreview.value = true;
  await fetch("http://localhost:8080/preview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      svg: svgElement.value.outerHTML,
    }),
  });

  loadingPreview.value = false;
};
</script>

<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
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
  </span>
</template>
