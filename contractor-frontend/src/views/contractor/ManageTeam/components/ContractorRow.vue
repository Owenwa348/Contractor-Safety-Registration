<template>
  <tr :class="index % 2 === 0 ? 'bg-gray-25' : 'bg-white'" 
      class="contractor-row hover:bg-gray-100 transition-colors border-b border-gray-100">
    
    <!-- Checkbox -->
    <td class="px-3 py-4 text-center">
      <input 
        type="checkbox" 
        v-model="contractor.selected" 
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
      />
    </td>
    
    <!-- Basic Info -->
    <td class="px-3 py-4 text-sm text-gray-900 font-medium">{{ contractor.id }}</td>
    
    <td class="px-3 py-4 text-sm">
      <input 
        v-if="contractor.isEditing"
        v-model="contractor.firstName"
        type="text"
        class="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="ชื่อ"
      />
      <span v-else class="font-medium text-gray-900">{{ contractor.firstName }}</span>
    </td>
    
    <td class="px-3 py-4 text-sm">
      <input 
        v-if="contractor.isEditing"
        v-model="contractor.lastName"
        type="text"
        class="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="นามสกุล"
      />
      <span v-else class="font-medium text-gray-900">{{ contractor.lastName }}</span>
    </td>
    
    <td class="px-3 py-4 text-sm">
      <input 
        v-if="contractor.isEditing"
        v-model="contractor.idCard"
        type="text"
        class="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
        placeholder="รหัสบัตรประชาชน"
        maxlength="17"
      />
      <span v-else class="text-gray-700 font-mono">{{ contractor.idCard }}</span>
    </td>
    
    <td class="px-3 py-4 text-sm">
      <input 
        v-if="contractor.isEditing"
        type="tel"
        v-model="contractor.phone"
        @input="formatPhone"
        placeholder="กรอกเบอร์โทร"
        maxlength="12"
        class="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <span v-else class="text-gray-700">{{ contractor.phone }}</span>
    </td>
    
    <!-- Status -->
    <td class="px-2 py-2 text-center">
      <div class="flex flex-col items-center space-y-1">
        <span :class="getStatusClass(contractor.status)" 
              class="status-badge inline-flex px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
          {{ contractor.status }}
        </span>
        
        <!-- Additional info for rejected status -->
        <div v-if="contractor.status === 'ไม่อนุมัติ' && contractor.rejectionReason" 
             class="status-detail-card mt-1 p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 max-w-xs">
          <div class="font-semibold mb-1 flex items-center">
            <i class="fas fa-exclamation-triangle mr-1 text-red-500"></i>
            เหตุผล: {{ contractor.rejectionReason }}
          </div>
          <div v-if="contractor.rejectionDetail" class="text-red-600 text-left">
            {{ contractor.rejectionDetail }}
          </div>
        </div>
        
        <!-- Additional info for failed status -->
        <div v-if="contractor.status === 'ไม่ผ่าน' && contractor.failureReason" 
             class="status-detail-card mt-1 p-2 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-700 max-w-xs">
          <div class="font-semibold mb-1 flex items-center">
            <i class="fas fa-times-circle mr-1 text-orange-500"></i>
            {{ contractor.failureReason }}
          </div>
        </div>
      </div>
    </td>
    
    <!-- Image Upload Components -->
    <td v-for="imageType in ['employee', 'idcard', 'social']" :key="imageType" class="px-2 py-2 text-center">
      <ImageUpload
        :contractor="contractor"
        :image-type="imageType"
        :is-editing="contractor.isEditing"
        @upload="handleImageUpload"
      />
    </td>
    
    <!-- Certificate -->
    <td class="px-2 py-2 text-center">
      <router-link to="/certifica-add" class="text-indigo-600 hover:text-indigo-800 text-xs flex items-center">
        <button @click="$emit('add-certificate', contractor)" 
                class="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded text-xs border border-indigo-300 transition-colors flex items-center mx-auto">
          <i class="fas fa-certificate mr-1"></i>เพิ่มข้อมูล
        </button>
      </router-link>
    </td>
    
    <!-- Actions -->
    <td class="px-2 py-2 text-center">
      <div class="flex justify-center space-x-1">
        <button v-if="contractor.isEditing" 
                @click="$emit('save', contractor)" 
                class="action-button bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded text-xs border border-green-300 transition-colors">
          <i class="fas fa-save mr-1"></i>บันทึก
        </button>
        <button v-if="contractor.isEditing" 
                @click="$emit('cancel', contractor)" 
                class="action-button bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs border border-gray-300 transition-colors">
          <i class="fas fa-times mr-1"></i>ยกเลิก
        </button>
        <button v-if="!contractor.isEditing" 
                @click="$emit('edit', contractor)" 
                class="action-button bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs border border-blue-300 transition-colors">
          <i class="fas fa-edit mr-1"></i>แก้ไข
        </button>
        <button v-if="!contractor.isEditing" 
                @click="$emit('delete', contractor)" 
                class="action-button bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded text-xs border border-red-300 transition-colors">
          <i class="fas fa-trash mr-1"></i>ลบ
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import ImageUpload from './ImageUpload.vue'

// Props
const props = defineProps({
  contractor: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

// Emits
const emit = defineEmits(['image-upload', 'edit', 'save', 'cancel', 'delete', 'add-certificate'])

// Methods
const formatPhone = () => {
  let digits = props.contractor.phone.replace(/\D/g, '')
  if (digits.length > 3 && digits.length <= 6) {
    props.contractor.phone = `${digits.slice(0,3)}-${digits.slice(3)}`
  } else if (digits.length > 6) {
    props.contractor.phone = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6,10)}`
  } else {
    props.contractor.phone = digits
  }
}

const getStatusClass = (status) => ({
  'อนุมัติแล้ว': 'bg-green-100 text-green-800 border border-green-200',
  'ไม่อนุมัติ': 'bg-red-100 text-red-800 border border-red-200',
  'รอการอนุมัติ': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  'กำลังดำเนินการ': 'bg-blue-100 text-blue-800 border border-blue-200',
  'หมดอายุ': 'bg-gray-100 text-gray-800 border border-gray-200',
  'ไม่ผ่าน': 'bg-orange-100 text-orange-800 border border-orange-200',
  'อบรมแล้ว': 'bg-green-100 text-green-800 border border-green-200'
}[status] || 'bg-gray-100 text-gray-800 border border-gray-200')

const handleImageUpload = (event, imageType) => {
  emit('image-upload', event, props.contractor, imageType)
}
</script>

<style scoped>
.bg-gray-25 { 
  background-color: #fafafa; 
}

/* Enhanced status styling */
.status-badge {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}

.status-badge:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: scale(1.05);
}

/* Status detail cards */
.status-detail-card {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Table row hover effects */
.contractor-row {
  transition: all 0.2s ease-in-out;
}

.contractor-row:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

/* Button improvements */
.action-button {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}

.action-button:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: scale(1.05);
}
</style>