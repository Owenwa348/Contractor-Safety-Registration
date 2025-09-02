<template>
  <div v-if="show" class="fixed inset-0 z-60 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div class="bg-white rounded-lg max-w-lg w-full p-6 relative z-70">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          แก้ไขข้อมูลผู้ใช้งาน
        </h3>
        
        <form @submit.prevent="saveUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
            <input 
              type="text" 
              v-model="localUserForm.name" 
              required 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
            <input 
              type="email" 
              v-model="localUserForm.email" 
              required 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">บริษัท</label>
            <input 
              type="text" 
              v-model="localUserForm.company" 
              required 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              placeholder="ชื่อบริษัท"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">บทบาท</label>
            <select 
              v-model="localUserForm.role" 
              required 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">เลือกบทบาท</option>
              <option v-for="role in roles" :key="role.value" :value="role.value">{{ role.label }}</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">ยกเลิก</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  userForm: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      status: 'active'
    })
  },
  roles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close', 'save'])

// Local copy to avoid mutating props
const localUserForm = ref({ ...props.userForm })

// Watch for changes in userForm prop to update local copy
watch(() => props.userForm, (newValue) => {
  localUserForm.value = { ...newValue }
}, { deep: true })

// Watch for modal show/hide to reset form
watch(() => props.show, (newValue) => {
  if (newValue) {
    localUserForm.value = { ...props.userForm }
  }
})

const saveUser = () => {
  emit('save', { ...localUserForm.value })
}
</script>