<template>
  <div class="flex flex-col items-center space-y-1">
    <div v-if="contractor.images[imageType]" class="flex items-center space-x-1">
      <button @click="openImageInNewTab(contractor.images[imageType], getImageText(imageType))" 
              :class="getImageLinkClass(imageType)" 
              class="text-xs flex items-center hover:underline">
        <i :class="getImageIcon(imageType)" class="mr-1"></i>
        {{ getImageText(imageType) }}
      </button>
      <button @click="contractor.images[imageType] = null" 
              class="text-red-500 hover:text-red-600 text-xs">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <label class="cursor-pointer">
      <input type="file" 
             accept="image/*" 
             class="hidden" 
             @change="handleUpload" />
      <div :class="getUploadButtonClass(imageType)" 
           class="px-2 py-1 rounded text-xs border transition-colors flex items-center">
        <i :class="getImageIcon(imageType)" class="mr-1"></i>
        {{ contractor.images[imageType] ? "เปลี่ยน" : "อัพโหลด" }}
      </div>
    </label>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  contractor: {
    type: Object,
    required: true
  },
  imageType: {
    type: String,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['upload'])

// Methods
const handleUpload = (event) => {
  emit('upload', event, props.imageType)
}

const getImageLinkClass = (type) => ({ 
  employee: 'text-green-600 hover:text-green-800', 
  idcard: 'text-blue-600 hover:text-blue-800', 
  social: 'text-purple-600 hover:text-purple-800',
  certificate: 'text-purple-600 hover:text-purple-800' 
}[type])

const getImageIcon = (type) => ({ 
  employee: 'fas fa-image', 
  idcard: 'fas fa-id-card', 
  social: 'fas fa-shield-alt',
  certificate: 'fas fa-shield-alt'
}[type])

const getImageText = (type) => ({ 
  employee: 'ดูรูป', 
  idcard: 'ดูบัตร', 
  social: 'ดูรูป', 
  certificate: 'ดูเอกสาร' 
}[type])

const getUploadButtonClass = (type) => ({ 
  employee: 'bg-green-100 hover:bg-green-200 text-green-700 border-green-300', 
  idcard: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300', 
  social: 'bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300',
  certificate: 'bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300' 
}[type])

const openImageInNewTab = (imageSrc, title) => {
  if (imageSrc.startsWith('data:')) {
    const newWindow = window.open('', '_blank')
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          body { margin: 0; padding: 20px; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 100%; max-height: 100vh; object-fit: contain; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          h1 { text-align: center; color: #333; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div>
          <h1>${title}</h1>
          <img src="${imageSrc}" alt="${title}" />
        </div>
      </body>
      </html>
    `)
    newWindow.document.close()
  } else {
    window.open(imageSrc, '_blank')
  }
}
</script>