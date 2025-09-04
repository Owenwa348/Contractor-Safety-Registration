<!-- MonthView.vue - Monthly calendar view component -->
<template>
  <div>
    <!-- Day Headers -->
    <div class="grid grid-cols-7 border-b border-gray-200">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="p-3 text-center text-sm font-medium text-gray-700 bg-gradient-to-b from-gray-50 to-gray-100"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Dates -->
    <div class="grid grid-cols-7">
      <div
        v-for="date in calendarDates"
        :key="date.key"
        class="min-h-[100px] border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors relative"
        :class="{
          'text-gray-400': !date.isCurrentMonth,
          'bg-blue-50': date.isToday,
        }"
      >
        <div class="p-2">
          <span
            class="text-sm inline-flex items-center justify-center w-6 h-6 rounded-full"
            :class="date.isToday 
              ? 'bg-blue-600 text-white font-medium' 
              : date.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'"
          >
            {{ date.day }}
          </span>
        </div>

        <!-- Events for this date -->
        <div class="px-1 pb-1 space-y-1">
          <div
            v-for="eventDisplay in date.eventDisplays"
            :key="eventDisplay.key"
            class="relative"
            :style="{ 
              marginTop: eventDisplay.row * 22 + 'px',
              position: eventDisplay.row > 0 ? 'absolute' : 'relative',
              top: eventDisplay.row > 0 ? '0' : 'auto',
              left: eventDisplay.row > 0 ? '4px' : 'auto',
              right: eventDisplay.row > 0 ? '4px' : 'auto',
              zIndex: eventDisplay.row
            }"
          >
            <!-- Event Display -->
            <div
              v-if="eventDisplay.type === 'event'"
              class="text-xs px-2 py-1 text-white transition-all duration-200 truncate relative overflow-hidden cursor-pointer hover:opacity-80 hover:scale-[1.02] hover:shadow-sm"
              :class="[
                isEventPast(eventDisplay.event) 
                  ? 'bg-gray-400 cursor-not-allowed hover:opacity-100 hover:scale-100 hover:shadow-none' 
                  : 'bg-blue-600',
                getMultiDayBarClass(eventDisplay.barPosition)
              ]"
              @click.stop="!isEventPast(eventDisplay.event) && $emit('view-event', eventDisplay.event, date.fullDate)"
              :title="eventDisplay.event.title + (eventDisplay.event.isMultiDay ? ` (${formatDateRange(eventDisplay.event.startDate, eventDisplay.event.endDate)})` : '')"
            >
              <span class="relative z-10">{{ eventDisplay.displayText }}</span>
              <!-- Continuous bar effect for multi-day events -->
              <div 
                v-if="eventDisplay.isMultiDayBar && eventDisplay.barPosition !== 'single'" 
                class="absolute inset-0"
                :class="[
                  isEventPast(eventDisplay.event) ? 'bg-gray-400' : 'bg-blue-600',
                  getBarExtensionClass(eventDisplay.barPosition)
                ]"
              ></div>
            </div>
            
            <!-- More Events Indicator -->
            <div
              v-else-if="eventDisplay.type === 'more'"
              class="text-xs px-2 py-1 text-gray-600 cursor-pointer hover:bg-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              @click.stop="$emit('show-more-events', date)"
              tabindex="0"
              @keydown.enter="$emit('show-more-events', date)"
            >
              +{{ eventDisplay.count }} เพิ่มเติม
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  calendarDates: {
    type: Array,
    required: true
  },
  daysOfWeek: {
    type: Array,
    required: true
  },
  isEventPast: {
    type: Function,
    required: true
  },
  formatDateRange: {
    type: Function,
    required: true
  },
  getMultiDayBarClass: {
    type: Function,
    required: true
  },
  getBarExtensionClass: {
    type: Function,
    required: true
  }
})

// Emits
defineEmits([
  'view-event',
  'show-more-events'
])
</script>