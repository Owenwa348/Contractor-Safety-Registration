<!-- MobileSidebar.vue -->
<template>
  <nav class="p-4 space-y-6">
    
    <!-- ส่วนที่ 1: เมนูจัดการพนักงาน -->
    <section>
      <h2 class="text-sm font-bold text-gray-900 mb-3 px-2 pb-2 border-b border-gray-100">
        จัดการรายชื่อพนักงาน
      </h2>
      
      <ul class="space-y-1">
        <li v-for="item in employeeMenuItems" :key="item.path">
          <router-link
            :to="item.path"
            @click="$emit('menu-click')"
            class="group flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            :class="menuLinkClass(item.path)"
            :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
          >
            <!-- ไอคอนของเมนู -->
            <component 
              :is="item.icon" 
              class="w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-200"
              :class="iconClass(item.path)"
              aria-hidden="true"
            />
            
            <!-- ชื่อเมนูและคำอธิบาย -->
            <div class="flex-1 min-w-0">
              <div class="font-medium leading-tight">{{ item.name }}</div>
              <div v-if="item.description" class="text-xs text-gray-500 mt-0.5">
                {{ item.description }}
              </div>
            </div>
            
            <!-- หมายเลขขั้นตอน -->
            <span 
              v-if="item.step"
              class="ml-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-200"
              :class="stepBadgeClass(item.path)"
            >
              {{ item.step }}
            </span>
            
            <!-- Arrow indicator -->
            <svg 
              class="w-4 h-4 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </li>
      </ul>
    </section>

    <!-- ส่วนที่ 2: เมนูผู้ประสานงานคู่ธุรกิจ -->
    <section>
      <h2 class="text-sm font-bold text-gray-900 mb-3 px-2 pb-2 border-b border-gray-100">
        จัดการผู้ประสานงานคู่ธุรกิจ
      </h2>
      
      <ul class="space-y-1">
        <li v-for="item in partnerMenuItems" :key="item.path">
          <router-link 
            :to="item.path"
            @click="$emit('menu-click')"
            class="group flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            :class="menuLinkClass(item.path)"
            :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
          >
            <!-- ไอคอนของเมนู -->
            <component 
              :is="item.icon"
              class="w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-200"
              :class="iconClass(item.path)"
              aria-hidden="true" 
            />
            
            <div class="flex-1 min-w-0">
              <div class="font-medium leading-tight">{{ item.name }}</div>
              <div v-if="item.description" class="text-xs text-gray-500 mt-0.5">
                {{ item.description }}
              </div>
            </div>
            
            <svg 
              class="w-4 h-4 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </li>
      </ul>
    </section>

    <!-- ส่วนที่ 3: เมนูผู้ดูแลระบบ Verte -->
    <section>
      <h2 class="text-sm font-bold text-gray-900 mb-3 px-2 pb-2 border-b border-gray-100">
        Verte
      </h2>
      
      <ul class="space-y-1">
        <li v-for="item in verteMenuItems" :key="item.path">
          <router-link 
            :to="item.path"
            @click="$emit('menu-click')"
            class="group flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            :class="menuLinkClass(item.path)"
            :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
          >
            <!-- ไอคอนของเมนู -->
            <component 
              :is="item.icon"
              class="w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-200"
              :class="iconClass(item.path)"
              aria-hidden="true" 
            />
            
            <div class="flex-1 min-w-0">
              <div class="font-medium leading-tight">{{ item.name }}</div>
              <div v-if="item.description" class="text-xs text-gray-500 mt-0.5">
                {{ item.description }}
              </div>
            </div>
            
            <svg 
              class="w-4 h-4 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </li>
      </ul>
    </section>
    
    <!-- Quick Actions Section -->
    <section class="pt-4 border-t border-gray-100">
      <div class="grid grid-cols-2 gap-2">
        <button 
          @click="$emit('menu-click')"
          class="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
          </svg>
          <span class="text-xs font-medium">พนักงาน</span>
        </button>
        
        <button 
          @click="$emit('menu-click')"
          class="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-700"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <span class="text-xs font-medium">อบรม</span>
        </button>
      </div>
    </section>
    
  </nav>
</template>

<script>
import { MENU_ITEMS, ICONS } from '../SidebarAll/sidebar.constants.js'
import { PARTNER_MENU_ITEMS, PARTNER_ICONS } from '../SidebarAll/sidebar.partner.js'
import { VERTE_MENU_ITEMS, VERTE_ICONS } from '../SidebarAll/sidebar.verte.js'

export default {
  name: 'MobileSidebar',
  
  emits: ['menu-click'],
  
  // ลงทะเบียน Icon Components
  components: {
    ...ICONS,
    ...PARTNER_ICONS,
    ...VERTE_ICONS
  },
  
  computed: {
    employeeMenuItems() {
      return MENU_ITEMS.map(item => ({
        ...item,
        description: this.getMenuDescription(item.path)
      }));
    },
    
    partnerMenuItems() {
      return PARTNER_MENU_ITEMS.map(item => ({
        ...item,
        description: this.getMenuDescription(item.path)
      }));
    },

    verteMenuItems() {
      return VERTE_MENU_ITEMS.map(item => ({
        ...item,
        description: this.getMenuDescription(item.path)
      }));
    }
  },
  
  methods: {
    isCurrentRoute(path) {
      return this.$route.path === path;
    },
    
    menuLinkClass(path) {
      return {
        'bg-blue-100 text-blue-800 font-medium shadow-sm border-l-4 border-blue-500': this.isCurrentRoute(path)
      };
    },
    
    iconClass(path) {
      return {
        'text-blue-600': this.isCurrentRoute(path),
        'text-gray-500 group-hover:text-blue-600': !this.isCurrentRoute(path)
      };
    },
    
    stepBadgeClass(path) {
      return {
        'bg-blue-200 text-blue-800': this.isCurrentRoute(path),
        'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700': !this.isCurrentRoute(path)
      };
    },
    
    getMenuDescription(path) {
      const descriptions = {
        '/manage-team': '',
        '/training-booking': '',
        '/book-training': '',
        '/take-exam': '',
        '/approval-officer': '',
        '/approval-safety': '',
        '/print-card': '',
        '/create-training': '',
        '/setting': '',
        '/list-employees': '',
        '/download-training-list': ''
      };
      return descriptions[path] || '';
    }
  }
}
</script>

<style scoped>
/* Touch-friendly styling for mobile */
@media (max-width: 640px) {
  .router-link {
    min-height: 48px;
  }
}

/* Active link animation */
.router-link-active {
  position: relative;
}

.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
  border-radius: 0 2px 2px 0;
}
</style>