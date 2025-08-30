<template>
  <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 relative">
    <!-- ปุ่มลบ -->
    <button 
      type="button"
      @click="removeDocument"
      class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- ชื่อเอกสาร -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อเอกสาร</label>
        <input 
          type="text" 
          :value="document.name"
          @input="updateDocumentName"
          placeholder="ระบุชื่อเอกสาร"
          class="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      
      <!-- ไฟล์ -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">เลือกไฟล์</label>
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
const emit = defineEmits(['file-change', 'expiry-change', 'name-change', 'remove'])

// Methods
const handleFileChange = (event) => {
  emit('file-change', props.index, event)
}

const updateExpiryDate = (event) => {
  emit('expiry-change', props.index, event.target.value)
}

const updateDocumentName = (event) => {
  emit('name-change', props.index, event.target.value)
}

const removeDocument = () => {
  emit('remove', props.index)
}
</script>