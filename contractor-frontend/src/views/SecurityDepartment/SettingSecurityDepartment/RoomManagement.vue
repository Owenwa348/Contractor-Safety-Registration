<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium text-gray-900">จัดการห้องประชุม</h2>
      <button 
        v-if="hasPermission('manage_rooms')"
        @click="showRoomForm = !showRoomForm"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        เพิ่มห้อง
      </button>
    </div>

    <!-- Add Room Form -->
    <div v-if="showRoomForm && hasPermission('manage_rooms')" class="bg-gray-50 p-6 rounded-lg">
      <h3 class="font-medium text-gray-900 mb-4">เพิ่มห้องใหม่</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">ชื่อห้อง</label>
          <input 
            type="text" 
            v-model="newRoom.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ระบุชื่อห้อง"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">ความจุ (จำนวนคน)</label>
          <input 
            type="number" 
            v-model="newRoom.capacity"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ระบุความจุ"
            min="1"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">ประเภทห้อง</label>
          <select 
            v-model="newRoom.type"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="training">ห้องอบรม</option>
            <option value="meeting">ห้องประชุม</option>
            <option value="conference">ห้องประชุมใหญ่</option>
            <option value="workshop">ห้องปฏิบัติการ</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">ชั้น</label>
          <input 
            type="number" 
            v-model="newRoom.floor"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ชั้นที่"
            min="1"
          >
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">อุปกรณ์ที่มี</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          <label class="flex items-center">
            <input type="checkbox" v-model="newRoom.equipment" value="projector" class="rounded">
            <span class="ml-2 text-sm">โปรเจคเตอร์</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" v-model="newRoom.equipment" value="microphone" class="rounded">
            <span class="ml-2 text-sm">ไมโครโฟน</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" v-model="newRoom.equipment" value="whiteboard" class="rounded">
            <span class="ml-2 text-sm">กระดานไวท์บอร์ด</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" v-model="newRoom.equipment" value="computer" class="rounded">
            <span class="ml-2 text-sm">คอมพิวเตอร์</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" v-model="newRoom.equipment" value="air_conditioning" class="rounded">
            <span class="ml-2 text-sm">เครื่องปรับอากาศ</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" v-model="newRoom.equipment" value="wifi" class="rounded">
            <span class="ml-2 text-sm">Wi-Fi</span>
          </label>
        </div>
      </div>
      <div class="flex items-center mt-4">
        <input 
          type="checkbox" 
          v-model="newRoom.available"
          class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        >
        <label class="ml-2 text-sm text-gray-700">พร้อมใช้งาน</label>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button 
          @click="showRoomForm = false"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ยกเลิก
        </button>
        <button 
          @click="addRoom"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          บันทึก
        </button>
      </div>
    </div>

    <!-- Room Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-blue-800">ห้องทั้งหมด</h3>
        <p class="text-2xl font-bold text-blue-900">{{ rooms.length }}</p>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-green-800">ห้องพร้อมใช้งาน</h3>
        <p class="text-2xl font-bold text-green-900">{{ availableRooms.length }}</p>
      </div>
      <div class="bg-red-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-red-800">ห้องไม่พร้อมใช้งาน</h3>
        <p class="text-2xl font-bold text-red-900">{{ unavailableRooms.length }}</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-purple-800">ความจุรวม</h3>
        <p class="text-2xl font-bold text-purple-900">{{ totalCapacity }} คน</p>
      </div>
    </div>

    <!-- Rooms List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="room in rooms" 
        :key="room.id"
        class="border rounded-lg p-4 hover:shadow-md transition-shadow"
        :class="room.available ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'"
      >
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="font-medium text-gray-900">{{ room.name }}</h3>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ getRoomTypeName(room.type) }}</span>
          </div>
          <div class="flex gap-2">
            <button 
              v-if="hasPermission('manage_rooms')"
              @click="editRoom(room)"
              class="text-blue-500 hover:text-blue-700"
              title="แก้ไข"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button 
              v-if="hasPermission('manage_rooms')"
              @click="toggleRoomAvailability(room.id)"
              :class="room.available ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'"
              :title="room.available ? 'ปิดใช้งาน' : 'เปิดใช้งาน'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="room.available" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
            <button 
              v-if="hasPermission('manage_rooms')"
              @click="deleteRoom(room.id)"
              class="text-red-500 hover:text-red-700"
              title="ลบ"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="space-y-2 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>ความจุ:</span>
            <span class="font-medium">{{ room.capacity }} คน</span>
          </div>
          <div v-if="room.floor" class="flex justify-between">
            <span>ชั้น:</span>
            <span>{{ room.floor }}</span>
          </div>
          <div class="flex justify-between">
            <span>สถานะ:</span>
            <span 
              :class="room.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'"
            >
              {{ room.available ? 'พร้อมใช้งาน' : 'ไม่พร้อมใช้งาน' }}
            </span>
          </div>
          <div v-if="room.equipment && room.equipment.length > 0" class="mt-3">
            <p class="text-xs text-gray-500 mb-1">อุปกรณ์:</p>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="equipment in room.equipment" 
                :key="equipment"
                class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {{ getEquipmentName(equipment) }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="getRoomUsage(room.id)" class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-xs text-gray-500">กิจกรรมที่ใช้ห้อง: {{ getRoomUsage(room.id) }} กิจกรรม</p>
        </div>
      </div>
    </div>

    <!-- Edit Room Modal -->
    <div v-if="editingRoom" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">แก้ไขข้อมูลห้อง</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">ชื่อห้อง</label>
            <input 
              type="text" 
              v-model="editingRoom.name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">ความจุ</label>
            <input 
              type="number" 
              v-model="editingRoom.capacity"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">ประเภทห้อง</label>
            <select 
              v-model="editingRoom.type"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="training">ห้องอบรม</option>
              <option value="meeting">ห้องประชุม</option>
              <option value="conference">ห้องประชุมใหญ่</option>
              <option value="workshop">ห้องปฏิบัติการ</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button 
            @click="editingRoom = null"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ยกเลิก
          </button>
          <button 
            @click="saveRoom"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  },
  activities: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['room-added', 'room-updated', 'room-deleted', 'room-availability-changed'])

