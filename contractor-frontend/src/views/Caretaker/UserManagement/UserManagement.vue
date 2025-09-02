<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">จัดการผู้ใช้งาน</h1>
          <p class="text-gray-600">จัดการบัญชีผู้ใช้งาน สิทธิ์การเข้าถึง และการตรวจสอบความปลอดภัย</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="showAddUserModal = true" class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            เพิ่มผู้ใช้งาน
          </button>
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-600">{{ filteredUsers.length }}</div>
            <div class="text-sm text-gray-500">ผู้ใช้งานทั้งหมด</div>
          </div>
        </div>
      </div>
      
      <!-- Statistics Cards -->
      <UserStats :users="filteredUsers" />
    </div>

    <!-- Search and Filter Section -->
    <SearchFilter 
      :search-data="searchData" 
      :roles="roles" 
      @updateFilter="updateFilter" 
      @clearFilters="clearFilters" 
    />

    <!-- User Management Table -->
    <UserTable
      :users="filteredUsers"
      :roles="roles"
      @editUser="handleEditUser"
      @toggleUserStatus="handleToggleUserStatus"
      @resetPassword="handleResetPassword"
      @deleteUser="handleDeleteUser"
    />

    <!-- Add Multiple Users Modal -->
    <AddUserModal
      :show="showAddUserModal"
      :new-users="newUsers"
      @close="closeModal"
      @save="handleSaveMultipleUsers"
    />

    <!-- Edit User Modal -->
    <EditUserModal
      :show="showEditUserModal"
      :user-form="userForm"
      :roles="roles"
      @close="closeModal"
      @save="handleSaveUser"
    />

    <!-- Notification Toast -->
    <NotificationToast
      :notification="notification"
      @hide="hideNotification"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserStats from './components/UserStats.vue'
import SearchFilter from './components/SearchFilter.vue'
import UserTable from './components/UserTable.vue'
import AddUserModal from './components/AddUserModal.vue'
import EditUserModal from './components/EditUserModal.vue'
import NotificationToast from './components/NotificationToast.vue'
import { useUserManagement } from './composables/useUserManagement.js'
import { useNotification } from './composables/useNotification.js'
import { usePasswordReset } from './composables/usePasswordReset.js'

// Use composables
const {
  users,
  searchData,
  roles,
  filteredUsers,
  updateFilter,
  clearFilters,
  editUser,
  toggleUserStatus,
  deleteUser,
  addMultipleUsers,
  initializeSampleData
} = useUserManagement()

const { notification, showNotification, hideNotification } = useNotification()
const { resetPasswordDirect } = usePasswordReset()

// Modal states
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)

// Form data
const userForm = ref({
  id: null,
  name: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  status: 'active'
})

const newUsers = ref([
  { email: '', company: '', role: 'safety' }
])

// Event handlers
const handleEditUser = (user) => {
  userForm.value = { ...user }
  showEditUserModal.value = true
}

const handleToggleUserStatus = (user) => {
  toggleUserStatus(user)
}

const handleResetPassword = async (user) => {
  await resetPasswordDirect(user, showNotification)
}

const handleDeleteUser = (user) => {
  const userName = user.name && user.name.trim() ? user.name : user.email
  if (confirm(`ต้องการลบผู้ใช้งาน ${userName} ใช่หรือไม่?`)) {
    const success = deleteUser(user.id)
    if (success) {
      showNotification('ลบผู้ใช้งานเรียบร้อยแล้ว', 'success')
    }
  }
}

const handleSaveUser = (updatedUser) => {
  const index = users.value.findIndex(u => u.id === updatedUser.id)
  editUser(index, updatedUser)
  closeModal()
  showNotification('บันทึกข้อมูลผู้ใช้งานเรียบร้อยแล้ว', 'success')
}

const handleSaveMultipleUsers = (validUsers) => {
  try {
    const existingEmails = users.value.map(u => u.email.toLowerCase())
    const count = addMultipleUsers(validUsers, existingEmails)
    closeModal()
    showNotification(`เพิ่มผู้ใช้งานสำเร็จ ${count} คน`, 'success')
  } catch (error) {
    showNotification(error.message, 'error')
  }
}

const closeModal = () => {
  showAddUserModal.value = false
  showEditUserModal.value = false
  userForm.value = {
    id: null,
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    status: 'active'
  }
  newUsers.value = [
    { email: '', company: '', role: 'safety' }
  ]
}

// Initialize sample data on mount
onMounted(() => {
  initializeSampleData()
})




</script>