<template>
  <div 
    v-if="showModal" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
    @click="$emit('close')"
  >
    <div class="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg" @click.stop>
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-xl font-bold text-gray-800">รายละเอียดการอบรม</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div v-if="event" class="space-y-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="font-bold text-lg text-gray-800 mb-3">{{ event.title }}</h4>
          <div class="grid grid-cols-1 gap-2 text-sm">
            <EventDetail 
              v-for="detail in eventDetails" 
              :key="detail.label" 
              :icon="detail.icon"
              :value="detail.value"
            />
          </div>
          
          <!-- Participant Status -->
          <ParticipantStatus 
            :event="event"
            class="mt-4"
          />
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
          <button 
            @click="$emit('edit', event)" 
            class="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-all hover:-translate-y-0.5"
          >
            แก้ไข
          </button>
          <button 
            @click="handleDelete" 
            class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-all hover:-translate-y-0.5"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import EventDetail from './EventDetail.vue';
import ParticipantStatus from './ParticipantStatus.vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  event: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'edit', 'delete']);

const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

const eventDetails = computed(() => {
  if (!props.event) return [];
  
  return [
    { 
      label: "ช่วงวันที่", 
      value: formatDateRange(props.event), 
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
    },
    { 
      label: "เวลา", 
      value: formatTimeRange(props.event.startTime, props.event.endTime), 
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
    },
    { 
      label: "สถานที่", 
      value: props.event.room, 
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
    },
    { 
      label: "ผู้สอน", 
      value: props.event.examiner, 
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
    },
    { 
      label: "จำนวนผู้เข้าอบรม", 
      value: `${props.event.currentParticipants || 0}/${props.event.maxParticipants} คน`, 
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
    }
  ];
});

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear() + 543}`;
};

const formatDateRange = (event) => {
  if (event.startDate === event.endDate) {
    return formatThaiDate(event.startDate);
  } else {
    return `${formatThaiDate(event.startDate)} - ${formatThaiDate(event.endDate)}`;
  }
};

const formatTimeRange = (startHour, endHour) => {
  return `${startHour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`;
};

const handleDelete = () => {
  if (confirm("คุณแน่ใจหรือไม่ที่จะลบการอบรมนี้?")) {
    emit('delete', props.event.id);
  }
};
</script>