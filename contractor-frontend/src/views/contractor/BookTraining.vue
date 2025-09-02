<!-- BookTraining.vue -->
<template>
  <div class="p-4">
    <!-- ปุ่มกลับไปยังปฏิทิน -->
    <div class="mb-4">
      <button 
        @click="() => $router.push('/training-booking')" 
        class="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        กลับไปยังปฏิทินการอบรม
      </button>
    </div>
    <!-- หัวข้อ -->
    <h1 class="text-2xl font-bold mb-4">
      {{ selectedEvent ? `จองอบรม "${selectedEvent.title}"` : 'จองอบรมทีมงาน' }}
    </h1>

    <!-- ข้อมูลอบรมที่เลือก -->
    <div v-if="selectedEvent" class="border rounded p-4 bg-gray-50 mb-4">
      <h3 class="text-lg font-bold mb-2">ข้อมูลการอบรม</h3>
      <div class="space-y-1 text-sm">
        <p><strong>หัวข้อ:</strong> {{ selectedEvent.title }}</p>
        <p><strong>ผู้สอน:</strong> {{ selectedEvent.instructor }}</p>
        <p v-if="round"><strong>รอบการอบรม:</strong> {{ round }}</p>
        <p v-else><strong>วันเวลา:</strong> {{ formatDate(selectedEvent.date) }} {{ selectedEvent.time }}-{{ selectedEvent.endTime }}</p>
        <p v-if="examDateDisplay"><strong>วันที่ทำข้อสอบ:</strong> <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ examDateDisplay }}</span></p>
        <p><strong>จำนวนคน:</strong> {{ selectedEvent.booked }} / {{ selectedEvent.capacity }}</p>
        <p><strong>ห้อง:</strong> {{ selectedEvent.room }}</p>
        <p v-if="eventType && eventType !== selectedEvent.title"><strong>ประเภท:</strong> {{ eventType }}</p>
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
          @click="selectOnlyApproved"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          เลือกเฉพาะคนอนุมัติ
        </button>
        
        <button
          @click="selectOnlyNotPassed"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          เลือกเฉพาะคนไม่ผ่าน
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

      <!-- สถิติแยกตามสถานะ -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 class="text-green-800 font-semibold mb-2">อนุมัติแล้ว</h3>
          <p class="text-green-700">จำนวน {{ approvedPeople.length }} คน</p>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="text-red-800 font-semibold mb-2">ไม่ผ่าน</h3>
          <p class="text-red-700">จำนวน {{ notPassedPeople.length }} คน</p>
        </div>
      </div>

      <!-- ตารางคนที่อนุมัติแล้ว -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-green-800 mb-3 flex items-center">
          <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          รายชื่อผู้ได้รับอนุมัติ ({{ approvedPeople.length }} คน)
        </h3>
        <div class="border rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-green-100">
              <tr>
                <th class="p-2 text-center w-12">
                  <input 
                    type="checkbox" 
                    @change="selectAllApproved" 
                    :checked="allApprovedSelected"
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
              <tr v-for="(person, index) in approvedPeople" :key="person.id" class="border-t hover:bg-green-50">
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
              <tr v-if="approvedPeople.length === 0">
                <td colspan="6" class="p-4 text-center text-gray-500">
                  ไม่มีรายชื่อผู้ได้รับอนุมัติ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ตารางคนที่ไม่ผ่าน -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-red-800 mb-3 flex items-center">
          <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          รายชื่อผู้ไม่ผ่านการอนุมัติ ({{ notPassedPeople.length }} คน)
        </h3>
        <div class="border rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-red-100">
              <tr>
                <th class="p-2 text-center w-12">
                  <input 
                    type="checkbox" 
                    @change="selectAllNotPassed" 
                    :checked="allNotPassedSelected"
                  >
                </th>
                <th class="p-2 text-center w-16">ลำดับ</th>
                <th class="p-2 text-left">ชื่อ</th>
                <th class="p-2 text-center">เบอร์</th>
                <th class="p-2 text-center">บัตรประชาชน</th>
                <th class="p-2 text-center">สอบไม่ผ่านอบรมอะไร</th>
                <th class="p-2 text-center w-20">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(person, index) in notPassedPeople" :key="person.id" class="border-t hover:bg-red-50">
                <td class="p-2 text-center">
                  <input type="checkbox" v-model="person.selected" />
                </td>
                <td class="p-2 text-center">{{ index + 1 }}</td>
                <td class="p-2">{{ person.name }}</td>
                <td class="p-2 text-center">{{ person.phone || '-' }}</td>
                <td class="p-2 text-center">{{ person.idcard }}</td>
                <td class="p-2 text-center text-sm">
                  <span v-if="person.failedTraining" class="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {{ person.failedTraining }}
                  </span>
                  <span v-else class="text-gray-400">-</span>
                </td>
                <td class="p-2 text-center">
                  <button 
                    class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600" 
                    @click="removePerson(person.id)"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
              <tr v-if="notPassedPeople.length === 0">
                <td colspan="7" class="p-4 text-center text-gray-500">
                  ไม่มีรายชื่อผู้ไม่ผ่านการอนุมัติ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ข้อความเมื่อไม่มีอบรม -->
    <div v-if="!selectedEvent" class="text-center py-8">
      <div class="max-w-md mx-auto">
        <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">ไม่พบข้อมูลการอบรม</h3>
        <p class="text-gray-500 mb-4">กรุณาเลือกอบรมจากปฏิทินก่อน</p>
        <button 
          @click="() => $router.push('/training-booking')" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          ไปยังปฏิทินการอบรม
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// State management
const isLoading = ref(false)
const isBooking = ref(false)
const notifications = ref([])

