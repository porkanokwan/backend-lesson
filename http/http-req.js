// กระบวนการที่ browser ส่ง req มาให้ server แล้ว server เอาข้อมูลมาทำต่อได้
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    // แสดงข้อมูลที่ browser ส่งมา ซึ่งส่งมาในรูปแบบ Obj
    // req จะมี property/obj ต่างๆ ให้เราได้ใช้
    console.log(req)
    // console.log(req.headers)
    // console.log(req.headers.host)

    // สามารถใช้การ destructuring ได้ เพราะ req เป็น Obj 
    let {httpVersion, method, url} = req

    console.log(httpVersion)
    console.log(url) // จะเอาข้อมูลหลัง slash มา
    console.log(method) // จะเอาข้อมูลหลัง slash มา

    // urlเป็นตัวสำคัญที่จะบอกว่า เรียกใช้ path ไหนอยู่, method เป็นตัวบอกว่า เป็น GET, POST, PUT, DELETE จะไปทำงานกับ route ไหนของ server
})

server.listen(8080)