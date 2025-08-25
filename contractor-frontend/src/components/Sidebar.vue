<template>
  <aside class="w-60 bg-white shadow-sm h-screen sticky top-16 border-r border-gray-100 overflow-y-auto">
    <nav class="p-4">
      <!-- Employee Management Section -->
      <section class="mb-8">
        <h2 class="text-base font-semibold text-gray-900 mb-4 px-2 border-b border-gray-100 pb-2">
          จัดการรายชื่อพนักงาน
        </h2>
        
        <ul class="space-y-1">
          <li v-for="item in employeeMenuItems" :key="item.path">
            <router-link
              :to="item.path"
              class="group flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm"
              :class="{ 
                'bg-blue-100 text-blue-800 font-medium shadow-sm border-l-4 border-blue-500': isCurrentRoute(item.path),
                'hover:translate-x-1': !isCurrentRoute(item.path)
              }"
              :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
            >
              <component 
                :is="item.icon" 
                class="w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-200"
                :class="{ 
                  'text-blue-600': isCurrentRoute(item.path), 
                  'text-gray-500 group-hover:text-blue-600': !isCurrentRoute(item.path) 
                }"
                aria-hidden="true"
              />
              <span class="flex-1 min-w-0 leading-relaxed">{{ item.name }}</span>
              <span 
                v-if="item.step"
                class="ml-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors duration-200"
                :class="{ 
                  'bg-blue-200 text-blue-800': isCurrentRoute(item.path), 
                  'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700': !isCurrentRoute(item.path) 
                }"
                :aria-label="`ขั้นตอนที่ ${item.step}`"
              >
                {{ item.step }}
              </span>
            </router-link>
          </li>
        </ul>
      </section>

      <!-- Business Partner Section -->
      <section>
        <h2 class="text-base font-semibold text-gray-900 mb-4 px-2 border-b border-gray-100 pb-2">
          จัดการผู้ประสานงานคู่ธุรกิจ
        </h2>
        
        <ul class="space-y-1">
          <li v-for="item in partnerMenuItems" :key="item.path">
            <router-link 
              :to="item.path"
              class="group flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm"
              :class="{ 
                'bg-blue-100 text-blue-800 font-medium shadow-sm border-l-4 border-blue-500': isCurrentRoute(item.path),
                'hover:translate-x-1': !isCurrentRoute(item.path)
              }"
              :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
            >
              <UserPlusIcon 
                class="w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-200"
                :class="{ 
                  'text-blue-600': isCurrentRoute(item.path), 
                  'text-gray-500 group-hover:text-blue-600': !isCurrentRoute(item.path) 
                }"
                aria-hidden="true" 
              />
              <span class="flex-1 min-w-0 leading-relaxed">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </section>
    </nav>
  </aside>
</template>

<script>
import { MENU_ITEMS, ICONS } from './sidebar.constants.js'

export default {
  name: 'AppSidebar',
  
  components: {
    ...ICONS
  },
  
  computed: {
    employeeMenuItems() {
      return MENU_ITEMS
    },
    partnerMenuItems() {
      return [
        { path: '/approval-officer', name: 'การอนุมัติผู้ประสานงานคู่ธุรกิจ' },
        { path: '/approval-safety', name: 'การอนุมัติผู้ประสานงานด้านความปลอดภัย' },
        { path: '/print-card', name: 'พิมพ์บัตรพนักงาน' },
        { path: '/create-training', name: 'สร้างการฝึกอบรม' },
        { path: '/setting', name: 'การตั้งค่า' }
      ]
    }
  },
  
  methods: {
    isCurrentRoute(path) {
      return this.$route.path === path
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #f8fafc;
}

aside::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions */
.router-link-active {
  transform: translateX(0) !important;
}
</style>