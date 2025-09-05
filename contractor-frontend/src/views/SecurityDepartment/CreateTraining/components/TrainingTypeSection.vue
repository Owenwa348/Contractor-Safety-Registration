<template>
  <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-3">
      <h4 class="font-bold text-green-800">ข้อมูลการอบรม</h4>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้อการอบรม</label>
      <select 
        :value="type" 
        @input="$emit('update:type', $event.target.value)"
        required 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">เลือกหัวข้อการอบรม</option>
        <option v-for="trainingType in trainingTypes" :key="trainingType" :value="trainingType">
          {{ trainingType }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  trainingTypes: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:type']);
</script>