<template>
  <div class="bg-white rounded-xl shadow-lg p-6 space-y-6 sticky top-6">
    <h3 class="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">ตัวเลือก</h3>
    
    <!-- Search by Company -->
    <div>
      <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
        <BuildingIcon class="w-4 h-4 mr-2" />
        ค้นหาบริษัท
      </label>
      <div class="relative">
        <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="ชื่อบริษัท..."
          :value="searchCompany"
          @input="$emit('update:searchCompany', $event.target.value)"
          class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>

    <!-- Search by Training Date -->
    <div>
      <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
        <CalendarIcon class="w-4 h-4 mr-2" />
        ค้นหาวันที่อบรม
      </label>
      <input
        type="date"
        :value="searchDate"
        @input="$emit('update:searchDate', $event.target.value)"
        class="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    <!-- Issue Date -->
    <div>
      <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
        <CalendarIcon class="w-4 h-4 mr-2" />
        <span class="text-red-500">*</span>
        วันที่ออกบัตร
      </label>
      <input
        type="date"
        :value="issueDate"
        @input="$emit('update:issueDate', $event.target.value)"
        required
        class="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        :class="{ 'border-red-500 bg-red-50': !issueDate }"
      />
      <p v-if="!issueDate" class="text-red-500 text-xs mt-1">กรุณากรอกวันที่ออกบัตร</p>
    </div>

    <!-- Expiry Date -->
    <div>
      <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
        <CalendarIcon class="w-4 h-4 mr-2" />
        <span class="text-red-500">*</span>
        วันหมดอายุ
      </label>
      <input
        type="date"
        :value="expiryDate"
        @input="$emit('update:expiryDate', $event.target.value)"
        required
        class="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        :class="{ 'border-red-500 bg-red-50': !expiryDate }"
      />
      <p v-if="!expiryDate" class="text-red-500 text-xs mt-1">กรุณากรอกวันหมดอายุ</p>
    </div>

    <!-- Statistics -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3">
      <div class="flex justify-between items-center text-sm">
        <span class="text-gray-600">ทั้งหมด:</span>
        <span class="font-bold text-gray-800 bg-white px-2 py-1 rounded-full">{{ totalCount }} คน</span>
      </div>
      <div class="flex justify-between items-center text-sm">
        <span class="text-gray-600">เลือกแล้ว:</span>
        <span class="font-bold text-blue-600 bg-white px-2 py-1 rounded-full">{{ selectedCount }} คน</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3">
      <button
        @click="$emit('selectAll')"
        class="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
      >
        {{ selectedCount === totalCount ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด' }}
      </button>
      
      <button
        @click="$emit('print')"
        :disabled="selectedCount === 0 || !issueDate || !expiryDate"
        class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
      >
        <PrinterIcon class="w-4 h-4" />
        พิมพ์บัตร ({{ selectedCount }})
      </button>
      
      <!-- Warning Message -->
      <div v-if="selectedCount > 0 && (!issueDate || !expiryDate)" class="text-center">
        <p class="text-red-500 text-sm font-medium">
          กรุณากรอกวันที่ออกบัตรและวันหมดอายุก่อนพิมพ์
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Search as SearchIcon,
  Printer as PrinterIcon,
  Calendar as CalendarIcon,
  Building as BuildingIcon
} from 'lucide-vue-next'

// Props
defineProps({
  searchCompany: {
    type: String,
    default: ''
  },
  searchDate: {
    type: String,
    default: ''
  },
  issueDate: {
    type: String,
    default: ''
  },
  expiryDate: {
    type: String,
    default: ''
  },
  totalCount: {
    type: Number,
    default: 0
  },
  selectedCount: {
    type: Number,
    default: 0
  }
})

// Emits
defineEmits([
  'update:searchCompany',
  'update:searchDate', 
  'update:issueDate',
  'update:expiryDate',
  'selectAll',
  'print'
])
</script>