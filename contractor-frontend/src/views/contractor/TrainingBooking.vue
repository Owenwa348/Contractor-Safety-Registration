<!-- TrainingBooking.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
            <p class="text-2xl font-bold text-gray-800">{{ events.length }}</p>
          </div>
        </div>
      </div>

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
    
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Calendar Component -->
      <div class="bg-white rounded-lg border border-gray-300 shadow-sm">
        
        <!-- Calendar Header -->
        <div class="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-300">
          <div class="flex items-center gap-2 mb-4 sm:mb-0">
            <button
              @click="previousMonth"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="เดือนก่อน"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              @click="nextMonth"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="เดือนถัดไป"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button
              @click="goToToday"
              class="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              วันนี้
            </button>
          </div>

          <h2 class="text-xl font-normal text-gray-700 text-center flex-1">
            {{ currentMonthYear }}
          </h2>

          <div class="flex gap-1 mt-4 sm:mt-0">
            <button
              :class="[
                'px-3 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                viewMode === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100',
              ]"
              @click="viewMode = 'month'"
            >
              เดือน
            </button>
            <button
              :class="[
                'px-3 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                viewMode === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100',
              ]"
              @click="viewMode = 'week'"
            >
              สัปดาห์
            </button>
          </div>
        </div>

        <!-- Month View -->
        <div v-if="viewMode === 'month'">
          <!-- Day Headers -->
          <div class="grid grid-cols-7 border-b border-gray-200">
            <div
              v-for="day in daysOfWeek"
              :key="day"
              class="p-3 text-center text-sm font-medium text-gray-700 bg-gradient-to-b from-gray-50 to-gray-100"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Dates -->
          <div class="grid grid-cols-7">
            <div
              v-for="date in calendarDates"
              :key="date.key"
              class="min-h-[100px] border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors relative"
              :class="{
                'text-gray-400': !date.isCurrentMonth,
                'bg-blue-50': date.isToday,
              }"
            >
              <div class="p-2">
                <span
                  class="text-sm inline-flex items-center justify-center w-6 h-6 rounded-full"
                  :class="date.isToday 
                    ? 'bg-blue-600 text-white font-medium' 
                    : date.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'"
                >
                  {{ date.day }}
                </span>
              </div>

              <!-- Events for this date -->
              <div class="px-1 pb-1 space-y-1">
                <div
                  v-for="eventDisplay in date.eventDisplays"
                  :key="eventDisplay.key"
                  class="relative"
                  :style="{ 
                    marginTop: eventDisplay.row * 22 + 'px',
                    position: eventDisplay.row > 0 ? 'absolute' : 'relative',
                    top: eventDisplay.row > 0 ? '0' : 'auto',
                    left: eventDisplay.row > 0 ? '4px' : 'auto',
                    right: eventDisplay.row > 0 ? '4px' : 'auto',
                    zIndex: eventDisplay.row
                  }"
                >
                  <div
                    v-if="eventDisplay.type === 'event'"
                    class="text-xs px-2 py-1 text-white transition-all duration-200 truncate relative overflow-hidden cursor-pointer hover:opacity-80 hover:scale-[1.02] hover:shadow-sm"
                    :class="[
                      isEventPast(eventDisplay.event) 
                        ? 'bg-gray-400 cursor-not-allowed hover:opacity-100 hover:scale-100 hover:shadow-none' 
                        : 'bg-blue-600',
                      getMultiDayBarClass(eventDisplay.barPosition)
                    ]"
                    @click.stop="!isEventPast(eventDisplay.event) && viewEvent(eventDisplay.event, date.fullDate)"
                    :title="eventDisplay.event.title + (eventDisplay.event.isMultiDay ? ` (${formatDateRange(eventDisplay.event.startDate, eventDisplay.event.endDate)})` : '')"
                  >
                    <span class="relative z-10">{{ eventDisplay.displayText }}</span>
                    <!-- Continuous bar effect for multi-day events -->
                    <div 
                      v-if="eventDisplay.isMultiDayBar && eventDisplay.barPosition !== 'single'" 
                      class="absolute inset-0"
                      :class="[
                        isEventPast(eventDisplay.event) ? 'bg-gray-400' : 'bg-blue-600',
                        getBarExtensionClass(eventDisplay.barPosition)
                      ]"
                    ></div>
                  </div>
                  
                  <div
                    v-else-if="eventDisplay.type === 'more'"
                    class="text-xs px-2 py-1 text-gray-600 cursor-pointer hover:bg-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    @click.stop="showMoreEvents(date)"
                    tabindex="0"
                    @keydown.enter="showMoreEvents(date)"
                  >
                    +{{ eventDisplay.count }} เพิ่มเติม
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-else-if="viewMode === 'week'" class="grid-cols-[100px_repeat(7,1fr)] md:grid-cols-[100px_repeat(7,1fr)]">
          <div class="grid grid-cols-[100px_repeat(7,1fr)] border-b border-gray-200">
            <div class="p-4 text-center text-sm font-medium text-gray-700 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200">
              เวลา
            </div>
            <div
              v-for="day in weekDays"
              :key="day.key"
              class="p-4 text-center bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 last:border-r-0"
            >
              <div class="text-sm font-medium text-gray-700">{{ day.dayName }}</div>
              <div 
                class="text-lg mt-1 w-8 h-8 flex items-center justify-center rounded-full mx-auto"
                :class="day.isToday ? 'bg-blue-600 text-white' : 'text-gray-600'"
              >
                {{ day.date }}
              </div>
            </div>
          </div>

          <!-- Time Slots -->
          <div class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded-sm hover:scrollbar-thumb-gray-400">
            <div
              v-for="hour in timeSlots"
              :key="`hour-${hour}`"
              class="grid grid-cols-[100px_repeat(7,1fr)] border-b border-gray-100"
            >
              <div class="p-3 text-xs text-gray-500 bg-gray-50 border-r border-gray-200 text-center">
                {{ hour }}:00
              </div>
              <div
                v-for="day in weekDays"
                :key="`${day.key}-${hour}`"
                class="min-h-[64px] p-2 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors active:scale-[0.98] active:bg-gray-50"
                @click="addEventToTimeSlot(day.fullDate, hour)"
              >
                <div
                  v-for="event in getEventsForDayAndHour(day.fullDate, hour)"
                  :key="event.id"
                  class="text-xs px-2 py-1 rounded mb-1 text-white transition-all duration-200 truncate cursor-pointer hover:scale-[1.02] hover:shadow-sm"
                  :class="isEventPast(event) 
                    ? 'bg-gray-400 cursor-not-allowed hover:scale-100 hover:shadow-none' 
                    : 'bg-blue-600 hover:opacity-80'"
                  @click.stop="!isEventPast(event) && viewEvent(event, day.fullDate)"
                  :title="event.title"
                >
                  {{ event.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Details Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 animate-[modal-fade-in_0.2s_ease-out]">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ selectedEvent && selectedDate 
                ? `รายละเอียดการอบรม `
                : 'รายละเอียดการอบรม' 
              }}
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div v-if="selectedEvent" class="space-y-4">
            <div class="border-l-4 pl-4 border-blue-600">
              <h4 class="text-xl font-semibold text-gray-900">{{ selectedEvent.title }}</h4>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label class="text-gray-600 font-medium">วันที่</label>
                <p class="text-gray-900">
                  {{ selectedEvent.isMultiDay && selectedDate
                    ? formatThaiDate(selectedDate)
                    : selectedEvent.isMultiDay 
                      ? formatDateRange(selectedEvent.startDate, selectedEvent.endDate)
                      : formatThaiDate(selectedEvent.date || selectedEvent.startDate) 
                  }}
                </p>
              </div>
              <div v-if="!selectedEvent.isAllDay">
                <label class="text-gray-600 font-medium">เวลา</label>
                <p class="text-gray-900">{{ selectedEvent.time }}:00 น.</p>
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
            
            <div class="text-sm">
              <label class="text-gray-600 font-medium">จำนวนผู้เข้าร่วม</label>
              <p class="text-gray-900">
                {{ selectedEvent.participantCount }}/{{ selectedEvent.capacity }} คน
                <span class="ml-2 px-2 py-1 rounded-full text-xs"
                      :class="selectedEvent.participantCount >= selectedEvent.capacity 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'">
                  {{ selectedEvent.participantCount >= selectedEvent.capacity ? 'เต็ม' : 'ว่าง' }}
                </span>
              </p>
            </div>

            <!-- Date selection for multi-day events -->
            <div v-if="selectedEvent.isMultiDay && !selectedDate" class="space-y-3">
              <label class="text-gray-600 font-medium text-sm">เลือกวันที่ต้องการจอง:</label>
              <div class="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded hover:scrollbar-thumb-slate-400">
                <button
                  v-for="date in getAvailableDatesForMultiDayEvent(selectedEvent)"
                  :key="date"
                  @click="selectSpecificDate(date)"
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
                      <span v-else-if="isRegistrationDeadlinePassed(date)" class="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center justify-center">
                        หมดเขตลงทะเบียน
                      </span>
                      <span v-else class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center justify-center">
                        สามารถจองได้
                      </span>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mt-1">
                    กำหนดลงทะเบียนภายใน: {{ formatThaiDate(getRegistrationDeadlineForDate(date)) }}
                  </div>
                </button>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <div v-if="selectedEvent.isMultiDay && !selectedDate" class="text-center text-gray-600">
                กรุณาเลือกวันที่ก่อนทำการจอง
              </div>
              <div v-else>
                <button
                  @click="bookTrainingFromModal"
                  :disabled="!canBookEvent()"
                  class="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:transform-none disabled:shadow-none"
                  :class="!canBookEvent()
                    ? 'bg-gray-300 text-gray-500 focus:ring-gray-400'
                    : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 hover:-translate-y-0.5 hover:shadow-lg text-white shadow-sm focus:ring-blue-500'"
                >
                  {{ getBookingButtonText() }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- More Events Modal -->
      <div
        v-if="showMoreModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        @click.self="closeMoreModal"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-[modal-fade-in_0.2s_ease-out]">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              การอบรมวันที่ {{ formatThaiDate(moreEventsDate) }}
            </h3>
            <button 
              @click="closeMoreModal" 
              class="text-gray-400 hover:text-gray-600 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="event in moreEventsList"
              :key="event.id"
              class="p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :class="isEventPast(event) 
                ? 'cursor-not-allowed bg-gray-50 opacity-60 hover:translate-y-0 hover:shadow-none' 
                : 'cursor-pointer hover:bg-gray-50 hover:border-gray-300'"
              @click="!isEventPast(event) && viewEventFromMore(event)"
              tabindex="0"
              @keydown.enter="!isEventPast(event) && viewEventFromMore(event)"
            >
              <div class="flex items-center">
                <div 
                  class="w-3 h-3 rounded-full mr-3" 
                  :class="isEventPast(event) ? 'bg-gray-400' : 'bg-blue-600'"
                ></div>
                <div>
                  <div class="font-medium" :class="isEventPast(event) ? 'text-gray-500' : 'text-gray-900'">
                    {{ event.title }}
                  </div>
                  <div class="text-sm" :class="isEventPast(event) ? 'text-gray-400' : 'text-gray-600'">
                    {{ event.isAllDay ? 'ทั้งวัน' : event.time + ':00 น.' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Reactive data
const viewMode = ref("month");
const currentDate = ref(new Date());
const showModal = ref(false);
const showMoreModal = ref(false);
const selectedEvent = ref(null);
const selectedDate = ref(null); // For multi-day event date selection
const moreEventsDate = ref('');
const moreEventsList = ref([]);
const router = useRouter();

// Constants
const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const monthNames = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

// Enhanced Events data with registration requirements
const events = ref([
  {
    id: 1,
    title: "อบรมพื้นฐานความปลอดภัย",
    startDate: "2025-08-20",
    endDate: "2025-08-20",
    isMultiDay: false,
    isAllDay: true,
    time: 8,
    participantCount: 12,
    capacity: 30,
    color: 'blue',
    registrationDaysBefore: 1 // ต้องลงทะเบียนล่วงหน้า 1 วัน
  },
  {
    id: 2,
    title: "อบรมการใช้เครื่องมือ",
    startDate: "2025-08-22",
    endDate: "2025-08-24",
    isMultiDay: true,
    isAllDay: true,
    time: 8,
    participantCount: 8,
    capacity: 30,
    color: 'blue',
    registrationDaysBefore: 2 // ต้องลงทะเบียนล่วงหน้า 2 วัน
  },
  {
    id: 3,
    title: "อบรมการใช้เครื่องจักร",
    startDate: "2025-08-27",
    endDate: "2025-08-30", 
    isMultiDay: true,
    isAllDay: true,
    time: 8,
    participantCount: 15,
    capacity: 30,
    color: 'blue',
    registrationDaysBefore: 2 // ต้องลงทะเบียนล่วงหน้า 2 วัน
  },
  {
    id: 4,
    title: "อบรมการประกอบอุปกรณ์",
    startDate: "2025-09-12",
    endDate: "2025-09-18", 
    isMultiDay: true,
    isAllDay: true,
    time: 8,
    participantCount: 20,
    capacity: 30,
    color: 'blue',
    registrationDaysBefore: 1 // ต้องลงทะเบียนล่วงหน้า 1 วัน
  },
]);

// Computed properties
const currentMonthYear = computed(() => {
  const year = currentDate.value.getFullYear() + 543;
  const month = monthNames[currentDate.value.getMonth()];
  return `${month} ${year}`;
});

const thisMonthEvents = computed(() => {
  const currentMonth = currentDate.value.getMonth();
  const currentYear = currentDate.value.getFullYear();
  return events.value.filter((event) => {
    if (event.isMultiDay) {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      return (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) ||
             (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear) ||
             (startDate.getMonth() < currentMonth && endDate.getMonth() > currentMonth && 
              startDate.getFullYear() === currentYear && endDate.getFullYear() === currentYear);
    } else {
      const eventDate = new Date(event.startDate);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    }
  }).length;
});

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const dateString = formatDateString(date);
    const dayEvents = getEventsForDate(dateString);
    
    dates.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      day: date.getDate(),
      fullDate: dateString,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      events: dayEvents,
      eventDisplays: generateEventDisplays(dayEvents, dateString)
    });
  }

  return dates;
});

