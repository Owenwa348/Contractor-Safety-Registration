<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <!-- Search Controls -->
    <div class="p-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between gap-3">
      <div class="flex items-center space-x-3">
        <span class="text-sm font-medium text-gray-700">ค้นหาข้อมูล:</span>
        <div class="relative">
          <input 
            :value="searchTerm" 
            @input="$emit('update:searchTerm', $event.target.value)"
            type="text" 
            placeholder="พิมพ์เพื่อค้นหา..." 
            class="border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-colors w-64 bg-white" 
          />
          <i class="fas fa-search absolute left-3 top-1/2 transform 
                     -translate-y-1/2 text-gray-400 text-sm"></i>
        </div>
      </div>

      <!-- Status Filter -->
      <div class="flex items-center space-x-3">
        <span class="text-sm font-medium text-gray-700">กรองตามสถานะ:</span>
        <select 
          :value="selectedStatus"
          @change="$emit('update:selectedStatus', $event.target.value)"
          class="border border-gray-300 rounded-lg px-4 py-2 text-sm 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="">ทั้งหมด</option>
          <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
          <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
          <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
          <option value="รอการอนุมัติ">รอการอนุมัติ</option>
          <option value="หมดอายุ">หมดอายุ</option>
          <option value="ไม่ผ่าน">ไม่ผ่าน</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1200px]">
        <thead class="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 sticky top-0">
          <tr>
            <th v-for="header in headers" :key="header.key" @click="handleSort(header.key)" 
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
          <ContractorRow 
            v-for="(contractor, index) in paginatedContractors" 
            :key="contractor.id"
            :contractor="contractor"
            :index="index"
            @image-upload="handleImageUpload"
            @edit="editContractor"
            @save="saveContractor"
            @cancel="cancelEdit"
            @delete="deleteContractor"
            @add-certificate="addCertificate"
          />

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
    <TablePagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :start-entry="startEntry"
      :end-entry="endEntry"
      :total-entries="totalEntries"
      @update:current-page="$emit('update:currentPage', $event)"
    />

    <!-- Submit Button -->
    <div class="px-6 py-4 border-t bg-gray-50">
      <button 
        @click="$emit('submit')"
        :disabled="selectedContractors.length === 0"
        class="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-sm transition-colors">
        <i class="fas fa-paper-plane mr-3"></i>
        ยื่นยันการส่ง ({{ selectedContractors.length }} รายการ)
      </button>
    </div>
  </div>
</template>

<script setup>
import ContractorRow from './ContractorRow.vue'
import TablePagination from './TablePagination.vue'

// Props
const props = defineProps({
  contractors: Array,
  headers: Array,
  paginatedContractors: Array,
  selectedContractors: Array,
  searchTerm: String,
  selectedStatus: String,
  currentPage: Number,
  totalPages: Number,
  startEntry: Number,
  endEntry: Number,
  totalEntries: Number,
  sortField: String,
  sortDirection: String
})

// Emits
const emit = defineEmits([
  'update:searchTerm',
  'update:selectedStatus', 
  'update:currentPage',
  'sort',
  'image-upload',
  'edit',
  'save',
  'cancel',
  'delete',
  'add-certificate',
  'submit'
])

// Methods
const handleSort = (field) => {
  emit('sort', field)
}

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

const getSortIcon = (field) => {
  return props.sortField !== field ? 'text-gray-400' : 
    (props.sortDirection === 'asc' ? 'fa-sort-up text-blue-600' : 'fa-sort-down text-blue-600')
}

// Proxy methods
const handleImageUpload = (event, contractor, type) => {
  emit('image-upload', event, contractor, type)
}

const editContractor = (contractor) => {
  emit('edit', contractor)
}

const saveContractor = (contractor) => {
  emit('save', contractor)
}

const cancelEdit = (contractor) => {
  emit('cancel', contractor)
}

const deleteContractor = (contractor) => {
  emit('delete', contractor)
}

const addCertificate = (contractor) => {
  emit('add-certificate', contractor)
}
</script>