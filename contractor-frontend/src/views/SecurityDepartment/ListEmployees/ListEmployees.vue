<!-- ListEmployees.vue - Refactored Version -->
<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">รายชื่อผู้ลงทะเบียนทั้งหมด</h1>
          <p class="text-gray-600">จัดการและดาวน์โหลดข้อมูลผู้ประสานงานคู่ธุรกิจ</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-600">{{ filteredTableData.length }}</div>
            <div class="text-sm text-gray-500">รายการทั้งหมด</div>
          </div>
        </div>
      </div>
      
      <!-- Statistics Cards Component -->
      <StatisticsCards 
        :total-count="totalCount" 
        :status-counts="statusCounts" 
      />
    </div>

    <!-- Search and Filter Section Component -->
    <SearchFilter
      :filters="searchData"
      :departments="departments"
      :organizations="organizations"
      @update:department="updateFilter('department', $event)"
      @update:organization="updateFilter('organization', $event)"
      @update:searchTerm="updateFilter('searchTerm', $event)"
      @search="handleSearch"
      @clear-filters="clearFilters"
    />

    <!-- Employee Table Component -->
    <EmployeeTable
      :employees="paginatedData"
      :total-count="filteredTableData.length"
      :deleted-count="deletedEmployees.length"
      :start-index="startIndex"
      @delete-employee="confirmDelete"
      @show-deleted="showDeletedModal = true"
    />

    <!-- Pagination Component -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-records="filteredTableData.length"
      :items-per-page="itemsPerPage"
      @page-change="setPage"
      @update:items-per-page="setItemsPerPage"
    />

    <!-- Delete Confirmation Modal Component -->
    <DeleteModal
      :show="showDeleteModal"
      :employee="itemToDelete"
      @confirm="deleteItem"
      @cancel="cancelDelete"
    />

    <!-- Deleted Employees Modal Component -->
    <DeletedEmployeesModal
      :show="showDeletedModal"
      :deleted-employees="deletedEmployees"
      :selected-deleted-items="selectedDeletedItems"
      @close="showDeletedModal = false"
      @restore-employee="handleRestoreEmployee"
      @permanent-delete="handlePermanentDelete"
      @bulk-restore="handleBulkRestore"
      @bulk-permanent-delete="handleBulkPermanentDelete"
      @toggle-select-all="toggleSelectAllDeleted"
      @toggle-select-item="toggleSelectItem"
    />

    <!-- Notification Toast Component -->
    <NotificationToast
      :show="showMessage"
      :message="message"
      :type="messageType"
    />
  </div>
</template>

<script>
import StatisticsCards from './components/StatisticsCards.vue'
import SearchFilter from './components/SearchFilter.vue'
import EmployeeTable from './components/EmployeeTable.vue'
import Pagination from './components/Pagination.vue'
import DeleteModal from './components/DeleteModal.vue'
import DeletedEmployeesModal from './components/DeletedEmployeesModal.vue'
import NotificationToast from './components/NotificationToast.vue'

import { useEmployeeData } from './composables/useEmployeeData.js'
import { usePagination } from './composables/usePagination.js'
import { useNotification } from './composables/useNotification.js'

