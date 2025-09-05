<template>
  <div class="max-w-6xl mx-auto p-6">
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
        @click="$emit('selectTraining', training.type)"
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
              {{ training.count }} คน
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
</template>

<script setup>
import { Award as AwardIcon, ChevronRight as ChevronRightIcon } from 'lucide-vue-next'

// Props
defineProps({
  trainingTypes: {
    type: Array,
    required: true
  }
})

// Emits
defineEmits(['selectTraining'])
</script>

<style scoped>
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>