<template>
  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
      <svg class="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
      </svg>
      รายชื่อผู้ทำแบบทดสอบแล้ว
      <span class="ml-2 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
        {{ completedParticipants.length }} คน
      </span>
    </h2>

    <!-- Statistics Cards -->
    <ParticipantStats 
      :passed-count="passedCount"
      :failed-count="failedCount"
    />

    <!-- Search -->
    <div class="mb-4">
      <input 
        :value="searchTerm" 
        @input="$emit('update:searchTerm', $event.target.value)"
        type="text" 
        placeholder="ค้นหาชื่อหรือตำแหน่ง..." 
        class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
    </div>

    <!-- Participants List -->
    <div class="max-h-96 overflow-y-auto">
      <div class="space-y-3">
        <ParticipantRow
          v-for="(participant, index) in filteredParticipants" 
          :key="participant.id"
          :participant="participant"
          :index="index"
        />
      </div>
      
      <div v-if="filteredParticipants.length === 0" class="text-center py-8 text-gray-500">
        <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
        <p>ไม่พบผู้ทำแบบทดสอบที่ค้นหา</p>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mt-6 pt-4 border-t">
      <div class="flex justify-between text-sm text-gray-600 mb-2">
        <span>สถิติผลการสอบ</span>
        <span>{{ completedParticipants.length }} คน</span>
      </div>
      <div class="grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div>ผ่าน: {{ passedCount }} คน</div>
        <div>ไม่ผ่าน: {{ failedCount }} คน</div>
      </div>
    </div>

    <!-- Confirm Exam Button -->
    <div class="mt-6 text-center" v-if="completedParticipants.length > 0">
      <button 
        @click="confirmExam" 
        class="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md font-bold transition-colors"
      >
        ยืนยันผลการสอบ ({{ completedParticipants.length }} คน)
      </button>
    </div>
  </div>
</template>

<script>
import ParticipantStats from './ParticipantStats.vue'
import ParticipantRow from './ParticipantRow.vue'

export default {
  name: 'ParticipantsList',
  components: {
    ParticipantStats,
    ParticipantRow
  },
  props: {
    completedParticipants: {
      type: Array,
      required: true
    },
    filteredParticipants: {
      type: Array,
      required: true
    },
    searchTerm: {
      type: String,
      required: true
    },
    passedCount: {
      type: Number,
      required: true
    },
    failedCount: {
      type: Number,
      required: true
    }
  },
  emits: ['update:searchTerm', 'confirm-exam'],
  setup(props, { emit }) {
    const confirmExam = () => {
      const message = `คุณต้องการยืนยันผลการสอบครั้งนี้หรือไม่?\n\nสรุปผลการสอบ:\n- ผู้ทำแบบทดสอบทั้งหมด: ${props.completedParticipants.length} คน\n- ผ่าน: ${props.passedCount} คน\n- ไม่ผ่าน: ${props.failedCount} คน`
      
      if (confirm(message)) {
        const successMessage = ` ยืนยันผลการสอบสำเร็จ!\n\n สรุปผลการสอบ:\n- ผู้ทำแบบทดสอบ: ${props.completedParticipants.length} คน\n- ผ่าน: ${props.passedCount} คน (${Math.round((props.passedCount/props.completedParticipants.length)*100)}%)\n- ไม่ผ่าน: ${props.failedCount} คน (${Math.round((props.failedCount/props.completedParticipants.length)*100)}%)\n\n📋 ระบบจะดำเนินการ:\n✓ บันทึกผลการสอบในระบบ\n✓ ส่งรายงานให้ผู้เกี่ยวข้อง\n✓ ออกใบประกาศนียบัตรให้ผู้ที่ผ่านการสอบ\n✓ แจ้งผลการสอบให้ผู้เข้าร่วมทราบ`
        alert(successMessage)
        emit('confirm-exam')
      }
    }

    return {
      confirmExam
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for participants list */
.max-h-96 {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.max-h-96::-webkit-scrollbar {
  width: 6px;
}

.max-h-96::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>