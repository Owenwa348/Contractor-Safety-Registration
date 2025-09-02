<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">จัดการฐานข้อมูล</h1>
          <p class="text-gray-600">สำรองข้อมูล ตรวจสอบสถานะ และจัดการข้อมูลระบบ</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-600">{{ dbStats.totalRecords }}</div>
          <div class="text-sm text-gray-500">รายการทั้งหมด</div>
        </div>
      </div>
    </div>

    <!-- Database Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-full">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">ผู้ใช้งาน</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dbStats.users }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-full">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">เอกสาร</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dbStats.documents }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-full">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">การอบรม</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dbStats.trainings }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-full">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">ขนาดฐานข้อมูล</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dbStats.sizeGB }} GB</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Backup & Restore Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">การสำรองข้อมูลและกู้คืน</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Backup Section -->
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">สำรองข้อมูล</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ประเภทการสำรองข้อมูล</label>
              <select v-model="backupType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                <option value="full">สำรองข้อมูลทั้งหมด</option>
                <option value="incremental">สำรองข้อมูลที่เปลี่ยนแปลง</option>
                <option value="users">เฉพาะข้อมูลผู้ใช้งาน</option>
                <option value="documents">เฉพาะเอกสาร</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">คำอธิบาย</label>
              <input type="text" v-model="backupDescription" placeholder="เช่น สำรองข้อมูลประจำสัปดาห์" class="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            
            <button @click="startBackup" :disabled="isBackupInProgress" class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              <svg v-if="isBackupInProgress" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isBackupInProgress ? 'กำลังสำรองข้อมูล...' : 'เริ่มสำรองข้อมูล' }}
            </button>
          </div>
        </div>

        <!-- Restore Section -->
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">กู้คืนข้อมูล</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">เลือกไฟล์สำรองข้อมูล</label>
              <select v-model="selectedBackup" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                <option value="">เลือกไฟล์สำรองข้อมูล</option>
                <option v-for="backup in backupHistory" :key="backup.id" :value="backup.id">
                  {{ backup.filename }} ({{ formatDate(backup.createdAt) }})
                </option>
              </select>
            </div>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <div class="flex">
                <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">การกู้คืนข้อมูลจะเขียนทับข้อมูลปัจจุบัน</p>
                </div>
              </div>
            </div>
            
            <button @click="startRestore" :disabled="!selectedBackup || isRestoreInProgress" class="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
              <svg v-if="isRestoreInProgress" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isRestoreInProgress ? 'กำลังกู้คืนข้อมูล...' : 'เริ่มกู้คืนข้อมูล' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Backup History -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900">ประวัติการสำรองข้อมูล</h2>
        <button @click="refreshBackupHistory" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          รีเฟรช
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อไฟล์</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเภท</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ขนาด</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สร้าง</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="backup in backupHistory" :key="backup.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ backup.filename }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ getBackupTypeLabel(backup.type) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ backup.size }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(backup.createdAt) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(backup.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ backup.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex space-x-2">
                  <button @click="downloadBackup(backup)" class="text-blue-600 hover:text-blue-900" title="ดาวน์โหลด">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </button>
                  <button @click="deleteBackup(backup)" class="text-red-600 hover:text-red-900" title="ลบ">
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
    </div>

    <!-- Database Maintenance -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">การบำรุงรักษาฐานข้อมูล</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button @click="optimizeDatabase" class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <svg class="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span class="text-sm font-medium text-gray-900">เพิ่มประสิทธิภาพ</span>
        </button>
        
        <button @click="cleanupDatabase" class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <svg class="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          <span class="text-sm font-medium text-gray-900">ทำความสะอาด</span>
        </button>
        
        <button @click="analyzeDatabase" class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <svg class="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span class="text-sm font-medium text-gray-900">วิเคราะห์</span>
        </button>
      </div>
    </div>

    <!-- Progress Modal -->
    <div v-if="showProgressModal" class="fixed inset-0 z-60 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div class="bg-white rounded-lg max-w-md w-full p-6 relative z-70">
          <div class="text-center">
            <svg class="animate-spin mx-auto h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">{{ progressTitle }}</h3>
            <p class="text-gray-500">{{ progressMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const dbStats = ref({
  totalRecords: 15420,
  users: 1250,
  documents: 8500,
  trainings: 156,
  sizeGB: 2.4
})

const backupType = ref('full')
const backupDescription = ref('')
const selectedBackup = ref('')
const isBackupInProgress = ref(false)
const isRestoreInProgress = ref(false)
const showProgressModal = ref(false)
const progressTitle = ref('')
const progressMessage = ref('')

const backupHistory = ref([
  { id: 1, filename: 'backup_2024_01_15_full.sql', type: 'full', size: '2.1 GB', createdAt: new Date('2024-01-15'), status: 'สำเร็จ' },
  { id: 2, filename: 'backup_2024_01_14_incremental.sql', type: 'incremental', size: '120 MB', createdAt: new Date('2024-01-14'), status: 'สำเร็จ' },
  { id: 3, filename: 'backup_2024_01_13_users.sql', type: 'users', size: '45 MB', createdAt: new Date('2024-01-13'), status: 'สำเร็จ' }
])

// Methods
const startBackup = async () => {
  isBackupInProgress.value = true
  showProgressModal.value = true
  progressTitle.value = 'กำลังสำรองข้อมูล'
  progressMessage.value = 'กรุณารอสักครู่...'
  
  // Simulate backup process
  setTimeout(() => {
    isBackupInProgress.value = false
    showProgressModal.value = false
    
    // Add new backup to history
    const newBackup = {
      id: Date.now(),
      filename: `backup_${new Date().toISOString().split('T')[0]}_${backupType.value}.sql`,
      type: backupType.value,
      size: '2.3 GB',
      createdAt: new Date(),
      status: 'สำเร็จ'
    }
    backupHistory.value.unshift(newBackup)
    
    alert('สำรองข้อมูลเรียบร้อยแล้ว')
  }, 3000)
}

const startRestore = async () => {
  if (!confirm('ต้องการกู้คืนข้อมูลใช่หรือไม่? ข้อมูลปัจจุบันจะถูกเขียนทับ')) return
  
  isRestoreInProgress.value = true
  showProgressModal.value = true
  progressTitle.value = 'กำลังกู้คืนข้อมูล'
  progressMessage.value = 'กำลังประมวลผล...'
  
  setTimeout(() => {
    isRestoreInProgress.value = false
    showProgressModal.value = false
    alert('กู้คืนข้อมูลเรียบร้อยแล้ว')
  }, 5000)
}

const refreshBackupHistory = () => {
  // Refresh backup history logic
  alert('รีเฟรชประวัติการสำรองข้อมูลแล้ว')
}

const downloadBackup = (backup) => {
  // Download backup file logic
  alert(`ดาวน์โหลด ${backup.filename}`)
}

const deleteBackup = (backup) => {
  if (confirm(`ต้องการลบไฟล์ ${backup.filename} ใช่หรือไม่?`)) {
    const index = backupHistory.value.findIndex(b => b.id === backup.id)
    if (index > -1) {
      backupHistory.value.splice(index, 1)
    }
  }
}

const optimizeDatabase = () => {
  if (confirm('ต้องการเพิ่มประสิทธิภาพฐานข้อมูลใช่หรือไม่?')) {
    alert('เพิ่มประสิทธิภาพฐานข้อมูลเรียบร้อยแล้ว')
  }
}

const cleanupDatabase = () => {
  if (confirm('ต้องการทำความสะอาดฐานข้อมูลใช่หรือไม่?')) {
    alert('ทำความสะอาดฐานข้อมูลเรียบร้อยแล้ว')
  }
}

const analyzeDatabase = () => {
  alert('วิเคราะห์ฐานข้อมูลเรียบร้อยแล้ว')
}

const getBackupTypeLabel = (type) => {
  const labels = {
    full: 'สำรองทั้งหมด',
    incremental: 'สำรองที่เปลี่ยนแปลง',
    users: 'ข้อมูลผู้ใช้งาน',
    documents: 'เอกสาร'
  }
  return labels[type] || type
}

const getStatusBadgeClass = (status) => {
  return status === 'สำเร็จ' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('th-TH')
}

onMounted(() => {
  // Initialize component
})
</script>