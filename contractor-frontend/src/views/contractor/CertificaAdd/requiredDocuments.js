// requiredDocuments.js
// Configuration file for required documents in CertificaAdd

export const REQUIRED_DOCUMENTS = [
  {
    name: 'Lifting Work (Mobile Crane) - ใบอนุญาตผู้ควบคุมงานยก',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Mobile Crane) - ใบอนุญาตผู้ให้สัญญาณ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Mobile Crane) - ใบอนุญาตผู้ผูกมัดยึดเกาะ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Mobile Crane) - ใบอนุญาตผู้บังคับปั้นจั่น',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Mobile Crane) - Fit to work',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Stationary Crane) - ใบอนุญาตผู้บังคับปั้นจั่น',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Stationary Crane) - ใบอนุญาตผู้ให้สัญญาณ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Stationary Crane) - ใบอนุญาตผู้ผูกมัดยึดเกาะ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Lifting Work (Stationary Crane) - ใบอนุญาตผู้ควบคุมงานยก',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Confined Space (อับอากาศ) - ใบอนุญาตผู้ปฏิบัติงาน',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Confined Space (อับอากาศ) - ใบอนุญาตผู้ช่วยเหลือ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Confined Space (อับอากาศ) - ใบอนุญาตผู้ควบคุม',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Confined Space (อับอากาศ) - Fit to Work',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Contractor Safety - ใบอนุญาตจป.หัวหน้างาน',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Contractor Safety - ใบอนุญาตจป.เทคนิค',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Contractor Safety - ใบอนุญาตจป.เทคนิคขั้นสูง',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Contractor Safety - ใบอนุญาตจป.วิชาชีพ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Electrical Work - ใบอนุญาตวิศวกรไฟฟ้า',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Electrical Work - ใบอนุญาตช่างไฟฟ้าภายในอาคาร',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Electrical Work - Electrical Safety 3 hr.',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Radiation Work and Scaffolding Work - ใบอนุญาตผู้ปฏิบัติงานด้านรังสี',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Radiation Work and Scaffolding Work - ใบอนุญาตเจ้าหน้าที่ความปลอดภัยทางรังสี (RSO)',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Radiation Work and Scaffolding Work - ใบอนุญาตผู้ตรวจสอบนั่งร้าน',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Radiation Work and Scaffolding Work - ใบอนุญาตช่างติดตั้ง/รื้อถอน',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - ใบอนุญาตเฝ้าระวังไฟ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - ใบอนุญาตนักประดาน้ำ',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - Fit to Work',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - ใบอนุญาตปฏิบัติงานที่สูง Fit to Work',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - ใบอนุญาตพนักงานขับรถ Fit to Work',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - รถ Forklift',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - Fit to Work',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - ใบอนุญาตพนักงานดับเพลิง',
    file: null,
    fileName: '',
    expiryDate: ''
  },
  {
    name: 'Other - ใบอนุญาตพนักงานกู้ภัย',
    file: null,
    fileName: '',
    expiryDate: ''
  }
]

// Helper function to get a fresh copy of required documents
export const getRequiredDocuments = () => {
  return REQUIRED_DOCUMENTS.map(doc => ({ ...doc }))
}

// Document categories for easier management
export const DOCUMENT_CATEGORIES = {
  LIFTING_MOBILE: 'Lifting Work (Mobile Crane)',
  LIFTING_STATIONARY: 'Lifting Work (Stationary Crane)', 
  CONFINED_SPACE: 'Confined Space (อับอากาศ)',
  CONTRACTOR_SAFETY: 'Contractor Safety',
  ELECTRICAL_WORK: 'Electrical Work',
  RADIATION_SCAFFOLDING: 'Radiation Work and Scaffolding Work',
  OTHER: 'Other'
}

// Get documents by category
export const getDocumentsByCategory = (category) => {
  return REQUIRED_DOCUMENTS.filter(doc => doc.name.startsWith(category))
}