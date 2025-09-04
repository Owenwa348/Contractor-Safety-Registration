<!-- PersonTable.vue -->
<template>
  <div class="mb-6">
    <h3 :class="headerClass" class="text-lg font-semibold mb-3 flex items-center">
      <span :class="indicatorClass" class="w-3 h-3 rounded-full mr-2"></span>
      {{ title }} ({{ people.length }} คน)
    </h3>
    <div class="border rounded-lg overflow-hidden">
      <table class="w-full">
        <thead :class="tableHeaderClass">
          <tr>
            <th class="p-2 text-center w-12">
              <input 
                type="checkbox" 
                @change="$emit('selectAll', $event)" 
                :checked="allSelected"
              >
            </th>
            <th class="p-2 text-center w-16">ลำดับ</th>
            <th class="p-2 text-left">ชื่อ</th>
            <th class="p-2 text-center">เบอร์</th>
            <th class="p-2 text-center">บัตรประชาชน</th>
            <th v-if="showFailedTraining" class="p-2 text-center">สอบไม่ผ่านอบรมอะไร</th>
            <th class="p-2 text-center w-20">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(person, index) in people" 
            :key="person.id" 
            :class="rowHoverClass"
            class="border-t"
          >
            <td class="p-2 text-center">
              <input 
                type="checkbox" 
                :checked="person.selected"
                @change="$emit('toggleSelection', person.id)"
              />
            </td>
            <td class="p-2 text-center">{{ index + 1 }}</td>
            <td class="p-2">{{ person.name }}</td>
            <td class="p-2 text-center">{{ person.phone || '-' }}</td>
            <td class="p-2 text-center">{{ person.idcard }}</td>
            <td v-if="showFailedTraining" class="p-2 text-center text-sm">
              <span v-if="person.failedTraining" class="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                {{ person.failedTraining }}
              </span>
              <span v-else class="text-gray-400">-</span>
            </td>
            <td class="p-2 text-center">
              <button 
                class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600" 
                @click="$emit('removePerson', person.id)"
              >
                ลบ
              </button>
            </td>
          </tr>
          <tr v-if="people.length === 0">
            <td :colspan="showFailedTraining ? 7 : 6" class="p-4 text-center text-gray-500">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  people: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  allSelected: {
    type: Boolean,
    required: true
  },
  variant: {
    type: String,
    default: 'approved', // 'approved' or 'not_passed'
    validator: (value) => ['approved', 'not_passed'].includes(value)
  },
  emptyMessage: {
    type: String,
    required: true
  },
  showFailedTraining: {
    type: Boolean,
    default: false
  }
})

defineEmits(['selectAll', 'toggleSelection', 'removePerson'])

// Computed styles based on variant
const headerClass = computed(() => {
  return props.variant === 'approved' ? 'text-green-800' : 'text-red-800'
})

const indicatorClass = computed(() => {
  return props.variant === 'approved' ? 'bg-green-500' : 'bg-red-500'
})

const tableHeaderClass = computed(() => {
  return props.variant === 'approved' ? 'bg-green-100' : 'bg-red-100'
})

const rowHoverClass = computed(() => {
  return props.variant === 'approved' ? 'hover:bg-green-50' : 'hover:bg-red-50'
})
</script>