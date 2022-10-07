// การ response request ที่เข้ามา
const http = require('http')

// callback ใน createServer เป็นเหมือน server.on ที่รับ request event ทุกประการ ดังนั้น ถ้าเกิด request = เกิด event ขึ้น มันจะมาเข้า callback ทันทีเพื่อเช็ค event ว่าเราจะ response นี้ยังไง
http.createServer( (req, res) => {
    res.writeHead(200, {
        'Content-type' : 'text/html',
        'Codecamp' : '11'})
    res.write('This is response from server </br>')
    res.write('to browser')
    res.end('<H2>Good Bye</H2>');
    // ใส่ tag เข้าไปได้เพราะ type เป็น text/html 
}).listen(8080, () => {console.log('Server start...')}) // แสดงให้รู้ว่า server มัน run แล้ว