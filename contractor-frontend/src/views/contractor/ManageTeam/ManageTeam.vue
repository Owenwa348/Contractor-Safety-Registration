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
            <p class="text-gray-600 text-sm mt-1">ระบบจัดการข้อมูลพนักงานและการส่งให้หัวหน้างาน พร้อมรายละเอียดสถานะการอนุมัติ</p>
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

      <!-- First Table - Original Contractors -->
      <ContractorTable
        :contractors="contractors"
        :headers="headers"
        :paginated-contractors="paginatedContractors"
        :selected-contractors="selectedContractors"
        :search-term="searchTerm"
        :selected-status="selectedStatus"
        :current-page="currentPage"
        :total-pages="totalPages"
        :start-entry="startEntry"
        :end-entry="endEntry"
        :total-entries="totalEntries"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @update:search-term="searchTerm = $event"
        @update:selected-status="selectedStatus = $event"
        @update:current-page="currentPage = $event"
        @sort="sortBy"
        @image-upload="handleImageUpload"
        @edit="editContractor"
        @save="saveContractor"
        @cancel="cancelEdit"
        @delete="deleteContractor"
        @add-certificate="addCertificate"
        @submit="submitForm"
      />

      <!-- Second Table - Trained Contractors -->
      <TrainedContractorTable
        :trained-contractors="trainedContractors"
        :trained-headers="trainedHeaders"
        :paginated-trained-contractors="paginatedTrainedContractors"
        :search-term-trained="searchTermTrained"
        :current-page-trained="currentPageTrained"
        :total-pages-trained="totalPagesTrained"
        :start-entry-trained="startEntryTrained"
        :end-entry-trained="endEntryTrained"
        :total-entries-trained="totalEntriesTrained"
        :sort-field-trained="sortFieldTrained"
        :sort-direction-trained="sortDirectionTrained"
        @update:search-term-trained="searchTermTrained = $event"
        @update:current-page-trained="currentPageTrained = $event"
        @sort-trained="sortByTrained"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ContractorTable from './components/ContractorTable.vue'
import TrainedContractorTable from './components/TrainedContractorTable.vue'

// State
const entriesPerPage = ref(5)
const searchTerm = ref('')
const searchTermTrained = ref('')
const currentPage = ref(1)
const currentPageTrained = ref(1)
const sortField = ref('')
const sortDirection = ref('asc')
const sortFieldTrained = ref('')
const sortDirectionTrained = ref('asc')
const selectedSupervisor = ref('')
const selectedStatus = ref('')
// Sample supervisors data
const supervisors = ref([
  { id: 1, name: 'นายสมชัย แสงโสม ', department: 'หัวหน้างานขนส่ง' },
  { id: 2, name: 'นายสุรพล กรมหนึ่ง', department: 'หัวหน้างานเครื่องจักร' },
  { id: 3, name: 'นายประเสริฐ เริสบาระ', department: 'หัวหน้างานความปลอดภัย' }
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
  { key: 'actions', label: 'การจัดการ' }
])

// Headers for Trained Table
const trainedHeaders = ref([
  { key: 'id', label: 'ลำดับ' },
  { key: 'firstName', label: 'ชื่อ' },
  { key: 'lastName', label: 'นามสกุล' },
  { key: 'idCard', label: 'รหัสบัตรประชาชน' },
  { key: 'phone', label: 'หมายเลขโทรศัพท์' },
  { key: 'status', label: 'สถานะ' },
  { key: 'trainingDate', label: 'วันที่อบรม' },
  { key: 'expiryDate', label: 'วันหมดอายุ' },
  { key: 'examScore', label: 'คะแนนสอบ' },
  { key: 'EmployeePicture', label: 'รูปพนักงาน' },
  { key: 'IDCardPicture', label: 'รูปบัตรประชาชน/บัตรต่างด้าว' },
  { key: 'SocialSecurityPicture', label: 'รูปประกันสังคม' },
  { key: 'Certificate', label: 'Certifica' },
])

