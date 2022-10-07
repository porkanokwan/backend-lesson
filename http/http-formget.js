const http = require('http')
const fs = require('fs')
const url = require('url')

function renderForm(filename, req, res) {
    fs.readFile(filename, (err, data) => {
        res.writeHead(200, {'content-type' : 'text/html'})
        res.write(data)
        res.end()
    })
}

http.createServer( (req, res) => {
    // parse req.url ที่เป็นส่วนของตั้งแต่ pathname จนถึง hash  แล้วเอาไปเก็บไว้ใน p_url ในรูปแบบ Url Obj
    // การใส่ true จะเอาส่วนของ query ไปเก็บไว้ใน object ได้แบบนี้ {fname: 'John', lname: 'Doe'} ซึ่ง fname, lname มาจาก name ใน input ไม่ใช่ id 
    let p_url = url.parse(req.url, true)
    console.log(p_url)
    console.log(p_url.query)
    console.log(p_url.pathname)

    if(req.url === '/') {
        return renderForm('./formget.html', req, res)
    }

    if(p_url.pathname === '/getdata') {
        res.writeHead(200, {'content-type' : 'text/html; charset=utf8'})
        res.write('<h2>We got your data</h2>')
        res.write(`<p>First name(ชื่อ) : ${p_url.query.fname}</p>`)
        res.write(`<p>Last name(นามสกุล) : ${p_url.query.lname}</p>`)
        return res.end()
    }

    console.log(req.url)
    res.writeHead(404, {'content-type' : 'text/html'})
    res.write(req.url)
    res.end()
}).listen(8080, () => console.log('Server start...'))