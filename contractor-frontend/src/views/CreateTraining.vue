<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">ระบบจองการฝึกอบรม</h1>
        <p class="text-gray-600">เลือกวันที่และเวลาสำหรับการฝึกอบรมของคุณ</p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-lg p-6 shadow border border-gray-200 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
              <p class="text-2xl font-bold" :class="stat.color">{{ stat.value }}</p>
            </div>
            <div class="p-3 rounded-lg" :class="stat.bgColor">
              <svg class="w-6 h-6" :class="stat.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Training Button -->
      <div class="mb-6 flex justify-end">
        <button 
          @click="openCreateTrainingModal" 
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-all hover:shadow-lg flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          สร้างการอบรม
        </button>
      </div>

      <!-- Calendar Component -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <!-- Calendar Header -->
        <div class="flex flex-col lg:flex-row justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div class="flex items-center gap-3 mb-4 lg:mb-0">
            <button @click="previousPeriod" class="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all" :title="viewMode === 'month' ? 'เดือนก่อน' : 'สัปดาห์ก่อน'">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextPeriod" class="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all" :title="viewMode === 'month' ? 'เดือนถัดไป' : 'สัปดาห์ถัดไป'">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button @click="goToToday" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-all hover:shadow-lg">วันนี้</button>
            <div class="hidden md:flex items-center gap-2 ml-4">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="ค้นหาการอบรม..." 
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button @click="clearSearch" v-if="searchQuery" class="p-2 text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          <h2 class="text-xl font-bold text-gray-800 text-center flex-1">{{ currentPeriodTitle }}</h2>
          <div class="flex gap-2 mt-4 lg:mt-0">
            <button v-for="mode in viewModes" :key="mode.value" :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-md',
                viewMode === mode.value ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
              ]" @click="setViewMode(mode.value)">{{ mode.label }}</button>
          </div>
        </div>

        <!-- Month View -->
        <div v-if="viewMode === 'month'" class="grid grid-cols-7">
          <div v-for="day in daysOfWeek" :key="day" class="p-4 text-center font-semibold text-gray-700 bg-gray-100 border-r border-gray-200 last:border-r-0">{{ day }}</div>
          <div v-for="date in calendarDates" :key="date.key" class="min-h-[120px] p-3 border-r border-b border-gray-200 last:border-r-0 cursor-pointer transition-all hover:bg-gray-50" :class="getDateCellClass(date)" @click="selectDate(date)">
            <div class="flex justify-between items-start mb-2">
              <span class="text-sm font-semibold" :class="date.isToday ? 'text-blue-600' : ''">{{ date.day }}</span>
              <span v-if="date.isToday" class="text-xs bg-blue-600 text-white px-2 py-1 rounded">วันนี้</span>
            </div>
            <div class="space-y-1">
              <div v-for="event in getEventsForDate(date.fullDate)" :key="event.id" class="text-xs text-white p-2 rounded cursor-pointer hover:opacity-80 transition-all hover:shadow-sm" @click.stop="viewEvent(event)" :style="{ backgroundColor: event.color }" draggable="true" @dragstart="startDrag(event, $event)" @dragover.prevent @drop="handleDrop(date.fullDate, $event)">
                <div class="font-medium truncate">{{ event.title }}</div>
                <div class="text-xs opacity-90">{{ formatTime(event.time) }}</div>
                <div class="text-xs opacity-90">{{ event.currentParticipants || 0 }}/{{ event.maxParticipants }} คน</div>
              </div>
            </div>
            <button v-if="canAddEvent(date)" @click.stop="openAddEventModal(date.fullDate)" class="w-full mt-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded border border-dashed border-blue-300 transition-all">+ เพิ่มการอบรม</button>
            <div v-else-if="hasMaxEvents(date.fullDate)" class="w-full mt-2 py-1 text-xs text-gray-500 text-center">เต็มแล้ว</div>
          </div>
        </div>

        <!-- Week View -->
        <div v-else-if="viewMode === 'week'">
          <div class="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] border-b border-gray-200">
            <div class="p-4 text-center font-semibold text-gray-700 bg-gray-100 border-r border-gray-200">เวลา</div>
            <div v-for="day in weekDays" :key="day.key" class="p-4 text-center bg-gray-100 border-r border-gray-200 last:border-r-0" :class="{ 'bg-blue-100': day.isToday }">
              <div class="font-semibold text-gray-700">{{ day.dayName }}</div>
              <div class="text-sm text-gray-500 mt-1">{{ day.date }}</div>
              <div v-if="day.isToday" class="text-xs text-blue-600 font-medium mt-1">วันนี้</div>
            </div>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div v-for="hour in timeSlots" :key="`hour-${hour}`" class="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] border-b border-gray-100">
              <div class="p-3 text-xs text-gray-600 bg-gray-50 border-r border-gray-200 font-medium">{{ hour }}:00</div>
              <div v-for="day in weekDays" :key="`${day.key}-${hour}`" class="min-h-16 p-2 border-r border-gray-200 last:border-r-0 cursor-pointer transition-all" :class="getTimeSlotClass(day.fullDate, parseInt(hour))" @click="addEventToTimeSlot(day.fullDate, hour)" @dragover.prevent @drop="handleDropToTimeSlot(day.fullDate, parseInt(hour), $event)">
                <div v-for="event in getEventsForDayAndHour(day.fullDate, hour)" :key="event.id" class="text-xs text-white p-2 rounded mb-1 cursor-pointer hover:opacity-80 transition-all hover:shadow-sm" :style="{ backgroundColor: event.color }" @click.stop="viewEvent(event)" draggable="true" @dragstart="startDrag(event, $event)">
                  <div class="font-medium">{{ event.title }}</div>
                  <div class="text-xs opacity-90">{{ event.currentParticipants || 0 }}/{{ event.maxParticipants }} คน</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Event Modal -->
      <div v-if="showAddEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeAddEventModal">
        <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-lg max-h-[90vh] overflow-y-auto" @click.stop>
          <h3 class="text-xl font-bold text-gray-800 mb-4">{{ editingEvent ? 'แก้ไขการอบรม' : 'เพิ่มการอบรมใหม่' }}</h3>
          <form @submit.prevent="saveEvent" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้อการอบรม <span class="text-red-500">*</span></label>
              <input v-model.trim="eventForm.title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="กรอกหัวข้อการอบรม" maxlength="100" />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">วันที่ <span class="text-red-500">*</span></label>
                <input v-model="eventForm.date" type="date" required :min="minDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">เวลา <span class="text-red-500">*</span></label>
                <select v-model.number="eventForm.time" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">เลือกเวลา</option>
                  <option v-for="hour in availableTimeSlots" :key="hour" :value="hour">{{ formatTimeSlot(hour) }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ประเภทการอบรม <span class="text-red-500">*</span></label>
              <select v-model="eventForm.type" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">เลือกประเภท</option>
                <option v-for="type in trainingTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ผู้สอน/ผู้ตรวจ <span class="text-red-500">*</span></label>
              <input v-model.trim="eventForm.examiner" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="ชื่อผู้สอน" maxlength="50" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ห้องอบรม <span class="text-red-500">*</span></label>
              <select v-model="eventForm.room" required @change="updateMaxParticipantsFromRoom" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">เลือกห้อง</option>
                <option v-for="room in availableRooms" :key="room.name" :value="room.name">{{ room.name }} ({{ room.capacity }} ที่นั่ง)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">จำนวนผู้เข้าอบรมสูงสุด <span class="text-red-500">*</span></label>
              <input v-model.number="eventForm.maxParticipants" type="number" min="1" :max="getMaxCapacityForSelectedRoom()" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="จำนวนสูงสุด" />
              <p v-if="eventForm.room" class="text-xs text-gray-500 mt-1">ห้องนี้รองรับได้สูงสุด {{ getMaxCapacityForSelectedRoom() }} คน</p>
            </div>

            <div v-if="hasFormErrors" class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-sm text-red-600">{{ formErrorMessage }}</p>
            </div>

            <div class="flex gap-3 pt-4">
              <button type="submit" :disabled="!isFormValid" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {{ editingEvent ? 'บันทึกการแก้ไข' : 'สร้างการอบรม' }}
              </button>
              <button type="button" @click="closeAddEventModal" class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-all hover:-translate-y-0.5">ยกเลิก</button>
            </div>
          </form>
        </div>
      </div>

      <!-- View Event Modal -->
      <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeViewModal">
        <div class="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg" @click.stop>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-gray-800">รายละเอียดการอบรม</h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div v-if="selectedEvent" class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-bold text-lg text-gray-800 mb-3">{{ selectedEvent.title }}</h4>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <div v-for="detail in eventDetails" :key="detail.label" class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="detail.icon"></path>
                  </svg>
                  <span class="text-gray-700">{{ detail.value }}</span>
                </div>
              </div>
              
              <!-- แสดงสถาน��ผู้เข้าอบรม -->
              <div class="mt-4 p-3 bg-white rounded border">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">สถานะผู้เข้าอบรม</span>
                  <span class="text-sm font-bold" :class="getParticipantStatusColor(selectedEvent)">
                    {{ selectedEvent.maxParticipants - (selectedEvent.currentParticipants || 0) }} ที่ว่าง
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: `${getParticipantPercentage(selectedEvent)}%` }"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500">
                  <span>{{ selectedEvent.currentParticipants || 0 }} คน</span>
                  <span>{{ selectedEvent.maxParticipants }} คน</span>
                </div>
              </div>
            </div>
            
            <div class="flex gap-3 pt-4">
              <button @click="editEvent(selectedEvent)" class="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-all hover:-translate-y-0.5">แก้ไข</button>
              <button @click="deleteEvent(selectedEvent.id)" class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-all hover:-translate-y-0.5">ลบ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// Reactive data