export default {
  name: 'RegistrationListPage',
  components: {
    StatisticsCards,
    SearchFilter,
    EmployeeTable,
    Pagination,
    DeleteModal,
    DeletedEmployeesModal,
    NotificationToast
  },

  setup() {
    // Composables
    const {
      tableData,
      deletedEmployees,
      searchData,
      totalCount,
      statusCounts,
      filteredTableData,
      deleteEmployee,
      restoreEmployee,
      permanentDeleteEmployee,
      clearFilters,
      updateFilter
    } = useEmployeeData()

    const {
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      startIndex,
      setPage,
      setItemsPerPage,
      adjustPageIfNeeded
    } = usePagination(filteredTableData)

    const {
      showMessage,
      message,
      messageType,
      showNotification
    } = useNotification()

    return {
      // Employee data
      tableData,
      deletedEmployees,
      searchData,
      totalCount,
      statusCounts,
      filteredTableData,
      deleteEmployee,
      restoreEmployee,
      permanentDeleteEmployee,
      clearFilters,
      updateFilter,

      // Pagination
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      startIndex,
      setPage,
      setItemsPerPage,
      adjustPageIfNeeded,

      // Notifications
      showMessage,
      message,
      messageType,
      showNotification
    }
  },

  data() {
    return {
      // Modal states
      showDeleteModal: false,
      showDeletedModal: false,
      itemToDelete: null,
      
      // Checkbox selection for deleted employees
      selectedDeletedItems: [],
      
      // Static data
      departments: ['รอการอนุมัติ', 'อนุมัติแล้ว', 'ไม่อนุมัติ', 'ผ่านการอบรม', 'หมดอายุ', 'ไม่ผ่าน'],
      organizations: ['บริษัท ABC จำกัด', 'บริษัท XYZ จำกัด', 'บริษัท DEF จำกัด', 'มหาวิทยาลัย GHI', 'โรงพยาบาล JKL']
    }
  },

  watch: {
    itemsPerPage() {
      this.adjustPageIfNeeded()
    }
  },

  methods: {
    handleSearch() {
      this.setPage(1)
    },

    confirmDelete(item) {
      this.itemToDelete = item
      this.showDeleteModal = true
    },

    cancelDelete() {
      this.itemToDelete = null
      this.showDeleteModal = false
    },

    deleteItem() {
      if (this.itemToDelete) {
        const success = this.deleteEmployee(this.itemToDelete)
        if (success) {
          this.showNotification(`ลบข้อมูล ${this.itemToDelete.name} เรียบร้อยแล้ว (สามารถกู้คืนได้)`, 'success')
          this.adjustPageIfNeeded()
        }
      }
      this.cancelDelete()
    },

    handleRestoreEmployee(employee) {
      const success = this.restoreEmployee(employee)
      if (success) {
        this.showNotification(`กู้คืนข้อมูล ${employee.name} เรียบร้อยแล้ว`, 'success')
      }
    },

    handlePermanentDelete(employee) {
      const success = this.permanentDeleteEmployee(employee)
      if (success) {
        this.showNotification(`ลบข้อมูล ${employee.name} อย่างถาวรเรียบร้อยแล้ว`, 'success')
      }
    },

    handleBulkRestore(selectedIds) {
      const employees = this.deletedEmployees.filter(emp => selectedIds.includes(emp.id))
      let restoredCount = 0
      
      employees.forEach(employee => {
        const success = this.restoreEmployee(employee)
        if (success) restoredCount++
      })
      
      this.selectedDeletedItems = []
      this.showNotification(`กู้คืนข้อมูล ${restoredCount} รายการเรียบร้อยแล้ว`, 'success')
    },

    handleBulkPermanentDelete(selectedIds) {
      const employees = this.deletedEmployees.filter(emp => selectedIds.includes(emp.id))
      let deletedCount = 0
      
      employees.forEach(employee => {
        const success = this.permanentDeleteEmployee(employee)
        if (success) deletedCount++
      })
      
      this.selectedDeletedItems = []
      this.showNotification(`ลบข้อมูล ${deletedCount} รายการอย่างถาวรเรียบร้อยแล้ว`, 'success')
    },

    toggleSelectAllDeleted() {
      if (this.selectedDeletedItems.length === this.deletedEmployees.length) {
        this.selectedDeletedItems = []
      } else {
        this.selectedDeletedItems = this.deletedEmployees.map(emp => emp.id)
      }
    },

    toggleSelectItem(itemId) {
      const index = this.selectedDeletedItems.indexOf(itemId)
      if (index > -1) {
        this.selectedDeletedItems.splice(index, 1)
      } else {
        this.selectedDeletedItems.push(itemId)
      }
    }
  },

  mounted() {
    console.log('Registration List Page loaded with', this.tableData.length, 'records')
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .overflow-x-auto { 
    overflow-x: auto; 
  }
}

@media print {
  .no-print { 
    display: none; 
  }
  button, .bg-blue-600, .fixed { 
    display: none !important; 
  }
}

@media (prefers-reduced-motion: reduce) {
  * { 
    animation-duration: 0.01ms !important; 
    transition-duration: 0.01ms !important; 
  }
}
</style>