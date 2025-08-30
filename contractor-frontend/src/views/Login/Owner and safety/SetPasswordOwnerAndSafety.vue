<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">เตั้งรหัสผ่านสำหรับผู้ใช้งานครั้งแรก</h1>
      </div>

      <form @submit.prevent="handleSetPassword" class="space-y-6">

        <!-- Email -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">อีเมล</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="example@company.com"
              :disabled="emailFromUrl"
              :class="[
                'w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pl-11',
                emailFromUrl ? 'bg-gray-100 cursor-not-allowed' : ''
              ]"
              required
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
          </div>
          <p v-if="emailFromUrl" class="text-xs text-gray-500">อีเมลถูกกำหนดจากหน้าล็อกอิน</p>
        </div>

        <!-- Username -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">ชื่อผู้ใช้ (Username)</label>
          <div class="relative">
            <input
              v-model="username"
              type="text"
              placeholder="ระบุชื่อผู้ใช้"
              class="w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pl-11"
              required
              minlength="3"
              maxlength="20"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- รหัสผ่าน -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">รหัสผ่านใหม่</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="ระบุรหัสผ่าน"
              class="w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pl-11 pr-11"
              required
              minlength="6"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg v-if="showPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">ยืนยันรหัสผ่าน</label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              class="w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pl-11 pr-11"
              required
              minlength="6"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
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

        <!-- Password mismatch warning -->
        <div v-if="password && confirmPassword && password !== confirmPassword" class="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            รหัสผ่านไม่ตรงกัน
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!canSubmit"
          :class="[
            'w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-blue-100',
            canSubmit
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:scale-[1.02] hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed disabled:hover:scale-100'
          ]"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            ตั้งรหัสผ่าน
          </span>
        </button>
        
        <!-- Back to Login -->
        <div class="text-center pt-4">
          <router-link
            to="/loginownerandsafety"
            class="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            กลับไปหน้าล็อกอิน
          </router-link>
        </div> 
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetPasswordOwnerAndSafety',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      emailFromUrl: false,
      
      // Mock database - ในการใช้งานจริงควรเรียก API
      mockDatabase: [
        { email: 'safety01@gmail.com', hasPassword: true, password: 'password123', username: 'safety_user01' },
        { email: 'safety02@gmail.com', hasPassword: true, password: 'securepass456', username: 'safety_user02' },
        { email: 'safety03@gmail.com', hasPassword: false, username: '' },
        { email: 'safety04@gmail.com', hasPassword: false, username: '' },
      ]
    }
  },
  computed: {
    canSubmit() {
      return this.email && 
             this.username &&
             this.username.length >= 3 &&
             this.password && 
             this.confirmPassword && 
             this.password === this.confirmPassword &&
             this.password.length >= 6;
    }
  },
  mounted() {
    // ตรวจสอบ URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    
    if (emailParam) {
      this.email = decodeURIComponent(emailParam);
      this.emailFromUrl = true;
    }
  },
  methods: {
    handleSetPassword() {
      if (!this.canSubmit) return;
      
      // ตรวจสอบว่าอีเมลมีในระบบและยังไม่ได้ตั้งรหัสผ่าน
      const user = this.mockDatabase.find(u => u.email.toLowerCase() === this.email.toLowerCase());
      
      if (!user) {
        alert('อีเมลของท่านไม่มีในระบบ');
        return;
      }
      
      if (user.hasPassword) {
        alert('อีเมลนี้ได้ตั้งรหัสผ่านแล้ว');
        return;
      }
      
      // จำลองการบันทึกรหัสผ่านใหม่
      console.log('ตั้งรหัสผ่านสำเร็จสำหรับ:', {
        email: this.email,
        username: this.username,
        password: this.password
      });
      
      // อัพเดต mock database (ในการใช้งานจริงจะเรียก API)
      user.hasPassword = true;
      user.password = this.password;
      user.username = this.username;
      
      alert('ตั้งรหัสผ่านสำเร็จ! กรุณาสามารถเข้าสู่ระบบได้แล้ว');
      
      // นำทางกลับไปหน้าล็อกอิน
      this.$router.push('/loginownerandsafety');
    }
  }
}
</script>