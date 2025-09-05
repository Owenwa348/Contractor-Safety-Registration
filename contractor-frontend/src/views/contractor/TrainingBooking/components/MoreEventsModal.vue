<!-- MoreEventsModal.vue - Modal for displaying multiple events on a date -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-[modal-fade-in_0.2s_ease-out]">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          การอบรมวันที่ {{ formatThaiDate(eventsDate) }}
        </h3>
        <button 
          @click="$emit('close')" 
          class="text-gray-400 hover:text-gray-600 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Events List -->
      <div class="space-y-2">
        <div
          v-for="event in eventsList"
          :key="event.id"
          class="p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="isEventPast(event) 
            ? 'cursor-not-allowed bg-gray-50 opacity-60 hover:translate-y-0 hover:shadow-none' 
            : 'cursor-pointer hover:bg-gray-50 hover:border-gray-300'"
          @click="!isEventPast(event) && $emit('view-event', event)"
          tabindex="0"
          @keydown.enter="!isEventPast(event) && $emit('view-event', event)"
        >
          <div class="flex items-center">
            <div 
              class="w-3 h-3 rounded-full mr-3" 
              :class="isEventPast(event) ? 'bg-gray-400' : 'bg-blue-600'"
            ></div>
            <div>
              <div class="font-medium" :class="isEventPast(event) ? 'text-gray-500' : 'text-gray-900'">
                {{ event.title }}
              </div>
              <div class="text-sm" :class="isEventPast(event) ? 'text-gray-400' : 'text-gray-600'">
                {{ event.isAllDay ? 'ทั้งวัน' : event.time + ':00 น.' }}
              </div>
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
  show: {
    type: Boolean,
    default: false
  },
  eventsDate: {
    type: String,
    default: ''
  },
  eventsList: {
    type: Array,
    default: () => []
  },
  formatThaiDate: {
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
  'close',
  'view-event'
])
</script>

<style scoped>
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
</style>