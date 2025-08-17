<template>
  <aside class="w-56 bg-white shadow-sm h-screen sticky top-16 border-r border-gray-100">
    <nav class="p-4">
      <!-- Employee Management Section -->
      <section class="mb-6">
        <h2 class="text-base font-medium text-gray-900 mb-3 px-2">
          จัดการรายชื่อพนักงาน
        </h2>
        
        <ul class="space-y-1">
          <li v-for="item in employeeMenuItems" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              :class="{ 'bg-blue-50 text-blue-700 font-medium': isCurrentRoute(item.path) }"
              :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
            >
              <component 
                :is="item.icon" 
                class="w-4 h-4 mr-2.5 flex-shrink-0"
                :class="{ 'text-blue-600': isCurrentRoute(item.path), 'text-gray-400': !isCurrentRoute(item.path) }"
                aria-hidden="true"
              />
              <span class="flex-1 truncate">{{ item.name }}</span>
              <span 
                v-if="item.step"
                class="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                :class="{ 'bg-blue-100 text-blue-700': isCurrentRoute(item.path), 'bg-gray-100 text-gray-500': !isCurrentRoute(item.path) }"
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
        <h2 class="text-base font-medium text-gray-900 mb-3 px-2">
          จัดการผู้ประสานงานคู่ธุรกิจ
        </h2>
        
        <ul class="space-y-1">
          <li v-for="item in partnerMenuItems" :key="item.path">
            <router-link 
              :to="item.path"
              class="flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              :class="{ 'bg-blue-50 text-blue-700 font-medium': isCurrentRoute(item.path) }"
              :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
            >
              <UserPlusIcon 
                class="w-4 h-4 mr-2.5 flex-shrink-0"
                :class="{ 'text-blue-600': isCurrentRoute(item.path), 'text-gray-400': !isCurrentRoute(item.path) }"
                aria-hidden="true" 
              />
              <span class="truncate">{{ item.name }}</span>
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
        { path: '/download-list-qr', name: 'การดาวน์โหลดรายชื่อ QR Code' },
        { path: '/print-card', name: 'พิมพ์บัตรพนักงาน' }
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
