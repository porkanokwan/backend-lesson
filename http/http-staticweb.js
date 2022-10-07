const http = require('http')
const fs = require('fs')

function renderHTML(filename, req, res){
    fs.readFile(filename, (err, data) => {
        if(err) console.log(err)
        res.writeHead(200, {'content-type' : 'text/html'})
        res.write(data)
        res.end()
    })
}

http.createServer( (req, res) => {
    if(req.url === '/') {
        return renderHTML('./index.html', req, res)
    }

    if(req.url === '/form') {
        return renderHTML('./form.html', req, res)
    }
    
    res.writeHead(400, {'content-type' : 'text/html'})
    res.write('<h3>file not found...</h3>')
    res.end()
}).listen(8080, () => console.log('Server start...'))