// Exam date information from URL parameters
const examDate = ref('')
const examDateDisplay = ref('')

// Training information from URL parameters
const eventTitle = ref('')
const eventDate = ref('')
const eventTime = ref('')
const examiner = ref('')
const room = ref('')
const eventType = ref('')
const round = ref('')

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
    title: 'อบรมการประกอบอุปกรณ์', 
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
  { id: 1, name: 'ธันวา ชัยรัตนานนท์', phone: '0874569215', idcard: '11********66', selected: false, examDate: null, status: 'approved' },
  { id: 2, name: 'ภาคิน รินนาน', phone: '0874569216', idcard: '01********12', selected: false, examDate: null, status: 'approved' },
  { id: 3, name: 'กรรณ วรรณ', phone: '0874569217', idcard: '85********58', selected: false, examDate: null, status: 'not_passed', failedTraining: 'อบรมความปลอดภัย' },
  { id: 4, name: 'กรรณา ไอมั่น', phone: '0617153737', idcard: '33********38', selected: false, examDate: null, status: 'approved' },
  { id: 5, name: 'สมชาย ใจดี', phone: '0812345678', idcard: '12********89', selected: false, examDate: null, status: 'not_passed', failedTraining: 'อบรมการใช้เครื่องมือ' },
  { id: 6, name: 'วิชัย มั่นคง', phone: '0823456789', idcard: '34********01', selected: false, examDate: null, status: 'approved' }
])

const selectedEventId = ref('')
const search = ref('')

// ตั้งค่าเริ่มต้นจาก URL
onMounted(() => {
  const queryEventId = route.query.eventId
  if (queryEventId) {
    selectedEventId.value = parseInt(queryEventId)
  }
  
  // Get exam date information from URL parameters
  if (route.query.examDate) {
    examDate.value = route.query.examDate
  }
  
  if (route.query.examDateDisplay) {
    examDateDisplay.value = route.query.examDateDisplay
  } else if (route.query.examDate) {
    // Fallback to format the exam date if examDateDisplay is not provided
    examDateDisplay.value = formatDate(route.query.examDate)
  }
  
  // Get training information from URL parameters
  if (route.query.eventTitle) {
    eventTitle.value = route.query.eventTitle
  }
  
  if (route.query.eventDate) {
    eventDate.value = route.query.eventDate
  }
  
  if (route.query.eventTime) {
    eventTime.value = route.query.eventTime
  }
  
  if (route.query.examiner) {
    examiner.value = route.query.examiner
  }
  
  if (route.query.room) {
    room.value = route.query.room
  }
  
  if (route.query.type) {
    eventType.value = route.query.type
  }
  
  if (route.query.round) {
    round.value = route.query.round
  }
})

