import { ref } from 'vue'

export function useClipboard() {
  const showToast = ref(false)

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    } catch (err) {
      console.error('Failed to copy text:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        showToast.value = true
        setTimeout(() => {
          showToast.value = false
        }, 3000)
      } catch (err) {
        console.error('Fallback copy failed:', err)
      }
      document.body.removeChild(textArea)
    }
  }

  return {
    showToast,
    copyToClipboard
  }
}