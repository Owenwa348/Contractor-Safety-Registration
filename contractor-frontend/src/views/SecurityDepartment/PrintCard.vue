<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Preview Mode -->
    <div v-if="showPreview" class="max-w-5xl mx-auto p-6 print:p-0 print:max-w-none">
      <!-- Control Panel - Hidden in Print -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6 print:hidden">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">ตัวอย่างบัตรพนักงาน</h2>
            <p class="text-gray-600">{{ selectedTrainingType }} - ตรวจสอบข้อมูลก่อนพิมพ์</p>
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
              @click="goBackToTraining"
              class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <ArrowLeftIcon class="w-5 h-5" />
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
          class="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300 print:break-inside-avoid print:rounded-none"
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
                    <p class="text-gray-800 font-semibold">{{ formatDateThai(issueDate) }}</p>
                  </div>
                  <div>
                    <p class="text-red-600 font-medium">วันหมดอายุ</p>
                    <p class="text-red-700 font-bold">{{ formatDateThai(expiryDate) }}</p>
                  </div>
                </div>
              </div>

              <!-- QR Code Section -->
              <div class="flex-shrink-0">
                <div class="w-20 h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <img 
                      v-if="contractor.qrCode" 
                      :src="contractor.qrCode" 
                      :alt="`QR Code for ${contractor.name}`"
                      class="w-16 h-16 rounded"
                    />
                    <div v-else class="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center">
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
                อายุบัตร {{ calculateCardAge(issueDate, expiryDate) }} ปี
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Training Selection View -->
    <div v-else-if="!selectedTrainingType" class="max-w-6xl mx-auto p-6">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">พิมพ์บัตรพนักงาน</h1>
          <p class="text-gray-600">เลือกหลักสูตรการอบรมที่ต้องการพิมพ์บัตร</p>
        </div>
      </div>

      <!-- Training Types Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(training, index) in trainingTypes"
          :key="index"
          @click="selectTrainingType(training.type)"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border-2 border-transparent hover:border-blue-200"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <AwardIcon class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ training.type }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ training.description }}</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">พนักงานที่ผ่านการอบรม</span>
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                {{ getTrainingCount(training.type) }} คน
              </span>
            </div>
            <div class="flex items-center justify-center mt-4 text-blue-600">
              <span class="text-sm font-medium">เลือกหลักสูตรนี้</span>
              <ChevronRightIcon class="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Employee List View -->
    <div v-else class="max-w-7xl mx-auto p-6">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <button
              @click="selectedTrainingType = null"
              class="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2"
            >
              <ArrowLeftIcon class="w-4 h-4" />
              <span class="text-sm">กลับไปเลือกหลักสูตร</span>
            </button>
            <h1 class="text-3xl font-bold text-gray-800">{{ selectedTrainingType }}</h1>
            <p class="text-gray-600">เลือกพนักงานที่ต้องการพิมพ์บัตร</p>
          </div>
          <div class="text-right">
            <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
              <UsersIcon class="w-5 h-5 inline mr-2" />
              <span class="font-semibold">{{ filteredContractors.length }} คน</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Control Panel -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 space-y-6 sticky top-6">
            <h3 class="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">ตัวเลือก</h3>
            
            <!-- Search by Company -->
            <div>
              <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <BuildingIcon class="w-4 h-4 mr-2" />
                ค้นหาบริษัท
              </label>
              <div class="relative">
                <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="ชื่อบริษัท..."
                  v-model="searchCompany"
                  class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <!-- Search by Training Date -->
            <div>
              <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <CalendarIcon class="w-4 h-4 mr-2" />
                ค้นหาวันที่อบรม
              </label>
              <input
                type="date"
                v-model="searchDate"
                class="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <!-- Issue Date -->
            <div>
              <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <CalendarIcon class="w-4 h-4 mr-2" />
                วันที่ออกบัตร
              </label>
              <input
                type="date"
                v-model="issueDate"
                class="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <!-- Expiry Date -->
            <div>
              <label class="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <CalendarIcon class="w-4 h-4 mr-2" />
                วันหมดอายุ
              </label>
              <input
                type="date"
                v-model="expiryDate"
                class="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
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
import { ref, computed, onMounted } from 'vue'
import QRCode from 'qrcode'
import { 
  Search as SearchIcon,
  Printer as PrinterIcon,
  Calendar as CalendarIcon,
  Check as CheckIcon,
  User as UserIcon,
  Building as BuildingIcon,
  Phone as PhoneIcon,
  Award as AwardIcon,
  ArrowLeft as ArrowLeftIcon,
  Users as UsersIcon,
  ChevronRight as ChevronRightIcon
} from 'lucide-vue-next'

