<template>
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
            :value="searchTermTrained" 
            @input="$emit('update:searchTermTrained', $event.target.value)"
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
            <th v-for="header in trainedHeaders" :key="header.key" @click="handleSort(header.key)" 
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
          <tr v-for="(contractor, index) in paginatedTrainedContractors" :key="contractor.id" 
              :class="index % 2 === 0 ? 'bg-green-25' : 'bg-white'" class="hover:bg-green-100 transition-colors border-b border-gray-100">
            
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

            <!-- Training Info -->
            <td class="px-3 py-4 text-sm text-gray-700">{{ contractor.trainingDate }}</td>
            <td class="px-3 py-4 text-sm text-gray-700">{{ contractor.expiryDate || '-' }}</td>
            <td class="px-3 py-4 text-sm text-gray-700">{{ contractor.examScore || '-' }}</td>
            
            <!-- Image Display (View Only) -->
            <td v-for="imageType in ['employee', 'idcard', 'social','certificate']" :key="imageType" class="px-2 py-2 text-center">
              <div class="flex justify-center">
                <button v-if="contractor.images[imageType]" 
                        @click="openImageInNewTab(contractor.images[imageType], getImageText(imageType))" 
                        :class="getImageLinkClass(imageType)" 
                        class="text-xs flex items-center hover:underline">
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
    <TablePagination
      :current-page="currentPageTrained"
      :total-pages="totalPagesTrained"
      :start-entry="startEntryTrained"
      :end-entry="endEntryTrained"
      :total-entries="totalEntriesTrained"
      @update:current-page="$emit('update:currentPageTrained', $event)"
      class="bg-green-50"
    />
  </div>
</template>

<script setup>
import TablePagination from './TablePagination.vue'

// Props
const props = defineProps({
  trainedContractors: Array,
  trainedHeaders: Array,
  paginatedTrainedContractors: Array,
  searchTermTrained: String,
  currentPageTrained: Number,
  totalPagesTrained: Number,
  startEntryTrained: Number,
  endEntryTrained: Number,
  totalEntriesTrained: Number,
  sortFieldTrained: String,
  sortDirectionTrained: String
})

// Emits
const emit = defineEmits([
  'update:searchTermTrained',
  'update:currentPageTrained',
  'sort-trained'
])

// Methods
const handleSort = (field) => {
  emit('sort-trained', field)
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
  return props.sortFieldTrained !== field ? 'text-gray-400' : 
    (props.sortDirectionTrained === 'asc' ? 'fa-sort-up text-green-600' : 'fa-sort-down text-green-600')
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

<style scoped>
.bg-green-25 { 
  background-color: #f0fdf4; 
}
.min-w-\[1200px\] { 
  min-width: 1200px; 
}
</style>