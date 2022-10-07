const express = require('express')
const app = express()
const fs = require('fs')

let data = JSON.parse( fs.readFileSync('./sample.json') )
// data จะเป็น OBJ ทีมี key เป็น users และ value เป็น Array
// console.log(data) 

// ต้องเอาข้อมูลใน Array มาใช้ users เป็น array
let users = data.users
// console.log(users)

let listCounter = 0;

// พอมี url ที่ส่ง /list มา app.use จะทำงานก่อน(เพราะ อยู่ข้างบน) พอทำงานเสร็จต้องมี next() เพื่อส่งให้ตัวถัดไปที่รับ url /list เหมือนกันไปทำงานต่อ
app.use('/list', (req, res, next) => {
    listCounter++
    console.log('Request /list ' + listCounter + ' times')
    next() // ตัวถัดไปที่ next() ส่งต่อให้จะเป็น middleware หรือ ตัวทำงานก็ได้ ถ้าไม่สั่ง next() คำสั่งใน app.use จะทำงานเรื่อยๆ แต่ตัวต่อไปจะไม่ได้ทำงานเพราะ ไม่มีตัวส่งต่อ
})

// ทำงานต่อจากที่ app.use ส่งมาให้
app.get('/list', (req, res) => {
    res.send(users)
})

// การใช้ query
app.get('/search', (req, res) => {
    res.send(users.find( item => item.firstName === req.query.firstName))
    // เวลาส่ง request ใน url ต้องพิมพ์ /search?firstName=devid เป็นต้น
})

// ถ้าต้องการเอา parameter มาใช้เรียก api ต้องใช้ : นำหน้าชื่อ parameter เวลาหาก็ใส่ /3/4 === หา parameter 2 ตัว
app.get('/users/:uid', (req, res) => {
    // ต้องเอา parameter id ตามข้างบนมาใช้ ต้องใช้ req.params.id (ชื่อ parameter ต้องเหมือนข้างบน)
    res.send(users[parseInt(req.params.uid) - 1]) // แปลงเป็น number แล้วเอาไปลบ 1 เพื่อให้ได้ข้อมูล id ตรงกับเลขใน url

    console.log(typeof req.params.uid) // จะแสดงเป็น String ตาม /:uid ใน url ว่าเป็นอะไร เช่น /users/2 ตัว req.params.uid จะเป็น string 2
})

// ต้องการให้หาด้วย firstname แล้วโชว์ข้อมูลคนที่หาออกมา
app.get('/username/:firstName', (req, res) => {
    res.send(users.find( item => item.firstName === req.params.firstName))
})

app.get('/listname', (req, res) => {
    let outHTML = '<ol>'
    users.forEach( item => {
        outHTML += `<li> ${item.firstName}  ${item.lastName} <b> phone: ${item.phoneNumber} </b> </li>`
    });
    outHTML += '</ol>'
    res.send(outHTML)
})


app.listen(3000, () => console.log('Server start....'))
