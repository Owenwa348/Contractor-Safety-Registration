<template>
  <div class="flex items-center gap-2">
    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon"></path>
    </svg>
    <span class="text-gray-700">{{ value }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});
</script>