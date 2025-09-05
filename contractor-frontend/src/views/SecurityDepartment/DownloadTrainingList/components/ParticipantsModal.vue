<template>
  <div v-if="show" 
       class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" 
       @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full p-8 max-h-[85vh] overflow-hidden flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">
          รายชื่อผู้เข้าร่วม - {{ event?.title }}
        </h3>
        <button @click="$emit('close')" 
                class="text-gray-400 hover:text-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div v-if="event" class="mb-6 p-4 bg-gray-50 rounded-xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong class="text-gray-700">วันที่:</strong> 
            <span class="text-gray-900">{{ displayDateText }}</span>
          </div>
          <div>
            <strong class="text-gray-700">เวลา:</strong> 
            <span class="text-gray-900">{{ eventTimeRange }}</span>
          </div>
          <div>
            <strong class="text-gray-700">จำนวนผู้เข้าร่วม:</strong> 
            <span class="text-gray-900">{{ event.participantCount }}/{{ event.capacity }} คน</span>
          </div>
        </div>
      </div>
      
      <!-- Participants Table -->
      <div class="flex-1 overflow-auto rounded-xl border border-gray-200">
        <table class="w-full bg-white">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
            <tr>
              <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 w-16">ลำดับ</th>
              <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700">ชื่อ-นามสกุล</th>
              <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 w-32">เบอร์โทรศัพท์</th>
              <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 w-40">เลขบัตรประชาชน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in event?.participants || []" :key="participant.id" 
                class="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100">
              <td class="px-6 py-4 text-sm font-semibold text-gray-900 text-center">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ participant.name }}</td>
              <td class="px-6 py-4 text-sm font-mono text-gray-700 bg-gray-50">{{ censorPhone(participant.phone) }}</td>
              <td class="px-6 py-4 text-sm font-mono text-gray-700 bg-gray-50">{{ censorIdCard(participant.idCard) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <span class="text-sm font-medium text-gray-600">
          แสดง {{ event?.participantCount || 0 }} รายการ
        </span>
        <div class="flex gap-3">
          <button @click="$emit('close')" 
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
            ปิด
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
  'close'
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

const censorPhone = (phone) => {
  if (!phone || phone.length < 10) return phone;
  const first = phone.slice(0, 3);
  const last = phone.slice(-3);
  return `${first}****${last}`;
};

const censorIdCard = (idCard) => {
  if (!idCard || idCard.length < 13) return idCard;
  const first = idCard.slice(0, 3);
  const last = idCard.slice(-3);
  return `${first}*******${last}`;
};

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
</script>