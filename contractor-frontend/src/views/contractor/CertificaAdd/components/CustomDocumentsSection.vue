<template>
  <div class="border-t pt-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-800">เอกสารเพิ่มเติม</h2>
      <button 
        type="button"
        @click="addDocument"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        เพิ่มเอกสาร
      </button>
    </div>

    <!-- รายการเอกสารเพิ่มเติม -->
    <div v-if="customDocuments.length === 0" class="text-center py-8 text-gray-500">
      <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <p class="text-sm">ยังไม่มีเอกสารเพิ่มเติม</p>
      <p class="text-xs text-gray-400 mt-1">คลิกปุ่ม "เพิ่มเอกสาร" เพื่อเพิ่มเอกสารเพิ่มเติม</p>
    </div>

    <CustomDocumentCard
      v-for="(document, index) in customDocuments"
      :key="'custom-' + index"
      :document="document"
      :index="index"
      :accepted-file-types="acceptedFileTypes"
      @file-change="handleFileChange"
      @expiry-change="handleExpiryChange"
      @name-change="handleNameChange"
      @remove="handleRemove"
    />
  </div>
</template>

<script setup>
import CustomDocumentCard from './CustomDocumentCard.vue'

// Props
const props = defineProps({
  customDocuments: {
    type: Array,
    required: true
  },
  acceptedFileTypes: {
    type: String,
    default: '.pdf,.jpg,.jpeg,.png,.docx'
  }
})

// Emits
const emit = defineEmits([
  'add-document',
  'file-change',
  'expiry-change',
  'name-change',
  'remove-document'
])

// Methods
const addDocument = () => {
  emit('add-document')
}

const handleFileChange = (index, event) => {
  emit('file-change', index, event, 'custom')
}

const handleExpiryChange = (index, value) => {
  emit('expiry-change', index, value, 'custom')
}

const handleNameChange = (index, value) => {
  emit('name-change', index, value)
}

const handleRemove = (index) => {
  emit('remove-document', index)
}
</script>