export async function sendPasswordResetNotification(email, userName) {
  try {
    // Create the password setup link (similar to SecurityDepartment approach)
    const resetUrl = `${window.location.origin}/setpasswordownerandsafety?email=${encodeURIComponent(email)}`
    
    // Method 1: Try EmailJS (replace with your actual service details)
    const serviceId = 'YOUR_SERVICE_ID' // Replace with your EmailJS service ID
    const templateId = 'password_reset_notification_template' // Replace with your template ID
    const publicKey = 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    
    const templateParams = {
      to_email: email,
      to_name: userName,
      reset_url: resetUrl,
      reset_date: new Date().toLocaleDateString('th-TH'),
      system_name: 'ระบบลงทะเบียนผู้รับเหมาความปลอดภัย'
    }
    
    // Try EmailJS first (if available)
    if (typeof emailjs !== 'undefined') {
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('Password reset notification sent via EmailJS')
      return
    }
    
    // Method 2: Try backend API
    const response = await fetch('/api/send-password-reset-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        userName,
        resetUrl,
        resetDate: new Date().toISOString()
      })
    })
    
    if (response.ok) {
      console.log('Password reset notification sent via backend API')
      return
    }
    
    throw new Error('Backend API not available')
    
  } catch (error) {
    console.warn('Email service not available, using mailto fallback:', error)
    
    // Method 3: Mailto fallback
    const subject = 'แจ้งการรีเซ็ตรหัสผ่าน - ระบบลงทะเบียนผู้รับเหมา'
    const resetUrl = `${window.location.origin}/setpasswordownerandsafety?email=${encodeURIComponent(email)}`
    const body = `เรียน คุณ${userName}\n\nทางเราได้ทำการรีเซ็ตรหัสผ่านของท่านเรียบร้อยแล้ว\n\nกรุณาคลิกลิงค์ด้านล่างเพื่อตั้งรหัสผ่านใหม่:\n${resetUrl}\n\nหากท่านไม่ได้ทำการรีเซ็ตรหัสผ่าน กรุณาติดต่อทีมบริหารระบบ\n\nขอบคุณครับ\nทีมบริหารระบบ`
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
  }
}

export function usePasswordReset() {
  const resetPasswordDirect = async (user, showNotification) => {
    const userName = user.name && user.name.trim() ? user.name : user.email
    
    try {
      // Update user password status - reset to "never logged in" state
      Object.assign(user, {
        passwordReset: true,
        mustChangePassword: true,
        passwordResetDate: new Date(),
        // Reset to "never logged in" state
        lastLogin: null,
        status: 'active' // Ensure user is active but needs password setup
      })
      
      // Send notification email (not password generation)
      await sendPasswordResetNotification(user.email, userName)
      
      // Show success notification
      showNotification(`รีเซ็ตรหัสผ่านของ ${userName} สำเร็จ\nสถานะถูกรีเซ็ตเป็นยังไม่เคยล็อกอิน\nส่งอีเมลแจ้งเตือนไปที่ ${user.email} เรียบร้อยแล้ว\nกรุณาตรวจสอบอีเมลเพื่อตั้งรหัสผ่านใหม่`, 'success')
      
    } catch (error) {
      console.error('Password reset error:', error)
      showNotification(`เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่านของ ${userName}`, 'error')
    }
  }

  return {
    resetPasswordDirect,
    sendPasswordResetNotification
  }
}