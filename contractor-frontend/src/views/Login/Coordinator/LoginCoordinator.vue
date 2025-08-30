<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">เข้าสู่ระบบคู่ธุรกิจ</h1>
        <p class="text-gray-600 text-sm">กรุณาเข้าสู่ระบบเพื่อใช้งาน</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <!-- Tax ID -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">
            เลขประจำตัวผู้เสียภาษีอากร (บริษัทผู้รับเหมา)
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="taxId"
              @input="formatTaxId"
              @keypress="onlyNumberInput"
              placeholder="กรอกเลขประจำตัวผู้เสียภาษี 13 หลัก"
              maxlength="13"
              class="w-full border-2 rounded-xl px-4 py-3 text-lg font-mono tracking-wider transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              :class="errors.taxId ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <span class="text-xs text-gray-400 font-mono">{{ taxId.length }}/13</span>
            </div>
          </div>
          <p v-if="errors.taxId" class="text-red-500 text-sm flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            {{ errors.taxId }}
          </p>
        </div>

        <!-- Username -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Username</label>
          <div class="relative">
            <input
              type="text"
              v-model="username"
              @input="clearError('username')"
              placeholder="กรอก Username"
              class="w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pl-11"
              :class="errors.username ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
          <p v-if="errors.username" class="text-red-500 text-sm flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            {{ errors.username }}
          </p>
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">รหัสผ่าน</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              @input="clearError('password')"
              placeholder="กรอกรหัสผ่าน"
              class="w-full border-2 rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pl-11 pr-11"
              :class="errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
            />
            <!-- Lock Icon -->
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <!-- Toggle Password Button -->
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <!-- Eye Open Icon -->
              <svg
                v-if="!showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <!-- Eye Closed Icon -->
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.941-4.243m3.12-2.12A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.243 4.243m-3.12 2.12L4.22 4.22"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.88 9.88A3 3 0 0014.12 14.12"/>
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            {{ errors.password }}
          </p>
        </div>

        <!-- Login Error -->
        <div v-if="loginError" class="p-4 rounded-xl border-2 bg-red-50 border-red-200">
          <div class="flex items-center gap-3 text-red-700">
            <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <p class="font-semibold">{{ loginError }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!taxId || !username || !password"
          class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            เข้าสู่ระบบ
          </span>
        </button>

        <!-- Links -->
        <div class="space-y-3 pt-4 border-t border-gray-100">
          <p class="text-sm text-center">
            <router-link
              to="/check-permissions"
              class="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200 flex items-center justify-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              ตรวจสอบสิทธิ์การเข้าใช้งาน
            </router-link>
          </p>

          <p class="text-sm text-center">
            <span class="text-gray-500">ยังไม่มีบัญชี? </span>
            <router-link
              to="/contractor-registration"
              class="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
            >
              ลงทะเบียนที่นี่
            </router-link>

          </p>
            <router-link
              to="/loginownerandsafety"
              class="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
            >
              เข้าสู่ระบบสำหรับบุคลากรภายใน
            </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const taxId = ref("");
const username = ref("");
const password = ref("");
const errors = ref({});
const loginError = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const mockUsers = [
  { taxId: "1234567891234", username: "User", password: "123456" },
];

// แก้ไขฟังก์ชันเพื่อให้สามารถแก้ไขได้เมื่อความยาวเต็มแล้ว
const onlyNumberInput = (e) => {
  const char = String.fromCharCode(e.which);
  if (!/[0-9]/.test(char)) {
    e.preventDefault();
  }
};

// ฟังก์ชันสำหรับจัดรูปแบบและจำกัดความยาวของ Tax ID
const formatTaxId = (e) => {
  let value = e.target.value.replace(/\D/g, ''); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
  if (value.length > 13) {
    value = value.slice(0, 13); // จำกัดไม่เกิน 13 หลัก
  }
  taxId.value = value;
  
  // ล้าง error เมื่อผู้ใช้เริ่มพิมพ์ใหม่
  clearError('taxId');
  clearLoginError();
};

// ฟังก์ชันล้าง error ของ field ที่กำหนด
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  clearLoginError();
};

// ฟังก์ชันล้าง login error
const clearLoginError = () => {
  if (loginError.value) {
    loginError.value = "";
  }
};

const validate = () => {
  errors.value = {};
  loginError.value = "";

  if (!taxId.value) {
    errors.value.taxId = "กรุณากรอกเลขประจำตัวผู้เสียภาษี";
  } else if (!/^\d{13}$/.test(taxId.value)) {
    errors.value.taxId = "เลขผู้เสียภาษีต้องเป็นตัวเลข 13 หลัก";
  }

  if (!username.value) {
    errors.value.username = "กรุณากรอก Username";
  } else if (username.value.length < 3) {
    errors.value.username = "Username ต้องมีอย่างน้อย 3 ตัวอักษร";
  }

  if (!password.value) {
    errors.value.password = "กรุณากรอกรหัสผ่าน";
  } else if (password.value.length < 6) {
    errors.value.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  }

  return Object.keys(errors.value).length === 0;
};

const handleLogin = () => {
  if (!validate()) return;

  const user = mockUsers.find(
    (u) =>
      u.taxId === taxId.value &&
      u.username === username.value &&
      u.password === password.value
  );

  if (!user) {
    loginError.value = "ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง";
    return;
  }

  // Note: ใช้ in-memory storage แทน localStorage ใน artifact
  // localStorage.setItem("auth", "true");
  router.push("/manage-team");
};
</script>