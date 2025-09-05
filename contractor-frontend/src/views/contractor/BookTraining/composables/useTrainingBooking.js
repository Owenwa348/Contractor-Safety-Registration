// useTrainingBooking.js
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export function useTrainingBooking() {
  const route = useRoute()
  
  // State
  const isLoading = ref(false)
  const isBooking = ref(false)
  const notifications = ref([])
  
  // URL parameters
  const selectedEventId = ref('')
  const examDate = ref('')
  const examDateDisplay = ref('')
  const eventTitle = ref('')
  const eventDate = ref('')
  const eventTime = ref('')
  const eventEndTime = ref('')
  const examiner = ref('')
  const instructor = ref('')
  const room = ref('')
  const eventType = ref('')
  const round = ref('')
  const capacity = ref('')
  const participantCount = ref('')
  
  // Initialize from URL
  const initializeFromRoute = () => {
    const queryEventId = route.query.eventId
    if (queryEventId) {
      selectedEventId.value = parseInt(queryEventId)
    }
    
    // Get parameters from URL
    if (route.query.examDate) examDate.value = route.query.examDate
    if (route.query.examDateDisplay) {
      examDateDisplay.value = route.query.examDateDisplay
    } else if (route.query.examDate) {
      examDateDisplay.value = formatDate(route.query.examDate)
    }
    if (route.query.eventTitle) eventTitle.value = route.query.eventTitle
    if (route.query.eventDate) eventDate.value = route.query.eventDate
    if (route.query.eventTime) eventTime.value = route.query.eventTime
    if (route.query.eventEndTime) eventEndTime.value = route.query.eventEndTime
    if (route.query.examiner) examiner.value = route.query.examiner
    if (route.query.instructor) instructor.value = route.query.instructor
    if (route.query.room) room.value = route.query.room
    if (route.query.type) eventType.value = route.query.type
    if (route.query.round) round.value = route.query.round
    if (route.query.capacity) capacity.value = route.query.capacity
    if (route.query.participantCount) participantCount.value = route.query.participantCount
  }
  
  // Watch route changes
  watch(() => route.query, (newQuery) => {
    if (newQuery.eventId) {
      selectedEventId.value = parseInt(newQuery.eventId)
    }
    
    if (newQuery.examDate) examDate.value = newQuery.examDate
    if (newQuery.examDateDisplay) {
      examDateDisplay.value = newQuery.examDateDisplay
    } else if (newQuery.examDate) {
      examDateDisplay.value = formatDate(newQuery.examDate)
    }
    if (newQuery.eventTitle) eventTitle.value = newQuery.eventTitle
    if (newQuery.eventDate) eventDate.value = newQuery.eventDate
    if (newQuery.eventTime) eventTime.value = newQuery.eventTime
    if (newQuery.eventEndTime) eventEndTime.value = newQuery.eventEndTime
    if (newQuery.examiner) examiner.value = newQuery.examiner
    if (newQuery.instructor) instructor.value = newQuery.instructor
    if (newQuery.room) room.value = newQuery.room
    if (newQuery.type) eventType.value = newQuery.type
    if (newQuery.round) round.value = newQuery.round
    if (newQuery.capacity) capacity.value = newQuery.capacity
    if (newQuery.participantCount) participantCount.value = newQuery.participantCount
  })
  
  // Computed properties
  const selectedEvent = computed(() => {
    // Create event from URL parameters if available
    if (eventTitle.value || eventDate.value || selectedEventId.value) {
      return {
        id: parseInt(selectedEventId.value) || 0,
        title: eventTitle.value || 'ไม่ระบุหัวข้อ',
        date: eventDate.value || '',
        time: eventTime.value || '08:00',
        endTime: eventEndTime.value || '12:00',
        instructor: instructor.value || examiner.value || 'ไม่ระบุผู้สอน',
        capacity: parseInt(capacity.value) || 30,
        booked: parseInt(participantCount.value) || 0,
        room: room.value || 'ไม่ระบุห้อง',
        type: eventType.value || eventTitle.value || 'อบรม'
      }
    }
    
    return null
  })
  
  const availableSlots = computed(() => {
    if (!selectedEvent.value) return 0
    return selectedEvent.value.capacity - selectedEvent.value.booked
  })
  
  // Helper functions
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    
    const date = new Date(dateStr)
    
    // Check if it's already in Thai format
    if (dateStr.includes('มกราคม') || dateStr.includes('กุมภาพันธ์') || dateStr.includes('กันยายน')) {
      return dateStr
    }
    
    // Convert to Thai format
    const day = date.getDate()
    const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear() + 543
    
    return `${day} ${month} ${year}`
  }
  
  const showNotification = (message, type = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      show: true
    }
    notifications.value.push(notification)
    
    setTimeout(() => {
      const index = notifications.value.findIndex(n => n.id === notification.id)
      if (index > -1) {
        notifications.value.splice(index, 1)
      }
    }, 5000)
  }
  
  const refreshData = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      showNotification('ข้อมูลได้รับการอัปเดตแล้ว')
    } catch (error) {
      showNotification('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error')
    } finally {
      isLoading.value = false
    }
  }
  
  const bookSelected = async (selectedPeople) => {
    // Validation
    if (selectedPeople.length === 0) {
      showNotification('กรุณาเลือกอย่างน้อย 1 คน', 'warning')
      return
    }
    
    if (selectedPeople.length > availableSlots.value) {
      showNotification(`จำนวนคนที่เลือกเกินจำนวนที่นั่งว่าง (เหลือ ${availableSlots.value} ที่นั่ง)`, 'error')
      return
    }
    
    if (availableSlots.value <= 0) {
      showNotification('การอบรมนี้เต็มแล้ว', 'error')
      return
    }
    
    const confirmMessage = examDateDisplay.value 
      ? `ยืนยันการจองอบรม "${selectedEvent.value.title}" ให้ ${selectedPeople.length} คน\nวันที่ทำข้อสอบ: ${examDateDisplay.value}?`
      : `ยืนยันการจองอบรม "${selectedEvent.value.title}" ให้ ${selectedPeople.length} คน?`
    
    if (!confirm(confirmMessage)) {
      return
    }
    
    isBooking.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real application, this would update the backend
      // Since we're using URL parameters, we don't need to update local state
      
      // Store the specific exam date for each selected person
      selectedPeople.forEach(person => {
        person.examDate = examDateDisplay.value || formatDate(examDate.value) || 'ไม่ระบุ'
        person.selected = false
      })
      
      const successMessage = examDateDisplay.value 
        ? `จองเรียบร้อยแล้ว! จำนวน ${selectedPeople.length} คน (วันที่ทำข้อสอบ: ${examDateDisplay.value})`
        : `จองเรียบร้อยแล้ว! จำนวน ${selectedPeople.length} คน`
      
      showNotification(successMessage, 'success')
      return true
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการจอง:', error)
      showNotification('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง', 'error')
      return false
    } finally {
      isBooking.value = false
    }
  }
  
  onMounted(() => {
    initializeFromRoute()
  })
  
  return {
    // State
    isLoading,
    isBooking,
    notifications,
    selectedEventId,
    examDate,
    examDateDisplay,
    eventTitle,
    eventDate,
    eventTime,
    eventEndTime,
    examiner,
    instructor,
    room,
    eventType,
    round,
    capacity,
    participantCount,
    
    // Computed
    selectedEvent,
    availableSlots,
    
    // Methods
    formatDate,
    showNotification,
    refreshData,
    bookSelected,
    initializeFromRoute
  }
}