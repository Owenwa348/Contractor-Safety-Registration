<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium text-gray-900">จัดการผู้ใช้งาน (หัวหน้างาน)</h2>
      <button 
        @click="showAddUserForm = !showAddUserForm"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        เพิ่มผู้ใช้
      </button>
    </div>

    <!-- Add User Form -->
    <div v-if="showAddUserForm" class="bg-gray-50 p-6 rounded-lg">
      <h3 class="font-medium text-gray-900 mb-4">เพิ่มผู้ใช้ใหม่</h3>
      <div class="max-w-md">
        <div>
          <label class="block text-sm font-medium text-gray-700">อีเมล</label>
          <input 
            type="email" 
            v-model="newUser.email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="example@company.com"
          >
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button 
          @click="showAddUserForm = false"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ยกเลิก
        </button>
        <button 
          @click="addUser"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          เพิ่มผู้ใช้
        </button>
      </div>
    </div>

    <!-- User Management Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">รายชื่อหัวหน้างานในระบบ</h3>
        <p class="text-sm text-gray-600 mt-1">จำนวนทั้งหมด: {{ users.length }} คน</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">อีเมล</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ-นามสกุล</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะการล็อกอิน</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัสผ่าน</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ล็อกอินล่าสุด</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span class="text-white text-sm font-medium">{{ user.email.charAt(0).toUpperCase() }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div v-if="editingUserId === user.id" class="text-sm">
                      <input 
                        v-model="editingUser.email"
                        type="email"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        @keyup.enter="saveUser(user.id)"
                      />
                    </div>
                    <div v-else class="text-sm font-medium text-gray-900">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ user.hasLoggedIn ? user.fullName : '-' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ user.hasLoggedIn ? user.status : '-' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getLoginStatusClass(user.hasLoggedIn)">
                  {{ user.hasLoggedIn ? 'ล็อกอิน' : 'ยังไม่ล็อก' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500">{{ user.hasPassword ? '••••••••' : 'ยังไม่ตั้ง' }}</span>
                  <button 
                    v-if="!user.hasPassword"
                    @click="sendPasswordResetLink(user)"
                    class="text-blue-600 hover:text-blue-800 text-xs underline">
                    ส่งลิงค์ตั้งรหัส
                  </button>
                  <button 
                    v-else
                    @click="resetPassword(user)"
                    class="text-orange-600 hover:text-orange-800 text-xs underline">
                    รีเซ็ต
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.lastLogin ? formatDate(user.lastLogin) : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex gap-2">
                  <button 
                    v-if="editingUserId === user.id"
                    @click="saveUser(user.id)"
                    class="text-green-600 hover:text-green-900">
                    ตกลง
                  </button>
                  <button 
                    v-if="editingUserId === user.id"
                    @click="cancelEdit"
                    class="text-gray-600 hover:text-gray-900">
                    ยกเลิก
                  </button>
                  <button 
                    v-if="editingUserId !== user.id"
                    @click="startEdit(user)"
                    class="text-blue-600 hover:text-blue-900">
                    แก้ไข
                  </button>
                  <button 
                    v-if="editingUserId !== user.id"
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900">
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['user-added', 'user-updated', 'user-deleted'])

// User data with email-based identification
const users = ref([
  {
    id: 1,
    email: 'supervisor1@company.com',
    fullName: 'สมชาย ใจดี',
    status: 'หัวหน้างาน',
    hasLoggedIn: true,
    hasPassword: true,
    lastLogin: '2024-08-29',
    createdAt: '2024-08-15'
  },
  {
    id: 2,
    email: 'supervisor2@company.com',
    fullName: 'สมหญิง รักดี',
    status: 'หัวหน้างาน',
    hasLoggedIn: true,
    hasPassword: true,
    lastLogin: '2024-08-28',
    createdAt: '2024-08-10'
  },
  {
    id: 3,
    email: 'supervisor3@company.com',
    fullName: 'วิชัย มานะ',
    status: 'หัวหน้างาน',
    hasLoggedIn: false,
    hasPassword: false,
    lastLogin: null,
    createdAt: '2024-08-25'
  },
  {
    id: 4,
    email: 'safety.manager@company.com',
    fullName: 'สุรีย์ ปลอดภัย',
    status: 'หัวหน้างาน',
    hasLoggedIn: true,
    hasPassword: true,
    lastLogin: '2024-08-30',
    createdAt: '2024-08-01'
  },
  {
    id: 5,
    email: 'team.lead@company.com',
    fullName: 'วิศิษฐ์ สร้างสรรค์',
    status: 'หัวหน้างาน',
    hasLoggedIn: false,
    hasPassword: false,
    lastLogin: null,
    createdAt: '2024-08-20'
  }
])

// Form states
const newUser = ref({
  email: ''
})

const showAddUserForm = ref(false)
const editingUserId = ref(null)
const editingUser = ref({})

// Methods
const getLoginStatusClass = (hasLoggedIn) => {
  return hasLoggedIn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const addUser = () => {
  if (!newUser.value.email) {
    alert('กรุณากรอกอีเมล')
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newUser.value.email)) {
    alert('รูปแบบอีเมลไม่ถูกต้อง')
    return
  }

  // Check if email already exists
  const existingUser = users.value.find(user => user.email.toLowerCase() === newUser.value.email.toLowerCase())
  if (existingUser) {
    alert('อีเมลนี้มีอยู่ในระบบแล้ว')
    return
  }

  const user = {
    id: Math.max(...users.value.map(u => u.id)) + 1,
    email: newUser.value.email,
    fullName: '',
    status: 'หัวหน้างาน',
    hasLoggedIn: false,
    hasPassword: false,
    lastLogin: null,
    createdAt: new Date().toISOString().split('T')[0]
  }

  users.value.push(user)
  emit('user-added', user)

  // Reset form
  newUser.value = {
    email: ''
  }

  showAddUserForm.value = false
  
  // Send password setup link after user creation
  sendPasswordResetLink(user)
  
  alert('เพิ่มผู้ใช้เรียบร้อยแล้ว ลิงค์ตั้งรหัสผ่านได้ถูกคัดลอกแล้ว กรุณาส่งให้ผู้ใช้')
}

const startEdit = (user) => {
  editingUserId.value = user.id
  editingUser.value = { ...user }
}

const cancelEdit = () => {
  editingUserId.value = null
  editingUser.value = {}
}

const saveUser = (userId) => {
  const userIndex = users.value.findIndex(user => user.id === userId)
  if (userIndex > -1) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editingUser.value.email)) {
      alert('รูปแบบอีเมลไม่ถูกต้อง')
      return
    }

    // Check if email already exists (excluding current user)
    const existingUser = users.value.find(user => 
      user.email.toLowerCase() === editingUser.value.email.toLowerCase() && user.id !== userId
    )
    if (existingUser) {
      alert('อีเมลนี้มีผู้ใช้คนอื่นแล้ว')
      return
    }

    // Only update email, keep other fields unchanged
    users.value[userIndex].email = editingUser.value.email
    emit('user-updated', users.value[userIndex])
    
    editingUserId.value = null
    editingUser.value = {}
  }
}

