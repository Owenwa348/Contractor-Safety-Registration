<!-- ApprovalOfficer.vue -->
<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            อนุมัติข้อมูลผู้ลงทะเบียน
          </h1>
          <p class="text-gray-600">การอนุมัติผู้ประสานงานคู่ธุรกิจ</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-600">{{ filteredTableData.length }}</div>
          <div class="text-sm text-gray-500">รายการทั้งหมด</div>
        </div>
      </div>
      
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-600 text-sm font-medium">รอการอนุมัติ</p>
              <p class="text-2xl font-bold text-yellow-700">{{ getStatusCount('รอการอนุมัติ') }}</p>
            </div>
            <div class="text-yellow-400">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-600 text-sm font-medium">อนุมัติแล้ว</p>
              <p class="text-2xl font-bold text-green-700">{{ getStatusCount('อนุมัติแล้ว') }}</p>
            </div>
            <div class="text-green-400">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-red-600 text-sm font-medium">ไม่อนุมัติ</p>
              <p class="text-2xl font-bold text-red-700">{{ getStatusCount('ไม่อนุมัติ') }}</p>
            </div>
            <div class="text-red-400">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">ค้นหาและกรองข้อมูล</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            สถานะเอกสาร
          </label>
          <select 
            v-model="searchData.department"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">ทั้งหมด</option>
            <option 
              v-for="dept in departments" 
              :key="dept" 
              :value="dept"
            >
              {{ dept }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            องค์กร
          </label>
          <select 
            v-model="searchData.organization"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">ทั้งหมด</option>
            <option 
              v-for="org in organizations" 
              :key="org" 
              :value="org"
            >
              {{ org }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ค้นหา
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="searchData.searchTerm"
              placeholder="ชื่อ, เบอร์โทร"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              @keyup.enter="handleSearch"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="flex items-end space-x-3">
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            ล้างตัวกรอง
          </button>
          <button
            @click="handleSearch"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            ค้นหา
          </button>
        </div>
      </div>
    </div>

    <!-- Organization Section -->
    <div v-for="organization in visibleOrganizations" :key="organization" class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="bg-blue-600 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-white">{{ organization }}</h3>
        <div class="text-sm text-blue-100">
          {{ getOrganizationData(organization).length }} รายการ
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-xs">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                ลำดับ
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                รายชื่อ
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                เบอร์โทรศัพท์
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                รูปเจ้าของเอกสาร
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                บัตรประชาชน/ต่างด้าว
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                ประกันสังคม
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Certificate
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                สถานะเอกสาร
              </th>
              <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(item, index) in getOrganizationData(organization)" 
              :key="item.id" 
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- ลำดับ -->
              <td class="px-2 py-2 whitespace-nowrap text-xs text-gray-900 text-center">
                {{ index + 1 }}
              </td>
              
              <!-- รายชื่อ -->
              <td class="px-2 py-2 text-xs text-gray-900 max-w-24 truncate" :title="item.name">
                {{ item.name }}
              </td>
              
              <!-- เบอร์โทรศัพท์ -->
              <td class="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                {{ item.phoneNumber }}
              </td>
              
              <!-- รูปเจ้าของเอกสาร -->
              <td class="px-2 py-2 text-xs max-w-20">
                <a 
                  href="#" 
                  @click.prevent="openDocument(item.ownerImage)"
                  class="text-blue-600 hover:text-blue-800 underline block truncate"
                  :title="item.ownerImage"
                >
                  {{ item.ownerImage }}
                </a>
              </td>
              
              <!-- บัตรประชาชน/ต่างด้าว -->
              <td class="px-2 py-2 text-xs max-w-28">
                <a 
                  href="#" 
                  @click.prevent="openDocument(item.idCard)"
                  class="text-blue-600 hover:text-blue-800 underline block truncate"
                  :title="item.idCard"
                >
                  {{ item.idCard }}
                </a>
              </td>
              
              <!-- ประกันสังคม -->
              <td class="px-2 py-2 text-xs max-w-32">
                <a 
                  href="#" 
                  @click.prevent="openDocument(item.socialSecurity)"
                  class="text-blue-600 hover:text-blue-800 underline block truncate"
                  :title="item.socialSecurity"
                >
                  {{ item.socialSecurity }}
                </a>
              </td>
              
              <!-- เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้ -->
              <td class="px-2 py-2 text-xs max-w-40">
                <a 
                  href="#" 
                  @click.prevent="openDocument(item.approvalDocument)"
                  class="text-blue-600 hover:text-blue-800 underline block truncate"
                  :title="item.approvalDocument"
                >
                  {{ item.approvalDocument }}
                </a>
              </td>
              
              <!-- Certificate -->
              <td class="px-2 py-2 text-xs max-w-20">
                <a 
                  href="#" 
                  @click.prevent="openDocument(item.certificate)"
                  class="text-blue-600 hover:text-blue-800 underline block truncate"
                  :title="item.certificate"
                >
                  {{ item.certificate }}
                </a>
              </td>
              
              <!-- สถานะเอกสาร -->
              <td class="px-2 py-2 whitespace-nowrap text-xs">
                <div class="space-y-1">
                  <span 
                    :class="getStatusClass(item.status)"
                    class="inline-block px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ item.status }}
                  </span>
                  <div v-if="item.rejectReason" class="text-red-600 text-xs">
                    {{ item.rejectReason }}
                  </div>
                </div>
              </td>
              
              <!-- การดำเนินการ -->
              <td class="px-2 py-2 whitespace-nowrap text-xs">
                <div class="flex flex-col space-y-1">
                  <button
                    @click="handleAction('อนุมัติ', item.id)"
                    :disabled="item.status === 'อนุมัติแล้ว'"
                    class="px-2 py-1 text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    อนุมัติ
                  </button>
                  <button
                    @click="handleAction('ไม่อนุมัติ', item.id)"
                    :disabled="item.status === 'ไม่อนุมัติ'"
                    class="px-2 py-1 text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ไม่อนุมัติ
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="getOrganizationData(organization).length === 0">
              <td colspan="10" class="px-4 py-8 text-center text-gray-500">
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <p class="text-lg font-medium text-gray-900 mb-2">ไม่พบข้อมูล</p>
                  <p class="text-gray-500">ไม่มีรายการที่ตรงกับเงื่อนไขการค้นหา</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for document preview -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">เอกสาร</h3>
        <p class="text-sm text-gray-600 mb-4">{{ selectedDocument }}</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
            ปิด
          </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            ดาวน์โหลด
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for approval confirmation -->
    <div v-if="showApprovalModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="ml-3 text-lg font-medium text-gray-900">ยืนยันการอนุมัติ</h3>
        </div>
        <p class="text-sm text-gray-600 mb-6">
          คุณต้องการอนุมัติเอกสารของ <strong>{{ selectedItem?.name }}</strong> ใช่หรือไม่?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeApprovalModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
            ยกเลิก
          </button>
          <button
            @click="confirmApproval"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            ยืนยันอนุมัติ
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for rejection reason -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <h3 class="ml-3 text-lg font-medium text-gray-900">เหตุผลในการไม่อนุมัติ</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">กรุณาเลือกเหตุผลสำหรับ: <strong>{{ selectedItem?.name }}</strong></p>
        
        <div class="space-y-3 mb-4">
          <div 
            v-for="reason in predefinedReasons" 
            :key="reason"
            class="flex items-center"
          >
            <input
              :id="reason"
              type="radio"
              :value="reason"
              v-model="rejectReason"
              class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <label 
              :for="reason" 
              class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {{ reason }}
            </label>
          </div>
        </div>

        <!-- Note input for all options -->
        <div v-if="rejectReason" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            <span v-if="rejectReason === 'อื่นๆ'">ระบุเหตุผลอื่นๆ</span>
            <span v-else>หมายเหตุเพิ่มเติม (บังคับ)</span>
          </label>
          <textarea
            v-model="customReason"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
            :placeholder="rejectReason === 'อื่นๆ' ? 'กรุณาระบุเหตุผล...' : 'หมายเหตุเพิ่มเติม...'"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeRejectModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
            ยกเลิก
          </button>
          <button
            @click="confirmReject"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            ยืนยันไม่อนุมัติ
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div 
      v-if="showMessage" 
      :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 z-50',
        messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThaiRegistrationApprovalSystem',
  data() {
    return {
      searchData: {
        department: '',
        organization: '',
        searchTerm: ''
      },
      currentPage: 1,
      itemsPerPage: 10,
      showModal: false,
      selectedDocument: '',
      showApprovalModal: false,
      showRejectModal: false,
      selectedItem: null,
      rejectReason: '',
      customReason: '',
      showMessage: false,
      message: '',
      messageType: 'success',
      
      departments: [
        'รอการอนุมัติ',
        'อนุมัติแล้ว', 
        'ไม่อนุมัติ', 
      ],

      organizations: [
        'บริษัท ABC จำกัด',
        'บริษัท XYZ จำกัด',
        'บริษัท DEF จำกัด',
        'มหาวิทยาลัย GHI',
        'โรงพยาบาล JKL'
      ],

      predefinedReasons: [
        'ไม่อนุมัติการ',
        'เอกสารไม่ครบ',
        'อื่นๆ'
      ],

      tableData: [
        {
          id: 1,
          name: 'ธันวา ชัยรัตนานนท์',
          phoneNumber: '0617153737',
          organization: 'บริษัท ABC จำกัด',
          ownerImage: 'main3.jpg',
          idCard: 'บัตรประชาชน_ธันวา.pdf',
          socialSecurity: 'ประกันสังคม_ธันวา.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_ธันวา.pdf',
          certificate: 'เอกสารใบ certificate.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: ''
        },
        {
          id: 2,
          name: 'สมชาย ใจดี',
          phoneNumber: '0812345678',
          organization: 'บริษัท ABC จำกัด',
          ownerImage: 'profile_สมชาย.jpg',
          idCard: 'บัตรประชาชน_สมชาย.pdf',
          socialSecurity: 'ประกันสังคม_สมชาย.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_สมชาย.pdf',
          certificate: 'certificate_สมชาย.pdf',
          status: 'อนุมัติแล้ว',
          rejectReason: ''
        },
        {
          id: 3,
          name: 'สมหญิง รักสุข',
          phoneNumber: '0923456789',
          organization: 'บริษัท XYZ จำกัด',
          ownerImage: 'profile_สมหญิง.jpg',
          idCard: 'บัตรประชาชน_สมหญิง.pdf',
          socialSecurity: 'ประกันสังคม_สมหญิง.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_สมหญิง.pdf',
          certificate: 'certificate_สมหญิง.pdf',
          status: 'ไม่อนุมัติ',
          rejectReason: 'เอกสารไม่ครบ'
        },
        {
          id: 4,
          name: 'วิชัย สมใจ',
          phoneNumber: '0834567890',
          organization: 'บริษัท XYZ จำกัด',
          ownerImage: 'profile_วิชัย.jpg',
          idCard: 'บัตรประชาชน_วิชัย.pdf',
          socialSecurity: 'ประกันสังคม_วิชัย.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_วิชัย.pdf',
          certificate: 'certificate_วิชัย.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: ''
        },
        {
          id: 5,
          name: 'นภัส ศรีสุข',
          phoneNumber: '0945678901',
          organization: 'บริษัท DEF จำกัด',
          ownerImage: 'profile_นภัส.jpg',
          idCard: 'บัตรประชาชน_นภัส.pdf',
          socialSecurity: 'ประกันสังคม_นภัส.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_นภัส.pdf',
          certificate: 'certificate_นภัส.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: ''
        },
        {
          id: 6,
          name: 'อารีย์ มั่นคง',
          phoneNumber: '0856789012',
          organization: 'มหาวิทยาลัย GHI',
          ownerImage: 'profile_อารีย์.jpg',
          idCard: 'บัตรประชาชน_อารีย์.pdf',
          socialSecurity: 'ประกันสังคม_อารีย์.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_อารีย์.pdf',
          certificate: 'certificate_อารีย์.pdf',
          status: 'อนุมัติแล้ว',
          rejectReason: ''
        },
        {
          id: 7,
          name: 'สุรชัย วีรกุล',
          phoneNumber: '0967890123',
          organization: 'มหาวิทยาลัย GHI',
          ownerImage: 'profile_สุรชัย.jpg',
          idCard: 'บัตรประชาชน_สุรชัย.pdf',
          socialSecurity: 'ประกันสังคม_สุรชัย.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_สุรชัย.pdf',
          certificate: 'certificate_สุรชัย.pdf',
          status: 'ไม่อนุมัติ',
          rejectReason: 'ไม่อนุมัติการ (ไม่ผ่านการพิจารณา)'
        },
        {
          id: 8,
          name: 'มณีรัตน์ สุขใส',
          phoneNumber: '0878901234',
          organization: 'โรงพยาบาล JKL',
          ownerImage: 'profile_มณีรัตน์.jpg',
          idCard: 'บัตรประชาชน_มณีรัตน์.pdf',
          socialSecurity: 'ประกันสังคม_มณีรัตน์.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_มณีรัตน์.pdf',
          certificate: 'certificate_มณีรัตน์.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: ''
        },
        {
          id: 9,
          name: 'ประวิท มีสุข',
          phoneNumber: '0789012345',
          organization: 'โรงพยาบาล JKL',
          ownerImage: 'profile_ประวิท.jpg',
          idCard: 'บัตรประชาชน_ประวิท.pdf',
          socialSecurity: 'ประกันสังคม_ประวิท.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติให้ทำหน้าที่ในสถานที่นี้_ประวิท.pdf',
          certificate: 'certificate_ประวิท.pdf',
          status: 'อนุมัติแล้ว',
          rejectReason: ''
        }
      ]
    }
  },

  computed: {
    filteredTableData() {
      let filtered = this.tableData;

      if (this.searchData.department) {
        filtered = filtered.filter(item => 
          item.status === this.searchData.department
        );
      }

      if (this.searchData.organization) {
        filtered = filtered.filter(item => 
          item.organization === this.searchData.organization
        );
      }

      if (this.searchData.searchTerm) {
        const searchTerm = this.searchData.searchTerm.toLowerCase();
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.phoneNumber.includes(searchTerm)
        );
      }

      return filtered;
    },

    visibleOrganizations() {
      // Get unique organizations from filtered data
      const orgs = [...new Set(this.filteredTableData.map(item => item.organization))];
      return orgs.sort();
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + parseInt(this.itemsPerPage);
      return this.filteredTableData.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredTableData.length / this.itemsPerPage);
    },

    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },

  methods: {
    handleSearch() {
      this.currentPage = 1;
    },

    clearFilters() {
      this.searchData = {
        department: '',
        organization: '',
        searchTerm: ''
      };
      this.currentPage = 1;
    },

    getOrganizationData(organization) {
      return this.filteredTableData.filter(item => item.organization === organization);
    },

    handleAction(action, id) {
      const item = this.tableData.find(item => item.id === id);
      this.selectedItem = item;

      if (action === 'อนุมัติ') {
        this.showApprovalModal = true;
      } else if (action === 'ไม่อนุมัติ') {
        this.rejectReason = '';
        this.customReason = '';
        this.showRejectModal = true;
      }
    },

    confirmApproval() {
      if (this.selectedItem) {
        this.selectedItem.status = 'อนุมัติแล้ว';
        this.selectedItem.rejectReason = '';
        this.showNotification(`อนุมัติเอกสารของ ${this.selectedItem.name} เรียบร้อยแล้ว`, 'success');
      }
      this.closeApprovalModal();
    },

    closeApprovalModal() {
      this.showApprovalModal = false;
      this.selectedItem = null;
    },

    confirmReject() {
      if (!this.rejectReason) {
        this.showNotification('กรุณาเลือกเหตุผลในการไม่อนุมัติ', 'error');
        return;
      }

      if (this.rejectReason === 'อื่นๆ' && !this.customReason.trim()) {
        this.showNotification('กรุณาระบุเหตุผลอื่นๆ', 'error');
        return;
      }

      let finalReason = this.rejectReason;
      
      // เพิ่มหมายเหตุถ้ามี
      if (this.customReason.trim()) {
        if (this.rejectReason === 'อื่นๆ') {
          finalReason = this.customReason.trim();
        } else {
          finalReason = `${this.rejectReason} (${this.customReason.trim()})`;
        }
      }

      if (this.selectedItem) {
        this.selectedItem.status = 'ไม่อนุมัติ';
        this.selectedItem.rejectReason = finalReason;
        this.showNotification(`ไม่อนุมัติเอกสารของ ${this.selectedItem.name} เรียบร้อยแล้ว`, 'success');
      }

      this.closeRejectModal();
    },

    closeRejectModal() {
      this.showRejectModal = false;
      this.selectedItem = null;
      this.rejectReason = '';
      this.customReason = '';
    },

    openDocument(documentName) {
      this.selectedDocument = documentName;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedDocument = '';
    },

    getStatusClass(status) {
      const classes = {
        'รอการอนุมัติ': 'bg-yellow-100 text-yellow-800',
        'อนุมัติแล้ว': 'bg-green-100 text-green-800',
        'ไม่อนุมัติ': 'bg-red-100 text-red-800',
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },

    getStatusCount(status) {
      return this.filteredTableData.filter(item => item.status === status).length;
    },

    showNotification(msg, type = 'success') {
      this.message = msg;
      this.messageType = type;
      this.showMessage = true;
      
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
  },

  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    }
  },

  mounted() {
    console.log('Thai Registration Approval System loaded');
  }
}
</script>

