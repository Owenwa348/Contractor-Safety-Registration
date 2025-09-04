// usePersonManagement.js
import { ref, computed } from 'vue'

export function usePersonManagement() {
  // People data
  const people = ref([
    { id: 1, name: 'ธันวา ชัยรัตนานนท์', phone: '0874569215', idcard: '11********66', selected: false, examDate: null, status: 'approved' },
    { id: 2, name: 'ภาคิน รินนาน', phone: '0874569216', idcard: '01********12', selected: false, examDate: null, status: 'approved' },
    { id: 3, name: 'กรรณ วรรณ', phone: '0874569217', idcard: '85********58', selected: false, examDate: null, status: 'not_passed', failedTraining: 'อบรมความปลอดภัย' },
    { id: 4, name: 'กรรณา ไอมั่น', phone: '0617153737', idcard: '33********38', selected: false, examDate: null, status: 'approved' },
    { id: 5, name: 'สมชาย ใจดี', phone: '0812345678', idcard: '12********89', selected: false, examDate: null, status: 'not_passed', failedTraining: 'อบรมการใช้เครื่องมือ' },
    { id: 6, name: 'วิชัย มั่นคง', phone: '0823456789', idcard: '34********01', selected: false, examDate: null, status: 'approved' }
  ])
  
  const search = ref('')
  
  // Computed properties
  const filteredPeople = computed(() => {
    if (!search.value) return people.value
    return people.value.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.phone?.toLowerCase().includes(search.value.toLowerCase()) ||
      p.idcard.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  
  const approvedPeople = computed(() => {
    return filteredPeople.value.filter(p => p.status === 'approved')
  })
  
  const notPassedPeople = computed(() => {
    return filteredPeople.value.filter(p => p.status === 'not_passed')
  })
  
  const selectedPeople = computed(() => {
    return people.value.filter(p => p.selected)
  })
  
  const selectedCount = computed(() => {
    return selectedPeople.value.length
  })
  
  const allSelected = computed(() => {
    return filteredPeople.value.length > 0 && filteredPeople.value.every(p => p.selected)
  })
  
  const allApprovedSelected = computed(() => {
    return approvedPeople.value.length > 0 && approvedPeople.value.every(p => p.selected)
  })
  
  const allNotPassedSelected = computed(() => {
    return notPassedPeople.value.length > 0 && notPassedPeople.value.every(p => p.selected)
  })
  
  // Methods
  const togglePersonSelection = (personId) => {
    const person = people.value.find(p => p.id === personId)
    if (person) {
      person.selected = !person.selected
    }
  }
  
  const selectAll = (event) => {
    const checked = event.target.checked
    filteredPeople.value.forEach(person => {
      person.selected = checked
    })
  }
  
  const selectAllApproved = (event) => {
    const checked = event.target.checked
    approvedPeople.value.forEach(person => {
      person.selected = checked
    })
  }
  
  const selectAllNotPassed = (event) => {
    const checked = event.target.checked
    notPassedPeople.value.forEach(person => {
      person.selected = checked
    })
  }
  
  const selectAllPeople = () => {
    people.value.forEach(person => {
      person.selected = true
    })
  }
  
  const selectOnlyApproved = () => {
    people.value.forEach(person => {
      person.selected = person.status === 'approved'
    })
  }
  
  const selectOnlyNotPassed = () => {
    people.value.forEach(person => {
      person.selected = person.status === 'not_passed'
    })
  }
  
  const clearSelection = () => {
    people.value.forEach(person => {
      person.selected = false
    })
  }
  
  const removePerson = (personId) => {
    if (confirm('ลบบุคคลนี้ออกจากรายชื่อ?')) {
      people.value = people.value.filter(p => p.id !== personId)
    }
  }
  
  return {
    // State
    people,
    search,
    
    // Computed
    filteredPeople,
    approvedPeople,
    notPassedPeople,
    selectedPeople,
    selectedCount,
    allSelected,
    allApprovedSelected,
    allNotPassedSelected,
    
    // Methods
    togglePersonSelection,
    selectAll,
    selectAllApproved,
    selectAllNotPassed,
    selectAllPeople,
    selectOnlyApproved,
    selectOnlyNotPassed,
    clearSelection,
    removePerson
  }
}