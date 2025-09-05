<template>
  <div class="min-h-screen bg-gray-50">
    <!-- หน้าข้อมูลการประเมิน -->
    <div v-if="currentStep === 'info'" class="max-w-md mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-xl font-bold text-center mb-6">รายละเอียดก่อนเริ่มทำแบบทดสอบ</h1>
        
        <div class="space-y-4 mb-6">
          <div class="flex items-start">
            <span class="text-blue-600 font-bold mr-2">1.</span>
            <div>
              <span>มีเวลาในการสอบทั้งหมด </span>
              <span class="text-red-500 font-bold">{{ examInfo.timeLimit }} นาที</span>
              <span> จะเริ่มนับเวลาตั้งแต่เริ่มทำแบบทดสอบ หลังจบเวลาการสอบ และมีคะแนนการผ่านอยู่ที่ </span>
              <span class="text-red-500 font-bold">{{ examInfo.passingScore }}%</span>
            </div>
          </div>
        </div>

        <div class="border-2 rounded-lg p-4 mb-6">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              เลือกบริษัทผู้รับสมัคร
            </label>
            <select 
              v-model="selectedCompany" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">เลือกบริษัทผู้รับสมัคร</option>
              <option value="company1">บริษัท ABC จำกัด</option>
              <option value="company2">บริษัท XYZ จำกัด</option>
              <option value="company3">บริษัท DEF จำกัด</option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">
              ใส่เลขบัตรประชาชน / บัตรต่างด้าว ของผู้สอบ
            </label>
            <input 
              v-model="idNumber" 
              type="text" 
              placeholder="X-XXXX-XXXXX-XX-X"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button 
          @click="startExam"
          :disabled="!selectedCompany || !idNumber"
          class="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
        >
          ดำไป
        </button>
      </div>
    </div>

    <!-- หน้าแบบทดสอบ -->
    <div v-if="currentStep === 'exam'" class="max-w-md mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg">
        <!-- Header -->
        <div class="bg-green-600 text-white p-4 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h2 class="font-bold">แบบทดสอบ</h2>
            <div class="text-right">
              <div class="text-sm">เวลาที่เหลือ</div>
              <div class="font-bold text-lg">{{ formatTime(timeRemaining) }}</div>
            </div>
          </div>
          
          <div class="mt-4">
            <div class="flex justify-between text-sm mb-1">
              <span>ความคืบหน้า</span>
              <span>{{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</span>
            </div>
            <div class="w-full bg-green-800 rounded-full h-2">
              <div 
                class="bg-white h-2 rounded-full transition-all duration-300" 
                :style="`width: ${((currentQuestionIndex + 1) / totalQuestions) * 100}%`"
              ></div>
            </div>
          </div>
        </div>

        <!-- Question -->
        <div class="p-6">
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-4">
              {{ currentQuestionIndex + 1 }}. {{ currentQuestion.question }}
            </h3>
            
            <div class="space-y-3">
              <label 
                v-for="(option, index) in currentQuestion.options" 
                :key="index"
                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                :class="selectedAnswers[currentQuestionIndex] === index ? 'border-green-500 bg-green-50' : 'border-gray-200'"
              >
                <input 
                  type="radio" 
                  :value="index"
                  v-model="selectedAnswers[currentQuestionIndex]"
                  class="mr-3 text-green-600"
                />
                <span>{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between">
            <button 
              v-if="currentQuestionIndex > 0"
              @click="previousQuestion"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ก่อนหน้า
            </button>
            <div v-else></div>
            
            <button 
              v-if="currentQuestionIndex < totalQuestions - 1"
              @click="nextQuestion"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ถัดไป
            </button>
            <button 
              v-else
              @click="finishExam"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              ส่งข้อสอบ
            </button>
          </div>
        </div>

        <!-- Question Numbers -->
        <div class="p-4 border-t bg-gray-50 rounded-b-lg">
          <div class="text-sm text-gray-600 mb-2">ข้อที่:</div>
          <div class="grid grid-cols-5 gap-2">
            <button 
              v-for="(question, index) in examQuestions" 
              :key="index"
              @click="goToQuestion(index)"
              class="w-10 h-10 text-sm rounded-lg transition-colors"
              :class="getQuestionButtonClass(index)"
            >
              {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- หน้าผลลัพธ์ -->
    <div v-if="currentStep === 'result'" class="max-w-md mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 text-center">
        <div class="mb-6">
          <i 
            class="text-6xl mb-4 block"
            :class="examResult.passed ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500'"
          ></i>
          <h2 
            class="text-2xl font-bold mb-2"
            :class="examResult.passed ? 'text-green-600' : 'text-red-600'"
          >
            {{ examResult.passed ? 'ระบบได้อายุเรียบร้อยแล้ว' : 'ไม่ผ่านการทดสอบ' }}
          </h2>
          <p class="text-gray-600">ระบบได้ดำจุดสร้งบั่งหนาทำให้สำหา</p>
        </div>

        <div class="bg-gray-100 rounded-lg p-4 mb-6">
          <div class="grid grid-cols-2 gap-4 text-center">
            <div>
              <div class="text-sm text-gray-600">ชื่อผู้รับการทำร</div>
              <div class="font-bold">sofafa deechie</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">เวศาลัส์ส์ยเมืองกลาง จำกัด</div>
              <div class="font-bold">System Stone Co.,Ltd</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4 text-center">
            <div>
              <div class="text-sm text-gray-600">วันที่ทำข้อสอบเท่า</div>
              <div class="font-bold">{{ formatDate(new Date()) }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">วันที่หดสมการบีบ</div>
              <div class="font-bold">{{ formatDate(new Date()) }}</div>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <div 
            class="text-4xl font-bold mb-2"
            :class="examResult.passed ? 'text-green-600' : 'text-red-600'"
          >
            {{ examResult.score }}%
          </div>
          <div 
            class="text-xl font-bold"
            :class="examResult.passed ? 'text-green-600' : 'text-red-600'"
          >
            {{ examResult.correctAnswers }}/{{ totalQuestions }}
          </div>
          <p class="text-gray-600 mt-2">
            {{ examResult.passed ? 'คุณได้คะแนนผ่านไปแล้ว' : 'กรุณาศึกษาเนื้อหาเพิ่มเติม' }}
          </p>
        </div>

        <button 
          v-if="!examResult.passed"
          @click="retakeExam"
          class="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors mb-4"
        >
          <i class="fas fa-redo mr-2"></i>
          สอบใหม่อีกครั้ง
        </button>

        <button 
          @click="resetSystem"
          class="w-full bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssessmentSystem',
  data() {
    return {
      currentStep: 'info', // 'info', 'exam', 'result'
      selectedCompany: '',
      idNumber: '',
      examInfo: {
        timeLimit: 30, // นาที
        passingScore: 80 // เปอร์เซ็นต์
      },
      
      // ข้อสอบทั้งหมด 60 ข้อ (ตัวอย่าง)
      allQuestions: [
        {
          question: "ข้อใดคือหลักการพื้นฐานของความปลอดภัยในการทำงาน?",
          options: ["ความเร็วในการทำงาน", "ความปลอดภัยเป็นอันดับหนึ่ง", "การประหยัดค่าใช้จ่าย", "การทำงานตามเวลา"],
          correct: 1
        },
        {
          question: "อุปกรณ์ป้องกันอันตรายส่วนบุคคล (PPE) หมายถึงอะไร?",
          options: ["Personal Protection Equipment", "Public Protection Equipment", "Personal Protective Equipment", "Public Protective Equipment"],
          correct: 2
        },
        {
          question: "เมื่อเกิดอุบัติเหตุในสถานที่ทำงาน ควรทำอย่างไรก่อน?",
          options: ["หาผู้รับผิดชอบ", "ปฐมพยาบาลผู้ประสบอุบัติเหตุ", "รายงานหัวหน้า", "ถ่ายรูปเก็บหลักฐาน"],
          correct: 1
        },
        {
          question: "การใช้อุปกรณ์ไฟฟ้าที่ชำรุดอาจเป็นอันตรายอย่างไร?",
          options: ["ไฟดับ", "ไฟฟ้าช็อต", "เครื่องเสีย", "เสียเวลา"],
          correct: 1
        },
        {
          question: "ป้ายสีแดงในโรงงานมักใช้แสดงอะไร?",
          options: ["ทางออก", "อันตราย/ห้าม", "ระวัง", "ปลอดภัย"],
          correct: 1
        },
        // เพิ่มข้อสอบให้ครบ 60 ข้อ (ข้อนี้เป็นตัวอย่างสั้น ๆ)
        ...Array.from({length: 55}, (_, i) => ({
          question: `ข้อสอบข้อที่ ${i + 6} เกี่ยวกับความปลอดภัยในการทำงาน`,
          options: [`ตัวเลือก A`, `ตัวเลือก B`, `ตัวเลือก C`, `ตัวเลือก D`],
          correct: Math.floor(Math.random() * 4)
        }))
      ],
      
      examQuestions: [], // ข้อสอบที่สุ่มมา 20 ข้อ
      totalQuestions: 20,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      timeRemaining: 0, // วินาที
      timer: null,
      examResult: {
        score: 0,
        correctAnswers: 0,
        passed: false
      }
    }
  },
  computed: {
    currentQuestion() {
      return this.examQuestions[this.currentQuestionIndex] || {}
    }
  },
  methods: {
    startExam() {
      if (!this.selectedCompany || !this.idNumber) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      }
      
      // สุ่มข้อสอบ 20 ข้อจาก 60 ข้อ
      this.examQuestions = this.getRandomQuestions(this.allQuestions, this.totalQuestions)
      this.selectedAnswers = {}
      this.currentQuestionIndex = 0
      this.timeRemaining = this.examInfo.timeLimit * 60 // แปลงเป็นวินาที
      
      this.currentStep = 'exam'
      this.startTimer()
    },
    
    getRandomQuestions(questions, count) {
      const shuffled = [...questions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    },
    
    startTimer() {
      this.timer = setInterval(() => {
        this.timeRemaining--
        if (this.timeRemaining <= 0) {
          this.finishExam()
        }
      }, 1000)
    },
    
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    },
    
    formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear() + 543 // พ.ศ.
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${day}/${month}/${year} เวลา ${hours}:${minutes}`
    },
    
    nextQuestion() {
      if (this.currentQuestionIndex < this.totalQuestions - 1) {
        this.currentQuestionIndex++
      }
    },
    
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },
    
    goToQuestion(index) {
      this.currentQuestionIndex = index
    },
    
    getQuestionButtonClass(index) {
      if (this.selectedAnswers[index] !== undefined) {
        return index === this.currentQuestionIndex 
          ? 'bg-green-600 text-white' 
          : 'bg-green-100 text-green-600 border-green-300'
      } else {
        return index === this.currentQuestionIndex 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }
    },
    
    finishExam() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      
      // คำนวณคะแนน
      let correctCount = 0
      this.examQuestions.forEach((question, index) => {
        if (this.selectedAnswers[index] === question.correct) {
          correctCount++
        }
      })
      
      const score = Math.round((correctCount / this.totalQuestions) * 100)
      const passed = score >= this.examInfo.passingScore
      
      this.examResult = {
        score,
        correctAnswers: correctCount,
        passed
      }
      
      this.currentStep = 'result'
    },
    
    retakeExam() {
      this.currentStep = 'info'
      this.resetExamData()
    },
    
    resetSystem() {
      this.currentStep = 'info'
      this.selectedCompany = ''
      this.idNumber = ''
      this.resetExamData()
    },
    
    resetExamData() {
      this.examQuestions = []
      this.selectedAnswers = {}
      this.currentQuestionIndex = 0
      this.timeRemaining = 0
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
/* Custom styles if needed */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>