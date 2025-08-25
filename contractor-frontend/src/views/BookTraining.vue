<!-- BookTraining.vue -->
<template>
  <div class="p-4">
    <!-- หัวข้อ -->
    <h1 class="text-2xl font-bold mb-4">จองอบรมทีมงาน</h1>

    <!-- ข้อมูลอบรมที่เลือก -->
    <div v-if="selectedEvent" class="border rounded p-4 bg-gray-50 mb-4">
      <h3 class="text-lg font-bold mb-2">ข้อมูลการอบรม</h3>
      <div class="space-y-1 text-sm">
        <p><strong>หัวข้อ:</strong> {{ selectedEvent.title }}</p>
        <p><strong>ผู้สอน:</strong> {{ selectedEvent.instructor }}</p>
        <p><strong>วันเวลา:</strong> {{ formatDate(selectedEvent.date) }} {{ selectedEvent.time }}-{{ selectedEvent.endTime }}</p>
        <p><strong>จำนวนคน:</strong> {{ selectedEvent.booked }} / {{ selectedEvent.capacity }}</p>
        <p><strong>ห้อง:</strong> {{ selectedEvent.room }}</p>
      </div>
    </div>

    <!-- ส่วนจัดการรายชื่อ -->
    <div v-if="selectedEvent">
      <!-- ค้นหา -->
      <div class="mb-3">
        <input
          v-model="search"
          type="text"
          placeholder="ค้นหาชื่อ..."
          class="border rounded px-3 py-2 w-64"
        />
      </div>

      <!-- ปุ่มต่างๆ -->
      <div class="mb-3 flex gap-2 flex-wrap">
        <button
          @click="bookSelected"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          จองคนที่เลือก ({{ selectedCount }})
        </button>
        
        <button
          @click="selectAllPeople"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          เลือกทั้งหมด
        </button>
        
        <button
          @click="clearSelection"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
          :disabled="selectedCount === 0"
        >
          เคลียร์การเลือก
        </button>
      </div>

      <!-- แสดงจำนวนที่เลือก -->
      <div v-if="selectedCount > 0" class="mb-3 p-3 bg-blue-50 rounded">
        <p class="text-blue-800">เลือกแล้ว {{ selectedCount }} คน สำหรับอบรม "{{ selectedEvent.title }}"</p>
      </div>

      <!-- ตารางรายชื่อ -->
      <div class="border rounded">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 text-center w-12">
                <input 
                  type="checkbox" 
                  @change="selectAll" 
                  :checked="allSelected"
                >
              </th>
              <th class="p-2 text-center w-16">ลำดับ</th>
              <th class="p-2 text-left">ชื่อ</th>
              <th class="p-2 text-center">เบอร์</th>
              <th class="p-2 text-center">บัตรประชาชน</th>
              <th class="p-2 text-center w-20">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in filteredPeople" :key="person.id" class="border-t">
              <td class="p-2 text-center">
                <input type="checkbox" v-model="person.selected" />
              </td>
              <td class="p-2 text-center">{{ index + 1 }}</td>
              <td class="p-2">{{ person.name }}</td>
              <td class="p-2 text-center">{{ person.phone || '-' }}</td>
              <td class="p-2 text-center">{{ person.idcard }}</td>
              <td class="p-2 text-center">
                <button 
                  class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600" 
                  @click="removePerson(person.id)"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ข้อความเมื่อไม่มีอบรม -->
    <div v-if="!selectedEvent" class="text-center py-8">
      <p class="text-gray-500">ไม่พบข้อมูลการอบรม กรุณาเลือกอบรมจากปฏิทินก่อน</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// ข้อมูลอบรม
const events = ref([
  { 
    id: 1, 
    title: 'อบรมพื้นฐานความปลอดภัย', 
    date: '2025-08-07', 
    time: '08:30', 
    endTime: '12:30',
    instructor: 'นายสมชัย งบ.1',
    capacity: 20,
    booked: 12,
    room: 'ห้อง A'
  },
  { 
    id: 2, 
    title: 'อบรมการใช้เครื่องมือ', 
    date: '2025-08-14', 
    time: '08:00', 
    endTime: '12:00',
    instructor: 'นายสมศักดิ์ กิจดี',
    capacity: 25,
    booked: 3,
    room: 'ห้อง B'
  },
  { 
    id: 3, 
    title: 'อบรมการใช้เครื่องจักร', 
    date: '2025-08-19', 
    time: '08:30', 
    endTime: '12:30',
    instructor: 'นางสาวมาลี ใจดี',
    capacity: 30,
    booked: 0,
    room: 'ห้อง C'
  },
  { 
    id: 4, 
    title: 'อบรมการปฐมพยาบาล', 
    date: '2025-08-22', 
    time: '08:30', 
    endTime: '12:30',
    instructor: 'นายวิชัย เก่งดี',
    capacity: 20,
    booked: 2,
    room: 'ห้อง A'
  }
])

// ข้อมูลบุคคล
const people = ref([
  { id: 1, name: 'ธันวา ชัยรัตนานนท์', phone: '0874569215', idcard: '11********66', selected: false },
  { id: 2, name: 'ภาคิน รินนาน', phone: '0874569216', idcard: '01********12', selected: false },
  { id: 3, name: 'กรรณ วรรณ', phone: '0874569217', idcard: '85********58', selected: false },
  { id: 4, name: 'กรรณา ไอมั่น', phone: '0617153737', idcard: 'ko33******38', selected: false },
  { id: 5, name: 'สมชาย ใจดี', phone: '0812345678', idcard: '12********89', selected: false },
  { id: 6, name: 'วิชัย มั่นคง', phone: '0823456789', idcard: '34********01', selected: false }
])

const selectedEventId = ref('')
const search = ref('')

// ตั้งค่าเริ่มต้นจาก URL
onMounted(() => {
  const queryEventId = route.query.eventId
  if (queryEventId) {
    selectedEventId.value = parseInt(queryEventId)
  }
})

// ติดตามการเปลี่ยนแปลง URL
watch(() => route.query, (newQuery) => {
  if (newQuery.eventId) {
    selectedEventId.value = parseInt(newQuery.eventId)
  }
})

// คำนวณค่าต่างๆ
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

// ฟังก์ชันต่างๆ
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
  
  if (confirm(`จองอบรม "${selectedEvent.value.title}" ให้ ${selected.length} คน?`)) {
    // อัพเดทจำนวนผู้จอง
    const eventIndex = events.value.findIndex(e => e.id === selectedEvent.value.id)
    events.value[eventIndex].booked += selected.length
    
    // รีเซ็ตการเลือก
    people.value.forEach(p => p.selected = false)
    
    alert(`จองเรียบร้อยแล้ว! จำนวน ${selected.length} คน`)
  }
}

const selectAll = (event) => {
  const checked = event.target.checked
  filteredPeople.value.forEach(person => {
    person.selected = checked
  })
}

const selectAllPeople = () => {
  people.value.forEach(person => {
    person.selected = true
  })
}

const clearSelection = () => {
  people.value.forEach(person => {
    person.selected = false
  })
}

const removePerson = (personId) => {
  if (confirm('ลบบุคคลนี้ออกจากรายชื่อ?')) {
    people.value = people.value.filter(p => p.id !== personId)
  }
}
</script>