const viewMode = ref("month");
const currentDate = ref(new Date());
const showAddEventModal = ref(false);
const showViewModal = ref(false);
const showMoveModal = ref(false);
const selectedEvent = ref(null);
const editingEvent = ref(false);
const selectedDate = ref("");
const draggedEvent = ref(null);
const moveTarget = ref({ date: "", time: 0 });
const searchQuery = ref("");
const showQuickAdd = ref(false);
const quickAddForm = ref({
  title: "",
  date: "",
  time: ""
});

// Event form data
const eventForm = ref({
  title: "",
  date: "",
  time: "",
  type: "",
  examiner: "",
  room: "",
  maxParticipants: null,
  currentParticipants: 0,
});

// Sample events data
const events = ref([
  { 
    id: 1, 
    title: "อบรมพื้นฐานความปลอดภัย", 
    date: "2025-08-20", 
    time: 9, 
    type: "อบรมพื้นฐานความปลอดภัย", 
    examiner: "นายสมชัย งบ.1", 
    room: "ห้อง A (30 ที่นั่ง)", 
    color: "#3b82f6", 
    maxParticipants: 25, 
    currentParticipants: 20, 
    isBooked: false 
  },
  { 
    id: 2, 
    title: "อบรมผู้ควบคุมงาน", 
    date: "2025-08-22", 
    time: 13, 
    type: "อบรมผู้ควบคุมงาน", 
    examiner: "นายสุรพล งบ.2", 
    room: "ห้อง B (50 ที่นั่ง)", 
    color: "#10b981", 
    maxParticipants: 20, 
    currentParticipants: 5, 
    isBooked: false 
  },
  { 
    id: 3, 
    title: "อบรมการใช้เครื่องมือ", 
    date: "2025-08-25", 
    time: 10, 
    type: "อบรมการใช้เครื่องมือ", 
    examiner: "นายอนุชา งบ.3", 
    room: "ห้อง C (20 ที่นั่ง)", 
    color: "#f59e0b", 
    maxParticipants: 15, 
    currentParticipants: 15, 
    isBooked: false 
  }
]);

