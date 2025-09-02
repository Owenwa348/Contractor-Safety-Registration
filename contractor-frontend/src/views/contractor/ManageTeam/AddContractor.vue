<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center mb-1">
      <h1 class="text-2xl font-bold">จัดการรายชื่อกับงาน</h1>
    </div>
    <div class="mb-4 flex justify-between items-center">
      <h2 class="font-medium">เพิ่มรายชื่อพนักงานใหม่</h2>
      <!-- ปุ่มเพิ่มรายชื่อ -->
      <button
        @click="addRow"
        class="inline-flex items-center px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        เพิ่มรายชื่อ
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white border rounded">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2 text-left w-20">ลำดับที่</th>
            <th class="border p-2 text-left">ชื่อ</th>
            <th class="border p-2 text-left">นามสกุล</th>
            <th class="border p-2 text-left">เลขบัตรประชาชน/บัตรต่างด้าว</th>
            <th class="border p-2 text-left w-48">สำเนาบัตรประชาชน/บัตรต่างด้าว</th>
            <th class="border p-2 text-left w-20">ลบ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index" class="hover:bg-gray-50">
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-1">
              <input
                v-model="row.firstName"
                type="text"
                class="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                placeholder="กรอกชื่อ"
              />
            </td>
            <td class="border p-1">
              <input
                v-model="row.lastName"
                type="text"
                class="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                placeholder="กรอกนามสกุล"
              />
            </td>
            <td class="border p-1">
              <input
                v-model="row.idCard"
                type="text"
                maxlength="13"
                @input="allowOnlyNumbers($event, index)"
                class="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                placeholder="กรอกเลขบัตร"
              />
            </td>
            <td class="border p-2">
              <div class="space-y-2">
                <!-- File input -->
                <input
                  type="file"
                  :id="`file-${index}`"
                  @change="handleFileUpload($event, index)"
                  accept="image/*"
                  class="hidden"
                />
                <!-- Upload button -->
                <label
                  :for="`file-${index}`"
                  class="inline-flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  เพิ่มรูป
                </label>
                
                <!-- Status and View button -->
                <div v-if="row.isProcessing" class="text-xs text-blue-600">
                  <svg class="inline w-4 h-4 animate-spin mr-1" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังอ่านข้อมูล...
                </div>
                <div v-else-if="row.idCardImage" class="flex items-center space-x-2">
                  <button
                    @click="viewImage(index)"
                    class="inline-flex items-center px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    ดูรูป
                  </button>
                  <button
                    @click="removeImage(index)"
                    class="inline-flex items-center px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ลบ
                  </button>
                </div>
                <!-- File name display -->
                <div v-if="row.fileName" class="text-xs text-gray-600 truncate">
                  {{ row.fileName }}
                </div>
              </div>
            </td>
            <td class="border p-2 text-center">
              <button @click="removeRow(index)" class="text-red-500 hover:text-red-700 text-sm">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Image Modal -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div class="bg-white p-4 rounded-lg max-w-4xl max-h-screen overflow-auto" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">สำเนาบัตรประชาชน</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>
        <img
          :src="selectedImage.src"
          :alt="selectedImage.fileName"
          class="max-w-full max-h-96 object-contain mx-auto"
        />
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600">{{ selectedImage.fileName }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 space-x-2">
      <router-link to="/manage-team">
        <button class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium">
          กลับไปหน้าลงทะเบียน
        </button>
      </router-link>
      <router-link to="/manage-team">
        <button
          @click="submitForm"
          :disabled="!isFormValid"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          บันทึก
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Tesseract from 'tesseract.js'

// Thai ID validation function
const isValidThaiId = (id) => {
  if (!/^\d{13}$/.test(id)) return false
  
  const digits = id.split('').map(Number)
  const checksum = digits.slice(0, 12).reduce((sum, digit, index) => {
    return sum + (digit * (13 - index))
  }, 0)
  
  const expectedCheck = (11 - (checksum % 11)) % 10
  return expectedCheck === digits[12]
}

