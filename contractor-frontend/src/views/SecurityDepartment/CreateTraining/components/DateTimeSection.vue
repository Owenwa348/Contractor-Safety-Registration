<template>
  <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-3">
      <h4 class="font-bold text-purple-800">วันที่และเวลา</h4>
    </div>
    
    <!-- Date Range Selection -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">วันที่เริ่มต้น</label>
        <input 
          :value="form.startDate" 
          @input="updateForm('startDate', $event.target.value)"
          type="date" 
          required 
          :min="minDate" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          @change="$emit('validate-date-range')" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">วันที่สิ้นสุด</label>
        <input 
          :value="form.endDate" 
          @input="updateForm('endDate', $event.target.value)"
          type="date" 
          required 
          :min="form.startDate || minDate" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          @change="$emit('validate-date-range')" 
        />
      </div>
    </div>

    <!-- Recurrence Options -->
    <RecurrenceOptions 
      v-model:recurrence="form.recurrence"
      @update:recurrence="updateRecurrence"
    />

    <!-- Training Days Selection (for multi-day trainings - SEPARATE from recurrence) -->
    <div v-if="isMultiDay && !form.recurrence.enabled" class="mb-4">
      <DaySelector 
        v-model:selectedDays="form.selectedDays"
        title="วันในช่วงวันที่"
        description="เลือกวันที่จะจัดการอบรมในช่วงวันที่ที่กำหนด"
        note="หากไม่เลือก จะจัดการอบรมทุกวันในช่วงวันที่"
        id-prefix="multi-day"
      />
    </div>
    
    <!-- Time Range Selection -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">เวลาเริ่มต้น</label>
        <select 
          :value="form.startTime" 
          @input="updateForm('startTime', parseInt($event.target.value))"
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          @change="$emit('validate-time-range')"
        >
          <option value="">เลือกเวลาเริ่มต้น</option>
          <option v-for="hour in allTimeSlots" :key="`start-${hour}`" :value="hour">
            {{ formatTimeDisplay(hour) }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">เวลาสิ้นสุด</label>
        <select 
          :value="form.endTime" 
          @input="updateForm('endTime', parseInt($event.target.value))"
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">เลือกเวลาสิ้นสุด</option>
          <option v-for="hour in availableEndTimes" :key="`end-${hour}`" :value="hour">
            {{ formatTimeDisplay(hour) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import RecurrenceOptions from './RecurrenceOptions.vue';
import DaySelector from './DaySelector.vue';

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  minDate: {
    type: String,
    required: true
  },
  isMultiDay: {
    type: Boolean,
    default: false
  },
  availableEndTimes: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:form', 'validate-date-range', 'validate-time-range']);

const allTimeSlots = Array.from({length: 14}, (_, i) => i + 6); // 6:00 - 19:00

const formatTimeDisplay = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

const updateForm = (field, value) => {
  const newForm = { ...props.form };
  newForm[field] = value;
  emit('update:form', newForm);
};

const updateRecurrence = (recurrence) => {
  const newForm = { ...props.form };
  newForm.recurrence = recurrence;
  emit('update:form', newForm);
};
</script>