<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
      
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full translate-y-12 -translate-x-12"></div>
      
      <!-- Header -->
      <div class="text-center mb-8 relative z-10">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a4 4 0 000 8m0 0V9a5 5 0 015 5v1M15 15H9a5 5 0 01-5-5V9"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          {{ currentStep === 'email' ? 'ลืมรหัสผ่าน' : currentStep === 'reset' ? 'ตั้งรหัสผ่านใหม่' : 'สำเร็จ!' }}
        </h1>
        <p class="text-gray-500 text-sm">
          {{ currentStep === 'email' ? 'สำหรับบุคลากรภายใน' : currentStep === 'reset' ? 'กรุณาตั้งรหัสผ่านใหม่' : 'ตั้งรหัสผ่านใหม่เรียบร้อย' }}
        </p>
      </div>

      <!-- Step 1: Email Input -->
      <div v-if="currentStep === 'email'" class="space-y-6 relative z-10">
        <form @submit.prevent="handleEmailSubmit">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">อีเมล</label>
            <div class="relative group">
              <input
                v-model="email"
                type="email"
                placeholder="example@company.com"
                :class="[
                  'w-full border-2 rounded-xl px-4 py-3 pl-12 transition-all duration-300',
                  'focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500',
                  'group-hover:border-gray-300',
                  emailError ? 'border-red-300 bg-red-50' : 'border-gray-200'
                ]"
                required
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
            </div>
            <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
          </div>

          <button
            type="submit"
            :disabled="!email || isLoading"
            :class="[
              'w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform mt-6',
              'focus:outline-none focus:ring-4 focus:ring-blue-100 relative overflow-hidden',
              email && !isLoading
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02] hover:shadow-xl' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M4 12H0"></path>
              </svg>
              กำลังตรวจสอบ...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              ตรวจสอบอีเมล
            </span>
          </button>
        </form>
      </div>

      <!-- Step 2: Reset Password -->
      <div v-if="currentStep === 'reset'" class="space-y-6 relative z-10">
        <form @submit.prevent="handlePasswordReset">
          <!-- New Password -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">รหัสผ่านใหม่</label>
            <div class="relative group">
              <input
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="ระบุรหัสผ่านใหม่"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 pr-12 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 group-hover:border-gray-300"
                required
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <button type="button" @click="showNewPassword = !showNewPassword" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg v-if="showNewPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">ยืนยันรหัสผ่าน</label>
            <div class="relative group">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="ยืนยันรหัสผ่านใหม่"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 pr-12 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 group-hover:border-gray-300"
                required
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg v-if="showConfirmPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>

          <!-- Password Requirements -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h4 class="text-sm font-semibold text-blue-800 mb-2">ข้อกำหนดรหัสผ่าน:</h4>
            <ul class="text-xs text-blue-700 space-y-1">
              <li class="flex items-center gap-2">
                <svg class="w-3 h-3" :class="newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                มีความยาวอย่างน้อย 8 ตัวอักษร
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-3 h-3" :class="/[A-Z]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-3 h-3" :class="/[0-9]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                มีตัวเลขอย่างน้อย 1 ตัว
              </li>
            </ul>
          </div>

          <button
            type="submit"
            :disabled="!isPasswordValid || isLoading"
            :class="[
              'w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform mt-6',
              'focus:outline-none focus:ring-4 focus:ring-green-100',
              isPasswordValid && !isLoading
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:scale-[1.02] hover:shadow-xl' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M4 12H0"></path>
              </svg>
              กำลังตั้งรหัสผ่าน...
            </span>
            <span v-else>ตั้งรหัสผ่านใหม่</span>
          </button>
        </form>
      </div>

      <!-- Success Message -->
      <div v-if="currentStep === 'success'" class="text-center space-y-6 relative z-10">
        <div class="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">ตั้งรหัสผ่านใหม่สำเร็จ!</h3>
          <p class="text-gray-600">ท่านสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้แล้ว</p>
        </div>
        <button
          @click="goToLogin"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          เข้าสู่ระบบ
        </button>
      </div>

      <!-- Back to Login Link -->
      <div v-if="currentStep !== 'success'" class="text-center pt-6 border-t border-gray-100 relative z-10">
        <router-link
          to="/loginownerandsafety"
          class="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200 text-sm"
        >
          ← กลับไปหน้าเข้าสู่ระบบ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordOwnerAndSafety',
  data() {
    return {
      currentStep: 'email', // 'email', 'reset', 'success'
      isLoading: false,
      email: '',
      emailError: '',
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      passwordError: '',
      
      // Mock database
      mockDatabase: [
        { email: 'safety01@gmail.com' },
        { email: 'safety02@gmail.com' },
        { email: 'safety03@gmail.com' },
        { email: 'safety04@gmail.com' },
      ]
    }
  },
  computed: {
    isPasswordValid() {
      return this.newPassword.length >= 8 &&
             /[A-Z]/.test(this.newPassword) &&
             /[0-9]/.test(this.newPassword) &&
             this.newPassword === this.confirmPassword
    }
  },
  methods: {
    async handleEmailSubmit() {
      this.emailError = ''
      
      if (!this.email) {
        this.emailError = 'กรุณากรอกอีเมล'
        return
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = 'รูปแบบอีเมลไม่ถูกต้อง'
        return
      }
      
      this.isLoading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const user = this.mockDatabase.find(u => u.email.toLowerCase() === this.email.toLowerCase())
        
        if (!user) {
          this.emailError = 'ไม่พบอีเมลของท่านในระบบ'
          return
        }
        
        this.currentStep = 'reset'
        
      } catch (error) {
        this.emailError = 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล กรุณาลองใหม่อีกครั้ง'
      } finally {
        this.isLoading = false
      }
    },
    
    async handlePasswordReset() {
      this.passwordError = ''
      
      if (!this.newPassword) {
        this.passwordError = 'กรุณากรอกรหัสผ่านใหม่'
        return
      }
      
      if (!this.isPasswordValid) {
        this.passwordError = 'รหัสผ่านไม่ตรงตามข้อกำหนด'
        return
      }
      
      this.isLoading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.currentStep = 'success'
        
      } catch (error) {
        this.passwordError = 'เกิดข้อผิดพลาดในการตั้งรหัสผ่าน กรุณาลองใหม่อีกครั้ง'
      } finally {
        this.isLoading = false
      }
    },
    
    goToLogin() {
      this.$router.push('/loginownerandsafety')
    }
  }
}
</script>

<style scoped>
.group:hover .group-hover\:translate-x-full {
  transform: translateX(100%);
}
</style>