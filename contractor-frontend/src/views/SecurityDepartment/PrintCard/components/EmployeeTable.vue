<template>
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
                :checked="isAllSelected"
                @change="$emit('selectAll')"
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
            v-for="contractor in contractors"
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
                @change="$emit('selectContractor', contractor.id)"
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

      <div v-if="contractors.length === 0" class="text-center py-16 text-gray-500">
        <UserIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p class="text-lg font-medium">ไม่พบข้อมูลพนักงานที่ตรงกับการค้นหา</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  Check as CheckIcon,
  User as UserIcon
} from 'lucide-vue-next'

// Props
const props = defineProps({
  contractors: {
    type: Array,
    required: true
  },
  selectedContractors: {
    type: Array,
    required: true
  }
})

// Emits
defineEmits(['selectContractor', 'selectAll'])

// Computed
const isAllSelected = computed(() => {
  return props.selectedContractors.length === props.contractors.length && props.contractors.length > 0
})

// Methods
const formatDateThai = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH')
}
</script>