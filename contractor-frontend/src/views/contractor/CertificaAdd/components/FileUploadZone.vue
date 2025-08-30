<template>
  <div class="space-y-4">
    <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
      <div class="p-6 text-center">
        <div class="mb-4">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="mb-2">
          <label for="file-upload" class="cursor-pointer">
            <span class="text-sm font-medium text-gray-900">
              Click to upload
            </span>
            <span class="text-sm text-gray-500"> or drag and drop</span>
          </label>
          <input 
            id="file-upload" 
            type="file" 
            :accept="acceptedFileTypes"
            @change="handleFileSelect"
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="sr-only"
            multiple
          >
        </div>
        <p class="text-xs text-gray-500">
          PDF, JPG, PNG, DOCX up to 10MB each
        </p>
      </div>
    </div>

    <!-- File List -->
    <div v-if="selectedFiles.length > 0" class="space-y-2">
      <h4 class="text-sm font-medium text-gray-900">Selected Files ({{ selectedFiles.length }})</h4>
      <div class="space-y-2">
        <div 
          v-for="(file, index) in selectedFiles" 
          :key="index"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
        >
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ file.name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatFileSize(file.size) }} • {{ getFileExtension(file.name).toUpperCase() }}
              </p>
            </div>
          </div>
          <button 
            @click="removeFile(index)"
            class="flex-shrink-0 text-red-500 hover:text-red-700"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  acceptedFileTypes: {
    type: String,
    default: '.pdf,.jpg,.jpeg,.png,.docx'
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB
  },
  multiple: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['files-selected'])

// State
const selectedFiles = ref([])

// Methods
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = (files) => {
  const validFiles = files.filter(file => {
    // Check file size
    if (file.size > props.maxFileSize) {
      alert(`File "${file.name}" is too large. Maximum size is ${formatFileSize(props.maxFileSize)}.`)
      return false
    }
    
    // Check file type
    const extension = getFileExtension(file.name)
    const acceptedExtensions = props.acceptedFileTypes.split(',').map(ext => ext.trim().replace('.', ''))
    if (!acceptedExtensions.includes(extension)) {
      alert(`File "${file.name}" has an unsupported format. Accepted formats: ${props.acceptedFileTypes}`)
      return false
    }
    
    return true
  })

  if (props.multiple) {
    selectedFiles.value = [...selectedFiles.value, ...validFiles]
  } else {
    selectedFiles.value = validFiles.slice(0, 1)
  }
  
  emit('files-selected', selectedFiles.value)
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
  emit('files-selected', selectedFiles.value)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase()
}

// Expose methods for parent component
const clearFiles = () => {
  selectedFiles.value = []
  emit('files-selected', [])
}

defineExpose({
  clearFiles,
  selectedFiles
})
</script>