<script setup>
defineProps({
  name: String,
  options: Object,
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative flex items-start">
    <div class="flex h-6 items-center">
      <input
        :id="`checkbox-${name}`"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
        :name="name"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
    </div>
    <div class="ml-3 text-sm leading-6">
      <label :for="`checkbox-${name}`" class="font-medium text-gray-900">
        <slot></slot>
      </label>
    </div>
  </div>
</template>
