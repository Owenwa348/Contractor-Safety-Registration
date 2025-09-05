<!-- StatusStatistics.vue -->
<template>
  <div class="grid grid-cols-2 gap-4 mb-4">
    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 class="text-green-800 font-semibold mb-2">อนุมัติแล้ว</h3>
      <p class="text-green-700">จำนวน {{ approvedCount }} คน</p>
    </div>
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 class="text-red-800 font-semibold mb-2">ไม่ผ่าน</h3>
      <p class="text-red-700">จำนวน {{ notPassedCount }} คน</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  approvedCount: {
    type: Number,
    required: true
  },
  notPassedCount: {
    type: Number,
    required: true
  }
})
</script>