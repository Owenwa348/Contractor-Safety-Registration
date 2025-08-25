<!-- TrainingBooking.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-orange-100 rounded-lg">
            <svg
              class="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">การอบรมที่กำลังจะมาถึง</p>
            <p class="text-2xl font-bold text-gray-800">{{ upcomingEvents }}</p>
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
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="เดือนก่อน"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              @click="nextMonth"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="เดือนถัดไป"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button
              @click="goToToday"
              class="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors ml-2"
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
                'px-3 py-1.5 rounded text-sm font-medium transition-colors',
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
                'px-3 py-1.5 rounded text-sm font-medium transition-colors',
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
              class="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50"
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
                    class="text-xs px-2 py-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity truncate"
                    :class="getEventColorClass(eventDisplay.event.color)"
                    @click.stop="viewEvent(eventDisplay.event)"
                    :title="eventDisplay.event.title + (eventDisplay.event.isMultiDay ? ` (${formatDateRange(eventDisplay.event.startDate, eventDisplay.event.endDate)})` : '')"
                  >
                    {{ eventDisplay.displayText }}
                  </div>
                  
                  <div
                    v-else-if="eventDisplay.type === 'more'"
                    class="text-xs px-2 py-1 text-gray-600 cursor-pointer hover:bg-gray-200 rounded"
                    @click.stop="showMoreEvents(date)"
                  >
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
            <div class="p-4 text-center text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
              เวลา
            </div>
            <div
              v-for="day in weekDays"
              :key="day.key"
              class="p-4 text-center bg-gray-50 border-r border-gray-200 last:border-r-0"
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
          <div class="max-h-96 overflow-y-auto">
            <div
              v-for="hour in timeSlots"
              :key="`hour-${hour}`"
              class="grid grid-cols-8 border-b border-gray-100"
            >
              <div class="p-3 text-xs text-gray-500 bg-gray-50 border-r border-gray-200 text-center">
                {{ hour }}:00
              </div>
              <div
                v-for="day in weekDays"
                :key="`${day.key}-${hour}`"
                class="min-h-16 p-2 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors"
                @click="addEventToTimeSlot(day.fullDate, hour)"
              >
                <div
                  v-for="event in getEventsForDayAndHour(day.fullDate, hour)"
                  :key="event.id"
                  class="text-xs px-2 py-1 rounded mb-1 cursor-pointer text-white transition-opacity hover:opacity-80 truncate"
                  :class="getEventColorClass(event.color)"
                  @click.stop="viewEvent(event)"
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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              รายละเอียดการอบรม
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div v-if="selectedEvent" class="space-y-4">
            <div class="border-l-4 pl-4" :class="getEventBorderClass(selectedEvent.color)">
              <h4 class="text-xl font-semibold text-gray-900">{{ selectedEvent.title }}</h4>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label class="text-gray-600 font-medium">วันที่</label>
                <p class="text-gray-900">
                  {{ selectedEvent.isMultiDay 
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

            <div class="pt-4 border-t">
              <button
                @click="bookTrainingFromModal"
                :disabled="selectedEvent.participantCount >= selectedEvent.capacity"
                class="w-full px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="selectedEvent.participantCount >= selectedEvent.capacity
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'"
              >
                {{ selectedEvent.participantCount >= selectedEvent.capacity 
                  ? 'การอบรมเต็มแล้ว' 
                  : 'จองอบรมให้ทีมงาน' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- More Events Modal -->
      <div
        v-if="showMoreModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeMoreModal"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              การอบรมวันที่ {{ formatThaiDate(moreEventsDate) }}
            </h3>
            <button @click="closeMoreModal" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="event in moreEventsList"
              :key="event.id"
              class="p-3 rounded cursor-pointer hover:bg-gray-50 border"
              @click="viewEventFromMore(event)"
            >
              <div class="flex items-center">
                <div 
                  class="w-3 h-3 rounded-full mr-3" 
                  :class="getEventColorClass(event.color, true)"
                ></div>
                <div>
                  <div class="font-medium">{{ event.title }}</div>
                  <div class="text-sm text-gray-600">
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
const moreEventsDate = ref('');
const moreEventsList = ref([]);
const router = useRouter();

// Constants
const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const monthNames = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

// Enhanced Events data with multi-day support
const events = ref([
  {
    id: 1,
    title: "อบรมพื้นฐานความปลอดภัย",
    startDate: "2025-09-07",
    endDate: "2025-09-12",
    isMultiDay: true,
    isAllDay: true,
    time: 8,
    participantCount: 12,
    capacity: 30,
    color: 'blue'
  },
  {
    id: 2,
    title: "อบรมการใช้เครื่องมือ",
    date: "2025-09-14",
    time: 8,
    participantCount: 8,
    capacity: 30,
    color: 'green',
    isMultiDay: false
  },
  {
    id: 3,
    title: "อบรมการดับเพลิง",
    startDate: "2025-09-19",
    endDate: "2025-09-21",
    isMultiDay: true,
    time: 8,
    participantCount: 15,
    capacity: 30,
    color: 'red'
  },
  {
    id: 4,
    title: "อบรมการใช้เครื่องจักร",
    date: "2025-09-22",
    time: 8,
    participantCount: 20,
    capacity: 30,
    color: 'purple',
    isMultiDay: false
  },
  {
    id: 5,
    title: "อบรมมาตรฐาน ISO",
    startDate: "2025-09-25",
    endDate: "2025-09-28",
    isMultiDay: true,
    isAllDay: true,
    participantCount: 25,
    capacity: 30,
    color: 'orange'
  },
  {
    id: 6,
    title: "อบรมการบริหารความเสี่ยง",
    date: "2025-09-15",
    time: 9,
    participantCount: 18,
    capacity: 25,
    color: 'indigo',
    isMultiDay: false
  }
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
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    }
  }).length;
});

const upcomingEvents = computed(() => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  return events.value.filter((event) => {
    const eventDate = event.isMultiDay ? new Date(event.startDate) : new Date(event.date);
    return eventDate >= today && eventDate <= nextWeek;
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

const getEventsForDate = (dateString) => {
  return events.value.filter((event) => {
    if (event.isMultiDay) {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const currentDate = new Date(dateString);
      return currentDate >= startDate && currentDate <= endDate;
    } else {
      return event.date === dateString;
    }
  });
};

const generateEventDisplays = (dayEvents, dateString) => {
  const displays = [];
  const maxDisplayed = 3;
  
  dayEvents.forEach((event, index) => {
    if (index < maxDisplayed) {
      let displayText = event.title;
      
      if (event.isMultiDay) {
        const isStart = event.startDate === dateString;
        const isEnd = event.endDate === dateString;
        
        if (isStart && isEnd) {
          displayText = event.title;
        } else if (isStart) {
          displayText = event.title;
        } else if (isEnd) {
          displayText = event.title;
        } else {
          displayText = event.title;
        }
      }
      
      displays.push({
        key: `event-${event.id}-${dateString}`,
        type: 'event',
        event: event,
        displayText: displayText,
        row: index
      });
    }
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

const getEventColorClass = (color, isDot = false) => {
  const colorMap = {
    blue: isDot ? 'bg-blue-600' : 'bg-blue-600',
    green: isDot ? 'bg-green-600' : 'bg-green-600',
    red: isDot ? 'bg-red-600' : 'bg-red-600',
    purple: isDot ? 'bg-purple-600' : 'bg-purple-600',
    orange: isDot ? 'bg-orange-600' : 'bg-orange-600',
    indigo: isDot ? 'bg-indigo-600' : 'bg-indigo-600'
  };
  return colorMap[color] || (isDot ? 'bg-gray-600' : 'bg-gray-600');
};

const getEventBorderClass = (color) => {
  const borderMap = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600',
    orange: 'border-orange-600',
    indigo: 'border-indigo-600'
  };
  return borderMap[color] || 'border-gray-600';
};

const getEventsForDayAndHour = (dateString, hour) => {
  return events.value.filter((event) => {
    const isDateMatch = event.isMultiDay 
      ? (new Date(dateString) >= new Date(event.startDate) && new Date(dateString) <= new Date(event.endDate))
      : event.date === dateString;
    
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
const viewEvent = (event) => {
  selectedEvent.value = event;
  showModal.value = true;
};

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

const viewEventFromMore = (event) => {
  closeMoreModal();
  viewEvent(event);
};

const bookTrainingFromModal = () => {
  if (!selectedEvent.value) {
    console.error("ไม่มีข้อมูลการอบรมที่เลือก");
    return;
  }

  if (selectedEvent.value.participantCount >= selectedEvent.value.capacity) {
    alert("การอบรมนี้เต็มแล้ว ไม่สามารถจองเพิ่มได้");
    return;
  }

  const currentEvent = { ...selectedEvent.value };
  closeModal();

  const queryParams = {
    eventId: String(currentEvent.id),
    eventTitle: currentEvent.title,
    eventDate: currentEvent.isMultiDay ? currentEvent.startDate : (currentEvent.date || currentEvent.startDate),
    eventTime: String(currentEvent.time || 8),
    examiner: "นายสมชัย งบ.1",
    type: currentEvent.title,
    room: "ห้อง A",
  };

  if (currentEvent.isMultiDay) {
    queryParams.eventEndDate = currentEvent.endDate;
    queryParams.isMultiDay = "true";
    queryParams.round = `${formatDateRange(currentEvent.startDate, currentEvent.endDate)}`;
  } else {
    queryParams.round = `${currentEvent.date} ${currentEvent.time}:00-12:00`;
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
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

/* Grid utility for week view */
.grid-cols-8 {
  grid-template-columns: 100px repeat(7, 1fr);
}

/* Custom scrollbar for week view */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Google Calendar-like hover effects */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
  transition: background-color 0.15s ease-in-out;
}

/* Multi-day event styling */
.multi-day-event {
  position: relative;
  overflow: hidden;
}

.multi-day-event::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: inherit;
}

/* Event text truncation */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Modal backdrop */
.fixed.inset-0 {
  backdrop-filter: blur(2px);
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .grid-cols-7 > div {
    min-height: 80px;
  }
  
  .text-xs {
    font-size: 0.65rem;
  }
  
  .px-2 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
}

/* Calendar cell improvements */
.calendar-cell {
  position: relative;
  background: white;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease-in-out;
}

.calendar-cell:hover {
  background-color: #f8fafc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Event positioning for overlapping events */
.event-container {
  position: relative;
  z-index: 1;
}

.event-item {
  position: relative;
  margin-bottom: 1px;
  z-index: auto;
}

/* Today highlight */
.today-highlight {
  background-color: #dbeafe !important;
  border-color: #3b82f6 !important;
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Accessibility improvements */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  .calendar-cell {
    break-inside: avoid;
  }
}
</style>