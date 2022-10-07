const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./sample.json'))
let users = data.users

// ใช้ express.urlencoded เพราะ เวลา post ส่งข้อมูล form ที่กรอกมาให้จะเป็น url อยู่แล้ว
app.use(bodyParser.urlencoded({ extended: true })) 
app.use('/pub', express.static('./public'))

app.get('/', (req, res) => {
    res.redirect('/pub/formpost.html')
})

// เมื่อใช้ post ต้องมี body ซึ่งใน express มีคำสั่ง req.body ให้ใช้ ซึ่ง req.body เอาไว้ใช้กับสิ่งที่ HTTP post ส่งมาให้
app.post('/dosearch', (req, res) => {
// การใช้ req.body คือ ต้องตามด้วย .ชื่อ name จากใน form ในที่นี้คือ .fname ซึ่งจะเป็นตัวแทนของ value ที่เราพิมพ์ไป
    res.send(users.filter( x => x.firstName.includes(req.body.fname)))
    console.log(req.body) // { fname: 'value ที่เราพิมพ์'}
}) 


app.listen(3000, () => console.log('Server start....'))
