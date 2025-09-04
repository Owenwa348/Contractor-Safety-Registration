<template>
  <div>
    <div :class="`bg-${colorScheme}-50 border border-${colorScheme}-200 rounded-lg p-3 mb-3`">
      <div class="flex items-center gap-2 mb-2">
        <span :class="`text-xs font-medium text-${colorScheme}-800`">{{ title }}</span>
      </div>
      <p :class="`text-xs text-${colorScheme}-700`">{{ description }}</p>
    </div>
    <div class="grid grid-cols-7 gap-2">
      <div v-for="(day, index) in daysOfWeek" :key="day" class="text-center">
        <input 
          :checked="selectedDays.includes(index)"
          @change="toggleDay(index)"
          :value="index" 
          type="checkbox" 
          :id="`${idPrefix}-${index}`" 
          :class="`mb-1 form-checkbox h-4 w-4 text-${colorScheme}-600 rounded focus:ring-2 focus:ring-${colorScheme}-500`"
        />
        <label 
          :for="`${idPrefix}-${index}`" 
          :class="`block text-xs text-gray-700 cursor-pointer hover:text-${colorScheme}-600 font-medium`"
        >
          {{ day.slice(0, 2) }}
        </label>
      </div>
    </div>
    <p class="text-xs text-gray-500 mt-2">{{ note }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedDays: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  idPrefix: {
    type: String,
    required: true
  },
  colorScheme: {
    type: String,
    default: 'blue'
  }
});

const emit = defineEmits(['update:selectedDays']);

const daysOfWeek = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

const toggleDay = (dayIndex) => {
  const newSelectedDays = [...props.selectedDays];
  const index = newSelectedDays.indexOf(dayIndex);
  
  if (index > -1) {
    newSelectedDays.splice(index, 1);
  } else {
    newSelectedDays.push(dayIndex);
  }
  
  emit('update:selectedDays', newSelectedDays);
};
</script>