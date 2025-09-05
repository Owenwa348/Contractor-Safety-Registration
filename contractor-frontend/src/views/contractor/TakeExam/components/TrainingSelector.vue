<template>
  <div class="mb-8 bg-white rounded-lg shadow-md p-6">
    <label for="trainingSelect" class="block text-sm font-semibold text-gray-700 mb-3">
      <svg class="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      เลือกหลักสูตรอบรม
    </label>
    <div class="flex flex-col md:flex-row gap-3">
      <select 
        id="trainingSelect"
        :value="selectedTraining"
        @change="$emit('update:selectedTraining', $event.target.value)"
        class="flex-1 md:flex-none md:w-2/3 px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
      >
        <option value="">-- เลือกหลักสูตรอบรม --</option>
        <option 
          v-for="training in trainings" 
          :key="training.id" 
          :value="training.id"
        >
          {{ training.name }}
        </option>
      </select>
      
      <button
        v-if="selectedTraining"
        @click="$emit('clear-selection')"
        class="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 md:w-auto"
        title="ล้างการเลือก"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        ล้าง
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainingSelector',
  props: {
    selectedTraining: {
      type: String,
      required: true
    },
    trainings: {
      type: Array,
      required: true
    }
  },
  emits: ['update:selectedTraining', 'clear-selection']
}
</script>