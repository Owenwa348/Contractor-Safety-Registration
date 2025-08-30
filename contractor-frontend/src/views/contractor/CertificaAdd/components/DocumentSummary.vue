<template>
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h3 class="font-semibold text-blue-800 mb-2">สรุปเอกสาร</h3>
    <p class="text-blue-700 text-sm">
      เอกสารที่จำเป็น: {{ requiredDocumentsCount }} / {{ totalRequiredDocuments }} ไฟล์
    </p>
    <p class="text-blue-700 text-sm">
      เอกสารเพิ่มเติม: {{ customDocumentsCount }} ไฟล์
    </p>
    <div v-if="totalDocuments > 0" class="mt-2">
      <div class="w-full bg-blue-200 rounded-full h-2">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
      <p class="text-xs text-blue-600 mt-1 text-center">
        ความคืบหน้า: {{ Math.round(progressPercentage) }}%
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  requiredDocumentsCount: {
    type: Number,
    required: true
  },
  customDocumentsCount: {
    type: Number,
    required: true
  },
  totalRequiredDocuments: {
    type: Number,
    required: true
  }
})

// Computed
const totalDocuments = computed(() => props.requiredDocumentsCount + props.customDocumentsCount)

const progressPercentage = computed(() => {
  if (props.totalRequiredDocuments === 0) return 0
  return (props.requiredDocumentsCount / props.totalRequiredDocuments) * 100
})
</script>