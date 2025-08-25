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

      <!-- First Table - Original Contractors -->
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

      <!-- Second Table - Trained Contractors -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Header for Trained Table -->
        <div class="p-4 border-b bg-green-50">
          <div class="flex items-center">
            <i class="fas fa-graduation-cap text-green-600 text-xl mr-3"></i>
            <h2 class="text-lg font-semibold text-gray-800">รายชื่อพนักงานอบรมแล้ว</h2>
          </div>
        </div>

        <!-- Search Controls for Trained -->
        <div class="p-4 border-b bg-green-50 flex flex-col sm:flex-row justify-between gap-3">
          <div class="flex items-center space-x-3">
            <span class="text-sm font-medium text-gray-700">ค้นหาข้อมูลพนักงานอบรมแล้ว:</span>
            <div class="relative">
              <input 
                v-model="searchTermTrained" 
                type="text" 
                placeholder="พิมพ์เพื่อค้นหา..." 
                class="border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors w-64 bg-white" 
              />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            </div>
          </div>
        </div>

        <!-- Trained Table -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1200px]">
            <thead class="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 sticky top-0">
              <tr>
                <th v-for="header in trainedHeaders" :key="header.key" @click="sortByTrained(header.key)" 
                    :class="getHeaderClass(header.key)" class="px-3 py-4 text-xs font-semibold uppercase tracking-wider transition-colors">
                  <div :class="header.key.includes('Picture') || ['choose', 'actions', 'Certificate'].includes(header.key) ? 'justify-center' : ''" class="flex items-center">
                    <span>{{ header.label }}</span>
                    <i v-if="!['choose', 'actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'Certificate'].includes(header.key)" 
                       :class="getSortIconTrained(header.key)" class="fas fa-sort ml-2 text-sm"></i>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(contractor, index) in paginatedTrainedContractors" :key="contractor.id" 
                  :class="index % 2 === 0 ? 'bg-green-25' : 'bg-white'" class="hover:bg-green-100 transition-colors border-b border-gray-100">
                
                <!-- Checkbox -->
                <td class="px-3 py-4 text-center">
                  <input type="checkbox" v-model="contractor.selected" class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                </td>
                
                <!-- Basic Info -->
                <td class="px-3 py-4 text-sm text-gray-900 font-medium">{{ contractor.id }}</td>
                <td class="px-3 py-4 text-sm font-medium text-gray-900">{{ contractor.firstName }}</td>
                <td class="px-3 py-4 text-sm font-medium text-gray-900">{{ contractor.lastName }}</td>
                <td class="px-3 py-4 text-sm text-gray-700 font-mono">{{ contractor.idCard }}</td>
                <td class="px-3 py-4 text-sm text-gray-700">{{ contractor.phone }}</td>
                
                <!-- Status -->
                <td class="px-2 py-2 text-center">
                  <span class="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    อบรมแล้ว
                  </span>
                </td>

                <!-- Training Date -->
                <td class="px-3 py-4 text-sm text-gray-700">{{ contractor.trainingDate }}</td>
                
                <!-- Image Display (View Only) -->
                <td v-for="imageType in ['employee', 'idcard', 'social']" :key="imageType" class="px-2 py-2 text-center">
                  <div class="flex justify-center">
                    <button v-if="contractor.images[imageType]" @click="openImageInNewTab(contractor.images[imageType], getImageText(imageType))" :class="getImageLinkClass(imageType)" class="text-xs flex items-center hover:underline">
                      <i :class="getImageIcon(imageType)" class="mr-1"></i>
                      {{ getImageText(imageType) }}
                    </button>
                    <span v-else class="text-gray-400 text-xs">-</span>
                  </div>
                </td>
              </tr>

              <!-- No Data for Trained -->
              <tr v-if="paginatedTrainedContractors.length === 0">
                <td colspan="13" class="px-4 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <i class="fas fa-graduation-cap text-3xl text-gray-300 mb-3"></i>
                    <div class="font-medium text-lg mb-2">ไม่พบข้อมูลพนักงานอบรมแล้ว</div>
                    <div class="text-sm">ลองเปลี่ยนคำค้นหา</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination for Trained -->
        <div class="px-6 py-4 border-t bg-green-50 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-600">
            แสดง {{ startEntryTrained }} ถึง {{ endEntryTrained }} จาก {{ totalEntriesTrained }} รายการ
          </div>
          <div class="flex items-center space-x-2">
            <button @click="currentPageTrained > 1 && currentPageTrained--" :disabled="currentPageTrained === 1" 
                    class="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <i class="fas fa-chevron-left mr-2"></i>ก่อนหน้า
            </button>
            <div class="flex space-x-1">
              <button v-for="page in visiblePagesTrained" :key="page" @click="typeof page === 'number' && (currentPageTrained = page)"
                      :class="page === currentPageTrained ? 'bg-green-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'"
                      class="px-3 py-2 rounded text-sm transition-colors">
                {{ page }}
              </button>
            </div>
            <button @click="currentPageTrained < totalPagesTrained && currentPageTrained++" :disabled="currentPageTrained === totalPagesTrained"
                    class="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              ถัดไป<i class="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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

