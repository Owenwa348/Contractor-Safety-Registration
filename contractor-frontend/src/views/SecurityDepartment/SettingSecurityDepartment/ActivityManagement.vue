<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium text-gray-900">กิจกรรมอบรม</h2>
      <button 
        v-if="hasPermission('create_activities')"
        @click="showActivityForm = !showActivityForm"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        เพิ่มกิจกรรม
      </button>
    </div>

    <!-- Add Activity Form -->
    <div v-if="showActivityForm && hasPermission('create_activities')" class="bg-gray-50 p-6 rounded-lg">
      <h3 class="font-medium text-gray-900 mb-4">เพิ่มกิจกรรมอบรมใหม่</h3>
      <div v-if="availableRooms.length === 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
        <p class="text-yellow-800 text-sm">⚠️ ไม่มีห้องที่พร้อมใช้งาน กรุณาเพิ่มห้องในแท็บจัดการห้องก่อน</p>
        <p class="text-xs text-yellow-600 mt-1">ห้องทั้งหมด: {{ props.rooms.length }} (พร้อมใช้งาน: {{ availableRooms.length }})</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">ชื่อกิจกรรม</label>
          <input 
            type="text" 
            v-model="newActivity.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ระบุชื่อกิจกรรม"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">ห้องที่ใช้</label>
          <select 
            v-model="newActivity.roomId"
            @change="onRoomChange"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">เลือกห้อง</option>
            <option 
              v-for="room in availableRooms" 
              :key="room.id" 
              :value="room.id"
            >
              {{ room.name }} (จุได้ {{ room.capacity }} คน) - {{ getRoomTypeName(room.type) }}
            </option>
          </select>
          <div v-if="newActivity.roomId" class="mt-2 text-xs text-gray-600">
            <div class="bg-blue-50 p-2 rounded">
              <p><strong>ข้อมูลห้อง:</strong></p>
              <p>ความจุ: {{ getSelectedRoomInfo()?.capacity }} คน</p>
              <p class="text-green-600 font-medium">จำนวนผู้เข้าร่วมสูงสุด: {{ getSelectedRoomInfo()?.capacity }} คน (อัตโนมัติ)</p>
              <p v-if="getSelectedRoomInfo()?.floor">ชั้น: {{ getSelectedRoomInfo()?.floor }}</p>
              <p v-if="getSelectedRoomInfo()?.equipment?.length > 0">
                อุปกรณ์: {{ getSelectedRoomEquipment() }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">วันที่</label>
          <input 
            type="date" 
            v-model="newActivity.date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">เวลาเริ่ม</label>
          <input 
            type="time" 
            v-model="newActivity.startTime"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">เวลาสิ้นสุด</label>
          <input 
            type="time" 
            v-model="newActivity.endTime"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">รายละเอียด</label>
        <textarea 
          v-model="newActivity.description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
          placeholder="ระบุรายละเอียดกิจกรรม"
        ></textarea>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button 
          @click="showActivityForm = false"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ยกเลิก
        </button>
        <button 
          @click="addActivity"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          บันทึก
        </button>
      </div>
    </div>

    <!-- Activities List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="activity in activities" 
        :key="activity.id"
        class="border rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-3">
          <h3 class="font-medium text-gray-900">{{ activity.name }}</h3>
          <button 
            v-if="hasPermission('create_activities')"
            @click="deleteActivity(activity.id)"
            class="text-red-500 hover:text-red-700"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-2 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>ผู้เข้าร่วม:</span>
            <span class="font-medium">{{ activity.currentParticipants }}/{{ activity.maxParticipants }} คน</span>
          </div>
          <div class="flex justify-between">
            <span>ห้อง:</span>
            <span :class="getRoomAvailabilityClass(activity.roomId)">
              {{ getRoomName(activity.roomId) }}
              <span v-if="!isRoomAvailable(activity.roomId)" class="text-xs">(ไม่พร้อมใช้งาน)</span>
            </span>
          </div>
          <div v-if="getRoomInfo(activity.roomId)" class="flex justify-between text-xs text-gray-500">
            <span>ความจุห้อง:</span>
            <span>{{ getRoomInfo(activity.roomId)?.capacity }} คน</span>
          </div>
          <div v-if="activity.date" class="flex justify-between">
            <span>วันที่:</span>
            <span>{{ formatDate(activity.date) }}</span>
          </div>
          <div v-if="activity.startTime && activity.endTime" class="flex justify-between">
            <span>เวลา:</span>
            <span>{{ activity.startTime }} - {{ activity.endTime }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full" 
              :style="`width: ${(activity.currentParticipants / activity.maxParticipants) * 100}%`"
            ></div>
          </div>
          <div v-if="activity.description" class="pt-2">
            <p class="text-xs text-gray-500">{{ activity.description }}</p>
          </div>
        </div>

        <div class="mt-4">
          <button 
            v-if="hasPermission('join_activities') && activity.currentParticipants < activity.maxParticipants && isRoomAvailable(activity.roomId)"
            @click="joinActivity(activity.id)"
            class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
          >
            เข้าร่วมกิจกรรม
          </button>
          <button 
            v-else-if="!isRoomAvailable(activity.roomId)"
            disabled
            class="w-full bg-red-400 text-white py-2 px-4 rounded-md text-sm cursor-not-allowed"
          >
            ห้องไม่พร้อมใช้งาน
          </button>
          <button 
            v-else-if="activity.currentParticipants >= activity.maxParticipants"
            disabled
            class="w-full bg-gray-400 text-white py-2 px-4 rounded-md text-sm cursor-not-allowed"
          >
            เต็มแล้ว
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
  rooms: {
    type: Array,
    required: true
  }
})

