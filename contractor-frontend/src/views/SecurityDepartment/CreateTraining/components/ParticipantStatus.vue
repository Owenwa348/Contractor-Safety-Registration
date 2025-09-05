<template>
  <div class="p-3 bg-white rounded border">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">สถานะผู้เข้าอบรม</span>
      <span class="text-sm font-bold" :class="getParticipantStatusColor(event)">
        {{ availableSeats }} ที่ว่าง
      </span>
    </div>
    
    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div 
        class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
        :style="{ width: `${participantPercentage}%` }"
      ></div>
    </div>
    
    <div class="flex justify-between text-xs text-gray-500">
      <span>{{ event.currentParticipants || 0 }} คน</span>
      <span>{{ event.maxParticipants }} คน</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

const availableSeats = computed(() => {
  return props.event.maxParticipants - (props.event.currentParticipants || 0);
});

const participantPercentage = computed(() => {
  return ((props.event.currentParticipants || 0) / props.event.maxParticipants) * 100;
});

const getParticipantStatusColor = (event) => {
  const available = event.maxParticipants - (event.currentParticipants || 0);
  if (available === 0) return 'text-red-600';
  if (available <= 5) return 'text-orange-600';
  return 'text-green-600';
};
</script>