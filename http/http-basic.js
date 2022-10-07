// การสร้างเว็บ server ท่าที่ใช้บ่อย
const http = require('http');
// const server = http.createServer()

// server.on('request', (req, res) => {
//     console.log('request coming...')
//     res.writeHead(200, {'Content-type': 'text/html'})
//     res.write('Hello World!!!')
//     res.end()
// })

// ใช้ .listen เพื่อกำหนด port/host ซึ่ง http ใช้ port ที่ 80 ที่เราใช้ 8080 เพื่อกันการชนกันของข้อมูล
// server.listen(8080)

// เขียนแบบย่อ
// รับ req, res แล้วทำตามคำสั่งในนี้ได้เลย โดยที่ถ้าส่งแค่ request(connect) เฉยๆ ไม่ต้องใส่ .on ก็ได้ คำสั่งใน callback จะทำงานโดยธรรมชาติ แต่ถ้าเป็น event อื่นจะต้องเช็คอีกที
http.createServer( (req, res) => {
    console.log('request coming...')
    res.writeHead(200, {'Content-type': 'text/html'})
    res.write('Hello World!!!')
    res.end()
} ).listen(8080) // ใช้ listen ของ TCP จาก net.server

// ให้ obj createServer (server ที่เราสร้าง) ฟัง port 8080 ว่า มีข้อมูลอะไรหรือใครติดต่อเข้ามา 