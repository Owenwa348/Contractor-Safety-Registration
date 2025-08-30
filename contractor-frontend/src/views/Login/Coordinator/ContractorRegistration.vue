<!-- ContractorRegistration.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">ลงทะเบียนคู่ธุรกิจ</h1>
        <p class="text-gray-600 mt-2">กรอกข้อมูลเพื่อเริ่มต้นความร่วมมือ</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- เลขประจำตัวผู้เสียภาษีอากร -->
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              เลขประจำตัวผู้เสียภาษีอากร (บริษัทคู่ธุรกิจ)
            </label>
            <input 
              type="text" 
              v-model="form.taxId"
              @input="validateTaxId"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
              placeholder="กรอกเลขประจำตัวผู้เสียภาษี 13 หลัก"
              maxlength="13"
            />
          </div>

          <!-- ชื่อบริษัท -->
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">ชื่อบริษัท</label>
            <input 
              type="text" 
              v-model="form.companyName"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
              placeholder="ชื่อบริษัทของคุณ"
            />
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              v-model="form.username"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
              placeholder="ชื่อผู้ใช้ของคุณ"
            />
          </div>

          <!-- ชื่อ - นามสกุล -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ชื่อ - นามสกุล</label>
            <input 
              type="text" 
              v-model="form.fullName"
              @input="validateFullName"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
              placeholder="ชื่อและนามสกุลของคุณ"
            />
          </div>

          <!-- อีเมล -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">อีเมล</label>
            <input 
              type="email" 
              v-model="form.email"
              @blur="validateEmail"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
              placeholder="example@company.com"
            />
            <div v-if="emailError" class="mt-2 text-red-500 text-sm">
              {{ emailError }}
            </div>
          </div>

          <!-- เบอร์โทรศัพท์ -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรศัพท์</label>
            <input 
              type="text" 
              v-model="form.phone"
              @input="validatePhone"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
              placeholder="0xx-xxx-xxxx"
              maxlength="10"
            />
          </div>
        </div>

        <!-- File Upload Section -->
        <div class="space-y-6 pt-6 border-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            เอกสารประกอบการลงทะเบียน
          </h3>

          <!-- หนังสือรับรองบริษัท -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              หนังสือรับรองบริษัท <span class="text-red-500">*</span>
            </label>
            <div class="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors"
                 :class="{'border-blue-500 bg-blue-50': isDraggingCompanyCert}">
              <input 
                type="file" 
                ref="companyCertInput"
                @change="handleCompanyCertUpload"
                accept=".pdf,.jpg,.jpeg,.png"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @dragover="isDraggingCompanyCert = true"
                @dragleave="isDraggingCompanyCert = false"
                @drop="isDraggingCompanyCert = false"
              />
              
              <div v-if="!form.companyCertificate" class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="mt-4">
                  <p class="text-sm text-gray-600">
                    <span class="font-semibold text-blue-600">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวางที่นี่
                  </p>
                  <p class="text-xs text-gray-500 mt-1">รองรับไฟล์ PDF, JPG, PNG ขนาดไม่เกิน 10MB</p>
                </div>
              </div>

              <div v-else class="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                <div class="flex items-center flex-1">
                  <svg class="w-8 h-8 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-green-800 truncate">{{ form.companyCertificate.name }}</p>
                    <p class="text-xs text-green-600">{{ formatFileSize(form.companyCertificate.size) }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2 ml-3">
                  <button 
                    type="button" 
                    @click="previewFile(form.companyCertificate, $event)"
                    class="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all z-10 relative"
                    title="ดูไฟล์"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    @click="removeCompanyCert($event)"
                    class="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all z-10 relative"
                    title="ลบไฟล์"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ภพ.20 -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              แบบ ภพ.20 <span class="text-red-500">*</span>
            </label>
            <div class="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors"
                 :class="{'border-blue-500 bg-blue-50': isDraggingPorPor20}">
              <input 
                type="file" 
                ref="porpor20Input"
                @change="handlePorPor20Upload"
                accept=".pdf,.jpg,.jpeg,.png"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @dragover="isDraggingPorPor20 = true"
                @dragleave="isDraggingPorPor20 = false"
                @drop="isDraggingPorPor20 = false"
              />
              
              <div v-if="!form.porpor20" class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="mt-4">
                  <p class="text-sm text-gray-600">
                    <span class="font-semibold text-blue-600">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวางที่นี่
                  </p>
                  <p class="text-xs text-gray-500 mt-1">รองรับไฟล์ PDF, JPG, PNG ขนาดไม่เกิน 10MB</p>
                </div>
              </div>

              <div v-else class="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                <div class="flex items-center flex-1">
                  <svg class="w-8 h-8 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-green-800 truncate">{{ form.porpor20.name }}</p>
                    <p class="text-xs text-green-600">{{ formatFileSize(form.porpor20.size) }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2 ml-3">
                  <button 
                    type="button" 
                    @click="previewFile(form.porpor20, $event)"
                    class="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all z-10 relative"
                    title="ดูไฟล์"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    @click="removePorPor20($event)"
                    class="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all z-10 relative"
                    title="ลบไฟล์"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- รหัสผ่าน -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">รหัสผ่าน</label>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="form.password"
                @input="checkPasswordStrength"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
                placeholder="รหัสผ่านของคุณ"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            
            <!-- Password Strength Indicator -->
            <div v-if="form.password" class="mt-3">
              <div class="flex items-center justify-between text-xs mb-2">
                <span class="font-medium text-gray-600">ความแข็งแรงของรหัสผ่าน:</span>
                <span :class="passwordStrength.color" class="font-bold">{{ passwordStrength.text }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  :class="passwordStrength.bgColor" 
                  class="h-2 rounded-full transition-all duration-300"
                  :style="{ width: passwordStrength.width }"
                ></div>
              </div>
              <div class="mt-2 space-y-1 text-xs text-gray-600">
                <div class="flex items-center space-x-2">
                  <span :class="passwordChecks.uppercase ? 'text-green-500' : 'text-gray-400'">✓</span>
                  <span>มีตัวอักษรพิมพ์ใหญ่</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="passwordChecks.lowercase ? 'text-green-500' : 'text-gray-400'">✓</span>
                  <span>มีตัวอักษรพิมพ์เล็ก</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="passwordChecks.number ? 'text-green-500' : 'text-gray-400'">✓</span>
                  <span>มีตัวเลข</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ยืนยันรหัสผ่าน -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">ยืนยันรหัสผ่าน</label>
            <div class="relative">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="form.confirmPassword"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300" 
                placeholder="ยืนยันรหัสผ่านของคุณ"
              />
              <button 
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            
            <!-- Password Match Indicator -->
            <div v-if="form.confirmPassword" class="mt-2 flex items-center space-x-2">
              <span v-if="passwordsMatch" class="text-green-500 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                รหัสผ่านตรงกัน
              </span>
              <span v-else class="text-red-500 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                รหัสผ่านไม่ตรงกัน
              </span>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="!isFormValid"
          :class="isFormValid 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105' 
            : 'bg-gray-300 cursor-not-allowed'"
          class="w-full text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            กำลังส่งข้อมูลเพื่อการยืนยัน...
          </span>
          <span v-else>ลงทะเบียน</span>
        </button>

        <div class="text-center pt-4">
          <p class="text-sm text-gray-600">
            มีบัญชีอยู่แล้ว? 
            <a href="#" class="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            type="button"
            @click="$router.push('/')"
            >เข้าสู่ระบบ</a>
          </p>
        </div>
      </form>

      <!-- File Preview Modal -->
      <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden shadow-2xl">
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 truncate">{{ currentPreviewFile?.name || 'ตัวอย่างไฟล์' }}</h3>
            <button 
              @click="closePreview"
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="p-4 overflow-auto max-h-[calc(90vh-80px)]">
            <div v-if="currentPreviewFile?.type === 'application/pdf'" class="text-center">
              <div class="bg-gray-100 rounded-lg p-8">
                <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-gray-600 mb-4">ไฟล์ PDF: {{ currentPreviewFile.name }}</p>
                <p class="text-sm text-gray-500 mb-4">ขนาด: {{ formatFileSize(currentPreviewFile.size) }}</p>
                <button 
                  @click="downloadFile(currentPreviewFile)" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  ดาวน์โหลดไฟล์
                </button>
              </div>
            </div>
            <div v-else-if="currentPreviewFile && currentPreviewFile.type.startsWith('image/')" class="text-center">
              <img 
                :src="previewImageUrl" 
                :alt="currentPreviewFile.name"
                class="max-w-full max-h-[60vh] mx-auto rounded-lg shadow-lg"
                @load="imageLoaded = true"
                @error="imageError = true"
              />
              <div v-if="!imageLoaded && !imageError" class="flex items-center justify-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <div v-if="imageError" class="bg-gray-100 rounded-lg p-8">
                <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-600">ไม่สามารถแสดงตัวอย่างภาพได้</p>
              </div>
              <div class="mt-4">
                <p class="text-sm text-gray-600">{{ currentPreviewFile.name }}</p>
                <p class="text-xs text-gray-500">{{ formatFileSize(currentPreviewFile.size) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform transition-all">
          <div class="text-center">
            <!-- Success Icon -->
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <!-- Success Message -->
            <h3 class="text-2xl font-bold text-gray-900 mb-4">ส่งข้อมูลสำเร็จ!</h3>
            <div class="text-gray-600 space-y-3 mb-6">
              <p class="text-base">
                ข้อมูลการลงทะเบียนของคุณได้ถูกส่งไปยังผู้ดูแลระบบเพื่อทำการตรวจสอบแล้ว
              </p>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-3">
              <button 
                @click="redirectToLogin"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ไปหน้าเข้าสู่ระบบ
              </button>
              <button 
                @click="resetForm"
                class="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-50 hover:border-gray-400"
              >
                ลงทะเบียนอีกครั้ง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessRegistrationForm',
  data() {
    return {
      form: {
        taxId: '',
        companyName: '',
        username: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        companyCertificate: null,
        porpor20: null
      },
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      emailError: '',
      isDraggingCompanyCert: false,
      isDraggingPorPor20: false,
      showPreview: false,
      currentPreviewFile: null,
      previewImageUrl: null,
      imageLoaded: false,
      imageError: false,
      passwordChecks: {
        uppercase: false,
        lowercase: false,
        number: false
      },
      showSuccessModal: false
    }
  },
computed: {
  passwordsMatch() {
    return this.form.password === this.form.confirmPassword && this.form.confirmPassword.length > 0
  },
  passwordStrength() {
    const checks = this.passwordChecks
    const checkedCount = Object.values(checks).filter(Boolean).length
    
    if (checkedCount === 0) {
      return { text: 'อ่อนแอมาก', color: 'text-red-600', bgColor: 'bg-red-500', width: '25%' }
    } else if (checkedCount === 1) {
      return { text: 'อ่อนแอ', color: 'text-red-500', bgColor: 'bg-red-400', width: '50%' }
    } else if (checkedCount === 2) {
      return { text: 'ปานกลาง', color: 'text-yellow-600', bgColor: 'bg-yellow-500', width: '75%' }
    } else {
      return { text: 'แข็งแรง', color: 'text-green-600', bgColor: 'bg-green-500', width: '100%' }
    }
  },
  isFormValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return (
      this.form.taxId.length === 13 &&
      this.form.companyName.trim() !== '' &&
      this.form.username.trim() !== '' &&
      this.form.fullName.trim() !== '' &&
      emailRegex.test(this.form.email) &&
      this.form.phone.length === 10 &&
      this.form.password.length >= 6 &&
      this.passwordsMatch &&
      this.form.companyCertificate !== null &&
      this.form.porpor20 !== null
    )
  }
},
  methods: {
    checkPasswordStrength() {
      const password = this.form.password
      
      this.passwordChecks = {
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password)
      }
    },
    validateTaxId() {
      // Allow only numbers
      this.form.taxId = this.form.taxId.replace(/[^0-9]/g, '')
    },
    validatePhone() {
      // Allow only numbers
      this.form.phone = this.form.phone.replace(/[^0-9]/g, '')
    },
    validateFullName() {
      // Allow only Thai characters and spaces
      this.form.fullName = this.form.fullName.replace(/[^ก-๙\s]/g, '')
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (this.form.email && !emailRegex.test(this.form.email)) {
        this.emailError = 'กรุณากรอกอีเมลที่ถูกต้อง'
      } else {
        this.emailError = ''
      }
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    validateFile(file) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      
      if (file.size > maxSize) {
        alert('ไฟล์มีขนาดใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 10MB')
        return false
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert('รูปแบบไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์ PDF, JPG หรือ PNG')
        return false
      }
      
      return true
    },
    handleCompanyCertUpload(event) {
      const file = event.target.files[0]
      if (file && this.validateFile(file)) {
        this.form.companyCertificate = file
      } else {
        event.target.value = ''
      }
    },
    handlePorPor20Upload(event) {
      const file = event.target.files[0]
      if (file && this.validateFile(file)) {
        this.form.porpor20 = file
      } else {
        event.target.value = ''
      }
    },
    removeCompanyCert(event) {
      event.preventDefault()
      event.stopPropagation()
      this.form.companyCertificate = null
      if (this.$refs.companyCertInput) {
        this.$refs.companyCertInput.value = ''
      }
    },
    removePorPor20(event) {
      event.preventDefault()
      event.stopPropagation()
      this.form.porpor20 = null
      if (this.$refs.porpor20Input) {
        this.$refs.porpor20Input.value = ''
      }
    },
    previewFile(selectedFile, event) {
      event.preventDefault()
      event.stopPropagation()
      this.currentPreviewFile = selectedFile
      this.showPreview = true
      this.imageLoaded = false
      this.imageError = false
      
      if (selectedFile && selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previewImageUrl = e.target.result
        }
        reader.readAsDataURL(selectedFile)
      }
    },
    closePreview() {
      this.showPreview = false
      this.currentPreviewFile = null
      this.previewImageUrl = null
      this.imageLoaded = false
      this.imageError = false
    },
    downloadFile(file) {
      const url = URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    // ฟังก์ชันสำหรับส่งอีเมลไปยังผู้ดูแลระบบ,
    async submitForm() {
      if (!this.isFormValid) return
      this.isLoading = true
      try {
        const formData = new FormData()
        formData.append("taxId", this.form.taxId)
        formData.append("companyName", this.form.companyName)
        formData.append("username", this.form.username)
        formData.append("fullName", this.form.fullName)
        formData.append("email", this.form.email)
        formData.append("phone", this.form.phone)
        formData.append("password", this.form.password)
        formData.append("companyCertificate", this.form.companyCertificate)
        formData.append("porpor20", this.form.porpor20)

        const res = await fetch("/api/partners/register", {
          method: "POST",
          body: formData
        })
        const data = await res.json()

        if (data.success) {
          this.showSuccessModal = true
        } else {
          alert(data.message || "เกิดข้อผิดพลาด")
        }
      } catch (err) {
        console.error(err)
        alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้")
      } finally {
        this.isLoading = false
      }
    },
    resetForm() {
      this.form = {
        taxId: '',
        companyName: '',
        username: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        companyCertificate: null,
        porpor20: null
      }
      this.showSuccessModal = false
    },
    redirectToLogin() {
      this.$router.push('/')
    }
  }
}
</script>