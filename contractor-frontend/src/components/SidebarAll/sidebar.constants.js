// sidebar.constants.js

/**
 * การกำหนดค่าคงที่สำหรับ Sidebar
 * ไฟล์นี้จัดการเมนูและไอคอนทั้งหมดของระบบ
 */

// สร้าง Vue Icon Components สำหรับใช้ใน Sidebar
export const ICONS = {
  // ไอคอนจัดการทีม - ใช้กับ "จัดการรายชื่อพนักงานตามสังกัด"
  UsersIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    `
  },

  // ไอคอนเอกสาร - ใช้กับรายชื่อและดาวน์โหลด
  DocumentTextIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    `
  },

  // ไอคอนปฏิทิน - ใช้กับ "จองอบรม"
  CalendarIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    `
  },

  // ไอคอนดินสอ - ใช้กับ "ประเมินความรู้"
  PencilIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    `
  },

  // ไอคอนเพิ่มผู้ใช้ - ใช้กับเมนูผู้ประสานงาน
  UserPlusIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    `
  },

  // ไอคอนเช็คมาร์ก - ใช้กับ "การอนุมัติ"
  CheckCircleIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `
  },

  // ไอคอนโล่ - ใช้กับ "ความปลอดภัย"
  ShieldCheckIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    `
  },

  // ไอคอนเครื่องพิมพ์ - ใช้กับ "พิมพ์บัตร"
  PrinterIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    `
  },

  // ไอคอนหนังสือ - ใช้กับ "สร้างการฝึกอบรม"
  BookOpenIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    `
  },

  // ไอคอนเฟือง - ใช้กับ "การตั้งค่า"
  CogIcon: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    `
  }
};

/**
 * รายการเมนูหลัก - เรียงตามลำดับขั้นตอนการทำงาน
 * 
 * โครงสร้างของแต่ละเมนู:
 * - name: ชื่อที่แสดงในเมนู
 * - path: URL path สำหรับ routing
 * - step: ลำดับขั้นตอน (1, 2, 3)
 * - icon: ชื่อ icon component
 * - userRole: สิทธิ์การเข้าถึง ('contractor' หรือ 'safety')
 */
export const MENU_ITEMS = [
  // ขั้นตอนที่ 1: จัดการข้อมูลพนักงาน
  {
    name: 'จัดการรายชื่อพนักงานตามสังกัด',
    path: '/manage-team',
    step: 1,
    icon: 'UsersIcon',
    userRole: 'contractor' // เห็นเฉพาะผู้รับเหมา
  },
  {
    name: 'รายชื่อพนักงานตามสังกัด',
    path: '/list-employees',
    icon: 'DocumentTextIcon',
    userRole: 'safety' // เห็นเฉพาะเจ้าหน้าที่ความปลอดภัย
  },

  // ขั้นตอนที่ 2: จองอบรม
  {
    name: 'จองอบรม',
    path: '/training-booking',
    step: 2,
    icon: 'CalendarIcon',
    userRole: 'contractor' // เห็นเฉพาะผู้รับเหมา
  },
  {
    name: 'ดาวโหลดรายชื่อที่มาอบรม',
    path: '/download-training-list',
    icon: 'DocumentTextIcon',
    userRole: 'safety' // เห็นเฉพาะเจ้าหน้าที่ความปลอดภัย
  },

  // ขั้นตอนที่ 3: ประเมินผล
  {
    name: 'ประเมินความรู้',
    path: '/take-exam',
    step: 3,
    icon: 'PencilIcon',
    userRole: 'contractor' // เห็นเฉพาะผู้รับเหมา
  }
];

/**
 * ฟังก์ชันช่วยกรองเมนูตามสิทธิ์ผู้ใช้
 * @param {string} userRole - บทบาทของผู้ใช้ ('contractor' หรือ 'safety')
 * @returns {Array} รายการเมนูที่ผู้ใช้สามารถเข้าถึงได้
 */
export const getMenuByUserRole = (userRole) => {
  return MENU_ITEMS.filter(item => item.userRole === userRole);
};