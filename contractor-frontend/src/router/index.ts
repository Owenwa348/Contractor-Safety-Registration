// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
//Login/contractor
import Login from '../views/Login/Coordinator/LoginCoordinator.vue'
import CheckPermissions from '../views/Login/Coordinator/CheckPermissionsContractor.vue'
import ContractorRegistration from '../views/Login/Coordinator/ContractorRegistration.vue'
import ForgotPasswordCoordinator from '../views/Login/Coordinator/ForgotPasswordCoordinator.vue'
//
//Login/Owner and safety
import LoginOwnerAndSafety from '../views/Login/Owner and safety/LoginOwnerAndSafety.vue'
import SetPasswordOwnerAndSafety from '../views/Login/Owner and safety/SetPasswordOwnerAndSafety.vue'
import ForgotPasswordOwnerAndSafety from '../views/Login/Owner and safety/ForgotPasswordOwnerAndSafety.vue'
//
import AddContractor from '../views/contractor/ManageTeam/AddContractor.vue'
import ManageTeam from '../views/contractor/ManageTeam/ManageTeam.vue'
import TrainingBooking from '../views/contractor/TrainingBooking.vue'
import ListEmployees from '../views/SecurityDepartment/ListEmployees/ListEmployees.vue'
import TakeExam from '../views/contractor/TakeExam/TakeExam.vue'
import PrintCard from '../views/SecurityDepartment/PrintCard/PrintCard.vue'
import DownloadTrainingList from '../views/SecurityDepartment/DownloadTrainingList/DownloadTrainingList.vue'
import NotFound from '../views/NotFound.vue'
import ApprovalOfficer from '../views/Manager/ApprovalOfficer.vue'
import ApprovalSafety from '../views/SecurityDepartment/ApprovalSafety.vue'// เพิ่มการนำเข้า ApprovalSafety
import CertificaAdd from '../views/contractor/CertificaAdd/CertificaAdd.vue' // เพิ่มการนำเข้า CertificaAdd
import BookTraining from '../views/contractor/BookTraining.vue' // เพิ่มการนำเข้า BookTraining
import CreateTraining from '../views/SecurityDepartment/CreateTraining/CreateTraining.vue'
import Setting from '../views/SecurityDepartment/SettingSecurityDepartment/Setting.vue' // เพิ่มการนำเข้า Settings

// Caretaker imports
import UserManagement from '../views/Caretaker/UserManagement/UserManagement.vue'
import SystemConfig from '../views/Caretaker/SystemConfig.vue'
import DatabaseManagement from '../views/Caretaker/DatabaseManagement.vue'

const routes = [

  //Login/contractor
  {
    path: '/',
    component: Login,
    meta: { title: 'เข้าสู่ระบบคู่ธุรกิจ', public: true },
  },
  {
    path: '/check-permissions',
    component: CheckPermissions,
    meta: { title: 'ตรวจสอบสิทธิ์การเข้าใช้งาน', public: true }
  },
  {    path: '/contractor-registration',
    component: ContractorRegistration,
    meta: { title: 'หน้าหลักลงทะเบียนผู้รับเหมา', public: true }
  },
  {
    path: '/forgot-password-coordinator',
    component: ForgotPasswordCoordinator,
    meta: { title: 'ลืมรหัสผ่าน - คู่ธุรกิจ', public: true }
  },
  //----------------------------------------------------------
  //Login/Owner and safety
  {
    path: '/loginownerandsafety',
    component: LoginOwnerAndSafety,
    meta: { title: 'เข้าสู่ระบบเจ้าของงานกับSafety', public: true },
  },

  {
    path: '/setpasswordownerandsafety',
    component: SetPasswordOwnerAndSafety,
    meta: { title: 'เข้าสู่ระบบเจ้าของงานกับSafety', public: true },
  },
  {
    path: '/forgot-password-owner-safety',
    component: ForgotPasswordOwnerAndSafety,
    meta: { title: 'ลืมรหัสผ่าน - บุคลากรภายใน', public: true }
  },
  //

  {
    path: '/add-contractor',
    component: AddContractor,
    meta: { step: 1, title: 'เพิ่มผู้รับเหมา' }
  },
  {
    path: '/download-training-list',
    component: DownloadTrainingList,
    meta: { step: 1, title: 'ดาวน์โหลดรายชื่อผู้อบรม' }
  },
  {
    path: '/manage-team',
    component: ManageTeam,
    meta: { step: 1, title: 'จัดการทีม' }
  },
  {
    path: '/training-booking',
    component: TrainingBooking,
    meta: { step: 3, title: 'จองอบรม' }
  },
  {
    path: '/list-employees',
    component: ListEmployees,
    meta: { step: 5, title: 'รายชื่อพนักงาน' }
  },
  {
    path: '/take-exam',
    component: TakeExam,
    meta: { step: 6, title: 'สอบ' }
  },
  {
    path: '/print-card',
    component: PrintCard,
    meta: { step: 7, title: 'พิมพ์บัตร' }
  },
  {
    path: '/approval-officer',
    component: ApprovalOfficer,
    meta: { step: 8, title: 'การอนุมัติผู้ประสานงานคู่ธุรกิจ' }
  },
  {
    path: '/approval-safety',
    component: ApprovalSafety,
    meta: { step: 9, title: 'การอนุมัติผู้ประสานงานด้านความปลอดภัย' }
  },
  {
    path: '/certifica-add',
    component: CertificaAdd,
    meta: { step: 10, title: 'เพิ่มเอกสาร CertificaAdd' }
  },
  {
    path: '/book-training',
    component: BookTraining,
    meta: { step: 11, title: 'จองอบรมทีมงาน' }
  },
  {
    path: '/create-training',
    component: CreateTraining,
    meta: { step: 12, title: 'สร้างการฝึกอบรม' }
  },
  {
    path: '/setting',
    component: Setting,
    meta: { title: 'การตั้งค่า' }
  },
  // Caretaker routes
  {
    path: '/caretaker-user-management',
    component: UserManagement,
    meta: { title: 'จัดการผู้ใช้งาน', requiresAuth: true, role: 'caretaker' }
  },
  {
    path: '/caretaker-system-config',
    component: SystemConfig,
    meta: { title: 'การตั้งค่าระบบ', requiresAuth: true, role: 'caretaker' }
  },
  {
    path: '/caretaker-database-management',
    component: DatabaseManagement,
    meta: { title: 'จัดการฐานข้อมูล', requiresAuth: true, role: 'caretaker' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: { title: 'ไม่พบหน้า', public: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // เพิ่มส่วนนี้เพื่อให้เด่งไปข้างบนตลอดเมื่อเปลี่ยนหน้า
  scrollBehavior(to, from, savedPosition) {
    // หากมี savedPosition (เช่น กดปุ่ม back/forward) ให้กลับไปตำแหน่งเดิม
    if (savedPosition) {
      return savedPosition
    }
    
    // หากมี hash (#section) ให้ scroll ไปยัง element นั้น
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    
    // ไม่งั้นให้เด่งไปข้างบนตลอด
    return { 
      top: 0, 
      behavior: 'smooth' 
    }
  }
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('auth') === 'true'

  if (to.meta.public || isLoggedIn) {
    next()
  } else {
    next('/')
  }
})

export default router