// Constants
const daysOfWeek = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const trainingTypes = ["อบรมพื้นฐานความปลอดภัย", "อบรมผู้ควบคุมงาน", "อบรมการใช้เครื่องมือ", "อบรมการดับเพลิง"];
const rooms = [
  { name: "ห้อง A (30 ที่นั่ง)", capacity: 30 },
  { name: "ห้อง B (50 ที่นั่ง)", capacity: 50 },
  { name: "ห้อง C (20 ที่นั่ง)", capacity: 20 },
  { name: "ห้องประชุมใหญ่ (100 ที่นั่ง)", capacity: 100 }
];
const viewModes = [{ value: 'month', label: 'เดือน' }, { value: 'week', label: 'สัปดาห์' }];

// Computed properties
const stats = computed(() => [
  { label: "การอบรมเดือนนี้", value: thisMonthEvents.value, color: "text-blue-600", bgColor: "bg-blue-100", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "ที่นั่งว่าง", value: availableSeats.value, color: "text-green-600", bgColor: "bg-green-100", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
]);

const eventDetails = computed(() => {
  if (!selectedEvent.value) return [];
  return [
    { label: "วันที่", value: formatThaiDate(selectedEvent.value.date), icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "เวลา", value: formatTime(selectedEvent.value.time), icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "สถานที่", value: selectedEvent.value.room, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
    { label: "ผู้สอน", value: selectedEvent.value.examiner, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { label: "จำนวนผู้เข้าอบรม", value: `${selectedEvent.value.currentParticipants || 0}/${selectedEvent.value.maxParticipants} คน`, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
  ];
});

const currentMonthYear = computed(() => `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear() + 543}`);

const currentPeriodTitle = computed(() => {
  if (viewMode.value === 'week') {
    const startOfWeek = new Date(currentDate.value);
    startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      return `${startOfWeek.getDate()}-${endOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getFullYear() + 543}`;
    } else {
      return `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${monthNames[endOfWeek.getMonth()]} ${startOfWeek.getFullYear() + 543}`;
    }
  }
  return currentMonthYear.value;
});

const filteredEvents = computed(() => {
  if (!searchQuery.value.trim()) return events.value;
  
  const query = searchQuery.value.toLowerCase().trim();
  return events.value.filter(event => 
    event.title.toLowerCase().includes(query) ||
    event.type.toLowerCase().includes(query) ||
    event.examiner.toLowerCase().includes(query) ||
    event.room.toLowerCase().includes(query)
  );
});

const thisMonthEvents = computed(() => {
  const eventsInMonth = events.value.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentDate.value.getMonth() && eventDate.getFullYear() === currentDate.value.getFullYear();
  });
  return eventsInMonth.length;
});

const availableSeats = computed(() => {
  return events.value.reduce((total, event) => {
    return total + (event.maxParticipants - (event.currentParticipants || 0));
  }, 0);
});

const myBookings = computed(() => events.value.filter(event => event.isBooked).length);

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const availableRooms = computed(() => {
  if (!eventForm.value.date || !eventForm.value.time) return rooms;
  
  const occupiedRooms = events.value
    .filter(event => 
      event.date === eventForm.value.date && 
      event.time === eventForm.value.time &&
      (!editingEvent.value || event.id !== selectedEvent.value?.id)
    )
    .map(event => event.room);
  
  return rooms.filter(room => !occupiedRooms.includes(room.name));
});

const availableTimeSlots = computed(() => {
  if (!eventForm.value.date) return [];
  
  const occupiedTimes = events.value
    .filter(event => 
      event.date === eventForm.value.date &&
      (!editingEvent.value || event.id !== selectedEvent.value?.id)
    )
    .map(event => event.time);
  
  return Array.from({length: 13}, (_, i) => i + 6)
    .filter(hour => !occupiedTimes.includes(hour));
});

const isFormValid = computed(() => {
  return eventForm.value.title.trim() && 
         eventForm.value.date && 
         eventForm.value.time !== '' && 
         eventForm.value.type && 
         eventForm.value.examiner.trim() && 
         eventForm.value.room && 
         eventForm.value.maxParticipants > 0 &&
         eventForm.value.maxParticipants <= getMaxCapacityForSelectedRoom();
});

const hasFormErrors = computed(() => {
  return !isFormValid.value && Object.values(eventForm.value).some(value => value !== '' && value !== null);
});

const formErrorMessage = computed(() => {
  if (eventForm.value.maxParticipants > getMaxCapacityForSelectedRoom()) {
    return 'จำนวนผู้เข้าอบรมเกินความจุของห้อง';
  }
  if (eventForm.value.date && isPastDate(eventForm.value.date)) {
    return 'ไม่สามารถสร้างการอบรมในวันที่ผ่านมาแล้ว';
  }
  return 'กรุณากรอกข้อมูลให้ครบถ้วน';
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
    const formattedDate = formatDateString(date);
    
    dates.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      day: date.getDate(),
      fullDate: formattedDate,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString()
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

const timeSlots = computed(() => Array.from({length: 13}, (_, i) => (i + 6).toString().padStart(2, "0")));

// Utility methods
const formatDateString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

const formatTime = (hour) => {
  const endHour = hour + 2;
  return `${hour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`;
};

const formatTimeSlot = (hour) => {
  return formatTime(hour);
};

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear() + 543}`;
};

const isPastDate = (dateString) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < today;
};

const getDateCellClass = (date) => {
  return {
    'bg-gray-50 text-gray-400': !date.isCurrentMonth,
    'bg-blue-50 border-blue-200': date.isToday,
    'cursor-not-allowed opacity-50': isPastDate(date.fullDate),
    'hover:bg-blue-50': date.isCurrentMonth && !isPastDate(date.fullDate)
  };
};

const getTimeSlotClass = (dateString, hour) => {
  return {
    'hover:bg-blue-50': !isPastDate(dateString) && !hasEventAtTime(dateString, hour),
    'cursor-not-allowed bg-gray-100': isPastDate(dateString) || hasEventAtTime(dateString, hour)
  };
};

const canAddEvent = (date) => {
  return date.isCurrentMonth && !isPastDate(date.fullDate) && !hasMaxEvents(date.fullDate);
};

const getParticipantStatusColor = (event) => {
  const available = event.maxParticipants - (event.currentParticipants || 0);
  if (available === 0) return 'text-red-600';
  if (available <= 5) return 'text-orange-600';
  return 'text-green-600';
};

const getParticipantPercentage = (event) => {
  return ((event.currentParticipants || 0) / event.maxParticipants) * 100;
};

// Navigation methods
const previousPeriod = () => {
  if (viewMode.value === 'month') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  } else if (viewMode.value === 'week') {
    const newDate = new Date(currentDate.value);
    newDate.setDate(currentDate.value.getDate() - 7);
    currentDate.value = newDate;
  }
};

const nextPeriod = () => {
  if (viewMode.value === 'month') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  } else if (viewMode.value === 'week') {
    const newDate = new Date(currentDate.value);
    newDate.setDate(currentDate.value.getDate() + 7);
    currentDate.value = newDate;
  }
};

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const goToToday = () => {
  currentDate.value = new Date();
};

const setViewMode = (mode) => {
  viewMode.value = mode;
  if (mode === 'week') {
    const today = new Date();
    currentDate.value = new Date(today);
  }
};

// Event management methods
const selectDate = (date) => {
  if (!canAddEvent(date)) return;
  openAddEventModal(date.fullDate);
};

const openAddEventModal = (dateString) => {
  selectedDate.value = dateString;
  eventForm.value = { 
    title: "", 
    date: dateString, 
    time: "", 
    type: "", 
    examiner: "", 
    room: "", 
    maxParticipants: null, 
    currentParticipants: 0 
  };
  editingEvent.value = false;
  showAddEventModal.value = true;
};

// Add the missing openCreateTrainingModal method
const openCreateTrainingModal = () => {
  const today = new Date();
  const todayString = formatDateString(today);
  openAddEventModal(todayString);
};

const closeAddEventModal = () => {
  showAddEventModal.value = false;
  selectedDate.value = "";
  editingEvent.value = false;
  eventForm.value = { 
    title: "", 
    date: "", 
    time: "", 
    type: "", 
    examiner: "", 
    room: "", 
    maxParticipants: null, 
    currentParticipants: 0 
  };
};

const updateMaxParticipantsFromRoom = () => {
  const selectedRoom = rooms.find(room => room.name === eventForm.value.room);
  if (selectedRoom && !eventForm.value.maxParticipants) {
    eventForm.value.maxParticipants = selectedRoom.capacity;
  }
};

const getMaxCapacityForSelectedRoom = () => {
  const selectedRoom = rooms.find(room => room.name === eventForm.value.room);
  return selectedRoom ? selectedRoom.capacity : 100;
};

const saveEvent = () => {
  if (!isFormValid.value) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง');
    return;
  }

  if (isPastDate(eventForm.value.date)) {
    alert('ไม่สามารถสร้างการอบรมในวันที่ผ่านมาแล้ว');
    return;
  }

  if (isTimeSlotTaken(eventForm.value.date, eventForm.value.time, editingEvent.value ? selectedEvent.value.id : null)) {
    alert("ช่วงเวลานี้มีการอบรมอื่นอยู่แล้ว กรุณาเลือกเวลาอื่น");
    return;
  }

  if (eventForm.value.maxParticipants > getMaxCapacityForSelectedRoom()) {
    alert(`ห้องนี้รองรับได้สูงสุด ${getMaxCapacityForSelectedRoom()} คน`);
    return;
  }
  
  try {
    if (editingEvent.value) {
      const index = events.value.findIndex(event => event.id === selectedEvent.value.id);
      if (index !== -1) {
        events.value[index] = { 
          ...events.value[index], 
          ...eventForm.value, 
          color: getEventColor(eventForm.value.type),
          currentParticipants: eventForm.value.currentParticipants || 0
        };
      }
    } else {
      const newEvent = { 
        id: Date.now(), 
        ...eventForm.value, 
        color: getEventColor(eventForm.value.type),
        isBooked: false,
        currentParticipants: 0
      };
      events.value.push(newEvent);
    }
    closeAddEventModal();
  } catch (error) {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่');
  }
};

const getEventColor = (type) => {
  const colorMap = { 
    "อบรมพื้นฐานความปลอดภัย": "#3b82f6", 
    "อบรมผู้ควบคุมงาน": "#10b981", 
    "อบรมการใช้เครื่องมือ": "#f59e0b", 
    "อบรมการดับเพลิง": "#ef4444" 
  };
  return colorMap[type] || "#6b7280";
};

const viewEvent = (event) => {
  selectedEvent.value = event;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  selectedEvent.value = null;
};

const editEvent = (event) => {
  selectedEvent.value = event;
  eventForm.value = { 
    title: event.title, 
    date: event.date, 
    time: event.time, 
    type: event.type, 
    examiner: event.examiner, 
    room: event.room,
    maxParticipants: event.maxParticipants,
    currentParticipants: event.currentParticipants || 0
  };
  editingEvent.value = true;
  showViewModal.value = false;
  showAddEventModal.value = true;
};

const deleteEvent = (eventId) => {
  if (confirm("คุณแน่ใจหรือไม่ที่จะลบการอบรมนี้?")) {
    events.value = events.value.filter(event => event.id !== eventId);
    closeViewModal();
  }
};

// Event query methods
const getEventsForDate = (dateString) => {
  return events.value.filter(event => event.date === dateString);
};

const getEventsForDayAndHour = (dateString, hour) => {
  return events.value.filter(event => event.date === dateString && event.time === parseInt(hour));
};

const hasMaxEvents = (dateString) => {
  return getEventsForDate(dateString).length >= 3;
};

const hasEventAtTime = (dateString, hour) => {
  return events.value.some(event => event.date === dateString && event.time === hour);
};

const isTimeSlotTaken = (dateString, hour, excludeEventId = null) => {
  return events.value.some(event => 
    event.date === dateString && 
    event.time === hour && 
    event.id !== excludeEventId
  );
};

const addEventToTimeSlot = (dateString, hour) => {
  if (isPastDate(dateString) || hasEventAtTime(dateString, parseInt(hour))) return;
  
  selectedDate.value = dateString;
  eventForm.value = { 
    title: "", 
    date: dateString, 
    time: parseInt(hour), 
    type: "", 
    examiner: "", 
    room: "", 
    maxParticipants: null, 
    currentParticipants: 0 
  };
  editingEvent.value = false;
  showAddEventModal.value = true;
};

// Drag and Drop functionality
const startDrag = (event, dragEvent) => {
  draggedEvent.value = event;
  dragEvent.dataTransfer.effectAllowed = 'move';
};

const handleDrop = (dateString, dropEvent) => {
  dropEvent.preventDefault();
  
  if (!draggedEvent.value) return;
  
  if (isPastDate(dateString)) {
    alert('ไม่สามารถย้ายการอบรมไปยังวันที่ผ่านมาแล้ว');
    draggedEvent.value = null;
    return;
  }
  
  if (getEventsForDate(dateString).length >= 3) {
    alert("วันนี้มีการอบรมเต็มแล้ว (สูงสุด 3 รายการต่อวัน)");
    draggedEvent.value = null;
    return;
  }
  
  let newTime = draggedEvent.value.time;
  
  if (hasEventAtTime(dateString, newTime)) {
    newTime = findAvailableTimeSlot(dateString);
    if (newTime === -1) {
      alert("ไม่มีช่วงเวลาว่างในวันนี้");
      draggedEvent.value = null;
      return;
    }
  }
  
  moveTarget.value = { date: dateString, time: newTime };
  showMoveModal.value = true;
};

const handleDropToTimeSlot = (dateString, hour, dropEvent) => {
  dropEvent.preventDefault();
  
  if (!draggedEvent.value || isPastDate(dateString) || hasEventAtTime(dateString, hour)) {
    if (hasEventAtTime(dateString, hour)) {
      alert('ช่วงเวลานี้มีการอบรมอื่นอยู่แล้ว');
    }
    return;
  }
  
  moveTarget.value = { date: dateString, time: hour };
  showMoveModal.value = true;
};

const findAvailableTimeSlot = (dateString) => {
  for (let hour = 6; hour <= 18; hour++) {
    if (!hasEventAtTime(dateString, hour)) {
      return hour;
    }
  }
  return -1;
};

const confirmMove = () => {
  if (draggedEvent.value && moveTarget.value.date && moveTarget.value.time !== undefined) {
    const eventIndex = events.value.findIndex(e => e.id === draggedEvent.value.id);
    if (eventIndex !== -1) {
      events.value[eventIndex] = {
        ...events.value[eventIndex],
        date: moveTarget.value.date,
        time: moveTarget.value.time
      };
    }
  }
  cancelMove();
};

const cancelMove = () => {
  showMoveModal.value = false;
  draggedEvent.value = null;
  moveTarget.value = { date: "", time: 0 };
};

// Search and Quick Add functionality
const clearSearch = () => {
  searchQuery.value = "";
};

const quickAddEvent = () => {
  if (!quickAddForm.value.title.trim() || !quickAddForm.value.date || !quickAddForm.value.time) {
    alert('กรุณากรอกข้���มูลให้ครบถ้วน');
    return;
  }

  if (isPastDate(quickAddForm.value.date)) {
    alert('ไม่สามารถสร้างการอบรมในวันที่ผ่านมาแล้ว');
    return;
  }

  if (isTimeSlotTaken(quickAddForm.value.date, quickAddForm.value.time)) {
    alert('ช่วงเวลานี้มีการอบรมอื่นอยู่แล้ว');
    return;
  }

  // Open full modal with pre-filled data
  eventForm.value = {
    title: quickAddForm.value.title,
    date: quickAddForm.value.date,
    time: quickAddForm.value.time,
    type: "อบรมพื้นฐานความปลอดภัย", // Default type
    examiner: "",
    room: "",
    maxParticipants: null,
    currentParticipants: 0
  };
  
  // Reset quick add form
  quickAddForm.value = {
    title: "",
    date: "",
    time: ""
  };
  
  showQuickAdd.value = false;
  editingEvent.value = false;
  showAddEventModal.value = true;
};

// Watchers for better UX
watch(() => eventForm.value.room, (newRoom) => {
  if (newRoom && !eventForm.value.maxParticipants) {
    updateMaxParticipantsFromRoom();
  }
});

watch(() => eventForm.value.date, (newDate) => {
  if (newDate && eventForm.value.time && isTimeSlotTaken(newDate, eventForm.value.time, editingEvent.value ? selectedEvent.value?.id : null)) {
    eventForm.value.time = "";
  }
});
</script>