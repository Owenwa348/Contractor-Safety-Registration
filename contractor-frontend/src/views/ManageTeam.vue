<template>
  <div class="bg-gray-50 min-h-screen p-4">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="bg-blue-500 p-3 rounded-lg mr-4">
            <i class="fas fa-users text-white text-xl"></i>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">จัดการรายชื่อพนักงานตามสังกัด</h1>
            <p class="text-gray-600 text-sm mt-1">ระบบจัดการข้อมูลพนักงานและการส่งให้หัวหน้างาน</p>
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Add Button -->
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-3">เพิ่มพนักงานใหม่</h3>
          <router-link to="/add-contractor" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm flex items-center shadow-sm transition-colors">
            <i class="fas fa-plus mr-2"></i>เพิ่มพนักงาน
          </router-link>
        </div>

        <!-- Supervisor Selection -->
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            <i class="fas fa-user-tie mr-2 text-blue-500"></i>เลือกหัวหน้างาน
          </label>
          <select 
            v-model="selectedSupervisor"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">-- เลือกหัวหน้างาน --</option>
            <option v-for="supervisor in supervisors" :key="supervisor.id" :value="supervisor.id">
              {{ supervisor.name }} - {{ supervisor.department }}
            </option>
          </select>
        </div>
      </div>

      <!-- Table Container -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Search Controls -->
        <div class="p-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between gap-3">
          <div class="flex items-center space-x-3">
            <span class="text-sm font-medium text-gray-700">ค้นหาข้อมูล:</span>
            <div class="relative">
              <input 
                v-model="searchTerm" 
                type="text" 
                placeholder="พิมพ์เพื่อค้นหา..." 
                class="border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64 bg-white" 
              />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1200px]">
            <thead class="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 sticky top-0">
              <tr>
                <th v-for="header in headers" :key="header.key" @click="sortBy(header.key)" 
                    :class="getHeaderClass(header.key)" class="px-3 py-4 text-xs font-semibold uppercase tracking-wider transition-colors">
                  <div :class="header.key.includes('Picture') || ['choose', 'actions', 'Certificate'].includes(header.key) ? 'justify-center' : ''" class="flex items-center">
                    <span>{{ header.label }}</span>
                    <i v-if="!['choose', 'actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'Certificate'].includes(header.key)" 
                       :class="getSortIcon(header.key)" class="fas fa-sort ml-2 text-sm"></i>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(contractor, index) in paginatedContractors" :key="contractor.id" 
                  :class="index % 2 === 0 ? 'bg-gray-25' : 'bg-white'" class="hover:bg-gray-100 transition-colors border-b border-gray-100">
                
                <!-- Checkbox -->
                <td class="px-3 py-4 text-center">
                  <input type="checkbox" v-model="contractor.selected" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
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
                  type="tel"
                  v-model="contractor.phone"
                  @input="formatPhone(contractor)"
                  placeholder="กรอกเบอร์โทร"
                  maxlength="12"
                  class="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                
                <!-- Status -->
                <td class="px-2 py-2 text-center">
                  <span :class="getStatusClass(contractor.status)" class="inline-flex px-2 py-1 rounded-full text-xs font-medium">
                    {{ contractor.status }}
                  </span>
                </td>
                
                <!-- Image Upload Components -->
                <td v-for="imageType in ['employee', 'idcard', 'social']" :key="imageType" class="px-2 py-2 text-center">
                  <div class="flex flex-col items-center space-y-1">
                    <div v-if="contractor.images[imageType]" class="flex items-center space-x-1">
                      <button @click="openImageInNewTab(contractor.images[imageType], getImageText(imageType))" :class="getImageLinkClass(imageType)" class="text-xs flex items-center hover:underline">
                        <i :class="getImageIcon(imageType)" class="mr-1"></i>
                        {{ getImageText(imageType) }}
                      </button>
                      <button @click="contractor.images[imageType] = null" class="text-red-500 hover:text-red-600 text-xs">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <label class="cursor-pointer">
                      <input type="file" accept="image/*" class="hidden" @change="handleImageUpload($event, contractor, imageType)" />
                      <div :class="getUploadButtonClass(imageType)" class="px-2 py-1 rounded text-xs border transition-colors flex items-center">
                        <i :class="getImageIcon(imageType)" class="mr-1"></i>
                        {{ contractor.images[imageType] ? "เปลี่ยน" : "อัพโหลด" }}
                      </div>
                    </label>
                  </div>
                </td>
                
                <!-- Certificate -->
                <td class="px-2 py-2 text-center">
                  <router-link to="/certifica-add" class="text-indigo-600 hover:text-indigo-800 text-xs flex items-center">
                  <button @click="addCertificate(contractor)" class="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded text-xs border border-indigo-300 transition-colors flex items-center mx-auto">
                    <i class="fas fa-certificate mr-1"></i>เพิ่มข้อมูล
                  </button>
                  </router-link>
                </td>
                
                <!-- Actions -->
                <td class="px-2 py-2 text-center">
                  <div class="flex justify-center space-x-1">
                    <button v-if="contractor.isEditing" @click="saveContractor(contractor)" class="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded text-xs border border-green-300 transition-colors">
                      <i class="fas fa-save mr-1"></i>บันทึก
                    </button>
                    <button v-if="contractor.isEditing" @click="cancelEdit(contractor)" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs border border-gray-300 transition-colors">
                      <i class="fas fa-times mr-1"></i>ยกเลิก
                    </button>
                    <button v-if="!contractor.isEditing" @click="editContractor(contractor)" class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs border border-blue-300 transition-colors">
                      <i class="fas fa-edit mr-1"></i>แก้ไข
                    </button>
                    <button v-if="!contractor.isEditing" @click="deleteContractor(contractor)" class="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded text-xs border border-red-300 transition-colors">
                      <i class="fas fa-trash mr-1"></i>ลบ
                    </button>
                  </div>
                </td>
              </tr>

              <!-- No Data -->
              <tr v-if="paginatedContractors.length === 0">
                <td colspan="13" class="px-4 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <i class="fas fa-search text-3xl text-gray-300 mb-3"></i>
                    <div class="font-medium text-lg mb-2">ไม่พบข้อมูลที่ค้นหา</div>
                    <div class="text-sm">ลองเปลี่ยนคำค้นหาหรือเคลียร์ตัวกรอง</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t bg-gray-50 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-600">
            แสดง {{ startEntry }} ถึง {{ endEntry }} จาก {{ totalEntries }} รายการ
          </div>
          <div class="flex items-center space-x-2">
            <button @click="currentPage > 1 && currentPage--" :disabled="currentPage === 1" 
                    class="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <i class="fas fa-chevron-left mr-2"></i>ก่อนหน้า
            </button>
            <div class="flex space-x-1">
              <button v-for="page in visiblePages" :key="page" @click="typeof page === 'number' && (currentPage = page)"
                      :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'"
                      class="px-3 py-2 rounded text-sm transition-colors">
                {{ page }}
              </button>
            </div>
            <button @click="currentPage < totalPages && currentPage++" :disabled="currentPage === totalPages"
                    class="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              ถัดไป<i class="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="px-6 py-4 border-t bg-gray-50">
          <button 
            @click="submitForm"
            :disabled="selectedContractors.length === 0"
            class="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-sm transition-colors">
            <i class="fas fa-paper-plane mr-3"></i>
            ยื่นยันการส่ง ({{ selectedContractors.length }} รายการ)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const entriesPerPage = ref(10)
