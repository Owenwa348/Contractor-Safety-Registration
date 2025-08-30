<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">ระบบสร้างการฝึกอบรม</h1>
        <p class="text-gray-600">จัดการการฝึกอบรมและดูตารางการอบรม</p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-lg p-6 shadow border border-gray-200 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
              <p class="text-2xl font-bold" :class="stat.color">{{ stat.value }}</p>
            </div>
            <div class="p-3 rounded-lg" :class="stat.bgColor">
              <svg class="w-6 h-6" :class="stat.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Training Button -->
      <div class="mb-6 flex justify-end">
        <button 
          @click="openCreateTrainingModal" 
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-all hover:shadow-lg flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          สร้างการอบรม
        </button>
      </div>

      <!-- Calendar Component -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <!-- Calendar Header -->
        <div class="flex flex-col lg:flex-row justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div class="flex items-center gap-3 mb-4 lg:mb-0">
            <button @click="previousPeriod" class="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all" :title="viewMode === 'month' ? 'เดือนก่อน' : 'สัปดาห์ก่อน'">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextPeriod" class="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all" :title="viewMode === 'month' ? 'เดือนถัดไป' : 'สัปดาห์ถัดไป'">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <button @click="goToToday" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-all hover:shadow-lg">วันนี้</button>
            <div class="hidden md:flex items-center gap-2 ml-4">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="ค้นหาการอบรม..." 
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button @click="clearSearch" v-if="searchQuery" class="p-2 text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          <h2 class="text-xl font-bold text-gray-800 text-center flex-1">{{ currentPeriodTitle }}</h2>
          <div class="flex gap-2 mt-4 lg:mt-0">
            <button v-for="mode in viewModes" :key="mode.value" :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-md',
                viewMode === mode.value ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
              ]" @click="setViewMode(mode.value)">{{ mode.label }}</button>
          </div>
        </div>

        <!-- Month View -->
        <div v-if="viewMode === 'month'" class="grid grid-cols-7">
          <div v-for="day in daysOfWeek" :key="day" class="p-4 text-center font-semibold text-gray-700 bg-gray-100 border-r border-gray-200 last:border-r-0">{{ day }}</div>
          <div v-for="date in calendarDates" :key="date.key" class="min-h-[120px] p-3 border-r border-b border-gray-200 last:border-r-0 transition-all hover:bg-gray-50" :class="getDateCellClass(date)">
            <div class="flex justify-between items-start mb-2">
              <span class="text-sm font-semibold" :class="date.isToday ? 'text-blue-600' : ''">{{ date.day }}</span>
              <span v-if="date.isToday" class="text-xs bg-blue-600 text-white px-2 py-1 rounded">วันนี้</span>
            </div>
            <div class="space-y-1">
              <div v-for="event in getEventsForDate(date.fullDate)" :key="event.id" class="text-xs text-white p-2 rounded cursor-pointer hover:opacity-80 transition-all hover:shadow-sm" @click="viewEvent(event)" :style="{ backgroundColor: event.color }" draggable="true" @dragstart="startDrag(event, $event)" @dragover.prevent @drop="handleDrop(date.fullDate, $event)">
                <div class="font-medium truncate">{{ event.title }}</div>
                <div class="text-xs opacity-90">{{ formatDateRange(event) }}</div>
                <div class="text-xs opacity-90">{{ event.currentParticipants || 0 }}/{{ event.maxParticipants }} คน</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-else-if="viewMode === 'week'">
          <div class="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] border-b border-gray-200">
            <div class="p-4 text-center font-semibold text-gray-700 bg-gray-100 border-r border-gray-200">เวลา</div>
            <div v-for="day in weekDays" :key="day.key" class="p-4 text-center bg-gray-100 border-r border-gray-200 last:border-r-0" :class="{ 'bg-blue-100': day.isToday }">
              <div class="font-semibold text-gray-700">{{ day.dayName }}</div>
              <div class="text-sm text-gray-500 mt-1">{{ day.date }}</div>
              <div v-if="day.isToday" class="text-xs text-blue-600 font-medium mt-1">วันนี้</div>
            </div>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div v-for="hour in timeSlots" :key="`hour-${hour}`" class="grid grid-cols-[100px_repeat(7,minmax(0,1fr))] border-b border-gray-100">
              <div class="p-3 text-xs text-gray-600 bg-gray-50 border-r border-gray-200 font-medium">{{ hour }}:00</div>
              <div v-for="day in weekDays" :key="`${day.key}-${hour}`" class="min-h-16 p-2 border-r border-gray-200 last:border-r-0 transition-all" @dragover.prevent @drop="handleDropToTimeSlot(day.fullDate, parseInt(hour), $event)">
                <div v-for="event in getEventsForDayAndHour(day.fullDate, hour)" :key="event.id" class="text-xs text-white p-2 rounded mb-1 cursor-pointer hover:opacity-80 transition-all hover:shadow-sm" :style="{ backgroundColor: event.color }" @click="viewEvent(event)" draggable="true" @dragstart="startDrag(event, $event)">
                  <div class="font-medium">{{ event.title }}</div>
                  <div class="text-xs opacity-90">{{ event.currentParticipants || 0 }}/{{ event.maxParticipants }} คน</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Training Modal -->
      <div v-if="showAddEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeAddEventModal">
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-h-[90vh] overflow-y-auto" @click.stop>
          <h3 class="text-xl font-bold text-gray-800 mb-4">{{ editingEvent ? 'แก้ไขการอบรม' : 'สร้างการอบรมใหม่' }}</h3>
          <form @submit.prevent="saveEvent" class="space-y-6">
            <!-- Training Type Section -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-3">
                <h4 class="font-bold text-green-800">ข้อมูลการอบรม</h4>
              </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้อการอบรม <span class="text-red-500">*</span></label>
              <select v-model="eventForm.type" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">เลือกหัวข้อการอบรม</option>
                <option v-for="type in trainingTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            </div>
            
            <!-- Date and Time Section -->
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-3">
                <h4 class="font-bold text-purple-800">วันที่และเวลา</h4>
              </div>
              
            <!-- Date Range Selection -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">วันที่เริ่มต้น <span class="text-red-500">*</span></label>
                <input v-model="eventForm.startDate" type="date" required :min="minDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" @change="validateDateRange" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">วันที่สิ้นสุด <span class="text-red-500">*</span></label>
                <input v-model="eventForm.endDate" type="date" required :min="eventForm.startDate || minDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" @change="validateDateRange" />
              </div>
            </div>

            <!-- Recurrence Options -->
            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <label class="block text-sm font-medium text-gray-700 mb-3">การทำซ้ำ</label>
              <div class="space-y-3">
                <div>
                  <label class="inline-flex items-center">
                    <input v-model="eventForm.recurrence.enabled" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" @change="toggleRecurrence" />
                    <span class="ml-2 text-sm text-gray-700">ทำซ้ำการอบรม</span>
                  </label>
                </div>
                
                <div v-if="eventForm.recurrence.enabled" class="space-y-3 pl-6 border-l-2 border-blue-200">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">ความถี่การทำซ้ำ</label>
                      <select v-model="eventForm.recurrence.frequency" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500">
                        <option value="daily">ทุกวัน</option>
                        <option value="weekdays">ทุกวันทำการ (จ-ศ)</option>
                        <option value="weekly">ทุกสัปดาห์</option>
                        <option value="monthly">ทุกเดือน</option>
                        <option value="yearly">ทุกปี</option>
                        <option value="custom">กำหนดเอง</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">ทุก {{ getIntervalLabel() }}</label>
                      <input v-model.number="eventForm.recurrence.interval" type="number" min="1" :max="getMaxInterval()" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" :placeholder="getIntervalPlaceholder()" />
                    </div>
                  </div>
                  
                  <!-- Weekly Recurrence Day Selection -->
                  <div v-if="eventForm.recurrence.frequency === 'weekly'">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-xs font-medium text-blue-800">การทำซ้ำรายสัปดาห์</span>
                      </div>
                      <p class="text-xs text-blue-700">เลือกวันในสัปดาห์ที่ต้องการทำซ้ำการอบรม</p>
                    </div>
                    <div class="grid grid-cols-7 gap-2">
                      <div v-for="(day, index) in daysOfWeek" :key="day" class="text-center">
                        <input 
                          v-model="eventForm.recurrence.daysOfWeek" 
                          :value="index" 
                          type="checkbox" 
                          :id="`recur-week-day-${index}`" 
                          class="mb-1 form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
                        />
                        <label :for="`recur-week-day-${index}`" class="block text-xs text-gray-700 cursor-pointer hover:text-blue-600 font-medium">{{ day.slice(0, 2) }}</label>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">หากไม่เลือก จะใช้วันเดียวกับวันที่เริ่มต้น</p>
                  </div>
                  
                  <!-- Weekdays Info -->
                  <div v-if="eventForm.recurrence.frequency === 'weekdays'">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-green-600">💼</span>
                        <span class="text-xs font-medium text-green-800">ทุกวันทำการ</span>
                      </div>
                      <p class="text-xs text-green-700">การอบรมจะทำซ้ำทุกวันจันทร์ - ศุกร์ (ไม่รวมวันหยุด)</p>
                      <div class="flex gap-1 mt-2">
                        <span v-for="day in ['จ', 'อ', 'พ', 'พฤ', 'ศ']" :key="day" class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">{{ day }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Custom Recurrence -->
                  <div v-if="eventForm.recurrence.frequency === 'custom'">
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-xs font-medium text-purple-800">กำหนดค่าเอง</span>
                      </div>
                      <p class="text-xs text-purple-700">เลือกวันที่ต้องการจัดการอบรมตามความต้องการ</p>
                    </div>
                    <div class="grid grid-cols-7 gap-2">
                      <div v-for="(day, index) in daysOfWeek" :key="day" class="text-center">
                        <input 
                          v-model="eventForm.recurrence.customDays" 
                          :value="index" 
                          type="checkbox" 
                          :id="`recur-custom-day-${index}`" 
                          class="mb-1 form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500" 
                        />
                        <label :for="`recur-custom-day-${index}`" class="block text-xs text-gray-700 cursor-pointer hover:text-purple-600 font-medium">{{ day.slice(0, 2) }}</label>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">เลือกวันที่ต้องการตามความเหมาะสม</p>
                  </div>
                  
                  <div v-if="eventForm.recurrence.frequency === 'yearly'">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-xs font-medium text-blue-800">การทำซ้ำรายปี</span>
                      </div>
                      <p class="text-xs text-blue-700">การอบรมจะทำซ้ำในวันและเดือนเดียวกันทุกปี</p>
                      <p class="text-xs text-blue-600 mt-1">ตัวอย่าง: หากเริ่มวันที่ 15 มีนาคม จะทำซ้ำวันที่ 15 มีนาคมของทุกปี</p>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-600 mb-1">สิ้นสุดการทำซ้ำ</label>
                      <select v-model="eventForm.recurrence.endType" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500">
                        <option value="never">ไม่สิ้นสุด</option>
                        <option value="after">หลังจาก (ครั้ง)</option>
                        <option value="on">จนถึงวันที่</option>
                      </select>
                    </div>
                    <div v-if="eventForm.recurrence.endType === 'after'">
                      <label class="block text-xs font-medium text-gray-600 mb-1">จำนวนครั้งที่ต้องการ</label>
                      <input v-model.number="eventForm.recurrence.occurrences" type="number" min="1" max="100" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" placeholder="เช่น 10 ครั้ง" />
                    </div>
                    <div v-else-if="eventForm.recurrence.endType === 'on'">
                      <label class="block text-xs font-medium text-gray-600 mb-1">วันที่สิ้นสุด</label>
                      <input v-model="eventForm.recurrence.endDate" type="date" :min="eventForm.startDate" class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Training Days Selection (for multi-day trainings - SEPARATE from recurrence) -->
            <div v-if="isMultiDay && !eventForm.recurrence.enabled">
              <div class="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-sm font-medium text-purple-800">วันในช่วงวันที่</span>
                </div>
                <p class="text-xs text-purple-700">เลือกวันที่จะจัดการอบรมในช่วงวันที่ที่กำหนด</p>
              </div>
              <div class="grid grid-cols-7 gap-2">
                <div v-for="(day, index) in daysOfWeek" :key="day" class="text-center">
                  <input 
                    v-model="eventForm.selectedDays" 
                    :value="index" 
                    type="checkbox" 
                    :id="`multi-day-${index}`"
                    class="mb-1 form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <label :for="`multi-day-${index}`" class="block text-xs text-gray-700 cursor-pointer hover:text-purple-600 font-medium">{{ day.slice(0, 2) }}</label>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-2">หากไม่เลือก จะจัดการอบรมทุกวันในช่วงวันที่</p>
            </div>
            
            <!-- Time Range Selection -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">เวลาเริ่มต้น <span class="text-red-500">*</span></label>
                <select v-model.number="eventForm.startTime" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" @change="validateTimeRange">
                  <option value="">เลือกเวลาเริ่มต้น</option>
                  <option v-for="hour in allTimeSlots" :key="`start-${hour}`" :value="hour">{{ formatTimeDisplay(hour) }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">เวลาสิ้นสุด <span class="text-red-500">*</span></label>
                <select v-model.number="eventForm.endTime" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">เลือกเวลาสิ้นสุด</option>
                  <option v-for="hour in availableEndTimes" :key="`end-${hour}`" :value="hour">{{ formatTimeDisplay(hour) }}</option>
                </select>
              </div>
            </div>
            </div>
            
            <!-- Training Details Section -->
            <div class="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-3">
                <h4 class="font-bold text-orange-800">รายละเอียดการอบรม</h4>
              </div>
              


            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ผู้สอน/ผู้ตรวจ <span class="text-red-500">*</span></label>
              <input v-model.trim="eventForm.examiner" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="ชื่อผู้สอน" maxlength="50" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ห้องอบรม <span class="text-red-500">*</span></label>
              <select v-model="eventForm.room" required @change="updateMaxParticipantsFromRoom" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">เลือกห้อง</option>
                <option v-for="room in rooms" :key="room.name" :value="room.name">{{ room.name }} ({{ room.capacity }} ที่นั่ง)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">จำนวนผู้เข้าอบรมสูงสุด <span class="text-red-500">*</span></label>
              <input v-model.number="eventForm.maxParticipants" type="number" min="1" :max="getMaxCapacityForSelectedRoom()" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="จำนวนสูงสุด" />
              <p v-if="eventForm.room" class="text-xs text-gray-500 mt-1">ห้องนี้รองรับได้สูงสุด {{ getMaxCapacityForSelectedRoom() }} คน</p>
            </div>
            </div>

            <!-- Enhanced Preview Section -->
            <div v-if="trainingPreview.length > 0" class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-3">
                <h4 class="font-bold text-blue-800">ตัวอย่างการอบรมที่จะสร้าง</h4>
                <span class="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">{{ trainingPreview.length }} ครั้ง</span>
              </div>
              
              <div class="max-h-40 overflow-y-auto space-y-2 bg-white rounded-lg p-3 border">
                <div v-for="(preview, index) in trainingPreview.slice(0, 8)" :key="preview.date" class="flex items-center justify-between p-2 bg-gray-50 rounded border-l-4 border-blue-400">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold text-gray-500">{{ index + 1 }}.</span>
                    <div>
                      <div class="text-sm font-medium text-gray-800">{{ formatThaiDate(preview.date) }}</div>
                      <div class="text-xs text-gray-600">{{ daysOfWeek[preview.dayOfWeek] }}</div>
                    </div>
                  </div>
                  <div class="text-sm text-blue-700 font-medium">
                    {{ formatTimeRange(preview.startTime, preview.endTime) }}
                  </div>
                </div>
                
                <div v-if="trainingPreview.length > 8" class="text-center p-2 bg-blue-100 rounded border">
                  <div class="text-sm text-blue-700 font-medium">
                    และอีก {{ trainingPreview.length - 8 }} ครั้ง...
                  </div>
                  <div class="text-xs text-blue-600 mt-1">
                    คลิกสร้างเพื่อดูทั้งหมด
                  </div>
                </div>
              </div>
              
              <!-- Recurrence Summary -->
              <div v-if="eventForm.recurrence.enabled" class="mt-3 p-3 bg-white rounded-lg border">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-sm font-medium text-gray-700">สรุปการตั้งค่าทำซ้ำ:</span>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                  <div>• ความถี่: {{ getFrequencyText() }}</div>
                  <div v-if="(eventForm.recurrence.frequency === 'weekly' && eventForm.recurrence.daysOfWeek.length > 0) || (eventForm.recurrence.frequency === 'custom' && eventForm.recurrence.customDays.length > 0) || eventForm.recurrence.frequency === 'weekdays'">
                    • วันที่เลือก: {{ getSelectedDaysText() }}
                  </div>
                  <div>• สิ้นสุด: {{ getEndTypeText() }}</div>
                </div>
              </div>
            </div>

            <div v-if="hasFormErrors" class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-sm text-red-600">{{ formErrorMessage }}</p>
            </div>

            <div class="flex gap-3 pt-4">
              <button type="submit" :disabled="!isFormValid" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
                {{ editingEvent ? 'บันทึกการแก้ไข' : `สร้างการอบรม (${trainingPreview.length} ครั้ง)` }}
              </button>
              <button type="button" @click="closeAddEventModal" class="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- View Event Modal -->
      <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeViewModal">
        <div class="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg" @click.stop>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-gray-800">รายละเอียดการอบรม</h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div v-if="selectedEvent" class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-bold text-lg text-gray-800 mb-3">{{ selectedEvent.title }}</h4>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <div v-for="detail in eventDetails" :key="detail.label" class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="detail.icon"></path>
                  </svg>
                  <span class="text-gray-700">{{ detail.value }}</span>
                </div>
              </div>
              
              <!-- แสดงสถานะผู้เข้าอบรม -->
              <div class="mt-4 p-3 bg-white rounded border">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">สถานะผู้เข้าอบรม</span>
                  <span class="text-sm font-bold" :class="getParticipantStatusColor(selectedEvent)">
                    {{ selectedEvent.maxParticipants - (selectedEvent.currentParticipants || 0) }} ที่ว่าง
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: `${getParticipantPercentage(selectedEvent)}%` }"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500">
                  <span>{{ selectedEvent.currentParticipants || 0 }} คน</span>
                  <span>{{ selectedEvent.maxParticipants }} คน</span>
                </div>
              </div>
            </div>
            
            <div class="flex gap-3 pt-4">
              <button @click="editEvent(selectedEvent)" class="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-all hover:-translate-y-0.5">แก้ไข</button>
              <button @click="deleteEvent(selectedEvent.id)" class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-all hover:-translate-y-0.5">ลบ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// Reactive data
