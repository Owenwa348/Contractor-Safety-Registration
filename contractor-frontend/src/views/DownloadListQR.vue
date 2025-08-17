<!-- RegistrationList.vue -->
<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            รายชื่อผู้ลงทะเบียนทั้งหมด
          </h1>
          <p class="text-gray-600">จัดการและดาวน์โหลดข้อมูลผู้ประสานงานคู่ธุรกิจ</p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Export Button -->
          <button
            @click="showExportModal = true"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            ดาวน์โหลด
          </button>
          <!-- Total Count -->
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-600">{{ filteredTableData.length }}</div>
            <div class="text-sm text-gray-500">รายการทั้งหมด</div>
          </div>
        </div>
      </div>
      
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-600 text-sm font-medium">รวมทั้งหมด</p>
              <p class="text-2xl font-bold text-blue-700">{{ totalCount }}</p>
            </div>
            <div class="text-blue-400">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
        
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

    <!-- Search and Filter Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
        </svg>
        ค้นหาและกรองข้อมูล
      </h2>
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
            class="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            ล้าง
          </button>
          <button
            @click="handleSearch"
            class="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            ค้นหา
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table Section -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-white flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          รายชื่อทั้งหมด
        </h3>
        <div class="text-sm text-blue-100">
          แสดง {{ paginatedData.length }} จาก {{ filteredTableData.length }} รายการ
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                ลำดับ
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                รายชื่อ
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เบอร์โทรศัพท์
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                องค์กร
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                วันที่ลงทะเบียน
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะเอกสาร
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                วันที่อนุมัติ
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                หมายเหตุ
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(item, index) in paginatedData" 
              :key="item.id" 
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- ลำดับ -->
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              
              <!-- รายชื่อ -->
              <td class="px-4 py-3 text-sm text-gray-900">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-blue-600 font-semibold text-sm">
                      {{ item.name.charAt(0) }}
                    </span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-xs text-gray-500">ID: {{ item.id }}</div>
                  </div>
                </div>
              </td>
              
              <!-- เบอร์โทรศัพท์ -->
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  {{ item.phoneNumber }}
                </div>
              </td>
              
              <!-- องค์กร -->
              <td class="px-4 py-3 text-sm text-gray-900">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <span class="truncate max-w-32" :title="item.organization">
                    {{ item.organization }}
                  </span>
                </div>
              </td>
              
              <!-- วันที่ลงทะเบียน -->
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {{ formatDate(item.registrationDate) }}
                </div>
              </td>
              
              <!-- สถานะเอกสาร -->
              <td class="px-4 py-3 whitespace-nowrap text-sm">
                <span 
                  :class="getStatusClass(item.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  <svg 
                    :class="getStatusIconClass(item.status)" 
                    class="w-3 h-3 mr-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path v-if="item.status === 'รอการอนุมัติ'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    <path v-else-if="item.status === 'อนุมัติแล้ว'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                  </svg>
                  {{ item.status }}
                </span>
              </td>
              
              <!-- วันที่อนุมัติ -->
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                <div v-if="item.approvalDate" class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {{ formatDate(item.approvalDate) }}
                </div>
                <div v-else class="text-gray-400 text-center">-</div>
              </td>
              
              <!-- หมายเหตุ -->
              <td class="px-4 py-3 text-sm text-gray-500">
                <div v-if="item.rejectReason" class="text-red-600 text-xs">
                  {{ item.rejectReason }}
                </div>
                <div v-else class="text-gray-400 text-center">-</div>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr v-if="filteredTableData.length === 0">
              <td colspan="8" class="px-4 py-12 text-center text-gray-500">
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

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-sm text-gray-700">
              แสดง <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> ถึง 
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredTableData.length) }}</span> 
              จาก <span class="font-medium">{{ filteredTableData.length }}</span> รายการ
            </p>
            <div class="ml-4">
              <label class="text-sm text-gray-700 mr-2">แสดงต่อหน้า:</label>
              <select 
                v-model="itemsPerPage" 
                class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
              </select>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage = 1"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              แรก
            </button>
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ก่อนหน้า
            </button>
            
            <span 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-1 text-sm border rounded-md cursor-pointer',
                page === currentPage 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </span>
            
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ถัดไป
            </button>
            <button
              @click="currentPage = totalPages"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              สุดท้าย
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="ml-3 text-lg font-medium text-gray-900">ดาวน์โหลดข้อมูล</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">
          เลือกรูปแบบไฟล์ที่ต้องการดาวน์โหลด ({{ filteredTableData.length }} รายการ)
        </p>
        
        <div class="space-y-3 mb-6">
          <div class="flex items-center">
            <input
              id="excel"
              type="radio"
              value="excel"
              v-model="exportFormat"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label for="excel" class="ml-3 flex items-center cursor-pointer">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM3.293 7.293A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clip-rule="evenodd"/>
              </svg>
              <div>
                <div class="text-sm font-medium text-gray-900">Excel (.xlsx)</div>
                <div class="text-xs text-gray-500">เหมาะสำหรับการวิเคราะห์ข้อมูล</div>
              </div>
            </label>
          </div>
          
          <div class="flex items-center">
            <input
              id="csv"
              type="radio"
              value="csv"
              v-model="exportFormat"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label for="csv" class="ml-3 flex items-center cursor-pointer">
              <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM3.293 7.293A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clip-rule="evenodd"/>
              </svg>
              <div>
                <div class="text-sm font-medium text-gray-900">CSV (.csv)</div>
                <div class="text-xs text-gray-500">เหมาะสำหรับการนำเข้าข้อมูล</div>
              </div>
            </label>
          </div>
          
          <div class="flex items-center">
            <input
              id="pdf"
              type="radio"
              value="pdf"
              v-model="exportFormat"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label for="pdf" class="ml-3 flex items-center cursor-pointer">
              <svg class="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
              <div>
                <div class="text-sm font-medium text-gray-900">PDF (.pdf)</div>
                <div class="text-xs text-gray-500">เหมาะสำหรับการพิมพ์และเก็บเอกสาร</div>
              </div>
            </label>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeExportModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            @click="handleExport"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            ดาวน์โหลด
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
      <div class="flex items-center">
        <svg v-if="messageType === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationListPage',
  data() {
    return {
      searchData: {
        department: '',
        organization: '',
        searchTerm: ''
      },
      currentPage: 1,
      itemsPerPage: 25,
      showExportModal: false,
      exportFormat: 'excel',
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

      tableData: [
        {
          id: 1,
          name: 'ธันวา ชัยรัตนานนท์',
          phoneNumber: '0617153737',
          organization: 'บริษัท ABC จำกัด',
          ownerImage: 'main3.jpg',
          idCard: 'บัตรประชาชน_ธันวา.pdf',
          socialSecurity: 'ประกันสังคม_ธันวา.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_ธันวา.pdf',
          certificate: 'certificate_ธันวา.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: '',
          registrationDate: '2024-01-15',
          approvalDate: ''
        },
        {
          id: 2,
          name: 'สมชาย ใจดี',
          phoneNumber: '0812345678',
          organization: 'บริษัท ABC จำกัด',
          ownerImage: 'profile_สมชาย.jpg',
          idCard: 'บัตรประชาชน_สมชาย.pdf',
          socialSecurity: 'ประกันสังคม_สมชาย.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_สมชาย.pdf',
          certificate: 'certificate_สมชาย.pdf',
          status: 'อนุมัติแล้ว',
          rejectReason: '',
          registrationDate: '2024-01-20',
          approvalDate: '2024-01-25'
        },
        {
          id: 3,
          name: 'สมหญิง รักสุข',
          phoneNumber: '0923456789',
          organization: 'บริษัท XYZ จำกัด',
          ownerImage: 'profile_สมหญิง.jpg',
          idCard: 'บัตรประชาชน_สมหญิง.pdf',
          socialSecurity: 'ประกันสังคม_สมหญิง.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_สมหญิง.pdf',
          certificate: 'certificate_สมหญิง.pdf',
          status: 'ไม่อนุมัติ',
          rejectReason: 'เอกสารไม่ครบ (ขาดหลักฐานประกันสังคม)',
          registrationDate: '2024-02-01',
          approvalDate: ''
        },
        {
          id: 4,
          name: 'วิชัย สมใจ',
          phoneNumber: '0834567890',
          organization: 'บริษัท XYZ จำกัด',
          ownerImage: 'profile_วิชัย.jpg',
          idCard: 'บัตรประชาชน_วิชัย.pdf',
          socialSecurity: 'ประกันสังคม_วิชัย.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_วิชัย.pdf',
          certificate: 'certificate_วิชัย.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: '',
          registrationDate: '2024-02-05',
          approvalDate: ''
        },
        {
          id: 5,
          name: 'นภัส ศรีสุข',
          phoneNumber: '0945678901',
          organization: 'บริษัท DEF จำกัด',
          ownerImage: 'profile_นภัส.jpg',
          idCard: 'บัตรประชาชน_นภัส.pdf',
          socialSecurity: 'ประกันสังคม_นภัส.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_นภัส.pdf',
          certificate: 'certificate_นภัส.pdf',
          status: 'อนุมัติแล้ว',
          rejectReason: '',
          registrationDate: '2024-02-10',
          approvalDate: '2024-02-12'
        },
        {
          id: 6,
          name: 'อารีย์ มั่นคง',
          phoneNumber: '0856789012',
          organization: 'มหาวิทยาลัย GHI',
          ownerImage: 'profile_อารีย์.jpg',
          idCard: 'บัตรประชาชน_อารีย์.pdf',
          socialSecurity: 'ประกันสังคม_อารีย์.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_อารีย์.pdf',
          certificate: 'certificate_อารีย์.pdf',
          status: 'อนุมัติแล้ว',
          rejectReason: '',
          registrationDate: '2024-02-15',
          approvalDate: '2024-02-20'
        },
        {
          id: 7,
          name: 'สุรชัย วีรกุล',
          phoneNumber: '0967890123',
          organization: 'มหาวิทยาลัย GHI',
          ownerImage: 'profile_สุรชัย.jpg',
          idCard: 'บัตรประชาชน_สุรชัย.pdf',
          socialSecurity: 'ประกันสังคม_สุรชัย.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_สุรชัย.pdf',
          certificate: 'certificate_สุรชัย.pdf',
          status: 'ไม่อนุมัติ',
          rejectReason: 'ไม่อนุมัติการ (ไม่ผ่านการพิจารณาตามเกณฑ์)',
          registrationDate: '2024-02-18',
          approvalDate: ''
        },
        {
          id: 8,
          name: 'มณีรัตน์ สุขใส',
          phoneNumber: '0878901234',
          organization: 'โรงพยาบาล JKL',
          ownerImage: 'profile_มณีรัตน์.jpg',
          idCard: 'บัตรประชาชน_มณีรัตน์.pdf',
          socialSecurity: 'ประกันสังคม_มณีรัตน์.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_มณีรัตน์.pdf',
          certificate: 'certificate_มณีรัตน์.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: '',
          registrationDate: '2024-02-20',
          approvalDate: ''
        },
        {
          id: 9,
          name: 'ประวิท มีสุข',
          phoneNumber: '0789012345',
          organization: 'โรงพยาบาล JKL',
          ownerImage: 'profile_ประวิท.jpg',
          idCard: 'บัตรประชาชน_ประวิท.pdf',
          socialSecurity: 'ประกันสังคม_ประวิท.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_ประวิท.pdf',
          certificate: 'certificate_ประวิท.pdf',
          status: 'อนุมัติแล้ว',
          rejectReason: '',
          registrationDate: '2024-02-22',
          approvalDate: '2024-02-25'
        },
        {
          id: 10,
          name: 'สุรีย์ วิทยา',
          phoneNumber: '0801234567',
          organization: 'บริษัท DEF จำกัด',
          ownerImage: 'profile_สุรีย์.jpg',
          idCard: 'บัตรประชาชน_สุรีย์.pdf',
          socialSecurity: 'ประกันสังคม_สุรีย์.pdf',
          approvalDocument: 'เอกสารประกอบการพิจารณาอนุมัติ_สุรีย์.pdf',
          certificate: 'certificate_สุรีย์.pdf',
          status: 'รอการอนุมัติ',
          rejectReason: '',
          registrationDate: '2024-03-01',
          approvalDate: ''
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
    },

    totalCount() {
      return this.tableData.length;
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

    getStatusClass(status) {
      const classes = {
        'รอการอนุมัติ': 'bg-yellow-100 text-yellow-800',
        'อนุมัติแล้ว': 'bg-green-100 text-green-800',
        'ไม่อนุมัติ': 'bg-red-100 text-red-800',
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },

    getStatusIconClass(status) {
      const classes = {
        'รอการอนุมัติ': 'text-yellow-600',
        'อนุมัติแล้ว': 'text-green-600',
        'ไม่อนุมัติ': 'text-red-600',
      };
      return classes[status] || 'text-gray-600';
    },

    getStatusCount(status) {
      return this.tableData.filter(item => item.status === status).length;
    },

    formatDate(dateString) {
      if (!dateString) return '-';
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        timeZone: 'Asia/Bangkok'
      };
      return new Date(dateString).toLocaleDateString('th-TH', options);
    },

    closeExportModal() {
      this.showExportModal = false;
    },

    handleExport() {
      try {
        const data = this.filteredTableData;
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        
        if (this.exportFormat === 'excel') {
          this.exportToExcel(data, `รายชื่อผู้ลงทะเบียน_${timestamp}.xlsx`);
        } else if (this.exportFormat === 'csv') {
          this.exportToCSV(data, `รายชื่อผู้ลงทะเบียน_${timestamp}.csv`);
        } else if (this.exportFormat === 'pdf') {
          this.exportToPDF(data, `รายชื่อผู้ลงทะเบียน_${timestamp}.pdf`);
        }
        
        this.showNotification(`ดาวน์โหลดไฟล์ ${this.exportFormat.toUpperCase()} เรียบร้อยแล้ว`, 'success');
        this.closeExportModal();
      } catch (error) {
        console.error('Export error:', error);
        this.showNotification('เกิดข้อผิดพลาดในการดาวน์โหลด', 'error');
      }
    },

    exportToCSV(data, filename) {
      const headers = [
        'ลำดับ',
        'รายชื่อ',
        'เบอร์โทรศัพท์',
        'องค์กร',
        'วันที่ลงทะเบียน',
        'สถานะเอกสาร',
        'วันที่อนุมัติ',
        'หมายเหตุ'
      ];
      
      const csvContent = [
        headers.join(','),
        ...data.map((item, index) => [
          index + 1,
          `"${item.name}"`,
          item.phoneNumber,
          `"${item.organization}"`,
          this.formatDate(item.registrationDate),
          `"${item.status}"`,
          this.formatDate(item.approvalDate) || '',
          `"${item.rejectReason || ''}"`
        ].join(','))
      ].join('\n');
      
      // Add BOM for UTF-8 to support Thai characters
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    },

    exportToExcel(data, filename) {
      // สำหรับ Excel จริง ควรใช้ library เช่น SheetJS
      // ในที่นี้จะใช้ CSV format แต่บันทึกเป็น .xlsx
      const headers = [
        'ลำดับ',
        'รายชื่อ', 
        'เบอร์โทรศัพท์',
        'องค์กร',
        'วันที่ลงทะเบียน',
        'สถานะเอกสาร',
        'วันที่อนุมัติ',
        'หมายเหตุ'
      ];
      
      let excelContent = '<table border="1">';
      excelContent += '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
      
      data.forEach((item, index) => {
        excelContent += '<tr>';
        excelContent += `<td>${index + 1}</td>`;
        excelContent += `<td>${item.name}</td>`;
        excelContent += `<td>${item.phoneNumber}</td>`;
        excelContent += `<td>${item.organization}</td>`;
        excelContent += `<td>${this.formatDate(item.registrationDate)}</td>`;
        excelContent += `<td>${item.status}</td>`;
        excelContent += `<td>${this.formatDate(item.approvalDate) || ''}</td>`;
        excelContent += `<td>${item.rejectReason || ''}</td>`;
        excelContent += '</tr>';
      });
      
      excelContent += '</table>';
      
      const blob = new Blob(['\ufeff', excelContent], {
        type: 'application/vnd.ms-excel;charset=utf-8;'
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    },

    exportToPDF(data, filename) {
      // สำหรับ PDF จริง ควรใช้ library เช่น jsPDF
      // ในที่นี้จะสร้าง HTML สำหรับพิมพ์
      let pdfContent = `
        <html>
        <head>
          <meta charset="UTF-8">
          <title>รายชื่อผู้ลงทะเบียน</title>
          <style>
            body { font-family: 'Sarabun', sans-serif; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .header { text-align: center; margin-bottom: 20px; }
            .status-approved { color: green; font-weight: bold; }
            .status-pending { color: orange; font-weight: bold; }
            .status-rejected { color: red; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>รายชื่อผู้ลงทะเบียนทั้งหมด</h2>
            <p>จำนวน ${data.length} รายการ | วันที่พิมพ์: ${new Date().toLocaleDateString('th-TH')}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รายชื่อ</th>
                <th>เบอร์โทรศัพท์</th>
                <th>องค์กร</th>
                <th>วันที่ลงทะเบียน</th>
                <th>สถานะเอกสาร</th>
                <th>วันที่อนุมัติ</th>
                <th>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      data.forEach((item, index) => {
        const statusClass = item.status === 'อนุมัติแล้ว' ? 'status-approved' : 
                           item.status === 'รอการอนุมัติ' ? 'status-pending' : 'status-rejected';
        
        pdfContent += `
          <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.phoneNumber}</td>
            <td>${item.organization}</td>
            <td>${this.formatDate(item.registrationDate)}</td>
            <td><span class="${statusClass}">${item.status}</span></td>
            <td>${this.formatDate(item.approvalDate) || '-'}</td>
            <td>${item.rejectReason || '-'}</td>
          </tr>
        `;
      });
      
      pdfContent += `
            </tbody>
          </table>
        </body>
        </html>
      `;
      
      // เปิดหน้าต่างใหม่สำหรับพิมพ์
      const printWindow = window.open('', '_blank');
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
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
    console.log('Registration List Page loaded with', this.tableData.length, 'records');
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
    min-width: 1000px;
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
  background-color: #2563eb;
  border-color: #2563eb;
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

  /* Mobile table adjustments */
  .mobile-table {
    font-size: 0.75rem;
  }

  .mobile-table th,
  .mobile-table td {
    padding: 0.5rem 0.25rem;
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

  /* Hide interactive elements when printing */
  button, .bg-blue-600, .fixed {
    display: none !important;
  }

  /* Optimize table for printing */
  table {
    page-break-inside: auto;
  }
  
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  thead {
    display: table-header-group;
  }
  
  tfoot {
    display: table-footer-group;
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

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom badge styles */
.status-badge {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
}

/* Header gradient styling */
.header-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

/* Custom table section shadow */
.table-section {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-section:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease-in-out;
}

/* Notification animation */
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

/* Profile avatar styling */
.profile-avatar {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}

/* Export modal styling */
.export-option:hover {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;
}

/* Pagination styling */
.pagination-button {
  transition: all 0.2s ease-in-out;
}

.pagination-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Statistics card animations */
.stats-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Search input styling */
.search-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Table header styling */
.table-header {
  background: linear-gradient(to right, #f8fafc, #f1f5f9);
}

/* Organization badge */
.org-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Phone number styling */
.phone-number {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-weight: 500;
}

/* Date styling */
.date-text {
  font-variant-numeric: tabular-nums;
}

/* Loading spinner for export */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

/* Enhanced responsive design */
@media (max-width: 1024px) {
  .lg-hide {
    display: none;
  }
}

@media (max-width: 768px) {
  .md-hide {
    display: none;
  }
  
  .mobile-stack {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 640px) {
  .sm-hide {
    display: none;
  }
  
  .mobile-full {
    width: 100%;
  }
}

/* Dark mode support (if needed) */
@media (prefers-color-scheme: dark) {
  .dark-mode {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  .dark-mode .bg-white {
    background-color: #374151;
  }
  
  .dark-mode .text-gray-800 {
    color: #f9fafb;
  }
  
  .dark-mode .text-gray-600 {
    color: #d1d5db;
  }
}

/* Accessibility improvements */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus indicators for keyboard navigation */
.focus-visible:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .high-contrast {
    border: 2px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>