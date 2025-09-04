<template>
  <div class="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
    <div class="flex items-center gap-3 mb-4 sm:mb-0">
      <!-- Month Navigation Buttons -->
      <button @click="$emit('previous-month')" 
              class="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105" 
              title="เดือนก่อน">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button @click="$emit('next-month')" 
              class="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105" 
              title="เดือนถัดไป">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <button @click="$emit('go-to-today')" 
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 hover:border-gray-400 ml-2">
        วันนี้
      </button>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 text-center flex-1">
      {{ currentMonthYear }}
    </h2>

    <div class="flex gap-2 mt-4 sm:mt-0">
      <button :class="getViewModeButtonClass('month')" 
              @click="$emit('change-view-mode', 'month')">
        เดือน
      </button>
      <button :class="getViewModeButtonClass('week')" 
              @click="$emit('change-view-mode', 'week')">
        สัปดาห์
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentMonthYear: {
    type: String,
    required: true
  },
  viewMode: {
    type: String,
    required: true,
    validator: (value) => ['month', 'week'].includes(value)
  }
});

const emit = defineEmits([
  'previous-month',
  'next-month', 
  'go-to-today',
  'change-view-mode'
]);

const getViewModeButtonClass = (mode) => {
  return [
    'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300',
    props.viewMode === mode
      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
  ];
};
</script>