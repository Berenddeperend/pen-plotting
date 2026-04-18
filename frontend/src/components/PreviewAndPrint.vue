<script setup>
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import { computed, ref } from "vue";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const globalSettings = useGlobalSettings();
const printerSettings = usePrinterSettings();

const { settings, svgElement } = storeToRefs(globalSettings);
const {
  paddingXInMM,
  paddingYInMM,
  penWidthInMM,
  orientation,
  paperSize,
  lineMerge,
} = storeToRefs(printerSettings);

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
    lineMerge: lineMerge.value,
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

const stateLabel = computed(() => {
  if (loadingPreview.value) return "Generating preview...";
  if (loadingPrint.value) return "Plotting...";
  return "Actions";
});

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
  <Menu as="div" class="relative text-left">
    <div>
      <MenuButton
        class="flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {{ stateLabel }}
        <ChevronDownIcon
          class="-mr-1 size-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              @click="preview"
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 outline-none'
                  : 'text-gray-700',
                'block px-4 py-2 text-sm',
                loadingPreview ? ' opacity-50' : 'cursor-pointer',
              ]"
              >Preview</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              @click="previewCodeAsText"
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 outline-none'
                  : 'text-gray-700',
                'block px-4 py-2 text-sm',
                loadingPreview ? ' opacity-50' : 'cursor-pointer',
              ]"
              >Preview code as plot</a
            >
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <a
              @click="print"
              :class="[
                active
                  ? 'bg-gray-100 text-gray-900 outline-none'
                  : 'text-gray-700',
                'block px-4 py-2 text-sm',
                loadingPrint ? ' opacity-50' : 'cursor-pointer',
              ]"
              >Plot</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>

  <!--  <div class="isolate inline-flex rounded-md shadow-sm">-->
  <!--    {{ postSettings }}-->
  <!--    <button-->
  <!--      @click="print"-->
  <!--      type="button"-->
  <!--      class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"-->
  <!--      :class="[loadingPrint ? 'cursor-pointer opacity-50' : '']"-->
  <!--    >-->
  <!--      {{ loadingPrint ? "Plotting..." : "Plot" }}-->
  <!--    </button>-->
  <!--    <button-->
  <!--      type="button"-->
  <!--      @click="preview"-->
  <!--      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"-->
  <!--      :class="[loadingPreview ? 'cursor-pointer opacity-50' : '']"-->
  <!--    >-->
  <!--      {{ loadingPreview ? "brrr..." : "Preview" }}-->
  <!--    </button>-->
  <!--  </div>-->
  <!--  <div>-->
  <!--    <button-->
  <!--      @click="print"-->
  <!--      type="button"-->
  <!--      class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"-->
  <!--      :class="[loadingPrint ? 'cursor-pointer opacity-50' : '']"-->
  <!--    >-->
  <!--      {{ loadingPrint ? "Printing..." : "Preview code plot" }}-->
  <!--    </button>-->
  <!--    <button-->
  <!--      type="button"-->
  <!--      @click="previewCodeAsText"-->
  <!--      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"-->
  <!--      :class="[loadingPreview ? 'cursor-pointer opacity-50' : '']"-->
  <!--    >-->
  <!--      {{ loadingPreview ? "Generating..." : "Plot code" }}-->
  <!--    </button>-->
  <!--  </div>-->
</template>
