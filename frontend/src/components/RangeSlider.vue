<script setup>
const props = defineProps({ modelValue: Object, name: String });
const emit = defineEmits(["update:model-value"]);

const { min, max } = props.modelValue;

const update = (value) => {
  emit("update:model-value", { min, max, value: parseInt(value) });
};
</script>

<template>
  <!--  <input type="range" v-model="modelValue" :min="0" :max="300" />-->
  <div class="flex justify-between">
    <pre>{{ name }}</pre>
    <pre>{{ props.modelValue.value }}</pre>
  </div>
  <!-- prettier-ignore -->
  <input
    type="range"
    class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
[&::-webkit-slider-thumb]:w-2.5
[&::-webkit-slider-thumb]:h-2.5
[&::-webkit-slider-thumb]:-mt-0.5
[&::-webkit-slider-thumb]:appearance-none
[&::-webkit-slider-thumb]:bg-white
[&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:transition-all
[&::-webkit-slider-thumb]:duration-150
[&::-webkit-slider-thumb]:ease-in-out
[&::-webkit-slider-thumb]:dark:bg-slate-700

[&::-moz-range-thumb]:w-2.5
[&::-moz-range-thumb]:h-2.5
[&::-moz-range-thumb]:appearance-none
[&::-moz-range-thumb]:bg-white
[&::-moz-range-thumb]:border-4
[&::-moz-range-thumb]:border-blue-600
[&::-moz-range-thumb]:rounded-full
[&::-moz-range-thumb]:transition-all
[&::-moz-range-thumb]:duration-150
[&::-moz-range-thumb]:ease-in-out

[&::-webkit-slider-runnable-track]:w-full
[&::-webkit-slider-runnable-track]:h-2
[&::-webkit-slider-runnable-track]:bg-gray-200
[&::-webkit-slider-runnable-track]:rounded-full
[&::-webkit-slider-runnable-track]:dark:bg-gray-700

[&::-moz-range-track]:w-full
[&::-moz-range-track]:h-2
[&::-moz-range-track]:bg-gray-200
[&::-moz-range-track]:rounded-full"
    :value="props.modelValue.value"
    @input="update($event.target.value)"
    :min="min"
    :max="max"
  />
</template>
