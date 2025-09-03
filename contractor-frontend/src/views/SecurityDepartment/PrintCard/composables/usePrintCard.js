import { ref, watch } from 'vue'
import QRCode from 'qrcode'

export function usePrintCard() {
  // Reactive data
  const searchCompany = ref('')
  const searchDate = ref('')
  const selectedContractors = ref([])
  const selectedTrainingType = ref(null)
  const showPreview = ref(false)
  const qrCodes = ref({})

  // วันที่ออกบัตรและวันหมดอายุ
  const issueDate = ref(new Date().toISOString().split('T')[0])
  const expiryDate = ref('')

  // ตั้งค่าวันหมดอายุเริ่มต้น (1 ปีจากวันที่ออกบัตร)
  const initializeExpiryDate = () => {
    const issue = new Date(issueDate.value)
    const expiry = new Date(issue)
    expiry.setFullYear(issue.getFullYear() + 1)
    expiryDate.value = expiry.toISOString().split('T')[0]
  }

  // อัปเดตวันหมดอายุเมื่อวันที่ออกบัตรเปลี่ยน
  const updateExpiryDateWhenIssueChanges = () => {
    if (issueDate.value) {
      initializeExpiryDate()
    }
  }

  // เรียกใช้ตอนเริ่มต้น
  initializeExpiryDate()

  // ติดตามการเปลี่ยนแปลงวันที่ออกบัตร
  watch(issueDate, (newIssueDate) => {
    if (newIssueDate) {
      updateExpiryDateWhenIssueChanges()
    }
  })

  // เลือกหลักสูตร
  const selectTrainingType = (trainingType) => {
    selectedTrainingType.value = trainingType
    selectedContractors.value = []
  }

  // จัดการการเลือก/ไม่เลือกพนักงาน
  const handleSelectContractor = (contractorId) => {
    const index = selectedContractors.value.indexOf(contractorId)
    if (index > -1) {
      selectedContractors.value.splice(index, 1)
    } else {
      selectedContractors.value.push(contractorId)
    }
  }

  // เลือกทั้งหมด/ยกเลิกทั้งหมด
  const handleSelectAll = (filteredContractors) => {
    if (selectedContractors.value.length === filteredContractors.length) {
      selectedContractors.value = []
    } else {
      selectedContractors.value = filteredContractors.map(c => c.id)
    }
  }

  // การสร้าง QR Code สำหรับบัตรพนักงาน
  const generateQRCode = async (contractor) => {
    try {
      const qrData = {
        employeeId: `EMP-${String(contractor.id).padStart(4, '0')}`,
        name: contractor.name,
        company: contractor.company,
        position: contractor.position,
        trainingType: contractor.trainingType,
        trainingDate: contractor.trainingDate,
        issueDate: issueDate.value,
        expiryDate: expiryDate.value,
        phone: contractor.phone,
        status: contractor.status
      }
      
      const qrString = JSON.stringify(qrData)
      
      const qrCodeDataURL = await QRCode.toDataURL(qrString, {
        width: 128,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      return qrCodeDataURL
    } catch (error) {
      console.error('Error generating QR code:', error)
      return null
    }
  }

  // สร้าง QR Code สำหรับพนักงานที่เลือก
  const generateQRCodes = async (contractors) => {
    const codes = {}
    for (const contractorId of selectedContractors.value) {
      const contractor = contractors.find(c => c.id === contractorId)
      if (contractor) {
        codes[contractorId] = await generateQRCode(contractor)
      }
    }
    qrCodes.value = codes
  }

  // แสดงตัวอย่างก่อนพิมพ์
  const handlePrint = async (contractors) => {
    if (selectedContractors.value.length === 0) {
      alert('กรุณาเลือกพนักงานที่ต้องการพิมพ์บัตร')
      return
    }
    
    if (!issueDate.value) {
      alert('กรุณากรอกวันที่ออกบัตร')
      return
    }
    
    if (!expiryDate.value) {
      alert('กรุณากรอกวันหมดอายุ')
      return
    }
    
    const issueDateTime = new Date(issueDate.value)
    const expiryDateTime = new Date(expiryDate.value)
    
    if (expiryDateTime <= issueDateTime) {
      alert('วันหมดอายุต้องมาหลังวันที่ออกบัตร')
      return
    }
    
    await generateQRCodes(contractors)
    showPreview.value = true
  }

  // กลับไปหน้าเลือกหลักสูตร
  const goBackToTraining = () => {
    showPreview.value = false
  }

  // ฟังก์ชันพิมพ์บัตร
  const printCards = () => {
    if (!issueDate.value) {
      alert('กรุณากรอกวันที่ออกบัตรก่อนพิมพ์')
      return
    }
    
    if (!expiryDate.value) {
      alert('กรุณากรอกวันหมดอายุก่อนพิมพ์')
      return
    }
    
    const issueDateTime = new Date(issueDate.value)
    const expiryDateTime = new Date(expiryDate.value)
    
    if (expiryDateTime <= issueDateTime) {
      alert('วันหมดอายุต้องมาหลังวันที่ออกบัตร')
      return
    }
    
    const printArea = document.querySelector('.print-area')
    if (!printArea) return
    
    const body = document.body
    const originalContents = body.innerHTML
    
    body.innerHTML = printArea.outerHTML
    window.print()
    body.innerHTML = originalContents
    
    location.reload()
  }

  return {
    // Reactive data
    searchCompany,
    searchDate,
    selectedContractors,
    selectedTrainingType,
    showPreview,
    qrCodes,
    issueDate,
    expiryDate,
    
    // Methods
    selectTrainingType,
    handleSelectContractor,
    handleSelectAll,
    generateQRCode,
    generateQRCodes,
    handlePrint,
    goBackToTraining,
    printCards
  }
}