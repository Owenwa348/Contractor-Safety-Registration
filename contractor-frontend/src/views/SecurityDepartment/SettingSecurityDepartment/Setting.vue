<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900">การตั้งค่าระบบขั้นสูง</h1>
          <p class="text-sm text-gray-600 mt-1">จัดการสิทธิ์ กิจกรรมอบรม และห้องประชุม</p>
        </div>

        <!-- Navigation Tabs -->
        <div class="px-6">
          <nav class="flex space-x-8 pt-4">
            <button 
              @click="activeTab = 'permissions'"
              :class="activeTab === 'permissions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
              class="py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
            >
              จัดการสิทธิ์
            </button>
            <button 
              @click="activeTab = 'activities'"
              :class="activeTab === 'activities' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
              class="py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
            >
              กิจกรรมอบรม
            </button>
            <button 
              @click="activeTab = 'rooms'"
              :class="activeTab === 'rooms' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
              class="py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
            >
              ห้องประชุม
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Permissions Tab -->
          <UserManagement 
            v-if="activeTab === 'permissions'"
            :current-user="currentUser"
          />

          <!-- Activities Tab -->
          <ActivityManagement 
            v-if="activeTab === 'activities'"
            :current-user="currentUser"
            :rooms="rooms"
            @activity-added="handleActivityAdded"
            @activity-deleted="handleActivityDeleted"
            @activity-joined="handleActivityJoined"
            ref="activityManagement"
          />

          <!-- Rooms Tab -->
          <RoomManagement 
            v-if="activeTab === 'rooms'"
            :current-user="currentUser"
            :activities="activities"
            @room-added="handleRoomAdded"
            @room-updated="handleRoomUpdated"
            @room-deleted="handleRoomDeleted"
            @room-availability-changed="handleRoomAvailabilityChanged"
            ref="roomManagement"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserManagement from './UserManagement.vue'
import ActivityManagement from './ActivityManagement.vue'
import RoomManagement from './RoomManagement.vue'

const activeTab = ref('permissions')

// Current user (simulated as level 3 - หัวหน้างานระดับ 2)
const currentUser = ref({ 
  id: 1, 
  name: 'สมชาย ใจดี', 
  role: 3 
})

// Global data - Initialize with room data directly
const rooms = ref([
  { id: 1, name: 'ห้อง A', capacity: 30, available: true, type: 'training', floor: 1, equipment: ['projector', 'whiteboard', 'air_conditioning'] },
  { id: 2, name: 'ห้อง B', capacity: 50, available: false, type: 'meeting', floor: 2, equipment: ['projector', 'microphone', 'computer'] },
  { id: 3, name: 'ห้อง C', capacity: 20, available: true, type: 'workshop', floor: 1, equipment: ['whiteboard', 'wifi'] },
  { id: 4, name: 'ห้องประชุมใหญ่', capacity: 100, available: true, type: 'conference', floor: 3, equipment: ['projector', 'microphone', 'air_conditioning', 'wifi'] }
])
const activities = ref([])
const roomManagement = ref(null)
const activityManagement = ref(null)

// Get rooms data from RoomManagement component
onMounted(() => {
  // Initialize rooms data
  setTimeout(() => {
    if (roomManagement.value?.rooms) {
      rooms.value = roomManagement.value.rooms
    }
    if (activityManagement.value?.activities) {
      activities.value = activityManagement.value.activities
    }
  }, 100)
})

// Event handlers for activities
const handleActivityAdded = (activity) => {
  activities.value.push(activity)
  console.log('Activity added:', activity)
  
  // You can add logic here to sync with calendar or API
  // Example: syncActivityToCalendar(activity)
}

const handleActivityDeleted = (activity) => {
  const index = activities.value.findIndex(a => a.id === activity.id)
  if (index > -1) {
    activities.value.splice(index, 1)
  }
  console.log('Activity deleted:', activity)
  
  // You can add logic here to remove from calendar or API
  // Example: removeActivityFromCalendar(activity)
}

const handleActivityJoined = (activity) => {
  console.log('User joined activity:', activity)
  
  // You can add logic here to update calendar or send notifications
  // Example: updateCalendarParticipants(activity)
}

// Event handlers for rooms
const handleRoomAdded = (room) => {
  rooms.value.push(room)
  console.log('Room added:', room)
  
  // You can add logic here to sync with API
  // Example: syncRoomToAPI(room)
}

const handleRoomUpdated = (room) => {
  const index = rooms.value.findIndex(r => r.id === room.id)
  if (index > -1) {
    rooms.value[index] = room
  }
  console.log('Room updated:', room)
  
  // You can add logic here to sync with API
  // Example: updateRoomInAPI(room)
}

const handleRoomDeleted = (room) => {
  const index = rooms.value.findIndex(r => r.id === room.id)
  if (index > -1) {
    rooms.value.splice(index, 1)
  }
  
  // Notify ActivityManagement component about room deletion
  if (activityManagement.value?.handleRoomDeleted) {
    activityManagement.value.handleRoomDeleted(room)
  }
  
  // Update activities that were using this room
  activities.value.forEach(activity => {
    if (activity.roomId === room.id) {
      // Find an available room with sufficient capacity
      const availableRoom = rooms.value.find(r => 
        r.available && r.capacity >= activity.currentParticipants
      )
      
      if (availableRoom) {
        activity.roomId = availableRoom.id
        console.log(`Activity "${activity.name}" moved to room ${availableRoom.name}`)
      } else {
        // No suitable room found
        activity.roomId = null
        console.log(`Activity "${activity.name}" needs room reassignment`)
      }
    }
  })
  
  console.log('Room deleted:', room)
}

const handleRoomAvailabilityChanged = (room) => {
  console.log('Room availability changed:', room)
  
  // Notify ActivityManagement component about room availability change
  if (activityManagement.value?.handleRoomAvailabilityChanged) {
    activityManagement.value.handleRoomAvailabilityChanged(room)
  }
  
  // You can add logic here to handle activities in unavailable rooms
  if (!room.available) {
    const activitiesInRoom = activities.value.filter(activity => activity.roomId === room.id)
    activitiesInRoom.forEach(activity => {
      console.log(`Activity "${activity.name}" may need attention due to room unavailability`)
    })
  }
}

// Optional: Methods to sync with calendar system
const syncActivityToCalendar = (activity) => {
  // Implementation for calendar integration
  console.log('Syncing activity to calendar:', activity)
  
  // Example API call:
  // await calendarAPI.addEvent({
  //   title: activity.name,
  //   date: activity.date,
  //   startTime: activity.startTime,
  //   endTime: activity.endTime,
  //   location: getRoomName(activity.roomId),
  //   maxParticipants: activity.maxParticipants
  // })
}

const removeActivityFromCalendar = (activity) => {
  // Implementation for removing from calendar
  console.log('Removing activity from calendar:', activity)
  
  // Example API call:
  // await calendarAPI.deleteEvent(activity.calendarEventId)
}

const updateCalendarParticipants = (activity) => {
  // Implementation for updating participant count
  console.log('Updating calendar participants:', activity)
  
  // Example API call:
  // await calendarAPI.updateEvent(activity.calendarEventId, {
  //   participants: activity.currentParticipants
  // })
}

// Helper method to get room name
const getRoomName = (roomId) => {
  const room = rooms.value.find(room => room.id === roomId)
  return room?.name || 'ไม่ระบุ'
}
</script>