const weekDays = computed(() => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());
  const today = new Date();

  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    days.push({
      key: i,
      dayName: daysOfWeek[i],
      date: date.getDate(),
      fullDate: formatDateString(date),
      isToday: date.toDateString() === today.toDateString()
    });
  }

  return days;
});

const timeSlots = computed(() => {
  const slots = [];
  for (let i = 6; i <= 18; i++) {
    slots.push(i.toString().padStart(2, "0"));
  }
  return slots;
});

// Helper Methods
const formatDateString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isEventPast = (event) => {
  if (!event) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventEndDate = event.isMultiDay ? new Date(event.endDate) : new Date(event.startDate);
  eventEndDate.setHours(0, 0, 0, 0);
  
  return eventEndDate < today;
};

const isPastDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(dateString);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
};

const getRegistrationDeadline = () => {
  if (!selectedEvent.value || !selectedDate.value) return null;
  
  const targetDate = new Date(selectedDate.value);
  const deadline = new Date(targetDate);
  deadline.setDate(deadline.getDate() - selectedEvent.value.registrationDaysBefore);
  
  return formatDateString(deadline);
};

const getRegistrationDeadlineForDate = (dateString) => {
  if (!selectedEvent.value) return null;
  
  const targetDate = new Date(dateString);
  const deadline = new Date(targetDate);
  deadline.setDate(deadline.getDate() - selectedEvent.value.registrationDaysBefore);
  
  return formatDateString(deadline);
};

