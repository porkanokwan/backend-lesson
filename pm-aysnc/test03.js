const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    // if (err) throw err; //ถ้ามี error ให้เอา obj error ออกมา
    if (err) {
        console.log('Error!!!!!!');
        return;
    }
    console.log(data)
    console.log(data.toString()); //ถ้าไม่มี error ให้แสดง data
    console.log('in callback') 
})

console.log('Done')
console.log('Done!!!')
