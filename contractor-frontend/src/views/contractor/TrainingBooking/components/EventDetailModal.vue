<!-- EventDetailModal.vue - Event information and booking modal -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 animate-[modal-fade-in_0.2s_ease-out]">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ selectedEvent && selectedDate 
            ? `รายละเอียดการอบรม `
            : 'รายละเอียดการอบรม' 
          }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Event Details -->
      <div v-if="selectedEvent" class="space-y-4">
        <!-- Training Name -->
        <div class="border-l-4 pl-4 border-blue-600">
          <h4 class="text-xl font-semibold text-gray-900">{{ selectedEvent.title }}</h4>
        </div>
        
        <!-- Training Details Grid -->
        <div class="space-y-3">
          <!-- Instructor -->
          <div class="flex items-start">
            <div class="min-w-0 flex-1">
              <label class="text-gray-600 font-medium text-sm">ชื่อผู้สอน</label>
              <p class="text-gray-900 mt-1">{{ selectedEvent.instructor || 'ไม่ระบุ' }}</p>
            </div>
          </div>
          
          <!-- Date -->
          <div class="flex items-start">
            <div class="min-w-0 flex-1">
              <label class="text-gray-600 font-medium text-sm">วันที่</label>
              <p class="text-gray-900 mt-1">
                {{ selectedEvent.isMultiDay && selectedDate
                  ? formatThaiDate(selectedDate)
                  : selectedEvent.isMultiDay 
                    ? formatDateRange(selectedEvent.startDate, selectedEvent.endDate)
                    : formatThaiDate(selectedEvent.date || selectedEvent.startDate) 
                }}
              </p>
            </div>
          </div>
          
          <!-- Time -->
          <div v-if="!selectedEvent.isAllDay" class="flex items-start">
            <div class="min-w-0 flex-1">
              <label class="text-gray-600 font-medium text-sm">เวลา</label>
              <p class="text-gray-900 mt-1">
                {{ selectedEvent.time }}:00 - {{ selectedEvent.endTime }}:00 น.
              </p>
            </div>
          </div>
          
          <!-- Room -->
          <div class="flex items-start">
            <div class="min-w-0 flex-1">
              <label class="text-gray-600 font-medium text-sm">ห้อง</label>
              <p class="text-gray-900 mt-1">{{ selectedEvent.room || 'ไม่ระบุ' }}</p>
            </div>
          </div>
          
          <!-- Participant Count -->
          <div class="flex items-start">
            <div class="min-w-0 flex-1">
              <label class="text-gray-600 font-medium text-sm">จำนวนผู้เข้าร่วม</label>
              <p class="text-gray-900 mt-1">
                {{ selectedEvent.participantCount }}/{{ selectedEvent.capacity }} คน
                <span class="ml-2 px-2 py-1 rounded-full text-xs"
                      :class="selectedEvent.participantCount >= selectedEvent.capacity 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'">
                  {{ selectedEvent.participantCount >= selectedEvent.capacity ? 'เต็ม' : 'ว่าง' }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Registration deadline warning -->
        <div class="bg-gradient-to-br from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-lg p-3">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-amber-800">ข้อกำหนดการลงทะเบียน</p>
              <p class="text-sm text-amber-700 mt-1">
                ต้องลงทะเบียนล่วงหน้า {{ selectedEvent.registrationDaysBefore }} วัน
                <br>
                กำหนดลงทะเบียนภายใน: <span class="font-medium">{{ formatThaiDate(getRegistrationDeadline()) }}</span>
              </p>
              <div v-if="isRegistrationPeriodPassed()" class="mt-2">
                <span class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center justify-center">
                  หมดเขตลงทะเบียนแล้ว
                </span>
              </div>
              <div v-else class="mt-2">
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center justify-center">
                  ยังสามารถลงทะเบียนได้
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date selection for multi-day events -->
        <div v-if="selectedEvent.isMultiDay && !selectedDate" class="space-y-3">
          <label class="text-gray-600 font-medium text-sm">เลือกวันที่ต้องการจอง:</label>
          <div class="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded hover:scrollbar-thumb-slate-400">
            <button
              v-for="date in availableDates"
              :key="date"
              @click="$emit('select-date', date)"
              class="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:translate-x-1 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'opacity-50 cursor-not-allowed': isPastDate(date) }"
              :disabled="isPastDate(date)"
            >
              <div class="flex justify-between items-center">
                <span class="font-medium">{{ formatThaiDate(date) }}</span>
                <div class="flex items-center space-x-2">
                  <span v-if="isPastDate(date)" class="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    ผ่านไปแล้ว
                  </span>
                  <span v-else-if="isRegistrationDeadlinePassed(selectedEvent, date)" class="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center justify-center">
                    หมดเขตลงทะเบียน
                  </span>
                  <span v-else class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center justify-center">
                    สามารถจองได้
                  </span>
                </div>
              </div>
              <div class="text-sm text-gray-600 mt-1">
                กำหนดลงทะเบียนภายใน: {{ formatThaiDate(getRegistrationDeadlineForDate(selectedEvent, date)) }}
              </div>
            </button>
          </div>
        </div>

        <!-- Booking Button -->
        <div class="pt-4 border-t border-gray-200">
          <div v-if="selectedEvent.isMultiDay && !selectedDate" class="text-center text-gray-600">
            กรุณาเลือกวันที่ก่อนทำการจอง
          </div>
          <div v-else>
            <button
              @click="$emit('book-training')"
              :disabled="!canBookEvent(selectedEvent, selectedDate)"
              class="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:transform-none disabled:shadow-none"
              :class="!canBookEvent(selectedEvent, selectedDate)
                ? 'bg-gray-300 text-gray-500 focus:ring-gray-400'
                : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 hover:-translate-y-0.5 hover:shadow-lg text-white shadow-sm focus:ring-blue-500'"
            >
              {{ getBookingButtonText(selectedEvent, selectedDate) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  selectedEvent: {
    type: Object,
    default: null
  },
  selectedDate: {
    type: String,
    default: null
  },
  formatThaiDate: {
    type: Function,
    required: true
  },
  formatDateRange: {
    type: Function,
    required: true
  },
  getRegistrationDeadlineForDate: {
    type: Function,
    required: true
  },
  isRegistrationDeadlinePassed: {
    type: Function,
    required: true
  },
  canBookEvent: {
    type: Function,
    required: true
  },
  getBookingButtonText: {
    type: Function,
    required: true
  },
  getAvailableDatesForMultiDayEvent: {
    type: Function,
    required: true
  },
  isPastDate: {
    type: Function,
    required: true
  }
})

// Emits
defineEmits([
  'close',
  'select-date',
  'book-training'
])

// Computed properties
const availableDates = computed(() => {
  if (!props.selectedEvent) return []
  return props.getAvailableDatesForMultiDayEvent(props.selectedEvent)
})

const getRegistrationDeadline = () => {
  if (!props.selectedEvent || !props.selectedDate) return null
  return props.getRegistrationDeadlineForDate(props.selectedEvent, props.selectedDate)
}

const isRegistrationPeriodPassed = () => {
  if (!props.selectedEvent || !props.selectedDate) return false
  return props.isRegistrationDeadlinePassed(props.selectedEvent, props.selectedDate)
}
</script>

<style scoped>
/* Custom keyframes for modal animation */
@keyframes modal-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>