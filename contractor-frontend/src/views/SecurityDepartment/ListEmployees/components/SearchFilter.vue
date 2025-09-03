<!-- SearchFilter.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
      </svg>
      ค้นหาและกรองข้อมูล
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">สถานะเอกสาร</label>
        <select 
          :value="filters.department" 
          @input="$emit('update:department', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">ทั้งหมด</option>
          <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">องค์กร</label>
        <select 
          :value="filters.organization" 
          @input="$emit('update:organization', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">ทั้งหมด</option>
          <option v-for="org in organizations" :key="org" :value="org">{{ org }}</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">ค้นหา</label>
        <div class="relative">
          <input 
            type="text" 
            :value="filters.searchTerm" 
            @input="$emit('update:searchTerm', $event.target.value)"
            placeholder="ชื่อ, เบอร์โทร" 
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            @keyup.enter="$emit('search')" 
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="flex items-end space-x-3">
        <button 
          @click="$emit('clear-filters')" 
          class="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          ล้าง
        </button>
        <button 
          @click="$emit('search')" 
          class="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          ค้นหา
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
  props: {
    filters: {
      type: Object,
      required: true
    },
    departments: {
      type: Array,
      default: () => []
    },
    organizations: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:department', 'update:organization', 'update:searchTerm', 'search', 'clear-filters']
}
</script>