let done = true

// creater part
const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = 'Here is the thing I built'
    resolve(workDone)
  } else {
    const why = 'Still working on something else'
    reject(why)
  }
})

//user part
const checkIfItsDone = () => {
    isItDoneYet
        .then(ok => console.log(ok))  // ถ้า resolve ส่ง parametr มาตัวเดียว .then รับ parameter แค่ตัวเดียว ร่วมกับส่งเข้ามาตรงๆ แบบ console.log parameter ตัวนั้นอีก สามารถเขียนย่อได้แบบบรรทัดล่าง
        .then(console.log) // โปรแกรมจะรู้ว่าต้องเอาตัวแปรจาก resolve มาทำ
        
        // .catch( err => {
        //     console.log('come from reject state in Promise')
        //     console.log(err)
        // })
}

checkIfItsDone(); // Here is the thing I built