// Meeting rooms
const rooms = ref([
  { id: 1, name: 'ห้อง A', capacity: 30, available: true, type: 'training', floor: 1, equipment: ['projector', 'whiteboard', 'air_conditioning'] },
  { id: 2, name: 'ห้อง B', capacity: 50, available: false, type: 'meeting', floor: 2, equipment: ['projector', 'microphone', 'computer'] },
  { id: 3, name: 'ห้อง C', capacity: 20, available: true, type: 'workshop', floor: 1, equipment: ['whiteboard', 'wifi'] },
  { id: 4, name: 'ห้องประชุมใหญ่', capacity: 100, available: true, type: 'conference', floor: 3, equipment: ['projector', 'microphone', 'air_conditioning', 'wifi'] }
])

// User roles and permissions
const userRoles = ref([
  { 
    id: 1, 
    name: 'พนักงานทั่วไป', 
    level: 1, 
    permissions: ['view_activities'] 
  },
  { 
    id: 2, 
    name: 'หัวหน้างานระดับ 1', 
    level: 2, 
    permissions: ['view_activities', 'join_activities'] 
  },
  { 
    id: 3, 
    name: 'หัวหน้างานระดับ 2', 
    level: 3, 
    permissions: ['view_activities', 'join_activities', 'create_activities', 'manage_rooms'] 
  }
])

// Form states
const newRoom = ref({
  name: '',
  capacity: '',
  available: true,
  type: 'training',
  floor: '',
  equipment: []
})

const showRoomForm = ref(false)
const editingRoom = ref(null)

// Computed properties
const availableRooms = computed(() => {
  return rooms.value.filter(room => room.available)
})

const unavailableRooms = computed(() => {
  return rooms.value.filter(room => !room.available)
})

const totalCapacity = computed(() => {
  return rooms.value.reduce((total, room) => total + room.capacity, 0)
})

// Methods
const hasPermission = (permission) => {
  const userRole = userRoles.value.find(role => role.level === props.currentUser.role)
  return userRole?.permissions.includes(permission) || false
}

