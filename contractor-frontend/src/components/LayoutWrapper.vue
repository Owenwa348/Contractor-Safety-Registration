<!-- LayoutWrapper.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <Navbar @toggle-mobile-menu="toggleMobileSidebar" :show-mobile-menu="showMobileSidebar" />
    
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="showMobileSidebar" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="closeMobileSidebar"
    />
    
    <div class="flex">
      <!-- Desktop Sidebar - Always visible on lg+ screens -->
      <Sidebar 
        class="hidden lg:block fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-white shadow-sm border-r border-gray-100 overflow-y-auto z-10" 
      />
      
      <!-- Mobile Sidebar - Slide in from left -->
      <div 
        class="lg:hidden fixed top-16 left-0 w-80 h-[calc(100vh-4rem)] bg-white shadow-xl border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto"
        :class="showMobileSidebar ? 'translate-x-0' : '-translate-x-full'"
      >
        <!-- Mobile Sidebar Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-900">เมนูหลัก</h3>
          <button 
            @click="closeMobileSidebar"
            class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="ปิดเมนู"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Sidebar Content -->
        <Sidebar class="block" @menu-click="closeMobileSidebar" />
      </div>
      
      <!-- Main Content Area -->
      <main 
        class="flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out"
        :class="mainContentClass"
      >
        <div class="p-4 sm:p-6">
          <!-- Step Progress - Responsive -->
          <div class="mb-4">
            <StepProgress />
          </div>
          
          <!-- Page Content -->
          <div class="mt-3">
            <slot />
          </div>
        </div>
      </main>
    </div>
    
    <!-- Mobile Menu Toggle Button (FAB style) - Only visible when sidebar is closed -->
    <button
      v-if="!showMobileSidebar"
      @click="openMobileSidebar"
      class="lg:hidden fixed bottom-6 left-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30 flex items-center justify-center"
      aria-label="เปิดเมนู"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from './Navbar.vue'
import Sidebar from './SidebarAll/Sidebar.vue'
import StepProgress from './StepProgress.vue'

// Reactive state
const showMobileSidebar = ref(false)
const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

// Computed properties
const mainContentClass = computed(() => {
  return {
    // Desktop: Always offset by sidebar width
    'lg:ml-60': true,
    // Mobile/Tablet: Full width
    'ml-0': true
  }
})

// Methods
const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

const openMobileSidebar = () => {
  showMobileSidebar.value = true
}

const closeMobileSidebar = () => {
  showMobileSidebar.value = false
}

const handleResize = () => {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth
    
    // Auto-close mobile sidebar on desktop
    if (screenWidth.value >= 1024) {
      showMobileSidebar.value = false
    }
  }
}

const handleKeydown = (e) => {
  // Close sidebar on Escape key
  if (e.key === 'Escape' && showMobileSidebar.value) {
    closeMobileSidebar()
  }
}

// Lifecycle hooks
onMounted(() => {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth
    window.addEventListener('resize', handleResize)
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Expose methods for parent components
defineExpose({
  toggleMobileSidebar,
  closeMobileSidebar,
  showMobileSidebar
})
</script>

<style scoped>
/* Custom scrollbar for mobile sidebar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8fafc;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Prevent body scroll when mobile sidebar is open */
body.mobile-sidebar-open {
  overflow: hidden;
}

/* Smooth transitions for all screen sizes */
@media (max-width: 1023px) {
  .main-content {
    padding-left: 0 !important;
  }
}

/* Ensure mobile sidebar is above other content */
@media (max-width: 1023px) {
  .mobile-sidebar {
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}

/* FAB button animation */
.fab-button {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>