// ติดตามการเปลี่ยนแปลง URL
watch(() => route.query, (newQuery) => {
  if (newQuery.eventId) {
    selectedEventId.value = parseInt(newQuery.eventId)
  }
  
  // Update exam date information when URL changes
  if (newQuery.examDate) {
    examDate.value = newQuery.examDate
  }
  
  if (newQuery.examDateDisplay) {
    examDateDisplay.value = newQuery.examDateDisplay
  } else if (newQuery.examDate) {
    examDateDisplay.value = formatDate(newQuery.examDate)
  }
  
  // Update training information when URL changes
  if (newQuery.eventTitle) {
    eventTitle.value = newQuery.eventTitle
  }
  
  if (newQuery.eventDate) {
    eventDate.value = newQuery.eventDate
  }
  
  if (newQuery.eventTime) {
    eventTime.value = newQuery.eventTime
  }
  
  if (newQuery.examiner) {
    examiner.value = newQuery.examiner
  }
  
  if (newQuery.room) {
    room.value = newQuery.room
  }
  
  if (newQuery.type) {
    eventType.value = newQuery.type
  }
  
  if (newQuery.round) {
    round.value = newQuery.round
  }
})

// Computed properties
const selectedEvent = computed(() => {
  // First try to find from predefined events
  const foundEvent = events.value.find(event => event.id === parseInt(selectedEventId.value))
  
  // If found in predefined events, return it
  if (foundEvent) {
    return foundEvent
  }
  
  // If not found but we have URL parameters, create dynamic event
  if (eventTitle.value || eventDate.value) {
    return {
      id: parseInt(selectedEventId.value) || 0,
      title: eventTitle.value || 'ไม่ระบุหัวข้อ',
      date: eventDate.value || '',
      time: eventTime.value || '08:00',
      endTime: '12:00', // Default end time
      instructor: examiner.value || 'ไม่ระบุผู้สอน',
      capacity: 30, // Default capacity
      booked: 0, // Default booked count
      room: room.value || 'ไม่ระบุห้อง',
      type: eventType.value || eventTitle.value || 'อบรม'
    }
  }
  
  return null
})

const filteredPeople = computed(() => {
  if (!search.value) return people.value
  return people.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.phone?.toLowerCase().includes(search.value.toLowerCase()) ||
    p.idcard.toLowerCase().includes(search.value.toLowerCase())
  )
})

const approvedPeople = computed(() => {
  return filteredPeople.value.filter(p => p.status === 'approved')
})

const notPassedPeople = computed(() => {
  return filteredPeople.value.filter(p => p.status === 'not_passed')
})

const selectedCount = computed(() => {
  return people.value.filter(p => p.selected).length
})

const allSelected = computed(() => {
  return filteredPeople.value.length > 0 && filteredPeople.value.every(p => p.selected)
})

const allApprovedSelected = computed(() => {
  return approvedPeople.value.length > 0 && approvedPeople.value.every(p => p.selected)
})

const allNotPassedSelected = computed(() => {
  return notPassedPeople.value.length > 0 && notPassedPeople.value.every(p => p.selected)
})

const availableSlots = computed(() => {
  if (!selectedEvent.value) return 0
  return selectedEvent.value.capacity - selectedEvent.value.booked
})

