<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a4 4 0 000 8m0 0V9a5 5 0 015 5v1M15 15H9a5 5 0 01-5-5V9"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          {{ currentStep === 'email' ? 'ลืมรหัสผ่าน' : 'ตั้งรหัสผ่านใหม่' }}
        </h1>
        <p class="text-gray-600 text-sm">
          {{ currentStep === 'email' ? 'กรุณาระบุอีเมลเพื่อรีเซ็ตรหัสผ่าน' : 'กรุณาตั้งรหัสผ่านใหม่ของท่าน' }}
        </p>
      </div>

      <!-- Step 1: Email Input -->
      <div v-if="currentStep === 'email'" class="space-y-6">
        <form @submit.prevent="handleEmailSubmit">
          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700 ">อีเมล</label>
            <div class="relative">
              <input
                type="email"
                v-model="email"
                @input="clearEmailError"
                placeholder="กรอกอีเมลของท่าน"
                class="w-full border-2 rounded-xl px-4 py-3 pl-11 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 mb-4"
                :class="emailError ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
                required
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
            </div>
            <p v-if="emailError" class="text-red-500 text-sm flex items-center gap-1 ">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              {{ emailError }}
            </p>
          </div>

          <!-- Tax ID -->
          <div class="space-y-2 ">
            <label class="block text-sm font-semibold text-gray-700mb-4">
              เลขประจำตัวผู้เสียภาษีอากร
            </label>
            <div class="relative">
              <input
                type="text"
                v-model="taxId"
                @input="formatTaxId"
                @keypress="onlyNumberInput"
                placeholder="กรอกเลขประจำตัวผู้เสียภาษี 13 หลัก"
                maxlength="13"
                class="w-full border-2 rounded-xl px-4 py-3 text-lg font-mono tracking-wider transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                :class="taxIdError ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
                required
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <span class="text-xs text-gray-400 font-mono">{{ taxId.length }}/13</span>
              </div>
            </div>
            <p v-if="taxIdError" class="text-red-500 text-sm flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              {{ taxIdError }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!email || !taxId || isLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M4 12H0m15.314-7.314l-2.828 2.828M9.172 16.828l-2.828 2.828M20.485 20.485l-2.828-2.828M6.343 6.343L3.515 3.515"></path>
              </svg>
              กำลังตรวจสอบ...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              ตรวจสอบข้อมูล
            </span>
          </button>
        </form>
      </div>

      <!-- Step 2: Reset Password -->
      <div v-if="currentStep === 'reset'" class="space-y-6">
        <form @submit.prevent="handlePasswordReset">
          <!-- New Password -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">รหัสผ่านใหม่</label>
            <div class="relative">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                v-model="newPassword"
                @input="clearPasswordErrors"
                placeholder="กรอกรหัสผ่านใหม่"
                class="w-full border-2 rounded-xl px-4 py-3 pl-11 pr-11 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                :class="passwordError ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
                required
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg v-if="!showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.941-4.243m3.12-2.12A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.243 4.243m-3.12 2.12L4.22 4.22"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.88 9.88A3 3 0 0014.12 14.12"/>
                </svg>
              </button>
            </div>
            <p v-if="passwordError" class="text-red-500 text-sm flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              {{ passwordError }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">ยืนยันรหัสผ่านใหม่</label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                @input="clearPasswordErrors"
                placeholder="ยืนยันรหัสผ่านใหม่"
                class="w-full border-2 rounded-xl px-4 py-3 pl-11 pr-11 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                :class="confirmPasswordError ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
                required
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.941-4.243m3.12-2.12A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.243 4.243m-3.12 2.12L4.22 4.22"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.88 9.88A3 3 0 0014.12 14.12"/>
                </svg>
              </button>
            </div>
            <p v-if="confirmPasswordError" class="text-red-500 text-sm flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              {{ confirmPasswordError }}
            </p>
          </div>

          <!-- Password Requirements -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                <svg class="w-3 h-3" :class="/[a-z]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-3 h-3" :class="/[0-9]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                มีตัวเลขอย่างน้อย 1 ตัว
              </li>
            </ul>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!isPasswordValid || isLoading"
            class="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M4 12H0m15.314-7.314l-2.828 2.828M9.172 16.828l-2.828 2.828M20.485 20.485l-2.828-2.828M6.343 6.343L3.515 3.515"></path>
              </svg>
              กำลังตั้งรหัสผ่าน...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              ตั้งรหัสผ่านใหม่
            </span>
          </button>
        </form>
      </div>

      <!-- Success Message -->
      <div v-if="currentStep === 'success'" class="text-center space-y-6">
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
          class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            เข้าสู่ระบบ
          </span>
        </button>
      </div>

      <!-- Back to Login Link -->
      <div v-if="currentStep !== 'success'" class="text-center pt-6 border-t border-gray-100">
        <router-link
          to="/"
          class="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200 text-sm"
        >
          ← กลับไปหน้าเข้าสู่ระบบ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Data
