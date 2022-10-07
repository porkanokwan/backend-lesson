const fs = require("fs");
let data, jsobj, users, newData;

data = fs.readFileSync("./sample.json");
// console.log(data); // ได้ Buffer ออกมา
// console.log(`${data}`); // แก้ Buffer ให้เป็น String
jsobj = JSON.parse(data);
// console.log(jsobj);
// console.log(jsobj.users[0]);

// users จะเก็บ Array ที่มี obj อยู่ข้างใน
users = jsobj.users;
console.log(users);

//ต้องการเปลี่ยน phoneNumber ให้เป็นตาม userId เรียงกัน 7 ตัว
users.map((obj) => {
  // เปลี่ยนค่า phoneNumber
  obj.phoneNumber = obj.userId.toString().repeat(7);
  console.log(`${obj.firstName}: ${obj.phoneNumber}`);

  //ต้องการเปลี่ยนคนที่นามสกุล mac ให้เป็น apple
  if (obj.lastName === "mac") obj.lastName = "apple";
  console.log(`${obj.firstName}: ${obj.lastName}`);
});
// console.log(users)

//ต้องการเปลี่ยนคนที่นามสกุล mac ให้เป็น apple วิธีที่ 2
// users.filter( obj => {
//     if(obj.lastName === 'mac') obj.lastName = 'apple'
//     console.log(`${obj.firstName}: ${obj.lastName}`)
// })

// แปลง obj ที่เปลี่ยนแล้วให้กลับมาเป็น json แต่ต้องเรียกค่ามาให้ครบ ดังนั้น ต้องเรียก jsobj ที่ไม่เรียก users เพราะ users เก็บแค่ค่า array ข้างใน แต่ jsobj เก็บ obj users ด้วย
newData = JSON.stringify(jsobj);
fs.writeFileSync("./output.json", newData);
console.log(newData);
