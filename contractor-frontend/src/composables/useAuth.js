// useAuth.js - Authentication composable
// NOTE: Authentication checks have been disabled in router - all pages are accessible
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  
  // Reactive authentication state
  const isAuthenticated = ref(localStorage.getItem('auth') === 'true')
  const userType = ref(localStorage.getItem('userType') || '')
  const userData = ref(JSON.parse(localStorage.getItem('userData') || '{}'))
  
  // Computed properties
  const isContractor = computed(() => userType.value === 'contractor')
  const isInternal = computed(() => userType.value === 'internal')
  
  // Login function
  const login = (type, data) => {
    localStorage.setItem('auth', 'true')
    localStorage.setItem('userType', type)
    localStorage.setItem('userData', JSON.stringify(data))
    
    // Update reactive state
    isAuthenticated.value = true
    userType.value = type
    userData.value = data
    
    console.log(`User logged in as ${type}:`, data)
  }
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('userType')
    localStorage.removeItem('userData')
    
    // Update reactive state
    isAuthenticated.value = false
    userType.value = ''
    userData.value = {}
    
    console.log('User logged out')
    router.push('/')
  }
  
  // Check authentication status
  const checkAuth = () => {
    const auth = localStorage.getItem('auth') === 'true'
    const type = localStorage.getItem('userType') || ''
    const data = JSON.parse(localStorage.getItem('userData') || '{}')
    
    isAuthenticated.value = auth
    userType.value = type
    userData.value = data
    
    return auth
  }
  
  // Get appropriate dashboard route based on user type
  const getDashboardRoute = () => {
    if (userType.value === 'contractor') {
      return '/manage-team'
    } else if (userType.value === 'internal') {
      return '/list-employees'
    }
    return '/'
  }
  
  return {
    // State
    isAuthenticated,
    userType,
    userData,
    isContractor,
    isInternal,
    
    // Methods
    login,
    logout,
    checkAuth,
    getDashboardRoute
  }
}