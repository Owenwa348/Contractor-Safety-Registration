<template>
  <div class="mt-8 pt-6 border-t">
    <h3 class="text-xl font-bold text-gray-800 mb-4">เข้าสู่การสอบ</h3>
    
    <!-- Direct Link -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-600 mb-3">ลิงก์โดยตรง:</label>
      <div class="flex items-center gap-3">
        <input 
          type="text" 
          :value="examUrl" 
          readonly 
          class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
        >
        <button 
          @click="copyLink" 
          class="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          คัดลอก
        </button>
      </div>
    </div>

    <!-- QR Code -->
    <div class="flex gap-3">
      <button 
        @click="toggleQRCode" 
        class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        {{ showQRCode ? 'ซ่อน QR Code' : 'แสดง QR Code' }}
      </button>
    </div>
    <div>
      <router-link to="/assessment">
        <button>
          ประเมินชั่วคราว
        </button>
      </router-link>
    </div>

    <div v-if="showQRCode" class="mt-6 text-center">
      <div class="inline-block p-6 bg-white border-2 border-gray-200 rounded-xl shadow-lg">
        <div ref="qrcode" class="qr-code-container"></div>
        <p class="text-sm text-gray-500 mt-3 font-medium">สแกนเพื่อเข้าสู่การสอบ</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'

export default {
  name: 'ExamAccessLinks',
  props: {
    examUrl: {
      type: String,
      required: true
    },
    selectedTraining: {
      type: String,
      required: true
    }
  },
  emits: ['copy-link'],
  setup(props, { emit }) {
    const showQRCode = ref(false)
    const qrcode = ref(null)

    const copyLink = () => {
      emit('copy-link', props.examUrl)
    }

    const toggleQRCode = () => {
      showQRCode.value = !showQRCode.value
    }

    // QR Code generation function
    const generateQRCode = async () => {
      if (!qrcode.value || !props.examUrl) return
      
      try {
        // Show loading state
        qrcode.value.innerHTML = `
          <div class="flex flex-col items-center justify-center">
            <div class="qr-code-loading"></div>
            <div class="text-xs text-gray-400 mt-2">กำลังสร้าง QR Code...</div>
          </div>
        `
        
        // Use QRServer API
        const qrSize = 200
        const qrData = encodeURIComponent(props.examUrl)
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}&format=png&margin=10&bgcolor=ffffff&color=000000`
        
        // Create and display img element
        qrcode.value.innerHTML = `
          <div class="flex flex-col items-center">
            <img 
              src="${qrImageUrl}" 
              alt="QR Code สำหรับเข้าสู่การสอบ" 
              class="w-48 h-48 mx-auto rounded-lg border border-gray-200 shadow-sm"
              onload="this.style.opacity=1; this.parentElement.parentElement.querySelector('.loading-text')?.remove()"
              onerror="this.onerror=null; this.src='https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${qrData}&choe=UTF-8'; this.alt='QR Code (Fallback)'"
              style="opacity: 0; transition: opacity 0.5s ease;"
            />
            <div class="text-xs text-gray-400 mt-2 font-mono bg-gray-50 px-2 py-1 rounded">
              QR Code: ${props.selectedTraining}
            </div>
            <div class="loading-text text-xs text-gray-400 mt-1">กำลังโหลด...</div>
          </div>
        `
      } catch (error) {
        console.error('Error generating QR code:', error)
        // Show error state
        qrcode.value.innerHTML = `
          <div class="flex flex-col items-center justify-center">
            <div class="w-48 h-48 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-xs text-gray-500">ไม่สามารถสร้าง<br>QR Code ได้</div>
              </div>
            </div>
            <div class="text-xs text-gray-400 mt-2">กรุณาใช้ลิงก์ด้านบนแทน</div>
          </div>
        `
      }
    }

    // Watch for QR code generation
    watch([showQRCode, () => props.examUrl], () => {
      if (showQRCode.value && props.examUrl) {
        nextTick(() => {
          setTimeout(generateQRCode, 100)
        })
      }
    })

    return {
      showQRCode,
      qrcode,
      copyLink,
      toggleQRCode,
      generateQRCode
    }
  }
}
</script>

<style scoped>
/* QR Code Container */
.qr-code-container {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* QR Code Image Hover Effect */
.qr-code-container img {
  transition: all 0.3s ease;
}

.qr-code-container img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Loading Animation for QR Code */
.qr-code-loading {
  width: 200px;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .qr-code-container img {
    width: 160px;
    height: 160px;
  }
  
  .qr-code-loading {
    width: 160px;
    height: 160px;
  }
}
</style>