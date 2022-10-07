const express = require('express')
const app = express()
const userRouter = require('./HW-userRoute(number)')

app.use('/user', userRouter)


app.listen(3000, () => console.log('Server start...'))