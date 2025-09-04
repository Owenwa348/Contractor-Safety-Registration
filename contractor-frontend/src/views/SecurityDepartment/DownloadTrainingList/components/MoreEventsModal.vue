<template>
  <div v-if="show" 
       class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" 
       @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-gray-900">
          การอบรมวันที่ {{ formattedDate }}
        </h3>
        <button @click="$emit('close')" 
                class="text-gray-400 hover:text-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="space-y-3">
        <div v-for="event in events" :key="event.id"
             class="p-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
             :class="getEventItemClass(event)"
             @click="$emit('event-click', event)"
             tabindex="0"
             @keydown.enter="$emit('event-click', event)">
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full mr-3 shadow-sm" :class="getEventDotClass(event)"></div>
            <div>
              <div class="font-semibold" :class="getEventTitleClass(event)">{{ event.title }}</div>
              <div class="text-sm" :class="getEventTimeClass(event)">
                {{ getEventTimeRange(event) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  events: {
    type: Array,
    default: () => []
  },
  date: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'close',
  'event-click'
]);

// Helper functions
const monthNames = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
};

const getEventTimeRange = (event) => {
  if (!event) return '';
  if (event.isAllDay) return 'ทั้งวัน';
  
  if (event.startTime && event.endTime) {
    return `${event.startTime} - ${event.endTime} น.`;
  }
  
  return event.time ? `${event.time}:00 น.` : 'ไม่ระบุเวลา';
};

const isEventPast = (event) => {
  if (!event) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventEndDate = event.isMultiDay ? new Date(event.endDate) : new Date(event.startDate);
  eventEndDate.setHours(0, 0, 0, 0);
  
  return eventEndDate < today;
};

const formattedDate = computed(() => {
  return props.date ? formatThaiDate(props.date) : '';
});

const getEventItemClass = (event) => {
  return isEventPast(event) 
    ? 'cursor-not-allowed bg-gray-100 opacity-60 border-gray-200' 
    : 'cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg';
};

const getEventDotClass = (event) => {
  return isEventPast(event) ? 'bg-gray-400' : 'bg-blue-600';
};

const getEventTitleClass = (event) => {
  return isEventPast(event) ? 'text-gray-500' : 'text-gray-900';
};

const getEventTimeClass = (event) => {
  return isEventPast(event) ? 'text-gray-400' : 'text-gray-600';
};
</script>