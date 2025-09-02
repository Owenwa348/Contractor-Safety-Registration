<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-6">
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">การอบรมตลอดทั้งปี</p>
            <p class="text-3xl font-bold text-gray-800">{{ events.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center">
          <div class="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">การอบรมเดือนนี้</p>
            <p class="text-3xl font-bold text-gray-800">{{ thisMonthEvents }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Calendar Header -->
      <div class="bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden">
        <div class="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div class="flex items-center gap-3 mb-4 sm:mb-0">
            <!-- Month Navigation Buttons -->
            <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105" title="เดือนก่อน">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105" title="เดือนถัดไป">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button @click="goToToday" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 hover:border-gray-400 ml-2">
              วันนี้
            </button>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 text-center flex-1">
            {{ currentMonthYear }}
          </h2>

          <div class="flex gap-2 mt-4 sm:mt-0">
            <button :class="viewModeButtonClass('month')" @click="viewMode = 'month'">
              เดือน
            </button>
            <button :class="viewModeButtonClass('week')" @click="viewMode = 'week'">
              สัปดาห์
            </button>
          </div>
        </div>

        <!-- Month View -->
        <div v-if="viewMode === 'month'">
          <!-- Day Headers -->
          <div class="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            <div v-for="day in daysOfWeek" :key="day" class="p-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wide">
              {{ day }}
            </div>
          </div>

          <!-- Calendar Dates -->
          <div class="grid grid-cols-7">
            <div v-for="date in calendarDates" :key="date.key" 
                 class="min-h-[120px] border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-all duration-200 relative group"
                 :class="getDateCellClass(date)">
              
              <!-- Date Number -->
              <div class="p-3">
                <span class="text-sm inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-all duration-200"
                      :class="getDateNumberClass(date)">
                  {{ date.day }}
                </span>
              </div>

              <!-- Events Display -->
              <div class="px-2 pb-2 space-y-1">
                <div v-for="eventDisplay in date.eventDisplays" :key="eventDisplay.key" class="relative">
                  <div v-if="eventDisplay.type === 'event'"
                       class="text-xs px-3 py-1.5 text-white transition-all duration-200 truncate relative overflow-hidden cursor-pointer hover:opacity-90 hover:shadow-md font-medium"
                       :class="getEventClass(eventDisplay)"
                       @click.stop="handleEventClick(eventDisplay.event, date.fullDate)"
                       :title="getEventTooltip(eventDisplay)">
                    {{ eventDisplay.displayText }}
                  </div>
                  
                  <div v-else-if="eventDisplay.type === 'more'"
                       class="text-xs px-3 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium text-center"
                       @click.stop="showMoreEvents(date)">
                    +{{ eventDisplay.count }} เพิ่มเติม
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-else-if="viewMode === 'week'">
          <div class="grid grid-cols-8 border-b border-gray-200">
            <div class="p-4 text-center text-sm font-bold text-gray-700 bg-gray-50 border-r border-gray-200">
              เวลา
            </div>
            <div v-for="day in weekDays" :key="day.key" class="p-4 text-center bg-gray-50 border-r border-gray-200 last:border-r-0">
              <div class="text-sm font-bold text-gray-700">{{ day.dayName }}</div>
              <div class="text-lg mt-1 w-10 h-10 flex items-center justify-center rounded-full mx-auto font-bold transition-all duration-200"
                   :class="day.isToday ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600'">
                {{ day.date }}
              </div>
            </div>
          </div>

          <!-- Time Slots -->
          <div class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div v-for="hour in timeSlots" :key="`hour-${hour}`" class="grid grid-cols-8 border-b border-gray-100">
              <div class="p-3 text-xs font-semibold text-gray-500 bg-gray-50 border-r border-gray-200 text-center">
                {{ hour }}:00
              </div>
              <div v-for="day in weekDays" :key="`${day.key}-${hour}`"
                   class="min-h-[64px] p-2 border-r border-gray-200 last:border-r-0 hover:bg-blue-50 cursor-pointer transition-all duration-200">
                
                <div v-for="event in getEventsForDayAndHour(day.fullDate, hour)" :key="event.id"
                     class="text-xs px-2 py-1 rounded-lg mb-1 text-white transition-all duration-200 truncate cursor-pointer hover:opacity-90 font-medium shadow-sm"
                     :class="getWeekEventClass(event)"
                     @click.stop="handleEventClick(event, day.fullDate)"
                     :title="event.title">
                  {{ event.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Details Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm" @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 transform transition-all duration-300 scale-100 relative z-[70]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">รายละเอียดการอบรม</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div v-if="selectedEvent" class="space-y-6">
            <div class="border-l-4 pl-4 border-blue-600 bg-blue-50 rounded-r-lg py-3">
              <h4 class="text-xl font-bold text-gray-900">{{ selectedEvent.title }}</h4>
            </div>
            
            <div class="grid grid-cols-1 gap-6 text-sm">
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-gray-600 font-semibold block mb-1">วันที่</label>
                <p class="text-gray-900 font-medium">{{ getDisplayDateText(selectedEvent, selectedDate) }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label class="text-gray-600 font-semibold block mb-1">เวลา</label>
                <p class="text-gray-900 font-medium">{{ getEventTimeRange(selectedEvent) }}</p>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="text-gray-600 font-semibold block mb-2">จำนวนผู้เข้าร่วม</label>
              <p class="text-gray-900 font-medium">
                {{ selectedEvent.participantCount }}/{{ selectedEvent.capacity }} คน
                <span class="ml-3 px-3 py-1 rounded-full text-xs font-bold"
                      :class="getParticipantStatusClass(selectedEvent)">
                  {{ getParticipantStatusText(selectedEvent) }}
                </span>
              </p>
            </div>

            <div class="pt-6 border-t border-gray-200 space-y-4">
              <!-- View Participants Button -->
              <button @click="showParticipantsList" 
                      :disabled="isEventFuture(selectedEvent)"
                      class="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-3 transform hover:scale-105 disabled:hover:scale-100"
                      :class="getViewParticipantsButtonClass(selectedEvent)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {{ getViewParticipantsButtonText(selectedEvent) }}
              </button>

              <!-- Download PDF Button -->
              <button @click="downloadParticipantListPDF" 
                      :disabled="isEventFuture(selectedEvent)"
                      class="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-3 transform hover:scale-105 disabled:hover:scale-100"
                      :class="getDownloadButtonClass(selectedEvent)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                {{ getDownloadButtonText(selectedEvent) }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Participants List Modal -->
      <div v-if="showParticipantsModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" @click.self="closeParticipantsModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full p-8 max-h-[85vh] overflow-hidden flex flex-col">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">
              รายชื่อผู้เข้าร่วม - {{ selectedEvent?.title }}
            </h3>
            <button @click="closeParticipantsModal" class="text-gray-400 hover:text-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div v-if="selectedEvent" class="mb-6 p-4 bg-gray-50 rounded-xl">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong class="text-gray-700">วันที่:</strong> 
                <span class="text-gray-900">{{ getDisplayDateText(selectedEvent, selectedDate) }}</span>
              </div>
              <div>
                <strong class="text-gray-700">เวลา:</strong> 
                <span class="text-gray-900">{{ getEventTimeRange(selectedEvent) }}</span>
              </div>
              <div>
                <strong class="text-gray-700">จำนวนผู้เข้าร่วม:</strong> 
                <span class="text-gray-900">{{ selectedEvent.participantCount }}/{{ selectedEvent.capacity }} คน</span>
              </div>
            </div>
          </div>
          
          <!-- Participants Table -->
          <div class="flex-1 overflow-auto rounded-xl border border-gray-200">
            <table class="w-full bg-white">
              <thead class="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                <tr>
                  <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 w-16">ลำดับ</th>
                  <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700">ชื่อ-นามสกุล</th>
                  <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 w-32">เบอร์โทรศัพท์</th>
                  <th class="border-b border-gray-200 px-6 py-4 text-left text-sm font-bold text-gray-700 w-40">เลขบัตรประชาชน</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(participant, index) in selectedEvent?.participants || []" :key="participant.id" 
                    class="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100">
                  <td class="px-6 py-4 text-sm font-semibold text-gray-900 text-center">{{ index + 1 }}</td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ participant.name }}</td>
                  <td class="px-6 py-4 text-sm font-mono text-gray-700 bg-gray-50">{{ censorPhone(participant.phone) }}</td>
                  <td class="px-6 py-4 text-sm font-mono text-gray-700 bg-gray-50">{{ censorIdCard(participant.idCard) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">
              แสดง {{ selectedEvent?.participantCount || 0 }} รายการ
            </span>
            <div class="flex gap-3">
              <button @click="closeParticipantsModal" 
                      class="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
                ปิด
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- More Events Modal -->
      <div v-if="showMoreModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" @click.self="closeMoreModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-gray-900">
              การอบรมวันที่ {{ formatThaiDate(moreEventsDate) }}
            </h3>
            <button @click="closeMoreModal" class="text-gray-400 hover:text-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="event in moreEventsList" :key="event.id"
                 class="p-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
                 :class="getMoreEventItemClass(event)"
                 @click="handleMoreEventClick(event)"
                 tabindex="0"
                 @keydown.enter="handleMoreEventClick(event)">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full mr-3 shadow-sm" :class="getEventDotClass(event)"></div>
                <div>
                  <div class="font-semibold" :class="getEventTitleClass(event)">{{ event.title }}</div>
                  <div class="text-sm" :class="getEventTimeClass(event)">
                    {{ getEventTimeRange(event) }}
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

// Reactive Data
const viewMode = ref("month");
const currentDate = ref(new Date());
const showModal = ref(false);
const showMoreModal = ref(false);
const showParticipantsModal = ref(false);
const selectedEvent = ref(null);
const moreEventsDate = ref('');
const moreEventsList = ref([]);
const pdfLoading = ref(false);
const selectedDate = ref(null);

// Constants
const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const monthNames = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

// Data Censoring Functions
const censorPhone = (phone) => {
  if (!phone || phone.length < 10) return phone;
  // Format: 081****922 (แสดง 3 ตัวแรก + **** + 3 ตัวท้าย)
  const first = phone.slice(0, 3);
  const last = phone.slice(-3);
  return `${first}****${last}`;
};

const censorIdCard = (idCard) => {
  if (!idCard || idCard.length < 13) return idCard;
  // Format: 121*******580 (แสดง 3 ตัวแรก + ******* + 3 ตัวท้าย)
  const first = idCard.slice(0, 3);
  const last = idCard.slice(-3);
  return `${first}*******${last}`;
};

// Training Events Data with time ranges
const events = ref([
  {
    id: 1,
    title: "อบรมพื้นฐานความปลอดภัย",
    startDate: "2025-08-20",
    endDate: "2025-08-20",
    isMultiDay: false,
    isAllDay: false,
    startTime: "08:00",
    endTime: "17:00",
    time: 8,
    participantCount: 5,
    capacity: 30,
    participants: [
      { id: 1, name: 'นายวิชัย ฝึกฝน', phone: '0867890123', idCard: '6789012345678' },
      { id: 2, name: 'นางสาวปิยะ พัฒนา', phone: '0878901234', idCard: '7890123456789' },
      { id: 3, name: 'นายกิตติ มานะ', phone: '0889012345', idCard: '8901234567890' },
      { id: 4, name: 'นายสุรพล พยายาม', phone: '0890123456', idCard: '9012345678901' },
      { id: 5, name: 'นางเพ็ญ อุตสาห์', phone: '0801234567', idCard: '0123456789012' },
    ]
  },
  {
    id: 2,
    title: "อบรมการใช้เครื่องมือ",
    startDate: "2025-08-22",
    endDate: "2025-08-24",
    isMultiDay: true,
    isAllDay: false,
    startTime: "09:00",
    endTime: "16:00",
    time: 9,
    participantCount: 5,
    capacity: 30,
    participants: [
      { id: 1, name: 'นายสมศักดิ์ เรียนรู้', phone: '0845678901', idCard: '4567890123456' },
      { id: 2, name: 'นายธันวา ชัยรัตนานนท์', phone: '0812345667', idCard: '1234567890111' },
      { id: 3, name: 'นางมณี ตั้งใจ', phone: '0856789012', idCard: '5678901234567' },
      { id: 4, name: 'นายวิชัย ฝึกฝน', phone: '0867890123', idCard: '6789012345678' },
      { id: 5, name: 'นางสาวปิยะ พัฒนา', phone: '0878901234', idCard: '7890123456789' },
    ]
  },
  {
    id: 3,
    title: "อบรมการใช้เครื่องจักร",
    startDate: "2025-08-27",
    endDate: "2025-08-30", 
    isMultiDay: true,
    isAllDay: false,
    startTime: "09:00",
    endTime: "13:30",
    time: 9,
    participantCount: 5,
    capacity: 30,
    participants: [
      { id: 1, name: 'นายสมชาย ใจดี', phone: '0812345678', idCard: '1234567890123' },
      { id: 2, name: 'นางสาวสุดา ขยัน', phone: '0823456789', idCard: '2345678901234' },
      { id: 3, name: 'นายประชา รักงาน', phone: '0834567890', idCard: '3456789012345' },
      { id: 4, name: 'นายสมศักดิ์ เรียนรู้', phone: '0845678901', idCard: '4567890123456' },
      { id: 5, name: 'นางมณี ตั้งใจ', phone: '0856789012', idCard: '5678901234567' },
    ]
  },
  {
    id: 4,
    title: "อบรมการประกอบอุปกรณ์",
    startDate: "2025-09-12",
    endDate: "2025-09-18", 
    isMultiDay: true,
    isAllDay: false,
    startTime: "08:30",
    endTime: "16:30",
    time: 8,
    participantCount: 5,
    capacity: 30,
    participants: [
      { id: 1, name: 'นายสุรพล พยายาม', phone: '0890123456', idCard: '9012345678901' },
      { id: 2, name: 'นางเพ็ญ อุตสาห์', phone: '0801234567', idCard: '0123456789012' },
      { id: 3, name: 'นายธนา มุ่งมั่น', phone: '0891234567', idCard: '1123456789012' },
      { id: 4, name: 'นางสาวรัตนา สู้งาน', phone: '0881234567', idCard: '2123456789012' },
      { id: 5, name: 'นายประดิษฐ์ คิดสร้าง', phone: '0871234567', idCard: '3123456789012' },
    ]
  },
]);

// Time Range Function
const getEventTimeRange = (event) => {
  if (!event) return '';
  if (event.isAllDay) return 'ทั้งวัน';
  
  if (event.startTime && event.endTime) {
    return `${event.startTime} - ${event.endTime} น.`;
  }
  
  // Fallback for old format
  return event.time ? `${event.time}:00 น.` : 'ไม่ระบุเวลา';
};

// Computed Properties
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

// Helper Functions
const formatDateString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
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
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} - ${end.getDate()} ${month} ${year}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    const startMonth = monthNames[start.getMonth()];
    const endMonth = monthNames[end.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${year}`;
  } else {
    return `${formatThaiDate(startDate)} - ${formatThaiDate(endDate)}`;
  }
};

// Event Status Functions
const isEventPast = (event) => {
  if (!event) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventEndDate = event.isMultiDay ? new Date(event.endDate) : new Date(event.startDate);
  eventEndDate.setHours(0, 0, 0, 0);
  
  return eventEndDate < today;
};

const isEventFuture = (event) => {
  if (!event) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventStartDate = new Date(event.startDate);
  eventStartDate.setHours(0, 0, 0, 0);
  
  return eventStartDate > today;
};

// Event Data Functions
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
  let rowIndex = 0;
  
  dayEvents.forEach((event) => {
    if (rowIndex >= maxDisplayed) return;
    
    let displayText = event.title;
    let barPosition = 'single';
    
    if (event.isMultiDay) {
      const currentDate = new Date(dateString);
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      if (currentDate.getTime() === startDate.getTime() && currentDate.getTime() === endDate.getTime()) {
        barPosition = 'single';
      } else if (currentDate.getTime() === startDate.getTime()) {
        barPosition = 'start';
      } else if (currentDate.getTime() === endDate.getTime()) {
        barPosition = 'end';
      } else {
        barPosition = 'middle';
      }
    }
    
    displays.push({
      key: `event-${event.id}-${dateString}`,
      type: 'event',
      event: event,
      displayText: displayText,
      row: rowIndex,
      isMultiDayBar: event.isMultiDay,
      barPosition: barPosition
    });
    
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

// Navigation Functions
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

// Modal Functions
function handleEventClick(event, date = null) {
  selectedEvent.value = event;
  selectedDate.value = date;
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
  selectedEvent.value = null;
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

const handleMoreEventClick = (event) => {
  closeMoreModal();
  handleEventClick(event, moreEventsDate.value);
};

const showParticipantsList = () => {
  showParticipantsModal.value = true;
  showModal.value = false;
};

const closeParticipantsModal = () => {
  showParticipantsModal.value = false;
  showModal.value = true;
};

// Enhanced notification system
const showNotification = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
  
  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  };
  
  toast.className += ` ${colors[type] || colors.info}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
};

// Load external libraries
const loadJsPDF = () => {
  return new Promise((resolve, reject) => {
    if (window.jsPDF) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    
    script.onload = () => {
      setTimeout(() => {
        if (window.jspdf && window.jspdf.jsPDF) {
          window.jsPDF = window.jspdf.jsPDF;
          resolve();
        } else {
          reject(new Error('jsPDF not loaded correctly'));
        }
      }, 100);
    };
    
    script.onerror = () => reject(new Error('Failed to load jsPDF'));
    document.head.appendChild(script);
  });
};

const loadHTML2Canvas = () => {
  return new Promise((resolve, reject) => {
    if (window.html2canvas) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    
    script.onload = () => {
      setTimeout(() => {
        if (window.html2canvas) {
          resolve();
        } else {
          reject(new Error('html2canvas not loaded correctly'));
        }
      }, 100);
    };
    
    script.onerror = () => reject(new Error('Failed to load html2canvas'));
    document.head.appendChild(script);
  });
};

// Enhanced PDF generation with signature column
const generateHTMLToPDF = async (event) => {
  console.log('Generating PDF using HTML-to-Canvas method for Thai support');
  showNotification('กำลังสร้าง PDF ด้วยเทคนิคพิเศษ...', 'info');
  
  try {
    await Promise.all([loadJsPDF(), loadHTML2Canvas()]);
    
    const container = document.createElement('div');
    let cssText = '';
    cssText += 'position: absolute;';
    cssText += 'top: -9999px;';
    cssText += 'left: -9999px;';
    cssText += 'width: 210mm;';
    cssText += 'height: auto;';
    cssText += 'background: white;';
    cssText += 'font-family: "Sarabun", "Kanit", "Prompt", "Mitr", sans-serif;';
    cssText += 'font-size: 16px;';
    cssText += 'line-height: 1.5;';
    cssText += 'color: #000;';
    cssText += 'padding: 20mm;';
    cssText += 'box-sizing: border-box;';
    container.style.cssText = cssText;
    
    let htmlContent = '';
    htmlContent += '<div style="text-align: center; margin-bottom: 25px;">';
    htmlContent += '<h1 style="font-size: 18px; margin: 0 0 8px 0; font-weight: bold;">รายชื่อผู้เข้าร่วมอบรม - รายละเอียด</h1>';
    htmlContent += '<h2 style="font-size: 16px; margin: 0 0 15px 0; color: #333;">' + event.title + '</h2>';
    htmlContent += '</div>';
    htmlContent += '<div style="margin-bottom: 15px; font-size: 16px;">';
    htmlContent += '<p><strong>วันที่อบรม:</strong> ' + getDisplayDateText(event, selectedDate.value) + '</p>';
    htmlContent += '<p><strong>เวลาอบรม:</strong> ' + getEventTimeRange(event) + '</p>';
    htmlContent += '<p><strong>จำนวนผู้เข้าอบรม:</strong> ' + event.participantCount + '/' + event.capacity + ' คน</p>';
    htmlContent += '</div>';
    htmlContent += '<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">';
    htmlContent += '<thead>';
    htmlContent += '<tr style="background-color: #f5f5f5;">';
    htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 8%;">ลำดับ</th>';
    htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold; width: 30%;">ชื่อ-นามสกุล</th>';
    htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 18%;">เบอร์โทรศัพท์</th>';
    htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 20%;">เลขบัตรประชาชน</th>';
    htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 24%;">ลายเซ็นผู้เข้าร่วม</th>';
    htmlContent += '</tr>';
    htmlContent += '</thead>';
    htmlContent += '<tbody>';
    
    if (event.participants) {
      event.participants.forEach((participant, index) => {
        const bgColor = index % 2 === 0 ? 'background-color: #fafafa;' : '';
        htmlContent += '<tr style="' + bgColor + '">';
        htmlContent += '<td style="border: 1px solid #ddd; padding: 8px; text-align: center;">' + (index + 1) + '</td>';
        htmlContent += '<td style="border: 1px solid #ddd; padding: 8px;">' + participant.name + '</td>';
        htmlContent += '<td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-family: monospace;">' + censorPhone(participant.phone) + '</td>';
        htmlContent += '<td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-family: monospace;">' + censorIdCard(participant.idCard) + '</td>';
        htmlContent += '<td style="border: 1px solid #ddd; padding: 20px 8px; text-align: center; height: 50px;">';
        htmlContent += '<div style="border-bottom: 1px dotted #999; height: 30px; width: 100%;"></div>';
        htmlContent += '</td>';
        htmlContent += '</tr>';
      });
    }
    
    htmlContent += '</tbody>';
    htmlContent += '</table>';
    htmlContent += '<div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">';
    const currentDateTime = new Date();
    const thaiDateTime = currentDateTime.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Bangkok'
    });
    htmlContent += '<p>สร้างรายงานเมื่อ: ' + thaiDateTime + '</p>';
    htmlContent += '<p style="margin-top: 8px;">** ข้อมูลนี้มีข้อมูลส่วนบุคคล กรุณาเก็บรักษาอย่างปลอดภัย **</p>';
    htmlContent += '<p>** ห้ามเผยแพร่หรือนำไปใช้โดยไม่ได้รับอนุญาต **</p>';
    htmlContent += '</div>';
    
    container.innerHTML = htmlContent;
    document.body.appendChild(container);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const canvas = await window.html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: container.scrollHeight,
      logging: false
    });
    
    document.body.removeChild(container);
    
    const { jsPDF } = window;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    const dateStr = new Date().toISOString().split('T')[0];
    let safeTitle = event.title.replace(/[\\/:*?"<>|]/g, '_').substring(0, 30);
    if (!/[a-zA-Z0-9]/.test(safeTitle)) {
      safeTitle = 'Training_Report';
    }
    
    const fileName = `รายชื่อผู้เข้าอบรม_${safeTitle}_${dateStr}.pdf`;
    
    try {
      pdf.save(fileName);
    } catch (e) {
      pdf.save(`Training_Participants_${safeTitle}_${dateStr}.pdf`);
    }
    
    return true;
    
  } catch (error) {
    console.error('HTML-to-PDF generation failed:', error);
    throw error;
  }
};

const generatePrintToPDF = async (event) => {
  console.log('Generating PDF using browser print functionality');
  showNotification('กำลังเปิดหน้าต่างพิมพ์...', 'info');
  
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  let htmlContent = '';
  htmlContent += '<!DOCTYPE html>';
  htmlContent += '<html>';
  htmlContent += '<head>';
  htmlContent += '<meta charset="UTF-8">';
  htmlContent += '<title>รายชื่อผู้เข้าร่วมอบรม</title>';
  htmlContent += '<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">';
  htmlContent += '<style>';
  htmlContent += '@page { size: A4; margin: 20mm; }';
  htmlContent += '* { margin: 0; padding: 0; box-sizing: border-box; }';
  htmlContent += 'body { font-family: \'Sarabun\', \'Kanit\', \'Prompt\', sans-serif; font-size: 14px; line-height: 1.5; color: #000; background: white; }';
  htmlContent += '.header { text-align: center; margin-bottom: 25px; }';
  htmlContent += '.header h1 { font-size: 18px; margin-bottom: 8px; font-weight: bold; }';
  htmlContent += '.header h2 { font-size: 16px; color: #333; margin-bottom: 15px; }';
  htmlContent += '.info { margin-bottom: 15px; font-size: 14px; }';
  htmlContent += '.info p { margin-bottom: 5px; }';
  htmlContent += 'table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }';
  htmlContent += 'th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }';
  htmlContent += 'th { background-color: #f5f5f5; font-weight: bold; text-align: center; }';
  htmlContent += 'tr:nth-child(even) { background-color: #fafafa; }';
  htmlContent += '.text-center { text-align: center; }';
  htmlContent += '.signature-cell { padding: 20px 8px !important; height: 50px; }';
  htmlContent += '.signature-line { border-bottom: 1px dotted #999; height: 30px; width: 100%; }';
  htmlContent += '.footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }';
  htmlContent += '.footer p { margin-bottom: 5px; }';
  htmlContent += '@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
  htmlContent += '</style>';
  htmlContent += '</head>';
  htmlContent += '<body>';
  htmlContent += '<div class="header">';
  htmlContent += '<h1>รายชื่อผู้เข้าร่วมอบรม - รายละเอียด</h1>';
  htmlContent += '<h2>' + event.title + '</h2>';
  htmlContent += '</div>';
  htmlContent += '<div class="info">';
  htmlContent += '<p><strong>วันที่อบรม:</strong> ' + getDisplayDateText(event, selectedDate.value) + '</p>';
  htmlContent += '<p><strong>เวลาอบรม:</strong> ' + getEventTimeRange(event) + '</p>';
  htmlContent += '<p><strong>จำนวนผู้เข้าอบรม:</strong> ' + event.participantCount + '/' + event.capacity + ' คน</p>';
  htmlContent += '</div>';
  htmlContent += '<table>';
  htmlContent += '<thead>';
  htmlContent += '<tr>';
  htmlContent += '<th style="width: 8%;">ลำดับ</th>';
  htmlContent += '<th style="width: 30%;">ชื่อ-นามสกุล</th>';
  htmlContent += '<th style="width: 18%;">เบอร์โทรศัพท์</th>';
  htmlContent += '<th style="width: 20%;">เลขบัตรประชาชน</th>';
  htmlContent += '<th style="width: 24%;">ลายเซ็นผู้เข้าร่วม</th>';
  htmlContent += '</tr>';
  htmlContent += '</thead>';
  htmlContent += '<tbody>';
  
  if (event.participants) {
    event.participants.forEach((participant, index) => {
      htmlContent += '<tr>';
      htmlContent += '<td class="text-center">' + (index + 1) + '</td>';
      htmlContent += '<td>' + participant.name + '</td>';
      htmlContent += '<td class="text-center" style="font-family: monospace;">' + censorPhone(participant.phone) + '</td>';
      htmlContent += '<td class="text-center" style="font-family: monospace;">' + censorIdCard(participant.idCard) + '</td>';
      htmlContent += '<td class="signature-cell text-center">';
      htmlContent += '<div class="signature-line"></div>';
      htmlContent += '</td>';
      htmlContent += '</tr>';
    });
  }
  
  htmlContent += '</tbody>';
  htmlContent += '</table>';
  htmlContent += '<div class="footer">';
  const currentDateTime = new Date();
  const thaiDateTime = currentDateTime.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Bangkok'
  });
  htmlContent += '<p>สร้างรายงานเมื่อ: ' + thaiDateTime + '</p>';
  htmlContent += '<p>** ข้อมูลนี้มีข้อมูลส่วนบุคคล กรุณาเก็บรักษาอย่างปลอดภัย **</p>';
  htmlContent += '<p>** ห้ามเผยแพร่หรือนำไปใช้โดยไม่ได้รับอนุญาต **</p>';
  htmlContent += '</div>';
  htmlContent += '<script>';
  htmlContent += 'window.onload = function() {';
  htmlContent += '  setTimeout(function() {';
  htmlContent += '    window.print();';
  htmlContent += '  }, 1000);';
  htmlContent += '};';
  htmlContent += 'window.onafterprint = function() {';
  htmlContent += '  window.close();';
  htmlContent += '};';
  htmlContent += '<' + '/script>';
  htmlContent += '</body>';
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  return true;
};

// Fallback PDF generation with ASCII characters only
const generateFallbackPDF = async (event) => {
  console.warn('Generating fallback PDF with ASCII characters only');
  showNotification('กำลังสร้าง PDF แบบสำรอง...', 'warning');
  
  const { jsPDF } = window;
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm', 
    format: 'a4'
  });
  
  pdf.setFont('helvetica', 'normal');
  
  // Header in English
  pdf.setFontSize(16);
  pdf.text('Training Participant List - Details', 105, 20, { align: 'center' });
  
  pdf.setFontSize(14);
  const safeTitle = event.title.replace(/[^\x00-\x7F]/g, '[Thai Text]');
  pdf.text(safeTitle || 'Training Session', 105, 30, { align: 'center' });
  
  // Event details in English
  pdf.setFontSize(11);
  let yPos = 45;
  
  pdf.text(`Training Date: ${getDisplayDateText(event, selectedDate.value)}`, 20, yPos);
  yPos += 8;
  
  pdf.text(`Training Time: ${getEventTimeRange(event)}`, 20, yPos);
  yPos += 8;
  
  pdf.text(`Participants: ${event.participantCount}/${event.capacity} people`, 20, yPos);
  yPos += 18;
  
  // Table header
  const headerY = yPos;
  pdf.setFillColor(240, 240, 240);
  pdf.rect(15, headerY - 5, 180, 10, 'F');
  
  pdf.setFontSize(9);
  pdf.text('No.', 25, headerY, { align: 'center' });
  pdf.text('Name', 55, headerY, { align: 'center' });
  pdf.text('Phone', 95, headerY, { align: 'center' });
  pdf.text('ID Card', 130, headerY, { align: 'center' });
  pdf.text('Signature', 170, headerY, { align: 'center' });
  
  yPos = headerY + 15;
  
  // Participant data
  pdf.setFontSize(8);
  event.participants?.forEach((participant, index) => {
    if (yPos > 250) {
      pdf.addPage();
      yPos = 25;
    }
    
    pdf.text((index + 1).toString(), 25, yPos, { align: 'center' });
    
    const safeName = participant.name.replace(/[^\x00-\x7F]/g, '[Thai Name]') || `Participant ${index + 1}`;
    pdf.text(safeName.substring(0, 20), 35, yPos);
    
    pdf.text(censorPhone(participant.phone) || '-', 95, yPos, { align: 'center' });
    pdf.text(censorIdCard(participant.idCard) || '-', 130, yPos, { align: 'center' });
    
    // Draw signature line
    pdf.line(160, yPos + 2, 185, yPos + 2);
    
    yPos += 12;
  });
  
  // Footer
  const pageHeight = pdf.internal.pageSize.height;
  pdf.setFontSize(8);
  const currentDateTime = new Date();
  const dateTimeStr = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')} ${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:${String(currentDateTime.getSeconds()).padStart(2, '0')}`;
  pdf.text(`Generated: ${dateTimeStr}`, 20, pageHeight - 30);
  pdf.text('** CONFIDENTIAL: Personal Data - Handle with Care **', 105, pageHeight - 20, { align: 'center' });
  
  const dateStr = new Date().toISOString().split('T')[0];
  const fileName = `Training_Participants_Report_${dateStr}.pdf`;
  pdf.save(fileName);
  
  return true;
};