const isRegistrationPeriodPassed = () => {
  if (!selectedEvent.value || !selectedDate.value) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const deadline = new Date(getRegistrationDeadline());
  deadline.setHours(23, 59, 59, 999); // End of deadline day
  
  return today > deadline;
};

const isRegistrationDeadlinePassed = (dateString) => {
  if (!selectedEvent.value) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const deadline = new Date(getRegistrationDeadlineForDate(dateString));
  deadline.setHours(23, 59, 59, 999);
  
  return today > deadline;
};

const getAvailableDatesForMultiDayEvent = (event) => {
  if (!event || !event.isMultiDay) return [];
  
  const dates = [];
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(formatDateString(new Date(d)));
  }
  
  return dates;
};

const canBookEvent = () => {
  if (!selectedEvent.value) return false;
  
  // Check if event is full
  if (selectedEvent.value.participantCount >= selectedEvent.value.capacity) return false;
  
  // For single day events
  if (!selectedEvent.value.isMultiDay) {
    if (isEventPast(selectedEvent.value)) return false;
    return !isRegistrationPeriodPassed();
  }
  
  // For multi-day events, need to select a specific date first
  if (!selectedDate.value) return false;
  
  // Check if selected date is past
  if (isPastDate(selectedDate.value)) return false;
  
  // Check if registration deadline has passed for selected date
  return !isRegistrationDeadlinePassed(selectedDate.value);
};

