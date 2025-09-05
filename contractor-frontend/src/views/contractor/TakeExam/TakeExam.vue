<template>
  <div class="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-3">ทำแบบทดสอบหลังอบรม</h1>
      <p class="text-gray-600 text-lg">เลือกหลักสูตรอบรมเพื่อดูรายละเอียดและเข้าสู่การประเมิน</p>
    </div>

    <!-- Training Selection -->
    <TrainingSelector 
      :selected-training="selectedTraining"
      :trainings="trainings"
      @update:selected-training="selectedTraining = $event"
      @clear-selection="resetSelection"
    />

    <!-- Training Details or Participants -->
    <div v-if="selectedTrainingData" class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Training Information -->
      <TrainingDetails 
        :training-data="selectedTrainingData"
        :exam-url="examUrl"
        :selected-training="selectedTraining"
        @copy-link="copyToClipboard"
      />

      <!-- Participants List -->
      <ParticipantsList
        v-if="hasExamResults"
        :completed-participants="completedParticipants"
        :filtered-participants="filteredCompletedParticipants"
        :search-term="searchTerm"
        :passed-count="passedCount"
        :failed-count="failedCount"
        @update:search-term="searchTerm = $event"
        @confirm-exam="handleConfirmExam"
      />
    </div>

    <!-- Empty State -->
    <EmptyState v-else />

    <!-- Toast Notification -->
    <ToastNotification :show="showToast" />
  </div>
</template>

<script>
import { watch } from 'vue'
import { useTrainingData } from './composables/useTrainingData.js'
import { useClipboard } from './composables/useClipboard.js'
import TrainingSelector from './components/TrainingSelector.vue'
import TrainingDetails from './components/TrainingDetails.vue'
import ParticipantsList from './components/ParticipantsList.vue'
import EmptyState from './components/EmptyState.vue'
import ToastNotification from './components/ToastNotification.vue'

export default {
  name: 'TakeExam',
  components: {
    TrainingSelector,
    TrainingDetails,
    ParticipantsList,
    EmptyState,
    ToastNotification
  },
  setup() {
    // Training data composable
    const {
      trainings,
      selectedTraining,
      searchTerm,
      selectedTrainingData,
      completedParticipants,
      hasExamResults,
      filteredCompletedParticipants,
      examUrl,
      passedCount,
      failedCount,
      resetSelection
    } = useTrainingData()

    // Clipboard composable
    const { showToast, copyToClipboard } = useClipboard()

    // Event handlers
    const handleConfirmExam = () => {
      console.log('Exam confirmed')
    }

    // Watch for changes in selected training
    watch(selectedTraining, () => {
      searchTerm.value = ''
    })

    return {
      // Data
      trainings,
      selectedTraining,
      searchTerm,
      selectedTrainingData,
      completedParticipants,
      hasExamResults,
      filteredCompletedParticipants,
      examUrl,
      passedCount,
      failedCount,
      showToast,
      // Methods
      copyToClipboard,
      handleConfirmExam,
      resetSelection
    }
  }
}
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for better accessibility */
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>