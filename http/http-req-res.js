// ถ้ารับ request แบบต่างๆ แล้ว reaponse ในแบบที่ต่างกัน ต้องใช้ If
const http = require('http')

http.createServer( (req, res) => {
    res.writeHead(200, {
        'content-type' : 'text/html'
    })

// request เข้าเงื่อนไขจะทำตามคำสั่งใน if ซึ่งถ้าไม่ทำเป็น else ต้องใส่ return เพื่อให้เด้งออกจาก function ไม่ทำคำสั่งที่เหลือต่อ เพราะ ถ้าไม่ใส่ return มันจะไปทำคำสั่งข้างล่างต่อ ซึ่งในนี้เรา end ไปแแล้วมาเจอ write ข้างล่างใหม่จะ error
    if(req.url === '/home') {
        res.write('This is home page')
        return res.end()
    }

// ถ้า request ไม่เข้าเงื่อนไข จะมาทำคำสั่งตรงนี้เลย
    res.write('Welcom to Node.JS')
    res.end()
}).listen(8080, () => console.log('Server start...'))