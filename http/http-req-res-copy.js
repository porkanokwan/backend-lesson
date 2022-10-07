const { read } = require('fs')
const http = require('http')

// ต้องระวังเรื่องการใช้ writeHead() กับ setHeader() มาชนกัน เพราะ writeHead จะชนะ setHeader
// ถ้าใช้อะไรแล้วควรใช้อันเดิมไปจนจบ ไม่ควรใช้ writeHead ก่อน แล้วตามด้วยใช้ setHeader มันจะ error แต่ถ้าใช้ setHeader ก่อน แล้วตามด้วยใช้ writeHead จะไม่ error
http.createServer( (req, res) => {
    // เราจำกัดว่า เข้าได้แค่ 2 url คือ / กับ /user url อื่นไม่ให้เข้าถึง
    res.writeHead(200, {
        // เพิ่ม charset=utf8 เพื่อให้ใช้ภาษาอื่นได้
        'content-type' : 'text/html; charset=utf8'
    })

    // ใช้ setHeader() ต้องกำหนด statusCode ขึ้นมาเอง
    // res.statusCode = 200;
    // res.setHeader('content-type', 'text/html')

    // url '/' เป็น default หรือ root folder 
    if(req.url === '/') {
        res.write('<h2>This is Home page</h2>')
        for(let i = 1; i < 7 ; i++){
            res.write(`<h${i}>ยินดีต้อนรับเข้าสู่โฮมเพจ ครั้งที่ ${i}</h${i}>`)
        }
        return res.end()
    }
    // url ไม่สนใจตัวพิมพ์ใหญ่-เล็ก เอาแค่พิมพ์ถูก
    if(req.url === '/user') {
        res.write('<h2>This is user page</h2>')
        return res.end()
    }

    if(req.url === '/page1') {
        // response เป็น html ทั้งอันแบบนี้ก็ได้
        res.write(`
        <!DOCTYPE html>
        <html>
        <body style="background-color:tomato;">
            <h1>This is a heading</h1>
            <p>This is a paragraph.</p>

        </body>
        </html>
        `)
        return res.end()
    }

    function form(req, res) {
        res.write(`
        <!DOCTYPE html>
        <html>
        <body>
            <h2>Text input fields</h2>
            <form>
                <label for="fname">First name:</label><br>
                <input type="text" id="fname" name="fname" value="John"><br>
                <label for="lname">Last name:</label><br>
                <input type="text" id="lname" name="lname" value="Doe">
            </form>
            <p>Put your information</p>
        </body>
        </html>
        `)
        res.end()
    }

    if(req.url === '/form'){
        return form(req, res)
    }

    // ต้องสร้าง route ใหม่ สำหรับ url อื่น และตั้ง Status เป็น 404 คือไม่โอเค แล้วต้องกำหนด type ใหม่เพื่อให้ใช้ tag ได้ใน route นี้
    // เมื่อ request url อย่างอื่นมาที่ไม่ใช่ / กับ /url จะมาเข้า route นี้ แล้วส่งท้ายด้วยคำว่า Not Found
    res.writeHead(404, 'Not found in oue site', {
        'content-type' : 'text/html'
    })
    // res.statusCode = 404
    // res.statusMessage = 'Not found in our site'
    // res.setHeader('content-type', 'text/html')
    // res.write(res.statusMessage)
    res.end('<hr><h2>Not Found</h2><hr>')
}).listen(8080, () => console.log('Server start...'))