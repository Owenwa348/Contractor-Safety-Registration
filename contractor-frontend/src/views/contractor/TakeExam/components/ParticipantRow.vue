<template>
  <div class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
    <div class="flex items-start justify-between">
      <div class="flex items-start">
        <span class="text-sm font-bold text-gray-600 w-8">{{ index + 1 }}.</span>
        <div>
          <p class="text-sm font-bold text-gray-800">{{ participant.name }}</p>
          <p class="text-xs text-gray-500">{{ participant.position }}</p>
          <div class="flex items-center mt-1">
            <svg class="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-3 7h12l-3-7"></path>
            </svg>
            <span class="text-xs text-gray-500">ทำข้อสอบ: {{ participant.examDate }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end gap-1">
        <span :class="getExamStatusClass(participant.examStatus)">
          <svg v-if="participant.examStatus === 'passed'" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ getExamStatusText(participant.examStatus) }}
        </span>
        <span class="text-xs text-gray-600">
          คะแนน: {{ participant.score }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParticipantRow',
  props: {
    participant: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup() {
    const getExamStatusClass = (status) => {
      const baseClasses = 'px-3 py-1 rounded-full text-xs font-bold flex items-center'
      const statusClasses = {
        passed: 'bg-green-100 text-green-800 border border-green-200',
        failed: 'bg-red-100 text-red-800 border border-red-200'
      }
      return `${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`
    }

    const getExamStatusText = (status) => {
      const statusTexts = {
        passed: 'ผ่าน',
        failed: 'ไม่ผ่าน'
      }
      return statusTexts[status] || 'ไม่ทราบ'
    }

    return {
      getExamStatusClass,
      getExamStatusText
    }
  }
}
</script>