const fs = require('fs')

// const raw = fs.readFileSync('./billing.csv', 'utf-8')
// console.log(raw)
// const data  = raw.split(/\r?\n/);

// console.log('result', data);

fs.readFile('./billing.csv', 'utf-8', (err, data) => {
    console.log(data)
    // let arr = data.split(/\r?\n/);
    // console.log('result' + arr)
})