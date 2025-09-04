<template>
  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-3">
      <h4 class="font-bold text-blue-800">ตัวอย่างการอบรมที่จะสร้าง</h4>
      <span class="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
        {{ preview.length }} ครั้ง
      </span>
    </div>
    
    <div class="max-h-40 overflow-y-auto space-y-2 bg-white rounded-lg p-3 border">
      <div 
        v-for="(item, index) in preview.slice(0, 8)" 
        :key="item.date" 
        class="flex items-center justify-between p-2 bg-gray-50 rounded border-l-4 border-blue-400"
      >
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold text-gray-500">{{ index + 1 }}.</span>
          <div>
            <div class="text-sm font-medium text-gray-800">{{ formatThaiDate(item.date) }}</div>
            <div class="text-xs text-gray-600">{{ daysOfWeek[item.dayOfWeek] }}</div>
          </div>
        </div>
        <div class="text-sm text-blue-700 font-medium">
          {{ formatTimeRange(item.startTime, item.endTime) }}
        </div>
      </div>
      
      <div v-if="preview.length > 8" class="text-center p-2 bg-blue-100 rounded border">
        <div class="text-sm text-blue-700 font-medium">
          และอีก {{ preview.length - 8 }} ครั้ง...
        </div>
        <div class="text-xs text-blue-600 mt-1">
          คลิกสร้างเพื่อดูทั้งหมด
        </div>
      </div>
    </div>
    
    <!-- Recurrence Summary -->
    <div v-if="recurrence.enabled" class="mt-3 p-3 bg-white rounded-lg border">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm font-medium text-gray-700">สรุปการตั้งค่าทำซ้ำ:</span>
      </div>
      <div class="text-xs text-gray-600 space-y-1">
        <div>• ความถี่: {{ getFrequencyText() }}</div>
        <div v-if="shouldShowSelectedDays">
          • วันที่เลือก: {{ getSelectedDaysText() }}
        </div>
        <div>• สิ้นสุด: {{ getEndTypeText() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  preview: {
    type: Array,
    required: true
  },
  recurrence: {
    type: Object,
    required: true
  }
});

const daysOfWeek = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

const shouldShowSelectedDays = computed(() => {
  const { frequency } = props.recurrence;
  return (frequency === 'weekly' && props.recurrence.daysOfWeek.length > 0) ||
         (frequency === 'custom' && props.recurrence.customDays.length > 0) ||
         frequency === 'weekdays';
});

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear() + 543}`;
};

const formatTimeRange = (startHour, endHour) => {
  return `${startHour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`;
};

const getFrequencyText = () => {
  const { frequency, interval } = props.recurrence;
  const texts = {
    daily: `ทุก ${interval} วัน`,
    weekdays: `ทุก ${interval} วันทำการ (จ-ศ)`,
    weekly: `ทุก ${interval} สัปดาห์`,
    monthly: `ทุก ${interval} เดือน`,
    yearly: `ทุก ${interval} ปี`,
    custom: 'กำหนดเอง'
  };
  return texts[frequency] || 'ไม่ระบุ';
};

const getSelectedDaysText = () => {
  const { frequency } = props.recurrence;
  
  if (frequency === 'weekly') {
    if (props.recurrence.daysOfWeek.length === 0) return 'ไม่ได้เลือก';
    return props.recurrence.daysOfWeek
      .map(dayIndex => daysOfWeek[dayIndex])
      .join(', ');
  } else if (frequency === 'custom') {
    if (props.recurrence.customDays.length === 0) return 'ไม่ได้เลือก';
    return props.recurrence.customDays
      .map(dayIndex => daysOfWeek[dayIndex])
      .join(', ');
  } else if (frequency === 'weekdays') {
    return 'จันทร์, อังคาร, พุธ, พฤหัสบดี, ศุกร์';
  }
  
  return 'ไม่ใช้';
};

const getEndTypeText = () => {
  const { endType, occurrences, endDate } = props.recurrence;
  if (endType === 'never') return 'ไม่สิ้นสุด';
  if (endType === 'after') return `หลังจาก ${occurrences} ครั้ง`;
  if (endType === 'on' && endDate) return `ถึงวันที่ ${formatThaiDate(endDate)}`;
  return 'ไม่ระบุ';
};
</script>