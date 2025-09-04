<!-- SearchAndControls.vue -->
<template>
  <div>
    <!-- ค้นหา -->
    <div class="mb-3">
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        type="text"
        placeholder="ค้นหาชื่อ..."
        class="border rounded px-3 py-2 w-64"
      />
    </div>

    <!-- ปุ่มต่างๆ -->
    <div class="mb-3 flex gap-2 flex-wrap">
        
      <button
        @click="handleBookSelected"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        จองคนที่เลือก ({{ selectedCount }})
      </button>

      <button
        @click="$emit('selectAllPeople')"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        เลือกทั้งหมด
      </button>
      
      <button
        @click="$emit('selectOnlyApproved')"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        เลือกเฉพาะคนอนุมัติ
      </button>
      
      <button
        @click="$emit('selectOnlyNotPassed')"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        เลือกเฉพาะคนไม่ผ่าน
      </button>
      
      <button
        @click="$emit('clearSelection')"
        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
        :disabled="selectedCount === 0"
      >
        เคลียร์การเลือก
      </button>
    </div>

    <!-- แสดงจำนวนที่เลือก -->
    <div v-if="selectedCount > 0" class="mb-3 p-3 bg-blue-50 rounded">
      <p class="text-blue-800">เลือกแล้ว {{ selectedCount }} คน สำหรับอบรม "{{ selectedEvent?.title }}"</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  search: {
    type: String,
    required: true
  },
  selectedCount: {
    type: Number,
    required: true
  },
  selectedEvent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'update:search',
  'bookSelected',
  'selectAllPeople',
  'selectOnlyApproved',
  'selectOnlyNotPassed',
  'clearSelection'
])

// Handle booking selected people and navigate to training-booking page
const handleBookSelected = async () => {
  // Emit the bookSelected event to parent component
  emit('bookSelected')
  
  // Navigate to training-booking page after booking is complete
  await router.push('/training-booking')
}
</script>