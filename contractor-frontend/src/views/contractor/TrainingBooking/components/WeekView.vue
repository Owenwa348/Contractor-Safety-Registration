<!-- WeekView.vue - Weekly calendar view component -->
<template>
  <div class="grid-cols-[100px_repeat(7,1fr)] md:grid-cols-[100px_repeat(7,1fr)]">
    <!-- Week Header -->
    <div class="grid grid-cols-[100px_repeat(7,1fr)] border-b border-gray-200">
      <div class="p-4 text-center text-sm font-medium text-gray-700 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200">
        เวลา
      </div>
      <div
        v-for="day in weekDays"
        :key="day.key"
        class="p-4 text-center bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 last:border-r-0"
      >
        <div class="text-sm font-medium text-gray-700">{{ day.dayName }}</div>
        <div 
          class="text-lg mt-1 w-8 h-8 flex items-center justify-center rounded-full mx-auto"
          :class="day.isToday ? 'bg-blue-600 text-white' : 'text-gray-600'"
        >
          {{ day.date }}
        </div>
      </div>
    </div>

    <!-- Time Slots -->
    <div class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-sm hover:scrollbar-thumb-gray-400">
      <div
        v-for="hour in timeSlots"
        :key="`hour-${hour}`"
        class="grid grid-cols-[100px_repeat(7,1fr)] border-b border-gray-100"
      >
        <div class="p-3 text-xs text-gray-500 bg-gray-50 border-r border-gray-200 text-center">
          {{ hour }}:00
        </div>
        <div
          v-for="day in weekDays"
          :key="`${day.key}-${hour}`"
          class="min-h-[64px] p-2 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors active:scale-[0.98] active:bg-gray-50"
          @click="$emit('add-event-to-time-slot', day.fullDate, hour)"
        >
          <div
            v-for="event in getEventsForDayAndHour(day.fullDate, hour)"
            :key="event.id"
            class="text-xs px-2 py-1 rounded mb-1 text-white transition-all duration-200 truncate cursor-pointer hover:scale-[1.02] hover:shadow-sm"
            :class="isEventPast(event) 
              ? 'bg-gray-400 cursor-not-allowed hover:scale-100 hover:shadow-none' 
              : 'bg-blue-600 hover:opacity-80'"
            @click.stop="!isEventPast(event) && $emit('view-event', event, day.fullDate)"
            :title="event.title"
          >
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  weekDays: {
    type: Array,
    required: true
  },
  timeSlots: {
    type: Array,
    required: true
  },
  getEventsForDayAndHour: {
    type: Function,
    required: true
  },
  isEventPast: {
    type: Function,
    required: true
  }
})

// Emits
defineEmits([
  'view-event',
  'add-event-to-time-slot'
])
</script>