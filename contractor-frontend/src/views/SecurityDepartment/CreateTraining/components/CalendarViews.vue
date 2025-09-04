<template>
  <div>
    <!-- Month View -->
    <div v-if="viewMode === 'month'" class="grid grid-cols-7">
      <div 
        v-for="day in daysOfWeek" 
        :key="day" 
        class="p-4 text-center font-semibold text-gray-700 bg-gray-100 border-r border-gray-200 last:border-r-0"
      >
        {{ day }}
      </div>
      
      <div 
        v-for="date in calendarDates" 
        :key="date.key" 
        class="min-h-[120px] p-3 border-r border-b border-gray-200 last:border-r-0 transition-all hover:bg-gray-50" 
        :class="getDateCellClass(date)"
        @dragover.prevent 
        @drop="handleDrop(date.fullDate, $event)"
      >
        <div class="flex justify-between items-start mb-2">
          <span class="text-sm font-semibold" :class="date.isToday ? 'text-blue-600' : ''">
            {{ date.day }}
          </span>
          <span v-if="date.isToday" class="text-xs bg-blue-600 text-white px-2 py-1 rounded">
            วันนี้
          </span>
        </div>
        
        <div class="space-y-1">
          <div 
            v-for="event in getEventsForDate(date.fullDate)" 
            :key="event.id" 
            class="text-xs text-white p-2 rounded cursor-pointer hover:opacity-80 transition-all hover:shadow-sm" 
            @click="$emit('viewEvent', event)" 
            :style="{ backgroundColor: event.color }" 
            draggable="true" 
            @dragstart="$emit('startDrag', event, $event)"
          >
            <div class="font-medium truncate">{{ event.title }}</div>
            <div class="text-xs opacity-90">{{ formatDateRange(event) }}</div>
            <div class="text-xs opacity-90">{{ event.currentParticipants || 0 }}/{{ event.maxParticipants }} คน</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Week View -->
    <div v-else-if="viewMode === 'week'">
      <div class="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] border-b border-gray-200">
        <div class="p-4 text-center font-semibold text-gray-700 bg-gray-100 border-r border-gray-200">
          เวลา
        </div>
        <div 
          v-for="day in weekDays" 
          :key="day.key" 
          class="p-4 text-center bg-gray-100 border-r border-gray-200 last:border-r-0" 
          :class="{ 'bg-blue-100': day.isToday }"
        >
          <div class="font-semibold text-gray-700">{{ day.dayName }}</div>
          <div class="text-sm text-gray-500 mt-1">{{ day.date }}</div>
          <div v-if="day.isToday" class="text-xs text-blue-600 font-medium mt-1">วันนี้</div>
        </div>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        <div 
          v-for="hour in timeSlots" 
          :key="`hour-${hour}`" 
          class="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] border-b border-gray-100"
        >
          <div class="p-3 text-xs text-gray-600 bg-gray-50 border-r border-gray-200 font-medium">
            {{ hour }}:00
          </div>
          <div 
            v-for="day in weekDays" 
            :key="`${day.key}-${hour}`" 
            class="min-h-16 p-2 border-r border-gray-200 last:border-r-0 transition-all" 
            @dragover.prevent 
            @drop="$emit('handleDropToTimeSlot', day.fullDate, parseInt(hour), $event)"
          >
            <div 
              v-for="event in getEventsForDayAndHour(day.fullDate, hour)" 
              :key="event.id" 
              class="text-xs text-white p-2 rounded mb-1 cursor-pointer hover:opacity-80 transition-all hover:shadow-sm" 
              :style="{ backgroundColor: event.color }" 
              @click="$emit('viewEvent', event)" 
              draggable="true" 
              @dragstart="$emit('startDrag', event, $event)"
            >
              <div class="font-medium">{{ event.title }}</div>
              <div class="text-xs opacity-90">{{ event.currentParticipants || 0 }}/{{ event.maxParticipants }} คน</div>
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
  viewMode: {
    type: String,
    required: true
  },
  currentDate: {
    type: Date,
    required: true
  },
  events: {
    type: Array,
    required: true
  }
});

const emit = defineEmits([
  'viewEvent',
  'startDrag', 
  'handleDrop',
  'handleDropToTimeSlot'
]);

// Constants
const daysOfWeek = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

// Computed properties
const calendarDates = computed(() => {
  const year = props.currentDate.getFullYear();
  const month = props.currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const formattedDate = formatDateString(date);
    
    dates.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      day: date.getDate(),
      fullDate: formattedDate,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  return dates;
});

const weekDays = computed(() => {
  const startOfWeek = new Date(props.currentDate);
  startOfWeek.setDate(props.currentDate.getDate() - props.currentDate.getDay());
  const today = new Date();
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    
    days.push({
      key: i,
      dayName: daysOfWeek[i],
      date: date.getDate(),
      fullDate: formatDateString(date),
      isToday: date.toDateString() === today.toDateString()
    });
  }
  return days;
});

const timeSlots = computed(() => {
  return Array.from({length: 13}, (_, i) => (i + 6).toString().padStart(2, "0"));
});

// Utility methods
const formatDateString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

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

const isPastDate = (dateString) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < today;
};

const getDateCellClass = (date) => {
  return {
    'bg-gray-50 text-gray-400': !date.isCurrentMonth,
    'bg-blue-50 border-blue-200': date.isToday,
    'cursor-not-allowed opacity-50': isPastDate(date.fullDate),
    'hover:bg-blue-50': date.isCurrentMonth && !isPastDate(date.fullDate)
  };
};

const getEventsForDate = (dateString) => {
  return props.events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const checkDate = new Date(dateString);
    
    return checkDate >= eventStart && checkDate <= eventEnd;
  });
};

const getEventsForDayAndHour = (dateString, hour) => {
  return props.events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const checkDate = new Date(dateString);
    
    return checkDate >= eventStart && checkDate <= eventEnd &&
           event.startTime <= parseInt(hour) && event.endTime > parseInt(hour);
  });
};

const handleDrop = (dateString, dropEvent) => {
  emit('handleDrop', dateString, dropEvent);
};
</script>