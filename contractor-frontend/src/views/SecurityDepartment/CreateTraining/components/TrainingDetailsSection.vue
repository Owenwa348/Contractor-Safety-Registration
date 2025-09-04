<template>
  <div class="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
    <div class="flex items-center gap-2 mb-3">
      <h4 class="font-bold text-orange-800">รายละเอียดการอบรม</h4>
    </div>
    
    <div class="space-y-4">
      <!-- Examiner Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">ผู้สอน</label>
        <select 
          :value="form.examiner" 
          @input="updateForm('examiner', $event.target.value)"
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">เลือกผู้สอน</option>
          <option v-for="manager in managers" :key="manager" :value="manager">
            {{ manager }}
          </option>
        </select>
      </div>

      <!-- Room Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">ห้องอบรม</label>
        <select 
          :value="form.room" 
          @input="handleRoomChange($event.target.value)"
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">เลือกห้อง</option>
          <option v-for="room in rooms" :key="room.name" :value="room.name">
            {{ room.name }} ({{ room.capacity }} ที่นั่ง)
          </option>
        </select>
      </div>

      <!-- Max Participants -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">จำนวนผู้เข้าอบรมสูงสุด</label>
        <input 
          :value="form.maxParticipants" 
          type="number" 
          readonly 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed" 
          placeholder="เลือกห้องอบรมก่อน" 
        />
        <p v-if="form.room" class="text-xs text-gray-500 mt-1">
          จำนวนนี้จะปรับตามความจุของห้องอบรมที่เลือก
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
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

const emit = defineEmits(['update:form', 'update-max-participants']);

const updateForm = (field, value) => {
  const newForm = { ...props.form };
  newForm[field] = value;
  emit('update:form', newForm);
};

const handleRoomChange = (roomName) => {
  updateForm('room', roomName);
  emit('update-max-participants');
};
</script>