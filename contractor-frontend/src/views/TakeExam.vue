<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-blue-600 mb-2">ทำแบบทดสอบหลังอบรม</h1>
      <p class="text-gray-600">เลือกหลักสูตรอบรมเพื่อดูรายละเอียดและเข้าสู่การสอบ</p>
    </div>

    <!-- Training Selection -->
    <div class="mb-8">
      <label for="trainingSelect" class="block text-sm font-medium text-gray-700 mb-2">
        เลือกหลักสูตรอบรม
      </label>
      <select 
        id="trainingSelect"
        v-model="selectedTraining"
        class="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">-- เลือกหลักสูตรอบรม --</option>
        <option 
          v-for="training in trainings" 
          :key="training.id" 
          :value="training.id"
        >
          {{ training.name }}
        </option>
      </select>
    </div>

    <!-- Training Details or Participants -->
    <div v-if="selectedTrainingData" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Training Information -->
      <div class="bg-white rounded-lg shadow-md p-6 border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">รายละเอียดการอบรม</h2>
        
        <div class="space-y-3">
          <div class="flex items-start">
            <span class="text-sm font-medium text-gray-600 w-24">หลักสูตร:</span>
            <span class="text-sm text-gray-800">{{ selectedTrainingData.name }}</span>
          </div>
          <div class="flex items-start">
            <span class="text-sm font-medium text-gray-600 w-24">วันที่:</span>
            <span class="text-sm text-gray-800">{{ selectedTrainingData.details.date }}</span>
          </div>
          <div class="flex items-start">
            <span class="text-sm font-medium text-gray-600 w-24">เวลา:</span>
            <span class="text-sm text-gray-800">{{ selectedTrainingData.details.time }}</span>
          </div>
          <div class="flex items-start">
            <span class="text-sm font-medium text-gray-600 w-24">วิทยากร:</span>
            <span class="text-sm text-gray-800">{{ selectedTrainingData.details.instructor }}</span>
          </div>
          <div class="mt-4">
            <span class="text-sm font-medium text-gray-600">เกณฑ์การผ่าน:</span>
            <p class="text-sm text-gray-800 mt-1">คะแนน {{ selectedTrainingData.details.passingScore }}% ขึ้นไป</p>
          </div>
        </div>

        <!-- Exam Access Links -->
        <div class="mt-6 pt-4 border-t">
          <h3 class="text-lg font-medium text-gray-800 mb-3">เข้าสู่การสอบ</h3>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600 mb-2">ลิงก์โดยตรง:</label>
            <div class="flex items-center gap-2">
              <input type="text" :value="examUrl" readonly class="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm">
              <button @click="copyToClipboard(examUrl)" class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                คัดลอก
              </button>
            </div>
          </div>
          <button @click="showQRCode = !showQRCode" class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            {{ showQRCode ? 'ซ่อน QR Code' : 'แสดง QR Code' }}
          </button>
          <div v-if="showQRCode" class="mt-4 text-center">
            <div class="inline-block p-4 bg-white border rounded-lg">
              <div ref="qrcode" class="qr-code-container"></div>
              <p class="text-xs text-gray-500 mt-2">สแกนเพื่อเข้าสู่การสอบ</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Participants List (เฉพาะเมื่อมีคนทำแบบประเมินแล้ว) -->
      <div v-if="hasExamResults" class="bg-white rounded-lg shadow-md p-6 border">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          รายชื่อผู้เข้าอบรม ({{ selectedTrainingData.participants.length }} คน)
        </h2>

        <!-- Search -->
        <div class="mb-4">
          <input v-model="searchTerm" type="text" placeholder="ค้นหาชื่อผู้เข้าอบรม..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <!-- Participants List -->
        <div class="max-h-96 overflow-y-auto">
          <div class="space-y-2">
            <div v-for="(participant, index) in filteredParticipants" :key="participant.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-600 w-8">{{ index + 1 }}.</span>
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ participant.name }}</p>
                  <p class="text-xs text-gray-500">{{ participant.position }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="participant.examStatus" :class="getExamStatusClass(participant.examStatus)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ getExamStatusText(participant.examStatus) }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="filteredParticipants.length === 0" class="text-center py-8 text-gray-500">ไม่พบผู้เข้าอบรมที่ค้นหา</div>
        </div>

        <!-- Summary -->
        <div class="mt-4 pt-4 border-t bg-blue-50 rounded-md p-3">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="font-medium text-gray-600">เข้าร่วมอบรม:</span>
              <span class="text-green-600 font-semibold ml-1">{{ attendedCount }} / {{ selectedTrainingData.participants.length }}</span>
            </div>
            <div>
              <span class="font-medium text-gray-600">สอบผ่าน:</span>
              <span class="text-blue-600 font-semibold ml-1">{{ passedCount }} / {{ attendedCount }}</span>
            </div>
          </div>
        </div>

        <!-- Confirm Exam Button -->
        <div class="mt-6 text-center">
          <button @click="confirmExam" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md font-medium">
            ยืนยันการสอบครั้งนี้
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="max-w-md mx-auto">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">เลือกหลักสูตรเพื่อดูข้อมูล</h3>
        <p class="mt-1 text-sm text-gray-500">กรุณาเลือกหลักสูตรอบรมจากรายการด้านบนเพื่อดูรายละเอียดและรายชื่อผู้เข้าร่วม</p>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
      คัดลอกลิงก์แล้ว!
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue'

export default {
  name: 'TakeExam',
  setup() {
    const selectedTraining = ref('')
    const searchTerm = ref('')
    const showQRCode = ref(false)
    const showToast = ref(false)
    const qrcode = ref(null)

    // Sample data - หลักสูตรอบรม
    const trainings = ref([
      {
        id: 'safety-basic',
        name: 'อบรมพื้นฐานความปลอดภัย',
        details: {
          date: '15 พฤศจิกายน 2567',
          time: '08:30 - 16:30 น.',
          instructor: 'ดร.สมชาย ปลอดภัย',
          passingScore: 80,
        },
        participants: [
          { id: 1, name: 'นายธันวา ชัยรัตนานนท์', position: 'พนักงานผลิต', examStatus: 'passed', score: 85 },
          { id: 2, name: 'นางสาวสุราดา มงคล', position: 'พนักงานคลังสินค้า', examStatus: 'failed', score: 65 },
          { id: 3, name: 'นายสมชาย ใจดี', position: 'พนักงานซ่อมบำรุง', examStatus: 'passed', score: 95 },
        ]
      },
      {
        id: 'tool-operation',
        name: 'อบรมการใช้เครื่องมือ',
        details: {
          date: '25 พฤศจิกายน 2567',
          time: '08:30 - 12:00 น.',
          instructor: 'ช่างเอก เครื่องกล',
          passingScore: 70,
        },
        participants: [] // ยังไม่มีคนทำแบบประเมิน
      }
    ])

    // Computed
    const selectedTrainingData = computed(() => trainings.value.find(t => t.id === selectedTraining.value))
    const hasExamResults = computed(() => {
      return selectedTrainingData.value?.participants?.some(p => p.examStatus) || false
    })

    const filteredParticipants = computed(() => {
      if (!selectedTrainingData.value || !selectedTrainingData.value.participants) return []
      if (!searchTerm.value) return selectedTrainingData.value.participants
      return selectedTrainingData.value.participants.filter(p =>
        p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        p.position.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    const examUrl = computed(() => selectedTraining.value ? `${window.location.origin}/exam/${selectedTraining.value}` : '')
    const attendedCount = computed(() => selectedTrainingData.value?.participants?.filter(p => p.attended).length || 0)
    const passedCount = computed(() => selectedTrainingData.value?.participants?.filter(p => p.examStatus === 'passed').length || 0)

    // Methods
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        showToast.value = true
        setTimeout(() => (showToast.value = false), 2000)
      } catch (err) {
        console.error('Failed to copy text:', err)
      }
    }

    const getExamStatusClass = (status) => {
      return {
        passed: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800',
      }[status] || 'bg-gray-100 text-gray-800'
    }
    const getExamStatusText = (status) => ({ passed: 'ผ่าน', failed: 'ไม่ผ่าน' }[status] || 'ไม่ทราบ')

    const generateQRCode = () => {
      if (!qrcode.value || !examUrl.value) return
      const qrSize = 200
      const qrData = encodeURIComponent(examUrl.value)
      qrcode.value.innerHTML = `<img src="https://chart.googleapis.com/chart?chs=${qrSize}x${qrSize}&cht=qr&chl=${qrData}" alt="QR Code" class="w-48 h-48 mx-auto" />`
    }

    const confirmExam = () => {
      alert('การสอบครั้งนี้ถูกยืนยันแล้ว!')

    }

    // Watchers
    watch([showQRCode, examUrl], () => {
      if (showQRCode.value && examUrl.value) nextTick(() => generateQRCode())
    })
    watch(selectedTraining, () => {
      searchTerm.value = ''
      showQRCode.value = false
    })

    return {
      selectedTraining,
      searchTerm,
      showQRCode,
      showToast,
      qrcode,
      trainings,
      selectedTrainingData,
      hasExamResults,
      filteredParticipants,
      examUrl,
      attendedCount,
      passedCount,
      copyToClipboard,
      getExamStatusClass,
      getExamStatusText,
      generateQRCode,
      confirmExam
    }
  }
}
</script>
