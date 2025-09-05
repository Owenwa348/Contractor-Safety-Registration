<!-- CalendarHeader.vue - Calendar navigation and view controls -->
<template>
  <div class="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-300">
    <!-- Navigation Controls -->
    <div class="flex items-center gap-2 mb-4 sm:mb-0">
      <button
        @click="$emit('previous-month')"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        title="เดือนก่อน"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        @click="$emit('next-month')"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        title="เดือนถัดไป"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <button
        @click="$emit('go-to-today')"
        class="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        วันนี้
      </button>
    </div>

    <!-- Current Month/Year Display -->
    <h2 class="text-xl font-normal text-gray-700 text-center flex-1">
      {{ currentMonthYear }}
    </h2>

    <!-- View Mode Controls -->
    <div class="flex gap-1 mt-4 sm:mt-0">
      <button
        :class="[
          'px-3 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          viewMode === 'month'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-100',
        ]"
        @click="$emit('update:view-mode', 'month')"
      >
        เดือน
      </button>
      <button
        :class="[
          'px-3 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          viewMode === 'week'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-100',
        ]"
        @click="$emit('update:view-mode', 'week')"
      >
        สัปดาห์
      </button>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  currentMonthYear: {
    type: String,
    required: true
  },
  viewMode: {
    type: String,
    required: true,
    default: 'month'
  }
})

// Emits
defineEmits([
  'previous-month',
  'next-month',
  'go-to-today',
  'update:view-mode'
])
</script>