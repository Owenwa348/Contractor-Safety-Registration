//StepProgress.vue
<template>
  <div v-if="!shouldHide" class="mb-4 bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-5">
    <!-- Progress Header -->
    <div class="mb-4">
      <h2 class="text-base sm:text-lg font-semibold text-gray-900">ขั้นตอนการดำเนินการ</h2>
      <p class="text-xs sm:text-sm text-gray-600 mt-1">
        ขั้นตอนที่ {{ currentStepNumber }}/{{ totalSteps }}: {{ currentStepTitle }}
      </p>
    </div>
    
    <!-- Desktop Progress (hidden on mobile/tablet) -->
    <div class="hidden lg:block">
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
            class="h-0.5 flex-1 mx-2 transition-all duration-200 min-w-[520px] max-w-[200px]"
            :class="step.step < currentStepNumber ? 'bg-blue-600' : 'bg-gray-300'"
          />
        </div>
      </div>
      
      <!-- Step Labels -->
      <div class="flex justify-between mt-4">
        <div 
          v-for="step in steps" 
          :key="`label-${step.step}`" 
          class="text-xs text-center flex-1 leading-tight px-1"
          :class="step.step === currentStepNumber ? 'text-blue-700 font-medium' : step.step < currentStepNumber ? 'text-blue-600' : 'text-gray-500'"
        >
          {{ step.shortName }}
        </div>
      </div>
    </div>
    
    <!-- Tablet Progress (md screens only) -->
    <div class="hidden md:block lg:hidden">
      <div class="flex items-center justify-center space-x-4">
        <div v-for="(step, index) in steps" :key="step.step" class="flex flex-col items-center">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-2 transition-all duration-200"
            :class="getStepClass(step.step, 'tablet')"
          >
            <svg v-if="step.step < currentStepNumber" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else>{{ step.step }}</span>
          </div>
          <span 
            class="text-xs text-center leading-tight max-w-[80px]"
            :class="step.step === currentStepNumber ? 'text-blue-700 font-medium' : step.step < currentStepNumber ? 'text-blue-600' : 'text-gray-500'"
          >
            {{ step.shortName }}
          </span>
          
          <!-- Connection line for tablet -->
          <div 
            v-if="index < steps.length - 1"
            class="absolute top-4 left-1/2 w-16 h-0.5 transform translate-x-4 transition-all duration-200"
            :class="step.step < currentStepNumber ? 'bg-blue-600' : 'bg-gray-300'"
          />
        </div>
      </div>
    </div>
    
    <!-- Mobile Progress -->
    <div class="md:hidden">
      <div class="space-y-2">
        <div v-for="step in steps" :key="step.step" class="flex items-center p-2 rounded-lg transition-all duration-200"
             :class="step.step === currentStepNumber ? 'bg-blue-50 border border-blue-200' : ''"
        >
          <div 
            class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0 transition-all duration-200"
            :class="getStepClass(step.step, 'mobile')"
          >
            <svg v-if="step.step < currentStepNumber" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span v-else>{{ step.step }}</span>
          </div>
          
          <div class="flex-1 min-w-0">
            <div 
              class="text-sm leading-tight"
              :class="step.step === currentStepNumber ? 'text-blue-700 font-semibold' : step.step < currentStepNumber ? 'text-blue-600 font-medium' : 'text-gray-600'"
            >
              {{ step.name }}
            </div>
            
            <!-- Status indicator for mobile -->
            <div class="text-xs mt-0.5"
                 :class="step.step === currentStepNumber ? 'text-blue-600' : step.step < currentStepNumber ? 'text-green-600' : 'text-gray-400'"
            >
              <span v-if="step.step < currentStepNumber">✓ เสร็จสิ้น</span>
              <span v-else-if="step.step === currentStepNumber">→ กำลังดำเนินการ</span>
              <span v-else>○ รอดำเนินการ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="mt-4 sm:mt-6">
      <div class="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
        <div 
          class="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: progressPercentage + '%' }"
        />
      </div>
      <div class="flex justify-between mt-2 text-xs sm:text-sm text-gray-500">
        <span>เริ่มต้น</span>
        <span class="font-medium text-blue-600">{{ Math.round(progressPercentage) }}% เสร็จสิ้น</span>
        <span>สำเร็จ</span>
      </div>
    </div>
    
    <!-- Next Steps Info -->
    <div v-if="nextStep" class="mt-4 sm:mt-5 p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <div class="flex items-start">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h4 class="text-xs sm:text-sm font-semibold text-blue-800 mb-1">ขั้นตอนถัดไป</h4>
          <p class="text-xs sm:text-sm text-blue-700">{{ nextStep.name }}</p>
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
      const hidePaths = [
        '/approval-officer', 
        '/approval-safety' , 
        '/print-card' , 
        '/create-training', 
        '/setting' ,
        '/list-employees' , 
        '/download-training-list',
        '/caretaker-user-management',
        '/caretaker-system-config',
        '/caretaker-database-management',
        '/caretaker-permissions'
      ]
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
    getStepClass(stepNumber, variant = 'desktop') {
      const baseClasses = {
        completed: 'bg-blue-600 text-white border-blue-600',
        current: 'bg-blue-700 text-white border-blue-700',
        pending: 'bg-white text-gray-500 border-gray-300'
      }
      
      const variantClasses = {
        desktop: {
          current: 'ring-4 ring-blue-200',
          completed: '',
          pending: ''
        },
        tablet: {
          current: 'ring-2 ring-blue-200',
          completed: '',
          pending: ''
        },
        mobile: {
          current: 'ring-2 ring-blue-200 shadow-sm',
          completed: 'shadow-sm',
          pending: ''
        }
      }
      
      let status = 'pending'
      if (stepNumber < this.currentStepNumber) {
        status = 'completed'
      } else if (stepNumber === this.currentStepNumber) {
        status = 'current'
      }
      
      const baseClass = baseClasses[status]
      const variantClass = variantClasses[variant] ? variantClasses[variant][status] : ''
      
      return `${baseClass} ${variantClass}`.trim()
    }
  }
}
</script>

<style scoped>
/* Custom animations for progress transitions */
@keyframes pulse-current {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.step-current {
  animation: pulse-current 2s infinite;
}

/* Responsive step connector positioning */
@media (min-width: 768px) and (max-width: 1023px) {
  .step-container {
    position: relative;
  }
}

/* Mobile step hover effects */
@media (max-width: 767px) {
  .step-mobile:hover {
    transform: translateX(2px);
    transition: transform 0.2s ease;
  }
}

/* Progress bar gradient animation */
.progress-bar {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8, #3b82f6);
  background-size: 200% 100%;
  animation: gradient-flow 3s ease infinite;
}

@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>