// Helper functions
const getCapacityStatus = (event) => {
  const available = event.capacity - event.booked
  if (available <= 0) {
    return { text: 'เต็มแล้ว', class: 'bg-red-100 text-red-800' }
  } else if (available <= 5) {
    return { text: `เหลือ ${available} ที่นั่ง`, class: 'bg-yellow-100 text-yellow-800' }
  } else {
    return { text: `ว่าง ${available} ที่นั่ง`, class: 'bg-green-100 text-green-800' }
  }
}

const showNotification = (message, type = 'success') => {
  const notification = {
    id: Date.now(),
    message,
    type,
    show: true
  }
  notifications.value.push(notification)
  
  setTimeout(() => {
    const index = notifications.value.findIndex(n => n.id === notification.id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }, 5000)
}

const refreshData = async () => {
  isLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showNotification('ข้อมูลได้รับการอัปเดตแล้ว')
  } catch (error) {
    showNotification('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error')
  } finally {
    isLoading.value = false
  }
}

// Functions
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  
  const date = new Date(dateStr)
  
  // Check if it's already in Thai format
  if (dateStr.includes('มกราคม') || dateStr.includes('กุมภาพันธ์') || dateStr.includes('กันยายน')) {
    return dateStr
  }
  
  // Convert to Thai format
  const day = date.getDate()
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear() + 543
  
  return `${day} ${month} ${year}`
}

const bookSelected = async () => {
  const selected = people.value.filter(p => p.selected)
  
  // Validation
  if (selected.length === 0) {
    showNotification('กรุณาเลือกอย่างน้อย 1 คน', 'warning')
    return
  }
  
  if (selected.length > availableSlots.value) {
    showNotification(`จำนวนคนที่เลือกเกินจำนวนที่นั่งว่าง (เหลือ ${availableSlots.value} ที่นั่ง)`, 'error')
    return
  }
  
  if (availableSlots.value <= 0) {
    showNotification('การอบรมนี้เต็มแล้ว', 'error')
    return
  }
  
  const confirmMessage = examDateDisplay.value 
    ? `ยืนยันการจองอบรม "${selectedEvent.value.title}" ให้ ${selected.length} คน\nวันที่ทำข้อสอบ: ${examDateDisplay.value}?`
    : `ยืนยันการจองอบรม "${selectedEvent.value.title}" ให้ ${selected.length} คน?`
  
  if (!confirm(confirmMessage)) {
    return
  }
  
  isBooking.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update booked count
    const eventIndex = events.value.findIndex(e => e.id === selectedEvent.value.id)
    events.value[eventIndex].booked += selected.length
    
    // Store the specific exam date for each selected person
    selected.forEach(person => {
      person.examDate = examDateDisplay.value || formatDate(examDate.value) || 'ไม่ระบุ'
      person.selected = false
    })
    
    const successMessage = examDateDisplay.value 
      ? `จองเรียบร้อยแล้ว! จำนวน ${selected.length} คน (วันที่ทำข้อสอบ: ${examDateDisplay.value})`
      : `จองเรียบร้อยแล้ว! จำนวน ${selected.length} คน`
    
    showNotification(successMessage, 'success')
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการจอง:', error)
    showNotification('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง', 'error')
  } finally {
    isBooking.value = false
  }
}

const selectAll = (event) => {
  const checked = event.target.checked
  filteredPeople.value.forEach(person => {
    person.selected = checked
  })
}

const selectAllApproved = (event) => {
  const checked = event.target.checked
  approvedPeople.value.forEach(person => {
    person.selected = checked
  })
}

const selectAllNotPassed = (event) => {
  const checked = event.target.checked
  notPassedPeople.value.forEach(person => {
    person.selected = checked
  })
}

const selectAllPeople = () => {
  people.value.forEach(person => {
    person.selected = true
  })
}

const selectOnlyApproved = () => {
  people.value.forEach(person => {
    person.selected = person.status === 'approved'
  })
}

const selectOnlyNotPassed = () => {
  people.value.forEach(person => {
    person.selected = person.status === 'not_passed'
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