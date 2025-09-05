<!--
 * Navbar.vue - คอมโพเนนต์แถบนำทางหลัก
 * แสดงโลโก้, ชื่อแอปพลิเคชัน, ข้อมูลผู้ใช้, และปุ่มต่างๆ
 * รองรับการแสดงผลบนอุปกรณ์มือถือและเดสก์ท็อป
 * จัดการ responsive design และ mobile menu toggle
-->
<template>
  <!-- แถบนำทางหลักที่มีการไล่ระดับสีน้ำเงิน -->
  <nav class="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- ส่วนโลโก้และชื่อแอปพลิเคชัน -->
        <div class="flex items-center min-w-0 flex-shrink-0">
          <div class="flex items-center space-x-2 sm:space-x-3">
            <!-- โลโก้แอปพลิเคชัน -->
            <img src="/logo.png" alt="Logo" class="h-8 w-10 sm:h-11 sm:w-13 flex-shrink-0" />
            <div class="min-w-0">
              <!-- ชื่อแอปพลิเคชันที่ปรับตามขนาดหน้าจอ -->
              <h1 class="text-sm sm:text-lg lg:text-xl font-bold text-white truncate">
                <span class="hidden sm:inline">Contractor Safety Registration</span>
                <span class="sm:hidden">CSR</span>
              </h1>
            </div>
          </div>
        </div>
        
        <!-- ปุ่มเมนูมือถือ (แสดงเฉพาะในอุปกรณ์มือถือ) -->
        <div class="flex items-center lg:hidden">
          <button 
            @click="$emit('toggle-mobile-menu')"
            class="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="เปิด/ปิดเมนู"
          >
            <!-- ไอคอนเมนู (เปลี่ยนตามสถานะเมนู) -->
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- ข้อมูลผู้ใช้และปุ่มควบคุมสำหรับเดสก์ท็อป -->
        <div class="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
          <!-- ข้อมูลบริษัท -->
          <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <!-- ไอคอนบริษัท -->
            <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M7 21h2m-2 0H3m4 0V9a2 2 0 012-2h4a2 2 0 012 2v12m-6 0h6"/>
              </svg>
            </div>
            <!-- ชื่อบริษัท -->
            <span class="text-sm text-white font-medium truncate max-w-32 xl:max-w-none">{{ companyName }}</span>
          </div>
          
          <!-- ข้อมูลโปรไฟล์ผู้ใช้ -->
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
              <!-- รูปภาพผู้ใช้ (avatar) -->
              <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <!-- ชื่อผู้ใช้ -->
              <span class="text-sm text-white font-medium truncate max-w-32 xl:max-w-none">{{ userName }}</span>
            </div>
            
            <!-- ปุ่มออกจากระบบสำหรับเดสก์ท็อป -->
            <button 
              @click="logout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        <!-- ข้อมูลผู้ใช้และปุ่มออกจากระบบสำหรับแท็บเล็ต -->
        <div class="hidden md:flex lg:hidden items-center space-x-3 flex-shrink-0">
          <div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-2">
            <!-- รูปภาพผู้ใช้ขนาดเล็ก -->
            <div class="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
          <!-- ปุ่มออกจากระบบขนาดเล็ก -->
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

      <!-- เมนูมือถือถูกย้ายไปจัดการใน LayoutWrapper แล้ว -->
      <!-- ลบ Mobile Menu ออกจาก Navbar เนื่องจากย้ายไปจัดการใน LayoutWrapper แล้ว -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  
  // ปรับแต่ง Props ที่รับจาก parent component
  props: {
    showMobileMenu: {
      type: Boolean,
      default: false
    }
  },
  
  // กำหนด Events ที่สามารถ emit ไปยัง parent component
  emits: ['toggle-mobile-menu'],
  
  // ข้อมูลที่ใช้ใน component
  data() {
    return {
      companyName: 'บริษัท ABC จำกัด', // ชื่อบริษัท (สามารถดึงจาก API ได้)
      userName: 'ผู้ประสานงานคู่ธุรกิจ' // ชื่อผู้ใช้ (สามารถดึงจาก API ได้)
    }
  },
  // เมท็อดต่างๆ ของ component
  methods: {
    /**
     * ฟังก์ชัน logout - จัดการการออกจากระบบ
     * แสดงการยืนยันและนำทางไปหน้า login
     */
    logout() {
      if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
        // ล้างข้อมูลผู้ใช้จาก localStorage
        localStorage.removeItem('auth')
        localStorage.removeItem('userInfo')
        
        // นำทางไปยังหน้าเข้าสู่ระบบ
        this.$router.push('/')
      }
    }
  }
}
</script>