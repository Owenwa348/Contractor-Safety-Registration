<!-- TrainingBooking.vue - Main container component -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Statistics -->
    <StatisticsCards 
      :total-events="events.length"
      :this-month-events="thisMonthEvents"
    />
    
    <!-- Calendar -->
    <div class="container mx-auto p-6 max-w-7xl">
      <div class="bg-white rounded-lg border border-gray-300 shadow-sm">
        <CalendarHeader
          :current-month-year="currentMonthYear"
          :view-mode="viewMode"
          @update:view-mode="viewMode = $event"
          @previous-month="previousMonth"
          @next-month="nextMonth"
          @go-to-today="goToToday"
        />
        
        <MonthView 
          v-if="viewMode === 'month'"
          :calendar-dates="calendarDates"
          :days-of-week="daysOfWeek"
          :is-event-past="isEventPast"
          :format-date-range="formatDateRange"
          :get-multi-day-bar-class="getMultiDayBarClass"
          :get-bar-extension-class="getBarExtensionClass"
          @view-event="viewEvent"
          @show-more-events="showMoreEvents"
        />
        
        <WeekView 
          v-else-if="viewMode === 'week'"
          :week-days="weekDays"
          :time-slots="timeSlots"
          :get-events-for-day-and-hour="getEventsForDayAndHour"
          :is-event-past="isEventPast"
          @view-event="viewEvent"
          @add-event-to-time-slot="addEventToTimeSlot"
        />
      </div>
      
      <EventDetailModal
        :show="showModal"
        :selected-event="selectedEvent"
        :selected-date="selectedDate"
        :format-thai-date="formatThaiDate"
        :format-date-range="formatDateRange"
        :get-registration-deadline-for-date="getRegistrationDeadlineForDate"
        :is-registration-deadline-passed="isRegistrationDeadlinePassed"
        :can-book-event="canBookEvent"
        :get-booking-button-text="getBookingButtonText"
        :get-available-dates-for-multi-day-event="getAvailableDatesForMultiDayEvent"
        :is-past-date="isPastDate"
        @close="closeModal"
        @select-date="selectSpecificDate"
        @book-training="handleBookTraining"
      />
      
      <MoreEventsModal
        :show="showMoreModal"
        :events-date="moreEventsDate"
        :events-list="moreEventsList"
        :format-thai-date="formatThaiDate"
        :is-event-past="isEventPast"
        @close="closeMoreModal"
        @view-event="viewEventFromMore"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Import composables
import { useCalendar } from './composables/useCalendar.js'
import { useTrainingEvents } from './composables/useTrainingEvents.js'
import { useModal } from './composables/useModal.js'

// Import components
import StatisticsCards from './components/StatisticsCards.vue'
import CalendarHeader from './components/CalendarHeader.vue'
import MonthView from './components/MonthView.vue'
import WeekView from './components/WeekView.vue'
import EventDetailModal from './components/EventDetailModal.vue'
import MoreEventsModal from './components/MoreEventsModal.vue'

// Use composables
const {
  currentDate,
  viewMode,
  daysOfWeek,
  currentMonthYear,
  weekDays,
  timeSlots,
  formatDateString,
  formatThaiDate,
  formatDateRange,
  isPastDate,
  previousMonth,
  nextMonth,
  goToToday,
  generateCalendarDates,
  getEventsForDayAndHour
} = useCalendar()

const {
  events,
  thisMonthEvents,
  isEventPast,
  getRegistrationDeadlineForDate,
  isRegistrationDeadlinePassed,
  getAvailableDatesForMultiDayEvent,
  canBookEvent,
  getBookingButtonText,
  getMultiDayBarClass,
  getBarExtensionClass
} = useTrainingEvents()

const {
  showModal,
  showMoreModal,
  selectedEvent,
  selectedDate,
  moreEventsDate,
  moreEventsList,
  viewEvent,
  closeModal,
  showMoreEvents,
  closeMoreModal,
  viewEventFromMore,
  selectSpecificDate,
  bookTrainingFromModal,
  addEventToTimeSlot
} = useModal()

// Computed calendar dates
const calendarDates = computed(() => generateCalendarDates(events.value))

// Helper method to pass formatThaiDate to modal
const handleBookTraining = () => {
  bookTrainingFromModal(formatThaiDate)
}
</script>

<style>
/* Custom keyframes for modal animation */
@keyframes modal-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Print styles */
@media print {
  .fixed,
  .backdrop-blur-sm {
    display: none !important;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Screen reader only utility */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>