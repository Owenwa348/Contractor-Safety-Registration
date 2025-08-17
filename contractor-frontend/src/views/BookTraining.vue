<!-- BookTraining.vue -->
<template>
  <div class="p-6">
    <!-- หัวข้อ -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">จองอบรมทีมงาน</h1>

    <!-- ข้อมูลอบรมที่เลือก -->
    <div v-if="selectedEvent" class="border rounded-lg p-4 bg-white shadow-sm mb-4">
      <h3 class="text-lg font-semibold mb-3 text-gray-800">ข้อมูลการอบรม</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <p><strong>หัวข้อการอบรม:</strong> {{ selectedEvent.title }}</p>
        <p><strong>ประเภทการอบรม:</strong> {{ selectedEvent.type }}</p>
        <p><strong>ผู้สอน:</strong> {{ selectedEvent.instructor }}</p>
        <p><strong>รอบอบรม:</strong> {{ formatDate(selectedEvent.date) }} {{ selectedEvent.time }}-{{ selectedEvent.endTime }}</p>
        <p><strong>จำนวนผู้จองอบรม:</strong> {{ selectedEvent.booked }} / {{ selectedEvent.capacity }}</p>
        <p><strong>ห้องอบรม:</strong> {{ selectedEvent.room }}</p>
        <p><strong>ผู้สร้างการอบรม:</strong> {{ selectedEvent.creator }} ({{ selectedEvent.createdDate }})</p>
      </div>
    </div>

    <!-- ส่วนค้นหาและตาราง (แสดงเมื่อเลือกอบรมแล้ว) -->
    <div v-if="selectedEvent">
      <!-- Search -->
      <div class="flex justify-end mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="ค้นหาชื่อ..."
          class="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- ปุ่มจองอบรม -->
      <div class="mb-4">
        <button
          @click="bookSelected"
          class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          จองอบรมคนที่เลือก
        </button>
      </div>

      <!-- ตารางรายชื่อ -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-3 border text-center">
                <input 
                  type="checkbox" 
                  @change="selectAll" 
                  :checked="allSelected"
                  class="rounded"
                >
              </th>
              <th class="p-3 border text-center">ลำดับ</th>
              <th class="p-3 border text-center">ชื่อ</th>
              <th class="p-3 border text-center">เบอร์ติดต่อ</th>
              <th class="p-3 border text-center">บัตรประชาชน</th>
              <th class="p-3 border text-center">Certificate</th>
              <th class="p-3 border text-center">สถานะการจอง</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(person, index) in filteredPeople"
              :key="person.id"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td class="border p-3 text-center">
                <input 
                  type="checkbox" 
                  v-model="person.selected"
                  class="rounded"
                />
              </td>
              <td class="border p-3 text-center">{{ index + 1 }}</td>
              <td class="border p-3">{{ person.name }}</td>
              <td class="border p-3 text-center">{{ person.phone || '-' }}</td>
              <td class="border p-3 text-center">{{ person.idcard }}</td>
              <td class="border p-3 text-center text-gray-400">-</td>
              <td class="border p-3 text-center">
                <button 
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200 text-sm" 
                  @click="removePerson(person.id)"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- สรุปจำนวนคนที่เลือก -->
      <div v-if="selectedCount > 0" class="mt-4 p-3 bg-blue-50 rounded-lg">
        <p class="text-blue-800">
          <strong>เลือกแล้ว {{ selectedCount }} คน</strong> สำหรับอบรม "{{ selectedEvent.title }}"
        </p>
      </div>
    </div>

    <!-- ข้อความเมื่อไม่มีข้อมูลอบรม -->
    <div v-if="!selectedEvent" class="text-center py-12">
      <div class="text-gray-400 text-lg mb-2">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
        </svg>
      </div>
      <p class="text-gray-500">ไม่พบข้อมูลการอบรม กรุณาเลือกอบรมจากปฏิทินก่อน</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const events = ref([
  { 
    id: 1, 
    title: '08:30 อบรมครั้งที่ 1', 
    date: '2025-08-07', 
    time: '08:30', 
    endTime: '12:30',
    type: 'อบรมพื้นฐานความปลอดภัย',
    instructor: 'นายสมชัย งบ.1',
    capacity: 20,
    booked: 1,
    room: 'ห้อง A',
    creator: 'นายสมชัย งบ.1',
    createdDate: '02/04/2025 16:37'
  },
  { 
    id: 2, 
    title: '08:00 อบรมครั้งที่ 2', 
    date: '2025-08-14', 
    time: '08:00', 
    endTime: '12:00',
    type: 'อบรมความปลอดภัยขั้นสูง',
    instructor: 'นายสมศักดิ์ กิจดี',
    capacity: 25,
    booked: 3,
    room: 'ห้อง B',
    creator: 'นายสมศักดิ์ กิจดี',
    createdDate: '05/04/2025 10:15'
  },
  { 
    id: 3, 
    title: '08:30 อบรมครั้งที่ 3', 
    date: '2025-08-19', 
    time: '08:30', 
    endTime: '12:30',
    type: 'อบรมการใช้เครื่องจักร',
    instructor: 'นางสาวมาลี ใจดี',
    capacity: 30,
    booked: 0,
    room: 'ห้อง C',
    creator: 'นางสาวมาลี ใจดี',
    createdDate: '08/04/2025 14:20'
  },
  { 
    id: 4, 
    title: '08:30 อบรมครั้งที่ 4', 
    date: '2025-08-22', 
    time: '08:30', 
    endTime: '12:30',
    type: 'อบรมการปฐมพยาบาล',
    instructor: 'นายวิชัย เก่งดี',
    capacity: 20,
    booked: 2,
    room: 'ห้อง A',
    creator: 'นายวิชัย เก่งดี',
    createdDate: '10/04/2025 09:45'
  }
])

