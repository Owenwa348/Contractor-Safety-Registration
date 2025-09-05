<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Statistics Cards -->
    <StatisticsCards 
      :total-events="events.length"
      :monthly-events="thisMonthEvents"
    />
    
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Calendar Header -->
      <div class="bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden">
        <CalendarHeader 
          :current-month-year="currentMonthYear"
          :view-mode="viewMode"
          @previous-month="previousMonth"
          @next-month="nextMonth"
          @go-to-today="goToToday"
          @change-view-mode="changeViewMode"
        />

        <!-- Month View -->
        <MonthView 
          v-if="viewMode === 'month'"
          :calendar-dates="calendarDatesWithEvents"
          :days-of-week="daysOfWeek"
          @event-click="handleEventClick"
          @show-more-events="showMoreEvents"
        />

        <!-- Week View -->
        <WeekView 
          v-else-if="viewMode === 'week'"
          :week-days="weekDays"
          :time-slots="timeSlots"
          :events="events"
          @event-click="handleEventClick"
        />
      </div>

      <!-- Event Details Modal -->
      <EventDetailModal 
        :show="showModal"
        :event="selectedEvent"
        :selected-date="selectedDate"
        @close="closeModal"
        @show-participants="showParticipantsList"
        @download-pdf="downloadParticipantListPDF"
      />

      <!-- Participants List Modal -->
      <ParticipantsModal 
        :show="showParticipantsModal"
        :event="selectedEvent"
        :selected-date="selectedDate"
        @close="closeParticipantsModal"
      />

      <!-- More Events Modal -->
      <MoreEventsModal 
        :show="showMoreModal"
        :events="moreEventsList"
        :date="moreEventsDate"
        @close="closeMoreModal"
        @event-click="handleMoreEventClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Import components
import StatisticsCards from './components/StatisticsCards.vue';
import CalendarHeader from './components/CalendarHeader.vue';
import MonthView from './components/MonthView.vue';
import WeekView from './components/WeekView.vue';
import EventDetailModal from './components/EventDetailModal.vue';
import ParticipantsModal from './components/ParticipantsModal.vue';
import MoreEventsModal from './components/MoreEventsModal.vue';

// Import composables
import { useCalendar } from './composables/useCalendar.js';
import { useEventData } from './composables/useEventData.js';
import { usePDFGeneration } from './composables/usePDFGeneration.js';

// Use composables
const {
  currentDate,
  viewMode,
  daysOfWeek,
  currentMonthYear,
  calendarDates,
  weekDays,
  timeSlots,
  previousMonth,
  nextMonth,
  goToToday,
  changeViewMode
} = useCalendar();

const {
  events,
  thisMonthEvents,
  getEventsForDate,
  generateEventDisplays,
  getEventsForDayAndHour,
  updateCalendarDatesWithEvents
} = useEventData();

const {
  pdfLoading,
  generateHTMLToPDF,
  generatePrintToPDF,
  generateFallbackPDF
} = usePDFGeneration();

// Modal state
const showModal = ref(false);
const showMoreModal = ref(false);
const showParticipantsModal = ref(false);
const selectedEvent = ref(null);
const moreEventsDate = ref('');
const moreEventsList = ref([]);
const selectedDate = ref(null);

// Computed properties
const calendarDatesWithEvents = computed(() => {
  return updateCalendarDatesWithEvents(calendarDates.value);
});

// Modal Functions
function handleEventClick(event, date = null) {
  selectedEvent.value = event;
  selectedDate.value = date;
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
  selectedEvent.value = null;
};

const showMoreEvents = (date) => {
  moreEventsDate.value = date.fullDate;
  moreEventsList.value = date.events;
  showMoreModal.value = true;
};

const closeMoreModal = () => {
  showMoreModal.value = false;
  moreEventsDate.value = '';
  moreEventsList.value = [];
};

const handleMoreEventClick = (event) => {
  closeMoreModal();
  handleEventClick(event, moreEventsDate.value);
};

const showParticipantsList = () => {
  showParticipantsModal.value = true;
  showModal.value = false;
};

const closeParticipantsModal = () => {
  showParticipantsModal.value = false;
  showModal.value = true;
};

// Enhanced notification system
const showNotification = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
  
  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  };
  
  toast.className += ` ${colors[type] || colors.info}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
};

// PDF Generation with multiple methods
const downloadParticipantListPDF = async () => {
  if (!selectedEvent.value) return;
  
  pdfLoading.value = true;
  const event = selectedEvent.value;
  
  try {
    console.log('Attempting Method 1: HTML-to-Canvas PDF generation');
    await generateHTMLToPDF(event, selectedDate.value);
    showNotification('ดาวน์โหลด PDF สำเร็จ! (คุณภาพสูง)', 'success');
    pdfLoading.value = false;
    return;
  } catch (error) {
    console.warn('Method 1 (HTML-to-Canvas) failed:', error);
  }
  
  try {
    console.log('Attempting Method 2: Browser Print-to-PDF');
    await generatePrintToPDF(event, selectedDate.value);
    showNotification('เปิดหน้าต่างพิมพ์สำเร็จ! กรุณาเลือก "Save as PDF"', 'info');
    pdfLoading.value = false;
    return;
  } catch (error) {
    console.warn('Method 2 (Print-to-PDF) failed:', error);
  }
  
  try {
    console.log('Attempting Method 3: ASCII Fallback');
    await generateFallbackPDF(event, selectedDate.value);
    showNotification('ดาวน์โหลด PDF สำเร็จ (แบบสำรอง)', 'warning');
    pdfLoading.value = false;
    return;
  } catch (fallbackError) {
    console.error('All PDF generation methods failed:', fallbackError);
  }
  
  const errorMessage = 'ไม่สามารถสร้าง PDF ได้ กรุณาลองใช้บราวเซอร์อื่นหรือกดปุ่ม "Print" แล้วเลือก "Save as PDF"';
  showNotification(errorMessage, 'error');
  pdfLoading.value = false;
};
</script>