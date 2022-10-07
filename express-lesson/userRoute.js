const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('No User')
})

router.get('/first', (req, res) => {
    res.send('First on user')
})

router.get('/second', (req, res) => {
    res.send('Second on user')
})

module.exports = router