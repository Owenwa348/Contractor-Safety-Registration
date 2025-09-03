import { computed } from 'vue'

export function useContractorData() {
  // ข้อมูลหลักสูตรการอบรม
  const trainingTypes = [
    {
      type: 'อบรมพื้นฐานความปลอดภัย',
      description: 'หลักสูตรพื้นฐานเกี่ยวกับความปลอดภัยในการทำงาน'
    },
    {
      type: 'อบรมการใช้เครื่องมือ',
      description: 'การใช้เครื่องมือและอุปกรณ์อย่างปลอดภัย'
    },
    {
      type: 'อบรมการใช้เครื่องจักร',
      description: 'การควบคุมและใช้เครื่องจักรในงานก่อสร้าง'
    },
    {
      type: 'อบรมการประกอบอุปกรณ์',
      description: 'การประกอบอุปกรณ์เบื้องต้นในสถานที่ทำงาน'
    }
  ]

  // ข้อมูลตัวอย่างพนักงานที่ผ่านการอบรม
  const contractors = [
    {
      id: 1,
      name: 'ธันวา ชัยรัตนานนท์',
      company: 'บริษัท ก่อสร้าง ABC จำกัด',
      position: 'หัวหน้าช่าง',
      phone: '081-234-5678',
      trainingDate: '2025-08-20',
      trainingType: 'อบรมพื้นฐานความปลอดภัย',
      photo: null,
      status: 'ผ่านการอบรม'
    },
    {
      id: 2,
      name: 'ประยุทธ์ ศรีสวัสดิ์',
      company: 'บริษัท XYZ Engineering',
      position: 'วิศวกร',
      phone: '082-345-6789',
      trainingDate: '2025-08-24',
      trainingType: 'อบรมการใช้เครื่องมือ',
      photo: null,
      status: 'ผ่านการอบรม'
    },
    {
      id: 3,
      name: 'วิไล สุขใส',
      company: 'ห้างหุ้นส่วน DEF',
      position: 'ช่างเชื่อม',
      phone: '083-456-7890',
      trainingDate: '2025-09-08',
      trainingType: 'อบรมการใช้เครื่องจักร',
      photo: null,
      status: 'ผ่านการอบรม'
    },
    {
      id: 4,
      name: 'สมชาย ใจดี',
      company: 'บริษัท GHI Construction',
      position: 'ช่างไฟฟ้า',
      phone: '084-567-8901',
      trainingDate: '2025-08-20',
      trainingType: 'อบรมพื้นฐานความปลอดภัย',
      photo: null,
      status: 'ผ่านการอบรม'
    },
    {
      id: 5,
      name: 'สุพิน มีความสุข',
      company: 'บริษัท JKL Services',
      position: 'ช่างประปา',
      phone: '085-678-9012',
      trainingDate: '2025-08-21',
      trainingType: 'อบรมการประกอบอุปกรณ์',
      photo: null,
      status: 'ผ่านการอบรม'
    },
    {
      id: 6,
      name: 'มานะ ทำงานหนัก',
      company: 'บริษัท ก่อสร้าง ABC จำกัด',
      position: 'ช่างก่อสร้าง',
      phone: '086-789-0123',
      trainingDate: '2025-08-24',
      trainingType: 'อบรมการใช้เครื่องมือ',
      photo: null,
      status: 'ผ่านการอบรม'
    },
    {
      id: 7,
      name: 'สุดา เอาใจใส่',
      company: 'บริษัท MNO Engineering',
      position: 'ช่างสำรวจ',
      phone: '087-890-1234',
      trainingDate: '2025-09-08',
      trainingType: 'อบรมการใช้เครื่องจักร',
      photo: null,
      status: 'ผ่านการอบรม'
    },
    {
      id: 8,
      name: 'ประยุทธ์ มุ่งมั่น',
      company: 'ห้างหุ้นส่วน PQR',
      position: 'หัวหน้าโครงการ',
      phone: '088-901-2345',
      trainingDate: '2025-09-03',
      trainingType: 'อบรมการประกอบอุปกรณ์',
      photo: null,
      status: 'ผ่านการอบรม'
    }
  ]

  // นับจำนวนพนักงานตามหลักสูตร
  const getTrainingCount = (trainingType) => {
    return contractors.filter(c => c.trainingType === trainingType).length
  }

  // สร้าง training types พร้อมจำนวน
  const getTrainingTypesWithCount = () => {
    return trainingTypes.map(training => ({
      ...training,
      count: getTrainingCount(training.type)
    }))
  }

  // กรองข้อมูลตามหลักสูตรที่เลือกและการค้นหา
  const getFilteredContractors = (selectedTrainingType, searchCompany, searchDate) => {
    if (!selectedTrainingType) return []
    
    return contractors.filter(contractor => {
      const matchTraining = contractor.trainingType === selectedTrainingType
      const matchCompany = !searchCompany || 
        contractor.company.toLowerCase().includes(searchCompany.toLowerCase())
      const matchDate = !searchDate || 
        contractor.trainingDate === searchDate
      
      return matchTraining && matchCompany && matchDate
    })
  }

  // ข้อมูลพนักงานที่เลือกพร้อม QR Code
  const getSelectedContractorData = (selectedContractors, qrCodes) => {
    return contractors.filter(c => selectedContractors.includes(c.id)).map(contractor => ({
      ...contractor,
      qrCode: qrCodes[contractor.id]
    }))
  }

  return {
    trainingTypes,
    contractors,
    getTrainingCount,
    getTrainingTypesWithCount,
    getFilteredContractors,
    getSelectedContractorData
  }
}