const getBookingButtonText = () => {
  if (!selectedEvent.value) return 'ไม่สามารถจองได้';
  
  if (selectedEvent.value.participantCount >= selectedEvent.value.capacity) {
    return 'การอบรมเต็มแล้ว';
  }
  
  if (!selectedEvent.value.isMultiDay) {
    if (isEventPast(selectedEvent.value)) return 'การอบรมผ่านไปแล้ว';
    if (isRegistrationPeriodPassed()) return 'หมดเขตลงทะเบียนแล้ว';
    return 'จองอบรมให้ทีมงาน';
  }
  
  if (!selectedDate.value) return 'กรุณาเลือกวันที่';
  
  if (isPastDate(selectedDate.value)) return 'วันที่เลือกผ่านไปแล้ว';
  if (isRegistrationDeadlinePassed(selectedDate.value)) return 'หมดเขตลงทะเบียนแล้ว';
  
  return 'จองอบรมให้ทีมงาน';
};

const selectSpecificDate = (dateString) => {
  selectedDate.value = dateString;
};

const getEventsForDate = (dateString) => {
  return events.value.filter((event) => {
    if (event.isMultiDay) {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const currentDate = new Date(dateString);
      return currentDate >= startDate && currentDate <= endDate;
    } else {
      return event.startDate === dateString;
    }
  });
};

