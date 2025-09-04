<template>
  <div>
    <div class="grid grid-cols-8 border-b border-gray-200">
      <div class="p-4 text-center text-sm font-bold text-gray-700 bg-gray-50 border-r border-gray-200">
        เวลา
      </div>
      <div v-for="day in weekDays" :key="day.key" 
           class="p-4 text-center bg-gray-50 border-r border-gray-200 last:border-r-0">
        <div class="text-sm font-bold text-gray-700">{{ day.dayName }}</div>
        <div class="text-lg mt-1 w-10 h-10 flex items-center justify-center rounded-full mx-auto font-bold transition-all duration-200"
             :class="day.isToday ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600'">
          {{ day.date }}
        </div>
      </div>
    </div>

    <!-- Time Slots -->
    <div class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div v-for="hour in timeSlots" :key="`hour-${hour}`" 
           class="grid grid-cols-8 border-b border-gray-100">
        <div class="p-3 text-xs font-semibold text-gray-500 bg-gray-50 border-r border-gray-200 text-center">
          {{ hour }}:00
        </div>
        <div v-for="day in weekDays" :key="`${day.key}-${hour}`"
             class="min-h-[64px] p-2 border-r border-gray-200 last:border-r-0 hover:bg-blue-50 cursor-pointer transition-all duration-200">
          
          <div v-for="event in getEventsForDayAndHour(day.fullDate, hour)" :key="event.id"
               class="text-xs px-2 py-1 rounded-lg mb-1 text-white transition-all duration-200 truncate cursor-pointer hover:opacity-90 font-medium shadow-sm"
               :class="getWeekEventClass(event)"
               @click.stop="$emit('event-click', event, day.fullDate)"
               :title="event.title">
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  weekDays: {
    type: Array,
    required: true
  },
  timeSlots: {
    type: Array,
    required: true
  },
  events: {
    type: Array,
    required: true
  }
});

const emit = defineEmits([
  'event-click'
]);

const isEventPast = (event) => {
  if (!event) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventEndDate = event.isMultiDay ? new Date(event.endDate) : new Date(event.startDate);
  eventEndDate.setHours(0, 0, 0, 0);
  
  return eventEndDate < today;
};

const getWeekEventClass = (event) => {
  return isEventPast(event) 
    ? 'bg-gray-500 cursor-not-allowed hover:opacity-100' 
    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
};

const getEventsForDayAndHour = (dateString, hour) => {
  return props.events.filter((event) => {
    const isDateMatch = event.isMultiDay 
      ? (new Date(dateString) >= new Date(event.startDate) && new Date(dateString) <= new Date(event.endDate))
      : event.startDate === dateString;
    
    return isDateMatch && event.time === parseInt(hour);
  });
};
</script>