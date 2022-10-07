const express = require('express')
const app = express()
const fs = require('fs')

let data = JSON.parse( fs.readFileSync('./sample.json') )
let users = data.users

// กรอกชื่อใน form แล้วข้อมูลของคนนั้นขึ้นหลังกด submit
app.get('/search', (req, res) => {
    let runHTML = `
    <!DOCTYPE html>
    <html>
    <body>

    <form action="/dosearch" method='get'>
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname" >
        <input type="submit" value="Submit">
    </form> 

    </body>
    </html>
    `
    res.send(runHTML)
})

app.get('/dosearch', (req, res) => {
    // function include หมายถึง มีตัวหนังสือที่อยู่ใน firstName แบบที่ form ส่งมาให้มั้ย ไม่ต้องพิมพ์ชื่อเต็ม เช่น de มี denial กับ devid
    res.send(users.filter( item => item.firstName.includes(req.query.fname)))
})

app.listen(3000, () => console.log('Server start...'))