const generateEventDisplays = (dayEvents, dateString) => {
  const displays = [];
  const maxDisplayed = 3;
  
  // Group multi-day events by title and create continuous bars
  const processedEvents = new Set();
  let rowIndex = 0;
  
  dayEvents.forEach((event) => {
    if (processedEvents.has(event.id) || rowIndex >= maxDisplayed) return;
    
    if (event.isMultiDay) {
      const currentDate = new Date(dateString);
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      let displayText = event.title;
      let barPosition = 'middle'; // start, middle, end, single
      
      if (currentDate.getTime() === startDate.getTime() && currentDate.getTime() === endDate.getTime()) {
        barPosition = 'single';
      } else if (currentDate.getTime() === startDate.getTime()) {
        barPosition = 'start';
      } else if (currentDate.getTime() === endDate.getTime()) {
        barPosition = 'end';
      } else {
        barPosition = 'middle';
      }
      
      displays.push({
        key: `event-${event.id}-${dateString}`,
        type: 'event',
        event: event,
        displayText: displayText,
        row: rowIndex,
        isMultiDayBar: true,
        barPosition: barPosition
      });
    } else {
      displays.push({
        key: `event-${event.id}-${dateString}`,
        type: 'event',
        event: event,
        displayText: event.title,
        row: rowIndex,
        isMultiDayBar: false,
        barPosition: 'single'
      });
    }
    
    processedEvents.add(event.id);
    rowIndex++;
  });
  
  if (dayEvents.length > maxDisplayed) {
    displays.push({
      key: `more-${dateString}`,
      type: 'more',
      count: dayEvents.length - maxDisplayed,
      row: maxDisplayed
    });
  }
  
  return displays;
};

const getEventsForDayAndHour = (dateString, hour) => {
  return events.value.filter((event) => {
    const isDateMatch = event.isMultiDay 
      ? (new Date(dateString) >= new Date(event.startDate) && new Date(dateString) <= new Date(event.endDate))
      : event.startDate === dateString;
    
    return isDateMatch && event.time === parseInt(hour);
  });
};

