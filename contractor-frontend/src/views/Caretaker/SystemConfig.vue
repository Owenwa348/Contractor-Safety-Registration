<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">การตั้งค่าระบบ</h1>
          <p class="text-gray-600">จัดการการตั้งค่าทั่วไป กฎทางธุรกิจ และการกำหนดค่าระบบ</p>
        </div>
        <div class="space-x-3">
          <button @click="saveSettings" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            บันทึกการตั้งค่า
          </button>
          <button @click="resetSettings" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            รีเซ็ต
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="bg-white rounded-lg shadow-sm mb-6">
      <div class="border-b">
        <nav class="flex space-x-8 px-6">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'"
            class="py-4 border-b-2 font-medium text-sm"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">การตั้งค่าทั่วไป</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อระบบ</label>
                <input type="text" v-model="settings.general.systemName" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">เวอร์ชัน</label>
                <input type="text" v-model="settings.general.version" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ภาษาเริ่มต้น</label>
                <select v-model="settings.general.defaultLanguage" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">เขตเวลา</label>
                <select v-model="settings.general.timezone" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="Asia/Bangkok">Asia/Bangkok</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div class="flex items-center space-y-2">
                <input type="checkbox" v-model="settings.general.maintenanceMode" class="h-4 w-4 text-blue-600"/>
                <label class="ml-2 text-sm text-gray-700">โหมดบำรุงรักษา</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" v-model="settings.general.enableRegistration" class="h-4 w-4 text-blue-600"/>
                <label class="ml-2 text-sm text-gray-700">เปิดให้ลงทะเบียนใหม่</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">การตั้งค่าความปลอดภัย</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ความยาวรหัสผ่านต่ำสุด</label>
                <input type="number" v-model="settings.security.minPasswordLength" min="6" max="20" class="w-full px-3 py-2 border rounded-md"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Session หมดอายุ (นาที)</label>
                <input type="number" v-model="settings.security.sessionTimeout" class="w-full px-3 py-2 border rounded-md"/>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center">
                <input type="checkbox" v-model="settings.security.requireStrongPassword" class="h-4 w-4 text-blue-600"/>
                <label class="ml-2 text-sm text-gray-700">ใช้รหัสผ่านที่รัดกุม</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" v-model="settings.security.enableTwoFactor" class="h-4 w-4 text-blue-600"/>
                <label class="ml-2 text-sm text-gray-700">Two-Factor Authentication</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Training Settings -->
        <div v-if="activeTab === 'training'" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">การตั้งค่าการอบรม</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ใบรับรองหมดอายุ (เดือน)</label>
                <input type="number" v-model="settings.training.certificateValidityMonths" class="w-full px-3 py-2 border rounded-md"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">คะแนนผ่าน (%)</label>
                <input type="number" v-model="settings.training.passingScore" min="50" max="100" class="w-full px-3 py-2 border rounded-md"/>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">จำนวนผู้เข้าอบรมสูงสุด</label>
                <input type="number" v-model="settings.training.maxParticipants" class="w-full px-3 py-2 border rounded-md"/>
              </div>
              <div class="flex items-center">
                <input type="checkbox" v-model="settings.training.allowOnlineTraining" class="h-4 w-4 text-blue-600"/>
                <label class="ml-2 text-sm text-gray-700">อนุญาตอบรมออนไลน์</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">การตั้งค่าการแจ้งเตือน</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-4">อีเมล SMTP</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                <input type="text" v-model="settings.notifications.smtpHost" class="w-full px-3 py-2 border rounded-md"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                <input type="number" v-model="settings.notifications.smtpPort" class="w-full px-3 py-2 border rounded-md"/>
              </div>
            </div>
            <div class="mt-4">
              <button @click="testEmailConnection" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                ทดสอบการเชื่อมต่อ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showMessage" :class="messageClass" class="border-l-4 p-4 rounded-r-lg">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('general')
const showMessage = ref(false)
const message = ref('')
const messageClass = ref('')

const tabs = ref([
  { id: 'general', name: 'ทั่วไป' },
  { id: 'security', name: 'ความปลอดภัย' },
  { id: 'training', name: 'การอบรม' },
  { id: 'notifications', name: 'การแจ้งเตือน' }
])

const settings = ref({
  general: {
    systemName: 'ระบบลงทะเบียนผู้รับเหมา',
    version: '1.0.0',
    defaultLanguage: 'th',
    timezone: 'Asia/Bangkok',
    maintenanceMode: false,
    enableRegistration: true
  },
  security: {
    minPasswordLength: 8,
    sessionTimeout: 60,
    requireStrongPassword: true,
    enableTwoFactor: false
  },
  training: {
    certificateValidityMonths: 12,
    passingScore: 80,
    maxParticipants: 30,
    allowOnlineTraining: true
  },
  notifications: {
    smtpHost: '',
    smtpPort: 587
  }
})

const saveSettings = () => {
  // Save settings logic here
  showNotification('บันทึกการตั้งค่าเรียบร้อยแล้ว', 'success')
}

const resetSettings = () => {
  if (confirm('ต้องการรีเซ็ตการตั้งค่าเป็นค่าเริ่มต้นใช่หรือไม่?')) {
    // Reset logic here
    showNotification('รีเซ็ตการตั้งค่าเรียบร้อยแล้ว', 'success')
  }
}

const testEmailConnection = () => {
  // Test email connection logic
  showNotification('ทดสอบการเชื่อมต่ออีเมลสำเร็จ', 'success')
}

const showNotification = (msg, type) => {
  message.value = msg
  messageClass.value = type === 'success' 
    ? 'bg-green-50 border-green-400 text-green-700' 
    : 'bg-red-50 border-red-400 text-red-700'
  showMessage.value = true
  setTimeout(() => showMessage.value = false, 3000)
}
</script>