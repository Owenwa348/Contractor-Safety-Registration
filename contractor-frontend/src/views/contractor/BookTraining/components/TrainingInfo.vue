<!-- TrainingInfo.vue -->
<template>
  <div class="border rounded p-4 bg-gray-50 mb-4">
    <h3 class="text-lg font-bold mb-2">ข้อมูลการอบรม</h3>
    <div class="space-y-1 text-sm">
      <p><strong>หัวข้อ:</strong> {{ selectedEvent.title }}</p>
      <p><strong>ผู้สอน:</strong> {{ selectedEvent.instructor }}</p>
      <p v-if="round"><strong>รอบการอบรม:</strong> {{ round }}</p>
      <p v-else><strong>วันเวลา:</strong> {{ formatDate(selectedEvent.date) }} {{ selectedEvent.time }}-{{ selectedEvent.endTime }}</p>
      <p v-if="examDateDisplay"><strong>วันที่ทำข้อสอบ:</strong> <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ examDateDisplay }}</span></p>
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