const http = require('http');

function app(req, res) {
    console.log('request coming...')
    res.writeHead(200, {'Content-type': 'text/html'})
    res.write('Hello World!!!')
    res.end()
}

// สามารถใส่ function มีชื่อแทนลงใน callback function ได้ แต่ต้องใส่แต่ชื่อ ไม่ต้องใช้การ invoke เรียก
http.createServer( app ).listen(8080)
