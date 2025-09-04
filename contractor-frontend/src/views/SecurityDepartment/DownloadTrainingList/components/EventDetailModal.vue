<template>
  <div v-if="show" 
       class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm" 
       @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 transform transition-all duration-300 scale-100 relative z-[70]">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">รายละเอียดการอบรม</h3>
        <button @click="$emit('close')" 
                class="text-gray-400 hover:text-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div v-if="event" class="space-y-6">
        <div class="border-l-4 pl-4 border-blue-600 bg-blue-50 rounded-r-lg py-3">
          <h4 class="text-xl font-bold text-gray-900">{{ event.title }}</h4>
        </div>
        
        <div class="grid grid-cols-1 gap-6 text-sm">
          <div class="bg-gray-50 p-4 rounded-lg">
            <label class="text-gray-600 font-semibold block mb-1">วันที่</label>
            <p class="text-gray-900 font-medium">{{ displayDateText }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <label class="text-gray-600 font-semibold block mb-1">เวลา</label>
            <p class="text-gray-900 font-medium">{{ eventTimeRange }}</p>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <label class="text-gray-600 font-semibold block mb-2">จำนวนผู้เข้าร่วม</label>
          <p class="text-gray-900 font-medium">
            {{ event.participantCount }}/{{ event.capacity }} คน
            <span class="ml-3 px-3 py-1 rounded-full text-xs font-bold"
                  :class="participantStatusClass">
              {{ participantStatusText }}
            </span>
          </p>
        </div>

        <div class="pt-6 border-t border-gray-200 space-y-4">
          <!-- View Participants Button -->
          <button @click="$emit('show-participants')" 
                  :disabled="isEventFuture"
                  class="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-3 transform hover:scale-105 disabled:hover:scale-100"
                  :class="viewParticipantsButtonClass">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            {{ viewParticipantsButtonText }}
          </button>

          <!-- Download PDF Button -->
          <button @click="$emit('download-pdf')" 
                  :disabled="isEventFuture"
                  class="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-3 transform hover:scale-105 disabled:hover:scale-100"
                  :class="downloadButtonClass">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {{ downloadButtonText }}
          </button>
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
  event: {
    type: Object,
    default: null
  },
  selectedDate: {
    type: String,
    default: null
  }
});

const emit = defineEmits([
  'close',
  'show-participants',
  'download-pdf'
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

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} - ${end.getDate()} ${month} ${year}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    const startMonth = monthNames[start.getMonth()];
    const endMonth = monthNames[end.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${year}`;
  } else {
    return `${formatThaiDate(startDate)} - ${formatThaiDate(endDate)}`;
  }
};

const getEventTimeRange = (event) => {
  if (!event) return '';
  if (event.isAllDay) return 'ทั้งวัน';
  
  if (event.startTime && event.endTime) {
    return `${event.startTime} - ${event.endTime} น.`;
  }
  
  return event.time ? `${event.time}:00 น.` : 'ไม่ระบุเวลา';
};

const isEventFuture = computed(() => {
  if (!props.event) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventStartDate = new Date(props.event.startDate);
  eventStartDate.setHours(0, 0, 0, 0);
  
  return eventStartDate > today;
});

const displayDateText = computed(() => {
  if (!props.event) return '';
  
  if (props.selectedDate && props.event.isMultiDay) {
    return formatThaiDate(props.selectedDate);
  }
  
  return props.event.isMultiDay 
    ? formatDateRange(props.event.startDate, props.event.endDate)
    : formatThaiDate(props.event.startDate);
});

const eventTimeRange = computed(() => {
  return getEventTimeRange(props.event);
});

const participantStatusClass = computed(() => {
  if (!props.event) return '';
  return props.event.participantCount >= props.event.capacity 
    ? 'bg-red-100 text-red-800 border border-red-200' 
    : 'bg-green-100 text-green-800 border border-green-200';
});

const participantStatusText = computed(() => {
  if (!props.event) return '';
  return props.event.participantCount >= props.event.capacity ? 'เต็ม' : 'ว่าง';
});

const viewParticipantsButtonClass = computed(() => {
  return isEventFuture.value
    ? 'bg-gray-300 text-gray-600 focus:ring-gray-300 shadow-sm'
    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg focus:ring-blue-500';
});

const viewParticipantsButtonText = computed(() => {
  return isEventFuture.value ? 'การอบรมยังไม่เริ่ม' : 'ดูรายชื่อผู้เข้าร่วม';
});

const downloadButtonClass = computed(() => {
  return isEventFuture.value
    ? 'bg-gray-300 text-gray-600 focus:ring-gray-300 shadow-sm'
    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg focus:ring-green-500';
});

const downloadButtonText = computed(() => {
  return isEventFuture.value ? 'การอบรมยังไม่เริ่ม' : 'ดาวน์โหลด PDF';
});
</script>