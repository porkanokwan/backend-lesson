const fs = require('fs')

//สร้าง error ใช้ == เพราะไม่ดู type ดูแค่เนื้อหาตรงกัน เนื่องจาก readFile จะ return ค่าเป็น Buffer ถ้าใช้ === ไม่มีวันเท่า '' เว้นจะใช้ file.toString() === '' อันนี้ถึงจะได้
function getFile(file) {
    return new Promise( (resolve, reject) => {
        // if (file == 'f02.txt') reject('Error from f02')
        fs.readFile(file, (err, data) => {
            resolve(data)
        })
    })
}

getFile('./start.txt')
.then( (data) => {
    console.log(data.toString())
    return getFile(`${data}`) 
} )
.then( (data) => {
    console.log(data.toString())
    return getFile(`${data}`) 
} )
.then( (data) => {
    console.log(data.toString())
    return getFile(`${data}`) 
} )
.then( (data) => {
    console.log(data.toString())
    return getFile(`${data}`) 
} )
.catch( (err) => console.log('Error: ' + err))