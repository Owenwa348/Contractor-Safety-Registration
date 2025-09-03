<template>
  <div
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
</template>

<script setup>
import { 
  User as UserIcon,
  Building as BuildingIcon,
  Phone as PhoneIcon,
  Award as AwardIcon
} from 'lucide-vue-next'

// Props
defineProps({
  contractor: {
    type: Object,
    required: true
  },
  issueDate: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  }
})

// Methods
const formatDateThai = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH')
}

const calculateCardAge = (issueDateStr, expiryDateStr) => {
  const issueDate = new Date(issueDateStr)
  const expiryDate = new Date(expiryDateStr)
  const diffTime = Math.abs(expiryDate - issueDate)
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
  return diffYears
}
</script>