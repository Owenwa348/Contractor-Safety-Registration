<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div class="flex items-center justify-between">
        <div>
          <button
            @click="$emit('goBack')"
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
        <ControlPanel
          :search-company="searchCompany"
          :search-date="searchDate"
          :issue-date="issueDate"
          :expiry-date="expiryDate"
          :total-count="filteredContractors.length"
          :selected-count="selectedContractors.length"
          @update:search-company="$emit('update:searchCompany', $event)"
          @update:search-date="$emit('update:searchDate', $event)"
          @update:issue-date="$emit('update:issueDate', $event)"
          @update:expiry-date="$emit('update:expiryDate', $event)"
          @select-all="handleSelectAll"
          @print="$emit('print')"
        />
      </div>

      <!-- Employee List -->
      <div class="lg:col-span-3">
        <EmployeeTable
          :contractors="filteredContractors"
          :selected-contractors="selectedContractors"
          @select-contractor="$emit('selectContractor', $event)"
          @select-all="handleSelectAll"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  ArrowLeft as ArrowLeftIcon,
  Users as UsersIcon
} from 'lucide-vue-next'
import ControlPanel from './ControlPanel.vue'
import EmployeeTable from './EmployeeTable.vue'

// Props
const props = defineProps({
  selectedTrainingType: {
    type: String,
    required: true
  },
  contractors: {
    type: Array,
    required: true
  },
  selectedContractors: {
    type: Array,
    required: true
  },
  searchCompany: {
    type: String,
    default: ''
  },
  searchDate: {
    type: String,
    default: ''
  },
  issueDate: {
    type: String,
    default: ''
  },
  expiryDate: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits([
  'goBack',
  'selectContractor',
  'print',
  'update:searchCompany',
  'update:searchDate',
  'update:issueDate',
  'update:expiryDate',
  'selectAll'
])

// Computed
const filteredContractors = computed(() => {
  return props.contractors.filter(contractor => {
    const matchTraining = contractor.trainingType === props.selectedTrainingType
    const matchCompany = !props.searchCompany || 
      contractor.company.toLowerCase().includes(props.searchCompany.toLowerCase())
    const matchDate = !props.searchDate || 
      contractor.trainingDate === props.searchDate
    
    return matchTraining && matchCompany && matchDate
  })
})

// Methods
const handleSelectAll = () => {
  emit('selectAll')
}
</script>