const deleteUser = (userId) => {
  if (confirm('คุณต้องการลบผู้ใช้นี้หรือไม่?')) {
    const userIndex = users.value.findIndex(user => user.id === userId)
    if (userIndex > -1) {
      const deletedUser = users.value.splice(userIndex, 1)[0]
      emit('user-deleted', deletedUser)
      alert('ลบผู้ใช้เรียบร้อยแล้ว')
    }
  }
}

const sendPasswordResetLink = (user) => {
  // Simulate sending password reset link
  const resetUrl = `${window.location.origin}/setpasswordownerandsafety?email=${encodeURIComponent(user.email)}`
  
  // Copy to clipboard or show modal with link
  navigator.clipboard.writeText(resetUrl).then(() => {
    alert(`ลิงค์ตั้งรหัสผ่านได้ถูกคัดลอกแล้ว:\n${resetUrl}\n\nส่งลิงค์นี้ให้ ${user.email} เพื่อตั้งรหัสผ่าน`)
  }).catch(() => {
    alert(`ลิงค์ตั้งรหัสผ่าน:\n${resetUrl}\n\nกรุณาคัดลอกลิงค์นี้และส่งให้ ${user.email}`)
  })
}

const resetPassword = (user) => {
  if (confirm(`คุณต้องการรีเซ็ตรหัสผ่านของ ${user.email} หรือไม่?`)) {
    // Update user password status
    user.hasPassword = false
    user.hasLoggedIn = false
    user.lastLogin = null
    
    // Send reset link
    sendPasswordResetLink(user)
  }
}
</script>