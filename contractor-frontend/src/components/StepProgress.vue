//StepProgress.vue
<template>
  <div v-if="!shouldHide" class="mb-4 bg-white rounded-md border border-gray-200 shadow-sm p-5">
    <!-- Progress Header -->
    <div class="mb-4">
      <h2 class="text-lg font-semibold text-gray-900">ขั้นตอนการดำเนินการ</h2>
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
            class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-200"
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
            class="h-0.5 w-130 mx-2 transition-all duration-200"
            :class="step.step < currentStepNumber ? 'bg-blue-600' : 'bg-gray-300'"
          />
        </div>
      </div>
      
      <!-- Step Labels -->
      <div class="flex justify-between mt-4">
        <div 
          v-for="step in steps" 
          :key="`label-${step.step}`" 
          class="text-xs text-center w-10 leading-tight"
          :class="step.step === currentStepNumber ? 'text-blue-700 font-medium' : step.step < currentStepNumber ? 'text-blue-600' : 'text-gray-500'"
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
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0"
            :class="getStepClass(step.step)"
          >
            <svg v-if="step.step < currentStepNumber" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else>{{ step.step }}</span>
          </div>
          <span 
            class="text-sm leading-tight"
            :class="step.step === currentStepNumber ? 'text-blue-700 font-medium' : step.step < currentStepNumber ? 'text-blue-600' : 'text-gray-600'"
          >
            {{ step.name }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="mt-6">
      <div class="w-full bg-gray-200 rounded-sm h-1.5">
        <div 
          class="bg-blue-600 h-1.5 rounded-sm transition-all duration-300 ease-in-out"
          :style="{ width: progressPercentage + '%' }"
        />
      </div>
      <div class="flex justify-between mt-2 text-xs text-gray-500">
        <span>เริ่มต้น</span>
        <span class="font-medium">{{ Math.round(progressPercentage) }}% เสร็จสิ้น</span>
        <span>สำเร็จ</span>
      </div>
    </div>
    
    <!-- Next Steps Info -->
    <div v-if="nextStep" class="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-md">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h4 class="text-sm font-semibold text-blue-800 mb-1">ขั้นตอนถัดไป</h4>
          <p class="text-sm text-blue-700">{{ nextStep.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepProgress',
  computed: {
    shouldHide() {
      const hidePaths = ['/approval-officer', '/approval-safety' , '/print-card' , '/create-training', '/setting' ,'/list-employees']
      return hidePaths.includes(this.$route.path)
    },
    steps() {
      return [
        { step: 1, name: 'จัดการรายชื่อพนักงานตามสังกัด', shortName: 'รายชื่อพนักงาน', path: '/manage-team' },
        { step: 2, name: 'จองอบรม', shortName: 'จองอบรม', path: ['/training-booking','/book-training'] },
        { step: 3, name: 'ประเมินความรู้', shortName: 'ประเมินความรู้', path: '/take-exam' },
      ]
    },
    currentStepNumber() {
      const currentPath = this.$route.path
      const current = this.steps.find(step =>
        Array.isArray(step.path)
          ? step.path.includes(currentPath)
          : step.path === currentPath
      )
      return current ? current.step : 1
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
        return 'bg-blue-600 text-white border-blue-600'
      } else if (stepNumber === this.currentStepNumber) {
        return 'bg-blue-700 text-white border-blue-700 ring-3 ring-blue-200'
      } else {
        return 'bg-white text-gray-500 border-gray-300'
      }
    }
  }
}
</script>