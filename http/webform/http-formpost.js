const http = require('http');
const fs = require('fs')

const postHTML = fs.readFileSync('./formpost.html')
let bodyObj = {}

http.createServer((req, res) => {
// ตัวแปร body เอาไว้รับ data ที่มาทาง Body เวลาส่ง http
  let body = "";

  // ถ้ามี request data มาทาง body เราสามารถ check เหตุการณ์ data ได้ 
  // ถ้ามีเหตุการณ์ที่ชื่อ data เข้ามา(ซึ่ง data จะเข้ามาเมื่อมี body เข้ามา) ให้ data แต่ละตัวจะไปเก็บใน chunk 
  req.on('data', function (chunk) {
      // เอา data ที่เก็บไว้ใน chunk มาต่อกันเก็บไว้เรื่อยๆ ในตัวแปร body จนครบ body จะเก็บข้อมูลเป็น String
    body += chunk;
  });

// นอกจาก data ที่มาต่อกันใน body จะมีการส่ง request(event) ที่ชื่อว่า end ทันที เมื่อ body ต่อข้อมูลเสร็จ
// คำสั่งใน callback จะ run ทันทีหลังเกิด event end 
  req.on('end', function () {
    console.log('POSTed: ' + body);

    // วิธีการแปลงภาษาที่ไม่ใช่ภาษาอังกฤษ ให้เป็น unicode/utf8 อัตโนมัติ จะทำให้ใช้ภาษาอื่นได้เป็นปกติ
    body = decodeURI(body);
    body = body.split('&')
    console.log(body)

    for (let i = 0; i < body.length; i++) {
      let _data = body[i].split('=');
      console.log(_data)
      bodyObj[_data[0]] = _data[1]  // {fname : 'John', lname : 'Doe'}
    }
    console.log(bodyObj)

    res.writeHead(200);
    res.write(`<p> First name: ${bodyObj.fname} </p> `)
    res.write(`<p> Last name: ${bodyObj.lname} </p> <hr>`)
    res.end(postHTML);
  });
}).listen(8080, () => console.log('Server start...'));