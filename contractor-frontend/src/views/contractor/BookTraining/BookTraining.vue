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

    <!-- ส่วนเมื่อมีการเลือกอบรม -->
    <div v-if="selectedEvent">
      <!-- ข้อมูลอบรมที่เลือก -->
      <TrainingInfo
        :selected-event="selectedEvent"
        :round="round"
        :exam-date-display="examDateDisplay"
        :event-type="eventType"
        :format-date="formatDate"
      />

      <!-- ส่วนจัดการรายชื่อ -->
      <SearchAndControls
        :search="search"
        :selected-count="selectedCount"
        :selected-event="selectedEvent"
        @update:search="search = $event"
        @book-selected="handleBookSelected"
        @select-all-people="selectAllPeople"
        @select-only-approved="selectOnlyApproved"
        @select-only-not-passed="selectOnlyNotPassed"
        @clear-selection="clearSelection"
      />

      <!-- สถิติแยกตามสถานะ -->
      <StatusStatistics
        :approved-count="approvedPeople.length"
        :not-passed-count="notPassedPeople.length"
      />

      <!-- ตารางคนที่อนุมัติแล้ว -->
      <PersonTable
        :people="approvedPeople"
        title="รายชื่อผู้ได้รับอนุมัติ"
        :all-selected="allApprovedSelected"
        variant="approved"
        empty-message="ไม่มีรายชื่อผู้ได้รับอนุมัติ"
        @select-all="selectAllApproved"
        @toggle-selection="togglePersonSelection"
        @remove-person="removePerson"
      />

      <!-- ตารางคนที่ไม่ผ่าน -->
      <PersonTable
        :people="notPassedPeople"
        title="รายชื่อผู้ไม่ผ่านการอนุมัติ"
        :all-selected="allNotPassedSelected"
        variant="not_passed"
        empty-message="ไม่มีรายชื่อผู้ไม่ผ่านการอนุมัติ"
        :show-failed-training="true"
        @select-all="selectAllNotPassed"
        @toggle-selection="togglePersonSelection"
        @remove-person="removePerson"
      />
    </div>

    <!-- ข้อความเมื่อไม่มีอบรม -->
    <NoTrainingSelected
      v-if="!selectedEvent"
      @go-to-calendar="() => $router.push('/training-booking')"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import TrainingInfo from './components/TrainingInfo.vue'
import SearchAndControls from './components/SearchAndControls.vue'
import StatusStatistics from './components/StatusStatistics.vue'
import PersonTable from './components/PersonTable.vue'
import NoTrainingSelected from './components/NoTrainingSelected.vue'
import { useTrainingBooking } from './composables/useTrainingBooking'
import { usePersonManagement } from './composables/usePersonManagement'

const router = useRouter()

// Use composables
const {
  selectedEvent,
  round,
  examDateDisplay,
  eventType,
  formatDate,
  bookSelected: performBooking
} = useTrainingBooking()

const {
  search,
  approvedPeople,
  notPassedPeople,
  selectedPeople,
  selectedCount,
  allApprovedSelected,
  allNotPassedSelected,
  togglePersonSelection,
  selectAllApproved,
  selectAllNotPassed,
  selectAllPeople,
  selectOnlyApproved,
  selectOnlyNotPassed,
  clearSelection,
  removePerson
} = usePersonManagement()

// Handle booking with selected people
const handleBookSelected = async () => {
  await performBooking(selectedPeople.value)
}
</script>