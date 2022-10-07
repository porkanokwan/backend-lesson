let pi = 3.14
let user = {name: 'John', age: '28'}

// เราสามารถกำหนดค่า default ของ parameter ได้ ถ้าเวลาเรียกใช้ function แล้วไม่ได้ใส่ค่า parameter มา จะ run parameter ตามค่า default ที่กำหนด แต่ถ้าใส่ค่า parameter มามันจะ run ตามค่าที่เราใส่
function getRandom(min = 10, max = 20) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// เอา export มาใส่ตรงนี้เลยได้ ชื่อใน function จะจำเป็นเมื่อในไฟล์นี้จะเอา function นี้ไปใช้ต่อ แต่จะไม่จำเป็นในกรณีที่ไฟล์อี่นเรียกใช้ เพราะมีชื่อไว้ให้เรียกใช้แล้ว แปลงเป็น arrow function ได้เลย
module.exports.circleArea = function circleArea(r) {
    return pi * r**2
}

// ไม่ต้องใส่ operator () เวลาเรียก function
module.exports.getRd = getRandom
module.exports.pi = pi
// module.exports.circleArea = circleArea

// ย่อ module ใช้แค่ exports.ชื่อ อย่างเดียวก็ได้
exports.user = user