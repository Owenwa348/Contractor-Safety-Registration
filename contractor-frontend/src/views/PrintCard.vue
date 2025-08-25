<template>
  <div class="min-h-screen from-blue-50 to-indigo-100">
    <!-- Preview Mode -->
    <div v-if="showPreview" class="max-w-5xl mx-auto p-6 print:p-0 print:max-w-none">
      <!-- Control Panel - Hidden in Print -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6 print:hidden">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">ตัวอย่างบัตรพนักงาน</h2>
            <p class="text-gray-600">ตรวจสอบข้อมูลก่อนพิมพ์</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="printCards"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <PrinterIcon class="w-5 h-5" />
              พิมพ์บัตร
            </button>
            <button
              @click="showPreview = false"
              class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              กลับ
            </button>
          </div>
        </div>
      </div>

      <!-- Cards Grid - Print Only This Section -->
      <div class="print-area grid grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
        <div
          v-for="contractor in selectedContractorData"
          :key="contractor.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300 print:page-break-inside-avoid print:rounded-none"
        >
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center print:p-4">
            <h3 class="text-xl font-bold">บัตรพนักงาน</h3>
            <p class="text-blue-100 text-sm mt-1">EMPLOYEE CARD</p>
          </div>

          <!-- Card Body -->
          <div class="p-6 print:p-4">
            <div class="flex gap-6 print:gap-4">
              <!-- Photo Section -->
              <div class="flex-shrink-0">
                <div class="w-24 h-32 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                  <UserIcon class="w-12 h-12 text-gray-400" />
                </div>
              </div>

              <!-- Info Section -->
              <div class="flex-1 space-y-4">
                <!-- Name & Position -->
                <div class="border-b border-gray-100 pb-3">
                  <h4 class="text-xl font-bold text-gray-800">{{ contractor.name }}</h4>
                  <p class="text-gray-600 font-medium">{{ contractor.position }}</p>
                </div>

                <!-- Contact Info -->
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm">
                    <BuildingIcon class="w-4 h-4 text-blue-600" />
                    <span class="text-gray-700">{{ contractor.company }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <PhoneIcon class="w-4 h-4 text-green-600" />
                    <span class="text-gray-700">{{ contractor.phone }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <AwardIcon class="w-4 h-4 text-purple-600" />
                    <span class="text-gray-700">{{ contractor.trainingType }}</span>
                  </div>
                </div>

                <!-- Date Info -->
                <div class="bg-gray-50 rounded-lg p-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="text-gray-600 font-medium">วันที่ออกบัตร</p>
                    <p class="text-gray-800 font-semibold">{{ currentDateThai }}</p>
                  </div>
                  <div>
                    <p class="text-red-600 font-medium">วันหมดอายุ</p>
                    <p class="text-red-700 font-bold">{{ expiryDate }}</p>
                  </div>
                </div>
              </div>

              <!-- QR Code Section -->
              <div class="flex-shrink-0">
                <div class="w-20 h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center">
                      <span class="text-xs text-gray-500 font-mono">QR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 print:px-4 print:py-3">
            <div class="flex justify-between items-center text-sm">
              <span class="font-semibold text-gray-700">
                รหัสบัตร: EMP-{{ String(contractor.id).padStart(4, '0') }}
              </span>
              <span class="text-gray-600 bg-gray-200 px-2 py-1 rounded-full text-xs">
                อายุบัตร {{ validityPeriod }} {{ validityPeriod === '0.5' ? 'เดือน' : 'ปี' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main View -->
    <div v-else class="max-w-7xl mx-auto p-6">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">พิมพ์บัตรพนักงาน</h1>
          <p class="text-gray-600">เลือกรายชื่อพนักงานที่ผ่านการอบรมแล้วและกำหนดระยะเวลาการใช้งานบัตร</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Control Panel -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 space-y-6 sticky top-6">
            <h3 class="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">ตัวเลือก</h3>
            
            <!-- Search Box -->
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, บริษัท, ตำแหน่ง..."
                v-model="searchTerm"
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <!-- Validity Period -->
            <div>
              <label class="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <CalendarIcon class="w-4 h-4 mr-2" />
                ระยะเวลาบัตร
              </label>
              <select
                v-model="validityPeriod"
                class="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="0.5">6 เดือน</option>
                <option value="1">1 ปี</option>
                <option value="2">2 ปี</option>
                <option value="3">3 ปี</option>
              </select>
              <p class="text-xs text-gray-500 mt-2 bg-blue-50 p-2 rounded">
                หมดอายุ: {{ expiryDate }}
              </p>
            </div>

            <!-- Statistics -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">ทั้งหมด:</span>
                <span class="font-bold text-gray-800 bg-white px-2 py-1 rounded-full">{{ filteredContractors.length }} คน</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">เลือกแล้ว:</span>
                <span class="font-bold text-blue-600 bg-white px-2 py-1 rounded-full">{{ selectedContractors.length }} คน</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button
                @click="handleSelectAll"
                class="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                {{ selectedContractors.length === filteredContractors.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด' }}
              </button>
              
              <button
                @click="handlePrint"
                :disabled="selectedContractors.length === 0"
                class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
              >
                <PrinterIcon class="w-4 h-4" />
                พิมพ์บัตร ({{ selectedContractors.length }})
              </button>
            </div>
          </div>
        </div>

        <!-- Employee List -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <h3 class="text-lg font-bold text-gray-800">รายชื่อพนักงานที่ผ่านการอบรม</h3>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="w-12 px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        :checked="selectedContractors.length === filteredContractors.length && filteredContractors.length > 0"
                        @change="handleSelectAll"
                        class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">ชื่อ-นามสกุล</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">บริษัท</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">ตำแหน่ง</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">วันที่อบรม</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">หลักสูตร</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">สถานะ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="contractor in filteredContractors"
                    :key="contractor.id"
                    :class="[
                      'hover:bg-blue-50 transition-colors duration-150',
                      selectedContractors.includes(contractor.id) ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    ]"
                  >
                    <td class="px-6 py-4">
                      <input
                        type="checkbox"
                        :checked="selectedContractors.includes(contractor.id)"
                        @change="handleSelectContractor(contractor.id)"
                        class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                          <UserIcon class="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div class="font-semibold text-gray-900">{{ contractor.name }}</div>
                          <div class="text-sm text-gray-500">{{ contractor.phone }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">{{ contractor.company }}</td>
                    <td class="px-6 py-4 text-sm text-gray-700">{{ contractor.position }}</td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ formatDateThai(contractor.trainingDate) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">{{ contractor.trainingType }}</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        <CheckIcon class="w-3 h-3" />
                        {{ contractor.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-if="filteredContractors.length === 0" class="text-center py-16 text-gray-500">
                <UserIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p class="text-lg font-medium">ไม่พบข้อมูลพนักงานที่ตรงกับการค้นหา</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Search as SearchIcon,
  Printer as PrinterIcon,
  Calendar as CalendarIcon,
  Check as CheckIcon,
  User as UserIcon,
  Building as BuildingIcon,
  Phone as PhoneIcon,
  Award as AwardIcon
} from 'lucide-vue-next'

// ข้อมูลตัวอย่างพนักงานที่ผ่านการอบรม
const contractors = ref([
  {
    id: 1,
    name: 'สมชาย ใจดี',
    company: 'บริษัท ก่อสร้าง ABC จำกัด',
    position: 'หัวหน้าช่าง',
    phone: '081-234-5678',
    trainingDate: '2024-01-15',
    trainingType: 'ความปลอดภัยในการทำงาน',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 2,
    name: 'สมหญิง รักงาน',
    company: 'บริษัท XYZ Engineering',
    position: 'วิศวกร',
    phone: '082-345-6789',
    trainingDate: '2024-02-10',
    trainingType: 'การจัดการความเสี่ยง',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 3,
    name: 'วิชัย มั่นคง',
    company: 'ห้างหุ้นส่วน DEF',
    position: 'ช่างเชื่อม',
    phone: '083-456-7890',
    trainingDate: '2024-01-20',
    trainingType: 'ความปลอดภัยในการเชื่อม',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 4,
    name: 'อนุชา ขยันทำงาน',
    company: 'บริษัท GHI Construction',
    position: 'ช่างไฟฟ้า',
    phone: '084-567-8901',
    trainingDate: '2024-03-05',
    trainingType: 'ความปลอดภัยทางไฟฟ้า',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 5,
    name: 'สุพิน มีความสุข',
    company: 'บริษัท JKL Services',
    position: 'ช่างประปา',
    phone: '085-678-9012',
    trainingDate: '2024-02-28',
    trainingType: 'การติดตั้งระบบประปา',
    photo: null,
    status: 'ผ่านการอบรม'
  }
])

const searchTerm = ref('')
const selectedContractors = ref([])
const validityPeriod = ref('1')
const showPreview = ref(false)

// กรองข้อมูลตามคำค้นหา
const filteredContractors = computed(() => {
  return contractors.value.filter(contractor =>
    contractor.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    contractor.company.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    contractor.position.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// ข้อมูลพนักงานที่เลือก
const selectedContractorData = computed(() => {
  return contractors.value.filter(c => selectedContractors.value.includes(c.id))
})

// วันที่ปัจจุบันในรูปแบบไทย
const currentDateThai = computed(() => {
  return new Date().toLocaleDateString('th-TH')
})

// คำนวณวันหมดอายุ
const expiryDate = computed(() => {
  const today = new Date()
  const years = parseFloat(validityPeriod.value)
  const expiryDate = new Date(today)
  expiryDate.setFullYear(today.getFullYear() + Math.floor(years))
  expiryDate.setMonth(today.getMonth() + Math.floor((years % 1) * 12))
  return expiryDate.toLocaleDateString('th-TH')
})

// จัดการการเลือก/ไม่เลือกพนักงาน
const handleSelectContractor = (contractorId) => {
  const index = selectedContractors.value.indexOf(contractorId)
  if (index > -1) {
    selectedContractors.value.splice(index, 1)
  } else {
    selectedContractors.value.push(contractorId)
  }
}

// เลือกทั้งหมด/ยกเลิกทั้งหมด
const handleSelectAll = () => {
  if (selectedContractors.value.length === filteredContractors.value.length) {
    selectedContractors.value = []
  } else {
    selectedContractors.value = filteredContractors.value.map(c => c.id)
  }
}

// แปลงวันที่เป็นรูปแบบไทย
const formatDateThai = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH')
}

// แสดงตัวอย่างก่อนพิมพ์
const handlePrint = () => {
  if (selectedContractors.value.length === 0) {
    alert('กรุณาเลือกพนักงานที่ต้องการพิมพ์บัตร')
    return
  }
  showPreview.value = true
}

// ฟังก์ชันพิมพ์บัตร - พิมพ์เฉพาะ div.print-area
const printCards = () => {
  // ซ่อนทุกอย่างยกเว้นส่วนบัตร
  const printArea = document.querySelector('.print-area')
  const body = document.body
  const originalContents = body.innerHTML
  
  body.innerHTML = printArea.outerHTML
  window.print()
  body.innerHTML = originalContents
  
  // Refresh Vue components after restoring content
  location.reload()
}
</script>

<style scoped>
/* Print Styles */
@media print {
  body * {
    visibility: hidden;
  }
  
  .print-area,
  .print-area * {
    visibility: visible;
  }
  
  .print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  
  .print\:p-0 {
    padding: 0 !important;
  }
  
  .print\:max-w-none {
    max-width: none !important;
  }
  
  .print\:grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
  
  .print\:gap-4 {
    gap: 1rem !important;
  }
  
  .print\:shadow-none {
    box-shadow: none !important;
  }
  
  .print\:border {
    border-width: 1px !important;
  }
  
  .print\:border-gray-300 {
    border-color: #d1d5db !important;
  }
  
  .print\:page-break-inside-avoid {
    page-break-inside: avoid !important;
  }
  
  .print\:rounded-none {
    border-radius: 0 !important;
  }
  
  .print\:p-4 {
    padding: 1rem !important;
  }
  
  .print\:px-4 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .print\:py-3 {
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }
  
  .print\:hidden {
    display: none !important;
  }
}

/* Custom animations */
.transition-all {
  transition-property: all;
}

/* Hover effects */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>