// sidebar.verte.js

/**
 * การกำหนดค่าคงที่สำหรับเมนูผู้ดูแลระบบ Verte
 * ไฟล์นี้จัดการเมนูและไอคอนของผู้ดูแลระบบเท่านั้น
 */

// ไอคอนสำหรับเมนูผู้ดูแลระบบ Verte
export const VERTE_ICONS = {
  // ไอคอนจัดการทีม - ใช้กับ "จัดการผู้ใช้งาน"
  UsersIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    `
  },

  // ไอคอนเฟือง - ใช้กับ "การตั้งค่าระบบ"
  CogIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    `
  },

  // ไอคอนฐานข้อมูล - ใช้กับ "จัดการฐานข้อมูล"
  DatabaseIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    `
  },

  // ไอคอนรายงาน - ใช้กับ "รายงานระบบ"
  ChartBarIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    `
  },

  // ไอคอนผู้ใช้ Shield - ใช้กับ "จัดการสิทธิ์"
  UserShieldIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1v6m6-6v6" />
      </svg>
    `
  },

  // ไอคอนเครื่องมือ - ใช้กับ "บำรุงรักษาระบบ"
  WrenchIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    `
  },

  // ไอคอนการแจ้งเตือน - ใช้กับ "การจัดการแจ้งเตือน"
  BellIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 17h5l-3.405-3.405A3.5 3.5 0 0115 9.5V7a6 6 0 00-6-6c-3.314 0-6 2.686-6 6v2.5a3.5 3.5 0 01-1.595 3.095L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    `
  },

  // ไอคอนการสำรองข้อมูล - ใช้กับ "สำรองข้อมูล"
  CloudDownloadIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    `
  }
};

/**
 * รายการเมนูผู้ดูแลระบบ Verte
 * สำหรับผู้ดูแลระบบที่มีสิทธิ์สูงสุด
 */
export const VERTE_MENU_ITEMS = [
  {
    path: '/verte/user-management',
    name: 'จัดการผู้ใช้งาน',
    icon: 'UsersIcon',
    description: 'จัดการบัญชีผู้ใช้งานและสิทธิ์การเข้าถึง',
    category: 'user'
  },
  {
    path: '/verte/system-config',
    name: 'การตั้งค่าระบบ',
    icon: 'CogIcon',
    description: 'กำหนดค่าระบบและพารามิเตอร์ต่างๆ',
    category: 'system'
  },
  {
    path: '/verte/database-management',
    name: 'จัดการฐานข้อมูล',
    icon: 'DatabaseIcon',
    description: 'จัดการฐานข้อมูลและการสำรองข้อมูล',
    category: 'database'
  },
  {
    path: '/verte/reports',
    name: 'รายงานระบบ',
    icon: 'ChartBarIcon',
    description: 'ดูรายงานและสถิติการใช้งานระบบ',
    category: 'report'
  },
  {
    path: '/verte/permissions',
    name: 'จัดการสิทธิ์การเข้าถึง',
    icon: 'UserShieldIcon',
    description: 'กำหนดสิทธิ์และระดับการเข้าถึงข้อมูล',
    category: 'security'
  },
  {
    path: '/verte/system-maintenance',
    name: 'บำรุงรักษาระบบ',
    icon: 'WrenchIcon',
    description: 'การบำรุงรักษาและแก้ไขปัญหาระบบ',
    category: 'maintenance'
  },
  {
    path: '/verte/notifications',
    name: 'จัดการการแจ้งเตือน',
    icon: 'BellIcon',
    description: 'ตั้งค่าและจัดการระบบแจ้งเตือน',
    category: 'notification'
  },
  {
    path: '/verte/backup',
    name: 'สำรองข้อมูล',
    icon: 'CloudDownloadIcon',
    description: 'จัดการการสำรองข้อมูลและการกู้คืน',
    category: 'backup'
  }
];

/**
 * ฟังก์ชันช่วยกรองเมนู Verte ตามหมวดหมู่
 * @param {string} category - หมวดหมู่ ('user', 'system', 'database', 'report', 'security', 'maintenance', 'notification', 'backup')
 * @returns {Array} รายการเมนูในหมวดหมู่ที่ระบุ
 */
export const getVerteMenuByCategory = (category) => {
  return VERTE_MENU_ITEMS.filter(item => item.category === category);
};

/**
 * ฟังก์ชันช่วยเรียงเมนู Verte ตามลำดับความสำคัญ
 * @returns {Array} รายการเมนูที่เรียงแล้ว
 */
export const getSortedVerteMenu = () => {
  const priorityOrder = ['user', 'system', 'security', 'database', 'report', 'maintenance', 'notification', 'backup'];
  return VERTE_MENU_ITEMS.sort((a, b) => {
    return priorityOrder.indexOf(a.category) - priorityOrder.indexOf(b.category);
  });
};