const downloadParticipantListPDF = async () => {
  if (!selectedEvent.value) return;
  
  pdfLoading.value = true;
  const event = selectedEvent.value;
  
  try {
    console.log('Attempting Method 1: HTML-to-Canvas PDF generation');
    await generateHTMLToPDF(event);
    
    showNotification('ดาวน์โหลด PDF สำเร็จ! (คุณภาพสูง)', 'success');
    pdfLoading.value = false;
    return;
  } catch (error) {
    console.warn('Method 1 (HTML-to-Canvas) failed:', error);
  }
  
  try {
    console.log('Attempting Method 2: Browser Print-to-PDF');
    await generatePrintToPDF(event);
    
    showNotification('เปิดหน้าต่างพิมพ์สำเร็จ! กรุณาเลือก "Save as PDF"', 'info');
    pdfLoading.value = false;
    return;
  } catch (error) {
    console.warn('Method 2 (Print-to-PDF) failed:', error);
  }
  
  try {
    console.log('Attempting Method 3: ASCII Fallback');
    await generateFallbackPDF(event);
    
    showNotification('ดาวน์โหลด PDF สำเร็จ (แบบสำรอง)', 'warning');
    pdfLoading.value = false;
    return;
    
  } catch (fallbackError) {
    console.error('All PDF generation methods failed:', fallbackError);
  }
  
  const errorMessage = 'ไม่สามารถสร้าง PDF ได้ กรุณาลองใช้บราวเซอร์อื่นหรือกดปุ่ม "Print" แล้วเลือก "Save as PDF"';
  showNotification(errorMessage, 'error');
  
  pdfLoading.value = false;
};

