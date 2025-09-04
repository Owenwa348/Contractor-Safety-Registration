<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">กิจกรรมอบรม</h2>
      <button 
        v-if="hasPermission('create_activities')"
        @click="showActivityForm = !showActivityForm"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        เพิ่มกิจกรรม
      </button>
    </div>

    <!-- Add Activity Form -->
    <div v-if="showActivityForm && hasPermission('create_activities')" class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 shadow-lg">
      <h3 class="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        เพิ่มกิจกรรมอบรมใหม่
      </h3>
      
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">ชื่อกิจกรรม</label>
          <input 
            type="text" 
            v-model="newActivity.name"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="ระบุชื่อกิจกรรม"
          >
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">รายละเอียด</label>
          <textarea 
            v-model="newActivity.description"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            rows="4"
            placeholder="ระบุรายละเอียดกิจกรรม"
          ></textarea>
        </div>
      </div>
      
      <div class="flex justify-end gap-3 mt-8">
        <button 
          @click="showActivityForm = false"
          class="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
        >
          ยกเลิก
        </button>
        <button 
          @click="addActivity"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          บันทึก
        </button>
      </div>
    </div>

    <!-- Edit Activity Modal -->
    <div v-if="showEditForm && editingActivity" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div class="bg-blue-600 p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-white">
              แก้ไขกิจกรรมอบรม
            </h3>
            <button 
              @click="cancelEdit"
              class="text-white hover:text-gray-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อกิจกรรม</label>
            <input 
              type="text" 
              v-model="editingActivity.name"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="ระบุชื่อกิจกรรม"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
            <textarea 
              v-model="editingActivity.description"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              rows="4"
              placeholder="ระบุรายละเอียดกิจกรรม"
            ></textarea>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 p-4 border-t">
          <button 
            @click="cancelEdit"
            class="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          >
            ยกเลิก
          </button>
          <button 
            @click="updateActivity"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>

    <!-- Activities List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="activity in activities" 
        :key="activity.id"
        class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {{ activity.name }}
          </h3>
          <div v-if="hasPermission('create_activities')" class="flex gap-2">
            <button 
              @click="editActivity(activity)"
              class="text-blue-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
              title="แก้ไขกิจกรรม"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button 
              @click="deleteActivity(activity.id)"
              class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
              title="ลบกิจกรรม"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div v-if="activity.description" class="mt-4">
          <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              รายละเอียด
            </h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ activity.description }}</p>
          </div>
        </div>
        <div v-else class="mt-4">
          <div class="bg-gray-100 p-4 rounded-lg text-center">
            <p class="text-sm text-gray-500 italic">ไม่มีรายละเอียด</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="activities.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">ยังไม่มีกิจกรรมอบรม</h3>
      <p class="text-gray-500 mb-4">เริ่มต้นสร้างกิจกรรมอบรมแรกของคุณ</p>
      <button 
        v-if="hasPermission('create_activities')"
        @click="showActivityForm = true"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
      >
        เพิ่มกิจกรรมแรก
      </button>
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
const emit = defineEmits(['activity-added', 'activity-deleted', 'activity-updated'])

// Training activities (simplified data)
const activities = ref([
  { 
    id: 1, 
    name: 'อบรมพื้นฐานความปลอดภัย', 
    description: 'อบรมพื้นฐานเกี่ยวกับความปลอดภัยในการทำงาน สำหรับพนักงานใหม่และพนักงานทั่วไป'
  },
  { 
    id: 2, 
    name: 'อบรมการใช้เครื่องมือ', 
    description: 'อบรมการใช้เครื่องมือต่างๆ อย่างปลอดภัย รวมถึงการบำรุงรักษาเบื้องต้น'
  },
  { 
    id: 3, 
    name: 'อบรมการใช้เครื่องจักร', 
    description: 'อบรมการใช้เครื่องจักรอุตสาหกรรม และมาตรฐานความปลอดภัยในการปฏิบัติงาน'
  },
  { 
    id: 4, 
    name: 'อบรมการประกอบอุปกรณ์', 
    description: 'อบรมการประกอบอุปกรณ์ต่างๆ ตามมาตรฐานคุณภาพและความปลอดภัย'
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

// Form states (simplified)
const newActivity = ref({
  name: '',
  description: ''
})

const showActivityForm = ref(false)
const showEditForm = ref(false)
const editingActivity = ref(null)

// Methods
const hasPermission = (permission) => {
  const userRole = userRoles.value.find(role => role.level === props.currentUser.role)
  return userRole?.permissions.includes(permission) || false
}

const addActivity = () => {
  if (newActivity.value.name.trim()) {
    const activity = {
      id: activities.value.length + 1,
      name: newActivity.value.name.trim(),
      description: newActivity.value.description.trim() || ''
    }
    
    activities.value.push(activity)
    
    // Emit event to parent
    emit('activity-added', activity)
    
    // Reset form
    newActivity.value = {
      name: '',
      description: ''
    }
    
    showActivityForm.value = false
    alert('เพิ่มกิจกรรมเรียบร้อยแล้ว')
  } else {
    alert('กรุณากรอกชื่อกิจกรรม')
  }
}

const deleteActivity = (activityId) => {
  // Find the activity to get its name for confirmation
  const activity = activities.value.find(activity => activity.id === activityId)
  const activityName = activity ? activity.name : 'กิจกรรมนี้'
  
  if (confirm(`คุณต้องการลบกิจกรรม "${activityName}" หรือไม่?\n\nการลบนี้ไม่สามารถยกเลิกได้`)) {
    const activityIndex = activities.value.findIndex(activity => activity.id === activityId)
    if (activityIndex > -1) {
      const deletedActivity = activities.value.splice(activityIndex, 1)[0]
      emit('activity-deleted', deletedActivity)
      alert('ลบกิจกรรมเรียบร้อยแล้ว')
    }
  }
}

const editActivity = (activity) => {
  editingActivity.value = { ...activity }
  showEditForm.value = true
}

const updateActivity = () => {
  if (!editingActivity.value.name.trim()) {
    alert('กรุณากรอกชื่อกิจกรรม')
    return
  }

  const activityIndex = activities.value.findIndex(activity => activity.id === editingActivity.value.id)
  if (activityIndex > -1) {
    // Update the activity
    activities.value[activityIndex] = {
      ...editingActivity.value,
      name: editingActivity.value.name.trim(),
      description: editingActivity.value.description.trim() || ''
    }
    
    // Emit event to parent
    emit('activity-updated', activities.value[activityIndex])
    
    // Close edit form
    showEditForm.value = false
    editingActivity.value = null
    
    alert('บันทึกการแก้ไขเรียบร้อยแล้ว')
  }
}

const cancelEdit = () => {
  showEditForm.value = false
  editingActivity.value = null
}

// Expose methods and data to parent
defineExpose({
  activities
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>