const getRoomTypeName = (type) => {
  const typeNames = {
    'training': 'ห้องอบรม',
    'meeting': 'ห้องประชุม',
    'conference': 'ห้องประชุมใหญ่',
    'workshop': 'ห้องปฏิบัติการ'
  }
  return typeNames[type] || type
}

const getEquipmentName = (equipment) => {
  const equipmentNames = {
    'projector': 'โปรเจคเตอร์',
    'microphone': 'ไมโครโฟน',
    'whiteboard': 'กระดานไวท์บอร์ด',
    'computer': 'คอมพิวเตอร์',
    'air_conditioning': 'เครื่องปรับอากาศ',
    'wifi': 'Wi-Fi'
  }
  return equipmentNames[equipment] || equipment
}

const getRoomUsage = (roomId) => {
  return props.activities.filter(activity => activity.roomId === roomId).length
}

const addRoom = () => {
  if (newRoom.value.name && newRoom.value.capacity) {
    const room = {
      id: rooms.value.length + 1,
      name: newRoom.value.name,
      capacity: parseInt(newRoom.value.capacity),
      available: newRoom.value.available,
      type: newRoom.value.type,
      floor: newRoom.value.floor ? parseInt(newRoom.value.floor) : null,
      equipment: [...newRoom.value.equipment]
    }
    
    rooms.value.push(room)
    emit('room-added', room)
    
    // Reset form
    newRoom.value = {
      name: '',
      capacity: '',
      available: true,
      type: 'training',
      floor: '',
      equipment: []
    }
    
    showRoomForm.value = false
    alert('เพิ่มห้องเรียบร้อยแล้ว')
  } else {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
  }
}

const editRoom = (room) => {
  editingRoom.value = { ...room }
}

const saveRoom = () => {
  const roomIndex = rooms.value.findIndex(room => room.id === editingRoom.value.id)
  if (roomIndex > -1) {
    rooms.value[roomIndex] = { ...editingRoom.value }
    emit('room-updated', rooms.value[roomIndex])
    editingRoom.value = null
    alert('แก้ไขข้อมูลห้องเรียบร้อยแล้ว')
  }
}

const deleteRoom = (roomId) => {
  // Check if any activities are using this room
  const activitiesUsingRoom = props.activities.filter(activity => activity.roomId === roomId)
  
  if (activitiesUsingRoom.length > 0) {
    const activityNames = activitiesUsingRoom.map(activity => activity.name).join(', ')
    if (!confirm(`ห้องนี้มีกิจกรรมที่กำลังใช้งาน: ${activityNames}\nคุณต้องการลบห้องและย้ายกิจกรรมไปห้องอื่นหรือไม่?`)) {
      return
    }
  }
  
  if (confirm('คุณต้องการลบห้องนี้หรือไม่?')) {
    const roomIndex = rooms.value.findIndex(room => room.id === roomId)
    if (roomIndex > -1) {
      const deletedRoom = rooms.value.splice(roomIndex, 1)[0]
      emit('room-deleted', deletedRoom)
      alert('ลบห้องเรียบร้อยแล้ว')
    }
  }
}

const toggleRoomAvailability = (roomId) => {
  const room = rooms.value.find(room => room.id === roomId)
  if (room) {
    // Check if making room unavailable affects any activities
    if (room.available) {
      const activitiesInRoom = props.activities.filter(activity => activity.roomId === roomId)
      if (activitiesInRoom.length > 0) {
        const activityNames = activitiesInRoom.map(activity => activity.name).join(', ')
        if (!confirm(`ห้องนี้มีกิจกรรมกำลังใช้งาน: ${activityNames}\nคุณต้องการทำให้ห้องไม่พร้อมใช้งานหรือไม่?`)) {
          return
        }
      }
    }
    
    room.available = !room.available
    emit('room-availability-changed', room)
    alert(`เปลี่ยนสถานะห้อง ${room.name} เป็น ${room.available ? 'พร้อมใช้งาน' : 'ไม่พร้อมใช้งาน'} แล้ว`)
  }
}

// Expose rooms data to parent
defineExpose({
  rooms
})
</script>