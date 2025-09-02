<template>
  <div v-if="show" class="fixed inset-0 z-60 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div class="bg-white rounded-lg max-w-4xl w-full p-6 relative z-70">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-medium text-gray-900">
            เพิ่มผู้ใช้งาน 
          </h3>
          <button @click="addNewRow" class="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            เพิ่มแถว
          </button>
        </div>
        
        <form @submit.prevent="saveUsers" class="space-y-4">
          <div class="max-h-96 overflow-y-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ลำดับ</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">อีเมล</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">บริษัท</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">บทบาท</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(user, index) in localNewUsers" :key="index" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-center text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                  <td class="px-4 py-3">
                    <input 
                      type="email" 
                      v-model="user.email" 
                      required 
                      placeholder="example@company.com"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </td>
                  <td class="px-4 py-3">
                    <input 
                      type="text" 
                      v-model="user.company" 
                      required 
                      placeholder="ชื่อบริษัท"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Admin(safety)
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <button 
                      type="button" 
                      @click="removeRow(index)" 
                      class="text-red-600 hover:text-red-900"
                      :disabled="localNewUsers.length === 1"
                      title="ลบแถว"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="flex justify-between items-center pt-4 border-t">
            <div class="text-sm text-gray-600">
              ทั้งหมด {{ localNewUsers.length }} คน
            </div>
            <div class="flex space-x-3">
              <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">ยกเลิก</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">บันทึกทั้งหมด</button>
            </div>
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
  newUsers: {
    type: Array,
    default: () => [{ email: '', company: '', role: 'safety' }]
  }
})

const emit = defineEmits(['close', 'save'])

// Local copy to avoid mutating props
const localNewUsers = ref([...props.newUsers])

// Watch for changes in prop to reset local state
watch(() => props.show, (newValue) => {
  if (newValue) {
    localNewUsers.value = [...props.newUsers]
  }
})

const addNewRow = () => {
  localNewUsers.value.push({ email: '', company: '', role: 'safety' })
}

const removeRow = (index) => {
  if (localNewUsers.value.length > 1) {
    localNewUsers.value.splice(index, 1)
  }
}

const saveUsers = () => {
  // Validate all emails and companies are filled
  const validUsers = localNewUsers.value.filter(user => user.email.trim() !== '' && user.company.trim() !== '')
  
  if (validUsers.length === 0) {
    alert('กรุณากรอกอีเมลและบริษัทอย่างน้อย 1 คน')
    return
  }
  
  // Check for duplicate emails
  const emails = validUsers.map(user => user.email.toLowerCase())
  const uniqueEmails = [...new Set(emails)]
  if (emails.length !== uniqueEmails.length) {
    alert('พบอีเมลซ้ำกัน กรุณาตรวจสอบอีกครั้ง')
    return
  }
  
  emit('save', validUsers)
}
</script>