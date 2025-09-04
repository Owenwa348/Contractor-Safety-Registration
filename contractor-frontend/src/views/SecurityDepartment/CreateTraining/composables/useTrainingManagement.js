import { ref, computed } from 'vue';

export function useTrainingManagement() {
  // Sample events data
  const events = ref([
    { 
      id: 1, 
      title: "อบรมพื้นฐานความปลอดภัย", 
      startDate: "2025-08-20",
      endDate: "2025-08-20", 
      startTime: 9,
      endTime: 11, 
      type: "อบรมพื้นฐานความปลอดภัย", 
      examiner: "นายสมชัย งบ.1", 
      room: "ห้อง A (30 ที่นั่ง)", 
      color: "#3b82f6", 
      maxParticipants: 25, 
      currentParticipants: 20, 
      isBooked: false 
    },
    { 
      id: 2, 
      title: "อบรมการใช้เครื่องมือ", 
      startDate: "2025-08-22",
      endDate: "2025-08-24", 
      startTime: 13,
      endTime: 16, 
      type: "อบรมการใช้เครื่องมือ", 
      examiner: "นายสุรพล งบ.2", 
      room: "ห้อง B (50 ที่นั่ง)", 
      color: "#10b981", 
      maxParticipants: 20, 
      currentParticipants: 5, 
      isBooked: false 
    },
    { 
      id: 3, 
      title: "อบรมการใช้เครื่องจักร", 
      startDate: "2025-09-03",
      endDate: "2025-09-08", 
      startTime: 13,
      endTime: 16, 
      type: "อบรมการใช้เครื่องจักร", 
      examiner: "นายสุรพล งบ.2", 
      room: "ห้อง B (50 ที่นั่ง)", 
      color: "#10b981", 
      maxParticipants: 20, 
      currentParticipants: 5, 
      isBooked: false 
    },
    { 
      id: 4, 
      title: "อบรมการประกอบอุปกรณ์", 
      startDate: "2025-09-12",
      endDate: "2025-09-18", 
      startTime: 13,
      endTime: 16, 
      type: "อบรมการประกอบอุปกรณ์", 
      examiner: "นายสุรพล งบ.2", 
      room: "ห้อง B (50 ที่นั่ง)", 
      color: "#10b981", 
      maxParticipants: 20, 
      currentParticipants: 5, 
      isBooked: false 
    }
  ]);

  // Drag and drop state
  const draggedEvent = ref(null);

  // Constants
  const trainingTypes = [
    "อบรมพื้นฐานความปลอดภัย", 
    "อบรมผู้ควบคุมงาน", 
    "อบรมการใช้เครื่องมือ", 
    "อบรมการใช้เครื่องจักร", 
    "อบรมการประกอบอุปกรณ์", 
    "อบรมการดับเพลิง"
  ];

  const managers = [
    "นายสมชัย แสงโสม หัวหน้างานขนส่ง", 
    "นายสุรพล กรมหนึ่ง หัวหน้างานปั้นจันยกของ", 
    "นายประเสริฐ เริสบาระ หัวหน้างานจัดการ"
  ];

  const rooms = [
    { name: "ห้อง A (30 ที่นั่ง)", capacity: 30 },
    { name: "ห้อง B (50 ที่นั่ง)", capacity: 50 },
    { name: "ห้อง C (20 ที่นั่ง)", capacity: 20 },
    { name: "ห้องประชุมใหญ่ (100 ที่นั่ง)", capacity: 100 }
  ];

  // Methods
  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.type,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      type: eventData.type,
      examiner: eventData.examiner,
      room: eventData.room,
      maxParticipants: eventData.maxParticipants,
      color: getEventColor(eventData.type),
      isBooked: false,
      currentParticipants: eventData.currentParticipants || 0
    };
    events.value.push(newEvent);
    return newEvent;
  };

  const updateEvent = (eventId, eventData) => {
    const index = events.value.findIndex(event => event.id === eventId);
    if (index !== -1) {
      events.value[index] = {
        ...events.value[index],
        ...eventData,
        title: eventData.type,
        color: getEventColor(eventData.type)
      };
      return events.value[index];
    }
    return null;
  };

  const deleteEvent = (eventId) => {
    const index = events.value.findIndex(event => event.id === eventId);
    if (index !== -1) {
      events.value.splice(index, 1);
      return true;
    }
    return false;
  };

  const createMultipleEvents = (formData, preview) => {
    const createdEvents = [];
    
    preview.forEach((session, index) => {
      const newEvent = {
        id: Date.now() + index,
        title: formData.type,
        startDate: session.date,
        endDate: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
        type: formData.type,
        examiner: formData.examiner,
        room: formData.room,
        maxParticipants: formData.maxParticipants,
        color: getEventColor(formData.type),
        isBooked: false,
        currentParticipants: 0
      };
      events.value.push(newEvent);
      createdEvents.push(newEvent);
    });
    
    return createdEvents;
  };

  const getEventColor = (type) => {
    const colorMap = { 
      "อบรมพื้นฐานความปลอดภัย": "#3b82f6", 
      "อบรมผู้ควบคุมงาน": "#10b981", 
      "อบรมการใช้เครื่องมือ": "#f59e0b", 
      "อบรมการใช้เครื่องจักร": "#8b5cf6", 
      "อบรมการประกอบอุปกรณ์": "#06b6d4", 
      "อบรมการดับเพลิง": "#ef4444" 
    };
    return colorMap[type] || "#6b7280";
  };

  // Drag and drop methods
  const startDrag = (event, dragEvent) => {
    draggedEvent.value = event;
    dragEvent.dataTransfer.effectAllowed = 'move';
  };

  const isPastDate = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate < today;
  };

  const handleDrop = (dateString, dropEvent) => {
    dropEvent.preventDefault();
    
    if (!draggedEvent.value) return;
    
    if (isPastDate(dateString)) {
      alert('ไม่สามารถย้ายการอบรมไปยังวันที่ผ่านมาแล้ว');
      draggedEvent.value = null;
      return;
    }
    
    const eventIndex = events.value.findIndex(e => e.id === draggedEvent.value.id);
    if (eventIndex !== -1) {
      events.value[eventIndex] = {
        ...events.value[eventIndex],
        startDate: dateString,
        endDate: dateString
      };
    }
    
    draggedEvent.value = null;
  };

  const handleDropToTimeSlot = (dateString, hour, dropEvent) => {
    dropEvent.preventDefault();
    
    if (!draggedEvent.value || isPastDate(dateString)) {
      return;
    }
    
    const eventIndex = events.value.findIndex(e => e.id === draggedEvent.value.id);
    if (eventIndex !== -1) {
      const duration = events.value[eventIndex].endTime - events.value[eventIndex].startTime;
      events.value[eventIndex] = {
        ...events.value[eventIndex],
        startDate: dateString,
        endDate: dateString,
        startTime: hour,
        endTime: hour + duration
      };
    }
    
    draggedEvent.value = null;
  };

  return {
    // State
    events,
    draggedEvent,
    
    // Constants
    trainingTypes,
    managers,
    rooms,
    
    // Methods
    addEvent,
    updateEvent,
    deleteEvent,
    createMultipleEvents,
    getEventColor,
    startDrag,
    handleDrop,
    handleDropToTimeSlot,
    isPastDate
  };
}