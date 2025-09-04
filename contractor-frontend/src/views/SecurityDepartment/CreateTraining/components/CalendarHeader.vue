<template>
  <div class="flex flex-col lg:flex-row justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
    <!-- Navigation Controls -->
    <div class="flex items-center gap-3 mb-4 lg:mb-0">
      <button 
        @click="$emit('previousPeriod')" 
        class="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all" 
        :title="viewMode === 'month' ? 'เดือนก่อน' : 'สัปดาห์ก่อน'"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button 
        @click="$emit('nextPeriod')" 
        class="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all" 
        :title="viewMode === 'month' ? 'เดือนถัดไป' : 'สัปดาห์ถัดไป'"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      <button 
        @click="$emit('goToToday')" 
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-all hover:shadow-lg"
      >
        วันนี้
      </button>
      
      <!-- Search Box -->
      <div class="hidden md:flex items-center gap-2 ml-4">
        <input 
          :value="searchQuery" 
          @input="$emit('update:searchQuery', $event.target.value)"
          type="text" 
          placeholder="ค้นหาการอบรม..." 
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button 
          @click="$emit('clearSearch')" 
          v-if="searchQuery" 
          class="p-2 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Period Title -->
    <h2 class="text-xl font-bold text-gray-800 text-center flex-1">{{ currentPeriodTitle }}</h2>

    <!-- View Mode Buttons -->
    <div class="flex gap-2 mt-4 lg:mt-0">
      <button 
        v-for="mode in viewModes" 
        :key="mode.value" 
        :class="[
          'px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-md',
          viewMode === mode.value ? 
            'bg-blue-600 text-white shadow-lg' : 
            'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
        ]" 
        @click="$emit('setViewMode', mode.value)"
      >
        {{ mode.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  viewMode: {
    type: String,
    required: true
  },
  currentPeriodTitle: {
    type: String,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'previousPeriod',
  'nextPeriod', 
  'goToToday',
  'setViewMode',
  'update:searchQuery',
  'clearSearch'
]);

const viewModes = [
  { value: 'month', label: 'เดือน' }, 
  { value: 'week', label: 'สัปดาห์' }
];
</script>