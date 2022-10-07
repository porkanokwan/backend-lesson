const express = require('express')
const router = express.Router()

let arr = [];

router.post('/:n', (req, res) => {
    console.log(req.params.n)
    arr.push(req.params.n)
    res.status(200).send(arr)
})

router.delete('/:n', (req, res) => {
    let deleteArr = arr.filter( x => x != req.params.n)
    res.status(200).send(deleteArr)
})

router.put('/:n/:p', (req, res) => {
    let updateArr = arr.findIndex( x => x === req.params.n )
    console.log(updateArr)
    arr[updateArr] = req.params.p
    res.status(200).send(arr)
})

module.exports = router