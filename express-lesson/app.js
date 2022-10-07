const express = require('express')
const app = express()
const userRoute = require('./userRoute')

app.use('/user', userRoute )

// ให้ folder public เป็น static คือสามารถเข้าถึงไฟล์ที่อยู่ folder public ได้โดยการอ้างชื่อไฟล์ใน url เช่น http://localhost:3000/sample.json
// app.use(express.static('./public'))

// ถ้าจะเข้าถึงไฟล์ที่อยู่ folder public ต้องเข้าผ่าน /pub ก่อนแล้วตามด้วย /ชื่อไฟล์ วิธีนี้เป็นการตั้งชื่อเล่นการเรียกไฟล์ใน public
app.use('/pub', express.static('./public'))

// เมื่อ url request / เข้ามาให้ส่งไฟล์ form.html ออกไปโดยตรงเลย จะใช้คำสั่ง res.redirect() 
app.get('/', (req, res) => {
    res.redirect('/pub/form.html') // ใช้การเรียกแบบนี้ได้เพราะ เราตั้งชื่อเล่นการเรียกไฟล์ใน public แล้ว
    // ผลลัพธ์จะได้ หน้า form HTML นั้นมา แล้ว url จากก  http://localhost:3000/ จะกลายเป็น  http://localhost:3000/pub/form.html
})

// ผลลัพธ์จะได้ หน้า json นั้นมา แล้ว url จากก  http://localhost:3000/sample จะกลายเป็น  http://localhost:3000/pub/sample.json
app.get('/sample', (req, res) => {
    res.redirect('/pub/sample.json') // ใช้การเรียกแบบนี้ได้เพราะ เราตั้งชื่อเล่นการเรียกไฟล์ใน public แล้ว
})

app.listen(3000, () => console.log('Server start...'))