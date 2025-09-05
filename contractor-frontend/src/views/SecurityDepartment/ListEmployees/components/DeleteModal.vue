<!-- DeleteModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
      <div class="flex items-center mb-4">
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
      </div>
      <div class="text-center">
        <h3 class="text-lg font-medium text-gray-900 mb-2">ยืนยันการลบข้อมูล</h3>
        <p class="text-sm text-gray-600 mb-4">
          คุณต้องการลบ <strong>{{ employee?.name }}</strong> ออกจากระบบหรือไม่?
        </p>
        <p class="text-xs text-red-600 mb-6">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
      </div>
      
      <div class="flex justify-center space-x-3">
        <button 
          @click="$emit('cancel')" 
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          ยกเลิก
        </button>
        <button 
          @click="$emit('confirm')" 
          class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          ลบข้อมูล
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    employee: {
      type: Object,
      default: null
    }
  },
  emits: ['confirm', 'cancel']
}
</script>