//  Enhanced image preprocessing for better OCR accuracy
const preprocessImageFile = (file) => new Promise((resolve, reject) => {
  const img = new Image()
  const url = URL.createObjectURL(file)
  
  img.onload = () => {
    // Scale up for better resolution
    const scale = Math.max(2, 2400 / Math.max(img.width, img.height))
    const w = Math.round(img.width * scale)
    const h = Math.round(img.height * scale)
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    canvas.width = w
    canvas.height = h
    
    // Use better image smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, w, h)
    
    // Enhanced image processing
    const imgData = ctx.getImageData(0, 0, w, h)
    const d = imgData.data
    
    // Apply contrast enhancement and binarization
    for (let i = 0; i < d.length; i += 4) {
      // Convert to grayscale
      const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]
      
      // Enhance contrast
      const enhanced = Math.pow(gray / 255, 0.7) * 255
      
      // Apply adaptive threshold for better text clarity
      const threshold = 140
      const binary = enhanced > threshold ? 255 : 0
      
      d[i] = d[i + 1] = d[i + 2] = binary
    }
    
    ctx.putImageData(imgData, 0, 0)
    
    const dataURL = canvas.toDataURL('image/png')
    URL.revokeObjectURL(url)
    resolve(dataURL)
  }
  
  img.onerror = reject
  img.src = url
})

// สร้างแถวว่างมาตรฐาน
const createEmptyRow = () => ({
  firstName: '',
  lastName: '',
  idCard: '',
  idCardImage: null,
  fileName: '',
  ocrText: '',
  isProcessing: false
})

// เริ่มต้นมี 1 แถวว่างอัตโนมัติ
const tableData = ref([createEmptyRow()])

// Modal state
const selectedImage = ref(null)

//  ต้องกรอกครบทุกช่อง + ต้องมีรูปด้วย
const isFormValid = computed(() => {
  if (tableData.value.length === 0) return false
  return tableData.value.every(
    row => row.firstName.trim() && 
           row.lastName.trim() && 
           /^\d{13}$/.test(row.idCard) && 
           row.idCardImage
  )
})

// จำกัดให้กรอกเฉพาะตัวเลข
const allowOnlyNumbers = (event, index) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
  tableData.value[index].idCard = event.target.value
}

// เพิ่มแถวใหม่
const addRow = () => {
  tableData.value.push(createEmptyRow())
}

// ลบแถว
const removeRow = (index) => {
  tableData.value.splice(index, 1)
}

// View image in modal
const viewImage = (index) => {
  const row = tableData.value[index]
  selectedImage.value = {
    src: row.idCardImage,
    fileName: row.fileName
  }
}

// Close modal
const closeModal = () => {
  selectedImage.value = null
}

