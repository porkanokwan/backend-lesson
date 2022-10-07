const express = require('express')
const router = express.Router()

router.get('/walk', (req, res) => {
    res.send('Dog walk')
})
router.get('/play', (req, res)  => {
    res.send('Dog play')
})

router.get('/eat', (req, res)  => {
    res.send('Cat eat')
})

router.get('/sleep', (req, res)  => {
    res.send('Cat sleep')
})

module.exports = router