// Sample supervisors data
const supervisors = ref([
  { id: 1, name: 'นายมนสม หัวหน้า', department: 'แผนกก่อสร้าง' },
  { id: 2, name: 'นางสาวปานี หัวหน้า', department: 'แผนกควบคุมคุณภาพ' },
  { id: 3, name: 'นายวิรง หัวหน้า', department: 'แผนกความปลอดภัย' }
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
  { key: 'choose', label: 'เลือก' },
  { key: 'id', label: 'ลำดับ' },
  { key: 'firstName', label: 'ชื่อ' },
  { key: 'lastName', label: 'นามสกุล' },
  { key: 'idCard', label: 'รหัสบัตรประชาชน' },
  { key: 'phone', label: 'หมายเลขโทรศัพท์' },
  { key: 'status', label: 'สถานะ' },
  { key: 'trainingDate', label: 'วันที่อบรม' },
  { key: 'EmployeePicture', label: 'รูปพนักงาน' },
  { key: 'IDCardPicture', label: 'รูปบัตรประชาชน/บัตรต่างด้าว' },
  { key: 'SocialSecurityPicture', label: 'รูปประกันสังคม' },
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
    status: 'หมดอายุ', 
    selected: false, 
    isEditing: false,
    originalData: {},
    images: { employee: null, idcard: 'https://example.com/idcard6.jpg', social: null, documents: [] }
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
    selected: false,
    images: { employee: 'https://example.com/emp1.jpg', idcard: 'https://example.com/idcard1.jpg', social: 'https://example.com/social1.jpg' }
  },
  { 
    id: 2, 
    firstName: 'วิภา', 
    lastName: 'สุขใจ', 
    idCard: '1-2222-22222-22-2', 
    phone: '082-222-2222', 
    status: 'อบรมแล้ว',
    trainingDate: '16/08/2025',
    selected: false,
    images: { employee: 'https://example.com/emp2.jpg', idcard: 'https://example.com/idcard2.jpg', social: 'https://example.com/social2.jpg' }
  },
  { 
    id: 3, 
    firstName: 'ประยุทธ', 
    lastName: 'มั่นคง', 
    idCard: '1-3333-33333-33-3', 
    phone: '083-333-3333', 
    status: 'อบรมแล้ว',
    trainingDate: '17/08/2025',
    selected: false,
    images: { employee: 'https://example.com/emp3.jpg', idcard: 'https://example.com/idcard3.jpg', social: 'https://example.com/social3.jpg' }
  },
  { 
    id: 4, 
    firstName: 'สุนิสา', 
    lastName: 'เรียนรู้', 
    idCard: '1-4444-44444-44-4', 
    phone: '084-444-4444', 
    status: 'อบรมแล้ว',
    trainingDate: '18/08/2025',
    selected: false,
    images: { employee: 'https://example.com/emp4.jpg', idcard: 'https://example.com/idcard4.jpg', social: 'https://example.com/social4.jpg' }
  },
  { 
    id: 5, 
    firstName: 'วิชิต', 
    lastName: 'ปลอดภัย', 
    idCard: '1-5555-55555-55-5', 
    phone: '085-555-5555', 
    status: 'อบรมแล้ว',
    trainingDate: '19/08/2025',
    selected: false,
    images: { employee: 'https://example.com/emp5.jpg', idcard: 'https://example.com/idcard5.jpg', social: 'https://example.com/social5.jpg' }
  },
  { 
    id: 6, 
    firstName: 'มาลี', 
    lastName: 'ขยันทำงาน', 
    idCard: '1-6666-66666-66-6', 
    phone: '086-666-6666', 
    status: 'อบรมแล้ว',
    trainingDate: '20/08/2025',
    selected: false,
    images: { employee: 'https://example.com/emp6.jpg', idcard: 'https://example.com/idcard6.jpg', social: 'https://example.com/social6.jpg' }
  },
  { 
    id: 7, 
    firstName: 'ณัฐวุฒิ', 
    lastName: 'เก่งกาจ', 
    idCard: '1-7777-77777-77-7', 
    phone: '087-777-7777', 
    status: 'อบรมแล้ว',
    trainingDate: '21/08/2025',
    selected: false,
    images: { employee: 'https://example.com/emp7.jpg', idcard: 'https://example.com/idcard7.jpg', social: 'https://example.com/social7.jpg' }
  },
  { 
    id: 8, 
    firstName: 'สิริรัตน์', 
    lastName: 'ใฝ่รู้', 
    idCard: '1-8888-88888-88-8', 
    phone: '088-888-8888', 
    status: 'อบรมแล้ว',
    trainingDate: '22/08/2025',
    selected: false,
    images: { employee: 'https://example.com/emp8.jpg', idcard: 'https://example.com/idcard8.jpg', social: 'https://example.com/social8.jpg' }
  }
])


