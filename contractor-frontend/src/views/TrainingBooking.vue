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
      </div>
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Calendar Component -->
      <div class="calendar-card bg-white rounded-xl border border-gray-200">
        
        <!-- Calendar Header -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white"
        >
          <div class="flex items-center gap-3 mb-4 sm:mb-0">
            <button
              @click="previousMonth"
              class="nav-button p-3 hover:bg-gray-200 rounded-full transition-colors duration-200"
              title="เดือนก่อน"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              @click="nextMonth"
              class="nav-button p-3 hover:bg-gray-200 rounded-full transition-colors duration-200"
              title="เดือนถัดไป"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
            <button
              @click="goToToday"
              class="nav-button px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors duration-200"
            >
              วันนี้
            </button>
          </div>

          <h2 class="text-xl font-bold text-gray-800 text-center flex-1">
            {{ currentMonthYear }}
          </h2>

          <div class="flex gap-2 mt-4 sm:mt-0">
            <button
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                viewMode === 'month'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
              ]"
              @click="viewMode = 'month'"
            >
              เดือน
            </button>
            <button
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                viewMode === 'week'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
              ]"
              @click="viewMode = 'week'"
            >
              สัปดาห์
            </button>
          </div>
        </div>

        <!-- Month View -->
        <div
          v-if="viewMode === 'month'"
          class="grid grid-cols-7 border-b border-gray-200"
        >
          <!-- Day Headers -->
          <div
            v-for="day in daysOfWeek"
            :key="day"
            class="p-4 text-center font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200 last:border-r-0"
          >
            {{ day }}
          </div>

          <!-- Calendar Dates -->
          <div
            v-for="date in calendarDates"
            :key="date.key"
            class="calendar-date min-h-[120px] p-3 border-r border-b border-gray-200 last:border-r-0 hover:bg-blue-50 cursor-pointer"
            :class="{
              'bg-gray-50 text-gray-400': !date.isCurrentMonth,
              'today-highlight': date.isToday,
              'bg-blue-50': date.isToday,
            }"
          >
            <div class="flex justify-between items-start mb-2">
              <span
                class="text-sm font-semibold"
                :class="date.isToday ? 'text-blue-600' : ''"
              >
                {{ date.day }}
              </span>
              <span
                v-if="date.isToday"
                class="text-xs bg-blue-600 text-white px-2 py-1 rounded-full"
              >
                วันนี้
              </span>
            </div>

            <div class="space-y-1">
              <div
                v-for="event in date.events"
                :key="event.id"
                class="training-event text-xs text-white p-2 rounded-md cursor-pointer hover:shadow-md transition-shadow duration-200"
                @click.stop="viewEvent(event)"
                :title="event.title"
              >
                <div class="font-medium truncate">{{ event.title }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-else-if="viewMode === 'week'">
          <div class="grid grid-cols-8 border-b border-gray-200">
            <div
              class="p-4 text-center font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200"
            >
              เวลา
            </div>
            <div
              v-for="day in weekDays"
              :key="day.key"
              class="p-4 text-center bg-gradient-to-b from-gray-100 to-gray-50 border-r border-gray-200 last:border-r-0"
            >
              <div class="font-semibold text-gray-700">{{ day.dayName }}</div>
              <div class="text-sm text-gray-500 mt-1">{{ day.date }}</div>
            </div>
          </div>

          <!-- Time Slots -->
          <div class="max-h-96 overflow-y-auto">
            <div
              v-for="hour in timeSlots"
              :key="`hour-${hour}`"
              class="grid grid-cols-8 border-b border-gray-100"
            >
              <div
                class="p-3 text-xs text-gray-600 bg-gray-50 border-r border-gray-200 font-medium"
              >
                {{ hour }}:00
              </div>
              <div
                v-for="day in weekDays"
                :key="`${day.key}-${hour}`"
                class="min-h-16 p-2 border-r border-gray-200 last:border-r-0 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                @click="addEventToTimeSlot(day.fullDate, hour)"
              >
                <div
                  v-for="event in getEventsForDayAndHour(day.fullDate, hour)"
                  :key="event.id"
                  class="training-event text-xs text-white p-2 rounded mb-1 cursor-pointer hover:shadow-md transition-shadow duration-200"
                  @click.stop="viewEvent(event)"
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
        class="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="closeModal"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-100 transform transition-all duration-300 scale-100"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
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
              รายละเอียดการอบรม
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div v-if="selectedEvent" class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <label class="text-sm font-semibold text-blue-700 uppercase tracking-wider"
                >หัวข้อการอบรม</label
              >
              <p class="text-lg font-medium text-gray-800 mt-1">
                {{ selectedEvent.title }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <label
                  class="text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >วันที่</label
                >
                <p class="text-gray-800 font-medium mt-1">
                  {{ formatThaiDate(selectedEvent.date) }}
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <label
                  class="text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >เวลา</label
                >
                <p class="text-gray-800 font-medium mt-1">
                  {{ selectedEvent.time }}:00 น.
                </p>
              </div>
            </div>
            <div class="bg-green-50 p-4 rounded-lg border border-green-100">
              <label
                class="text-sm font-semibold text-green-700 uppercase tracking-wider"
              >
                จำนวนผู้เข้าร่วม
              </label>
              <p class="text-green-800 font-medium mt-1">
                {{ selectedEvent.participantCount }}/{{ selectedEvent.capacity }} คน
              </p>
            </div>

            <!-- Book Training Button in Modal -->
            <div class="pt-4 border-t border-gray-200">
              <button
                @click="bookTrainingFromModal"
                class="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  class="w-5 h-5"
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
                จองอบรมให้ทีมงาน
              </button>
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
const selectedEvent = ref(null);
const router = useRouter();
// Constants
const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const monthNames = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

// Events data
const events = ref([
  {
    id: 1,
    title: "08:30 อบรมครั้งที่ 1",
    date: "2025-08-07",
    time: 8,
    participantCount: 12, // คนที่จองแล้ว
    capacity: 30, // รับได้สูงสุด
  },
  {
    id: 2,
    title: "08:00 อบรมครั้งที่ 2",
    date: "2025-08-14",
    time: 8,
    participantCount: 8,
    capacity: 30,
  },
  {
    id: 3,
    title: "08:30 อบรมครั้งที่ 3",
    date: "2025-08-19",
    time: 8,
    participantCount: 15,
    capacity: 30,
  },
  {
    id: 4,
    title: "08:30 อบรมครั้งที่ 4",
    date: "2025-08-22",
    time: 8,
    participantCount: 20,
    capacity: 30,
  },
]);

// Computed properties
const currentMonthYear = computed(() => {
  const year = currentDate.value.getFullYear() + 543; // Thai year
  const month = monthNames[currentDate.value.getMonth()];
  return `${month} ${year}`;
});

const thisMonthEvents = computed(() => {
  const currentMonth = currentDate.value.getMonth();
  const currentYear = currentDate.value.getFullYear();
  return events.value.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
    );
  }).length;
});

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const dates = [];
  const today = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dateString = formatDate(date);
    const dayEvents = events.value.filter((event) => event.date === dateString);

    dates.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      day: date.getDate(),
      fullDate: dateString,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      events: dayEvents,
    });
  }

  return dates;
});

