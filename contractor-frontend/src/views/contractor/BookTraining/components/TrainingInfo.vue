<!-- TrainingInfo.vue -->
<template>
  <div class="border rounded p-4 bg-gray-50 mb-4">
    <h3 class="text-lg font-bold mb-2">ข้อมูลการอบรม</h3>
    <div class="space-y-1 text-sm">
      <p><strong>หัวข้อ:</strong> {{ selectedEvent.title }}</p>
      <p><strong>ผู้สอน:</strong> {{ selectedEvent.instructor }}</p>
      <p v-if="examDateDisplay"><strong>วันที่ทำข้อสอบ:</strong> <span>{{ examDateDisplay }}</span></p>
      <p v-if="round"><strong>เวลา:</strong> {{ selectedEvent.time }}:00-{{ selectedEvent.endTime }}:00 น.</p>
      <p><strong>จำนวนคน:</strong> {{ selectedEvent.booked }} / {{ selectedEvent.capacity }}</p>
      <p><strong>ห้อง:</strong> {{ selectedEvent.room }}</p>
      <p v-if="eventType && eventType !== selectedEvent.title"><strong>ประเภท:</strong> {{ eventType }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedEvent: {
    type: Object,
    required: true
  },
  round: {
    type: String,
    default: ''
  },
  examDateDisplay: {
    type: String,
    default: ''
  },
  eventType: {
    type: String,
    default: ''
  },
  formatDate: {
    type: Function,
    required: true
  }
})
</script>