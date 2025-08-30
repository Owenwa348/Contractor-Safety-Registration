<template>
  <div class="flex gap-4">
    <button
      type="submit"
      :disabled="!canSave"
      class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
    >
      <svg v-if="isLoading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      {{ isLoading ? 'กำลังบันทึก...' : 'บันทึกเอกสาร' }}
    </button>
    
    <button
      type="button"
      @click="resetForm"
      :disabled="isLoading"
      class="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      รีเซ็ต
    </button>

    <button
      type="button"
      @click="goBack"
      class="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition-colors flex items-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      กลับ
    </button>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  canSave: {
    type: Boolean,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['save', 'reset', 'back'])

// Methods
const resetForm = () => {
  emit('reset')
}

const goBack = () => {
  emit('back')
}
</script>