const viewMode = ref("month");
const currentDate = ref(new Date());
const showAddEventModal = ref(false);
const showViewModal = ref(false);
const selectedEvent = ref(null);
const editingEvent = ref(false);
const draggedEvent = ref(null);
const searchQuery = ref("");

// Event form data
const eventForm = ref({
  type: "", // Training type moved to replace title
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  selectedDays: [], // For multi-day trainings
  examiner: "",
  room: "",
  maxParticipants: null,
  currentParticipants: 0,
  // Recurrence settings
  recurrence: {
    enabled: false,
    frequency: 'weekly', // daily, weekdays, weekly, monthly, yearly, custom
    interval: 1, // every N days/weeks/months
    daysOfWeek: [], // for weekly recurrence [0-6] where 0=Sunday
    customDays: [], // for custom recurrence [0-6] where 0=Sunday
    endType: 'never', // never, after, on
    occurrences: 10, // for endType: 'after'
    endDate: '' // for endType: 'on'
  }
});

// Sample events data
const events = ref([
  { 
    id: 1, 
    title: "อบรมพื้นฐานความปลอดภัย", 
    startDate: "2025-08-20",
    endDate: "2025-08-20", 
    startTime: 9,
    endTime: 11, 
    type: "อบรมพื้นฐานความปลอดภัย", 
    examiner: "นายสมชัย งบ.1", 
    room: "ห้อง A (30 ที่นั่ง)", 
    color: "#3b82f6", 
    maxParticipants: 25, 
    currentParticipants: 20, 
    isBooked: false 
  },
  { 
    id: 2, 
    title: "อบรมการใช้เครื่องมือ", 
    startDate: "2025-08-22",
    endDate: "2025-08-24", 
    startTime: 13,
    endTime: 16, 
    type: "อบรมการใช้เครื่องมือ", 
    examiner: "นายสุรพล งบ.2", 
    room: "ห้อง B (50 ที่นั่ง)", 
    color: "#10b981", 
    maxParticipants: 20, 
    currentParticipants: 5, 
    isBooked: false 
  },
    { 
    id: 3, 
    title: "อบรมการใช้เครื่องจักร", 
    startDate: "2025-09-03",
    endDate: "2025-09-08", 
    startTime: 13,
    endTime: 16, 
    type: "อบรมการใช้เครื่องจักร", 
    examiner: "นายสุรพล งบ.2", 
    room: "ห้อง B (50 ที่นั่ง)", 
    color: "#10b981", 
    maxParticipants: 20, 
    currentParticipants: 5, 
    isBooked: false 
  },
  { 
    id: 4, 
    title: "อบรมการประกอบอุปกรณ์", 
    startDate: "2025-09-12",
    endDate: "2025-09-18", 
    startTime: 13,
    endTime: 16, 
    type: "อบรมการประกอบอุปกรณ์", 
    examiner: "นายสุรพล งบ.2", 
    room: "ห้อง B (50 ที่นั่ง)", 
    color: "#10b981", 
    maxParticipants: 20, 
    currentParticipants: 5, 
    isBooked: false 
  },
]);

