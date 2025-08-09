<template>
  <div class="bg-gray-50 min-h-screen lg:p-2">
    <div class="max-w-7xl mx-auto ">
      <!-- Header Section -->
      <div class="p-6 bg-white rounded-lg shadow-sm mb-6 border border-gray-100">
        <div class="flex items-center mb-4">
          <div>
            <h1 class="text-2xl font-semibold text-gray-800">
              จัดการรายชื่อพนักงานตามสังกัด
            </h1>
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <router-link
            to="/add-contractor"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm flex items-center no-underline shadow-sm transition-colors duration-200"
          >
            <i class="fas fa-plus mr-2"></i>
            เพิ่มพนักงาน
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-3 bg-white rounded-lg shadow-sm p-6">
        <!-- Table Controls -->
        <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50">
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-700">แสดง</span>
            <select
              v-model.number="entriesPerPage"
              @change="updatePagination"
              class="border border-gray-300 bg-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
            <span class="text-sm text-gray-700">รายการ</span>
          </div>

          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-700">ค้นหา:</span>
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="พิมพ์เพื่อค้นหา..."
                class="border border-gray-300 bg-white rounded px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
              />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>

        <!-- Scrollable Table Container - ปรับปรุงส่วนนี้ -->
        <div class="overflow-x-auto" >
          <div class="min-w-full">
            <table class="w-full table-auto">
              <thead class="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 sticky top-0 z-10">
                <tr>
                  <th
                    v-for="header in headers"
                    :key="header.key"
                    @click="sortBy(header.key)"
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 transition-colors duration-150 whitespace-nowrap"
                    :class="{
                      'text-center': [
                        'actions',
                        'EmployeePicture',
                        'IDCardPicture',
                        'SocialSecurityPicture',
                        'VariousDocuments',
                        'Certificate',
                      ].includes(header.key),
                      'cursor-default': [
                        'actions',
                        'EmployeePicture',
                        'IDCardPicture',
                        'SocialSecurityPicture',
                        'VariousDocuments',
                        'Certificate',
                      ].includes(header.key),
                      'min-w-[120px]': ['id', 'firstName', 'lastName'].includes(header.key),
                      'min-w-[180px]': header.key === 'idCard',
                      'min-w-[140px]': header.key === 'phone',
                      'min-w-[130px]': header.key === 'status',
                      'min-w-[150px]': [
                        'EmployeePicture',
                        'IDCardPicture',
                        'SocialSecurityPicture',
                      ].includes(header.key),
                      'min-w-[170px]': header.key === 'VariousDocuments',
                      'min-w-[140px]': header.key === 'Certificate',
                      'min-w-[200px]': header.key === 'actions',
                    }"
                  >
                    <div
                      class="flex items-center"
                      :class="{
                        'justify-center': [
                          'actions',
                          'EmployeePicture',
                          'IDCardPicture',
                          'SocialSecurityPicture',
                          'VariousDocuments',
                          'Certificate',
                        ].includes(header.key),
                      }"
                    >
                      <span>{{ header.label }}</span>
                      <i
                        v-if="
                          ![
                            'actions',
                            'EmployeePicture',
                            'IDCardPicture',
                            'SocialSecurityPicture',
                            'VariousDocuments',
                            'Certificate',
                          ].includes(header.key)
                        "
                        class="fas fa-sort ml-2 text-gray-400"
                        :class="getSortIcon(header.key)"
                      ></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(contractor, index) in paginatedContractors"
                  :key="contractor.id"
                  class="hover:bg-gray-50 transition-colors duration-150"
                  :class="{ 'bg-gray-25': index % 2 === 0 }"
                >
                  <td class="px-4 py-4 text-sm text-gray-900">{{ contractor.id }}</td>
                  <td class="px-4 py-4 text-sm font-medium text-gray-900">
                    {{ contractor.firstName }}
                  </td>
                  <td class="px-4 py-4 text-sm font-medium text-gray-900">
                    {{ contractor.lastName }}
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-700 font-mono">
                    {{ contractor.idCard }}
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-900">
                    <a
                      :href="`tel:${contractor.phone}`"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      {{ contractor.phone }}
                    </a>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span
                      class="inline-flex px-3 py-1 rounded-full text-xs font-medium"
                      :class="getStatusStyle(contractor.status)"
                    >
                      {{ contractor.status }}
                    </span>
                  </td>
                  <!-- Image Upload Columns -->
                  <td class="px-4 py-4 text-center">
                    <div class="flex flex-col items-center space-y-2">
                      <div v-if="contractor.images.employee" class="relative">
                        <img
                          :src="contractor.images.employee"
                          alt="รูปพนักงาน"
                          class="w-16 h-16 object-cover rounded-lg border-2 border-green-200"
                        />
                        <button
                          @click="removeImage(contractor, 'employee')"
                          class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                      <label class="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          class="hidden"
                          @change="handleImageUpload($event, contractor, 'employee')"
                        />
                        <div
                          class="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-xs border border-green-300 transition-colors duration-200 flex items-center"
                        >
                          <i class="fas fa-camera mr-1"></i>
                          {{ contractor.images.employee ? "เปลี่ยน" : "อัพโหลด" }}
                        </div>
                      </label>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <div class="flex flex-col items-center space-y-2">
                      <div v-if="contractor.images.idcard" class="relative">
                        <img
                          :src="contractor.images.idcard"
                          alt="รูปบัตรประชาชน"
                          class="w-16 h-16 object-cover rounded-lg border-2 border-yellow-200"
                        />
                        <button
                          @click="removeImage(contractor, 'idcard')"
                          class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                      <label class="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          class="hidden"
                          @change="handleImageUpload($event, contractor, 'idcard')"
                        />
                        <div
                          class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg text-xs border border-yellow-300 transition-colors duration-200 flex items-center"
                        >
                          <i class="fas fa-id-card mr-1"></i>
                          {{ contractor.images.idcard ? "เปลี่ยน" : "อัพโหลด" }}
                        </div>
                      </label>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <div class="flex flex-col items-center space-y-2">
                      <div v-if="contractor.images.social" class="relative">
                        <img
                          :src="contractor.images.social"
                          alt="รูปประกันสังคม"
                          class="w-16 h-16 object-cover rounded-lg border-2 border-purple-200"
                        />
                        <button
                          @click="removeImage(contractor, 'social')"
                          class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                      <label class="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          class="hidden"
                          @change="handleImageUpload($event, contractor, 'social')"
                        />
                        <div
                          class="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg text-xs border border-purple-300 transition-colors duration-200 flex items-center"
                        >
                          <i class="fas fa-shield-alt mr-1"></i>
                          {{ contractor.images.social ? "เปลี่ยน" : "อัพโหลด" }}
                        </div>
                      </label>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <div class="flex flex-col items-center space-y-2">
                      <div
                        v-if="contractor.images.documents.length > 0"
                        class="flex flex-wrap gap-1 justify-center max-w-20"
                      >
                        <div
                          v-for="(doc, index) in contractor.images.documents"
                          :key="index"
                          class="relative"
                        >
                          <img
                            :src="doc"
                            :alt="`เอกสารประกอบ ${index + 1}`"
                            class="w-12 h-12 object-cover rounded border border-orange-200"
                          />
                          <button
                            @click="removeDocument(contractor, index)"
                            class="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                      <label class="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          class="hidden"
                          @change="handleDocumentUpload($event, contractor)"
                        />
                        <div
                          class="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 rounded-lg text-xs border border-orange-300 transition-colors duration-200 flex items-center"
                        >
                          <i class="fas fa-file-alt mr-1"></i>
                          อัพโหลด
                        </div>
                      </label>
                      <div class="text-xs text-gray-500">
                        ({{ contractor.images.documents.length }} ไฟล์)
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <button
                      @click="addCertificate(contractor)"
                      class="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-2 rounded-lg text-xs border border-indigo-300 transition-colors duration-200 flex items-center mx-auto"
                    >
                      <i class="fas fa-certificate mr-1"></i>
                      เพิ่มข้อมูล
                    </button>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <div class="flex justify-center space-x-2">
                      <button
                        @click="editContractor(contractor)"
                        class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs border border-blue-300 transition-colors duration-200"
                      >
                        <i class="fas fa-edit mr-1"></i>
                        แก้ไข
                      </button>
                      <button
                        @click="deleteContractor(contractor)"
                        class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs border border-red-300 transition-colors duration-200"
                      >
                        <i class="fas fa-trash mr-1"></i>
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>

                <tr v-if="paginatedContractors.length === 0">
                  <td colspan="12" class="px-6 py-12 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                      <div class="font-medium text-lg mb-2">ไม่พบข้อมูลที่ค้นหา</div>
                      <div class="text-sm">ลองเปลี่ยนคำค้นหาหรือเคลียร์ตัวกรอง</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination - ย้ายออกมาจาก scroll container -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div class="text-sm text-gray-600 order-2 lg:order-1">
              แสดง {{ startEntry }} ถึง {{ endEntry }} จาก {{ totalEntries }} รายการ
            </div>
            
            <!-- Pagination Controls - แยกออกมาเป็นส่วนตัว -->
            <div class="flex items-center space-x-2 order-1 lg:order-2">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white transition-colors duration-200"
              >
                <i class="fas fa-chevron-left mr-1"></i>
                ก่อนหน้า
              </button>
              
              <div class="flex space-x-1 flex-wrap">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  class="px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                  :class="
                    page === currentPage
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  "
                >
                  {{ page }}
                </button>
              </div>
              
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white transition-colors duration-200"
              >
                ถัดไป
                <i class="fas fa-chevron-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const entriesPerPage = ref(10)
