<script setup>
import Drawing from "./components/Drawing.vue";
import { ref } from "vue";

const drawings = ref([]);
const selectedDrawing = ref();

const getDrawings = async () => {
  const response = await fetch("http://localhost:8080/files");
  const data = await response.json();
  drawings.value = data;
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
  <select v-model="selectedDrawing" style="margin-bottom: 2rem">
    <option v-for="drawing in drawings" :value="drawing">{{ drawing }}</option>
  </select>

  <Drawing v-if="selectedDrawing" :selected-drawing="selectedDrawing" />
</template>

<style scoped></style>
