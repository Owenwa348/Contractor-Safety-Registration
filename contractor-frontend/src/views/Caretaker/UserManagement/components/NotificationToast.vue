<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-x-full"
    enter-to-class="transform opacity-100 translate-x-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100 translate-x-0"
    leave-to-class="transform opacity-0 translate-x-full"
  >
    <div 
      v-if="notification.show" 
      :class="[
        'fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out',
        getNotificationBorderClass(notification.type)
      ]"
    >
      <div class="flex items-start p-4">
        <div class="flex-shrink-0">
          <!-- Success Icon -->
          <svg v-if="notification.type === 'success'" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <!-- Error Icon -->
          <svg v-else-if="notification.type === 'error'" class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <!-- Warning Icon -->
          <svg v-else-if="notification.type === 'warning'" class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <!-- Info Icon -->
          <svg v-else class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="ml-3 w-0 flex-1">
          <p 
            :class="getNotificationTextClass(notification.type)" 
            style="white-space: pre-line"
          >
            {{ notification.message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button 
            @click="$emit('hide')" 
            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  notification: {
    type: Object,
    required: true,
    default: () => ({
      show: false,
      message: '',
      type: 'success'
    })
  }
})

const emit = defineEmits(['hide'])

const getNotificationBorderClass = (type) => {
  const classes = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500'
  }
  return classes[type] || 'border-blue-500'
}

const getNotificationTextClass = (type) => {
  const classes = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }
  return `text-sm font-medium ${classes[type] || 'text-blue-800'}`
}
</script>