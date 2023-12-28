<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";

const globalSettings = useGlobalSettings();

const { selectedDrawing, drawings, importedDrawing, settings } =
  storeToRefs(globalSettings);

const getDrawings = async () => {
  const response = await fetch("http://localhost:8080/files");
  const data = await response.json();
  drawings.value = data;
  if (selectedDrawing.value) return;
  selectedDrawing.value = data[0];
};

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
  <Listbox as="div" v-model="selectedDrawing">
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
      >
        <span class="block truncate">{{ selectedDrawing }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="drawing in drawings"
            :value="drawing"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-cyan-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
                >{{ drawing }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-cyan-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
