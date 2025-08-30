<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">เพิ่มเอกสาร Certificate</h1>
    <p class="text-gray-600 mb-6">กรุณาแนบไฟล์เอกสารประกอบตามที่กำหนด (PDF, JPG, PNG, DOCX)</p>

    <form @submit.prevent="saveDocuments" class="space-y-6">
      <!-- เอกสารพื้นฐาน -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">เอกสารที่จำเป็น</h2>
        <div class="space-y-4">
          <RequiredDocumentCard
            v-for="(document, index) in requiredDocuments"
            :key="'required-' + index"
            :document="document"
            :index="index"
            :accepted-file-types="acceptedFileTypes"
            @file-change="handleRequiredFileChange"
            @expiry-change="handleRequiredExpiryChange"
          />
        </div>
      </div>

      <!-- เอกสารเพิ่มเติม -->
      <CustomDocumentsSection
        :custom-documents="customDocuments"
        :accepted-file-types="acceptedFileTypes"
        @add-document="addCustomDocument"
        @file-change="handleCustomFileChange"
        @expiry-change="handleCustomExpiryChange"
        @name-change="handleCustomNameChange"
        @remove-document="removeCustomDocument"
      />

      <!-- สรุปเอกสาร -->
      <DocumentSummary
        :required-documents-count="requiredDocumentsCount"
        :custom-documents-count="customDocumentsCount"
        :total-required-documents="requiredDocuments.length"
      />

      <!-- ปุ่มบันทึก -->
      <FormActions
        :can-save="canSave"
        :is-loading="isLoading"
        @save="saveDocuments"
        @reset="resetForm"
        @back="goBack"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RequiredDocumentCard from './components/RequiredDocumentCard.vue'
import CustomDocumentsSection from './components/CustomDocumentsSection.vue'
import DocumentSummary from './components/DocumentSummary.vue'
import FormActions from './components/FormActions.vue'
import { getRequiredDocuments } from './requiredDocuments.js'

// State
const isLoading = ref(false)
const acceptedFileTypes = '.pdf,.jpg,.jpeg,.png,.docx'

// Required Documents Data
const requiredDocuments = ref(getRequiredDocuments())

// Custom Documents Data
const customDocuments = ref([])

// Computed Properties
const requiredDocumentsCount = computed(() => {
  return requiredDocuments.value.filter(doc => doc.file).length
})

const customDocumentsCount = computed(() => {
  return customDocuments.value.filter(doc => doc.file).length
})

const canSave = computed(() => {
  // ต้องมีเอกสารอย่างน้อย 1 ไฟล์
  return requiredDocumentsCount.value > 0 || customDocumentsCount.value > 0
})

// Methods
const handleRequiredFileChange = (index, event) => {
  const file = event.target.files[0]
  if (file) {
    requiredDocuments.value[index].file = file
    requiredDocuments.value[index].fileName = file.name
  }
}

const handleRequiredExpiryChange = (index, value) => {
  requiredDocuments.value[index].expiryDate = value
}

const handleCustomFileChange = (index, event) => {
  const file = event.target.files[0]
  if (file) {
    customDocuments.value[index].file = file
    customDocuments.value[index].fileName = file.name
  }
}

const handleCustomExpiryChange = (index, value) => {
  customDocuments.value[index].expiryDate = value
}

const handleCustomNameChange = (index, value) => {
  customDocuments.value[index].name = value
}

const addCustomDocument = () => {
  customDocuments.value.push({
    name: '',
    file: null,
    fileName: '',
    expiryDate: ''
  })
}

const removeCustomDocument = (index) => {
  customDocuments.value.splice(index, 1)
}

const saveDocuments = async () => {
  const allDocuments = [
    ...requiredDocuments.value.filter(doc => doc.file),
    ...customDocuments.value.filter(doc => doc.file && doc.name.trim())
  ]

  if (allDocuments.length === 0) {
    alert('กรุณาเลือกไฟล์อย่างน้อย 1 ไฟล์')
    return
  }

  isLoading.value = true
  
  try {
    // จำลองการบันทึกข้อมูล
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('บันทึกเอกสาร:', allDocuments)
    
    // แสดงข้อความสำเร็จ
    alert(`บันทึกเอกสารสำเร็จ! จำนวน ${allDocuments.length} ไฟล์`)
    
    // ส่งข้อมูลไปยัง API หรือ parent component
    // this.$emit('documents-saved', allDocuments)
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึก:', error)
    alert('เกิดข้อผิดพลาดในการบันทึกเอกสาร กรุณาลองใหม่อีกครั้ง')
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  // รีเซ็ตเอกสารที่จำเป็น
  requiredDocuments.value.forEach(doc => {
    doc.file = null
    doc.fileName = ''
    doc.expiryDate = ''
  })
  
  // รีเซ็ตเอกสารเพิ่มเติม
  customDocuments.value = []
  
  // รีเซ็ต input file
  const fileInputs = document.querySelectorAll('input[type="file"]')
  fileInputs.forEach(input => {
    input.value = ''
  })
}

const goBack = () => {
  // Navigate back to ManageTeam page or previous page
  window.history.back()
}
</script>

<style scoped>
/* เพิ่ม style สำหรับการแสดงผลที่ดีขึ้น */
.file-input:hover {
  border-color: #3b82f6;
}

/* Animation สำหรับการเพิ่ม/ลบเอกสาร */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>