// Emits
const emit = defineEmits(['activity-added', 'activity-deleted', 'activity-joined'])

// Training activities
const activities = ref([
  { 
    id: 1, 
    name: 'อบรมพื้นฐานความปลอดภัย', 
    maxParticipants: 30, 
    currentParticipants: 15, 
    roomId: 4, 
    createdBy: 3,
    date: '2024-09-15',
    startTime: '09:00',
    endTime: '12:00',
    description: 'อบรมพื้นฐานเกี่ยวกับความปลอดภัยในการทำงาน'
  },
  { 
    id: 2, 
    name: 'อบรมการใช้เครื่องมือ', 
    maxParticipants: 20, 
    currentParticipants: 18, 
    roomId: 3, 
    createdBy: 3,
    date: '2024-09-16',
    startTime: '13:00',
    endTime: '16:00',
    description: 'อบรมการใช้เครื่องมือต่างๆ อย่างปลอดภัย'
  },
  { 
    id: 3, 
    name: 'อบรมการใช้เครื่องจักร', 
    maxParticipants: 20, 
    currentParticipants: 18, 
    roomId: 2, 
    createdBy: 3,
    date: '2024-09-17',
    startTime: '09:00',
    endTime: '15:00',
    description: 'อบรมการใช้เครื่องจักรอุตสาหกรรม'
  },
  { 
    id: 4, 
    name: 'อบรมการใช้เครื่องจักร', 
    maxParticipants: 20, 
    currentParticipants: 18, 
    roomId: 1, 
    createdBy: 3,
    date: '2024-09-18',
    startTime: '10:00',
    endTime: '14:00',
    description: 'อบรมเพิ่มเติมการใช้เครื่องจักร'
  },
  { 
    id: 5, 
    name: 'อบรมการประกอบอุปกรณ์', 
    maxParticipants: 20, 
    currentParticipants: 18, 
    roomId: 3, 
    createdBy: 3,
    date: '2024-09-19',
    startTime: '08:00',
    endTime: '12:00',
    description: 'อบรมการประกอบอุปกรณ์ต่างๆ'
  }
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
const newActivity = ref({
  name: '',
  roomId: '',
  date: '',
  startTime: '',
  endTime: '',
  description: ''
})

const showActivityForm = ref(false)

// Computed properties
const availableRooms = computed(() => {
  return props.rooms.filter(room => room.available)
})

// Methods
const hasPermission = (permission) => {
  const userRole = userRoles.value.find(role => role.level === props.currentUser.role)
  return userRole?.permissions.includes(permission) || false
}

const getRoomName = (roomId) => {
  const room = props.rooms.find(room => room.id === roomId)
  return room?.name || 'ไม่ระบุห้อง'
}

const getRoomInfo = (roomId) => {
  return props.rooms.find(room => room.id === roomId)
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

const isRoomAvailable = (roomId) => {
  const room = props.rooms.find(room => room.id === roomId)
  return room?.available || false
}

const getRoomAvailabilityClass = (roomId) => {
  return isRoomAvailable(roomId) ? 'text-green-600' : 'text-red-600 font-medium'
}

const getSelectedRoomInfo = () => {
  if (!newActivity.value.roomId) return null
  return props.rooms.find(room => room.id === parseInt(newActivity.value.roomId))
}

const getSelectedRoomEquipment = () => {
  const room = getSelectedRoomInfo()
  if (!room?.equipment?.length) return 'ไม่มีอุปกรณ์'
  return room.equipment.map(eq => getEquipmentName(eq)).join(', ')
}

const getMaxCapacityForSelectedRoom = () => {
  const room = getSelectedRoomInfo()
  return room?.capacity || 999
}

const onRoomChange = () => {
  // Room capacity will be automatically used as max participants
  // No manual adjustment needed
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const addActivity = () => {
  if (newActivity.value.name && newActivity.value.roomId) {
    const selectedRoom = props.rooms.find(room => room.id === parseInt(newActivity.value.roomId))
    
    // Validate room exists and is available
    if (!selectedRoom) {
      alert('ห้องที่เลือกไม่มีอยู่')
      return
    }
    
    if (!selectedRoom.available) {
      alert('ห้องที่เลือกไม่พร้อมใช้งาน')
      return
    }
    
    // Use room capacity as max participants
    const maxParticipants = selectedRoom.capacity
    
    const activity = {
      id: activities.value.length + 1,
      name: newActivity.value.name,
      maxParticipants: maxParticipants,
      currentParticipants: 0,
      roomId: parseInt(newActivity.value.roomId),
      createdBy: props.currentUser.id,
      date: newActivity.value.date,
      startTime: newActivity.value.startTime,
      endTime: newActivity.value.endTime,
      description: newActivity.value.description
    }
    
    activities.value.push(activity)
    
    // Emit event to parent
    emit('activity-added', activity)
    
    // Reset form
    newActivity.value = {
      name: '',
      roomId: '',
      date: '',
      startTime: '',
      endTime: '',
      description: ''
    }
    
    showActivityForm.value = false
    alert('เพิ่มกิจกรรมเรียบร้อยแล้ว')
  } else {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
  }
}

const deleteActivity = (activityId) => {
  if (confirm('คุณต้องการลบกิจกรรมนี้หรือไม่?')) {
    const activityIndex = activities.value.findIndex(activity => activity.id === activityId)
    if (activityIndex > -1) {
      const deletedActivity = activities.value.splice(activityIndex, 1)[0]
      emit('activity-deleted', deletedActivity)
      alert('ลบกิจกรรมเรียบร้อยแล้ว')
    }
  }
}

const joinActivity = (activityId) => {
  const activity = activities.value.find(activity => activity.id === activityId)
  if (!activity) return
  
  // Check if room still exists and is available
  const room = props.rooms.find(room => room.id === activity.roomId)
  if (!room) {
    alert('ไม่สามารถเข้าร่วมได้ เนื่องจากห้องไม่มีอยู่')
    return
  }
  
  if (!room.available) {
    alert('ไม่สามารถเข้าร่วมได้ เนื่องจากห้องไม่พร้อมใช้งาน')
    return
  }
  
  if (activity.currentParticipants < activity.maxParticipants) {
    activity.currentParticipants++
    emit('activity-joined', activity)
    alert(`คุณได้เข้าร่วมกิจกรรม "${activity.name}" เรียบร้อยแล้ว`)
  } else {
    alert('กิจกรรมเต็มแล้ว')
  }
}

// Handle room changes from parent component
const handleRoomDeleted = (deletedRoom) => {
  // Find activities using the deleted room
  const affectedActivities = activities.value.filter(activity => activity.roomId === deletedRoom.id)
  
  if (affectedActivities.length > 0) {
    // Move activities to an available room or mark as needing reassignment
    const availableRoom = availableRooms.value[0]
    
    affectedActivities.forEach(activity => {
      if (availableRoom) {
        activity.roomId = availableRoom.id
        // Adjust max participants if new room is smaller
        if (activity.maxParticipants > availableRoom.capacity) {
          activity.maxParticipants = availableRoom.capacity
          if (activity.currentParticipants > availableRoom.capacity) {
            activity.currentParticipants = availableRoom.capacity
          }
        }
      } else {
        // No available rooms, keep the activity but mark room as unavailable
        // The UI will show the room as unavailable
      }
    })
  }
}

const handleRoomAvailabilityChanged = (changedRoom) => {
  // Activities using unavailable rooms will be shown with warning in UI
  // No automatic changes needed, just let the UI reflect the room status
}

// Expose methods and data to parent
defineExpose({
  activities,
  handleRoomDeleted,
  handleRoomAvailabilityChanged
})
</script>