// Sample Data
const contractors = ref([
  { 
    id: 1, 
    firstName: 'ธันวา', 
    lastName: 'ชัยรัตนานนท์', 
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
    firstName: 'มกรา', 
    lastName: 'ชัยสินรัตน์', 
    idCard: '1-2345-67890-12-3', 
    phone: '081-234-5678', 
    status: 'อนุมัติแล้ว', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard1.jpg', social: null, documents: [] }
  },
  { 
    id: 3, 
    firstName: 'สุราดา', 
    lastName: 'มงคล', 
    idCard: '1-2345-67890-12-3', 
    phone: '081-234-5678', 
    status: 'อนุมัติแล้ว', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard1.jpg', social: null, documents: [] }
  },
  { 
    id: 4, 
    firstName: 'สมหญิง', 
    lastName: 'รักงาน', 
    idCard: '1-2345-67891-12-4', 
    phone: '082-345-6789', 
    status: 'ไม่อนุมัติ', 
    rejectionReason: 'เอกสารไม่ครบ',
    rejectionDetail: 'ขาดใบประกันสังคม และรูปถ่ายไม่ชัดเจน',
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard2.jpg', social: null, documents: [] }
  },
  { 
    id: 5, 
    firstName: 'ชุระนะ', 
    lastName: 'รักงาน', 
    idCard: '1-2345-67891-12-4', 
    phone: '082-345-6789', 
    status: 'ไม่อนุมัติ', 
    rejectionReason: 'อื่นๆ',
    rejectionDetail: 'ข้อมูลบัตรประชาชนไม่ตรงกับฐานข้อมูลราชการ',
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard2.jpg', social: null, documents: [] }
  },
  { 
    id: 6, 
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
    id: 7, 
    firstName: 'พิมพ์ใจ', 
    lastName: 'บุญมี', 
    idCard: '1-4444-44444-44-4', 
    phone: '087-123-4567', 
    status: 'กำลังดำเนินการ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard7.jpg', social: null, documents: [] }
  },
  { 
    id: 8, 
    firstName: 'นิติกร', 
    lastName: 'มั่นคง', 
    idCard: '1-2345-67892-12-5', 
    phone: '083-456-7890', 
    status: 'รอการอนุมัติ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard3.jpg', social: null, documents: [] }
  },
  { 
    id: 9, 
    firstName: 'ศิริพร', 
    lastName: 'ทองแท้', 
    idCard: '1-5555-55555-55-5', 
    phone: '088-234-5678', 
    status: 'รอการอนุมัติ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard8.jpg', social: null, documents: [] }
  },
  { 
    id: 10, 
    firstName: 'กิตติพงศ์', 
    lastName: 'เจริญสุข', 
    idCard: '1-1111-11111-11-1', 
    phone: '084-567-1234', 
    status: 'หมดอายุ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard4.jpg', social: null, documents: [] }
  },
  { 
    id: 11, 
    firstName: 'สุพจน์', 
    lastName: 'วัฒนกิจ', 
    idCard: '1-2222-22222-22-2', 
    phone: '085-678-2345', 
    status: 'หมดอายุ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard5.jpg', social: null, documents: [] }
  },
  { 
    id: 12, 
    firstName: 'อัญชลี', 
    lastName: 'เพชรรัตน์', 
    idCard: '1-3333-33333-33-3', 
    phone: '086-789-3456', 
    status: 'ไม่ผ่าน', 
    failureReason: 'ไม่ผ่านการอบรมพื้นฐานความปลอดภัย',
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard6.jpg', social: null, documents: [] }
  },
  { 
    id: 13, 
    firstName: 'สุพจน์', 
    lastName: 'วัฒนกิจ', 
    idCard: '1-2222-22222-22-2', 
    phone: '085-678-2345',
    status: 'ไม่ผ่าน', 
    failureReason: 'ไม่เข้าร่วมการอบรมการใช้เครื่องจักร',
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard5.jpg', social: null, documents: [] }
  },
  { 
    id: 14, 
    firstName: 'ประหยัด', 
    lastName: 'ทำงาน', 
    idCard: '1-7777-77777-77-7', 
    phone: '087-678-2345', 
    status: 'ไม่ผ่าน', 
    failureReason: 'ไม่ผ่านการอบรมการใช้เครื่องมือ',
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard5.jpg', social: null, documents: [] }
  },
    { 
      id: 15, 
      firstName: 'วิชาญ', 
      lastName: 'กล้าหาญ', 
      idCard: '1-8888-88888-88-8', 
      phone: '089-123-4567', 
      status: 'ไม่อนุมัติ', 
      rejectionReason: 'ไม่อนุมัติ',
      rejectionDetail: 'ผลการตรวจสุขภาพพบว่ามีปัญหาด้านสุขภาพ ไม่สามารถทำงานได้',
      selected: false, 
      isEditing: false,
      originalData: {},
      images: { employee: null, idcard: 'https://example.com/idcard9.jpg', social: null, documents: [] }
    }
  ])