const searchTerm = ref('')
const currentPage = ref(1)
const sortField = ref('')
const sortDirection = ref('asc')
const selectedSupervisor = ref('')

// Sample supervisors data
const supervisors = ref([
  { id: 1, name: 'นายสมชาย ผู้จัดการ', department: 'แผนกก่อสร้าง' },
  { id: 2, name: 'นางสาวสมหญิง หัวหน้า', department: 'แผนกควบคุมคุณภาพ' },
  { id: 3, name: 'นายวิชาญ ผู้ดูแล', department: 'แผนกความปลอดภัย' }
])

// Headers
const headers = ref([
  { key: 'choose', label: 'เลือก' },
  { key: 'id', label: 'ลำดับ' },
  { key: 'firstName', label: 'ชื่อ' },
  { key: 'lastName', label: 'นามสกุล' },
  { key: 'idCard', label: 'รหัสบัตรประชาชน' },
  { key: 'phone', label: 'หมายเลขโทรศัพท์' },
  { key: 'status', label: 'สถานะ' },
  { key: 'EmployeePicture', label: 'รูปพนักงาน' },
  { key: 'IDCardPicture', label: 'รูปบัตรประชาชน/บัตรต่างด้าว' },
  { key: 'SocialSecurityPicture', label: 'รูปประกันสังคม' },
  { key: 'Certificate', label: 'Certifica' },
])