// Date formatting function
const getEventDateText = (event) => {
  return event.isMultiDay 
    ? formatDateRange(event.startDate, event.endDate)
    : formatThaiDate(event.date || event.startDate);
};

// Display date text based on clicked date or event date
const getDisplayDateText = (event, clickedDate) => {
  if (clickedDate && event.isMultiDay) {
    return formatThaiDate(clickedDate);
  }
  return getEventDateText(event);
};

// CSS Class Functions
const viewModeButtonClass = (mode) => {
  return [
    'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300',
    viewMode.value === mode
      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
  ];
};

const getDateCellClass = (date) => {
  return {
    'text-gray-400 bg-gray-50': !date.isCurrentMonth,
    'bg-blue-100 shadow-inner': date.isToday,
  };
};

const getDateNumberClass = (date) => {
  if (date.isToday) {
    return 'bg-blue-600 text-white font-bold shadow-lg';
  } else if (date.isCurrentMonth) {
    return 'text-gray-900 hover:bg-blue-100';
  } else {
    return 'text-gray-400';
  }
};

const getEventClass = (eventDisplay) => {
  const baseClasses = ['shadow-sm'];
  
  if (isEventPast(eventDisplay.event)) {
    baseClasses.push('bg-gray-500', 'cursor-not-allowed', 'hover:opacity-100');
  } else {
    baseClasses.push('bg-gradient-to-r', 'from-blue-600', 'to-blue-700', 'hover:from-blue-700', 'hover:to-blue-800');
  }
  
  baseClasses.push(getMultiDayBarClass(eventDisplay.barPosition));
  
  return baseClasses;
};

