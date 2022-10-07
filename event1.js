const EventEmitter = require('events');
const em1 = new EventEmitter()
const em2 = new EventEmitter()

// ถ้าเราต้องการส่ง parameter ไปพร้อมกับ event แนะนำให้ส่งเป็นแบบ Object (จริงๆ จะส่งแบบไม่ใช่ Object ก็ได้)
// setInterval( () => em1.emit('onesec', {id: 1, txt: 'Onesec Event'}), 1000 )
// setInterval( () => em1.emit('twosec', 'Hi, everyone'), 2000 )
setInterval( () => em1.emit('threesec'), 3000 )

// parameter e ใน callback จะรับข้อมูลของ parameter ที่ส่งมาพร้อมกับ event onesec ซึ่งอันนี้ที่ส่งมาเป็น Obj 
em1.on('onesec', (e) => {
    console.log(`${e.id} = ${e.txt}`)
})

// e รับ parameter ที่ event twosec ส่งมา
em1.on('twosec', (e) => {
    console.log(e)
})

// event ไม่ได้ส่ง parameter มาด้วย
em1.on('threesec', () => {
    console.log('Third event')
})

// ไม่สามารถเอา instance อันอื่นมารับ event แทนได้ ถ้า instance ตัวไหนส่ง instance ตัวนั้นต้องมารับ 
em2.on('threesec', () => {
    console.log('From em2') //ไม่แสดงออกมา เพราะ em2 ไม่ใช่ instance ที่ส่ง event นี้
})

