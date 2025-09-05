// แปลงวันที่เป็นรูปแบบไทย
export const formatDateThai = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH')
}

// คำนวณอายุบัตร
export const calculateCardAge = (issueDateStr, expiryDateStr) => {
  const issueDate = new Date(issueDateStr)
  const expiryDate = new Date(expiryDateStr)
  const diffTime = Math.abs(expiryDate - issueDate)
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
  return diffYears
}

// ตรวจสอบวันที่
export const validateDates = (issueDate, expiryDate) => {
  const errors = []
  
  if (!issueDate) {
    errors.push('กรุณากรอกวันที่ออกบัตร')
  }
  
  if (!expiryDate) {
    errors.push('กรุณากรอกวันหมดอายุ')
  }
  
  if (issueDate && expiryDate) {
    const issueDateTime = new Date(issueDate)
    const expiryDateTime = new Date(expiryDate)
    
    if (expiryDateTime <= issueDateTime) {
      errors.push('วันหมดอายุต้องมาหลังวันที่ออกบัตร')
    }
  }
  
  return errors
}