const getWeekEventClass = (event) => {
  return isEventPast(event) 
    ? 'bg-gray-500 cursor-not-allowed hover:opacity-100' 
    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
};

const getEventTooltip = (eventDisplay) => {
  const event = eventDisplay.event;
  if (event.isMultiDay) {
    return `${event.title} (${formatDateRange(event.startDate, event.endDate)})`;
  }
  return event.title;
};

const getParticipantStatusClass = (event) => {
  return event.participantCount >= event.capacity 
    ? 'bg-red-100 text-red-800 border border-red-200' 
    : 'bg-green-100 text-green-800 border border-green-200';
};

const getParticipantStatusText = (event) => {
  return event.participantCount >= event.capacity ? 'เต็ม' : 'ว่าง';
};

const getViewParticipantsButtonClass = (event) => {
  return isEventFuture(event)
    ? 'bg-gray-300 text-gray-600 focus:ring-gray-300 shadow-sm'
    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg focus:ring-blue-500';
};

const getViewParticipantsButtonText = (event) => {
  if (isEventFuture(event)) {
    return 'การอบรมยังไม่เริ่ม';
  }
  return 'ดูรายชื่อผู้เข้าร่วม';
};

const getDownloadButtonClass = (event) => {
  return isEventFuture(event)
    ? 'bg-gray-300 text-gray-600 focus:ring-gray-300 shadow-sm'
    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg focus:ring-green-500';
};

const getDownloadButtonText = (event) => {
  if (isEventFuture(event)) {
    return 'การอบรมยังไม่เริ่ม';
  }
  return 'ดาวน์โหลด PDF';
};

const getMoreEventItemClass = (event) => {
  return isEventPast(event) 
    ? 'cursor-not-allowed bg-gray-100 opacity-60 border-gray-200' 
    : 'cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg';
};

const getEventDotClass = (event) => {
  return isEventPast(event) ? 'bg-gray-400' : 'bg-blue-600';
};

const getEventTitleClass = (event) => {
  return isEventPast(event) ? 'text-gray-500' : 'text-gray-900';
};

const getEventTimeClass = (event) => {
  return isEventPast(event) ? 'text-gray-400' : 'text-gray-600';
};

const getMultiDayBarClass = (barPosition) => {
  switch (barPosition) {
    case 'start':
      return 'rounded-l-lg rounded-r-none';
    case 'middle':
      return 'rounded-none';
    case 'end':
      return 'rounded-r-lg rounded-l-none';
    case 'single':
    default:
      return 'rounded-lg';
  }
};
</script>