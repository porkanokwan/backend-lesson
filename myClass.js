// การใช้ Class จะเขียนคนละแบบกับ function

// เราสามารถ require function จากไฟล์อื่นมาใช้ใน class ได้ จะหมายความว่า ไฟล์ myClass มี dependencies กับ myUtil ถ้า myUtil มีปัญหาเกิดขึ้น myClass จะเกิดปัญหาแบบเดียวกัน
const mu = require('./myUtil')

class Human {
    constructor(name, age = mu.getRd(20, 30)){
        this.name = name;
        this.age = age
    }
    info() {console.log(this.name, this.age)}
}

// class Human {
//     constructor(name, age = 30){
//         this.name = name;
//         this.age = age
//     }
//     info() {console.log(this.name, this.age)}
// }

module.exports.Human = Human