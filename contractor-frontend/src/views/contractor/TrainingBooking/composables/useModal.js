// useModal.js - Modal management composable
import { ref } from 'vue'
import { useRouter } from "vue-router"

export function useModal() {
  const router = useRouter()
  
  // Modal state
  const showModal = ref(false)
  const showMoreModal = ref(false)
  const selectedEvent = ref(null)
  const selectedDate = ref(null) // For multi-day event date selection
  const moreEventsDate = ref('')
  const moreEventsList = ref([])

  // Modal methods
  const viewEvent = (event, clickedDate = null) => {
    selectedEvent.value = event
    selectedDate.value = null
    
    // If it's a multi-day event and we clicked on a specific date, pre-select that date
    if (event.isMultiDay && clickedDate) {
      selectedDate.value = clickedDate
    }
    
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    selectedEvent.value = null
    selectedDate.value = null
  }

  const showMoreEvents = (date) => {
    moreEventsDate.value = date.fullDate
    moreEventsList.value = date.events
    showMoreModal.value = true
  }

  const closeMoreModal = () => {
    showMoreModal.value = false
    moreEventsDate.value = ''
    moreEventsList.value = []
  }

  const viewEventFromMore = (event) => {
    closeMoreModal()
    viewEvent(event, moreEventsDate.value)
  }

  const selectSpecificDate = (dateString) => {
    selectedDate.value = dateString
  }

  const bookTrainingFromModal = (formatThaiDate) => {
    if (!selectedEvent.value) {
      console.error("ไม่มีข้อมูลการอบรมที่เลือก")
      return
    }

    const currentEvent = { ...selectedEvent.value }
    const bookingDate = selectedDate.value || currentEvent.startDate
    closeModal()

    const queryParams = {
      eventId: String(currentEvent.id),
      eventTitle: currentEvent.title,
      eventDate: bookingDate,
      eventTime: String(currentEvent.time || 8),
      examiner: "นายสมชัย งบ.1",
      type: currentEvent.title,
      room: "ห้อง A",
      registrationDaysBefore: String(currentEvent.registrationDaysBefore || 1),
      // Add the specific exam date for individual tracking
      examDate: bookingDate
    }

    if (currentEvent.isMultiDay) {
      queryParams.eventEndDate = currentEvent.endDate
      queryParams.isMultiDay = "true"
      queryParams.selectedDate = bookingDate
      queryParams.round = `${formatThaiDate(bookingDate)} ${currentEvent.time}:00-12:00`
      // For multi-day events, use the selected specific date as exam date
      queryParams.examDateDisplay = formatThaiDate(bookingDate)
    } else {
      queryParams.round = `${currentEvent.startDate} ${currentEvent.time}:00-12:00`
      queryParams.examDateDisplay = formatThaiDate(currentEvent.startDate)
    }

    router
      .push({
        path: "/book-training",
        query: queryParams,
      })
      .catch((err) => {
        console.error("Navigation error:", err)
        const params = new URLSearchParams(queryParams)
        window.location.href = `/book-training?${params.toString()}`
      })
  }

  const addEventToTimeSlot = (dateString, hour) => {
    console.log("เพิ่มการอบรมใหม่ในวันที่:", dateString, "เวลา:", hour)
    // สามารถเปิด modal หรือไปหน้าจองอบรมใหม่ได้
  }

  return {
    // State
    showModal,
    showMoreModal,
    selectedEvent,
    selectedDate,
    moreEventsDate,
    moreEventsList,
    
    // Methods
    viewEvent,
    closeModal,
    showMoreEvents,
    closeMoreModal,
    viewEventFromMore,
    selectSpecificDate,
    bookTrainingFromModal,
    addEventToTimeSlot
  }
}