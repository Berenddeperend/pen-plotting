<script setup>
import { onMounted, ref } from "vue";

const printerStatus = ref({ state: { text: "Fetching printer status..." } });
const error = ref(false);

const getPrinterStatus = () => {
  fetch("http://localhost:8080/status")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      error.value = false;
      printerStatus.value = data;
    })
    .catch(() => {
      error.value = true;
    });
};

onMounted(() => {
  getPrinterStatus();

  setInterval(getPrinterStatus, 3000);
});
</script>

<template>
  <div class="bar text-sm">
    <div v-if="printerStatus && !error">
      <!--      {{   printerStatus?.state?.text }}-->
      {{ printerStatus }}
    </div>
    <div v-if="error">Error: Could not connect to printer</div>
  </div>
</template>
