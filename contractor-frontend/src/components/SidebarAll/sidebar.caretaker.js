// sidebar.caretaker.js

/**
 * การกำหนดค่าคงที่สำหรับเมนูผู้ดูแลระบบ Caretaker
 * ไฟล์นี้จัดการเมนูและไอคอนของผู้ดูแลระบบระดับสูงสุด
 */

// ไอคอนสำหรับเมนูผู้ดูแลระบบ Caretaker
export const CARETAKER_ICONS = {
  // ไอคอนจัดการผู้ใช้งาน
  UsersIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    `
  },

  // ไอคอนรายงานระบบ
  ChartBarIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    `
  },

  // ไอคอนการแจ้งเตือน
  BellIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 17h5l-3.405-3.405A3.5 3.5 0 0115 9.5V7a6 6 0 00-6-6c-3.314 0-6 2.686-6 6v2.5a3.5 3.5 0 01-1.595 3.095L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    `
  },
};

/**
 * รายการเมนูผู้ดูแลระบบ Caretaker
 * สำหรับผู้ดูแลระบบที่มีสิทธิ์สูงสุด
 */
export const CARETAKER_MENU_ITEMS = [
  {
    path: '/caretaker-user-management',
    name: 'จัดการผู้ใช้งาน',
    icon: 'UsersIcon',
    description: 'จัดการบัญชีผู้ใช้งาน บทบาท และสิทธิ์การเข้าถึง',
    category: 'user-management',
    priority: 1
  },
];

/**
 * เมนูรายงานและสถิติสำหรับ Caretaker
 */
export const CARETAKER_REPORT_ITEMS = [
  {
    path: '/caretaker-system-reports',
    name: 'รายงานระบบ',
    icon: 'ChartBarIcon',
    description: 'รายงานการใช้งานระบบและสถิติต่างๆ',
    category: 'reports'
  },
  {
    path: '/caretaker-audit-logs',
    name: 'บันทึกการตรวจสอบ',
    icon: 'BellIcon',
    description: 'ประวัติการใช้งานและการเปลี่ยนแปลงในระบบ',
    category: 'audit'
  }
];

/**
 * ฟังก์ชันช่วยกรองเมนู Caretaker ตามหมวดหมู่
 * @param {string} category - หมวดหมู่ ('user-management', 'security', 'system', 'database', 'reports', 'audit')
 * @returns {Array} รายการเมนูในหมวดหมู่ที่ระบุ
 */
export const getCaretakerMenuByCategory = (category) => {
  const allMenus = [...CARETAKER_MENU_ITEMS, ...CARETAKER_REPORT_ITEMS];
  return allMenus.filter(item => item.category === category);
};

/**
 * ฟังก์ชันช่วยเรียงเมนู Caretaker ตามลำดับความสำคัญ
 * @returns {Array} รายการเมนูที่เรียงแล้ว
 */
export const getSortedCaretakerMenu = () => {
  return CARETAKER_MENU_ITEMS.sort((a, b) => {
    return (a.priority || 999) - (b.priority || 999);
  });
};

/**
 * ฟังก์ชันตรวจสอบสิทธิ์เข้าถึงเมนู
 * @param {string} userRole - บทบาทของผู้ใช้
 * @param {string} menuPath - path ของเมนู
 * @returns {boolean} true หากมีสิทธิ์เข้าถึง
 */
export const canAccessCaretakerMenu = (userRole, menuPath) => {
  // เฉพาะ caretaker เท่านั้นที่เข้าถึงเมนูนี้ได้
  if (userRole !== 'caretaker') {
    return false;
  }
  
  // ตรวจสอบว่าเป็นเมนู caretaker หรือไม่
  const allMenus = [...CARETAKER_MENU_ITEMS, ...CARETAKER_REPORT_ITEMS];
  return allMenus.some(menu => menu.path === menuPath);
};

/**
 * ฟังก์ชันสำหรับจัดกลุ่มเมนูตามหมวดหมู่
 * @returns {Object} เมนูที่จัดกลุ่มแล้ว
 */
export const getGroupedCaretakerMenus = () => {
  const groups = {
    core: {
      title: 'การจัดการหลัก',
      items: getCaretakerMenuByCategory('user-management')
        .concat(getCaretakerMenuByCategory('security'))
    },
    system: {
      title: 'ระบบและฐานข้อมูล',
      items: getCaretakerMenuByCategory('system')
        .concat(getCaretakerMenuByCategory('database'))
    },
    monitoring: {
      title: 'การตรวจสอบและรายงาน',
      items: getCaretakerMenuByCategory('reports')
        .concat(getCaretakerMenuByCategory('audit'))
    }
  };
  
  return groups;
};

/**
 * คอนฟิกพิเศษสำหรับ Caretaker Dashboard
 */
export const CARETAKER_DASHBOARD_CONFIG = {
  defaultRoute: '/caretaker-user-management',
  features: {
    showSystemHealth: true,
    showUserStatistics: true,
    showSecurityAlerts: true,
    showDatabaseStatus: true,
    autoRefreshInterval: 30000 // 30 วินาที
  },
  permissions: {
    canModifyAllUsers: true,
    canAccessSystemLogs: true,
    canBackupDatabase: true,
    canModifySystemSettings: true,
    canViewAuditTrails: true
  }
};

/**
 * ฟังก์ชันสำหรับสร้างเมนูแบบ responsive
 * @param {boolean} isMobile - true ถ้าเป็นมือถือ
 * @returns {Array} รายการเมนูที่เหมาะสมกับอุปกรณ์
 */
export const getCaretakerMenuForDevice = (isMobile = false) => {
  const baseMenus = getSortedCaretakerMenu();
  
  if (isMobile) {
    // สำหรับมือถือ แสดงเฉพาะเมนูสำคัญ
    return baseMenus.filter(menu => menu.priority <= 2);
  }
  
  return baseMenus;
};

/**
 * ฟังก์ชันตรวจสอบสถานะเมนู
 * @param {string} currentPath - path ปัจจุบัน
 * @param {string} menuPath - path ของเมนู
 * @returns {boolean} true ถ้าเป็นเมนูที่ active
 */
export const isCaretakerMenuActive = (currentPath, menuPath) => {
  return currentPath === menuPath || currentPath.startsWith(menuPath + '/');
};