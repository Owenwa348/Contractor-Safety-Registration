<!-- NoTrainingSelected.vue -->
<template>
  <div class="text-center py-8">
    <div class="max-w-md mx-auto">
      <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <h3 class="text-xl font-bold text-gray-900 mb-2">ไม่พบข้อมูลการอบรม</h3>
      <p class="text-gray-500 mb-4">กรุณาเลือกอบรมจากปฏิทินก่อน</p>
      <button 
        @click="$emit('goToCalendar')" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        ไปยังปฏิทินการอบรม
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['goToCalendar'])
</script>