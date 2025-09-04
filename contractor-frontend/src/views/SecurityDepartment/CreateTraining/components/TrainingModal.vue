<template>
  <div 
    v-if="showModal" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
    @click="$emit('close')"
  >
    <div 
      class="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-h-[90vh] overflow-y-auto" 
      @click.stop
    >
      <h3 class="text-xl font-bold text-gray-800 mb-4">
        {{ isEdit ? 'แก้ไขการอบรม' : 'สร้างการอบรมใหม่' }}
      </h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Training Type Section -->
        <TrainingTypeSection 
          v-model:type="form.type"
          :training-types="trainingTypes"
        />
        
        <!-- Date and Time Section -->
        <DateTimeSection 
          v-model:form="form"
          :min-date="minDate"
          :is-multi-day="isMultiDay"
          :available-end-times="availableEndTimes"
          @validate-date-range="validateDateRange"
          @validate-time-range="validateTimeRange"
        />
        
        <!-- Training Details Section -->
        <TrainingDetailsSection 
          v-model:form="form"
          :managers="managers"
          :rooms="rooms"
          @update-max-participants="updateMaxParticipantsFromRoom"
        />

        <!-- Preview Section -->
        <TrainingPreview 
          v-if="trainingPreview.length > 0"
          :preview="trainingPreview"
          :recurrence="form.recurrence"
        />

        <!-- Form Error -->
        <div v-if="hasFormErrors" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-sm text-red-600">{{ formErrorMessage }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
          <button 
            type="submit" 
            :disabled="!isFormValid" 
            class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {{ isEdit ? 'บันทึกการแก้ไข' : `สร้างการอบรม (${trainingPreview.length} ครั้ง)` }}
          </button>
          <button 
            type="button" 
            @click="$emit('close')" 
            class="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import TrainingTypeSection from './TrainingTypeSection.vue';
import DateTimeSection from './DateTimeSection.vue';
import TrainingDetailsSection from './TrainingDetailsSection.vue';
import TrainingPreview from './TrainingPreview.vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  eventData: {
    type: Object,
    default: () => null
  },
  trainingTypes: {
    type: Array,
    required: true
  },
  managers: {
    type: Array,
    required: true
  },
  rooms: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

// Form data
const form = ref({
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
});

// Constants
const allTimeSlots = Array.from({length: 14}, (_, i) => i + 6); // 6:00 - 19:00

// Computed properties
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const isMultiDay = computed(() => {
  return form.value.startDate && form.value.endDate && 
         form.value.startDate !== form.value.endDate;
});

const availableEndTimes = computed(() => {
  if (!form.value.startTime) return [];
  return allTimeSlots.filter(hour => hour > form.value.startTime);
});

const trainingPreview = computed(() => {
  if (!form.value.startDate || !form.value.endDate || 
      !form.value.startTime || !form.value.endTime) {
    return [];
  }

  const sessions = [];
  
  if (form.value.recurrence.enabled) {
    sessions.push(...generateRecurringSessions());
  } else {
    const startDate = new Date(form.value.startDate);
    const endDate = new Date(form.value.endDate);
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      
      if (isMultiDay.value && form.value.selectedDays.length > 0) {
        if (form.value.selectedDays.includes(dayOfWeek)) {
          sessions.push({
            date: formatDateString(currentDate),
            dayOfWeek: dayOfWeek,
            startTime: form.value.startTime,
            endTime: form.value.endTime
          });
        }
      } else {
        sessions.push({
          date: formatDateString(currentDate),
          dayOfWeek: dayOfWeek,
          startTime: form.value.startTime,
          endTime: form.value.endTime
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  return sessions;
});

const isFormValid = computed(() => {
  return form.value.type.trim() && 
         form.value.startDate && 
         form.value.endDate &&
         form.value.startTime !== '' && 
         form.value.endTime !== '' &&
         form.value.examiner.trim() && 
         form.value.room && 
         form.value.maxParticipants > 0 &&
         trainingPreview.value.length > 0;
});

const hasFormErrors = computed(() => {
  return !isFormValid.value && Object.values(form.value).some(value => value !== '' && value !== null);
});

const formErrorMessage = computed(() => {
  if (form.value.startDate && isPastDate(form.value.startDate)) {
    return 'ไม่สามารถสร้างการอบรมในวันที่ผ่านมาแล้ว';
  }
  if (form.value.startTime >= form.value.endTime) {
    return 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น';
  }
  return 'กรุณากรอกข้อมูลให้ครบถ้วน';
});

// Methods
const formatDateString = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

const isPastDate = (dateString) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate < today;
};

const generateRecurringSessions = () => {
  const sessions = [];
  const startDate = new Date(form.value.startDate);
  const endDate = new Date(form.value.endDate);
  const { frequency, interval, daysOfWeek, customDays, endType, occurrences, endDate: recurrenceEndDate } = form.value.recurrence;
  
  let currentDate = new Date(startDate);
  let sessionCount = 0;
  const maxDate = recurrenceEndDate ? new Date(recurrenceEndDate) : new Date(2030, 11, 31);
  const maxSessions = endType === 'after' ? occurrences : 1000;
  
  while (sessionCount < maxSessions && currentDate <= maxDate) {
    let shouldInclude = false;
    
    if (frequency === 'daily') {
      shouldInclude = true;
    } else if (frequency === 'weekdays') {
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
        startTime: form.value.startTime,
        endTime: form.value.endTime
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
    
    if (sessionCount > 365 || (frequency === 'yearly' && sessionCount > 50)) break;
  }
  
  return sessions;
};

const validateDateRange = () => {
  if (form.value.startDate && form.value.endDate) {
    if (new Date(form.value.endDate) < new Date(form.value.startDate)) {
      form.value.endDate = form.value.startDate;
    }
  }
};

const validateTimeRange = () => {
  if (form.value.startTime && form.value.endTime) {
    if (form.value.endTime <= form.value.startTime) {
      form.value.endTime = "";
    }
  }
};

const updateMaxParticipantsFromRoom = () => {
  const selectedRoom = props.rooms.find(room => room.name === form.value.room);
  if (selectedRoom) {
    form.value.maxParticipants = selectedRoom.capacity;
  } else {
    form.value.maxParticipants = null;
  }
};

const handleSubmit = () => {
  if (!isFormValid.value) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง');
    return;
  }

  if (isPastDate(form.value.startDate)) {
    alert('ไม่สามารถสร้างการอบรมในวันที่ผ่านมาแล้ว');
    return;
  }

  emit('save', {
    formData: form.value,
    preview: trainingPreview.value,
    isEdit: props.isEdit
  });
};

// Initialize form when modal opens or event data changes
watch(() => props.showModal, (newValue) => {
  if (newValue) {
    if (props.isEdit && props.eventData) {
      form.value = {
        type: props.eventData.type || "",
        startDate: props.eventData.startDate || "",
        endDate: props.eventData.endDate || "",
        startTime: props.eventData.startTime || "",
        endTime: props.eventData.endTime || "",
        selectedDays: [],
        examiner: props.eventData.examiner || "",
        room: props.eventData.room || "",
        maxParticipants: props.eventData.maxParticipants || null,
        currentParticipants: props.eventData.currentParticipants || 0,
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
    } else {
      // Reset form for new training
      const today = new Date();
      const todayString = formatDateString(today);
      
      form.value = {
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
    }
  }
});

// Watchers for validation
watch(() => form.value.room, (newRoom) => {
  if (newRoom) {
    updateMaxParticipantsFromRoom();
  }
});

watch(() => form.value.startTime, () => {
  if (form.value.startTime && form.value.endTime) {
    validateTimeRange();
  }
});
</script>