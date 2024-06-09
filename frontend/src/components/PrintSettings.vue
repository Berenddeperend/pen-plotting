<script setup>
import RangeSlider from "./RangeSlider.vue";
import { usePrinterSettings } from "../stores/printerSettings.js";
import { storeToRefs } from "pinia";
import { useGlobalSettings } from "../stores/global.js";
import Selectbox from "./Selectbox.vue";
import Checkbox from "./Checkbox.vue";

const printerSettings = usePrinterSettings();
const globalSettings = useGlobalSettings();

const {
  paddingXInMM,
  paddingYInMM,
  penWidthInMM,
  paperSize,
  orientation,
  fitToMargins,
} = storeToRefs(printerSettings);
const { zoomMultiplier } = storeToRefs(globalSettings);
</script>
<template>
  <div>
    <h2 class="font-bold mb-4">Plotter settings</h2>
    <RangeSlider name="paddingX (mm)" v-model="paddingXInMM" />
    <RangeSlider name="paddingY (mm)" v-model="paddingYInMM" />
    <RangeSlider name="zoom" v-model="zoomMultiplier" />

    <Selectbox
      v-model="orientation"
      name="orientation"
      :options="['portrait', 'landscape']"
    />
    <Selectbox v-model="paperSize" name="paper size" :options="['a5', 'a6']" />

    <RangeSlider name="penWidth (mm / 10)" v-model="penWidthInMM" />

    <h2 class="font-bold my-4">Vpype settings</h2>

    <Checkbox v-model="fitToMargins" name="Fit to margins"
      >Fit to margins</Checkbox
    >
  </div>
</template>
