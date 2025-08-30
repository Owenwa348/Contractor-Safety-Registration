// sidebar.partner.js

/**
 * การกำหนดค่าคงที่สำหรับเมนูผู้ประสานงานคู่ธุรกิจ
 * ไฟล์นี้จัดการเมนูและไอคอนของผู้ประสานงานเท่านั้น
 */

// ไอคอนสำหรับเมนูผู้ประสานงานคู่ธุรกิจ
export const PARTNER_ICONS = {
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
 * รายการเมนูผู้ประสานงานคู่ธุรกิจ
 * สำหรับเจ้าหน้าที่ที่มีหน้าที่อนุมัติและจัดการ
 */
export const PARTNER_MENU_ITEMS = [
  {
    path: '/approval-officer',
    name: 'การอนุมัติผู้ประสานงานคู่ธุรกิจ',
    icon: 'CheckCircleIcon',
    description: 'อนุมัติและจัดการผู้ประสานงานคู่ธุรกิจ'
  },
  {
    path: '/approval-safety',
    name: 'การอนุมัติผู้ประสานงานด้านความปลอดภัย',
    icon: 'ShieldCheckIcon',
    description: 'อนุมัติผู้ประสานงานด้านความปลอดภัย'
  },
  {
    path: '/print-card',
    name: 'พิมพ์บัตรพนักงาน',
    icon: 'PrinterIcon',
    description: 'พิมพ์และจัดการบัตรประจำตัวพนักงาน'
  },
  {
    path: '/create-training',
    name: 'สร้างการฝึกอบรม',
    icon: 'BookOpenIcon',
    description: 'สร้างและจัดการหลักสูตรฝึกอบรม'
  },
  {
    path: '/setting',
    name: 'การตั้งค่า',
    icon: 'CogIcon',
    description: 'การตั้งค่าระบบสำหรับผู้ประสานงาน'
  }
];