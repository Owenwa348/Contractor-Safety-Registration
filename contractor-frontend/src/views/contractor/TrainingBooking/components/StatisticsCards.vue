<!-- StatisticsCards.vue - Training statistics display component -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <!-- Total Events Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center">
        <div class="p-2 bg-blue-100 rounded-lg">
          <svg
            class="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-600">การอบรมตลอดทั้งปี</p>
          <p class="text-2xl font-bold text-gray-800">{{ totalEvents }}</p>
        </div>
      </div>
    </div>

    <!-- This Month Events Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center">
        <div class="p-2 bg-green-100 rounded-lg">
          <svg
            class="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-600">การอบรมเดือนนี้</p>
          <p class="text-2xl font-bold text-gray-800">{{ thisMonthEvents }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  totalEvents: {
    type: Number,
    required: true,
    default: 0
  },
  thisMonthEvents: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>