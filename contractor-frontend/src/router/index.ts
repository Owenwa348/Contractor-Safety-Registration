/**
 * router/index.ts - การกำหนดเส้นทางของแอปพลิเคชัน
 * จัดการ routing สำหรับระบบจัดการความปลอดภัยคู่ธุรกิจ
 * รวมถึง authentication, authorization และการจัดการสิทธิ์
CAREER
 */

// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// ==================== กลุ่ม Login/Contractor ====================
// สำหรับผู้ประสานงานคู่ธุรกิจ
import Login from '../views/Login/Coordinator/LoginCoordinator.vue'//หน้าล็อกอิน
import CheckPermissions from '../views/Login/Coordinator/CheckPermissionsContractor.vue'//หน้าตรวจสอบสิทธิ์การเข้าใช้งาน
import ContractorRegistration from '../views/Login/Coordinator/ContractorRegistration.vue'//หน้าหลักลงทะเบียนผู้รับเหมา
import ForgotPasswordCoordinator from '../views/Login/Coordinator/ForgotPasswordCoordinator.vue'//หน้าลืมรหัสผ่าน

// ==================== กลุ่ม Login/Owner and Safety ====================
// สำหรับเจ้าของงานและพนักงานความปลอดภัย
import LoginOwnerAndSafety from '../views/Login/Owner and safety/LoginOwnerAndSafety.vue'//หน้าล็อกอิน
import SetPasswordOwnerAndSafety from '../views/Login/Owner and safety/SetPasswordOwnerAndSafety.vue'//หน้าตั้งค่ารหัสผ่าน
import ForgotPasswordOwnerAndSafety from '../views/Login/Owner and safety/ForgotPasswordOwnerAndSafety.vue'//หน้าลืมรหัสผ่าน

// ==================== กลุ่ม Contractor Features ====================
// คุณสมบัติสำหรับผู้รับเหมา
import AddContractor from '../views/contractor/ManageTeam/AddContractor.vue'//หน้าจอเพิ่มผู้รับเหมา
import ManageTeam from '../views/contractor/ManageTeam/ManageTeam.vue'//หน้าจัดการทีม
import TrainingBooking from '../views/contractor/TrainingBooking/TrainingBooking.vue'//หน้าจองอบรม
import TakeExam from '../views/contractor/TakeExam/TakeExam.vue'//หน้าประเมินผล
import CertificaAdd from '../views/contractor/CertificaAdd/CertificaAdd.vue' // เพิ่มเอกสาร
import BookTraining from '../views/contractor/BookTraining/BookTraining.vue' // จองอบรม
import Assessment from '../views/contractor/Assessment/Assessment.vue' // การประเมินผล

// ==================== กลุ่ม Security Department ====================
// คุณสมบัติสำหรับแผนกความปลอดภัย
import ListEmployees from '../views/SecurityDepartment/ListEmployees/ListEmployees.vue'//รายชื่อพนักงาน
import PrintCard from '../views/SecurityDepartment/PrintCard/PrintCard.vue'//พิมพ์บัตร
import DownloadTrainingList from '../views/SecurityDepartment/DownloadTrainingList/DownloadTrainingList.vue'//ดาวน์โหลดรายชื่อผู้อบรม
import ApprovalSafety from '../views/SecurityDepartment/ApprovalSafety.vue' // อนุมัติความปลอดภัย
import CreateTraining from '../views/SecurityDepartment/CreateTraining/CreateTraining.vue'
import Setting from '../views/SecurityDepartment/SettingSecurityDepartment/Setting.vue' // การตั้งค่า

// ==================== กลุ่ม Manager ====================
// คุณสมบัติสำหรับผู้จัดการ
import ApprovalOfficer from '../views/Manager/ApprovalOfficer.vue'//การอนุมัติผู้ประสานงานคู่ธุรกิจ

// ==================== กลุ่ม Caretaker ====================
// คุณสมบัติสำหรับผู้ดูแลระบบ
import UserManagement from '../views/Caretaker/UserManagement/UserManagement.vue'//หน้าจัดการผู้ใช้งาน
import SystemConfig from '../views/Caretaker/SystemConfig.vue'//หน้าการตั้งค่าระบบ
// import DatabaseManagement from '../views/Caretaker/DatabaseManagement.vue'//หน้าจัดการฐานข้อมูล

// ==================== อื่นๆ ====================
import NotFound from '../views/NotFound.vue'//หน้าข้อผิดพลาด 404

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
    meta: { title: 'เพิ่มผู้รับเหมา' }
  },
  {
    path: '/download-training-list',
    component: DownloadTrainingList,
    meta: { title: 'ดาวน์โหลดรายชื่อผู้อบรม' }
  },
  {
    path: '/manage-team',
    component: ManageTeam,
    meta: { title: 'จัดการทีม' }
  },
  {
    path: '/training-booking',
    component: TrainingBooking,
    meta: { title: 'จองอบรม' }
  },
  {
    path: '/list-employees',
    component: ListEmployees,
    meta: { title: 'รายชื่อพนักงาน' }
  },
  {
    path: '/take-exam',
    component: TakeExam,
    meta: { title: 'สอบ' }
  },
  {
    path: '/assessment/:trainingId',
    component: Assessment,
    meta: { title: 'การประเมิน' },
    props: true
  },
  {
    path: '/print-card',
    component: PrintCard,
    meta: { title: 'พิมพ์บัตร' }
  },
  {
    path: '/approval-officer',
    component: ApprovalOfficer,
    meta: { title: 'การอนุมัติผู้ประสานงานคู่ธุรกิจ' }
  },
  {
    path: '/approval-safety',
    component: ApprovalSafety,
    meta: { title: 'การอนุมัติผู้ประสานงานด้านความปลอดภัย' }
  },
  {
    path: '/certifica-add',
    component: CertificaAdd,
    meta: { title: 'เพิ่มเอกสาร CertificaAdd' }
  },
  {
    path: '/book-training',
    component: BookTraining,
    meta: { title: 'จองอบรมทีมงาน' }
  },
  {
    path: '/create-training',
    component: CreateTraining,
    meta: { title: 'สร้างการฝึกอบรม' }
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
    meta: { title: 'จัดการผู้ใช้งาน' }
  },
  {
    path: '/caretaker-system-config',
    component: SystemConfig,
    meta: { title: 'การตั้งค่าระบบ' }
  },
  // {
  //   path: '/caretaker-database-management',
  //   component: DatabaseManagement,
  //   meta: { title: 'จัดการฐานข้อมูล', requiresAuth: true, role: 'caretaker' }
  // },
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
  // Allow access to all pages without authentication checks
  console.log('Navigation to:', to.path, '- Access allowed without authentication')
  next()
})

export default router