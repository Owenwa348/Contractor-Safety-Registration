<!-- DeletedEmployeesModal.vue -->
<template>
  <!-- Main Modal -->
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-60">
    <div class="bg-white rounded-lg max-w-6xl w-full mx-4 shadow-xl max-h-[90vh] overflow-hidden">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center">
          <svg class="h-6 w-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900">รายการที่ลบแล้ว ({{ deletedEmployees.length }} รายการ)</h3>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- Bulk Actions Toolbar -->
        <div v-if="selectedDeletedItems.length > 0" class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-blue-800 font-medium">เลือกแล้ว {{ selectedDeletedItems.length }} รายการ</span>
            </div>
            <div class="flex space-x-3">
              <button @click="showBulkRestoreConfirmation" class="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                </svg>
                กู้คืนข้อมูล
              </button>
              <button @click="showBulkDeleteConfirmation" class="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                ลบข้อมูลถาวร
              </button>
            </div>
          </div>
        </div>

        <div v-if="deletedEmployees.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
          <p class="text-lg font-medium text-gray-900 mb-2">ไม่มีข้อมูลที่ลบแล้ว</p>
          <p class="text-gray-500">รายการที่ถูกลบจะแสดงที่นี่</p>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <input 
                    type="checkbox" 
                    :checked="isAllSelected"
                    @change="$emit('toggle-select-all')"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ลำดับ</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">รายชื่อ</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">เบอร์โทรศัพท์</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">องค์กร</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่ลบ</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ลบโดย</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(employee, index) in deletedEmployees" :key="employee.id" class="hover:bg-gray-50">
                <td class="px-4 py-3 text-center">
                  <input 
                    type="checkbox" 
                    :checked="selectedDeletedItems.includes(employee.id)"
                    @change="$emit('toggle-select-item', employee.id)"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td class="px-4 py-3 text-center text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                
                <td class="px-4 py-3 text-sm text-gray-900">
                  <div>
                    <div class="font-medium text-gray-900">{{ employee.name }}</div>
                    <div class="text-xs text-gray-500">ID: {{ employee.id }}</div>
                  </div>
                </td>
                
                <td class="px-4 py-3 text-sm text-gray-900">{{ employee.phoneNumber }}</td>
                <td class="px-4 py-3 text-sm text-gray-900">{{ employee.organization }}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(employee.deletedAt) }}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{{ employee.deletedBy }}</td>
                
                <td class="px-4 py-3 text-center">
                  <div class="flex justify-center space-x-2">
                    <button @click="showRestoreConfirmation(employee)" class="text-green-600 hover:text-green-900 hover:bg-green-50 p-2 rounded-lg transition-colors" title="กู้คืน">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                      </svg>
                    </button>
                    <button @click="showDeleteConfirmation(employee)" class="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg transition-colors" title="ลบถาวร">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="flex justify-end mt-6">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">ปิด</button>
        </div>
      </div>
    </div>
      <!-- Restore Confirmation Modal -->
  <div v-if="showRestoreConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-70">
    <div class="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">ยืนยันการกู้คืนข้อมูล</h3>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-500">
            คุณต้องการกู้คืนข้อมูล {{ confirmAction.type === 'bulk' ? `${confirmAction.items.length} รายการ` : confirmAction.employee?.name }} หรือไม่?
          </p>
          <p class="text-xs text-gray-400 mt-2">
            ข้อมูลจะถูกย้ายกลับไปยังรายการหลักและสามารถใช้งานได้ตามปกติ
          </p>
        </div>
        <div class="flex justify-end space-x-3">
          <button @click="cancelConfirmation" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
            ยกเลิก
          </button>
          <button @click="confirmRestoreAction" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
            ยืนยันการกู้คืน
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Permanent Delete Confirmation Modal -->
  <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-70">
    <div class="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 15.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">ยืนยันการลบข้อมูลถาวร</h3>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-500">
            คุณต้องการลบข้อมูล {{ confirmAction.type === 'bulk' ? `${confirmAction.items.length} รายการ` : confirmAction.employee?.name }} อย่างถาวรหรือไม่?
          </p>
          <p class="text-xs text-red-600 mt-2 font-medium">
            ⚠️ การดำเนินการนี้ไม่สามารถย้อนกลับได้ ข้อมูลจะถูกลบออกจากระบบอย่างถาวร
          </p>
        </div>
        <div class="flex justify-end space-x-3">
          <button @click="cancelConfirmation" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
            ยกเลิก
          </button>
          <button @click="confirmDeleteAction" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
            ยืนยันการลบถาวร
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'DeletedEmployeesModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    deletedEmployees: {
      type: Array,
      default: () => []
    },
    selectedDeletedItems: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    'close', 
    'restore-employee', 
    'permanent-delete', 
    'bulk-restore', 
    'bulk-permanent-delete',
    'toggle-select-all',
    'toggle-select-item'
  ],
  data() {
    return {
      showRestoreConfirm: false,
      showDeleteConfirm: false,
      confirmAction: {
        type: null, // 'single' or 'bulk'
        employee: null,
        items: []
      }
    }
  },
  computed: {
    isAllSelected() {
      return this.selectedDeletedItems.length === this.deletedEmployees.length && this.deletedEmployees.length > 0
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '-'
      const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Bangkok' }
      return new Date(dateString).toLocaleDateString('th-TH', options)
    },
    
    // Restore confirmation methods
    showRestoreConfirmation(employee) {
      this.confirmAction = {
        type: 'single',
        employee: employee,
        items: []
      }
      this.showRestoreConfirm = true
    },
    
    showBulkRestoreConfirmation() {
      this.confirmAction = {
        type: 'bulk',
        employee: null,
        items: [...this.selectedDeletedItems]
      }
      this.showRestoreConfirm = true
    },
    
    confirmRestoreAction() {
      if (this.confirmAction.type === 'single') {
        this.$emit('restore-employee', this.confirmAction.employee)
      } else if (this.confirmAction.type === 'bulk') {
        this.$emit('bulk-restore', this.confirmAction.items)
      }
      this.cancelConfirmation()
    },
    
    // Delete confirmation methods
    showDeleteConfirmation(employee) {
      this.confirmAction = {
        type: 'single',
        employee: employee,
        items: []
      }
      this.showDeleteConfirm = true
    },
    
    showBulkDeleteConfirmation() {
      this.confirmAction = {
        type: 'bulk',
        employee: null,
        items: [...this.selectedDeletedItems]
      }
      this.showDeleteConfirm = true
    },
    
    confirmDeleteAction() {
      if (this.confirmAction.type === 'single') {
        this.$emit('permanent-delete', this.confirmAction.employee)
      } else if (this.confirmAction.type === 'bulk') {
        this.$emit('bulk-permanent-delete', this.confirmAction.items)
      }
      this.cancelConfirmation()
    },
    
    // Common confirmation methods
    cancelConfirmation() {
      this.showRestoreConfirm = false
      this.showDeleteConfirm = false
      this.confirmAction = {
        type: null,
        employee: null,
        items: []
      }
    }
  }
}
</script>