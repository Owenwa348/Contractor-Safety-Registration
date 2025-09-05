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
      examiner: "นายประเสริฐ เริสบาระ หัวหน้างานความปลอดภัย", 
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
      examiner: "นายสมชัย แสงโสม หัวหน้างานเครื่องจักร", 
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
      examiner: "นายสมชัย แสงโสม หัวหน้างานเครื่องจักร", 
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
      examiner: "นายสุรพล กรมหนึ่ง หัวหน้างานปั้นจันยกของ", 
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

  const deleteEventSession = (eventId, sessionDate) => {
    const eventToDelete = events.value.find(event => event.id === eventId);
    if (!eventToDelete) return false;

    // If no specific session date is provided, delete the entire event
    if (!sessionDate) {
      return deleteEvent(eventId);
    }

    // For single-day events (most common case with recurring events)
    if (eventToDelete.startDate === eventToDelete.endDate) {
      // Check if the session date matches the event date
      if (eventToDelete.startDate === sessionDate) {
        return deleteEvent(eventId);
      }
      return false; // Session date doesn't match
    }

    // For multi-day events, handle date range modification
    const startDate = new Date(eventToDelete.startDate);
    const endDate = new Date(eventToDelete.endDate);
    const deleteDate = new Date(sessionDate);

    // Check if the delete date is within the event range
    if (deleteDate < startDate || deleteDate > endDate) {
      return false; // Date not in range
    }

    // If deleting the start date, move start date forward
    if (deleteDate.getTime() === startDate.getTime()) {
      const newStartDate = new Date(startDate);
      newStartDate.setDate(startDate.getDate() + 1);
      
      if (newStartDate <= endDate) {
        eventToDelete.startDate = formatDateString(newStartDate);
        return true;
      } else {
        // If this was the last day, delete the entire event
        return deleteEvent(eventId);
      }
    }
    
    // If deleting the end date, move end date backward
    if (deleteDate.getTime() === endDate.getTime()) {
      const newEndDate = new Date(endDate);
      newEndDate.setDate(endDate.getDate() - 1);
      
      if (newEndDate >= startDate) {
        eventToDelete.endDate = formatDateString(newEndDate);
        return true;
      } else {
        // If this was the last day, delete the entire event
        return deleteEvent(eventId);
      }
    }
    
    // If deleting a middle date, split the event into two separate events
    if (deleteDate > startDate && deleteDate < endDate) {
      const firstPartEndDate = new Date(deleteDate);
      firstPartEndDate.setDate(deleteDate.getDate() - 1);
      eventToDelete.endDate = formatDateString(firstPartEndDate);
      
      const secondPartStartDate = new Date(deleteDate);
      secondPartStartDate.setDate(deleteDate.getDate() + 1);
      
      const secondEvent = {
        ...eventToDelete,
        id: Date.now() + Math.random(),
        startDate: formatDateString(secondPartStartDate),
        endDate: formatDateString(endDate)
      };
      
      events.value.push(secondEvent);
      return true;
    }
    
    return false;
  };

  const formatDateString = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
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
    deleteEventSession,
    createMultipleEvents,
    getEventColor,
    startDrag,
    handleDrop,
    handleDropToTimeSlot,
    isPastDate
  };
}