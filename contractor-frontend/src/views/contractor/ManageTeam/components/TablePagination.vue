<template>
  <div class="px-6 py-4 border-t bg-gray-50 flex flex-col lg:flex-row items-center justify-between gap-4">
    <div class="text-sm text-gray-600">
      แสดง {{ startEntry }} ถึง {{ endEntry }} จาก {{ totalEntries }} รายการ
    </div>
    <div class="flex items-center space-x-2">
      <button @click="goToPreviousPage" 
              :disabled="currentPage === 1" 
              class="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <i class="fas fa-chevron-left mr-2"></i>ก่อนหน้า
      </button>
      <div class="flex space-x-1">
        <button v-for="page in visiblePages" 
                :key="page" 
                @click="goToPage(page)"
                :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'"
                class="px-3 py-2 rounded text-sm transition-colors"
                :disabled="typeof page !== 'number'">
          {{ page }}
        </button>
      </div>
      <button @click="goToNextPage" 
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        ถัดไป<i class="fas fa-chevron-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  startEntry: {
    type: Number,
    required: true
  },
  endEntry: {
    type: Number,
    required: true
  },
  totalEntries: {
    type: Number,
    required: true
  }
})

// Emits
const emit = defineEmits(['update:current-page'])

// Computed
const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  
  for (let i = Math.max(2, props.currentPage - delta); i <= Math.min(props.totalPages - 1, props.currentPage + delta); i++) {
    range.push(i)
  }
  
  if (props.currentPage - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }
  
  rangeWithDots.push(...range)
  
  if (props.currentPage + delta < props.totalPages - 1) {
    rangeWithDots.push('...', props.totalPages)
  } else {
    rangeWithDots.push(props.totalPages)
  }
  
  return rangeWithDots.filter(() => props.totalPages > 1)
})

// Methods
const goToPage = (page) => {
  if (typeof page === 'number') {
    emit('update:current-page', page)
  }
}

const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    emit('update:current-page', props.currentPage - 1)
  }
}

const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:current-page', props.currentPage + 1)
  }
}
</script>