const weekDays = computed(() => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    days.push({
      key: i,
      dayName: daysOfWeek[i],
      date: date.getDate(),
      fullDate: formatDate(date),
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

// Methods
const getEventsForDayAndHour = (dateString, hour) => {
  return events.value.filter(
    (event) => event.date === dateString && event.time === parseInt(hour)
  );
};

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

const bookTrainingFromModal = () => {
  // ตรวจสอบว่า selectedEvent มีค่าหรือไม่
  if (!selectedEvent.value) {
    console.error("ไม่มีข้อมูลการอบรมที่เลือก");
    return;
  }

  console.log("จองอบรมสำหรับการอบรม:", selectedEvent.value);

  console.log("Event data:", {
    id: selectedEvent.value.id,
    title: selectedEvent.value.title,
    date: selectedEvent.value.date,
    time: selectedEvent.value.time,
  });

  // เก็บข้อมูล selectedEvent ไว้ในตัวแปรก่อน close modal
  const currentEvent = { ...selectedEvent.value };

  // ปิด modal ก่อน navigate
  closeModal();

  // Navigate ไปยังหน้าจองอบรม
  router
    .push({
      path: "/book-training",
      query: {
        eventId: String(currentEvent.id),
        eventTitle: currentEvent.title,
        eventDate: currentEvent.date,
        eventTime: String(currentEvent.time),
        examiner: "นายสมชัย งบ.1",
        type: "อบรมพื้นฐานความปลอดภัย",
        round: `${currentEvent.date} ${currentEvent.time}:00-12:00`,
        room: "ห้อง A",
      },
    })
    .catch((err) => {
      console.error("Navigation error:", err);
      // ถ้า navigation ล้มเหลว ให้ใช้ window.location
      const params = new URLSearchParams({
        eventId: String(currentEvent.id),
        eventTitle: currentEvent.title,
        eventDate: currentEvent.date,
        eventTime: String(currentEvent.time),
        examiner: "นายสมชัย งบ.1",
        type: "อบรมพื้นฐานความปลอดภัย",
        room: "ห้อง A",
      });
      window.location.href = `/book-training?${params.toString()}`;
    });
};
const viewEvent = (event) => {
  selectedEvent.value = event;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedEvent.value = null;
};

const formatThaiDate = (dateString) => {
  // จัดรูปแบบวันที่เป็นรูปแบบภาษาไทย
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
};

const addEventToTimeSlot = (dateString, hour) => {
  // ฟังก์ชันสำหรับเพิ่ม event ใหม่ในช่วงเวลาที่กำหนด
  console.log("เพิ่มการอบรมใหม่ในวันที่:", dateString, "เวลา:", hour);
  // สามารถเปิด modal หรือไปหน้าจองอบรมใหม่ได้
};
</script>

<style scoped>
/* Custom styles for better appearance */
.calendar-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.calendar-date {
  transition: all 0.2s ease;
}

.calendar-date:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

.training-event {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  animation: fadeIn 0.3s ease-in;
}

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

.nav-button {
  transition: all 0.2s ease;
}

.nav-button:hover {
  transform: scale(1.05);
}

.today-highlight {
  position: relative;
  overflow: hidden;
}

.today-highlight::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(147, 197, 253, 0.1) 100%
  );
  pointer-events: none;
}

/* Grid columns for week view */
.grid-cols-8 {
  grid-template-columns: repeat(8, minmax(0, 1fr));
}
</style>
