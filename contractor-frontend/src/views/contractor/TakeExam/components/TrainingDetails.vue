<template>
  <div class="xl:col-span-2 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
      <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      รายละเอียดการอบรม
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="flex items-start">
          <span class="text-sm font-semibold text-gray-600 w-28">หลักสูตร:</span>
          <span class="text-sm text-gray-800 font-medium">{{ trainingData.name }}</span>
        </div>
        <div class="flex items-start">
          <span class="text-sm font-semibold text-gray-600 w-28">วันที่อบรม:</span>
          <span class="text-sm text-gray-800">{{ trainingData.details.date }}</span>
        </div>
        <div class="flex items-start">
          <span class="text-sm font-semibold text-gray-600 w-28">เวลา:</span>
          <span class="text-sm text-gray-800">{{ trainingData.details.time }}</span>
        </div>
      </div>
      
      <div class="space-y-4">
        <div class="flex items-start">
          <span class="text-sm font-semibold text-gray-600 w-28">วิทยากร:</span>
          <span class="text-sm text-gray-800">{{ trainingData.details.instructor }}</span>
        </div>
        <div class="flex items-start">
          <span class="text-sm font-semibold text-gray-600 w-28">ระยะเวลา:</span>
          <span class="text-sm text-gray-800">{{ trainingData.details.duration }}</span>
        </div>
        <div class="flex items-start">
          <span class="text-sm font-semibold text-gray-600 w-28">เกณฑ์ผ่าน:</span>
          <span class="text-sm text-green-700 font-bold">{{ trainingData.details.passingScore }}% ขึ้นไป</span>
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <span class="text-sm font-semibold text-gray-600">รายละเอียดหลักสูตร:</span>
      <p class="text-sm text-gray-800 mt-2">{{ trainingData.details.description }}</p>
    </div>

    <!-- Exam Access Links Component Integration -->
    <ExamAccessLinks 
      :exam-url="examUrl"
      :selected-training="selectedTraining"
      @copy-link="$emit('copy-link', $event)"
    />
  </div>
</template>

<script>
import ExamAccessLinks from './ExamAccessLinks.vue'

export default {
  name: 'TrainingDetails',
  components: {
    ExamAccessLinks
  },
  props: {
    trainingData: {
      type: Object,
      required: true
    },
    examUrl: {
      type: String,
      required: true
    },
    selectedTraining: {
      type: String,
      required: true
    }
  },
  emits: ['copy-link']
}
</script>