// อัปโหลดรูป + OCR รวมจุดเด่นของทั้งสองโค้ด
const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('ขนาดไฟล์ต้องไม่เกิน 5MB')
      return
    }

    tableData.value[index].isProcessing = true
    tableData.value[index].fileName = file.name

    const reader = new FileReader()
    reader.onload = async () => {
      try {
        // ใช้ preprocessed image
        const processedDataURL = await preprocessImageFile(file)
        tableData.value[index].idCardImage = processedDataURL

        // Enhanced OCR with multiple attempts for better accuracy
        let text = ''
        try {
          // First attempt: Thai+English with high DPI
          const result1 = await Tesseract.recognize(processedDataURL, 'tha+eng', {
            psm: 6,
            preserve_interword_spaces: '1',
            user_defined_dpi: '400',
            tessedit_char_blacklist: '',
            tessedit_char_whitelist: 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮะาิีึืุูเแโใไํ์ํ์ๅฯ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ().,/-:',
          })
          text = result1.data.text
          
          // If confidence is low, try with different PSM
          if (result1.data.confidence < 70) {
            const result2 = await Tesseract.recognize(processedDataURL, 'tha+eng', {
              psm: 3, // Fully automatic page segmentation
              preserve_interword_spaces: '1',
              user_defined_dpi: '400',
            })
            if (result2.data.confidence > result1.data.confidence) {
              text = result2.data.text
            }
          }
        } catch (error) {
          console.error('OCR Error:', error)
          throw error
        }

        tableData.value[index].ocrText = text
        console.log('OCR Text:', text)

        // Enhanced ID number extraction with validation
        let foundIdCard = ''
        
        // Method 1: Find 13-digit pattern with spaces/dashes
        const idPattern = /(\d[\d\s-]{11,}\d)/g
        const idMatches = text.match(idPattern)
        if (idMatches) {
          for (let match of idMatches) {
            const cleanId = match.replace(/[\s-]/g, '')
            // Validate Thai ID card checksum
            if (cleanId.length === 13 && isValidThaiId(cleanId)) {
              foundIdCard = cleanId
              break
            }
          }
        }
        
        // Method 2: Extract all consecutive 13 digits
        if (!foundIdCard) {
          const allDigits = text.replace(/\D/g, '')
          for (let i = 0; i <= allDigits.length - 13; i++) {
            const possibleId = allDigits.substr(i, 13)
            if (isValidThaiId(possibleId)) {
              foundIdCard = possibleId
              break
            }
          }
        }
        
        // Method 3: Find any 13-digit sequence
        if (!foundIdCard) {
          const digitMatches = text.match(/\d{13}/g)
          if (digitMatches) {
            foundIdCard = digitMatches[0]
          }
        }
        
        if (foundIdCard) {
          tableData.value[index].idCard = foundIdCard
        }

        // Enhanced Thai name extraction with better patterns
        const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
        const cleanThai = (s) => s.replace(/[^\u0E00-\u0E7F\s]/g, '').trim()
        const isValidThaiName = (name) => name && /^[ก-๙]{2,}$/.test(name) && name.length <= 20
        
        let firstName = ''
        let lastName = ''

        // Method 1: Look for "ชื่อ" and "นามสกุล" labels
        for (const line of lines) {
          const cleanLine = cleanThai(line)
          
          // Find "ชื่อ [name] นามสกุล [lastname]" pattern
          const fullNameMatch = cleanLine.match(/ชื่อ\s*([ก-๙]+)\s*นามสกุล\s*([ก-๙]+)/)
          if (fullNameMatch && isValidThaiName(fullNameMatch[1]) && isValidThaiName(fullNameMatch[2])) {
            firstName = fullNameMatch[1]
            lastName = fullNameMatch[2]
            break
          }
          
          // Find "ชื่อ [name]"
          if (!firstName) {
            const nameMatch = cleanLine.match(/ชื่อ\s*([ก-๙]+)/)
            if (nameMatch && isValidThaiName(nameMatch[1])) {
              firstName = nameMatch[1]
            }
          }
          
          // Find "นามสกุล [lastname]"  
          if (!lastName) {
            const lastMatch = cleanLine.match(/นามสกุล\s*([ก-๙]+)/)
            if (lastMatch && isValidThaiName(lastMatch[1])) {
              lastName = lastMatch[1]
            }
          }
        }

        // Method 2: Look for title patterns (นาย, นาง, นางสาว)
        if (!firstName || !lastName) {
          const titlePattern = /(?:นาย|นาง|นางสาว)\s*([ก-๙]+)\s+([ก-๙]+)/
          for (const line of lines) {
            const match = cleanThai(line).match(titlePattern)
            if (match && isValidThaiName(match[1]) && isValidThaiName(match[2])) {
              firstName = firstName || match[1]
              lastName = lastName || match[2]
              break
            }
          }
        }

        // Method 3: Find two consecutive Thai words (most common pattern)
        if (!firstName || !lastName) {
          for (const line of lines) {
            const thaiWords = cleanThai(line).split(/\s+/).filter(word => isValidThaiName(word))
            if (thaiWords.length >= 2) {
              // Skip if line contains common words that aren't names
              const skipWords = ['ชื่อ', 'นามสกุล', 'เลข', 'บัตร', 'ประจำ', 'ตัว', 'ประชาชน', 'เกิด', 'วัน', 'เดือน', 'ปี']
              const hasCommonWords = skipWords.some(skip => line.includes(skip))
              
              if (!hasCommonWords) {
                firstName = firstName || thaiWords[0]
                lastName = lastName || thaiWords[1]
                break
              }
            }
          }
        }

        if (firstName && isValidThaiName(firstName)) {
          tableData.value[index].firstName = firstName
        }
        if (lastName && isValidThaiName(lastName)) {
          tableData.value[index].lastName = lastName
        }

      } catch (error) {
        console.error('OCR Error:', error)
        alert('เกิดข้อผิดพลาดในการอ่านข้อมูลจากรูป กรุณาลองใหม่')
      } finally {
        tableData.value[index].isProcessing = false
      }
    }
    
    reader.readAsDataURL(file)
  }
}

// ลบรูป
const removeImage = (index) => {
  tableData.value[index].idCardImage = null
  tableData.value[index].fileName = ''
  tableData.value[index].ocrText = ''
  const fileInput = document.getElementById(`file-${index}`)
  if (fileInput) fileInput.value = ''
}

// กดบันทึก
const submitForm = () => {
  if (!isFormValid.value) {
    alert('กรุณากรอกข้อมูลให้ครบทุกช่อง และแนบรูปบัตร')
    return
  }
  console.log('Data to save:', tableData.value)
  alert('บันทึกข้อมูลเรียบร้อยแล้ว')
}
</script>