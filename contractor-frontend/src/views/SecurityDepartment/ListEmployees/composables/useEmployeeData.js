// useEmployeeData.js
import { ref, computed } from 'vue'

export function useEmployeeData() {
  // Reactive data
  const tableData = ref([
    { id: 1, name: 'ธันวา ชัยรัตนานนท์', phoneNumber: '0617153737', organization: 'บริษัท ABC จำกัด', status: 'ผ่านการอบรม', rejectReason: '', registrationDate: '2024-01-15', approvalDate: '2024-01-22' },
    { id: 2, name: 'สมชาย จันทร์เพ็ญ', phoneNumber: '0819876543', organization: 'บริษัท XYZ จำกัด', status: 'อนุมัติแล้ว', rejectReason: '', registrationDate: '2024-01-20', approvalDate: '2024-01-22' },
    { id: 3, name: 'นิดา วงศ์ใส', phoneNumber: '0923456789', organization: 'บริษัท DEF จำกัด', status: 'ไม่อนุมัติ', rejectReason: 'เอกสารไม่ครบถ้วน', registrationDate: '2024-01-25', approvalDate: '' },
    { id: 4, name: 'ประยุทธ์ ศรีสวัสดิ์', phoneNumber: '0856789012', organization: 'มหาวิทยาลัย GHI', status: 'ผ่านการอบรม', rejectReason: '', registrationDate: '2024-02-01', approvalDate: '2024-02-05' },
    { id: 5, name: 'มาลี ใจดี', phoneNumber: '0634567890', organization: 'โรงพยาบาล JKL', status: 'หมดอายุ', rejectReason: '', registrationDate: '2023-12-10', approvalDate: '2023-12-15' },
    { id: 18, name: 'สมหมาย เรียนรู้', phoneNumber: '0923456780', organization: 'บริษัท ABC จำกัด', status: 'ไม่ผ่าน', rejectReason: 'ไม่ผ่านการประเมินความรู้', registrationDate: '2024-03-05', approvalDate: '' },
    { id: 19, name: 'วรรณี ขยันขัน', phoneNumber: '0812345679', organization: 'บริษัท XYZ จำกัด', status: 'ไม่ผ่าน', rejectReason: 'ไม่ผ่านการประเมินความรู้', registrationDate: '2024-03-08', approvalDate: '' },
    { id: 6, name: 'สมศักดิ์ มานะ', phoneNumber: '0712345678', organization: 'บริษัท ABC จำกัด', status: 'รอการอนุมัติ', rejectReason: '', registrationDate: '2024-02-10', approvalDate: '' },
    { id: 7, name: 'วิไล สุขใส', phoneNumber: '0889876543', organization: 'บริษัท XYZ จำกัด', status: 'ผ่านการอบรม', rejectReason: '', registrationDate: '2024-02-15', approvalDate: '2024-02-20' },
    { id: 8, name: 'อนุชา บุญมี', phoneNumber: '0945678901', organization: 'บริษัท DEF จำกัด', status: 'อนุมัติแล้ว', rejectReason: '', registrationDate: '2024-02-20', approvalDate: '2024-02-25' },
    { id: 9, name: 'สมชาย ใจดี', phoneNumber: '0812345678', organization: 'บริษัท ABC จำกัด', status: 'ผ่านการอบรม', rejectReason: '', registrationDate: '2024-01-20', approvalDate: '2024-01-25' },
    { id: 10, name: 'สมหญิง รักสุข', phoneNumber: '0923456789', organization: 'บริษัท XYZ จำกัด', status: 'ไม่อนุมัติ', rejectReason: 'เอกสารไม่ครบ (ขาดหลักฐานประกันสังคม)', registrationDate: '2024-02-01', approvalDate: '' },
    { id: 11, name: 'วิชัย สมใจ', phoneNumber: '0834567890', organization: 'บริษัท XYZ จำกัด', status: 'รอการอนุมัติ', rejectReason: '', registrationDate: '2024-02-05', approvalDate: '' },
    { id: 12, name: 'นภัส ศรีสุข', phoneNumber: '0945678901', organization: 'บริษัท DEF จำกัด', status: 'อนุมัติแล้ว', rejectReason: '', registrationDate: '2024-02-10', approvalDate: '2024-02-12' },
    { id: 13, name: 'อารีย์ มั่นคง', phoneNumber: '0856789012', organization: 'มหาวิทยาลัย GHI', status: 'อนุมัติแล้ว', rejectReason: '', registrationDate: '2024-02-15', approvalDate: '2024-02-20' },
    { id: 14, name: 'สุรชัย วีรกุล', phoneNumber: '0967890123', organization: 'มหาวิทยาลัย GHI', status: 'ไม่อนุมัติ', rejectReason: 'ไม่อนุมัติการ (ไม่ผ่านการพิจารณาตามเกณฑ์)', registrationDate: '2024-02-18', approvalDate: '' },
    { id: 15, name: 'มณีรัตน์ สุขใส', phoneNumber: '0878901234', organization: 'โรงพยาบาล JKL', status: 'รอการอนุมัติ', rejectReason: '', registrationDate: '2024-02-20', approvalDate: '' },
    { id: 16, name: 'ประวิท มีสุข', phoneNumber: '0789012345', organization: 'โรงพยาบาล JKL', status: 'อนุมัติแล้ว', rejectReason: '', registrationDate: '2024-02-22', approvalDate: '2024-02-25' },
    { id: 17, name: 'สุรีย์ วิทยา', phoneNumber: '0801234567', organization: 'บริษัท DEF จำกัด', status: 'รอการอนุมัติ', rejectReason: '', registrationDate: '2024-03-01', approvalDate: '' }
  ])

  const deletedEmployees = ref([])

  // Filter data
  const searchData = ref({
    department: '',
    organization: '',
    searchTerm: ''
  })

  // Computed values
  const totalCount = computed(() => tableData.value.length)

  const statusCounts = computed(() => {
    const counts = {}
    const statuses = ['รอการอนุมัติ', 'อนุมัติแล้ว', 'ไม่อนุมัติ', 'ผ่านการอบรม', 'หมดอายุ', 'ไม่ผ่าน']
    
    statuses.forEach(status => {
      counts[status] = tableData.value.filter(item => item.status === status).length
    })
    
    return counts
  })

  const filteredTableData = computed(() => {
    let filtered = tableData.value

    if (searchData.value.department) {
      filtered = filtered.filter(item => item.status === searchData.value.department)
    }

    if (searchData.value.organization) {
      filtered = filtered.filter(item => item.organization === searchData.value.organization)
    }

    if (searchData.value.searchTerm) {
      const searchTerm = searchData.value.searchTerm.toLowerCase()
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.phoneNumber.includes(searchTerm)
      )
    }

    return filtered
  })

  // Methods
  const deleteEmployee = (employee) => {
    const index = tableData.value.findIndex(item => item.id === employee.id)
    if (index !== -1) {
      // Move to deleted employees list with timestamp
      const deletedItem = {
        ...employee,
        deletedAt: new Date().toISOString(),
        deletedBy: 'Security Admin' // Could be dynamic based on current user
      }
      deletedEmployees.value.push(deletedItem)
      
      // Remove from main list
      tableData.value.splice(index, 1)
      return true
    }
    return false
  }

  const restoreEmployee = (employee) => {
    const deletedIndex = deletedEmployees.value.findIndex(item => item.id === employee.id)
    if (deletedIndex !== -1) {
      deletedEmployees.value.splice(deletedIndex, 1)
      
      // Restore to main list (remove deleted metadata)
      const { deletedAt, deletedBy, ...restoredEmployee } = employee
      tableData.value.push(restoredEmployee)
      return true
    }
    return false
  }

  const permanentDeleteEmployee = (employee) => {
    const deletedIndex = deletedEmployees.value.findIndex(item => item.id === employee.id)
    if (deletedIndex !== -1) {
      deletedEmployees.value.splice(deletedIndex, 1)
      return true
    }
    return false
  }

  const clearFilters = () => {
    searchData.value = { department: '', organization: '', searchTerm: '' }
  }

  const updateFilter = (key, value) => {
    searchData.value[key] = value
  }

  return {
    // Data
    tableData,
    deletedEmployees,
    searchData,
    
    // Computed
    totalCount,
    statusCounts,
    filteredTableData,
    
    // Methods
    deleteEmployee,
    restoreEmployee,
    permanentDeleteEmployee,
    clearFilters,
    updateFilter
  }
}