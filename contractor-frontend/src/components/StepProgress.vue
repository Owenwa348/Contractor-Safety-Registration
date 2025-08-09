//StepProgress.vue
<template>
  <div class="mb-3 bg-white rounded-lg shadow-sm p-6">
    <!-- Progress Header -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-gray-800">ขั้นตอนการดำเนินการ</h2>
      <p class="text-sm text-gray-600 mt-1">
        ขั้นตอนที่ {{ currentStepNumber }}/{{ totalSteps }}: {{ currentStepTitle }}
      </p>
    </div>
    
    <!-- Desktop Progress -->
    <div class="hidden md:block">
      <div class="flex items-center justify-between">
        <div v-for="(step, index) in steps" :key="step.step" class="flex items-center">
          <!-- Step Circle -->
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300"
            :class="getStepClass(step.step)"
          >
            <svg v-if="step.step < currentStepNumber" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else>{{ step.step }}</span>
          </div>
          
          <!-- Connector Line -->
          <div 
            v-if="index < steps.length - 1" 
            class="h-1 w-16 mx-2 transition-all duration-300"
            :class="step.step < currentStepNumber ? 'bg-green-400' : 'bg-gray-300'"
          />
        </div>
      </div>
      
      <!-- Step Labels -->
      <div class="flex justify-between mt-3">
        <div 
          v-for="step in steps" 
          :key="`label-${step.step}`" 
          class="text-xs text-center w-10"
          :class="step.step === currentStepNumber ? 'text-blue-600 font-medium' : 'text-gray-500'"
        >
          {{ step.shortName }}
        </div>
      </div>
    </div>
    
    <!-- Mobile Progress -->
    <div class="md:hidden">
      <div class="space-y-3">
        <div v-for="step in steps" :key="step.step" class="flex items-center">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mr-3"
            :class="getStepClass(step.step)"
          >
            <svg v-if="step.step < currentStepNumber" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else>{{ step.step }}</span>
          </div>
          <span 
            class="text-sm"
            :class="step.step === currentStepNumber ? 'text-blue-600 font-medium' : 'text-gray-600'"
          >
            {{ step.name }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="mt-6">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: progressPercentage + '%' }"
        />
      </div>
      <div class="flex justify-between mt-2 text-xs text-gray-500">
        <span>เริ่มต้น</span>
        <span>{{ Math.round(progressPercentage) }}% เสร็จสิ้น</span>
        <span>สำเร็จ</span>
      </div>
    </div>
    
    <!-- Next Steps Info -->
    <div v-if="nextStep" class="mt-4 p-3 bg-blue-50 rounded-lg">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h4 class="text-sm font-medium text-blue-800">ขั้นตอนถัดไป</h4>
          <p class="text-sm text-blue-700 mt-1">{{ nextStep.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepProgress',
  computed: {
    steps() {
      return [
        { step: 1, name: 'จัดการรายชื่อพนักงานตามสังกัด', shortName: 'รายชื่อพนักงาน', path: '/manage-team' },
        { step: 2, name: 'จัดการเอกสาร', shortName: 'จัดการเอกสาร', path: '/upload' },
        { step: 3, name: 'รอการอนุมัติ', shortName: 'รอการอนุมัติเอกสาร 1', path: '/approval-owner' },
        { step: 4, name: 'รอการอนุมัติ.', shortName: 'รอการอนุมัติเอกสาร 2', path: '/approval-jorpor' },
        { step: 5, name: 'จองอบรม', shortName: 'จองอบรม', path: '/training-booking' },
        { step: 6, name: 'เข้าอบรม', shortName: 'เข้าอบรม', path: '/attend-training' },
        { step: 7, name: 'ดาวน์โหลด QR', shortName: 'QR Code', path: '/download-list-qr' },
        { step: 8, name: 'ประเมินความรู้', shortName: 'ประเมินความรู้', path: '/take-exam' },
        { step: 9, name: 'พิมพ์บัตร', shortName: 'พิมพ์บัตร', path: '/print-card' }
      ]
    },
    currentStepNumber() {
      const stepMap = {
        '/manage-team': 1,
        '/upload': 2,
        '/approval-owner': 3,
        '/approval-jorpor': 4,
        '/training-booking': 5,
        '/attend-training': 6,
        '/download-list-qr': 7,
        '/take-exam': 8,
        '/print-card': 9
      }
      return stepMap[this.$route.path] || 1
    },
    currentStepTitle() {
      const currentStep = this.steps.find(step => step.step === this.currentStepNumber)
      return currentStep ? currentStep.name : ''
    },
    totalSteps() {
      return this.steps.length
    },
    progressPercentage() {
      return (this.currentStepNumber / this.totalSteps) * 100
    },
    nextStep() {
      return this.steps.find(step => step.step === this.currentStepNumber + 1)
    }
  },
  methods: {
    getStepClass(stepNumber) {
      if (stepNumber < this.currentStepNumber) {
        return 'bg-green-500 text-white border-green-500 shadow-md'
      } else if (stepNumber === this.currentStepNumber) {
        return 'bg-blue-600 text-white border-blue-600 shadow-md ring-4 ring-blue-200'
      } else {
        return 'bg-gray-200 text-gray-500 border-gray-300'
      }
    }
  }
}
</script>