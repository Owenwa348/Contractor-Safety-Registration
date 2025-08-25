// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import ContractorRegistration from '../views/ContractorRegistration.vue'
import AddContractor from '../views/AddContractor.vue'
import ManageTeam from '../views/ManageTeam.vue'
import TrainingBooking from '../views/TrainingBooking.vue'
import ListEmployees from '../views/ListEmployees.vue'
import TakeExam from '../views/TakeExam.vue'
import PrintCard from '../views/PrintCard.vue'
import NotFound from '../views/NotFound.vue'
import ApprovalOfficer from '../views/ApprovalOfficer.vue'
import ApprovalSafety from '../views/ApprovalSafety.vue'// เพิ่มการนำเข้า ApprovalSafety
import CertificaAdd from '../views/CertificaAdd.vue' // เพิ่มการนำเข้า CertificaAdd
import BookTraining from '../views/BookTraining.vue' // เพิ่มการนำเข้า BookTraining
import CreateTraining from '../views/CreateTraining.vue'
import Setting from '../views/Setting.vue' // เพิ่มการนำเข้า Settings

const routes = [
  {
    path: '/',
    component: Login,
    meta: { title: 'เข้าสู่ระบบ', public: true },
  },
  {
    path: '/contractor-registration',
    component: ContractorRegistration,
    meta: { title: 'หน้าหลักลงทะเบียนผู้รับเหมา', public: true }
  },
  {
    path: '/add-contractor',
    component: AddContractor,
    meta: { step: 1, title: 'เพิ่มผู้รับเหมา' }
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