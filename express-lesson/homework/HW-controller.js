const express = require('express')
const useRouter = require('./HW-useRouter-controller')
const app = express()

app.get('/static', (req, res) => {
    res.send("Hello world")
})

app.get('/staticJSON', (req, res) => {
    res.send({'text' : 'Hello world'})
})

app.get('/echo', (req, res) => {
    res.send(req.query.text)
})

app.get('/plus', (req, res) => {
    let a = parseInt(req.query.a);
    let b = parseInt(req.query.b);
    res.send(String(a + b))
})

app.get('/plusByJSON', (req, res) => {
    let obj = JSON.parse(req.query.jsonText);
    console.log(obj)
    res.send(String(obj.a + obj.b))
})

app.get('/plus/:f/:s', (req, res) => {
    let f = parseInt(req.params.f)
    let s = parseInt(req.params.s)
    console.log( f +s )
    res.send(String( f + s))
})

app.get('/checkEvenNumber/:n', (req, res) => {
    if(req.params.n % 2 !== 0) {
        res.status(400).send('Bad request')
    } else {
        res.status(200).end('OK')
    }
})



app.use(express.urlencoded({extended: true}))
app.use('/number', useRouter)

app.post('/countField', (req, res) => {
    let arr = [
        {"a": 1, "b": 2, "c": 3}, 
        {"a": 1, "b": 2, "c": 3, "d": 5}
    ]
    console.log(arr[0]) // {a: 1, b: 2, c: 3} เป็น Object
    let newArr = [];
    for(let i in arr[0]) {
        newArr.push(i)
    }
    let newArr1 = [];
    for(let i in arr[1]) {
        newArr1.push(i)
    }
    res.status(200).send(`BODY ${JSON.stringify(arr[0])} -> ${newArr.length} \n
    BODY ${JSON.stringify(arr[1])} -> ${newArr1.length}
    `)
})
app.listen(3000, () => console.log('Server start...'))