const selectedEventId = ref('')
const search = ref('')
const people = ref([
  { id: 1, name: 'ธันวา ชัยรัตนานนท์', phone: '0874569215', idcard: '11********66', selected: false },
  { id: 2, name: 'ภาคิน รินนาน', phone: '0874569216', idcard: '01********12', selected: false },
  { id: 3, name: 'กรรณ วรรณ', phone: '0874569217', idcard: '85********58', selected: false },
  { id: 4, name: 'กรรณา ไอมั่น', phone: '0617153737', idcard: 'ko33******38', selected: false },
  { id: 5, name: 'สมชาย ใจดี', phone: '0812345678', idcard: '12********89', selected: false },
  { id: 6, name: 'วิชัย มั่นคง', phone: '0823456789', idcard: '34********01', selected: false }
])

// ตรวจสอบข้อมูลที่ส่งมาจากปฏิทิน
onMounted(() => {
  const queryEventId = route.query.eventId
  console.log('Query parameters:', route.query)
  
  if (queryEventId && queryEventId !== '') {
    // ตั้งค่า event ที่เลือกตาม query parameter
    selectedEventId.value = parseInt(queryEventId)
    
    // อัพเดทข้อมูล event หากมีข้อมูลเพิ่มเติมจาก query
    const eventIndex = events.value.findIndex(e => e.id === parseInt(queryEventId))
    if (eventIndex !== -1) {
      // อัพเดทข้อมูล event จาก query parameters
      if (route.query.eventTitle) events.value[eventIndex].title = route.query.eventTitle
      if (route.query.eventDate) events.value[eventIndex].date = route.query.eventDate
      if (route.query.eventTime) {
        const timeStr = route.query.eventTime.toString()
        // ถ้าเป็นตัวเลข ให้แปลงเป็นเวลา
        if (!timeStr.includes(':')) {
          const time = parseInt(timeStr)
          events.value[eventIndex].time = `${time.toString().padStart(2, '0')}:${time >= 8 && time <= 9 ? '30' : '00'}`
          events.value[eventIndex].endTime = `${(time + 4).toString().padStart(2, '0')}:${time >= 8 && time <= 9 ? '30' : '00'}`
        } else {
          events.value[eventIndex].time = timeStr
        }
      }
      if (route.query.examiner) events.value[eventIndex].instructor = route.query.examiner
      if (route.query.type) events.value[eventIndex].type = route.query.type
      if (route.query.room) events.value[eventIndex].room = route.query.room
    }
  } else {
    console.log('No eventId in query parameters')
  }
})

// ติดตามการเปลี่ยนแปลงของ route query
watch(() => route.query, (newQuery) => {
  console.log('Route query changed:', newQuery)
  if (newQuery.eventId && newQuery.eventId !== '') {
    selectedEventId.value = parseInt(newQuery.eventId)
  }
}, { immediate: true })

const selectedEvent = computed(() => {
  return events.value.find(event => event.id === parseInt(selectedEventId.value))
})

const filteredPeople = computed(() => {
  if (!search.value) return people.value
  return people.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const selectedCount = computed(() => {
  return people.value.filter(p => p.selected).length
})

const allSelected = computed(() => {
  return filteredPeople.value.length > 0 && filteredPeople.value.every(p => p.selected)
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const bookSelected = () => {
  const selected = people.value.filter(p => p.selected)
  if (selected.length === 0) {
    alert('กรุณาเลือกอย่างน้อย 1 คน')
    return
  }
  
  if (confirm(`คุณต้องการจองอบรม "${selectedEvent.value.title}" ให้ ${selected.length} คน ใช่หรือไม่?`)) {
    // อัพเดทจำนวนผู้จอง
    const eventIndex = events.value.findIndex(e => e.id === selectedEvent.value.id)
    events.value[eventIndex].booked += selected.length
    
    // รีเซ็ตการเลือก
    people.value.forEach(p => p.selected = false)
    
    alert(`จองอบรมเรียบร้อยแล้ว! จำนวน ${selected.length} คน`)
  }
}

const selectAll = (event) => {
  const checked = event.target.checked
  filteredPeople.value.forEach(person => {
    person.selected = checked
  })
}

const removePerson = (personId) => {
  if (confirm('คุณต้องการลบบุคคลนี้ออกจากรายชื่อหรือไม่?')) {
    people.value = people.value.filter(p => p.id !== personId)
  }
}
</script>

<style scoped>
/* Custom styles สำหรับ Vue component */
</style>