//sidebar.vue
<template>
  <div class="w-64 bg-white shadow-sm h-screen sticky top-16">
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-6">จัดการรายชื่อพนักงาน</h2>
      
      <nav class="space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-200"
          :class="[
            $route.path === item.path 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          <span>{{ item.name }}</span>
          
          <!-- Step indicator -->
          <span 
            v-if="item.step"
            class="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-xs"
            :class="[
              $route.path === item.path 
                ? 'bg-white text-blue-600' 
                : 'bg-gray-200 text-gray-600'
            ]"
          >
            {{ item.step }}
          </span>
        </router-link>
        <h2 class="text-lg font-semibold text-gray-800 mb-6">จัดการผู้ประสานงานคู่ธุรกิจ</h2>
        
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      menuItems: [
        {
          name: 'จัดการรายชื่อพนักงานตามสังกัด',
          path: '/manage-team',
          step: 1,
          icon: 'UsersIcon'
        },
        {
          name: 'จัดการเอกสาร',
          path: '/upload',
          step: 2,
          icon: 'DocumentTextIcon'
        },
        {
          name: 'รอการอนุมัติ',
          path: '/approval-owner',
          step: 3,
          icon: 'ClockIcon'
        },
        {
          name: 'จองอบรม',
          path: '/training-booking',
          step: 4,
          icon: 'CalendarIcon'
        },
        {
          name: 'เข้าอบรม',
          path: '/attend-training',
          step: 5,
          icon: 'AcademicCapIcon'
        },
        {
          name: 'QR ดาวน์โหลดรายชื่อ',
          path: '/download-list-qr',
          step: 6,
          icon: 'QrcodeIcon'
        },
        {
          name: 'ประเมินความรู้',
          path: '/take-exam',
          step: 7,
          icon: 'PencilIcon'
        },
        {
          name: 'ระบบจัดการบัตร',
          path: '/print-card',
          step: 8,
          icon: 'IdentificationIcon'
        }
      ]
    }
  },
  components: {
    UserPlusIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>`
    },
    UsersIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>`
    },
    DocumentTextIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`
    },
    ClockIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
    },
    CalendarIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`
    },
    AcademicCapIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>`
    },
    QrcodeIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zm12 0h2a1 1 0 001-1V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1zM5 20h2a1 1 0 001-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1z"/></svg>`
    },
    PencilIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>`
    },
    IdentificationIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-6 0"/></svg>`
    }
  }
}
</script>