const searchTerm = ref('')
const currentPage = ref(1)
const sortField = ref('')
const sortDirection = ref('asc')

// Sample data
const contractors = ref([
  {
    id: 1,
    firstName: 'สมชาย',
    lastName: 'ใจดี', 
    idCard: '1-2345-67890-12-3',
    phone: '081-234-5678',
    status: 'ใช้งานอยู่',
    images: {
      employee: null,
      idcard: null,
      social: null,
      documents: []
    }
  },
  {
    id: 2,
    firstName: 'สมหญิง',
    lastName: 'รักงาน',
    idCard: '1-2345-67891-12-4', 
    phone: '082-345-6789',
    status: 'ระงับการใช้งาน',
    images: {
      employee: null,
      idcard: null,
      social: null,
      documents: []
    }
  }
])

const headers = ref([
  { key: 'id', label: 'เบอร์สกิล' },
  { key: 'firstName', label: 'สกานะ' },
  { key: 'lastName', label: 'รุบนักวาน' },
  { key: 'idCard', label: 'รุบนัตระปราชาน' },
  { key: 'phone', label: 'รุบปะกับสังคม' },
  { key: 'status', label: 'เอกสารประกอบ' },
  { key: 'EmployeePicture', label: 'ใบรัันรอง' },
  { key: 'IDCardPicture', label: 'รูปบัตรประชาชน' },
  { key: 'SocialSecurityPicture', label: 'รูปประกันสังคม' },
  { key: 'VariousDocuments', label: 'เอกสารประกอบ' },
  { key: 'Certificate', label: 'ใบรัันรอง' },
  { key: 'actions', label: 'การดำเนินการ' }
])

