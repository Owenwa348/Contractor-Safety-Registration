<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-semibold text-gray-900 mb-6">การตั้งค่า</h1>

        <!-- Settings Sections -->
        <div class="space-y-8">
          <!-- Profile Settings -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">ข้อมูลส่วนตัว</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
                <input type="text" v-model="settings.username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">อีเมล</label>
                <input type="email" v-model="settings.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Notification Settings -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">การแจ้งเตือน</h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <input type="checkbox" v-model="settings.emailNotifications" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <label class="ml-2 text-sm text-gray-700">รับการแจ้งเตือนทางอีเมล</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" v-model="settings.smsNotifications" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <label class="ml-2 text-sm text-gray-700">รับการแจ้งเตือนทาง SMS</label>
              </div>
            </div>
          </div>

          <!-- System Settings -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4">ตั้งค่าระบบ</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">ภาษา</label>
                <select v-model="settings.language" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">โซนเวลา</label>
                <select v-model="settings.timezone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="Asia/Bangkok">กรุงเทพฯ (GMT+7)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-8 flex justify-end">
          <button 
            @click="saveSettings" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  username: '',
  email: '',
  emailNotifications: true,
  smsNotifications: false,
  language: 'th',
  timezone: 'Asia/Bangkok'
})

const saveSettings = async () => {
  try {

    console.log('Saving settings:', settings.value)
 
    alert('บันทึกการตั้งค่าเรียบร้อย')
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('เกิดข้อผิดพลาดในการบันทึกการตั้งค่า')
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>