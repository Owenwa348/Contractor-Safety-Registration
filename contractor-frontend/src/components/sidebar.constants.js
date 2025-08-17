// ฟังก์ชันสร้าง Icon Template ให้ลดการซ้ำของ attribute
const createIcon = (paths) => ({
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      ${paths
        .map(
          (d) => `
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="${d}" 
        />`
        )
        .join('')}
    </svg>
  `
})

export const MENU_ITEMS = [
  { name: 'จัดการรายชื่อพนักงานตามสังกัด', path: '/manage-team', step: 1, icon: 'UsersIcon' },
  { name: 'จองอบรม', path: '/training-booking', step: 2, icon: 'CalendarIcon' },
  { name: 'ประเมินความรู้', path: '/take-exam', step: 3, icon: 'PencilIcon' },
]

export const ICONS = {
  UserPlusIcon: createIcon([
    "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
  ]),
  UsersIcon: createIcon([
    "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
  ]),
  DocumentTextIcon: createIcon([
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  ]),
  ClockIcon: createIcon([
    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  ]),
  CalendarIcon: createIcon([
    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  ]),
  AcademicCapIcon: createIcon([
    "M12 14l9-5-9-5-9 5 9 5z",
    "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
  ]),
  QrcodeIcon: createIcon([
    "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zm12 0h2a1 1 0 001-1V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1zM5 20h2a1 1 0 001-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1z"
  ]),
  PencilIcon: createIcon([
    "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
  ]),
  IdentificationIcon: createIcon([
    "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-6 0"
  ])
}
