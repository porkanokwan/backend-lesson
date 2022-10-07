const express = require('express')
const router = express.Router()

// router.get('/add/:a/:b' , (req, res) => {
//     let a = parseInt(req.params.a)
//     let b = parseInt(req.params.b)    
//     console.log(a+b)
//     res.send( String(a + b) ) // ต้องส่งไปเป็น String
// })

// การสร้าง body จาก post method 
router.post('/add' , (req, res) => {
    let a = parseInt(req.body.a)
    let b = parseInt(req.body.b)    
    res.send( String(a + b) ) // ต้องส่งไปเป็น String
})

module.exports = router;