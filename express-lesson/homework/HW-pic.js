const express = require('express')
const app = express()

app.use('/', express.static('public') )

app.get('/picture.png', (req, res) => {
    res.redirect('./picture.jpg')
})

app.get('/user', (req, res) => {
    res.send('404 User not found')
})

app.get('*', (req, res) => {
    res.send('404 not found')
})

app.listen(3000, () => console.log('Server start...'))