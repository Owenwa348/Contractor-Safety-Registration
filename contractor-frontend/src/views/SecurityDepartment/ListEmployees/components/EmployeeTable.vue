<!-- EmployeeTable.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
      <h3 class="text-lg font-semibold text-white flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        รายชื่อทั้งหมด
      </h3>
      <div class="flex items-center space-x-3">
        <div class="text-sm text-blue-100">แสดง {{ employees.length }} จาก {{ totalCount }} รายการ</div>
        <button 
          @click="$emit('show-deleted')" 
          class="flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition-colors text-sm"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          รายการที่ลบ ({{ deletedCount }})
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ลำดับ</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รายชื่อ</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เบอร์โทรศัพท์</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">องค์กร</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่ลงทะเบียน</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะเอกสาร</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่อนุมัติ</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หมายเหตุ</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">จัดการ</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in employees" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
              {{ startIndex + index + 1 }}
            </td>
            
            <td class="px-4 py-3 text-sm text-gray-900">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-blue-600 font-semibold text-sm">{{ item.name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium text-gray-900">{{ item.name }}</div>
                  <div class="text-xs text-gray-500">ID: {{ item.id }}</div>
                </div>
              </div>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ item.phoneNumber }}
              </div>
            </td>
            
            <td class="px-4 py-3 text-sm text-gray-900">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <span class="truncate max-w-32" :title="item.organization">{{ item.organization }}</span>
              </div>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ formatDate(item.registrationDate) }}
              </div>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap text-sm">
              <span :class="getStatusClass(item.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                <svg :class="getStatusIconClass(item.status)" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="item.status === 'รอการอนุมัติ'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  <path v-else-if="item.status === 'อนุมัติแล้ว'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  <path v-else-if="item.status === 'ผ่านการอบรม'" fill-rule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" clip-rule="evenodd"/>
                  <path v-else-if="item.status === 'หมดอายุ'" fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                  <path v-else-if="item.status === 'ไม่ผ่าน'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                {{ item.status }}
              </span>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              <div v-if="item.approvalDate" class="flex items-center">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ formatDate(item.approvalDate) }}
              </div>
              <div v-else class="text-gray-400 text-center">-</div>
            </td>
            
            <td class="px-4 py-3 text-sm text-gray-500">
              <div v-if="item.rejectReason" class="text-red-600 text-xs">{{ item.rejectReason }}</div>
              <div v-else class="text-gray-400 text-center">-</div>
            </td>
            
            <td class="px-4 py-3 whitespace-nowrap text-center">
              <button 
                @click="$emit('delete-employee', item)" 
                class="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg transition-colors" 
                :title="`ลบ ${item.name}`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </td>
          </tr>
          
          <tr v-if="employees.length === 0">
            <td colspan="9" class="px-4 py-12 text-center text-gray-500">
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p class="text-lg font-medium text-gray-900 mb-2">ไม่พบข้อมูล</p>
                <p class="text-gray-500">ไม่มีรายการที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: {
    employees: {
      type: Array,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    deletedCount: {
      type: Number,
      default: 0
    },
    startIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['delete-employee', 'show-deleted'],
  methods: {
    getStatusClass(status) {
      const classes = {
        'รอการอนุมัติ': 'bg-yellow-100 text-yellow-800',
        'อนุมัติแล้ว': 'bg-green-100 text-green-800',
        'ไม่อนุมัติ': 'bg-red-100 text-red-800',
        'ผ่านการอบรม': 'bg-indigo-100 text-indigo-800',
        'หมดอายุ': 'bg-gray-100 text-gray-800',
        'ไม่ผ่าน': 'bg-orange-100 text-orange-800',
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },

    getStatusIconClass(status) {
      const classes = {
        'รอการอนุมัติ': 'text-yellow-600',
        'อนุมัติแล้ว': 'text-green-600',
        'ไม่อนุมัติ': 'text-red-600',
        'ผ่านการอบรม': 'text-indigo-600',
        'หมดอายุ': 'text-gray-600',
        'ไม่ผ่าน': 'text-orange-600',
      };
      return classes[status] || 'text-gray-600';
    },

    formatDate(dateString) {
      if (!dateString) return '-';
      const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Bangkok' };
      return new Date(dateString).toLocaleDateString('th-TH', options);
    }
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .overflow-x-auto { overflow-x: auto; }
  table { min-width: 1000px; }
}

.overflow-x-auto::-webkit-scrollbar { height: 8px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>