// Navigation Methods
const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const goToToday = () => {
  currentDate.value = new Date();
};

// Modal Methods
const viewEvent = (event, clickedDate = null) => {
  selectedEvent.value = event;
  selectedDate.value = null;
  
  // If it's a multi-day event and we clicked on a specific date, pre-select that date
  if (event.isMultiDay && clickedDate) {
    selectedDate.value = clickedDate;
  }
  
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedEvent.value = null;
  selectedDate.value = null;
};

const showMoreEvents = (date) => {
  moreEventsDate.value = date.fullDate;
  moreEventsList.value = date.events;
  showMoreModal.value = true;
};

const closeMoreModal = () => {
  showMoreModal.value = false;
  moreEventsDate.value = '';
  moreEventsList.value = [];
};

const viewEventFromMore = (event) => {
  closeMoreModal();
  viewEvent(event, moreEventsDate.value);
};

const bookTrainingFromModal = () => {
  if (!selectedEvent.value) {
    console.error("ไม่มีข้อมูลการอบรมที่เลือก");
    return;
  }

  if (!canBookEvent()) {
    return;
  }

  const currentEvent = { ...selectedEvent.value };
  const bookingDate = selectedDate.value || currentEvent.startDate;
  closeModal();

  const queryParams = {
    eventId: String(currentEvent.id),
    eventTitle: currentEvent.title,
    eventDate: bookingDate,
    eventTime: String(currentEvent.time || 8),
    examiner: "นายสมชัย งบ.1",
    type: currentEvent.title,
    room: "ห้อง A",
    registrationDaysBefore: String(currentEvent.registrationDaysBefore || 1),
    // Add the specific exam date for individual tracking
    examDate: bookingDate
  };

  if (currentEvent.isMultiDay) {
    queryParams.eventEndDate = currentEvent.endDate;
    queryParams.isMultiDay = "true";
    queryParams.selectedDate = bookingDate;
    queryParams.round = `${formatThaiDate(bookingDate)} ${currentEvent.time}:00-12:00`;
    // For multi-day events, use the selected specific date as exam date
    queryParams.examDateDisplay = formatThaiDate(bookingDate);
  } else {
    queryParams.round = `${currentEvent.startDate} ${currentEvent.time}:00-12:00`;
    queryParams.examDateDisplay = formatThaiDate(currentEvent.startDate);
  }

  router
    .push({
      path: "/book-training",
      query: queryParams,
    })
    .catch((err) => {
      console.error("Navigation error:", err);
      const params = new URLSearchParams(queryParams);
      window.location.href = `/book-training?${params.toString()}`;
    });
};

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
};

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    // Same month and year
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} - ${end.getDate()} ${month} ${year}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    // Same year, different month
    const startMonth = monthNames[start.getMonth()];
    const endMonth = monthNames[end.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${year}`;
  } else {
    // Different year
    return `${formatThaiDate(startDate)} - ${formatThaiDate(endDate)}`;
  }
};

const addEventToTimeSlot = (dateString, hour) => {
  console.log("เพิ่มการอบรมใหม่ในวันที่:", dateString, "เวลา:", hour);
  // สามารถเปิด modal หรือไปหน้าจองอบรมใหม่ได้
};

// Multi-day bar styling helper
const getMultiDayBarClass = (barPosition) => {
  switch (barPosition) {
    case 'start':
      return 'rounded-l-md rounded-r-none';
    case 'middle':
      return 'rounded-none';
    case 'end':
      return 'rounded-r-md rounded-l-none';
    case 'single':
    default:
      return 'rounded-md';
  }
};

const getBarExtensionClass = (barPosition) => {
  switch (barPosition) {
    case 'start':
      return 'rounded-r-none -mr-1';
    case 'middle':
      return 'rounded-none -ml-1 -mr-1';
    case 'end':
      return 'rounded-l-none -ml-1';
    default:
      return '';
  }
};
</script>

<style>
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

/* Print styles */
@media print {
  .fixed,
  .backdrop-blur-sm {
    display: none !important;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Screen reader only utility */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>