<template>
  <div class="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-blue-600 mb-3">ทำแบบทดสอบหลังอบรม</h1>
      <p class="text-gray-600 text-lg">เลือกหลักสูตรอบรมเพื่อดูรายละเอียดและเข้าสู่การสอบ</p>
    </div>

    <!-- Training Selection -->
    <div class="mb-8 bg-white rounded-lg shadow-md p-6">
      <label for="trainingSelect" class="block text-sm font-semibold text-gray-700 mb-3">
        <svg class="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        เลือกหลักสูตรอบรม
      </label>
      <select 
        id="trainingSelect"
        v-model="selectedTraining"
        class="w-full md:w-2/3 px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
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
    <div v-if="selectedTrainingData" class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Training Information -->
      <div class="xl:col-span-2 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          รายละเอียดการอบรม
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-start">
              <span class="text-sm font-semibold text-gray-600 w-28">หลักสูตร:</span>
              <span class="text-sm text-gray-800 font-medium">{{ selectedTrainingData.name }}</span>
            </div>
            <div class="flex items-start">
              <span class="text-sm font-semibold text-gray-600 w-28">วันที่อบรม:</span>
              <span class="text-sm text-gray-800">{{ selectedTrainingData.details.date }}</span>
            </div>
            <div class="flex items-start">
              <span class="text-sm font-semibold text-gray-600 w-28">เวลา:</span>
              <span class="text-sm text-gray-800">{{ selectedTrainingData.details.time }}</span>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <span class="text-sm font-semibold text-gray-600 w-28">วิทยากร:</span>
              <span class="text-sm text-gray-800">{{ selectedTrainingData.details.instructor }}</span>
            </div>
            <div class="flex items-start">
              <span class="text-sm font-semibold text-gray-600 w-28">ระยะเวลา:</span>
              <span class="text-sm text-gray-800">{{ selectedTrainingData.details.duration }}</span>
            </div>
            <div class="flex items-start">
              <span class="text-sm font-semibold text-gray-600 w-28">เกณฑ์ผ่าน:</span>
              <span class="text-sm text-green-700 font-bold">{{ selectedTrainingData.details.passingScore }}% ขึ้นไป</span>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <span class="text-sm font-semibold text-gray-600">รายละเอียดหลักสูตร:</span>
          <p class="text-sm text-gray-800 mt-2">{{ selectedTrainingData.details.description }}</p>
        </div>

        <!-- Exam Access Links -->
        <div class="mt-8 pt-6 border-t">
          <h3 class="text-xl font-bold text-gray-800 mb-4">เข้าสู่การสอบ</h3>
          
          <!-- Direct Link -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-600 mb-3">ลิงก์โดยตรง:</label>
            <div class="flex items-center gap-3">
              <input 
                type="text" 
                :value="examUrl" 
                readonly 
                class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
              >
              <button 
                @click="copyToClipboard(examUrl)" 
                class="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                คัดลอก
              </button>
            </div>
          </div>

          <!-- QR Code -->
          <div class="flex gap-3">
            <button 
              @click="toggleQRCode" 
              class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              {{ showQRCode ? 'ซ่อน QR Code' : 'แสดง QR Code' }}
            </button>
          </div>

          <div v-if="showQRCode" class="mt-6 text-center">
            <div class="inline-block p-6 bg-white border-2 border-gray-200 rounded-xl shadow-lg">
              <div ref="qrcode" class="qr-code-container"></div>
              <p class="text-sm text-gray-500 mt-3 font-medium">สแกนเพื่อเข้าสู่การสอบ</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Participants List -->
      <div v-if="hasExamResults" class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
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
        <div class="grid grid-cols-2 gap-3 mb-6">
          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <div class="text-green-800 text-2xl font-bold">{{ passedCount }}</div>
            <div class="text-green-600 text-sm font-medium">สอบผ่าน</div>
          </div>
          <div class="bg-red-50 p-4 rounded-lg border border-red-200">
            <div class="text-red-800 text-2xl font-bold">{{ failedCount }}</div>
            <div class="text-red-600 text-sm font-medium">สอบไม่ผ่าน</div>
          </div>
        </div>

        <!-- Search -->
        <div class="mb-4">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="ค้นหาชื่อหรือตำแหน่ง..." 
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Participants List -->
        <div class="max-h-96 overflow-y-auto">
          <div class="space-y-3">
            <div 
              v-for="(participant, index) in filteredCompletedParticipants" 
              :key="participant.id" 
              class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-start">
                  <span class="text-sm font-bold text-gray-600 w-8">{{ index + 1 }}.</span>
                  <div>
                    <p class="text-sm font-bold text-gray-800">{{ participant.name }}</p>
                    <p class="text-xs text-gray-500">{{ participant.position }}</p>
                    <div class="flex items-center mt-1">
                      <svg class="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-3 7h12l-3-7"></path>
                      </svg>
                      <span class="text-xs text-gray-500">ทำข้อสอบ: {{ participant.examDate }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span :class="getExamStatusClass(participant.examStatus)">
                    <svg v-if="participant.examStatus === 'passed'" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ getExamStatusText(participant.examStatus) }}
                  </span>
                  <span class="text-xs text-gray-600">
                    คะแนน: {{ participant.score }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="filteredCompletedParticipants.length === 0" class="text-center py-8 text-gray-500">
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
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="max-w-md mx-auto">
        <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <h3 class="text-xl font-bold text-gray-900 mb-2">เลือกหลักสูตรเพื่อดูข้อมูล</h3>
        <p class="text-gray-500">กรุณาเลือกหลักสูตรอบรมจากรายการด้านบนเพื่อดูรายละเอียดและรายชื่อผู้เข้าร่วม</p>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        คัดลอกลิงก์แล้ว!
      </div>
    </Transition>
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

    // ข้อมูลหลักสูตรอบรม
    const trainings = ref([
      {
        id: 'safety-basic',
        name: 'อบรมพื้นฐานความปลอดภัย',
        details: {
          date: '25 - 30 สิงหาคม 2568',
          time: '08:30 - 16:30 น.',
          instructor: 'ดร.สมชาย ปลอดภัย',
          passingScore: 80,
          duration: '8 ชั่วโมง',
          description: 'หลักการพื้นฐานด้านความปลอดภัยในการทำงาน การป้องกันอุบัติเหตุ และการใช้อุปกรณ์ป้องกันภัยส่วนบุคคล'
        },
        participants: [
          { id: 1, name: 'นายธันวา ชัยรัตนานนท์', position: 'พนักงานผลิต', examStatus: 'passed', score: 85, examDate: '27 สิงหาคม 2568' },
          { id: 2, name: 'นางสาวสุราดา มงคล', position: 'พนักงานคลังสินค้า', examStatus: 'failed', score: 65, examDate: '27 สิงหาคม 2568' },
          { id: 3, name: 'นายสมชาย ใจดี', position: 'พนักงานซ่อมบำรุง', examStatus: 'passed', score: 95, examDate: '27 สิงหาคม 2568' },
          { id: 4, name: 'นางสมใจ รักดี', position: 'พนักงานควบคุมคุณภาพ', examStatus: 'passed', score: 88, examDate: '27 สิงหาคม 2568' },
        ]
      },
      {
        id: 'tool-operation',
        name: 'อบรมการใช้เครื่องมือ',
        details: {
          date: '22 - 24 สิงหาคม 2568',
          time: '08:30 - 12:00 น.',
          instructor: 'ช่างเอก เครื่องกล',
          passingScore: 70,
          duration: '4 ชั่วโมง',
          description: 'การใช้เครื่องมือพื้นฐานในการทำงาน การบำรุงรักษา และมาตรการความปลอดภัยในการใช้เครื่องมือ'
        },
        participants: [
          { id: 1, name: 'นายสมศักดิ์ ช่างฝีมือ', position: 'ช่างเทคนิค', examStatus: 'passed', score: 78, examDate: '23 สิงหาคม 2568' },
          { id: 2, name: 'นายวิชัย มั่นคง', position: 'ช่างซ่อม', examStatus: 'passed', score: 82, examDate: '23 สิงหาคม 2568' },
        ]
      },
      {
        id: 'machine-operation',
        name: 'อบรมการใช้เครื่องจักร',
        details: {
          date: '3 กันยายน 2568',
          time: '08:30 - 17:00 น.',
          instructor: 'วิศวกรใหญ่ สมเกียรติ',
          passingScore: 75,
          duration: '8 ชั่วโมง',
          description: 'การปฏิบัติงานกับเครื่องจักรอุตสาหกรรม ระบบความปลอดภัย และการบำรุงรักษาเบื้องต้น'
        },
        participants: [
          { id: 1, name: 'นายอนุชา ผู้ช่วย', position: 'ผู้ช่วยช่าง', examStatus: 'failed', score: 68, examDate: '3 กันยายน 2568' },
          { id: 2, name: 'นายรัชพล เทคโน', position: 'เทคนิคเครื่องจักร', examStatus: 'passed', score: 89, examDate: '3 กันยายน 2568' },
          { id: 3, name: 'นางสาวปัทมา ขยัน', position: 'พนักงานควบคุม', examStatus: 'passed', score: 76, examDate: '3 กันยายน 2568' },
        ]
      },
      {
        id: 'first-aid',
        name: 'อบรมการประกอบอุปกรณ์',
        details: {
          date: '12 - 18 กันยายน 2568',
          time: '09:00 - 16:00 น.',
          instructor: 'พยาบาลวิชาชีพ สุขใจ',
          passingScore: 80,
          duration: '7 ชั่วโมง',
          description: 'การปฐมพยาบาลเบื้องต้น การช่วยเหลือผู้ประสบอุบัติเหตุ และการใช้อุปกรณ์ปฐมพยาบาล'
        },
        participants: [
          { id: 1, name: 'นายประยุทธ ช่วยเหลือ', position: 'เจ้าหน้าที่ความปลอดภัย' },
          { id: 2, name: 'นางสาวมณีรัตน์ ดูแล', position: 'พยาบาลโรงงาน' },
          { id: 3, name: 'นายสมปอง กล้าหาญ', position: 'หัวหน้าแผนกผลิต' },
          { id: 4, name: 'นางสิริวรรณ เอาใจใส่', position: 'เลขานุการ' }
        ]
      }
    ])

    // Computed Properties
    const selectedTrainingData = computed(() => 
      trainings.value.find(t => t.id === selectedTraining.value)
    )
    
    const completedParticipants = computed(() => {
      if (!selectedTrainingData.value?.participants) return []
      return selectedTrainingData.value.participants.filter(p => p.examStatus && p.examDate)
    })

    const hasExamResults = computed(() => completedParticipants.value.length > 0)
    
    const filteredCompletedParticipants = computed(() => {
      if (!searchTerm.value) return completedParticipants.value
      return completedParticipants.value.filter(p =>
        p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        p.position.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        p.examDate.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    const examUrl = computed(() => {
      if (selectedTraining.value) {
        return `${window.location.origin}/exam/${selectedTraining.value}`
      }
      return ''
    })
    
    const passedCount = computed(() => 
      completedParticipants.value.filter(p => p.examStatus === 'passed').length
    )
    
    const failedCount = computed(() => 
      completedParticipants.value.filter(p => p.examStatus === 'failed').length
    )

    // Methods
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        showToast.value = true
        setTimeout(() => {
          showToast.value = false
        }, 3000)
      } catch (err) {
        console.error('Failed to copy text:', err)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand('copy')
          showToast.value = true
          setTimeout(() => {
            showToast.value = false
          }, 3000)
        } catch (err) {
          console.error('Fallback copy failed:', err)
        }
        document.body.removeChild(textArea)
      }
    }

    const toggleQRCode = () => {
      showQRCode.value = !showQRCode.value
    }

    const getExamStatusClass = (status) => {
      const baseClasses = 'px-3 py-1 rounded-full text-xs font-bold flex items-center'
      const statusClasses = {
        passed: 'bg-green-100 text-green-800 border border-green-200',
        failed: 'bg-red-100 text-red-800 border border-red-200'
      }
      return `${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`
    }

    const getExamStatusText = (status) => {
      const statusTexts = {
        passed: 'ผ่าน',
        failed: 'ไม่ผ่าน'
      }
      return statusTexts[status] || 'ไม่ทราบ'
    }

    // ฟังก์ชันสร้าง QR Code
    const generateQRCode = async () => {
      if (!qrcode.value || !examUrl.value) return
      
      try {
        // แสดง loading state
        qrcode.value.innerHTML = `
          <div class="flex flex-col items-center justify-center">
            <div class="qr-code-loading"></div>
            <div class="text-xs text-gray-400 mt-2">กำลังสร้าง QR Code...</div>
          </div>
        `
        
        // ใช้ QRServer API (มีเสถียรภาพดี)
        const qrSize = 200
        const qrData = encodeURIComponent(examUrl.value)
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}&format=png&margin=10&bgcolor=ffffff&color=000000`
        
        // สร้าง img element และแสดงผล
        qrcode.value.innerHTML = `
          <div class="flex flex-col items-center">
            <img 
              src="${qrImageUrl}" 
              alt="QR Code สำหรับเข้าสู่การสอบ" 
              class="w-48 h-48 mx-auto rounded-lg border border-gray-200 shadow-sm"
              onload="this.style.opacity=1; this.parentElement.parentElement.querySelector('.loading-text')?.remove()"
              onerror="this.onerror=null; this.src='https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${qrData}&choe=UTF-8'; this.alt='QR Code (Fallback)'"
              style="opacity: 0; transition: opacity 0.5s ease;"
            />
            <div class="text-xs text-gray-400 mt-2 font-mono bg-gray-50 px-2 py-1 rounded">
              QR Code: ${selectedTraining.value}
            </div>
            <div class="loading-text text-xs text-gray-400 mt-1">กำลังโหลด...</div>
          </div>
        `
      } catch (error) {
        console.error('Error generating QR code:', error)
        // แสดง error state
        qrcode.value.innerHTML = `
          <div class="flex flex-col items-center justify-center">
            <div class="w-48 h-48 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-xs text-gray-500">ไม่สามารถสร้าง<br>QR Code ได้</div>
              </div>
            </div>
            <div class="text-xs text-gray-400 mt-2">กรุณาใช้ลิงก์ด้านบนแทน</div>
          </div>
        `
      }
    }

    const confirmExam = () => {
      const message = `คุณต้องการยืนยันผลการสอบครั้งนี้หรือไม่?\n\nสรุปผลการสอบ:\n- ผู้ทำแบบทดสอบทั้งหมด: ${completedParticipants.value.length} คน\n- ผ่าน: ${passedCount.value} คน\n- ไม่ผ่าน: ${failedCount.value} คน`
      
      if (confirm(message)) {
        const successMessage = `✅ ยืนยันผลการสอบสำเร็จ!\n\n📊 สรุปผลการสอบ:\n- ผู้ทำแบบทดสอบ: ${completedParticipants.value.length} คน\n- ผ่าน: ${passedCount.value} คน (${Math.round((passedCount.value/completedParticipants.value.length)*100)}%)\n- ไม่ผ่าน: ${failedCount.value} คน (${Math.round((failedCount.value/completedParticipants.value.length)*100)}%)\n\n📋 ระบบจะดำเนินการ:\n✓ บันทึกผลการสอบในระบบ\n✓ ส่งรายงานให้ผู้เกี่ยวข้อง\n✓ ออกใบประกาศนียบัตรให้ผู้ที่ผ่านการสอบ\n✓ แจ้งผลการสอบให้ผู้เข้าร่วมทราบ`
        alert(successMessage)
      }
    }

    // Watchers
    watch([showQRCode, examUrl], () => {
      if (showQRCode.value && examUrl.value) {
        nextTick(() => {
          setTimeout(generateQRCode, 100) // เพิ่ม delay เล็กน้อยเพื่อให้ DOM render เสร็จก่อน
        })
      }
    })

    watch(selectedTraining, () => {
      searchTerm.value = ''
      showQRCode.value = false
    })

    // Return all reactive properties and methods
    return {
      selectedTraining,
      searchTerm,
      showQRCode,
      showToast,
      qrcode,
      trainings,
      selectedTrainingData,
      hasExamResults,
      completedParticipants,
      filteredCompletedParticipants,
      examUrl,
      passedCount,
      failedCount,
      copyToClipboard,
      toggleQRCode,
      getExamStatusClass,
      getExamStatusText,
      generateQRCode,
      confirmExam
    }
  }
}
</script>

<style scoped>
/* Toast Animation */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* QR Code Container */
.qr-code-container {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* QR Code Image Hover Effect */
.qr-code-container img {
  transition: all 0.3s ease;
}

.qr-code-container img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Loading Animation for QR Code */
.qr-code-loading {
  width: 200px;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Smooth transitions for all interactive elements */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for better accessibility */
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

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

/* Responsive adjustments */
@media (max-width: 768px) {
  .qr-code-container img {
    width: 160px;
    height: 160px;
  }
  
  .qr-code-loading {
    width: 160px;
    height: 160px;
  }
}
</style>