<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div 
      v-for="stat in userStats" 
      :key="stat.label" 
      :class="[stat.bgClass, 'p-4 rounded-lg']"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg 
            :class="[stat.iconClass, 'h-8 w-8']" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <!-- Users icon for all stats -->
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt :class="[stat.textClass, 'text-sm font-medium truncate']">
              {{ stat.label }}
            </dt>
            <dd :class="[stat.boldClass, 'text-lg font-medium']">
              {{ stat.count }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const userStats = computed(() => [
  { 
    label: 'Admin(safety)', 
    count: getRoleCount('safety'), 
    bgClass: 'bg-green-50 border-l-4 border-green-400', 
    textClass: 'text-green-600', 
    boldClass: 'text-green-700', 
    iconClass: 'text-green-400' 
  },
  { 
    label: 'เจ้าของงาน/หัวหน้างาน', 
    count: getRoleCount('manager'), 
    bgClass: 'bg-yellow-50 border-l-4 border-yellow-400', 
    textClass: 'text-yellow-600', 
    boldClass: 'text-yellow-700', 
    iconClass: 'text-yellow-400' 
  },
  { 
    label: 'จำนวนบริษัททั้งหมด', 
    count: getUniqueCompaniesCount(), 
    bgClass: 'bg-indigo-50 border-l-4 border-indigo-400', 
    textClass: 'text-indigo-600', 
    boldClass: 'text-indigo-700', 
    iconClass: 'text-indigo-400' 
  }
])

// Helper Functions
const getRoleCount = (role) => {
  return props.users.filter(user => user.role === role).length
}

const getUniqueCompaniesCount = () => {
  const companies = props.users
    .filter(user => user.company && user.company.trim() !== '')
    .map(user => user.company.trim().toLowerCase())
  return [...new Set(companies)].length
}
</script>