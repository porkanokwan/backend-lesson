const fs = require('fs')

//เรียงสลับกันไปมาขึ้นอยู่กับ OS
// for(let i = 0; i < 20; i++) {
//     fs.readFile('./codecamp.txt', 'utf8', (err, data) => {
//         console.log(data);
//     })

//     fs.readFile('./codecamp1.txt', 'utf8', (err, data) => {
//         console.log(data);
//     })
// }

//เรียงเอา 0 ขึ้นให้หมดก่อนแล้วตามด้วย 1
// for(let i = 0; i < 20; i++) {
//     fs.readFile('./codecamp.txt', 'utf8', (err, data) => {
//         console.log(data);
//         fs.readFile('./codecamp1.txt', 'utf8', (err, data) => {
//             console.log(data);
//         })
//     })
// }

// เรียง 0 20 รอบ เรียง 1 1 รอบ
// for(let i = 0; i < 20; i++) {
//     fs.readFile('./codecamp.txt', 'utf8', (err, data) => {
//         console.log(data);
//     })
// }

// fs.readFile('./codecamp1.txt', 'utf8', (err, data) => {
//     console.log(data);
// })

// แทรก console.log ลงใน for loop จะได้ CC11 มา 20อันก่อน เพราะเสร็จไวกว่าอ่านไฟล์ 
// for(let i = 0; i < 20; i++) {
//     fs.readFile('./codecamp.txt', 'utf8', (err, data) => {
//         console.log(data);
//     })

//     console.log('CC11')
// }
// การอ่านไฟล์อันนี้เสร็จเมื่อไหร่จะขึ้นไปแทรกการอ่านไฟล์อันบน 
// fs.readFile('./codecamp1.txt', 'utf8', (err, data) => {
//     console.log(data);
// })

//
// for(let i = 0; i < 20; i++) {
//     fs.readFile('./codecamp.txt', 'utf8', (err, data) => {
//         console.log(data);
//     })

//     console.log('CC11')
// }
// การอ่านไฟล์อันนี้เสร็จเมื่อไหร่จะขึ้นไปแทรกการอ่านไฟล์อันบน 
// fs.readFile('./codecamp1.txt', 'utf8', (err, data) => {
//     console.log(data);
// })
// ทำเสร็จก่อนแทรกไปได้เลย แต่ไม่มีทางอยู่ก่อน CC11 เพราะ CC11 ส่ง request ไปก่อน
// console.log('Hello')

// ให้อ่านไฟล์ 1 แล้วอ่านไฟล์ 2 สลับกันไป
for(let i = 0; i < 20; i++) {
    const data = fs.readFileSync('./codecamp.txt')
        console.log(data.toString());
    

    const data1 = fs.readFileSync('./codecamp1.txt')
        console.log(data1.toString());
}