// ข้อมูลหลักสูตรการอบรม
const trainingTypes = [
  {
    type: 'อบรมพื้นฐานความปลอดภัย',
    description: 'หลักสูตรพื้นฐานเกี่ยวกับความปลอดภัยในการทำงาน'
  },
  {
    type: 'อบรมการใช้เครื่องมือ',
    description: 'การใช้เครื่องมือและอุปกรณ์อย่างปลอดภัย'
  },
  {
    type: 'อบรมการใช้เครื่องจักร',
    description: 'การควบคุมและใช้เครื่องจักรในงานก่อสร้าง'
  },
  {
    type: 'อบรมการประกอบอุปกรณ์',
    description: 'การประกอบอุปกรณ์เบื้องต้นในสถานที่ทำงาน'
  }
]

// ข้อมูลตัวอย่างพนักงานที่ผ่านการอบรม
const contractors = ref([
  {
    id: 1,
    name: 'ธันวา ชัยรัตนานนท์',
    company: 'บริษัท ก่อสร้าง ABC จำกัด',
    position: 'หัวหน้าช่าง',
    phone: '081-234-5678',
    trainingDate: '2025-08-20',
    trainingType: 'อบรมพื้นฐานความปลอดภัย',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 2,
    name: 'ประยุทธ์ ศรีสวัสดิ์',
    company: 'บริษัท XYZ Engineering',
    position: 'วิศวกร',
    phone: '082-345-6789',
    trainingDate: '2025-08-24',
    trainingType: 'อบรมการใช้เครื่องมือ',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 3,
    name: 'วิไล สุขใส',
    company: 'ห้างหุ้นส่วน DEF',
    position: 'ช่างเชื่อม',
    phone: '083-456-7890',
    trainingDate: '2025-09-08',
    trainingType: 'อบรมการใช้เครื่องจักร',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 4,
    name: 'สมชาย ใจดี',
    company: 'บริษัท GHI Construction',
    position: 'ช่างไฟฟ้า',
    phone: '084-567-8901',
    trainingDate: '2025-08-20',
    trainingType: 'อบรมพื้นฐานความปลอดภัย',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 5,
    name: 'สุพิน มีความสุข',
    company: 'บริษัท JKL Services',
    position: 'ช่างประปา',
    phone: '085-678-9012',
    trainingDate: '2025-08-21',
    trainingType: 'อบรมการประกอบอุปกรณ์',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 6,
    name: 'มานะ ทำงานหนัก',
    company: 'บริษัท ก่อสร้าง ABC จำกัด',
    position: 'ช่างก่อสร้าง',
    phone: '086-789-0123',
    trainingDate: '2025-08-24',
    trainingType: 'อบรมการใช้เครื่องมือ',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 7,
    name: 'สุดา เอาใจใส่',
    company: 'บริษัท MNO Engineering',
    position: 'ช่างสำรวจ',
    phone: '087-890-1234',
    trainingDate: '2025-09-08',
    trainingType: 'อบรมการใช้เครื่องจักร',
    photo: null,
    status: 'ผ่านการอบรม'
  },
  {
    id: 8,
    name: 'ประยุทธ์ มุ่งมั่น',
    company: 'ห้างหุ้นส่วน PQR',
    position: 'หัวหน้าโครงการ',
    phone: '088-901-2345',
    trainingDate: '2025-09-03',
    trainingType: 'อบรมการประกอบอุปกรณ์',
    photo: null,
    status: 'ผ่านการอบรม'
  }
])

const searchCompany = ref('')
const searchDate = ref('')
const selectedContractors = ref([])
const selectedTrainingType = ref(null)
const showPreview = ref(false)
const qrCodes = ref({})