const currentStep = ref('email')
const isLoading = ref(false)

// Email step data
const email = ref('')
const taxId = ref('')
const emailError = ref('')
const taxIdError = ref('')

// Password step data
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const passwordError = ref('')
const confirmPasswordError = ref('')

// Mock database for validation
const mockUsers = [
  { email: 'coordinator1@company.com', taxId: '1234567891234' },
  { email: 'coordinator2@company.com', taxId: '9876543210987' },
]

// Computed properties
const isPasswordValid = computed(() => {
  return newPassword.value.length >= 8 &&
         /[A-Z]/.test(newPassword.value) &&
         /[a-z]/.test(newPassword.value) &&
         /[0-9]/.test(newPassword.value) &&
         newPassword.value === confirmPassword.value
})

// Methods
const onlyNumberInput = (e) => {
  const char = String.fromCharCode(e.which)
  if (!/[0-9]/.test(char)) {
    e.preventDefault()
  }
}

const formatTaxId = (e) => {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length > 13) {
    value = value.slice(0, 13)
  }
  taxId.value = value
  clearTaxIdError()
}

const clearEmailError = () => {
  emailError.value = ''
}

const clearTaxIdError = () => {
  taxIdError.value = ''
}

const clearPasswordErrors = () => {
  passwordError.value = ''
  confirmPasswordError.value = ''
}

const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'กรุณากรอกอีเมล'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'รูปแบบอีเมลไม่ถูกต้อง'
    return false
  }
  return true
}

const validateTaxId = () => {
  if (!taxId.value) {
    taxIdError.value = 'กรุณากรอกเลขประจำตัวผู้เสียภาษี'
    return false
  }
  if (!/^\d{13}$/.test(taxId.value)) {
    taxIdError.value = 'เลขผู้เสียภาษีต้องเป็นตัวเลข 13 หลัก'
    return false
  }
  return true
}

const validatePassword = () => {
  if (!newPassword.value) {
    passwordError.value = 'กรุณากรอกรหัสผ่านใหม่'
    return false
  }
  if (newPassword.value.length < 8) {
    passwordError.value = 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'
    return false
  }
  if (!/[A-Z]/.test(newPassword.value)) {
    passwordError.value = 'รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว'
    return false
  }
  if (!/[a-z]/.test(newPassword.value)) {
    passwordError.value = 'รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว'
    return false
  }
  if (!/[0-9]/.test(newPassword.value)) {
    passwordError.value = 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว'
    return false
  }
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'กรุณายืนยันรหัสผ่าน'
    return false
  }
  if (newPassword.value !== confirmPassword.value) {
    confirmPasswordError.value = 'รหัสผ่านไม่ตรงกัน'
    return false
  }
  return true
}

const handleEmailSubmit = async () => {
  // Clear previous errors
  emailError.value = ''
  taxIdError.value = ''
  
  if (!validateEmail() || !validateTaxId()) {
    return
  }
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Check if user exists in mock database
    const user = mockUsers.find(u => 
      u.email.toLowerCase() === email.value.toLowerCase() && 
      u.taxId === taxId.value
    )
    
    if (!user) {
      emailError.value = 'ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาตรวจสอบอีเมลและเลขประจำตัวผู้เสียภาษี'
      return
    }
    
    // Proceed to password reset step
    currentStep.value = 'reset'
    
  } catch (error) {
    emailError.value = 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล กรุณาลองใหม่อีกครั้ง'
  } finally {
    isLoading.value = false
  }
}

const handlePasswordReset = async () => {
  if (!validatePassword()) {
    return
  }
  
  isLoading.value = true
  
  try {
    // Simulate API call to reset password
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    currentStep.value = 'success'
    
  } catch (error) {
    passwordError.value = 'เกิดข้อผิดพลาดในการตั้งรหัสผ่าน กรุณาลองใหม่อีกครั้ง'
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login-coordinator')
}
</script>