// Sample Data
const contractors = ref([
  { 
    id: 1, 
    firstName: 'สมชาย', 
    lastName: 'ใจดี', 
    idCard: '1-2345-67890-12-3', 
    phone: '081-234-5678', 
    status: 'อนุมัติแล้ว', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard1.jpg', social: null, documents: [] }
  },
  { 
    id: 2, 
    firstName: 'สมหญิง', 
    lastName: 'รักงาน', 
    idCard: '1-2345-67891-12-4', 
    phone: '082-345-6789', 
    status: 'ไม่อนุมัติ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard2.jpg', social: null, documents: [] }
  },
  { 
    id: 3, 
    firstName: 'วิชาญ', 
    lastName: 'มั่นคง', 
    idCard: '1-2345-67892-12-5', 
    phone: '083-456-7890', 
    status: 'กำลังดำเนินการ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard3.jpg', social: null, documents: [] }
  },
  { 
    id: 4, 
    firstName: 'นิติกร', 
    lastName: 'มั่นคง', 
    idCard: '1-2345-67892-12-5', 
    phone: '083-456-7890', 
    status: 'รอการอนุมัติ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard3.jpg', social: null, documents: [] }
  }
])

// Computed
const filteredContractors = computed(() => 
  !searchTerm.value ? contractors.value : 
  contractors.value.filter(c => ['firstName', 'lastName', 'idCard', 'phone', 'status'].some(field => 
    c[field]?.toLowerCase().includes(searchTerm.value.toLowerCase())
  ))
)

