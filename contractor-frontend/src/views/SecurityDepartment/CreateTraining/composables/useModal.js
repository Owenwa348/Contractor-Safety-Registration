import { ref } from 'vue';

export function useModal() {
  const showAddEventModal = ref(false);
  const showViewModal = ref(false);
  const selectedEvent = ref(null);
  const editingEvent = ref(false);

  const openCreateModal = () => {
    selectedEvent.value = null;
    editingEvent.value = false;
    showAddEventModal.value = true;
  };

  const openEditModal = (event) => {
    // Create a clean copy of the event data for editing
    selectedEvent.value = {
      id: event.id,
      type: event.type,
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      selectedDays: event.selectedDays || [],
      examiner: event.examiner,
      room: event.room,
      maxParticipants: event.maxParticipants,
      currentParticipants: event.currentParticipants || 0,
      color: event.color,
      isBooked: event.isBooked || false
    };
    editingEvent.value = true;
    showViewModal.value = false;
    showAddEventModal.value = true;
  };

  const openViewModal = (event, clickedDate = null) => {
    if (clickedDate) {
      // Create a copy of the event with the specific clicked date
      selectedEvent.value = {
        ...event,
        clickedDate: clickedDate,
        displayStartDate: clickedDate,
        displayEndDate: clickedDate
      };
    } else {
      selectedEvent.value = event;
    }
    showViewModal.value = true;
  };

  const closeAllModals = () => {
    showAddEventModal.value = false;
    showViewModal.value = false;
    selectedEvent.value = null;
    editingEvent.value = false;
  };

  const closeAddModal = () => {
    showAddEventModal.value = false;
    editingEvent.value = false;
    selectedEvent.value = null;
  };

  const closeViewModal = () => {
    showViewModal.value = false;
    selectedEvent.value = null;
  };

  return {
    // State
    showAddEventModal,
    showViewModal,
    selectedEvent,
    editingEvent,

    // Methods
    openCreateModal,
    openEditModal,
    openViewModal,
    closeAllModals,
    closeAddModal,
    closeViewModal
  };
}