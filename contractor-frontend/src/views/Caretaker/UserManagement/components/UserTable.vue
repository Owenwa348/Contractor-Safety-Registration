<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
      <h3 class="text-lg font-semibold text-white">รายชื่อผู้ใช้งานจัดกลุ่มตามบริษัท</h3>
      <div class="text-sm text-blue-100">{{ users.length }} รายการ</div>
    </div>

    <!-- Company Groups -->
    <div v-for="(companyUsers, company) in groupedUsers" :key="company" class="border-b border-gray-200 last:border-b-0">
      <!-- Company Header -->
      <div class="bg-gray-100 px-6 py-3 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h4 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0a2 2 0 01-2 2H7a2 2 0 01-2-2m2 0h4m6 0a2 2 0 002-2v-4m-6 0h6m-6-4h6m2-4h2m-2-4H9m6 0a2 2 0 002 2v4m-6 0h-2m0 0h-2m2 0h2m-6 0H7"/>
            </svg>
            {{ company || 'ไม่ระบุบริษัท' }}
          </h4>
          <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {{ companyUsers.length }} คน
          </span>
        </div>
      </div>

      <!-- Users Table for this company -->
      <div class="overflow-x-auto">
        <table class="min-w-full table-fixed">
          <colgroup>
            <col class="w-16" />
            <col class="min-w-[200px]" />
            <col class="w-32" />
            <col class="w-24" />
            <col class="w-24" />
            <col class="w-32" />
            <col class="w-32" />
          </colgroup>
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ลำดับ</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">ผู้ใช้งาน</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32 min-w-[128px]">บทบาท</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">รหัสผ่าน</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">สถานะ</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">เข้าสู่ระบบล่าสุด</th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">จัดการ</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <UserRow
              v-for="(user, index) in companyUsers"
              :key="user.id"
              :user="user"
              :index="index"
              :roles="roles"
              @edit-user="$emit('editUser', $event)"
              @toggle-status="$emit('toggleUserStatus', $event)"
              @reset-password="$emit('resetPassword', $event)"
              @delete-user="$emit('deleteUser', $event)"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import UserRow from './UserRow.vue'

const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  roles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['editUser', 'toggleUserStatus', 'resetPassword', 'deleteUser'])

const groupedUsers = computed(() => {
  const groups = {}
  props.users.forEach(user => {
    const company = user.company || 'ไม่ระบุบริษัท'
    if (!groups[company]) {
      groups[company] = []
    }
    groups[company].push(user)
  })
  
  // Sort companies alphabetically, but put "ไม่ระบุบริษัท" at the end
  const sortedGroups = {}
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a === 'ไม่ระบุบริษัท') return 1
    if (b === 'ไม่ระบุบริษัท') return -1
    return a.localeCompare(b, 'th')
  })
  
  sortedKeys.forEach(key => {
    sortedGroups[key] = groups[key]
  })
  
  return sortedGroups
})
</script>