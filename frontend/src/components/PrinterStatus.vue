<script setup>
import { onMounted, ref } from "vue";

const printerStatus = ref();
const error = ref(false);

const getPrinterStatus = () => {
  fetch("http://localhost:8080/status")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
  <div class="bar">
    <div v-if="printerStatus && !error">
      Status: {{ printerStatus?.state?.text }}
    </div>
    <div v-if="error">Error: Could not connect to printer</div>
  </div>
</template>

<style scoped>
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  font-family: sans-serif;
}
</style>
