import { ref, computed } from 'vue';

export function useEventData() {
  // Mock training events data
  const events = ref([
    {
      id: 1,
      title: "อบรมพื้นฐานความปลอดภัย",
      startDate: "2025-08-20",
      endDate: "2025-08-20",
      isMultiDay: false,
      isAllDay: false,
      startTime: "08:00",
      endTime: "17:00",
      time: 8,
      participantCount: 5,
      capacity: 30,
      participants: [
        { id: 1, name: 'นายวิชัย ฝึกฝน', phone: '0867890123', idCard: '6789012345678' },
        { id: 2, name: 'นางสาวปิยะ พัฒนา', phone: '0878901234', idCard: '7890123456789' },
        { id: 3, name: 'นายกิตติ มานะ', phone: '0889012345', idCard: '8901234567890' },
        { id: 4, name: 'นายสุรพล พยายาม', phone: '0890123456', idCard: '9012345678901' },
        { id: 5, name: 'นางเพ็ญ อุตสาห์', phone: '0801234567', idCard: '0123456789012' },
      ]
    },
    {
      id: 2,
      title: "อบรมการใช้เครื่องมือ",
      startDate: "2025-08-22",
      endDate: "2025-08-24",
      isMultiDay: true,
      isAllDay: false,
      startTime: "09:00",
      endTime: "16:00",
      time: 9,
      participantCount: 5,
      capacity: 30,
      participants: [
        { id: 1, name: 'นายสมศักดิ์ เรียนรู้', phone: '0845678901', idCard: '4567890123456' },
        { id: 2, name: 'นายธันวา ชัยรัตนานนท์', phone: '0812345667', idCard: '1234567890111' },
        { id: 3, name: 'นางมณี ตั้งใจ', phone: '0856789012', idCard: '5678901234567' },
        { id: 4, name: 'นายวิชัย ฝึกฝน', phone: '0867890123', idCard: '6789012345678' },
        { id: 5, name: 'นางสาวปิยะ พัฒนา', phone: '0878901234', idCard: '7890123456789' },
      ]
    },
    {
      id: 3,
      title: "อบรมการใช้เครื่องจักร",
      startDate: "2025-08-27",
      endDate: "2025-08-30", 
      isMultiDay: true,
      isAllDay: false,
      startTime: "09:00",
      endTime: "13:30",
      time: 9,
      participantCount: 5,
      capacity: 30,
      participants: [
        { id: 1, name: 'นายสมชาย ใจดี', phone: '0812345678', idCard: '1234567890123' },
        { id: 2, name: 'นางสาวสุดา ขยัน', phone: '0823456789', idCard: '2345678901234' },
        { id: 3, name: 'นายประชา รักงาน', phone: '0834567890', idCard: '3456789012345' },
        { id: 4, name: 'นายสมศักดิ์ เรียนรู้', phone: '0845678901', idCard: '4567890123456' },
        { id: 5, name: 'นางมณี ตั้งใจ', phone: '0856789012', idCard: '5678901234567' },
      ]
    },
    {
      id: 4,
      title: "อบรมการประกอบอุปกรณ์",
      startDate: "2025-09-12",
      endDate: "2025-09-18", 
      isMultiDay: true,
      isAllDay: false,
      startTime: "08:30",
      endTime: "16:30",
      time: 8,
      participantCount: 5,
      capacity: 30,
      participants: [
        { id: 1, name: 'นายสุรพล พยายาม', phone: '0890123456', idCard: '9012345678901' },
        { id: 2, name: 'นางเพ็ญ อุตสาห์', phone: '0801234567', idCard: '0123456789012' },
        { id: 3, name: 'นายธนา มุ่งมั่น', phone: '0891234567', idCard: '1123456789012' },
        { id: 4, name: 'นางสาวรัตนา สู้งาน', phone: '0881234567', idCard: '2123456789012' },
        { id: 5, name: 'นายประดิษฐ์ คิดสร้าง', phone: '0871234567', idCard: '3123456789012' },
      ]
    },
  ]);

  // Computed statistics
  const thisMonthEvents = computed(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return events.value.filter((event) => {
      if (event.isMultiDay) {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        return (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) ||
               (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear) ||
               (startDate.getMonth() < currentMonth && endDate.getMonth() > currentMonth && 
                startDate.getFullYear() === currentYear && endDate.getFullYear() === currentYear);
      } else {
        const eventDate = new Date(event.startDate);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
      }
    }).length;
  });

  // Event utility functions
  const getEventsForDate = (dateString) => {
    return events.value.filter((event) => {
      if (event.isMultiDay) {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        const currentDate = new Date(dateString);
        return currentDate >= startDate && currentDate <= endDate;
      } else {
        return event.startDate === dateString;
      }
    });
  };

  const generateEventDisplays = (dayEvents, dateString) => {
    const displays = [];
    const maxDisplayed = 3;
    let rowIndex = 0;
    
    dayEvents.forEach((event) => {
      if (rowIndex >= maxDisplayed) return;
      
      let displayText = event.title;
      let barPosition = 'single';
      
      if (event.isMultiDay) {
        const currentDate = new Date(dateString);
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        
        if (currentDate.getTime() === startDate.getTime() && currentDate.getTime() === endDate.getTime()) {
          barPosition = 'single';
        } else if (currentDate.getTime() === startDate.getTime()) {
          barPosition = 'start';
        } else if (currentDate.getTime() === endDate.getTime()) {
          barPosition = 'end';
        } else {
          barPosition = 'middle';
        }
      }
      
      displays.push({
        key: `event-${event.id}-${dateString}`,
        type: 'event',
        event: event,
        displayText: displayText,
        row: rowIndex,
        isMultiDayBar: event.isMultiDay,
        barPosition: barPosition
      });
      
      rowIndex++;
    });
    
    if (dayEvents.length > maxDisplayed) {
      displays.push({
        key: `more-${dateString}`,
        type: 'more',
        count: dayEvents.length - maxDisplayed,
        row: maxDisplayed
      });
    }
    
    return displays;
  };

  const getEventsForDayAndHour = (dateString, hour) => {
    return events.value.filter((event) => {
      const isDateMatch = event.isMultiDay 
        ? (new Date(dateString) >= new Date(event.startDate) && new Date(dateString) <= new Date(event.endDate))
        : event.startDate === dateString;
      
      return isDateMatch && event.time === parseInt(hour);
    });
  };

  // Update calendar dates with events
  const updateCalendarDatesWithEvents = (calendarDates) => {
    return calendarDates.map(date => {
      const dayEvents = getEventsForDate(date.fullDate);
      return {
        ...date,
        events: dayEvents,
        eventDisplays: generateEventDisplays(dayEvents, date.fullDate)
      };
    });
  };

  return {
    // Reactive data
    events,
    
    // Computed properties
    thisMonthEvents,
    
    // Methods
    getEventsForDate,
    generateEventDisplays,
    getEventsForDayAndHour,
    updateCalendarDatesWithEvents
  };
}