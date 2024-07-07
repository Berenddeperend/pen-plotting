<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { usePrinterSettings } from "../stores/printerSettings.js";

const toValues = (mmvObj) => {
  return Object.entries(mmvObj).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {});
};

const globalSettings = useGlobalSettings();
const printerSettings = usePrinterSettings();
const { paddingXInMM, paddingYInMM, penWidthInMM, paperSize, orientation } =
  storeToRefs(printerSettings);
const { selectedDrawing, drawings, settings, importedDrawing, svgElement } =
  storeToRefs(globalSettings);

window.addEventListener("keydown", (e) => {
  if (e.key === "escape") {
    open.value = false;
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "s") {
    open.value = !open.value;
  }
});

const open = ref(false);
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-scroll rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6"
            >
              <pre v-if="importedDrawing">
                {{ importedDrawing.default.draw(toValues(settings)) }}
              </pre>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
