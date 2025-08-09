<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h1 class="text-2xl font-bold text-center mb-4">เข้าสู่ระบบคู่ธุรกิจ</h1>

      <form class="space-y-4" @submit.prevent="goToRegister">
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            เข้าสู่ระบบ
        </button>
        <p class="text-sm text-gray-500 text-center mt-4"> <router-link to="/reset-password" class="text-blue-600 hover:underline">กู้คืนรหัสผ่าน</router-link></p>
        <p class="text-sm text-gray-500 text-center mt-4"> <router-link to="/contractor-registration" class="text-blue-600 hover:underline">ลงทะเบียน</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRegister = (e) => {
  e.preventDefault()
  localStorage.setItem('auth', 'true')
  router.push('/manage-team')
}
const logout = () => {
  localStorage.removeItem('auth')
  router.push('/')
}
</script>