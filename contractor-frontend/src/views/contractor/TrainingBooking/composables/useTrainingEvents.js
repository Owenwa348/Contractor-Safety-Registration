// useTrainingEvents.js - Training events management composable
import { ref, computed } from 'vue'

export function useTrainingEvents() {
  // Events data with registration requirements
  const events = ref([
    {
      id: 1,
      title: "อบรมพื้นฐานความปลอดภัย",
      instructor: "นายสมชาย วิชาการ",
      room: "ห้องอบรม A",
      startDate: "2025-08-20",
      endDate: "2025-08-20",
      isMultiDay: false,
      isAllDay: false,
      time: 8,
      endTime: 16,
      participantCount: 12,
      capacity: 30,
      color: 'blue',
      registrationDaysBefore: 1 // ต้องลงทะเบียนล่วงหน้า 1 วัน
    },
    {
      id: 2,
      title: "อบรมการใช้เครื่องมือ",
      instructor: "นายประเสริฐ เครื่องมือ",
      room: "ห้องอบรม C",
      startDate: "2025-08-22",
      endDate: "2025-08-24",
      isMultiDay: true,
      isAllDay: false,
      time: 9,
      endTime: 15,
      participantCount: 8,
      capacity: 30,
      color: 'blue',
      registrationDaysBefore: 2 // ต้องลงทะเบียนล่วงหน้า 2 วัน
    },
    {
      id: 3,
      title: "อบรมการใช้ปั้นจัน",
      instructor: "นายวิศิษฏ์ เครื่องจักร",
      room: "ห้องอบรม B",
      startDate: "2025-09-27",
      endDate: "2025-09-30", 
      isMultiDay: true,
      isAllDay: false,
      time: 8,
      endTime: 17,
      participantCount: 15,
      capacity: 30,
      color: 'blue',
      registrationDaysBefore: 2 // ต้องลงทะเบียนล่วงหน้า 2 วัน
    },
    {
      id: 4,
      title: "อบรมการประกอบอุปกรณ์",
      instructor: "นายสุรชัย ประกอบการ",
      room: "ห้องอบรม A",
      startDate: "2025-09-12",
      endDate: "2025-09-18", 
      isMultiDay: true,
      isAllDay: false,
      time: 10,
      endTime: 16,
      participantCount: 20,
      capacity: 30,
      color: 'blue',
      registrationDaysBefore: 1 // ต้องลงทะเบียนล่วงหน้า 1 วัน
    },
  ])

  // Computed properties for statistics
  const thisMonthEvents = computed(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    
    return events.value.filter((event) => {
      if (event.isMultiDay) {
        const startDate = new Date(event.startDate)
        const endDate = new Date(event.endDate)
        return (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) ||
               (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear) ||
               (startDate.getMonth() < currentMonth && endDate.getMonth() > currentMonth && 
                startDate.getFullYear() === currentYear && endDate.getFullYear() === currentYear)
      } else {
        const eventDate = new Date(event.startDate)
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
      }
    }).length
  })

  // Event validation methods
  const isEventPast = (event) => {
    if (!event) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const eventEndDate = event.isMultiDay ? new Date(event.endDate) : new Date(event.startDate)
    eventEndDate.setHours(0, 0, 0, 0)
    
    return eventEndDate < today
  }

  const getRegistrationDeadlineForDate = (event, dateString) => {
    if (!event) return null
    
    const targetDate = new Date(dateString)
    const deadline = new Date(targetDate)
    deadline.setDate(deadline.getDate() - event.registrationDaysBefore)
    
    const year = deadline.getFullYear()
    const month = (deadline.getMonth() + 1).toString().padStart(2, "0")
    const day = deadline.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const isRegistrationDeadlinePassed = (event, dateString) => {
    if (!event) return false
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const deadline = new Date(getRegistrationDeadlineForDate(event, dateString))
    deadline.setHours(23, 59, 59, 999)
    
    return today > deadline
  }

  const getAvailableDatesForMultiDayEvent = (event) => {
    if (!event || !event.isMultiDay) return []
    
    const dates = []
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const year = d.getFullYear()
      const month = (d.getMonth() + 1).toString().padStart(2, "0")
      const day = d.getDate().toString().padStart(2, "0")
      dates.push(`${year}-${month}-${day}`)
    }
    
    return dates
  }

  const canBookEvent = (event, selectedDate = null) => {
    if (!event) return false
    
    // Check if event is full
    if (event.participantCount >= event.capacity) return false
    
    // For single day events
    if (!event.isMultiDay) {
      if (isEventPast(event)) return false
      return !isRegistrationDeadlinePassed(event, event.startDate)
    }
    
    // For multi-day events, need to select a specific date first
    if (!selectedDate) return false
    
    // Check if selected date is past
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(selectedDate)
    checkDate.setHours(0, 0, 0, 0)
    if (checkDate < today) return false
    
    // Check if registration deadline has passed for selected date
    return !isRegistrationDeadlinePassed(event, selectedDate)
  }

  const getBookingButtonText = (event, selectedDate = null) => {
    if (!event) return 'ไม่สามารถจองได้'
    
    if (event.participantCount >= event.capacity) {
      return 'การอบรมเต็มแล้ว'
    }
    
    if (!event.isMultiDay) {
      if (isEventPast(event)) return 'การอบรมผ่านไปแล้ว'
      if (isRegistrationDeadlinePassed(event, event.startDate)) return 'หมดเขตลงทะเบียนแล้ว'
      return 'จองอบรมให้ทีมงาน'
    }
    
    if (!selectedDate) return 'กรุณาเลือกวันที่'
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(selectedDate)
    checkDate.setHours(0, 0, 0, 0)
    
    if (checkDate < today) return 'วันที่เลือกผ่านไปแล้ว'
    if (isRegistrationDeadlinePassed(event, selectedDate)) return 'หมดเขตลงทะเบียนแล้ว'
    
    return 'จองอบรมให้ทีมงาน'
  }

  // Multi-day styling helpers
  const getMultiDayBarClass = (barPosition) => {
    switch (barPosition) {
      case 'start':
        return 'rounded-l-md rounded-r-none'
      case 'middle':
        return 'rounded-none'
      case 'end':
        return 'rounded-r-md rounded-l-none'
      case 'single':
      default:
        return 'rounded-md'
    }
  }

  const getBarExtensionClass = (barPosition) => {
    switch (barPosition) {
      case 'start':
        return 'rounded-r-none -mr-1'
      case 'middle':
        return 'rounded-none -ml-1 -mr-1'
      case 'end':
        return 'rounded-l-none -ml-1'
      default:
        return ''
    }
  }

  return {
    // State
    events,
    
    // Computed
    thisMonthEvents,
    
    // Methods
    isEventPast,
    getRegistrationDeadlineForDate,
    isRegistrationDeadlinePassed,
    getAvailableDatesForMultiDayEvent,
    canBookEvent,
    getBookingButtonText,
    getMultiDayBarClass,
    getBarExtensionClass
  }
}