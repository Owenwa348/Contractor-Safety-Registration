<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h1 class="text-2xl font-bold text-center mb-4">เข้าสู่ระบบคู่ธุรกิจ</h1>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <!-- Tax ID -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            เลขประจำตัวผู้เสียภาษีอากร (บริษัทผู้รับเหมา)
          </label>
          <input
            type="text"
            v-model="taxId"
            @keypress="onlyNumberInput"
            class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            :class="errors.taxId ? 'border-red-500' : ''"
          />
          <p v-if="errors.taxId" class="text-red-500 text-sm mt-1">
            {{ errors.taxId }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            v-model="email"
            class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            :class="errors.email ? 'border-red-500' : ''"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 pr-10"
              :class="errors.password ? 'border-red-500' : ''"
            />
            <!-- ปุ่ม toggle -->
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              <!-- icon ตาเปิด -->
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>

              <!-- icon ตาปิด -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.941-4.243m3.12-2.12A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.243 4.243m-3.12 2.12L4.22 4.22"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.88 9.88A3 3 0 0114.12 14.12"
                />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          เข้าสู่ระบบ
        </button>

        <p v-if="loginError" class="text-red-600 text-center mt-2">
          {{ loginError }}
        </p>

        <!-- Register -->
        <p class="text-sm text-gray-500 text-center mt-4">
          <router-link
            to="/contractor-registration"
            class="text-blue-600 hover:underline"
          >
            ลงทะเบียน
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const taxId = ref("");
const email = ref("");
const password = ref("");
const errors = ref({});
const loginError = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const mockUsers = [
  { taxId: "1219900933580", email: "tchairattananon@gmail.com", password: "123456" },
];

const onlyNumberInput = (e) => {
  const char = String.fromCharCode(e.which);
  if (!/[0-9]/.test(char)) e.preventDefault();
  if (taxId.value.length >= 13) e.preventDefault();
};

const validate = () => {
  errors.value = {};
  loginError.value = "";

  if (!taxId.value) {
    errors.value.taxId = "กรุณากรอกเลขประจำตัวผู้เสียภาษี";
  } else if (!/^\d{13}$/.test(taxId.value)) {
    errors.value.taxId = "เลขผู้เสียภาษีต้องเป็นตัวเลข 13 หลัก";
  }

  if (!email.value) {
    errors.value.email = "กรุณากรอกอีเมล";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "รูปแบบอีเมลไม่ถูกต้อง";
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
      u.email === email.value &&
      u.password === password.value
  );

  if (!user) {
    loginError.value = "ไม่สามารถเข้าได้ (ข้อมูลไม่ถูกต้อง)";
    return;
  }

  localStorage.setItem("auth", "true");
  router.push("/manage-team");
};
</script>
