// useNotification.js
import { ref } from 'vue'

export function useNotification() {
  const showMessage = ref(false)
  const message = ref('')
  const messageType = ref('success')

  const showNotification = (msg, type = 'success') => {
    message.value = msg
    messageType.value = type
    showMessage.value = true
    
    setTimeout(() => {
      showMessage.value = false
    }, 3000)
  }

  const hideNotification = () => {
    showMessage.value = false
  }

  return {
    showMessage,
    message,
    messageType,
    showNotification,
    hideNotification
  }
}