const trainedContractors = ref([
  { 
    id: 1, 
    firstName: 'สมชาย', 
    lastName: 'ใจดี', 
    idCard: '1-1111-11111-11-1', 
    phone: '081-111-1111', 
    status: 'อบรมแล้ว',
    trainingDate: '15/08/2025',
    expiryDate: "-",
    examScore:"80 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  },
  { 
    id: 2, 
    firstName: 'วิภา', 
    lastName: 'สุขใจ', 
    idCard: '1-2222-22222-22-2', 
    phone: '082-222-2222', 
    status: 'อบรมแล้ว',
    trainingDate: '20/08/2025',
    expiryDate: "-",
    examScore:"85 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  },
  { 
    id: 3, 
    firstName: 'ประยุทธ', 
    lastName: 'มั่นคง', 
    idCard: '1-3333-33333-33-3', 
    phone: '083-333-3333', 
    status: 'อบรมแล้ว',
    trainingDate: '17/08/2025',
    expiryDate: "20/08/2026",
    examScore:"95 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  },
  { 
    id: 4, 
    firstName: 'สุนิสา', 
    lastName: 'เรียนรู้', 
    idCard: '1-4444-44444-44-4', 
    phone: '084-444-4444', 
    status: 'อบรมแล้ว',
    trainingDate: '18/08/2025',
    expiryDate: "-",
    examScore:"75 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  },
  { 
    id: 5, 
    firstName: 'วิชิต', 
    lastName: 'ปลอดภัย', 
    idCard: '1-5555-55555-55-5', 
    phone: '085-555-5555', 
    status: 'อบรมแล้ว',
    trainingDate: '19/08/2025',
    expiryDate: "20/08/2026",
    examScore:"85 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  },
  { 
    id: 6, 
    firstName: 'มาลี', 
    lastName: 'ขยันทำงาน', 
    idCard: '1-6666-66666-66-6', 
    phone: '086-666-6666', 
    status: 'อบรมแล้ว',
    trainingDate: '20/08/2025',
    expiryDate: "",
    examScore:"85 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  },
  { 
    id: 7, 
    firstName: 'ณัฐวุฒิ', 
    lastName: 'เก่งกาจ', 
    idCard: '1-7777-77777-77-7', 
    phone: '087-777-7777', 
    status: 'อบรมแล้ว',
    trainingDate: '21/08/2025',
    expiryDate: "",
    examScore:"85 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  },
  { 
    id: 8, 
    firstName: 'สิริรัตน์', 
    lastName: 'ใฝ่รู้', 
    idCard: '1-8888-88888-88-8', 
    phone: '088-888-8888', 
    status: 'อบรมแล้ว',
    trainingDate: '22/08/2025',
    expiryDate: "20/08/2026",
    examScore:"85 % ",
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg', certificate:'https://example.com/certificate1.jpg' }
  }
])


const filteredContractors = computed(() => {
  let filtered = contractors.value
  
  // Apply search filter
  if (searchTerm.value) {
    filtered = filtered.filter(c => 
      ['firstName', 'lastName', 'idCard', 'phone', 'status'].some(field => 
        c[field]?.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    )
  }
  
  // Apply status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(c => c.status === selectedStatus.value)
  }
  
  return filtered
})

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

// Computed for Trained Table
const filteredTrainedContractors = computed(() => 
  !searchTermTrained.value ? trainedContractors.value : 
  trainedContractors.value.filter(c => ['firstName', 'lastName', 'idCard', 'phone'].some(field => 
    c[field]?.toLowerCase().includes(searchTermTrained.value.toLowerCase())
  ))
)

const sortedTrainedContractors = computed(() => {
  if (!sortFieldTrained.value) return filteredTrainedContractors.value
  return [...filteredTrainedContractors.value].sort((a, b) => {
    const aVal = typeof a[sortFieldTrained.value] === 'string' ? a[sortFieldTrained.value].toLowerCase() : a[sortFieldTrained.value]
    const bVal = typeof b[sortFieldTrained.value] === 'string' ? b[sortFieldTrained.value].toLowerCase() : b[sortFieldTrained.value]
    return sortDirectionTrained.value === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })
})

const totalPagesTrained = computed(() => Math.ceil(sortedTrainedContractors.value.length / entriesPerPage.value))
const paginatedTrainedContractors = computed(() => sortedTrainedContractors.value.slice((currentPageTrained.value - 1) * entriesPerPage.value, currentPageTrained.value * entriesPerPage.value))
const startEntryTrained = computed(() => sortedTrainedContractors.value.length === 0 ? 0 : (currentPageTrained.value - 1) * entriesPerPage.value + 1)
const endEntryTrained = computed(() => Math.min(currentPageTrained.value * entriesPerPage.value, sortedTrainedContractors.value.length))
const totalEntriesTrained = computed(() => sortedTrainedContractors.value.length)

const visiblePagesTrained = computed(() => {
  const delta = 2, range = [], rangeWithDots = []
  for (let i = Math.max(2, currentPageTrained.value - delta); i <= Math.min(totalPagesTrained.value - 1, currentPageTrained.value + delta); i++) range.push(i)
  if (currentPageTrained.value - delta > 2) rangeWithDots.push(1, '...'); else rangeWithDots.push(1)
  rangeWithDots.push(...range)
  if (currentPageTrained.value + delta < totalPagesTrained.value - 1) rangeWithDots.push('...', totalPagesTrained.value); else rangeWithDots.push(totalPagesTrained.value)
  return rangeWithDots.filter(() => totalPagesTrained.value > 1)
})

// Methods
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

const sortBy = (field) => {
  if (['choose', 'actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'Certificate'].includes(field)) return
  if (sortField.value === field) sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  else { sortField.value = field; sortDirection.value = 'asc' }
}

const sortByTrained = (field) => {
  if (['choose', 'actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'Certificate'].includes(field)) return
  if (sortFieldTrained.value === field) sortDirectionTrained.value = sortDirectionTrained.value === 'asc' ? 'desc' : 'asc'
  else { sortFieldTrained.value = field; sortDirectionTrained.value = 'asc' }
}

const handleImageUpload = (event, contractor, type) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => contractor.images[type] = e.target.result
    reader.readAsDataURL(file)
  }
}

const editContractor = (contractor) => {
  contractor.originalData = {
    firstName: contractor.firstName,
    lastName: contractor.lastName,
    idCard: contractor.idCard
  }
  contractor.isEditing = true
}

const saveContractor = (contractor) => {
  if (!contractor.firstName.trim() || !contractor.lastName.trim() || !contractor.idCard.trim()) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }
  
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
  contractor.firstName = contractor.originalData.firstName
  contractor.lastName = contractor.originalData.lastName
  contractor.idCard = contractor.originalData.idCard
  contractor.isEditing = false
  contractor.originalData = {}
}

const deleteContractor = (contractor) => {
  if (confirm(`คุณต้องการลบพนักงาน ${contractor.firstName} ${contractor.lastName} หรือไม่?`)) {
    const index = contractors.value.findIndex(c => c.id === contractor.id)
    if (index !== -1) contractors.value.splice(index, 1)
  }
}

const addCertificate = (contractor) => console.log('Add certificate:', contractor)

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
.bg-green-25 { 
  background-color: #f0fdf4; 
}
.min-w-\[1200px\] { 
  min-width: 1200px; 
}
</style>