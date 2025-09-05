# Login Test Instructions

## การทดสอบการเข้าสู่ระบบ (Login Testing)

### 1. เข้าสู่ระบบคู่ธุรกิจ (Contractor Login)
- URL: `/` (หน้าแรก)
- ข้อมูลทดสอบ:
  - เลขประจำตัวผู้เสียภาษี: `1234567891234`
  - Username: `User`
  - รหัสผ่าน: `123456`

### 2. เข้าสู่ระบบบุคลากรภายใน (Internal Staff Login)
- URL: `/loginownerandsafety`
- ข้อมูลทดสอบ:
  - อีเมลที่มีรหัสผ่าน:
    - `safety01@gmail.com` - รหัสผ่าน: `123456`
    - `safety02@gmail.com` - รหัสผ่าน: `123456`
  - อีเมลที่ยังไม่ตั้งรหัสผ่าน:
    - `safety03@gmail.com`
    - `safety04@gmail.com`

## การแก้ไขปัญหาที่ดำเนินการ

### 1. ปัญหาการจัดเก็บข้อมูล Authentication
- ✅ แก้ไขการใช้ localStorage แทน in-memory storage
- ✅ เพิ่มการจัดเก็บ userType และ userData

### 2. ปัญหา Router Guard
- ✅ ปรับปรุง router guard ให้รองรับ role-based access
- ✅ เพิ่มการตรวจสอบสิทธิ์ตาม user type
- ✅ เพิ่มการ redirect ไป dashboard ที่เหมาะสม

### 3. ปัญหาการจัดการ Authentication State
- ✅ สร้าง composable `useAuth` สำหรับจัดการ authentication
- ✅ อัพเดต Navbar ให้แสดงข้อมูลผู้ใช้ที่ถูกต้อง
- ✅ เพิ่มฟังก์ชัน logout ที่สมบูรณ์

### 4. การปรับปรุง UI/UX
- ✅ แสดงข้อมูลผู้ใช้ที่เข้าสู่ระบบใน Navbar
- ✅ เพิ่มปุ่ม logout ที่ทำงานได้
- ✅ ปรับปรุงการแสดงผลตาม user type

## วิธีทดสอบ

1. เปิดเทอร์มินัล และรันคำสั่ง:
   ```bash
   npm run dev
   ```

2. เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

3. ทดสอบการเข้าสู่ระบบด้วยข้อมูลที่ให้ไว้ข้างต้น

4. ตรวจสอบว่า:
   - เข้าสู่ระบบได้สำเร็จ
   - ถูก redirect ไปหน้าที่เหมาะสม
   - แสดงข้อมูลผู้ใช้ใน Navbar
   - สามารถ logout ได้

## หมายเหตุ

- ระบบใช้ mock data สำหรับการทดสอบ
- ในการใช้งานจริงควรเชื่อมต่อกับ API backend
- การจัดเก็บรหัสผ่านควรเข้ารหัสในการใช้งานจริง