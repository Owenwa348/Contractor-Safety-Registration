<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h1 class="text-2xl font-bold text-center text-blue-700 mb-4">ลงทะเบียนคู่ธุรกิจ</h1>

      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">เลขประจำตัวผู้เสียภาษีอากร(บริษัทคู่ธุรกิจ)</label>
          <input type="text" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">ชื่อบริษัท</label>
          <input type="text" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">ชื่อ - นามสกุล</label>
          <input type="text" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">อีเมล</label>
          <input type="email" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
          <input type="tel" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
          <input type="password" class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>

        <button type="submit" class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          ลงทะเบียน
        </button>
      </form>
    </div>
  </div>
</template>