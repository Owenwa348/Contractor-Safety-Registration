<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Preview Mode -->
    <CardPreview
      v-if="showPreview"
      :selected-contractor-data="selectedContractorData"
      :selected-training-type="selectedTrainingType"
      :issue-date="issueDate"
      :expiry-date="expiryDate"
      @print="printCards"
      @go-back="goBackToTraining"
    />

    <!-- Training Selection View -->
    <TrainingTypeSelector
      v-else-if="!selectedTrainingType"
      :training-types="trainingTypesWithCount"
      @select-training="selectTrainingType"
    />

    <!-- Employee List View -->
    <EmployeeListView
      v-else
      :selected-training-type="selectedTrainingType"
      :contractors="contractors"
      :selected-contractors="selectedContractors"
      :search-company="searchCompany"
      :search-date="searchDate"
      :issue-date="issueDate"
      :expiry-date="expiryDate"
      @update:search-company="searchCompany = $event"
      @update:search-date="searchDate = $event"
      @update:issue-date="issueDate = $event"
      @update:expiry-date="expiryDate = $event"
      @go-back="selectedTrainingType = null"
      @select-contractor="handleSelectContractor"
      @select-all="wrappedHandleSelectAll"
      @print="wrappedHandlePrint"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TrainingTypeSelector from './components/TrainingTypeSelector.vue'
import EmployeeListView from './components/EmployeeListView.vue'
import CardPreview from './components/CardPreview.vue'
import { usePrintCard } from './composables/usePrintCard.js'
import { useContractorData } from './composables/useContractorData.js'

// Import composables
const {
  searchCompany,
  searchDate,
  selectedContractors,
  selectedTrainingType,
  showPreview,
  qrCodes,
  issueDate,
  expiryDate,
  selectTrainingType,
  handleSelectContractor,
  handleSelectAll,
  handlePrint,
  goBackToTraining,
  printCards
} = usePrintCard()

const {
  contractors,
  getTrainingTypesWithCount,
  getFilteredContractors,
  getSelectedContractorData
} = useContractorData()

// Computed properties
const trainingTypesWithCount = computed(() => getTrainingTypesWithCount())
const filteredContractors = computed(() => 
  getFilteredContractors(selectedTrainingType.value, searchCompany.value, searchDate.value)
)
const selectedContractorData = computed(() => 
  getSelectedContractorData(selectedContractors.value, qrCodes.value)
)

// Methods - wrap the composable methods to handle filtered contractors
const wrappedHandleSelectAll = () => {
  handleSelectAll(filteredContractors.value)
}

const wrappedHandlePrint = () => {
  handlePrint(contractors)
}
</script>

<style scoped>
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