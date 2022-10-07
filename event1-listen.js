// import Class Em1 เข้ามา เก็บไว้ใน const Em1 (const Em1 จะเป็น Class)
const Em1 = require('./event1-emit')

// ตอนนี้ const Em1 เป็นแค่ Class เราต้องสร้าง instance ของ Class Em1 เพื่อให้เอา Class ไปทำงานต่อได้
const em1 = new Em1();

// em1 เป็น instance ที่สืบทอด prototype ของ Class Em1 มา ทำให้ใช้ method emit กับ on และ method ที่อยู่ใน Class Em1 ได้
em1.emit1()

em1.on('onesec', (e) => {
    console.log(e)
})