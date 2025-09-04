import { ref } from 'vue';

export function usePDFGeneration() {
  const pdfLoading = ref(false);

  // Data censoring functions
  const censorPhone = (phone) => {
    if (!phone || phone.length < 10) return phone;
    const first = phone.slice(0, 3);
    const last = phone.slice(-3);
    return `${first}****${last}`;
  };

  const censorIdCard = (idCard) => {
    if (!idCard || idCard.length < 13) return idCard;
    const first = idCard.slice(0, 3);
    const last = idCard.slice(-3);
    return `${first}*******${last}`;
  };

  // Helper functions
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];

  const formatThaiDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      const month = monthNames[start.getMonth()];
      const year = start.getFullYear() + 543;
      return `${start.getDate()} - ${end.getDate()} ${month} ${year}`;
    } else if (start.getFullYear() === end.getFullYear()) {
      const startMonth = monthNames[start.getMonth()];
      const endMonth = monthNames[end.getMonth()];
      const year = start.getFullYear() + 543;
      return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${year}`;
    } else {
      return `${formatThaiDate(startDate)} - ${formatThaiDate(endDate)}`;
    }
  };

  const getEventTimeRange = (event) => {
    if (!event) return '';
    if (event.isAllDay) return 'ทั้งวัน';
    
    if (event.startTime && event.endTime) {
      return `${event.startTime} - ${event.endTime} น.`;
    }
    
    return event.time ? `${event.time}:00 น.` : 'ไม่ระบุเวลา';
  };

  const getDisplayDateText = (event, selectedDate) => {
    if (selectedDate && event.isMultiDay) {
      return formatThaiDate(selectedDate);
    }
    return event.isMultiDay 
      ? formatDateRange(event.startDate, event.endDate)
      : formatThaiDate(event.startDate);
  };

  // Enhanced notification system
  const showNotification = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    const colors = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-black',
      info: 'bg-blue-500 text-white'
    };
    
    toast.className += ` ${colors[type] || colors.info}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  };

  // Load external libraries
  const loadJsPDF = () => {
    return new Promise((resolve, reject) => {
      if (window.jsPDF) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      
      script.onload = () => {
        setTimeout(() => {
          if (window.jspdf && window.jspdf.jsPDF) {
            window.jsPDF = window.jspdf.jsPDF;
            resolve();
          } else {
            reject(new Error('jsPDF not loaded correctly'));
          }
        }, 100);
      };
      
      script.onerror = () => reject(new Error('Failed to load jsPDF'));
      document.head.appendChild(script);
    });
  };

  const loadHTML2Canvas = () => {
    return new Promise((resolve, reject) => {
      if (window.html2canvas) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      
      script.onload = () => {
        setTimeout(() => {
          if (window.html2canvas) {
            resolve();
          } else {
            reject(new Error('html2canvas not loaded correctly'));
          }
        }, 100);
      };
      
      script.onerror = () => reject(new Error('Failed to load html2canvas'));
      document.head.appendChild(script);
    });
  };

  // Enhanced PDF generation methods
  const generateHTMLToPDF = async (event, selectedDate) => {
    console.log('Generating PDF using HTML-to-Canvas method for Thai support');
    showNotification('กำลังสร้าง PDF ด้วยเทคนิคพิเศษ...', 'info');
    
    try {
      await Promise.all([loadJsPDF(), loadHTML2Canvas()]);
      
      const container = document.createElement('div');
      let cssText = '';
      cssText += 'position: absolute;';
      cssText += 'top: -9999px;';
      cssText += 'left: -9999px;';
      cssText += 'width: 210mm;';
      cssText += 'height: auto;';
      cssText += 'background: white;';
      cssText += 'font-family: "Sarabun", "Kanit", "Prompt", "Mitr", sans-serif;';
      cssText += 'font-size: 16px;';
      cssText += 'line-height: 1.5;';
      cssText += 'color: #000;';
      cssText += 'padding: 20mm;';
      cssText += 'box-sizing: border-box;';
      container.style.cssText = cssText;
      
      let htmlContent = '';
      htmlContent += '<div style="text-align: center; margin-bottom: 25px;">';
      htmlContent += '<h1 style="font-size: 18px; margin: 0 0 8px 0; font-weight: bold;">รายชื่อผู้เข้าร่วมอบรม - รายละเอียด</h1>';
      htmlContent += '<h2 style="font-size: 16px; margin: 0 0 15px 0; color: #333;">' + event.title + '</h2>';
      htmlContent += '</div>';
      htmlContent += '<div style="margin-bottom: 15px; font-size: 16px;">';
      htmlContent += '<p><strong>วันที่อบรม:</strong> ' + getDisplayDateText(event, selectedDate) + '</p>';
      htmlContent += '<p><strong>เวลาอบรม:</strong> ' + getEventTimeRange(event) + '</p>';
      htmlContent += '<p><strong>จำนวนผู้เข้าอบรม:</strong> ' + event.participantCount + '/' + event.capacity + ' คน</p>';
      htmlContent += '</div>';
      htmlContent += '<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">';
      htmlContent += '<thead>';
      htmlContent += '<tr style="background-color: #f5f5f5;">';
      htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 8%;">ลำดับ</th>';
      htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold; width: 30%;">ชื่อ-นามสกุล</th>';
      htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 18%;">เบอร์โทรศัพท์</th>';
      htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 20%;">เลขบัตรประชาชน</th>';
      htmlContent += '<th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold; width: 24%;">ลายเซ็นผู้เข้าร่วม</th>';
      htmlContent += '</tr>';
      htmlContent += '</thead>';
      htmlContent += '<tbody>';
      
      if (event.participants) {
        event.participants.forEach((participant, index) => {
          const bgColor = index % 2 === 0 ? 'background-color: #fafafa;' : '';
          htmlContent += '<tr style="' + bgColor + '">';
          htmlContent += '<td style="border: 1px solid #ddd; padding: 8px; text-align: center;">' + (index + 1) + '</td>';
          htmlContent += '<td style="border: 1px solid #ddd; padding: 8px;">' + participant.name + '</td>';
          htmlContent += '<td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-family: monospace;">' + censorPhone(participant.phone) + '</td>';
          htmlContent += '<td style="border: 1px solid #ddd; padding: 8px; text-align: center; font-family: monospace;">' + censorIdCard(participant.idCard) + '</td>';
          htmlContent += '<td style="border: 1px solid #ddd; padding: 20px 8px; text-align: center; height: 50px;">';
          htmlContent += '<div style="border-bottom: 1px dotted #999; height: 30px; width: 100%;"></div>';
          htmlContent += '</td>';
          htmlContent += '</tr>';
        });
      }
      
      htmlContent += '</tbody>';
      htmlContent += '</table>';
      htmlContent += '<div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">';
      const currentDateTime = new Date();
      const thaiDateTime = currentDateTime.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Bangkok'
      });
      htmlContent += '<p>สร้างรายงานเมื่อ: ' + thaiDateTime + '</p>';
      htmlContent += '<p style="margin-top: 8px;">** ข้อมูลนี้มีข้อมูลส่วนบุคคล กรุณาเก็บรักษาอย่างปลอดภัย **</p>';
      htmlContent += '<p>** ห้ามเผยแพร่หรือนำไปใช้โดยไม่ได้รับอนุญาต **</p>';
      htmlContent += '</div>';
      
      container.innerHTML = htmlContent;
      document.body.appendChild(container);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const canvas = await window.html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: container.scrollHeight,
        logging: false
      });
      
      document.body.removeChild(container);
      
      const { jsPDF } = window;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const dateStr = new Date().toISOString().split('T')[0];
      let safeTitle = event.title.replace(/[\\/:*?"<>|]/g, '_').substring(0, 30);
      if (!/[a-zA-Z0-9]/.test(safeTitle)) {
        safeTitle = 'Training_Report';
      }
      
      const fileName = `รายชื่อผู้เข้าอบรม_${safeTitle}_${dateStr}.pdf`;
      
      try {
        pdf.save(fileName);
      } catch (e) {
        pdf.save(`Training_Participants_${safeTitle}_${dateStr}.pdf`);
      }
      
      return true;
      
    } catch (error) {
      console.error('HTML-to-PDF generation failed:', error);
      throw error;
    }
  };

  const generatePrintToPDF = async (event, selectedDate) => {
    console.log('Generating PDF using browser print functionality');
    showNotification('กำลังเปิดหน้าต่างพิมพ์...', 'info');
    
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    let htmlContent = '';
    htmlContent += '<!DOCTYPE html>';
    htmlContent += '<html>';
    htmlContent += '<head>';
    htmlContent += '<meta charset="UTF-8">';
    htmlContent += '<title>รายชื่อผู้เข้าร่วมอบรม</title>';
    htmlContent += '<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">';
    htmlContent += '<style>';
    htmlContent += '@page { size: A4; margin: 20mm; }';
    htmlContent += '* { margin: 0; padding: 0; box-sizing: border-box; }';
    htmlContent += 'body { font-family: \'Sarabun\', \'Kanit\', \'Prompt\', sans-serif; font-size: 14px; line-height: 1.5; color: #000; background: white; }';
    htmlContent += '.header { text-align: center; margin-bottom: 25px; }';
    htmlContent += '.header h1 { font-size: 18px; margin-bottom: 8px; font-weight: bold; }';
    htmlContent += '.header h2 { font-size: 16px; color: #333; margin-bottom: 15px; }';
    htmlContent += '.info { margin-bottom: 15px; font-size: 14px; }';
    htmlContent += '.info p { margin-bottom: 5px; }';
    htmlContent += 'table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }';
    htmlContent += 'th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }';
    htmlContent += 'th { background-color: #f5f5f5; font-weight: bold; text-align: center; }';
    htmlContent += 'tr:nth-child(even) { background-color: #fafafa; }';
    htmlContent += '.text-center { text-align: center; }';
    htmlContent += '.signature-cell { padding: 20px 8px !important; height: 50px; }';
    htmlContent += '.signature-line { border-bottom: 1px dotted #999; height: 30px; width: 100%; }';
    htmlContent += '.footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }';
    htmlContent += '.footer p { margin-bottom: 5px; }';
    htmlContent += '@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    htmlContent += '</style>';
    htmlContent += '</head>';
    htmlContent += '<body>';
    htmlContent += '<div class="header">';
    htmlContent += '<h1>รายชื่อผู้เข้าร่วมอบรม - รายละเอียด</h1>';
    htmlContent += '<h2>' + event.title + '</h2>';
    htmlContent += '</div>';
    htmlContent += '<div class="info">';
    htmlContent += '<p><strong>วันที่อบรม:</strong> ' + getDisplayDateText(event, selectedDate) + '</p>';
    htmlContent += '<p><strong>เวลาอบรม:</strong> ' + getEventTimeRange(event) + '</p>';
    htmlContent += '<p><strong>จำนวนผู้เข้าอบรม:</strong> ' + event.participantCount + '/' + event.capacity + ' คน</p>';
    htmlContent += '</div>';
    htmlContent += '<table>';
    htmlContent += '<thead>';
    htmlContent += '<tr>';
    htmlContent += '<th style="width: 8%;">ลำดับ</th>';
    htmlContent += '<th style="width: 30%;">ชื่อ-นามสกุล</th>';
    htmlContent += '<th style="width: 18%;">เบอร์โทรศัพท์</th>';
    htmlContent += '<th style="width: 20%;">เลขบัตรประชาชน</th>';
    htmlContent += '<th style="width: 24%;">ลายเซ็นผู้เข้าร่วม</th>';
    htmlContent += '</tr>';
    htmlContent += '</thead>';
    htmlContent += '<tbody>';
    
    if (event.participants) {
      event.participants.forEach((participant, index) => {
        htmlContent += '<tr>';
        htmlContent += '<td class="text-center">' + (index + 1) + '</td>';
        htmlContent += '<td>' + participant.name + '</td>';
        htmlContent += '<td class="text-center" style="font-family: monospace;">' + censorPhone(participant.phone) + '</td>';
        htmlContent += '<td class="text-center" style="font-family: monospace;">' + censorIdCard(participant.idCard) + '</td>';
        htmlContent += '<td class="signature-cell text-center">';
        htmlContent += '<div class="signature-line"></div>';
        htmlContent += '</td>';
        htmlContent += '</tr>';
      });
    }
    
    htmlContent += '</tbody>';
    htmlContent += '</table>';
    htmlContent += '<div class="footer">';
    const currentDateTime = new Date();
    const thaiDateTime = currentDateTime.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Bangkok'
    });
    htmlContent += '<p>สร้างรายงานเมื่อ: ' + thaiDateTime + '</p>';
    htmlContent += '<p>** ข้อมูลนี้มีข้อมูลส่วนบุคคล กรุณาเก็บรักษาอย่างปลอดภัย **</p>';
    htmlContent += '<p>** ห้ามเผยแพร่หรือนำไปใช้โดยไม่ได้รับอนุญาต **</p>';
    htmlContent += '</div>';
    htmlContent += '<script>';
    htmlContent += 'window.onload = function() {';
    htmlContent += '  setTimeout(function() {';
    htmlContent += '    window.print();';
    htmlContent += '  }, 1000);';
    htmlContent += '};';
    htmlContent += 'window.onafterprint = function() {';
    htmlContent += '  window.close();';
    htmlContent += '};';
    htmlContent += '<' + '/script>';
    htmlContent += '</body>';
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    return true;
  };

  // Fallback PDF generation with ASCII characters only
  const generateFallbackPDF = async (event, selectedDate) => {
    console.warn('Generating fallback PDF with ASCII characters only');
    showNotification('กำลังสร้าง PDF แบบสำรอง...', 'warning');
    
    await loadJsPDF();
    const { jsPDF } = window;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm', 
      format: 'a4'
    });
    
    pdf.setFont('helvetica', 'normal');
    
    // Header in English
    pdf.setFontSize(16);
    pdf.text('Training Participant List - Details', 105, 20, { align: 'center' });
    
    pdf.setFontSize(14);
    const safeTitle = event.title.replace(/[^\x00-\x7F]/g, '[Thai Text]');
    pdf.text(safeTitle || 'Training Session', 105, 30, { align: 'center' });
    
    // Event details in English
    pdf.setFontSize(11);
    let yPos = 45;
    
    pdf.text(`Training Date: ${getDisplayDateText(event, selectedDate)}`, 20, yPos);
    yPos += 8;
    
    pdf.text(`Training Time: ${getEventTimeRange(event)}`, 20, yPos);
    yPos += 8;
    
    pdf.text(`Participants: ${event.participantCount}/${event.capacity} people`, 20, yPos);
    yPos += 18;
    
    // Table header
    const headerY = yPos;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(15, headerY - 5, 180, 10, 'F');
    
    pdf.setFontSize(9);
    pdf.text('No.', 25, headerY, { align: 'center' });
    pdf.text('Name', 55, headerY, { align: 'center' });
    pdf.text('Phone', 95, headerY, { align: 'center' });
    pdf.text('ID Card', 130, headerY, { align: 'center' });
    pdf.text('Signature', 170, headerY, { align: 'center' });
    
    yPos = headerY + 15;
    
    // Participant data
    pdf.setFontSize(8);
    event.participants?.forEach((participant, index) => {
      if (yPos > 250) {
        pdf.addPage();
        yPos = 25;
      }
      
      pdf.text((index + 1).toString(), 25, yPos, { align: 'center' });
      
      const safeName = participant.name.replace(/[^\x00-\x7F]/g, '[Thai Name]') || `Participant ${index + 1}`;
      pdf.text(safeName.substring(0, 20), 35, yPos);
      
      pdf.text(censorPhone(participant.phone) || '-', 95, yPos, { align: 'center' });
      pdf.text(censorIdCard(participant.idCard) || '-', 130, yPos, { align: 'center' });
      
      // Draw signature line
      pdf.line(160, yPos + 2, 185, yPos + 2);
      
      yPos += 12;
    });
    
    // Footer
    const pageHeight = pdf.internal.pageSize.height;
    pdf.setFontSize(8);
    const currentDateTime = new Date();
    const dateTimeStr = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')} ${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:${String(currentDateTime.getSeconds()).padStart(2, '0')}`;
    pdf.text(`Generated: ${dateTimeStr}`, 20, pageHeight - 30);
    pdf.text('** CONFIDENTIAL: Personal Data - Handle with Care **', 105, pageHeight - 20, { align: 'center' });
    
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `Training_Participants_Report_${dateStr}.pdf`;
    pdf.save(fileName);
    
    return true;
  };

  const downloadParticipantListPDF = async (event, selectedDate) => {
    if (!event) return;
    
    pdfLoading.value = true;
    
    try {
      console.log('Attempting Method 1: HTML-to-Canvas PDF generation');
      await generateHTMLToPDF(event, selectedDate);
      
      showNotification('ดาวน์โหลด PDF สำเร็จ! (คุณภาพสูง)', 'success');
      pdfLoading.value = false;
      return;
    } catch (error) {
      console.warn('Method 1 (HTML-to-Canvas) failed:', error);
    }
    
    try {
      console.log('Attempting Method 2: Browser Print-to-PDF');
      await generatePrintToPDF(event, selectedDate);
      
      showNotification('เปิดหน้าต่างพิมพ์สำเร็จ! กรุณาเลือก "Save as PDF"', 'info');
      pdfLoading.value = false;
      return;
    } catch (error) {
      console.warn('Method 2 (Print-to-PDF) failed:', error);
    }
    
    try {
      console.log('Attempting Method 3: ASCII Fallback');
      await generateFallbackPDF(event, selectedDate);
      
      showNotification('ดาวน์โหลด PDF สำเร็จ (แบบสำรอง)', 'warning');
      pdfLoading.value = false;
      return;
      
    } catch (fallbackError) {
      console.error('All PDF generation methods failed:', fallbackError);
    }
    
    const errorMessage = 'ไม่สามารถสร้าง PDF ได้ กรุณาลองใช้บราวเซอร์อื่นหรือกดปุ่ม "Print" แล้วเลือก "Save as PDF"';
    showNotification(errorMessage, 'error');
    
    pdfLoading.value = false;
  };

  return {
    // Reactive data
    pdfLoading,
    
    // Helper functions
    censorPhone,
    censorIdCard,
    formatThaiDate,
    formatDateRange,
    getEventTimeRange,
    getDisplayDateText,
    
    // Main PDF generation function
    downloadParticipantListPDF,
    
    // Individual PDF generation methods
    generateHTMLToPDF,
    generatePrintToPDF,
    generateFallbackPDF,
    
    // Utility functions
    showNotification
  };
}