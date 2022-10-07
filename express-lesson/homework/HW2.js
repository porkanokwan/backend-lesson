const express = require('express')
const app = express();
  
app.post('/', (req, res) => {
    res.send('POST request to homepage')
})

app.put('/', (req, res) => {
    res.send('PUT request to homepage')
})

app.delete('/', (req, res) => {
  res.send("DELTE Request Called")
})

app.listen(3000, () => console.log('Server start...') )
  