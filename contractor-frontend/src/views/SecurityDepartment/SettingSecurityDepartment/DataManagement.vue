<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium text-gray-900">การจัดการข้อมูลระบบ</h2>
      <div class="bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-1 rounded-md text-sm">
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        ระวัง: การดำเนินการเหล่านี้ไม่สามารถยกเลิกได้
      </div>
    </div>

    <!-- Data Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Employee Records -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
        <div class="flex items-center mb-4">
          <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">รายชื่อพนักงาน</h3>
            <p class="text-sm text-gray-600">ข้อมูลการลงทะเบียนทั้งหมด</p>
          </div>
        </div>
        <div class="mb-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">ใช้งาน:</span>
            <span class="font-medium text-blue-600">{{ dataStats.activeEmployees }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">ลบแล้ว:</span>
            <span class="font-medium text-red-600">{{ dataStats.deletedEmployees }}</span>
          </div>
        </div>
        <button 
          @click="showClearConfirmation('employees')"
          class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          ล้างข้อมูลพนักงานทั้งหมด
        </button>
      </div>

      <!-- User Accounts -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
        <div class="flex items-center mb-4">
          <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">บัญชีผู้ใช้</h3>
            <p class="text-sm text-gray-600">หัวหน้างานและผู้ดูแลระบบ</p>
          </div>
        </div>
        <div class="mb-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">ระดับ 1:</span>
            <span class="font-medium text-green-600">{{ dataStats.level1Supervisors }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">ระดับ 2:</span>
            <span class="font-medium text-green-600">{{ dataStats.level2Supervisors }}</span>
          </div>
        </div>
        <button 
          @click="showClearConfirmation('users')"
          class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          ล้างบัญชีผู้ใช้ทั้งหมด
        </button>
      </div>

      <!-- Activity Records -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-400">
        <div class="flex items-center mb-4">
          <svg class="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">กิจกรรมอบรม</h3>
            <p class="text-sm text-gray-600">ประวัติการเข้าร่วมอบรม</p>
          </div>
        </div>
        <div class="mb-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">จัดแล้ว:</span>
            <span class="font-medium text-purple-600">{{ dataStats.completedActivities }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">กำลังจัด:</span>
            <span class="font-medium text-purple-600">{{ dataStats.ongoingActivities }}</span>
          </div>
        </div>
        <button 
          @click="showClearConfirmation('activities')"
          class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          ล้างข้อมูลกิจกรรมทั้งหมด
        </button>
      </div>
    </div>

    <!-- System Reset -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        รีเซ็ตระบบทั้งหมด
      </h3>
      
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p class="text-sm text-red-700 mb-2">
          การดำเนินการนี้จะลบข้อมูลทั้งหมดในระบบ รวมถึง:
        </p>
        <ul class="text-sm text-red-700 space-y-1 mb-4">
          <li>• ข้อมูลพนักงานและการลงทะเบียนทั้งหมด</li>
          <li>• บัญชีผู้ใช้งาน (ยกเว้นบัญชีปัจจุบัน)</li>
          <li>• ประวัติกิจกรรมอบรมทั้งหมด</li>
          <li>• ข้อมูลห้องประชุมและการจอง</li>
        </ul>
        <button 
          @click="showSystemResetConfirmation"
          class="w-full px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors text-sm font-medium"
        >
          รีเซ็ตระบบทั้งหมด
        </button>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmationModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-lg w-full mx-4 shadow-xl">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
          </div>
          
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-2">{{ confirmationData.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ confirmationData.message }}</p>
            
            <div v-if="confirmationData.type === 'system_reset'" class="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p class="text-sm text-red-800 font-medium mb-2">ยืนยันการรีเซ็ตระบบ:</p>
              <p class="text-xs text-red-700 mb-2">พิมพ์ "RESET SYSTEM" เพื่อยืนยัน:</p>
              <input 
                type="text" 
                v-model="resetConfirmationText"
                placeholder="RESET SYSTEM"
                class="w-full px-3 py-2 border border-red-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          <div class="flex justify-center space-x-3">
            <button @click="closeConfirmationModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
              ยกเลิก
            </button>
            <button 
              @click="confirmDataClear"
              :disabled="confirmationData.type === 'system_reset' && resetConfirmationText !== 'RESET SYSTEM'"
              class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ confirmationData.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="showMessage" :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 z-50 flex items-center max-w-md',
        messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]">
      <svg v-if="messageType === 'success'" class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <svg v-else class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <span class="text-sm">{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['data-cleared'])

const dataStats = ref({
  activeEmployees: 142,
  deletedEmployees: 23,
  level1Supervisors: 12,
  level2Supervisors: 8,
  completedActivities: 45,
  ongoingActivities: 3
})

const showConfirmationModal = ref(false)
const confirmationData = ref({})
const resetConfirmationText = ref('')
const showMessage = ref(false)
const message = ref('')
const messageType = ref('success')

const showClearConfirmation = (dataType) => {
  const confirmations = {
    employees: {
      title: 'ยืนยันการล้างข้อมูลพนักงาน',
      message: 'คุณต้องการลบข้อมูลพนักงานทั้งหมดหรือไม่? รวมถึงรายการที่ลบแล้วด้วย',
      confirmText: 'ล้างข้อมูลพนักงาน',
      type: 'employees'
    },
    users: {
      title: 'ยืนยันการล้างบัญชีผู้ใช้',
      message: 'คุณต้องการลบบัญชีผู้ใช้ทั้งหมดหรือไม่? (ยกเว้นบัญชีปัจจุบันของคุณ)',
      confirmText: 'ล้างบัญชีผู้ใช้',
      type: 'users'
    },
    activities: {
      title: 'ยืนยันการล้างข้อมูลกิจกรรม',
      message: 'คุณต้องการลบข้อมูลกิจกรรมอบรมทั้งหมดหรือไม่?',
      confirmText: 'ล้างข้อมูลกิจกรรม',
      type: 'activities'
    }
  }
  
  confirmationData.value = confirmations[dataType]
  showConfirmationModal.value = true
}

const showSystemResetConfirmation = () => {
  confirmationData.value = {
    title: 'ยืนยันการรีเซ็ตระบบทั้งหมด',
    message: 'การดำเนินการนี้จะลบข้อมูลทั้งหมดในระบบและไม่สามารถกู้คืนได้',
    confirmText: 'รีเซ็ตระบบ',
    type: 'system_reset'
  }
  resetConfirmationText.value = ''
  showConfirmationModal.value = true
}

const closeConfirmationModal = () => {
  showConfirmationModal.value = false
  confirmationData.value = {}
  resetConfirmationText.value = ''
}

const confirmDataClear = async () => {
  try {
    const type = confirmationData.value.type
    
    // Simulate clearing data based on type
    switch (type) {
      case 'employees':
        dataStats.value.activeEmployees = 0
        dataStats.value.deletedEmployees = 0
        break
      case 'users':
        dataStats.value.level1Supervisors = 0
        dataStats.value.level2Supervisors = 1 // Keep current user
        break
      case 'activities':
        dataStats.value.completedActivities = 0
        dataStats.value.ongoingActivities = 0
        break
      case 'system_reset':
        dataStats.value = {
          activeEmployees: 0,
          deletedEmployees: 0,
          level1Supervisors: 0,
          level2Supervisors: 1,
          completedActivities: 0,
          ongoingActivities: 0
        }
        break
    }
    
    closeConfirmationModal()
    showNotification('ดำเนินการล้างข้อมูลเรียบร้อยแล้ว', 'success')
    emit('data-cleared', { type, timestamp: new Date().toISOString() })
    
  } catch (error) {
    console.error('Data clearing error:', error)
    showNotification('เกิดข้อผิดพลาดในการล้างข้อมูล', 'error')
  }
}

const showNotification = (msg, type = 'success') => {
  message.value = msg
  messageType.value = type
  showMessage.value = true
  setTimeout(() => { showMessage.value = false }, 3000)
}
</script>