<style scoped>
/* Custom animations */
.transition-colors {
  transition: all 0.2s ease-in-out;
}

/* Responsive table */
@media (max-width: 768px) {
  .overflow-x-auto {
    overflow-x: auto;
  }
  
  table {
    min-width: 800px;
  }
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Status indicator animations */
.status-indicator {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Button hover effects */
.btn-hover {
  transform: translateY(0);
  transition: transform 0.2s ease-in-out;
}

.btn-hover:hover {
  transform: translateY(-1px);
}

/* Card shadow on hover */
.card-hover {
  transition: box-shadow 0.3s ease-in-out;
}

.card-hover:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Loading state */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Success message animation */
.success-message {
  animation: slideInDown 0.5s ease-out;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Modal animations */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Radio button custom styling */
input[type="radio"]:checked {
  background-color: #dc2626;
  border-color: #dc2626;
}

/* Custom textarea focus */
textarea:focus {
  border-color: #dc2626;
}

/* Notification styles */
.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .grid-mobile {
    grid-template-columns: 1fr;
  }
  
  .text-mobile {
    font-size: 0.875rem;
  }
  
  .px-mobile {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Mobile modal adjustments */
  .modal-mobile {
    margin: 1rem;
    max-height: 90vh;
    overflow-y: auto;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none;
  }
  
  .print-table {
    font-size: 12px;
  }
  
  .print-break {
    page-break-after: always;
  }
}

/* Hover effects for table rows */
tbody tr:hover {
  background-color: #f9fafb;
  transition: background-color 0.15s ease-in-out;
}

/* Custom focus styles */
button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Disabled button styles */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Link hover effects */
a:hover {
  text-decoration-thickness: 2px;
}

/* Custom badge styles */
.status-badge {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Organization header styling */
.organization-header {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

/* Custom organization section shadow */
.organization-section {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.organization-section:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease-in-out;
}
</style>