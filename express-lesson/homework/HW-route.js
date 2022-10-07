const express = require('express')
const app = express()
const useRouter = require('./Lab-userRoute')

app.use('/dog', useRouter )

app.use('/cat', useRouter )


app.listen(3000, () => console.log('Server start...'))