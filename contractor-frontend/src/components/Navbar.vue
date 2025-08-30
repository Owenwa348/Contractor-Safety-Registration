<!-- Navbar.vue -->
<template>
  <nav class="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center min-w-0 flex-shrink-0">
          <div class="flex items-center space-x-2 sm:space-x-3">
            <img src="/logo.png" alt="Logo" class="h-8 w-10 sm:h-11 sm:w-13 flex-shrink-0" />
            <div class="min-w-0">
              <h1 class="text-sm sm:text-lg lg:text-xl font-bold text-white truncate">
                <span class="hidden sm:inline">Contractor Safety Registration</span>
                <span class="sm:hidden">CSR</span>
              </h1>
            </div>
          </div>
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="flex items-center lg:hidden">
          <button 
            @click="$emit('toggle-mobile-menu')"
            class="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="เปิด/ปิดเมนู"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Desktop User Info & Actions -->
        <div class="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
          <!-- Company Info -->
          <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M7 21h2m-2 0H3m4 0V9a2 2 0 012-2h4a2 2 0 012 2v12m-6 0h6"/>
              </svg>
            </div>
            <span class="text-sm text-white font-medium truncate max-w-32 xl:max-w-none">{{ companyName }}</span>
          </div>
          
          <!-- User Profile -->
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span class="text-sm text-white font-medium truncate max-w-32 xl:max-w-none">{{ userName }}</span>
            </div>
            
            <!-- Desktop Logout Button -->
            <button 
              @click="logout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        <!-- Tablet User Info -->
        <div class="hidden md:flex lg:hidden items-center space-x-3 flex-shrink-0">
          <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-2">
            <div class="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
          <button 
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            title="ออกจากระบบ"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <!-- ลบ Mobile Menu ออกจาก Navbar เนื่องจากย้ายไปจัดการใน LayoutWrapper แล้ว -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  
  props: {
    showMobileMenu: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['toggle-mobile-menu'],
  
  data() {
    return {
      companyName: 'บริษัท ABC จำกัด',
      userName: 'ผู้ประสานงานคู่ธุรกิจ'
    }
  },
  methods: {
    logout() {
      if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
        // ล้างข้อมูลผู้ใช้และนำทางไปยังหน้าเข้าสู่ระบบ
        this.$router.push('/')
      }
    }
  }
}
</script>