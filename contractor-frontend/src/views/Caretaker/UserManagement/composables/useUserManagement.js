import { ref, computed } from 'vue'

export function useUserManagement() {
  const users = ref([])
  const searchData = ref({
    role: '',
    status: '',
    searchTerm: '',
    lastLogin: ''
  })

  // Constants
  const roles = ref([
    { value: 'safety', label: 'Admin(safety)' },
    { value: 'manager', label: 'เจ้าของงาน/หัวหน้างาน' },
  ])

  // Computed properties
  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      const matchRole = !searchData.value.role || user.role === searchData.value.role
      const matchStatus = !searchData.value.status || user.status === searchData.value.status
      
      // Fix search to handle empty names
      const searchTerm = searchData.value.searchTerm.toLowerCase()
      const matchSearch = !searchData.value.searchTerm || 
        (user.name && user.name.toLowerCase().includes(searchTerm)) ||
        user.email.toLowerCase().includes(searchTerm) ||
        (user.phone && user.phone.includes(searchData.value.searchTerm))
      
      // Fixed last login filter
      let matchLastLogin = true
      if (searchData.value.lastLogin) {
        const now = new Date()
        const userLastLogin = user.lastLogin ? new Date(user.lastLogin) : null
        
        switch (searchData.value.lastLogin) {
          case 'today':
            if (userLastLogin) {
              const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
              const loginDate = new Date(userLastLogin.getFullYear(), userLastLogin.getMonth(), userLastLogin.getDate())
              matchLastLogin = today.getTime() === loginDate.getTime()
            } else {
              matchLastLogin = false
            }
            break
          case 'week':
            if (userLastLogin) {
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
              matchLastLogin = userLastLogin >= weekAgo
            } else {
              matchLastLogin = false
            }
            break
          case 'month':
            if (userLastLogin) {
              const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
              matchLastLogin = userLastLogin >= monthAgo
            } else {
              matchLastLogin = false
            }
            break
          case 'never':
            matchLastLogin = !userLastLogin
            break
          default:
            matchLastLogin = true
        }
      }
      
      return matchRole && matchStatus && matchSearch && matchLastLogin
    })
  })

  // Methods
  const updateFilter = (newSearchData) => {
    searchData.value = { ...newSearchData }
  }

  const clearFilters = () => {
    searchData.value = {
      role: '',
      status: '',
      searchTerm: '',
      lastLogin: ''
    }
  }

  const editUser = (userIndex, updatedUser) => {
    if (userIndex > -1) {
      users.value[userIndex] = { ...updatedUser }
    }
  }

  const toggleUserStatus = (user) => {
    user.status = user.status === 'active' ? 'suspended' : 'active'
  }

  const deleteUser = (userId) => {
    const index = users.value.findIndex(u => u.id === userId)
    if (index > -1) {
      users.value.splice(index, 1)
      return true
    }
    return false
  }

  const addMultipleUsers = (newUsers, existingEmails = []) => {
    // Check for existing emails in users list
    const currentEmails = users.value.map(user => user.email.toLowerCase())
    const allExistingEmails = [...currentEmails, ...existingEmails.map(e => e.toLowerCase())]
    
    const duplicateEmails = newUsers.filter(user => 
      allExistingEmails.includes(user.email.toLowerCase())
    )
    
    if (duplicateEmails.length > 0) {
      throw new Error(`อีเมลต่อไปนี้มีอยู่ในระบบแล้ว: ${duplicateEmails.map(u => u.email).join(', ')}`)
    }
    
    // Add new users
    const addedUsers = newUsers.map(user => ({
      id: Date.now() + Math.random(),
      name: '', // Start with empty name - user can edit later
      email: user.email,
      phone: '',
      company: user.company,
      role: 'safety',
      status: 'active',
      lastLogin: null,
      createdAt: new Date(),
      passwordReset: false,
      mustChangePassword: false
    }))
    
    users.value.push(...addedUsers)
    return addedUsers.length
  }

  // Initialize sample data
  const initializeSampleData = () => {
    const now = new Date()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    users.value = [
      { 
        id: 1, 
        name: 'นาย สมชาย ใจดี', 
        email: 'somchai@company.com', 
        phone: '081-234-5678', 
        company: 'บริษัท เอ จำกัด',
        role: 'safety', 
        status: 'active', 
        lastLogin: now, 
        createdAt: new Date(),
        passwordReset: false,
        mustChangePassword: false
      },
      { 
        id: 2, 
        name: 'นาง สมหญิง ดีใจ', 
        email: 'somying@company.com', 
        phone: '082-345-6789', 
        company: 'บริษัท เอ จำกัด',
        role: 'manager', 
        status: 'active', 
        lastLogin: yesterday, 
        createdAt: new Date(),
        passwordReset: false,
        mustChangePassword: false
      },
      { 
        id: 3, 
        name: 'นาย อานนท์ มั่นคง', 
        email: 'anan@company.com', 
        phone: '083-456-7890', 
        company: 'บริษัท บี จำกัด',
        role: 'safety', 
        status: 'active', 
        lastLogin: lastWeek, 
        createdAt: new Date(),
        passwordReset: false,
        mustChangePassword: false
      },
      { 
        id: 4, 
        name: '', 
        email: 'newuser@company.com', 
        phone: '084-567-8901', 
        company: 'บริษัท ซี จำกัด',
        role: 'safety', 
        status: 'active', 
        lastLogin: null, // Never logged in
        createdAt: new Date(),
        passwordReset: false,
        mustChangePassword: false
      },
      { 
        id: 5, 
        name: '', 
        email: 'emptyname@company.com', 
        phone: '085-678-9012', 
        company: 'บริษัท ดี จำกัด',
        role: 'safety', 
        status: 'active', 
        lastLogin: null, // Never logged in
        createdAt: new Date(),
        passwordReset: false,
        mustChangePassword: false
      },
      { 
        id: 6, 
        name: '', 
        email: 'testreset@company.com', 
        phone: '086-789-0123', 
        company: 'บริษัท อี จำกัด',
        role: 'safety', 
        status: 'active', 
        lastLogin: null, // Reset to never logged in state
        createdAt: new Date(),
        passwordReset: true,
        mustChangePassword: true,
        passwordResetDate: new Date()
      }
    ]
  }

  return {
    users,
    searchData,
    roles,
    filteredUsers,
    updateFilter,
    clearFilters,
    editUser,
    toggleUserStatus,
    deleteUser,
    addMultipleUsers,
    initializeSampleData
  }
}