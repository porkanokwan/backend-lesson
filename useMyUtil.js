// การเขียน path ชื่อไฟล์ ต้องสะกดให้ถูกเขียนให้ตรง เราสามารถละ .js ได้ และ มันไม่สนตัวพิมพ์ใหญ่-เล็กขอแค่สะกดตรงกัน
const rd = require('./myutil')

// เรียกใช้ได้เหมือนตอนใช้ fs เลย
console.log(rd.getRd(0, 9))
console.log(rd.pi)
console.log(rd.circleArea(10))
console.log(rd.getRd())
console.log(rd.user)
console.log(rd.user.name)

// สามารถเปลี่ยนค่าใน obj user ได้
rd.user.name = 'Sherlock'
console.log(rd.user)