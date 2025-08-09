// src/router/index.ts หรือ index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import ContractorRegistration from '../views/ContractorRegistration.vue'
import AddContractor from '../views/AddContractor.vue'
import ManageTeam from '../views/ManageTeam.vue'
import UploadDocuments from '../views/UploadDocuments.vue'
import ApprovalByOwner from '../views/ApprovalByOwner.vue'
import ApprovalByJorPor from '../views/ApprovalByJorPor.vue'
import TrainingBooking from '../views/TrainingBooking.vue'
import AttendTraining from '../views/AttendTraining.vue'
import DownloadListQR from '../views/DownloadListQR.vue'
import TakeExam from '../views/TakeExam.vue'
import PrintCard from '../views/PrintCard.vue'
import NotFound from '../views/NotFound.vue'

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
    path: '/upload',
    component: UploadDocuments,
    meta: { step: 2, title: 'อัปโหลดเอกสาร' }
  },
  {
    path: '/approval-owner',
    component: ApprovalByOwner,
    meta: { step: 3, title: 'อนุมัติโดยเจ้าของกิจการ' }
  },
  {
    path: '/approval-jorpor',
    component: ApprovalByJorPor,
    meta: { step: 4, title: 'อนุมัติโดย จปร.' }
  },
  {
    path: '/training-booking',
    component: TrainingBooking,
    meta: { step: 5, title: 'จองอบรม' }
  },
  {
    path: '/attend-training',
    component: AttendTraining,
    meta: { step: 6, title: 'เข้าอบรม' }
  },
  {
    path: '/download-list-qr',
    component: DownloadListQR,
    meta: { step: 7, title: 'ดาวน์โหลดรายชื่อ QR' }
  },
  {
    path: '/take-exam',
    component: TakeExam,
    meta: { step: 8, title: 'สอบ' }
  },
  {
    path: '/print-card',
    component: PrintCard,
    meta: { step: 9, title: 'พิมพ์บัตร' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: { title: 'ไม่พบหน้า', public: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
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