const filteredContractors = computed(() => 
  !searchTerm.value ? contractors.value : 
  contractors.value.filter(c => ['firstName', 'lastName', 'idCard', 'phone', 'status'].some(field => 
    c[field]?.toLowerCase().includes(searchTerm.value.toLowerCase())
  ))
)

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
const selectedTrainedContractors = computed(() => trainedContractors.value.filter(c => c.selected))

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

const getSortIcon = (field) => sortField.value !== field ? 'text-gray-400' : (sortDirection.value === 'asc' ? 'fa-sort-up text-blue-600' : 'fa-sort-down text-blue-600')

const getSortIconTrained = (field) => sortFieldTrained.value !== field ? 'text-gray-400' : (sortDirectionTrained.value === 'asc' ? 'fa-sort-up text-green-600' : 'fa-sort-down text-green-600')

const getHeaderClass = (key) => {
  const baseClass = 'text-left cursor-pointer'
  const nonSortable = ['choose', 'actions', 'EmployeePicture', 'IDCardPicture', 'SocialSecurityPicture', 'Certificate']
  const centerClass = nonSortable.includes(key) ? 'text-center cursor-default' : ''
  const widthClass = {
    'choose': 'min-w-[60px]', 'id': 'min-w-[60px]', 'firstName': 'min-w-[80px]', 'lastName': 'min-w-[80px]',
    'idCard': 'min-w-[120px]', 'phone': 'min-w-[100px]', 'status': 'min-w-[80px]',
    'trainingDate': 'min-w-[100px]', 'EmployeePicture': 'min-w-[80px]', 'IDCardPicture': 'min-w-[80px]', 'SocialSecurityPicture': 'min-w-[80px]',
    'Certificate': 'min-w-[80px]', 'actions': 'min-w-[150px]'
  }[key] || ''
  return `${baseClass} ${centerClass} ${widthClass}`
}

const getStatusClass = (status) => ({
  'อนุมัติแล้ว': 'bg-green-100 text-green-800',
  'ไม่อนุมัติ': 'bg-red-100 text-red-800',
  'รอการอนุมัติ': 'bg-yellow-100 text-yellow-800',
  'กำลังดำเนินการ': 'bg-yellow-100 text-yellow-800',
  'หมดอายุ': 'bg-gray-100 text-gray-800',
  'อบรมแล้ว': 'bg-green-100 text-green-800'
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

const handleImageUpload = (event, contractor, type) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => contractor.images[type] = e.target.result
    reader.readAsDataURL(file)
  }
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