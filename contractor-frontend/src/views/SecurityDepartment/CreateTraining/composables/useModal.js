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
    selectedEvent.value = event;
    editingEvent.value = true;
    showViewModal.value = false;
    showAddEventModal.value = true;
  };

  const openViewModal = (event) => {
    selectedEvent.value = event;
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