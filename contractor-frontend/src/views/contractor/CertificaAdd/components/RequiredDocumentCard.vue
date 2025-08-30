<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- ชื่อเอกสาร -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ document.name }}
          <span class="text-red-500">*</span>
        </label>
        <input 
          type="file" 
          :accept="acceptedFileTypes"
          @change="handleFileChange"
          class="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      
      <!-- วันหมดอายุ -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">วันหมดอายุ</label>
        <input 
          type="date" 
          :value="document.expiryDate"
          @input="updateExpiryDate"
          class="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
    
    <!-- แสดงชื่อไฟล์ที่เลือก -->
    <div v-if="document.fileName" class="mt-2 text-sm text-green-600">
      ✓ ไฟล์ที่เลือก: {{ document.fileName }}
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  document: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  acceptedFileTypes: {
    type: String,
    default: '.pdf,.jpg,.jpeg,.png,.docx'
  }
})

// Emits
const emit = defineEmits(['file-change', 'expiry-change'])

// Methods
const handleFileChange = (event) => {
  emit('file-change', props.index, event)
}

const updateExpiryDate = (event) => {
  emit('expiry-change', props.index, event.target.value)
}
</script>