// วันที่ออกบัตรและวันหมดอายุ
const issueDate = ref(new Date().toISOString().split('T')[0])
const expiryDate = ref('')

// ตั้งค่าวันหมดอายุเริ่มต้น (1 ปีจากวันที่ออกบัตร)
const initializeExpiryDate = () => {
  const issue = new Date(issueDate.value)
  const expiry = new Date(issue)
  expiry.setFullYear(issue.getFullYear() + 1)
  expiryDate.value = expiry.toISOString().split('T')[0]
}

// เรียกใช้ตอนเริ่มต้น
initializeExpiryDate()

// นับจำนวนพนักงานตามหลักสูตร
const getTrainingCount = (trainingType) => {
  return contractors.value.filter(c => c.trainingType === trainingType).length
}

// เลือกหลักสูตร
const selectTrainingType = (trainingType) => {
  selectedTrainingType.value = trainingType
  selectedContractors.value = []
}

// กรองข้อมูลตามหลักสูตรที่เลือกและการค้นหา
const filteredContractors = computed(() => {
  if (!selectedTrainingType.value) return []
  
  return contractors.value.filter(contractor => {
    const matchTraining = contractor.trainingType === selectedTrainingType.value
    const matchCompany = !searchCompany.value || 
      contractor.company.toLowerCase().includes(searchCompany.value.toLowerCase())
    const matchDate = !searchDate.value || 
      contractor.trainingDate === searchDate.value
    
    return matchTraining && matchCompany && matchDate
  })
})

// ข้อมูลพนักงานที่เลือก
const selectedContractorData = computed(() => {
  return contractors.value.filter(c => selectedContractors.value.includes(c.id)).map(contractor => ({
    ...contractor,
    qrCode: qrCodes.value[contractor.id]
  }))
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

// การสร้าง QR Code สำหรับบัตรพนักงาน
const generateQRCode = async (contractor) => {
  try {
    // สร้างข้อมูลสำหรับ QR Code
    const qrData = {
      employeeId: `EMP-${String(contractor.id).padStart(4, '0')}`,
      name: contractor.name,
      company: contractor.company,
      position: contractor.position,
      trainingType: contractor.trainingType,
      trainingDate: contractor.trainingDate,
      issueDate: issueDate.value,
      expiryDate: expiryDate.value,
      phone: contractor.phone,
      status: contractor.status
    }
    
    // แปลงเป็น JSON สตริง
const qrString = JSON.stringify(qrData)
    
    // สร้าง QR Code เป็น Data URL
    const qrCodeDataURL = await QRCode.toDataURL(qrString, {
      width: 128,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    
    return qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    return null
  }
}

// สร้าง QR Code สำหรับพนักงานที่เลือก
const generateQRCodes = async () => {
  const codes = {}
  for (const contractorId of selectedContractors.value) {
    const contractor = contractors.value.find(c => c.id === contractorId)
    if (contractor) {
      codes[contractorId] = await generateQRCode(contractor)
    }
  }
  qrCodes.value = codes
}

// คำนวณอายุบัตร
const calculateCardAge = (issueDateStr, expiryDateStr) => {
  const issueDate = new Date(issueDateStr)
  const expiryDate = new Date(expiryDateStr)
  const diffTime = Math.abs(expiryDate - issueDate)
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
  return diffYears
}

// แสดงตัวอย่างก่อนพิมพ์
const handlePrint = async () => {
  if (selectedContractors.value.length === 0) {
    alert('กรุณาเลือกพนักงานที่ต้องการพิมพ์บัตร')
    return
  }
  
  // สร้าง QR Codes ก่อนแสดงตัวอย่าง
  await generateQRCodes()
  showPreview.value = true
}

// กลับไปหน้าเลือกหลักสูตร
const goBackToTraining = () => {
  showPreview.value = false
}

// ฟังก์ชันพิมพ์บัตร
const printCards = () => {
  const printArea = document.querySelector('.print-area')
  if (!printArea) return
  
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
}

/* Custom animations */
.transition-all {
  transition-property: all;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Card hover animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter-active {
  animation: slideInUp 0.3s ease-out;
}
</style>