const formatPhone = (contractor) => {
  let digits = contractor.phone.replace(/\D/g, ''); // เอาเฉพาะตัวเลข
  if (digits.length > 3 && digits.length <= 6) {
    contractor.phone = `${digits.slice(0,3)}-${digits.slice(3)}`;
  } else if (digits.length > 6) {
    contractor.phone = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6,10)}`;
  } else {
    contractor.phone = digits;
  }
};

const sortedContractors = computed(() => {
  if (!sortField.value) return filteredContractors.value
  return [...filteredContractors.value].sort((a, b) => {
    const aVal = typeof a[sortField.value] === 'string' ? a[sortField.value].toLowerCase() : a[sortField.value]
    const bVal = typeof b[sortField.value] === 'string' ? b[sortField.value].toLowerCase() : b[sortField.value]
    return sortDirection.value === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })
})

const totalPages = computed(() => Math.ceil(sortedContractors.value.length / entriesPerPage.value))
const paginatedContractors = computed(() => sortedContractors.value.slice((currentPage.value - 1) * entriesPerPage.value, currentPage.value * entriesPerPage.value))
const startEntry = computed(() => sortedContractors.value.length === 0 ? 0 : (currentPage.value - 1) * entriesPerPage.value + 1)
const endEntry = computed(() => Math.min(currentPage.value * entriesPerPage.value, sortedContractors.value.length))
const totalEntries = computed(() => sortedContractors.value.length)
const selectedContractors = computed(() => contractors.value.filter(c => c.selected))

const visiblePages = computed(() => {
  const delta = 2, range = [], rangeWithDots = []
  for (let i = Math.max(2, currentPage.value - delta); i <= Math.min(totalPages.value - 1, currentPage.value + delta); i++) range.push(i)
  if (currentPage.value - delta > 2) rangeWithDots.push(1, '...'); else rangeWithDots.push(1)
  rangeWithDots.push(...range)
  if (currentPage.value + delta < totalPages.value - 1) rangeWithDots.push('...', totalPages.value); else rangeWithDots.push(totalPages.value)
  return rangeWithDots.filter(() => totalPages.value > 1)
})

// Methods
const sortBy = (field) => {
  if (['choose', 'actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'Certificate'].includes(field)) return
  if (sortField.value === field) sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  else { sortField.value = field; sortDirection.value = 'asc' }
}

const getSortIcon = (field) => sortField.value !== field ? 'text-gray-400' : (sortDirection.value === 'asc' ? 'fa-sort-up text-blue-600' : 'fa-sort-down text-blue-600')

const getHeaderClass = (key) => {
  const baseClass = 'text-left cursor-pointer'
  const nonSortable = ['choose', 'actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'Certificate']
  const centerClass = nonSortable.includes(key) ? 'text-center cursor-default' : ''
  const widthClass = {
    'choose': 'min-w-[60px]', 'id': 'min-w-[60px]', 'firstName': 'min-w-[80px]', 'lastName': 'min-w-[80px]',
    'idCard': 'min-w-[120px]', 'phone': 'min-w-[100px]', 'status': 'min-w-[80px]',
    'EmployeePicture': 'min-w-[80px]', 'IDCardPicture': 'min-w-[80px]', 'SocialSecurityPicture': 'min-w-[80px]',
    'Certificate': 'min-w-[80px]', 'actions': 'min-w-[100px]'
  }[key] || ''
  return `${baseClass} ${centerClass} ${widthClass}`
}

const getStatusClass = (status) => ({
  'อนุมัติแล้ว': 'bg-green-100 text-green-800',
  'ไม่อนุมัติ': 'bg-red-100 text-red-800',
  'รอการอนุมัติ': 'bg-yellow-100 text-yellow-800',
  'กำลังดำเนินการ': 'bg-yellow-100 text-yellow-800'
}[status] || 'bg-gray-100 text-gray-800')

const getImageLinkClass = (type) => ({ 
  employee: 'text-green-600 hover:text-green-800', 
  idcard: 'text-blue-600 hover:text-blue-800', 
  social: 'text-purple-600 hover:text-purple-800' 
}[type])

const getImageIcon = (type) => ({ 
  employee: 'fas fa-image', 
  idcard: 'fas fa-id-card', 
  social: 'fas fa-shield-alt' 
}[type])

const getImageText = (type) => ({ 
  employee: 'ดูรูป', 
  idcard: 'ดูบัตร', 
  social: 'ดูรูป' 
}[type])

const getUploadButtonClass = (type) => ({ 
  employee: 'bg-green-100 hover:bg-green-200 text-green-700 border-green-300', 
  idcard: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300', 
  social: 'bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300' 
}[type])

const openImageInNewTab = (imageSrc, title) => {
  // สร้าง Blob URL สำหรับ data URL
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
    // สำหรับ URL ปกติ
    window.open(imageSrc, '_blank')
  }
}

const editContractor = (contractor) => {
  // เก็บข้อมูลเดิมไว้สำหรับยกเลิก
  contractor.originalData = {
    firstName: contractor.firstName,
    lastName: contractor.lastName,
    idCard: contractor.idCard
  }
  contractor.isEditing = true
}

const saveContractor = (contractor) => {
  // ตรวจสอบข้อมูล
  if (!contractor.firstName.trim() || !contractor.lastName.trim() || !contractor.idCard.trim()) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }
  
  // ตรวจสอบรูปแบบเลขบัตรประชาชน (13 หลัก)
  const idCardDigits = contractor.idCard.replace(/\D/g, '')
  if (idCardDigits.length !== 13) {
    alert('กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก')
    return
  }
  
  contractor.isEditing = false
  contractor.originalData = {}
  console.log('Saved contractor:', contractor)
}

const cancelEdit = (contractor) => {
  // คืนข้อมูลเดิม
  contractor.firstName = contractor.originalData.firstName
  contractor.lastName = contractor.originalData.lastName
  contractor.idCard = contractor.originalData.idCard
  contractor.isEditing = false
  contractor.originalData = {}
}

const handleImageUpload = (event, contractor, type) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => contractor.images[type] = e.target.result
    reader.readAsDataURL(file)
  }
}

const handleDocumentUpload = (event, contractor) => {
  Array.from(event.target.files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => contractor.images.documents.push(e.target.result)
    reader.readAsDataURL(file)
  })
}

const deleteContractor = (contractor) => {
  if (confirm(`คุณต้องการลบพนักงาน ${contractor.firstName} ${contractor.lastName} หรือไม่?`)) {
    const index = contractors.value.findIndex(c => c.id === contractor.id)
    if (index !== -1) contractors.value.splice(index, 1)
  }
}

const addCertificate = (contractor) => console.log('Add certificate:', contractor)

// New submit function
const submitForm = () => {
  if (!selectedSupervisor.value) {
    alert('กรุณาเลือกหัวหน้างาน')
    return
  }
  if (selectedContractors.value.length === 0) {
    alert('กรุณาเลือกพนักงานอย่างน้อย 1 คน')
    return
  }
  
  const supervisor = supervisors.value.find(s => s.id === selectedSupervisor.value)
  console.log('ส่งข้อมูลแล้ว:', {
    supervisor: supervisor,
    employees: selectedContractors.value
  })
  alert(`ส่งข้อมูลพนักงาน ${selectedContractors.value.length} คน ให้หัวหน้างาน ${supervisor.name} เรียบร้อยแล้วโปรดตรวจสอบภายหลัง`)
}
</script>

<style scoped>
.bg-gray-25 { 
  background-color: #fafafa; 
}
.min-w-\[1200px\] { 
  min-width: 1200px; 
}
</style>