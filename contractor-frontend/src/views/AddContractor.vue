<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center mb-1">
      <h1 class="text-2xl font-bold">จัดการรายชื่อกับงาน</h1>
    </div>

    <div class="mb-4">
      <h2 class="font-medium mb-2">เพิ่มรายชื่อพนักงานใหม่</h2>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index" class="hover:bg-gray-50">
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-1">
              <input
                v-model="row.firstName"
                type="text"
                class="w-full p-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="กรอกชื่อ"
              />
            </td>
            <td class="border p-1">
              <input
                v-model="row.lastName"
                type="text"
                class="w-full p-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="กรอกนามสกุล"
              />
            </td>
            <td class="border p-1">
              <input
                v-model="row.idCard"
                type="text"
                class="w-full p-1 border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                
                <!-- Image preview -->
                <div v-if="row.idCardImage" class="mt-2">
                  <img
                    :src="row.idCardImage"
                    alt="ID Card Preview"
                    class="w-16 h-12 object-cover border rounded"
                  />
                  <button
                    @click="removeImage(index)"
                    class="ml-2 text-red-500 hover:text-red-700 text-sm"
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
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6 space-x-2">
      <router-link to="/manage-team">
        <button
          class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium"
        >
          กลับไปหน้าลงทะเบียน
        </button>
      </router-link>
      
      <router-link to="/manage-team">
        <button
          @click="submitForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
        >
          บันทึก
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    firstName: 'ธีรศักดิ์',
    department: '',
    lastName: '',
    idCard: '1234567890123',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  },
  {
    firstName: '',
    department: '',
    lastName: '',
    idCard: '',
    idCardImage: null,
    fileName: ''
  }
])

const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น')
      return
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('ขนาดไฟล์ต้องไม่เกิน 5MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      tableData.value[index].idCardImage = e.target.result
      tableData.value[index].fileName = file.name
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = (index) => {
  tableData.value[index].idCardImage = null
  tableData.value[index].fileName = ''
  // Reset the file input
  const fileInput = document.getElementById(`file-${index}`)
  if (fileInput) {
    fileInput.value = ''
  }
}

const submitForm = () => {
  // Filter out empty rows
  const validData = tableData.value.filter(row => 
    row.firstName.trim() || row.department.trim() || row.lastName.trim() || row.idCard.trim()
  )
  
  if (validData.length === 0) {
    alert('กรุณากรอกข้อมูลอย่างน้อย 1 รายการ')
    return
  }
  
  console.log('Data to save:', validData)
  alert('บันทึกข้อมูลเรียบร้อยแล้ว')
}
</script>

