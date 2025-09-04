<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div 
      v-for="stat in statistics" 
      :key="stat.label" 
      class="bg-white rounded-lg p-6 shadow border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
          <p class="text-2xl font-bold" :class="stat.color">{{ stat.value }}</p>
        </div>
        <div class="p-3 rounded-lg" :class="stat.bgColor">
          <svg 
            class="w-6 h-6" 
            :class="stat.color" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              :d="stat.icon"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  events: {
    type: Array,
    required: true,
    default: () => []
  },
  currentDate: {
    type: Date,
    required: true
  }
});

const thisMonthEvents = computed(() => {
  const eventsInMonth = props.events.filter(event => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const currentMonth = props.currentDate.getMonth();
    const currentYear = props.currentDate.getFullYear();
    
    return (eventStartDate.getMonth() === currentMonth && eventStartDate.getFullYear() === currentYear) ||
           (eventEndDate.getMonth() === currentMonth && eventEndDate.getFullYear() === currentYear);
  });
  return eventsInMonth.length;
});

const statistics = computed(() => [
  {
    label: "การอบรมเดือนนี้",
    value: thisMonthEvents.value,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  {
    label: "การอบรมทั้งหมด",
    value: props.events.length,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }
]);
</script>