import { ref, computed } from 'vue';

export function useCalendar() {
  const viewMode = ref('month');
  const currentDate = ref(new Date());

  // Constants
  const daysOfWeek = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  // Computed properties
  const currentMonthYear = computed(() => 
    `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear() + 543}`
  );

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

  return {
    // State
    viewMode,
    currentDate,
    
    // Constants
    daysOfWeek,
    monthNames,
    
    // Computed
    currentMonthYear,
    currentPeriodTitle,
    
    // Methods
    previousPeriod,
    nextPeriod,
    goToToday,
    setViewMode
  };
}