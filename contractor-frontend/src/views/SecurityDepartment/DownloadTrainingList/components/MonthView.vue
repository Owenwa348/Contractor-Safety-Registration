<template>
  <div>
    <!-- Day Headers -->
    <div class="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
      <div v-for="day in daysOfWeek" :key="day" 
           class="p-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wide">
        {{ day }}
      </div>
    </div>

    <!-- Calendar Dates -->
    <div class="grid grid-cols-7">
      <div v-for="date in calendarDates" :key="date.key" 
           class="min-h-[120px] border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-all duration-200 relative group"
           :class="getDateCellClass(date)">
        
        <!-- Date Number -->
        <div class="p-3">
          <span class="text-sm inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-all duration-200"
                :class="getDateNumberClass(date)">
            {{ date.day }}
          </span>
        </div>

        <!-- Events Display -->
        <div class="px-2 pb-2 space-y-1">
          <div v-for="eventDisplay in date.eventDisplays" :key="eventDisplay.key" class="relative">
            <div v-if="eventDisplay.type === 'event'"
                 class="text-xs px-3 py-1.5 text-white transition-all duration-200 truncate relative overflow-hidden cursor-pointer hover:opacity-90 hover:shadow-md font-medium"
                 :class="getEventClass(eventDisplay)"
                 @click.stop="$emit('event-click', eventDisplay.event, date.fullDate)"
                 :title="getEventTooltip(eventDisplay)">
              {{ eventDisplay.displayText }}
            </div>
            
            <div v-else-if="eventDisplay.type === 'more'"
                 class="text-xs px-3 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium text-center"
                 @click.stop="$emit('show-more-events', date)">
              +{{ eventDisplay.count }} เพิ่มเติม
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  calendarDates: {
    type: Array,
    required: true
  },
  daysOfWeek: {
    type: Array,
    default: () => ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"]
  }
});

const emit = defineEmits([
  'event-click',
  'show-more-events'
]);

// Date and event styling functions
const getDateCellClass = (date) => {
  return {
    'text-gray-400 bg-gray-50': !date.isCurrentMonth,
    'bg-blue-100 shadow-inner': date.isToday,
  };
};

const getDateNumberClass = (date) => {
  if (date.isToday) {
    return 'bg-blue-600 text-white font-bold shadow-lg';
  } else if (date.isCurrentMonth) {
    return 'text-gray-900 hover:bg-blue-100';
  } else {
    return 'text-gray-400';
  }
};

const isEventPast = (event) => {
  if (!event) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventEndDate = event.isMultiDay ? new Date(event.endDate) : new Date(event.startDate);
  eventEndDate.setHours(0, 0, 0, 0);
  
  return eventEndDate < today;
};

const getEventClass = (eventDisplay) => {
  const baseClasses = ['shadow-sm'];
  
  if (isEventPast(eventDisplay.event)) {
    baseClasses.push('bg-gray-500', 'cursor-not-allowed', 'hover:opacity-100');
  } else {
    baseClasses.push('bg-gradient-to-r', 'from-blue-600', 'to-blue-700', 'hover:from-blue-700', 'hover:to-blue-800');
  }
  
  baseClasses.push(getMultiDayBarClass(eventDisplay.barPosition));
  
  return baseClasses;
};

const getMultiDayBarClass = (barPosition) => {
  switch (barPosition) {
    case 'start':
      return 'rounded-l-lg rounded-r-none';
    case 'middle':
      return 'rounded-none';
    case 'end':
      return 'rounded-r-lg rounded-l-none';
    case 'single':
    default:
      return 'rounded-lg';
  }
};

const formatDateRange = (startDate, endDate) => {
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} - ${end.getDate()} ${month} ${year}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    const startMonth = monthNames[start.getMonth()];
    const endMonth = monthNames[end.getMonth()];
    const year = start.getFullYear() + 543;
    return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${year}`;
  } else {
    const formatThaiDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear() + 543;
      return `${day} ${month} ${year}`;
    };
    return `${formatThaiDate(startDate)} - ${formatThaiDate(endDate)}`;
  }
};

const getEventTooltip = (eventDisplay) => {
  const event = eventDisplay.event;
  if (event.isMultiDay) {
    return `${event.title} (${formatDateRange(event.startDate, event.endDate)})`;
  }
  return event.title;
};
</script>