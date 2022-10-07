const http = require('http')
const fs = require('fs')
const formBody = require('body/form')

let postHTML = fs.readFileSync('./formpost.html')

http.createServer( (req, res) => {
    if(req.url === '/') {
        return res.end(postHTML)
    }

    formBody(req, res, (err, body) => {
        if(err) {
            res.statusCode = 500
            return res.end('Have error with your body...')
        }
        console.log(body) // {fname: 'John', lname: 'Doe'}
        console.log(res)
        res.writeHead(200, {'content-type' : 'text/html'})
        res.write(`<p>First name(ชื่อ): ${body.fname}</p>`)
        res.write(`<p>Last name(ชื่อ): ${body.lname}</p> <hr>`)
        res.end(postHTML)
    })
} ).listen(8080, () => console.log('Server start...'))