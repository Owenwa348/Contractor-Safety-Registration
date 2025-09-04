import { ref, computed } from 'vue';

export function useCalendar() {
  const currentDate = ref(new Date());
  const viewMode = ref('month');
  
  // Constants
  const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];

  // Computed properties
  const currentMonthYear = computed(() => {
    const year = currentDate.value.getFullYear() + 543;
    const month = monthNames[currentDate.value.getMonth()];
    return `${month} ${year}`;
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
      
      const dateString = formatDateString(date);
      
      dates.push({
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        day: date.getDate(),
        fullDate: dateString,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        events: [],
        eventDisplays: []
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

  const timeSlots = computed(() => {
    const slots = [];
    for (let i = 6; i <= 18; i++) {
      slots.push(i.toString().padStart(2, "0"));
    }
    return slots;
  });

  // Helper functions
  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Navigation functions
  const previousMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    );
  };

  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    );
  };

  const goToToday = () => {
    currentDate.value = new Date();
  };

  const changeViewMode = (mode) => {
    viewMode.value = mode;
  };

  return {
    // Reactive data
    currentDate,
    viewMode,
    
    // Constants
    daysOfWeek,
    monthNames,
    
    // Computed properties
    currentMonthYear,
    calendarDates,
    weekDays,
    timeSlots,
    
    // Methods
    formatDateString,
    previousMonth,
    nextMonth,
    goToToday,
    changeViewMode
  };
}