// import แบบ commonJS ถ้าจะ import แบบ ES6 ต้องใส่ type: module เข้าไปใน package.json
const fs = require('fs');
const axios = require('axios');
const uuid = require('uuid');
const { readFileJSON, writeFileJSON } = require('./fileService');
const CustomError = require('./customError')

// const data = readFileJSON('product.json').then(data => console.log(data)) // data จะรับข้อมูลที่ resolve ส่งมาซึ่งเป็น array [ { id: 1, name: 'cola' }, { id: 2, name: 'pepsi' } ]
// console.log(data) // promise obj จะได้ Promise { <pending> }

// const data = readFileJSON('product.json').then(data => {
//     data.push({ id: 3, name: 'fanta' });
//     writeFileJSON('product.json', data);
// })

const error = new CustomError('Invalid username', 400)
console.log(error)