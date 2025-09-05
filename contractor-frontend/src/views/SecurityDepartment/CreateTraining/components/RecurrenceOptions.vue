<template>
  <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
    <label class="block text-sm font-medium text-gray-700 mb-3">การทำซ้ำ</label>
    <div class="space-y-3">
      <div>
        <label class="inline-flex items-center">
          <input 
            :checked="recurrence.enabled" 
            @change="toggleRecurrence"
            type="checkbox" 
            class="form-checkbox h-4 w-4 text-blue-600" 
          />
          <span class="ml-2 text-sm text-gray-700">ทำซ้ำการอบรม</span>
        </label>
      </div>
      
      <div v-if="recurrence.enabled" class="space-y-3 pl-6 border-l-2 border-blue-200">
        <!-- Frequency and Interval -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">ความถี่การทำซ้ำ</label>
            <select 
              :value="recurrence.frequency" 
              @input="updateRecurrence('frequency', $event.target.value)"
              class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            >
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
            <input 
              :value="recurrence.interval" 
              @input="updateRecurrence('interval', parseInt($event.target.value))"
              type="number" 
              min="1" 
              :max="getMaxInterval()" 
              class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
              :placeholder="getIntervalPlaceholder()" 
            />
          </div>
        </div>
        
        <!-- Weekly Recurrence Day Selection -->
        <div v-if="recurrence.frequency === 'weekly'">
          <DaySelector
            v-model:selectedDays="recurrence.daysOfWeek"
            title="การทำซ้ำรายสัปดาห์"
            description="เลือกวันในสัปดาห์ที่ต้องการทำซ้ำการอบรม"
            note="หากไม่เลือก จะใช้วันเดียวกับวันที่เริ่มต้น"
            id-prefix="recur-week-day"
            color-scheme="blue"
          />
        </div>
        
        <!-- Weekdays Info -->
        <div v-if="recurrence.frequency === 'weekdays'">
          <div class="bg-green-50 border border-green-200 rounded-lg p-3">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-green-600">💼</span>
              <span class="text-xs font-medium text-green-800">ทุกวันทำการ</span>
            </div>
            <p class="text-xs text-green-700">การอบรมจะทำซ้ำทุกวันจันทร์ - ศุกร์ (ไม่รวมวันหยุด)</p>
            <div class="flex gap-1 mt-2">
              <span v-for="day in ['จ', 'อ', 'พ', 'พฤ', 'ศ']" :key="day" class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                {{ day }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Custom Recurrence -->
        <div v-if="recurrence.frequency === 'custom'">
          <DaySelector
            v-model:selectedDays="recurrence.customDays"
            title="กำหนดค่าเอง"
            description="เลือกวันที่ต้องการจัดการอบรมตามความต้องการ"
            note="เลือกวันที่ต้องการตามความเหมาะสม"
            id-prefix="recur-custom-day"
            color-scheme="purple"
          />
        </div>
        
        <!-- Yearly Recurrence Info -->
        <div v-if="recurrence.frequency === 'yearly'">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-medium text-blue-800">การทำซ้ำรายปี</span>
            </div>
            <p class="text-xs text-blue-700">การอบรมจะทำซ้ำในวันและเดือนเดียวกันทุกปี</p>
            <p class="text-xs text-blue-600 mt-1">ตัวอย่าง: หากเริ่มวันที่ 15 มีนาคม จะทำซ้ำวันที่ 15 มีนาคมของทุกปี</p>
          </div>
        </div>
        
        <!-- End Type Selection -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">สิ้นสุดการทำซ้ำ</label>
            <select 
              :value="recurrence.endType" 
              @input="updateRecurrence('endType', $event.target.value)"
              class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            >
              <option value="never">ไม่สิ้นสุด</option>
              <option value="after">หลังจาก (ครั้ง)</option>
              <option value="on">จนถึงวันที่</option>
            </select>
          </div>
          <div v-if="recurrence.endType === 'after'">
            <label class="block text-xs font-medium text-gray-600 mb-1">จำนวนครั้งที่ต้องการ</label>
            <input 
              :value="recurrence.occurrences" 
              @input="updateRecurrence('occurrences', parseInt($event.target.value))"
              type="number" 
              min="1" 
              max="100" 
              class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
              placeholder="เช่น 10 ครั้ง" 
            />
          </div>
          <div v-else-if="recurrence.endType === 'on'">
            <label class="block text-xs font-medium text-gray-600 mb-1">วันที่สิ้นสุด</label>
            <input 
              :value="recurrence.endDate" 
              @input="updateRecurrence('endDate', $event.target.value)"
              type="date" 
              class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DaySelector from './DaySelector.vue';

const props = defineProps({
  recurrence: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:recurrence']);

const updateRecurrence = (field, value) => {
  const newRecurrence = { ...props.recurrence };
  newRecurrence[field] = value;
  emit('update:recurrence', newRecurrence);
};

const toggleRecurrence = () => {
  const newRecurrence = { ...props.recurrence };
  newRecurrence.enabled = !newRecurrence.enabled;
  
  if (!newRecurrence.enabled) {
    // Reset recurrence settings when disabled
    newRecurrence.daysOfWeek = [];
    newRecurrence.customDays = [];
    newRecurrence.interval = 1;
    newRecurrence.endType = 'never';
  }
  
  emit('update:recurrence', newRecurrence);
};

const getIntervalLabel = () => {
  const labels = {
    daily: 'วัน',
    weekdays: 'วัน',
    weekly: 'สัปดาห์',
    monthly: 'เดือน',
    yearly: 'ปี',
    custom: 'ครั้ง'
  };
  return labels[props.recurrence.frequency] || 'ครั้ง';
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
  return maxValues[props.recurrence.frequency] || 10;
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
  return placeholders[props.recurrence.frequency] || 'ระบุจำนวน';
};
</script>