const fs = require('fs')
// แก้ไขปัญหาการแสดง Buffer โดยใช้ backticks ในการแสดง
function getFile(file) {
    return new Promise( (resolve, reject) => {
        // if (file == 'f02.txt') reject('Error from f02')
        fs.readFile(file, (err, data) => {
            // data รับข้อมูลจาก file เป็น Buffer
            resolve(data)
        })
    })
}

// การใช้ IIFE ชื่อ function ไม่จำเป็น ดังนั้นจะเขียนเป็น arrow ก็ได้ เราแค่ใส่ () ครอบ async function แล้วใส่ operator () ต่อท้ายตาม
(async () => {
    try{
        // let data รับข้อมูลจาก data(parameter/ตัวแปร) ที่ resolve ส่งมา ซึ่งเป็น Buffer
        let data = await getFile('./start.txt');
        // เวลาจะแสดงข้อมูลเป็น String ต้องใช้ Backticks หรือคำสั่ง data.toString()
            console.log(`${data}`)
        data = await getFile(data);
            console.log(`${data}`)
        data = await getFile(data);
            console.log(`${data}`)
        data = await getFile(data);
            console.log(`${data}`)
    }catch (err) {
        console.log('Error: ' + err)
    }
}) ();



// แก้ปัญหาการส่งตัวแปร แล้วแสดงเป็น Buffer โดยการให้ resolve ส่งเป็น String ไปเลย โดยใช้ Backticks หรือคำสั่ง data.toString()
function getFile(file) {
    return new Promise( (resolve, reject) => {
        // if (file == 'f02.txt') reject('Error from f02')
        fs.readFile(file, (err, data) => {
            // resolve ส่งเป็น String ไป โดยใช้ Backticks
            resolve(`${data}`)
        })
    })
}

(async () => {
    try{
        // let data รับข้อมูลจากที่ resolve ส่งมา  ซึ่งส่งมาเป็น Backticks
        let data = await getFile('./start.txt');
        // ดังนั้น let data จะเก็บข้อมูลที่เป็น String อยู่แล้ว พอจะแสดงข้อมูลใส่แค่ชื่อตัวแปร data ก็พอ
            console.log(data)
        data = await getFile(data);
            console.log(data)
        data = await getFile(data);
            console.log(data)
        data = await getFile(data);
            console.log(data)
    }catch (err) {
        console.log('Error: ' + err)
    }
}) ();