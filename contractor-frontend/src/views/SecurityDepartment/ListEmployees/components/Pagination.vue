<!-- Pagination.vue -->
<template>
  <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <p class="text-sm text-gray-700">
          แสดง <span class="font-medium">{{ startRecord }}</span> ถึง 
          <span class="font-medium">{{ endRecord }}</span> 
          จาก <span class="font-medium">{{ totalRecords }}</span> รายการ
        </p>
        <div class="ml-4">
          <label class="text-sm text-gray-700 mr-2">แสดงต่อหน้า:</label>
          <select 
            :value="itemsPerPage" 
            @change="$emit('update:items-per-page', parseInt($event.target.value))"
            class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('page-change', 1)" 
          :disabled="currentPage === 1" 
          class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          แรก
        </button>
        
        <button 
          @click="$emit('page-change', currentPage - 1)" 
          :disabled="currentPage === 1" 
          class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ก่อนหน้า
        </button>
        
        <span 
          v-for="page in visiblePages" 
          :key="page" 
          @click="$emit('page-change', page)" 
          :class="[
            'px-3 py-1 text-sm border rounded-md cursor-pointer transition-colors',
            page === currentPage 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </span>
        
        <button 
          @click="$emit('page-change', currentPage + 1)" 
          :disabled="currentPage === totalPages" 
          class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ถัดไป
        </button>
        
        <button 
          @click="$emit('page-change', totalPages)" 
          :disabled="currentPage === totalPages" 
          class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          สุดท้าย
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalRecords: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
  emits: ['page-change', 'update:items-per-page'],
  computed: {
    startRecord() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    
    endRecord() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalRecords);
    },
    
    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  }
}
</script>