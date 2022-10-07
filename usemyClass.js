// mc รับ function/class ที่อยู่ในไฟล์ myClass มาเก็บไว้
const mc = require('./myClass')
// const mu = require('./myUtil')

// พอจะเรียกใช้ class ต้องใช้คู่กับ new และ mc.ชื่อ Class 
const customer = new mc.Human('Andy')
// ที่ใช้ customer.info() ได้เลยโดยที่ไม่ต้องใช้ mc. เพราะว่า customer รับการสืบทอด prototype ของ class Human มาแล้ว ทำให้ใช้ function ใน class Human ได้เลย
customer.info()

// const customer1 = new mc.Human('Holmes', mu.getRd(20, 40) )
// customer1.info()

const employee = new mc.Human('Boby', 25)
employee.info()