<!-- CheckPermissionsContractor.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">ตรวจสอบสิทธิ์การเข้าใช้งาน</h1>
        <p class="text-gray-600 text-sm">กรุณากรอกข้อมูลเพื่อตรวจสอบสิทธิ์ในระบบ</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleCheck">
        <!-- Tax ID Input -->
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
        
        <!-- Result Message -->
        <div v-if="resultMessage" class="p-4 rounded-xl border-2 transition-all duration-300">
          <div 
            class="flex items-center gap-3"
            :class="resultStatus === 'found' ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200'"
          >
            <!-- Success Icon -->
            <svg v-if="resultStatus === 'found'" class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <!-- Error Icon -->
            <svg v-else class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <p class="font-semibold">{{ resultMessage }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            type="submit"
            :disabled="!taxId || taxId.length !== 13"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              ตรวจสอบสิทธิ์
            </span>
          </button>

          <button
            type="button"
            @click="goBack"
            class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            <span class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              กลับไปก่อนหน้า
            </span>
          </button>
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
const errors = ref({});
const resultMessage = ref("");
const resultStatus = ref(""); 

// ตัวอย่าง mock ข้อมูลในระบบ
const mockUsers = [
  { taxId: "1234567891234" },
];

// แก้ไขฟังก์ชันเพื่อให้สามารถแก้ไขได้เมื่อความยาวเต็มแล้ว
const onlyNumberInput = (e) => {
  const char = String.fromCharCode(e.which);
  if (!/[0-9]/.test(char)) {
    e.preventDefault();
  }
};

// ฟังก์ชันสำหรับจัดรูปแบบและจำกัดความยาว
const formatTaxId = (e) => {
  let value = e.target.value.replace(/\D/g, ''); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
  if (value.length > 13) {
    value = value.slice(0, 13); // จำกัดไม่เกิน 13 หลัก
  }
  taxId.value = value;
  
  // ล้าง error เมื่อผู้ใช้เริ่มพิมพ์ใหม่
  if (errors.value.taxId) {
    errors.value = {};
  }
  
  // ล้าง result message เมื่อมีการแก้ไข
  if (resultMessage.value) {
    resultMessage.value = "";
    resultStatus.value = "";
  }
};

const validate = () => {
  errors.value = {};
  if (!taxId.value) {
    errors.value.taxId = "กรุณากรอกเลขประจำตัวผู้เสียภาษี";
  } else if (!/^\d{13}$/.test(taxId.value)) {
    errors.value.taxId = "เลขผู้เสียภาษีต้องเป็นตัวเลข 13 หลัก";
  }
  return Object.keys(errors.value).length === 0;
};

const handleCheck = () => {
  if (!validate()) return;

  const user = mockUsers.find((u) => u.taxId === taxId.value);

  if (user) {
    resultMessage.value = "พบข้อมูลในระบบ สามารถเข้าใช้งานได้";
    resultStatus.value = "found";
  } else {
    resultMessage.value = "ไม่พบข้อมูลในระบบ กรุณาลงทะเบียนหรือติดต่อผู้ดูแลระบบ";
    resultStatus.value = "notfound";
  }
};

const goBack = () => {
  router.back();
};
</script>