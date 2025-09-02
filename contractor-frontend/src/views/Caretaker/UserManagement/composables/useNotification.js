import { ref } from 'vue'

export function useNotification() {
  const notification = ref({
    show: false,
    message: '',
    type: 'success' // 'success', 'error', 'warning', 'info'
  })

  const showNotification = (message, type = 'success') => {
    notification.value = {
      show: true,
      message,
      type
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      notification.value.show = false
    }, 5000)
  }

  const hideNotification = () => {
    notification.value.show = false
  }

  return {
    notification,
    showNotification,
    hideNotification
  }
}