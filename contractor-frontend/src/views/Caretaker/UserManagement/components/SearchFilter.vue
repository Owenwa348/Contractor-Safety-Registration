<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search Term -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">ค้นหา</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input 
            type="text" 
            v-model="localSearchData.searchTerm"
            @input="updateFilter"
            placeholder="ชื่อ, อีเมล, เบอร์โทร..." 
            class="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <!-- Role Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">บทบาท</label>
        <select 
          v-model="localSearchData.role" 
          @change="updateFilter"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">ทั้งหมด</option>
          <option v-for="role in roles" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
        <select 
          v-model="localSearchData.status" 
          @change="updateFilter"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">ทั้งหมด</option>
          <option value="active">ใช้งาน</option>
          <option value="inactive">ไม่ใช้งาน</option>
          <option value="suspended">ระงับการใช้งาน</option>
        </select>
      </div>

      <!-- Last Login Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">เข้าสู่ระบบล่าสุด</label>
        <select 
          v-model="localSearchData.lastLogin" 
          @change="updateFilter"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">ทั้งหมด</option>
          <option value="today">วันนี้</option>
          <option value="week">สัปดาห์ที่แล้ว</option>
          <option value="month">เดือนที่แล้ว</option>
          <option value="never">ยังไม่เคยเข้าสู่ระบบ</option>
        </select>
      </div>
    </div>

    <!-- Clear Filters Button -->
    <div class="mt-4 flex justify-end">
      <button 
        @click="clearFilters" 
        class="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        ล้างตัวกรอง
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  searchData: {
    type: Object,
    required: true
  },
  roles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['updateFilter', 'clearFilters'])

// Local reactive copy of search data to avoid mutating props
const localSearchData = ref({ ...props.searchData })

// Watch for external changes to searchData prop
watch(() => props.searchData, (newValue) => {
  localSearchData.value = { ...newValue }
}, { deep: true })

const updateFilter = () => {
  emit('updateFilter', { ...localSearchData.value })
}

const clearFilters = () => {
  localSearchData.value = {
    role: '',
    status: '',
    searchTerm: '',
    lastLogin: ''
  }
  emit('clearFilters')
}
</script>