// Constants
const daysOfWeek = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const trainingTypes = ["อบรมพื้นฐานความปลอดภัย", "อบรมผู้ควบคุมงาน", "อบรมการใช้เครื่องมือ", "อบรมการใช้เครื่องจักร", "อบรมการประกอบอุปกรณ์", "อบรมการดับเพลิง"];
const rooms = [
  { name: "ห้อง A (30 ที่นั่ง)", capacity: 30 },
  { name: "ห้อง B (50 ที่นั่ง)", capacity: 50 },
  { name: "ห้อง C (20 ที่นั่ง)", capacity: 20 },
  { name: "ห้องประชุมใหญ่ (100 ที่นั่ง)", capacity: 100 }
];
const viewModes = [{ value: 'month', label: 'เดือน' }, { value: 'week', label: 'สัปดาห์' }];
const allTimeSlots = Array.from({length: 14}, (_, i) => i + 6); // 6:00 - 19:00

// Computed properties
const stats = computed(() => [
  { label: "การอบรมเดือนนี้", value: thisMonthEvents.value, color: "text-blue-600", bgColor: "bg-blue-100", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "การอบรมทั้งหมด", value: events.value.length, color: "text-purple-600", bgColor: "bg-purple-100", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
]);

const eventDetails = computed(() => {
  if (!selectedEvent.value) return [];
  return [
    { label: "ช่วงวันที่", value: formatDateRange(selectedEvent.value), icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "เวลา", value: formatTimeRange(selectedEvent.value.startTime, selectedEvent.value.endTime), icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "สถานที่", value: selectedEvent.value.room, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
    { label: "ผู้สอน", value: selectedEvent.value.examiner, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { label: "จำนวนผู้เข้าอบรม", value: `${selectedEvent.value.currentParticipants || 0}/${selectedEvent.value.maxParticipants} คน`, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
  ];
});

const currentMonthYear = computed(() => `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear() + 543}`);

const currentPeriodTitle = computed(() => {
  if (viewMode.value === 'week') {
    const startOfWeek = new Date(currentDate.value);
    startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      return `${startOfWeek.getDate()}-${endOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getFullYear() + 543}`;
    } else {
      return `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${monthNames[endOfWeek.getMonth()]} ${startOfWeek.getFullYear() + 543}`;
    }
  }
  return currentMonthYear.value;
});

const filteredEvents = computed(() => {
  if (!searchQuery.value.trim()) return events.value;
  
  const query = searchQuery.value.toLowerCase().trim();
  return events.value.filter(event => 
    event.title.toLowerCase().includes(query) ||
    event.type.toLowerCase().includes(query) ||
    event.examiner.toLowerCase().includes(query) ||
    event.room.toLowerCase().includes(query)
  );
});

const thisMonthEvents = computed(() => {
  const eventsInMonth = events.value.filter(event => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const currentMonth = currentDate.value.getMonth();
    const currentYear = currentDate.value.getFullYear();
    
    return (eventStartDate.getMonth() === currentMonth && eventStartDate.getFullYear() === currentYear) ||
           (eventEndDate.getMonth() === currentMonth && eventEndDate.getFullYear() === currentYear);
  });
  return eventsInMonth.length;
});

const availableSeats = computed(() => {
  return events.value.reduce((total, event) => {
    return total + (event.maxParticipants - (event.currentParticipants || 0));
  }, 0);
});

const totalParticipants = computed(() => {
  return events.value.reduce((total, event) => {
    return total + (event.currentParticipants || 0);
  }, 0);
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const isMultiDay = computed(() => {
  return eventForm.value.startDate && eventForm.value.endDate && 
         eventForm.value.startDate !== eventForm.value.endDate;
});

const availableEndTimes = computed(() => {
  if (!eventForm.value.startTime) return [];
  
  return allTimeSlots.filter(hour => hour > eventForm.value.startTime);
});

const trainingPreview = computed(() => {
  if (!eventForm.value.startDate || !eventForm.value.endDate || 
      !eventForm.value.startTime || !eventForm.value.endTime) {
    return [];
  }

  const sessions = [];
  
  if (eventForm.value.recurrence.enabled) {
    // Generate recurring sessions
    sessions.push(...generateRecurringSessions());
  } else {
    // Generate regular sessions for date range
    const startDate = new Date(eventForm.value.startDate);
    const endDate = new Date(eventForm.value.endDate);
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      
      // If multi-day and specific days selected, check if this day is selected
      if (isMultiDay.value && eventForm.value.selectedDays.length > 0) {
        if (eventForm.value.selectedDays.includes(dayOfWeek)) {
          sessions.push({
            date: formatDateString(currentDate),
            dayOfWeek: dayOfWeek,
            startTime: eventForm.value.startTime,
            endTime: eventForm.value.endTime
          });
        }
      } else {
        // If not multi-day or no specific days selected, include all days
        sessions.push({
          date: formatDateString(currentDate),
          dayOfWeek: dayOfWeek,
          startTime: eventForm.value.startTime,
          endTime: eventForm.value.endTime
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  return sessions;
});

const isFormValid = computed(() => {
  return eventForm.value.type.trim() && 
         eventForm.value.startDate && 
         eventForm.value.endDate &&
         eventForm.value.startTime !== '' && 
         eventForm.value.endTime !== '' &&
         eventForm.value.examiner.trim() && 
         eventForm.value.room && 
         eventForm.value.maxParticipants > 0 &&
         eventForm.value.maxParticipants <= getMaxCapacityForSelectedRoom() &&
         trainingPreview.value.length > 0;
});

const hasFormErrors = computed(() => {
  return !isFormValid.value && Object.values(eventForm.value).some(value => value !== '' && value !== null);
});

const formErrorMessage = computed(() => {
  if (eventForm.value.maxParticipants > getMaxCapacityForSelectedRoom()) {
    return 'จำนวนผู้เข้าอบรมเกินความจุของห้อง';
  }
  if (eventForm.value.startDate && isPastDate(eventForm.value.startDate)) {
    return 'ไม่สามารถสร้างการอบรมในวันที่ผ่านมาแล้ว';
  }
  if (eventForm.value.startTime >= eventForm.value.endTime) {
    return 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น';
  }
  return 'กรุณากรอกข้อมูลให้ครบถ้วน';
});

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const formattedDate = formatDateString(date);
    
    dates.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      day: date.getDate(),
      fullDate: formattedDate,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString()
    });
  }
  return dates;
});

const weekDays = computed(() => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());
  const today = new Date();
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    
    days.push({
      key: i,
      dayName: daysOfWeek[i],
      date: date.getDate(),
      fullDate: formatDateString(date),
      isToday: date.toDateString() === today.toDateString()
    });
  }
  return days;
});

