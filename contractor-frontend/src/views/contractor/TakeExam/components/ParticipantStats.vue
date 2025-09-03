<template>
  <div class="grid grid-cols-2 gap-3 mb-6">
    <div class="bg-green-50 p-4 rounded-lg border border-green-200">
      <div class="text-green-800 text-2xl font-bold">{{ passedCount }}</div>
      <div class="text-green-600 text-sm font-medium">สอบผ่าน</div>
    </div>
    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
      <div class="text-red-800 text-2xl font-bold">{{ failedCount }}</div>
      <div class="text-red-600 text-sm font-medium">สอบไม่ผ่าน</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParticipantStats',
  props: {
    passedCount: {
      type: Number,
      required: true
    },
    failedCount: {
      type: Number,
      required: true
    }
  }
}
</script>