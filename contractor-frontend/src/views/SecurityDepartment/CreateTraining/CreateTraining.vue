<!-- CreateTraining.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">ระบบสร้างการฝึกอบรม</h1>
        <p class="text-gray-600">จัดการการฝึกอบรมและดูตารางการอบรม</p>
      </div>

      <!-- Statistics Cards -->
      <StatisticsCards :events="events" :current-date="currentDate" />

      <!-- Create Training Button -->
      <div class="mb-6 flex justify-end">
        <button 
          @click="openCreateModal" 
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-all hover:shadow-lg flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          สร้างการอบรม
        </button>
      </div>

      <!-- Calendar Component -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <CalendarHeader 
          :view-mode="viewMode"
          :current-period-title="currentPeriodTitle"
          :search-query="searchQuery"
          @update:search-query="searchQuery = $event"
          @previous-period="previousPeriod"
          @next-period="nextPeriod"
          @go-to-today="goToToday"
          @set-view-mode="setViewMode"
          @clear-search="clearSearch"
        />

        <CalendarViews
          :view-mode="viewMode"
          :current-date="currentDate"
          :events="filteredEvents"
          @view-event="openViewModal"
          @start-drag="startDrag"
          @handle-drop="handleDrop"
          @handle-drop-to-time-slot="handleDropToTimeSlot"
        />
      </div>

      <!-- Training Modal -->
      <TrainingModal 
        :show-modal="showAddEventModal"
        :is-edit="editingEvent"
        :event-data="selectedEvent"
        :training-types="trainingTypes"
        :managers="managers"
        :rooms="rooms"
        @close="closeAddModal"
        @save="handleSaveEvent"
      />

      <!-- View Event Modal -->
      <ViewEventModal 
        :show-modal="showViewModal"
        :event="selectedEvent"
        @close="closeViewModal"
        @edit="openEditModal"
        @delete="handleDeleteEvent"
        @delete-session="handleDeleteSession"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// Components
import StatisticsCards from './components/StatisticsCards.vue';
import CalendarHeader from './components/CalendarHeader.vue';
import CalendarViews from './components/CalendarViews.vue';
import TrainingModal from './components/TrainingModal.vue';
import ViewEventModal from './components/ViewEventModal.vue';

// Composables
import { useTrainingManagement } from './composables/useTrainingManagement.js';
import { useCalendar } from './composables/useCalendar.js';
import { useSearch } from './composables/useSearch.js';
import { useModal } from './composables/useModal.js';

// Use composables
const {
  events,
  trainingTypes,
  managers,
  rooms,
  addEvent,
  updateEvent,
  deleteEvent,
  deleteEventSession,
  createMultipleEvents,
  startDrag,
  handleDrop,
  handleDropToTimeSlot
} = useTrainingManagement();

const {
  viewMode,
  currentDate,
  currentPeriodTitle,
  previousPeriod,
  nextPeriod,
  goToToday,
  setViewMode
} = useCalendar();

const { searchQuery, filteredEvents, clearSearch } = useSearch(events);

const {
  showAddEventModal,
  showViewModal,
  selectedEvent,
  editingEvent,
  openCreateModal,
  openEditModal,
  openViewModal,
  closeAddModal,
  closeViewModal
} = useModal();

// Event handlers
const handleSaveEvent = ({ formData, preview, isEdit }) => {
  try {
    if (isEdit) {
      updateEvent(selectedEvent.value.id, formData);
    } else {
      createMultipleEvents(formData, preview);
    }
    closeAddModal();
  } catch (error) {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่');
  }
};

const handleDeleteEvent = (eventId) => {
  if (deleteEvent(eventId)) {
    closeViewModal();
  }
};

const handleDeleteSession = (eventId, sessionDate) => {
  if (deleteEventSession(eventId, sessionDate)) {
    closeViewModal();
  }
};
</script>