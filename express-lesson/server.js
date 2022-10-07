const express = require('express')
// app เป็น instance ของ constructor express โดยที่จะเกิดการสร้าง object express เก็บไว้ในตัวแปร app ดังนั้น เราสามารถนำ app ไปใช้กับ method อื่นๆ ของ express ได้
const app = express()

app.get('/', (req, res) => {
    // ใช้ .send จะได้ไม่ต้องส่ง .end
    res.send('Hello from Express')
})

app.get('/user', (req, res) => {
    res.send('User page by Express')
})

// พอเรา search url อื่นที่ไม่มีในนี้ มันจะขึ้น Cannot get ให้เลย ดังนั้นการใช้ express จะช่วยอำนวยความสพดวกให้ได้มากกว่า
app.listen(3000, () => console.log('Server start by Express...'))

//--------------------------------------------//

const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    if(req.url === '/'){
        return res.end('Hello from HTTP')
    }
    if(req.url === '/user'){
        return res.end('User page by HTTP')
    }
})

// พอเรา search url อื่นที่ไม่มีในนี้ มันจะหมุนค้าง
server.listen(8080, () => console.log('Server start by HTTP....'))