const timeSlots = computed(() => Array.from({length: 13}, (_, i) => (i + 6).toString().padStart(2, "0")));

// Utility methods
const formatDateString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

const formatTimeDisplay = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

const formatTimeRange = (startHour, endHour) => {
  return `${startHour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`;
};

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear() + 543}`;
};

const formatDateRange = (event) => {
  if (event.startDate === event.endDate) {
    return formatThaiDate(event.startDate);
  } else {
    return `${formatThaiDate(event.startDate)} - ${formatThaiDate(event.endDate)}`;
  }
};

// MS Teams-style recurrence generation with enhanced support
const generateRecurringSessions = () => {
  const sessions = [];
  const startDate = new Date(eventForm.value.startDate);
  const endDate = new Date(eventForm.value.endDate);
  const { frequency, interval, daysOfWeek, customDays, endType, occurrences, endDate: recurrenceEndDate } = eventForm.value.recurrence;
  
  let currentDate = new Date(startDate);
  let sessionCount = 0;
  const maxDate = recurrenceEndDate ? new Date(recurrenceEndDate) : new Date(2030, 11, 31);
  const maxSessions = endType === 'after' ? occurrences : 1000;
  
  while (sessionCount < maxSessions && currentDate <= maxDate) {
    let shouldInclude = false;
    
    if (frequency === 'daily') {
      shouldInclude = true;
    } else if (frequency === 'weekdays') {
      // Monday (1) to Friday (5)
      const dayOfWeek = currentDate.getDay();
      shouldInclude = dayOfWeek >= 1 && dayOfWeek <= 5;
    } else if (frequency === 'weekly') {
      if (daysOfWeek.length === 0) {
        shouldInclude = currentDate.getDay() === startDate.getDay();
      } else {
        shouldInclude = daysOfWeek.includes(currentDate.getDay());
      }
    } else if (frequency === 'monthly') {
      shouldInclude = currentDate.getDate() === startDate.getDate();
    } else if (frequency === 'yearly') {
      shouldInclude = currentDate.getMonth() === startDate.getMonth() && 
                     currentDate.getDate() === startDate.getDate();
    } else if (frequency === 'custom') {
      if (customDays.length > 0) {
        shouldInclude = customDays.includes(currentDate.getDay());
      }
    }
    
    if (shouldInclude && currentDate >= startDate && currentDate <= maxDate) {
      sessions.push({
        date: formatDateString(currentDate),
        dayOfWeek: currentDate.getDay(),
        startTime: eventForm.value.startTime,
        endTime: eventForm.value.endTime
      });
      sessionCount++;
    }
    
    // Increment date based on frequency
    if (frequency === 'daily' || frequency === 'weekdays') {
      currentDate.setDate(currentDate.getDate() + interval);
    } else if (frequency === 'weekly') {
      if (daysOfWeek.length === 0) {
        currentDate.setDate(currentDate.getDate() + (7 * interval));
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() === 0 && interval > 1) {
          currentDate.setDate(currentDate.getDate() + (7 * (interval - 1)));
        }
      }
    } else if (frequency === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() + interval);
    } else if (frequency === 'yearly') {
      currentDate.setFullYear(currentDate.getFullYear() + interval);
    } else if (frequency === 'custom') {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Safety break to prevent infinite loops
    if (sessionCount > 365 || (frequency === 'yearly' && sessionCount > 50)) break;
  }
  
  return sessions;
};

// Helper functions for better UX
const getIntervalLabel = () => {
  const labels = {
    daily: 'วัน',
    weekdays: 'วัน',
    weekly: 'สัปดาห์',
    monthly: 'เดือน',
    yearly: 'ปี',
    custom: 'ครั้ง'
  };
  return labels[eventForm.value.recurrence.frequency] || 'ครั้ง';
};

const getMaxInterval = () => {
  const maxValues = {
    daily: 30,
    weekdays: 10,
    weekly: 20,
    monthly: 12,
    yearly: 10,
    custom: 1
  };
  return maxValues[eventForm.value.recurrence.frequency] || 10;
};

const getIntervalPlaceholder = () => {
  const placeholders = {
    daily: 'เช่น 1 = ทุกวัน, 2 = วันเว้นวัน',
    weekdays: 'เช่น 1 = ทุกวันทำการ, 2 = ทุก 2 วันทำการ',
    weekly: 'เช่น 1 = ทุกสัปดาห์, 2 = 2 สัปดาห์ครั้ง',
    monthly: 'เช่น 1 = ทุกเดือน, 3 = ทุก 3 เดือน',
    yearly: 'เช่น 1 = ทุกปี, 2 = ทุก 2 ปี',
    custom: 'ไม่ใช้กับการกำหนดเอง'
  };
  return placeholders[eventForm.value.recurrence.frequency] || 'ระบุจำนวน';
};

const getFrequencyText = () => {
  const { frequency, interval } = eventForm.value.recurrence;
  const texts = {
    daily: `ทุก ${interval} วัน`,
    weekdays: `ทุก ${interval} วันทำการ (จ-ศ)`,
    weekly: `ทุก ${interval} สัปดาห์`,
    monthly: `ทุก ${interval} เดือน`,
    yearly: `ทุก ${interval} ปี`,
    custom: 'กำหนดเอง'
  };
  return texts[frequency] || 'ไม่ระบุ';
};

const getSelectedDaysText = () => {
  const { frequency } = eventForm.value.recurrence;
  
  if (frequency === 'weekly') {
    if (eventForm.value.recurrence.daysOfWeek.length === 0) return 'ไม่ได้เลือก';
    return eventForm.value.recurrence.daysOfWeek
      .map(dayIndex => daysOfWeek[dayIndex])
      .join(', ');
  } else if (frequency === 'custom') {
    if (eventForm.value.recurrence.customDays.length === 0) return 'ไม่ได้เลือก';
    return eventForm.value.recurrence.customDays
      .map(dayIndex => daysOfWeek[dayIndex])
      .join(', ');
  } else if (frequency === 'weekdays') {
    return 'จันทร์, อังคาร, พุธ, พฤหัสบดี, ศุกร์';
  }
  
  return 'ไม่ใช้';
};

const getEndTypeText = () => {
  const { endType, occurrences, endDate } = eventForm.value.recurrence;
  if (endType === 'never') return 'ไม่สิ้นสุด';
  if (endType === 'after') return `หลังจาก ${occurrences} ครั้ง`;
  if (endType === 'on' && endDate) return `ถึงวันที่ ${formatThaiDate(endDate)}`;
  return 'ไม่ระบุ';
};

// Toggle recurrence functionality
const toggleRecurrence = () => {
  if (!eventForm.value.recurrence.enabled) {
    // Reset recurrence settings when disabled
    eventForm.value.recurrence.daysOfWeek = [];
    eventForm.value.recurrence.customDays = [];
    eventForm.value.recurrence.interval = 1;
    eventForm.value.recurrence.endType = 'never';
  }
};

const isPastDate = (dateString) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < today;
};

const getDateCellClass = (date) => {
  return {
    'bg-gray-50 text-gray-400': !date.isCurrentMonth,
    'bg-blue-50 border-blue-200': date.isToday,
    'cursor-not-allowed opacity-50': isPastDate(date.fullDate),
    'hover:bg-blue-50': date.isCurrentMonth && !isPastDate(date.fullDate)
  };
};

const getParticipantStatusColor = (event) => {
  const available = event.maxParticipants - (event.currentParticipants || 0);
  if (available === 0) return 'text-red-600';
  if (available <= 5) return 'text-orange-600';
  return 'text-green-600';
};

const getParticipantPercentage = (event) => {
  return ((event.currentParticipants || 0) / event.maxParticipants) * 100;
};

// Navigation methods
const previousPeriod = () => {
  if (viewMode.value === 'month') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  } else if (viewMode.value === 'week') {
    const newDate = new Date(currentDate.value);
    newDate.setDate(currentDate.value.getDate() - 7);
    currentDate.value = newDate;
  }
};

const nextPeriod = () => {
  if (viewMode.value === 'month') {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  } else if (viewMode.value === 'week') {
    const newDate = new Date(currentDate.value);
    newDate.setDate(currentDate.value.getDate() + 7);
    currentDate.value = newDate;
  }
};

const goToToday = () => {
  currentDate.value = new Date();
};

const setViewMode = (mode) => {
  viewMode.value = mode;
  if (mode === 'week') {
    const today = new Date();
    currentDate.value = new Date(today);
  }
};

// Event management methods
const openCreateTrainingModal = () => {
  const today = new Date();
  const todayString = formatDateString(today);
  
  eventForm.value = { 
    type: "", 
    startDate: todayString, 
    endDate: todayString,
    startTime: "", 
    endTime: "",
    selectedDays: [],
    examiner: "", 
    room: "", 
    maxParticipants: null, 
    currentParticipants: 0,
    recurrence: {
      enabled: false,
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [],
      customDays: [],
      endType: 'never',
      occurrences: 10,
      endDate: ''
    }
  };
  editingEvent.value = false;
  showAddEventModal.value = true;
};

const closeAddEventModal = () => {
  showAddEventModal.value = false;
  editingEvent.value = false;
  eventForm.value = { 
    type: "", 
    startDate: "", 
    endDate: "",
    startTime: "", 
    endTime: "",
    selectedDays: [],
    examiner: "", 
    room: "", 
    maxParticipants: null, 
    currentParticipants: 0,
    recurrence: {
      enabled: false,
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [],
      customDays: [],
      endType: 'never',
      occurrences: 10,
      endDate: ''
    }
  };
};

const validateDateRange = () => {
  if (eventForm.value.startDate && eventForm.value.endDate) {
    if (new Date(eventForm.value.endDate) < new Date(eventForm.value.startDate)) {
      eventForm.value.endDate = eventForm.value.startDate;
    }
  }
};

const validateTimeRange = () => {
  if (eventForm.value.startTime && eventForm.value.endTime) {
    if (eventForm.value.endTime <= eventForm.value.startTime) {
      eventForm.value.endTime = "";
    }
  }
};

const updateMaxParticipantsFromRoom = () => {
  const selectedRoom = rooms.find(room => room.name === eventForm.value.room);
  if (selectedRoom && !eventForm.value.maxParticipants) {
    eventForm.value.maxParticipants = selectedRoom.capacity;
  }
};

const getMaxCapacityForSelectedRoom = () => {
  const selectedRoom = rooms.find(room => room.name === eventForm.value.room);
  return selectedRoom ? selectedRoom.capacity : 100;
};

const saveEvent = () => {
  if (!isFormValid.value) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง');
    return;
  }

  if (isPastDate(eventForm.value.startDate)) {
    alert('ไม่สามารถสร้างการอบรมในวันที่ผ่านมาแล้ว');
    return;
  }

  if (eventForm.value.maxParticipants > getMaxCapacityForSelectedRoom()) {
    alert(`ห้องนี้รองรับได้สูงสุด ${getMaxCapacityForSelectedRoom()} คน`);
    return;
  }
  
  try {
    if (editingEvent.value) {
      // Update existing event
      const index = events.value.findIndex(event => event.id === selectedEvent.value.id);
      if (index !== -1) {
        events.value[index] = { 
          ...events.value[index], 
          ...eventForm.value, 
          title: eventForm.value.type, // Use type as title
          color: getEventColor(eventForm.value.type),
          currentParticipants: eventForm.value.currentParticipants || 0
        };
      }
    } else {
      // Create new training sessions based on preview
      trainingPreview.value.forEach((session, index) => {
        const newEvent = { 
          id: Date.now() + index, 
          title: eventForm.value.type, // Use type as title
          startDate: session.date,
          endDate: session.date,
          startTime: session.startTime,
          endTime: session.endTime,
          type: eventForm.value.type,
          examiner: eventForm.value.examiner,
          room: eventForm.value.room,
          maxParticipants: eventForm.value.maxParticipants,
          color: getEventColor(eventForm.value.type),
          isBooked: false,
          currentParticipants: 0
        };
        events.value.push(newEvent);
      });
    }
    closeAddEventModal();
  } catch (error) {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่');
  }
};

const getEventColor = (type) => {
  const colorMap = { 
    "อบรมพื้นฐานความปลอดภัย": "#3b82f6", 
    "อบรมผู้ควบคุมงาน": "#10b981", 
    "อบรมการใช้เครื่องมือ": "#f59e0b", 
    "อบรมการใช้เครื่องจักร": "#8b5cf6", 
    "อบรมการประกอบอุปกรณ์": "#06b6d4", 
    "อบรมการดับเพลิง": "#ef4444" 
  };
  return colorMap[type] || "#6b7280";
};

const viewEvent = (event) => {
  selectedEvent.value = event;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  selectedEvent.value = null;
};

const editEvent = (event) => {
  selectedEvent.value = event;
  eventForm.value = { 
    type: event.type, 
    startDate: event.startDate, 
    endDate: event.endDate,
    startTime: event.startTime, 
    endTime: event.endTime,
    selectedDays: [],
    examiner: event.examiner, 
    room: event.room,
    maxParticipants: event.maxParticipants,
    currentParticipants: event.currentParticipants || 0,
    recurrence: {
      enabled: false,
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [],
      customDays: [],
      endType: 'never',
      occurrences: 10,
      endDate: ''
    }
  };
  editingEvent.value = true;
  showViewModal.value = false;
  showAddEventModal.value = true;
};

const deleteEvent = (eventId) => {
  if (confirm("คุณแน่ใจหรือไม่ที่จะลบการอบรมนี้?")) {
    events.value = events.value.filter(event => event.id !== eventId);
    closeViewModal();
  }
};

// Event query methods
const getEventsForDate = (dateString) => {
  return events.value.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const checkDate = new Date(dateString);
    
    return checkDate >= eventStart && checkDate <= eventEnd;
  });
};

const getEventsForDayAndHour = (dateString, hour) => {
  return events.value.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const checkDate = new Date(dateString);
    
    return checkDate >= eventStart && checkDate <= eventEnd &&
           event.startTime <= parseInt(hour) && event.endTime > parseInt(hour);
  });
};

// Drag and Drop functionality
const startDrag = (event, dragEvent) => {
  draggedEvent.value = event;
  dragEvent.dataTransfer.effectAllowed = 'move';
};

const handleDrop = (dateString, dropEvent) => {
  dropEvent.preventDefault();
  
  if (!draggedEvent.value) return;
  
  if (isPastDate(dateString)) {
    alert('ไม่สามารถย้ายการอบรมไปยังวันที่ผ่านมาแล้ว');
    draggedEvent.value = null;
    return;
  }
  
  // Simple move for single day events
  const eventIndex = events.value.findIndex(e => e.id === draggedEvent.value.id);
  if (eventIndex !== -1) {
    events.value[eventIndex] = {
      ...events.value[eventIndex],
      startDate: dateString,
      endDate: dateString
    };
  }
  
  draggedEvent.value = null;
};

const handleDropToTimeSlot = (dateString, hour, dropEvent) => {
  dropEvent.preventDefault();
  
  if (!draggedEvent.value || isPastDate(dateString)) {
    return;
  }
  
  // Move event to new date and time
  const eventIndex = events.value.findIndex(e => e.id === draggedEvent.value.id);
  if (eventIndex !== -1) {
    const duration = events.value[eventIndex].endTime - events.value[eventIndex].startTime;
    events.value[eventIndex] = {
      ...events.value[eventIndex],
      startDate: dateString,
      endDate: dateString,
      startTime: hour,
      endTime: hour + duration
    };
  }
  
  draggedEvent.value = null;
};

// Search functionality
const clearSearch = () => {
  searchQuery.value = "";
};

// Watchers for better UX
watch(() => eventForm.value.room, (newRoom) => {
  if (newRoom && !eventForm.value.maxParticipants) {
    updateMaxParticipantsFromRoom();
  }
});

watch(() => eventForm.value.startTime, () => {
  if (eventForm.value.startTime && eventForm.value.endTime) {
    validateTimeRange();
  }
});
</script>