<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <td class="px-4 py-3 text-center text-sm font-medium text-gray-900 w-16">{{ index + 1 }}</td>
    
    <td class="px-4 py-3 text-sm text-gray-900 min-w-[200px]">
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3 flex-shrink-0">
          {{ getUserInitial(user) }}
        </div>
        <div class="min-w-0 flex-1">
          <div class="font-medium truncate">{{ user.name && user.name.trim() ? user.name : '-' }}</div>
          <div class="text-gray-500 truncate">{{ user.email }}</div>
        </div>
      </div>
    </td>
    
    <td class="px-4 py-3 text-center w-32 min-w-[128px]">
      <span :class="getRoleBadgeClass(user.role)" class="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap inline-block">
        {{ getRoleLabel(user.role) }}
      </span>
    </td>
    
    <td class="px-4 py-3 text-center w-24">
      <span class="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded whitespace-nowrap">
        {{ user.lastLogin ? '*******' : '-' }}
      </span>
    </td>
    
    <td class="px-4 py-3 text-center w-24">
      <span v-if="user.lastLogin" :class="getStatusBadgeClass(user.status)" class="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap">
        {{ getStatusLabel(user.status) }}
      </span>
      <span v-else class="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded whitespace-nowrap">
        -
      </span>
    </td>
    
    <td class="px-4 py-3 text-sm text-gray-900 text-center w-32">
      <span class="whitespace-nowrap">
        {{ user.lastLogin ? formatDate(user.lastLogin) : '-' }}
      </span>
    </td>
    
    <td class="px-4 py-3 text-center w-32">
      <div class="flex justify-center space-x-1">
        <button @click="$emit('editUser', user)" class="text-blue-600 hover:text-blue-900 p-1" title="แก้ไข">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
        <button @click="$emit('toggleStatus', user)" :class="user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'" class="p-1" :title="user.status === 'active' ? 'ระงับการใช้งาน' : 'เปิดใช้งาน'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="user.status === 'active'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>
        <button @click="$emit('resetPassword', user)" class="text-yellow-600 hover:text-yellow-900 p-1" title="รีเซ็ตรหัสผ่าน">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
        </button>
        <button @click="$emit('deleteUser', user)" class="text-red-600 hover:text-red-900 p-1" title="ลบผู้ใช้งาน">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  roles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['editUser', 'toggleStatus', 'resetPassword', 'deleteUser'])

// Helper Functions
const getUserInitial = (user) => {
  return (user.name && user.name.trim() ? user.name : user.email).charAt(0).toUpperCase()
}

const getRoleLabel = (role) => {
  const roleObj = props.roles.find(r => r.value === role)
  return roleObj ? roleObj.label : role
}

const getRoleBadgeClass = (role) => {
  const classes = {
    safety: 'bg-green-100 text-green-800',
    manager: 'bg-yellow-100 text-yellow-800',
    contractor: 'bg-indigo-100 text-indigo-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status) => {
  const labels = {
    active: 'ใช้งาน',
    inactive: 'ไม่ใช้งาน',
    suspended: 'ระงับการใช้งาน'
  }
  return labels[status] || status
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('th-TH')
}
</script>