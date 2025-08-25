<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">เพิ่มเอกสาร Certifica</h1>
    <p class="text-gray-600 mb-4">กรุณาแนบไฟล์เอกสารประกอบตามที่กำหนด (PDF, JPG, PNG, DOCX)</p>

    <!-- เอกสาร 1 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">ใบอนุญาตประกอบกิจการ / หนังสือรับรองบริษัท</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- เอกสาร 2 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">ใบรับรองมาตรฐาน (เช่น ISO 9001, ISO 14001, ISO 45001)</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- เอกสาร 3 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">ใบรับรองความปลอดภัย/อาชีวอนามัย (Work Permit, Hot Work, Confined Space)</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- เอกสาร 4 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">ใบอนุญาตประกอบวิชาชีพ / ผู้เชี่ยวชาญ (วิศวกร, จป.)</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- เอกสาร 5 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">เอกสารประกันภัย (ความรับผิดชอบ, ประกันชีวิตพนักงาน)</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- เอกสาร 6 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">หลักฐานการอบรมความปลอดภัยของพนักงาน</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- เอกสาร 7 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">แบบประเมินความเสี่ยง (Risk Assessment)</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- เอกสาร 8 -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">สำเนาบัตร/หนังสือรับรองพนักงาน</label>
      <input type="file" class="w-full border border-gray-300 rounded-md p-2" />
    </div>

    <!-- ปุ่มบันทึก -->
    <button
      class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      บันทึกเอกสาร
    </button>
  </div>
</template>
