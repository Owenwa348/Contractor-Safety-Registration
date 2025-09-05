<template>
  <div class="max-w-5xl mx-auto p-6 print:p-0 print:max-w-none">
    <!-- Control Panel - Hidden in Print -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6 print:hidden">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">ตัวอย่างบัตรพนักงาน</h2>
          <p class="text-gray-600">{{ selectedTrainingType }} - ตรวจสอบข้อมูลก่อนพิมพ์</p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="$emit('print')"
            :disabled="!issueDate || !expiryDate"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <PrinterIcon class="w-5 h-5" />
            พิมพ์บัตร
          </button>
          <button
            @click="$emit('goBack')"
            class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <ArrowLeftIcon class="w-5 h-5" />
            กลับ
          </button>
        </div>
      </div>
      
      <!-- Warning message for missing dates in preview -->
      <div v-if="!issueDate || !expiryDate" class="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              <strong>เตือน:</strong> กรุณากรอกวันที่ออกบัตรและวันหมดอายุก่อนพิมพ์บัตร กลับไปหน้าก่อนหน้าเพื่อกรอกข้อมูลให้ครบถ้วน
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards Grid - Print Only This Section -->
    <div class="print-area grid grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
      <EmployeeCard
        v-for="contractor in selectedContractorData"
        :key="contractor.id"
        :contractor="contractor"
        :issue-date="issueDate"
        :expiry-date="expiryDate"
      />
    </div>
  </div>
</template>

<script setup>
import { 
  Printer as PrinterIcon,
  ArrowLeft as ArrowLeftIcon
} from 'lucide-vue-next'
import EmployeeCard from './EmployeeCard.vue'

// Props
defineProps({
  selectedContractorData: {
    type: Array,
    required: true
  },
  selectedTrainingType: {
    type: String,
    required: true
  },
  issueDate: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  }
})

// Emits
defineEmits(['print', 'goBack'])
</script>

<style scoped>
/* Print Styles */
@media print {
  body * {
    visibility: hidden;
  }
  
  .print-area,
  .print-area * {
    visibility: visible;
  }
  
  .print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>