// Computed properties
const filteredContractors = computed(() => {
  if (!searchTerm.value) return contractors.value
  
  return contractors.value.filter(contractor => {
    return Object.values(contractor).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.value.toLowerCase())
      }
      return false
    })
  })
})

const sortedContractors = computed(() => {
  if (!sortField.value) return filteredContractors.value
  
  return [...filteredContractors.value].sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]
    
    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()
    
    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => {
  return Math.ceil(sortedContractors.value.length / entriesPerPage.value)
})

const paginatedContractors = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage.value
  const end = start + entriesPerPage.value
  return sortedContractors.value.slice(start, end)
})

const startEntry = computed(() => {
  return (currentPage.value - 1) * entriesPerPage.value + 1
})

const endEntry = computed(() => {
  return Math.min(currentPage.value * entriesPerPage.value, sortedContractors.value.length)
})

const totalEntries = computed(() => {
  return sortedContractors.value.length
})

const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = Math.max(2, currentPage.value - delta); 
       i <= Math.min(totalPages.value - 1, currentPage.value + delta); 
       i++) {
    range.push(i)
  }

  if (currentPage.value - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (currentPage.value + delta < totalPages.value - 1) {
    rangeWithDots.push('...', totalPages.value)
  } else {
    rangeWithDots.push(totalPages.value)
  }

  return rangeWithDots.filter(page => totalPages.value > 1)
})

// Methods
const sortBy = (field) => {
  if (['actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'VariousDocuments', 'Certificate'].includes(field)) {
    return
  }
  
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (field) => {
  if (sortField.value !== field) return 'fa-sort'
  return sortDirection.value === 'asc' ? 'fa-sort-up text-blue-600' : 'fa-sort-down text-blue-600'
}

const getStatusStyle = (status) => {
  return status === 'ใช้งานอยู่' 
    ? 'bg-green-100 text-green-800 border border-green-200'
    : 'bg-red-100 text-red-800 border border-red-200'
}

const updatePagination = () => {
  currentPage.value = 1
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}

// Image handling methods
const handleImageUpload = (event, contractor, type) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      contractor.images[type] = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = (contractor, type) => {
  contractor.images[type] = null
}

const handleDocumentUpload = (event, contractor) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      contractor.images.documents.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeDocument = (contractor, index) => {
  contractor.images.documents.splice(index, 1)
}

// Action methods
const editContractor = (contractor) => {
  console.log('Edit contractor:', contractor)
  // Implement edit logic
}

const deleteContractor = (contractor) => {
  console.log('Delete contractor:', contractor)
  // Implement delete logic
}

const addCertificate = (contractor) => {
  console.log('Add certificate for:', contractor)
  // Implement certificate logic
}
</script>

<style scoped>
/* Custom styles if needed */
.bg-gray-25 {
  background-color: #fafafa;
}

/* Smooth scrolling for horizontal scroll */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>