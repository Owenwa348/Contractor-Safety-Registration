// useCalendar.js - Calendar-related composable
import { ref, computed } from 'vue'

export function useCalendar() {
  // Constants
  const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"]
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ]

  // Reactive state
  const currentDate = ref(new Date())
  const viewMode = ref("month")

  // Computed properties
  const currentMonthYear = computed(() => {
    const year = currentDate.value.getFullYear() + 543
    const month = monthNames[currentDate.value.getMonth()]
    return `${month} ${year}`
  })

  const weekDays = computed(() => {
    const startOfWeek = new Date(currentDate.value)
    startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay())
    const today = new Date()

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)

      days.push({
        key: i,
        dayName: daysOfWeek[i],
        date: date.getDate(),
        fullDate: formatDateString(date),
        isToday: date.toDateString() === today.toDateString()
      })
    }

    return days
  })

  const timeSlots = computed(() => {
    const slots = []
    for (let i = 6; i <= 18; i++) {
      slots.push(i.toString().padStart(2, "0"))
    }
    return slots
  })

  // Helper functions
  const formatDateString = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const formatThaiDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear() + 543
    return `${day} ${month} ${year}`
  }

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      // Same month and year
      const month = monthNames[start.getMonth()]
      const year = start.getFullYear() + 543
      return `${start.getDate()} - ${end.getDate()} ${month} ${year}`
    } else if (start.getFullYear() === end.getFullYear()) {
      // Same year, different month
      const startMonth = monthNames[start.getMonth()]
      const endMonth = monthNames[end.getMonth()]
      const year = start.getFullYear() + 543
      return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${year}`
    } else {
      // Different year
      return `${formatThaiDate(startDate)} - ${formatThaiDate(endDate)}`
    }
  }

  const isPastDate = (dateString) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(dateString)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < today
  }

  // Navigation methods
  const previousMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    )
  }

  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    )
  }

  const goToToday = () => {
    currentDate.value = new Date()
  }

  // Generate calendar dates for month view
  const generateCalendarDates = (events) => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const dates = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const dateString = formatDateString(date)
      const dayEvents = getEventsForDate(events, dateString)
      
      dates.push({
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        day: date.getDate(),
        fullDate: dateString,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        events: dayEvents,
        eventDisplays: generateEventDisplays(dayEvents, dateString)
      })
    }

    return dates
  }

  const getEventsForDate = (events, dateString) => {
    return events.filter((event) => {
      if (event.isMultiDay) {
        const startDate = new Date(event.startDate)
        const endDate = new Date(event.endDate)
        const currentDate = new Date(dateString)
        return currentDate >= startDate && currentDate <= endDate
      } else {
        return event.startDate === dateString
      }
    })
  }

  const generateEventDisplays = (dayEvents, dateString) => {
    const displays = []
    const maxDisplayed = 3
    
    // Group multi-day events by title and create continuous bars
    const processedEvents = new Set()
    let rowIndex = 0
    
    dayEvents.forEach((event) => {
      if (processedEvents.has(event.id) || rowIndex >= maxDisplayed) return
      
      if (event.isMultiDay) {
        const currentDate = new Date(dateString)
        const startDate = new Date(event.startDate)
        const endDate = new Date(event.endDate)
        
        let displayText = event.title
        let barPosition = 'middle' // start, middle, end, single
        
        if (currentDate.getTime() === startDate.getTime() && currentDate.getTime() === endDate.getTime()) {
          barPosition = 'single'
        } else if (currentDate.getTime() === startDate.getTime()) {
          barPosition = 'start'
        } else if (currentDate.getTime() === endDate.getTime()) {
          barPosition = 'end'
        } else {
          barPosition = 'middle'
        }
        
        displays.push({
          key: `event-${event.id}-${dateString}`,
          type: 'event',
          event: event,
          displayText: displayText,
          row: rowIndex,
          isMultiDayBar: true,
          barPosition: barPosition
        })
      } else {
        displays.push({
          key: `event-${event.id}-${dateString}`,
          type: 'event',
          event: event,
          displayText: event.title,
          row: rowIndex,
          isMultiDayBar: false,
          barPosition: 'single'
        })
      }
      
      processedEvents.add(event.id)
      rowIndex++
    })
    
    if (dayEvents.length > maxDisplayed) {
      displays.push({
        key: `more-${dateString}`,
        type: 'more',
        count: dayEvents.length - maxDisplayed,
        row: maxDisplayed
      })
    }
    
    return displays
  }

  const getEventsForDayAndHour = (events, dateString, hour) => {
    return events.filter((event) => {
      const isDateMatch = event.isMultiDay 
        ? (new Date(dateString) >= new Date(event.startDate) && new Date(dateString) <= new Date(event.endDate))
        : event.startDate === dateString
      
      return isDateMatch && event.time === parseInt(hour)
    })
  }

  return {
    // State
    currentDate,
    viewMode,
    daysOfWeek,
    monthNames,
    
    // Computed
    currentMonthYear,
    weekDays,
    timeSlots,
    
    // Methods
    formatDateString,
    formatThaiDate,
    formatDateRange,
    isPastDate,
    previousMonth,
    nextMonth,
    goToToday,
    generateCalendarDates,
    getEventsForDate,
    generateEventDisplays,
    getEventsForDayAndHour
  }
}