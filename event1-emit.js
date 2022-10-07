// ต้องการแยก emit(ตัวส่ง event) กับ on(ตัวรับ/ตรวจสอบ event) ให้อยู่คนละไฟล์ ต้องสร้างเป็น Class ที่ extends จาก events
const EventEmitter = require('events')

// ต้องการให้เอาไปใช้ในไฟล์อื่นได้ต้องสร้าง Class โดยที่ใช้ extends เพื่อให้เป็น Class ลูกของ EventEmitter ดังนั้น Em1 สามารถใช้ method ของ EventEmitter ได้หมด
class Em1 extends EventEmitter{
        // ไม่ได้เก็บ property อะไร ตัด constructor ทิ้งได้
    emit1() {
        setInterval( () => this.emit('onesec', 11111), 1000 )
    }
    emit2() {
        setInterval( () => this.emit('twosec', 22222), 2000 )
    }
}

// ต้อง exports Class ไปให้ ไฟล์อื่นเอาไปใช้ได้
module.exports = Em1
