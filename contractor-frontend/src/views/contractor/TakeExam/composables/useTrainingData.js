import { ref, computed } from 'vue'

export function useTrainingData() {
  // ข้อมูลหลักสูตรอบรม
  const trainings = ref([
    {
      id: 'safety-basic',
      name: 'อบรมพื้นฐานความปลอดภัย',
      details: {
        date: '25 - 30 สิงหาคม 2568',
        time: '08:30 - 16:30 น.',
        instructor: 'ดร.สมชาย ปลอดภัย',
        passingScore: 80,
        duration: '8 ชั่วโมง',
        description: 'หลักการพื้นฐานด้านความปลอดภัยในการทำงาน การป้องกันอุบัติเหตุ และการใช้อุปกรณ์ป้องกันภัยส่วนบุคคล'
      },
      participants: [
        { id: 1, name: 'นายธันวา ชัยรัตนานนท์', position: 'พนักงานผลิต', examStatus: 'passed', score: 85, examDate: '27 สิงหาคม 2568' },
        { id: 2, name: 'นางสาวสุราดา มงคล', position: 'พนักงานคลังสินค้า', examStatus: 'failed', score: 65, examDate: '27 สิงหาคม 2568' },
        { id: 3, name: 'นายสมชาย ใจดี', position: 'พนักงานซ่อมบำรุง', examStatus: 'passed', score: 95, examDate: '27 สิงหาคม 2568' },
        { id: 4, name: 'นางสมใจ รักดี', position: 'พนักงานควบคุมคุณภาพ', examStatus: 'passed', score: 88, examDate: '27 สิงหาคม 2568' },
      ]
    },
    {
      id: 'tool-operation',
      name: 'อบรมการใช้เครื่องมือ',
      details: {
        date: '22 - 24 สิงหาคม 2568',
        time: '08:30 - 12:00 น.',
        instructor: 'ช่างเอก เครื่องกล',
        passingScore: 70,
        duration: '4 ชั่วโมง',
        description: 'การใช้เครื่องมือพื้นฐานในการทำงาน การบำรุงรักษา และมาตรการความปลอดภัยในการใช้เครื่องมือ'
      },
      participants: [
        { id: 1, name: 'นายสมศักดิ์ ช่างฝีมือ', position: 'ช่างเทคนิค', examStatus: 'passed', score: 78, examDate: '23 สิงหาคม 2568' },
        { id: 2, name: 'นายวิชัย มั่นคง', position: 'ช่างซ่อม', examStatus: 'passed', score: 82, examDate: '23 สิงหาคม 2568' },
      ]
    },
    {
      id: 'machine-operation',
      name: 'อบรมการใช้เครื่องจักร',
      details: {
        date: '3 กันยายน 2568',
        time: '08:30 - 17:00 น.',
        instructor: 'วิศวกรใหญ่ สมเกียรติ',
        passingScore: 75,
        duration: '8 ชั่วโมง',
        description: 'การปฏิบัติงานกับเครื่องจักรอุตสาหกรรม ระบบความปลอดภัย และการบำรุงรักษาเบื้องต้น'
      },
      participants: [
        { id: 1, name: 'นายอนุชา ผู้ช่วย', position: 'ผู้ช่วยช่าง', examStatus: 'failed', score: 68, examDate: '3 กันยายน 2568' },
        { id: 2, name: 'นายรัชพล เทคโน', position: 'เทคนิคเครื่องจักร', examStatus: 'passed', score: 89, examDate: '3 กันยายน 2568' },
        { id: 3, name: 'นางสาวปัทมา ขยัน', position: 'พนักงานควบคุม', examStatus: 'passed', score: 76, examDate: '3 กันยายน 2568' },
      ]
    },
    {
      id: 'first-aid',
      name: 'อบรมการประกอบอุปกรณ์',
      details: {
        date: '12 - 18 กันยายน 2568',
        time: '09:00 - 16:00 น.',
        instructor: 'พยาบาลวิชาชีพ สุขใจ',
        passingScore: 80,
        duration: '7 ชั่วโมง',
        description: 'การปฐมพยาบาลเบื้องต้น การช่วยเหลือผู้ประสบอุบัติเหตุ และการใช้อุปกรณ์ปฐมพยาบาล'
      },
      participants: [
        { id: 1, name: 'นายประยุทธ ช่วยเหลือ', position: 'เจ้าหน้าที่ความปลอดภัย' },
        { id: 2, name: 'นางสาวมณีรัตน์ ดูแล', position: 'พยาบาลโรงงาน' },
        { id: 3, name: 'นายสมปอง กล้าหาญ', position: 'หัวหน้าแผนกผลิต' },
        { id: 4, name: 'นางสิริวรรณ เอาใจใส่', position: 'เลขานุการ' }
      ]
    }
  ])

  const selectedTraining = ref('')
  const searchTerm = ref('')

  // Computed properties
  const selectedTrainingData = computed(() => 
    trainings.value.find(t => t.id === selectedTraining.value)
  )
  
  const completedParticipants = computed(() => {
    if (!selectedTrainingData.value?.participants) return []
    return selectedTrainingData.value.participants.filter(p => p.examStatus && p.examDate)
  })

  const hasExamResults = computed(() => completedParticipants.value.length > 0)
  
  const filteredCompletedParticipants = computed(() => {
    if (!searchTerm.value) return completedParticipants.value
    return completedParticipants.value.filter(p =>
      p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      p.position.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      p.examDate.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })

  const examUrl = computed(() => {
    if (selectedTraining.value) {
      return `${window.location.origin}/exam/${selectedTraining.value}`
    }
    return ''
  })
  
  const passedCount = computed(() => 
    completedParticipants.value.filter(p => p.examStatus === 'passed').length
  )
  
  const failedCount = computed(() => 
    completedParticipants.value.filter(p => p.examStatus === 'failed').length
  )

  return {
    trainings,
    selectedTraining,
    searchTerm,
    selectedTrainingData,
    completedParticipants,
    hasExamResults,
    filteredCompletedParticipants,
    examUrl,
    passedCount,
    failedCount
  }
}