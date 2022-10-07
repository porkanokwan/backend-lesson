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

async function runFile() {
    // try {
    // ตัวแปร d0 จะรับ ค่าที่ data เก็บไว้จากไฟล์ start.txt คือ f01.txt ที่ resolve ส่งมา 
    // const d0 = await getFile('./start.txt')
    // console.log(d0.toString())

    // อ่านชื่อไฟล์ f01.txt ที่เก็บไว้ในตัวแปร d0 และสร้างตัวแปร d1 จะรับ ค่าที่ data เก็บไว้จากไฟล์ f01.txt คือ f02.txt ที่ resolve ส่งมา 
    // const d1 = await getFile(d0)
    // console.log(d1.toString())

    // อ่านชื่อไฟล์ f02.txt ที่เก็บไว้ในตัวแปร d1 และสร้างตัวแปร d2 จะรับ ค่าที่ data เก็บไว้จากไฟล์ f02.txt คือ f03.txt ที่ resolve ส่งมา 
    // const d2 = await getFile(d1)
    // console.log(d2.toString())

    // อ่านชื่อไฟล์ f03.txt ที่เก็บไว้ในตัวแปร d2 และสร้างตัวแปร d3 จะรับ ค่าที่ data เก็บไว้จากไฟล์ f03.txt คือ End of read at f03.txt ที่ resolve ส่งมา 
    // const d3 = await getFile(d2)
    // console.log(d3.toString())
    // } catch (err) {
    //     console.log('Error: ' + err)
    // }

    // ใช้ตัวแปรตัวเดียวรับเปลี่ยนข้อมูลก็ได้ แต่ต้องใช้ let แทนเพื่อให้เปลี่ยนข้อมูลได้ + ไม่ต้องประกาศ let ซ้ำไม่งั้นจะเป็นการตั้งตัวแปรซ้ำ
    try{
        let data = await getFile('./start.txt');
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
}

runFile();