// const express จะเป็นทั้ง obj และ function ได้ 
const express = require('express');

// ประกาศเรียกใช้งาน function express จะ return ค่ามาเก็บใน app ทำให้ app เป็น application obj ตัวนึง ที่ทำหน้าที่เป็น server
const app = express();

// app.use( (req, res) => {
//     console.log('Request coming');
//     // ส่ง response กลับไปที่ browser
//     res.send('<h1>Response from express server </h1>');
// })

// app.use จะจัดการกับทุก request คือจะรับทุก path และทุก method ถ้าจะตั้งเฉพาะให้สั่ง app.METHOD แบบนี้
// app.get('/abc', (req, res) => {
//     console.log(req.method)
//     console.log(req.headers) // obj ที่มี key เป็นตัวแปร และvalue
//     console.log(req.headers['connection']);
//     console.log(req.query) // { name: 'john', age: '20', birth: '19-05-1999' } มันจะทำการเอา query string ที่ url ส่งมา เอามาเก็บใน req obj ให้เราผ่าน key ที่ชื่อ query
    // ถ้ามีการส่ง req มาที่ path: /abc ผ่าน get method ให้ทำงานที่ callback function นี้ ที่ส่ง response กลับไปเป็น
    // res.send('Response from method GET, path: /abc');
    // res.json({ message: "JSON response", status: true });
    // res.redirect('http://google.com');
// });

// app.delete('/def', (req, res) => {
    // ถ้าเราไม่กำหนด status ค่า default เมื่อมันทำงานเสร็จจะเป็น 200 อัตโนมัติ ดังนั้น ถ้าจะกำหนดเองต้องกำหนดให้ตรงกับความหมาย
    // res.status(201).send('Delete method, path: /def')
// });

// ถ้าเราส่ง request เข้ามาแล้ว Method/path ไม่ตรงทั้งคู่ หรืออย่างใดอย่างนึงไม่ตรงตามที่กำหนดไว้มันจะ response เป็น 404 not found ให้เลย เพราะ server นี้ไม่รู้จักการจัดการอันนั้น

// http://localhost:8000/?name=john
// app.get('/', (req, res) => {
//     const query = req.query;
//     console.log(query.name) // john
// })

// http://localhost:8000/8/apple  => { productid: '8', shopid: 'apple' }
// app.get('/:productid/:shopid', (req, res) => {
//     const params = req.params;
//     console.log(params);
// })

// Middleware จะจัดลำดับตามตำแหน่งที่เราประกาศ ตัวอยู่บนสุดเป็นตัวแรก ที่เหลือเป็นตัวถัดๆ ไป
function mid1(req, res, next){
    // middleware ตัวแรกจะมีหน้าที่ในการไปสืบค้นข้อมูล query DB ใน database มาเก็บไว้ใน request obj เพื่อให้ middleware ตัวหลังจากนี้ทั้งหมดใช้ข้อมูลนี้ได้
    console.log('Middleware#1');
    req.test = 20; // เพิ่ม key test: value = 20 เข้าไปใน request obj ทำให้ middleware ตัวถัดๆ ไปจากนี้จะสามารถเรียกใช้ key test ที่เรากำหนดไว้ได้
    if(req.headers.name !== 'John'){
        return res.status(401).json({ message: 'You are unauthorized' })
    }
    next(); // จะ parse request obj ที่ถูก modify แล้วส่งต่อไปให้ middleware ตัวถัดไป ดังนั้น middleware จึงสามารถส่งข้อมูลไปหากันได้ แต่ตัวต้นทางต้องส่งข้อมูลมาก่อนตัวหลังถึงจะใช้ได้เพราะ middleware ลำดับสำคัญ
}

function mid2(req, res, next){
    // สามารถใช้ key test ผ่าน request obj ได้เลยไม่ต้องไป query DB ใหม่อีกรอบ
    console.log('Middleware#2');
    next();
}

function route1(req, res, next){
    // สามารถใช้ key test ผ่าน request obj ได้เลยไม่ต้องไป query DB ใหม่อีกรอบ
    console.log('Route#1');
}

function route2(req, res, next){
    // สามารถใช้ key test ผ่าน request obj ได้เลยไม่ต้องไป query DB ใหม่อีกรอบ
    console.log('Route#2');
}

function mid3(req, res, next){
    // สามารถใช้ key test ผ่าน request obj ได้เลยไม่ต้องไป query DB ใหม่อีกรอบ
    console.log('Middleware#2');
    next();
}

// เมื่อ request เข้ามาจะเข้าอันนี้ก่อน
app.use(mid1);
app.use(mid2);
app.get('/home', route1); // Routing middleware
app.get('/home', route2); // Routing middleware
app.use(mid3);

// Middleware ตัวที่ 1 พอ request เข้ามาตัวนี้จะทำงานก่อน
// app.use(express.json()); // parse request body(content-type: application/json)

// Routing middleware ถ้า request ที่ส่งมา path หรือ method ตรงจะทำ ถ้าไม่ตรง middleware นี้จะไม่ทำงาน จะถูกข้ามไปเลย 
// app.get('/', (req, res, next) => {
//     console.log('Routing Middleware');
//     res.send('Test routing middleware'); // พอส่ง response กลับไป middleware ตัวอื่นจะไม่ทำงานแล้ว
    // สร้าง Error มี 2 วิธี
    // throw new Error('Intentional throw error'); 
    // next(new Error('Intentional throw error')); // ถ้า next มี parameter อะไรก็ตามอย่างน้อย 1 ตัว มันจะวิ่งไปทำงานที่ Error Handling middleware ทันที

    // แต่ถ้าใส่ next() แบบไม่มี parameter ไปด้วยจะไปสั่งให้ middleware ตัวถัดไปทำงานต่อ แต่ไม่ควรเขียนแบบนี้ควรเขียนในรูปแบบเงื่อนไขมากกว่า เพราะถ้าจะส่ง response ก็ควรให้จบเลย
    // next();
// });

// Middleware ตัวที่ 2
// app.use((req, res, next) => {
    // console.log(req.query);
    // req.abc = 'Test'; // เราสามารถกำหนดค่าอะไรก็ได้เพิ่มเข้าไปใน request obj ที่อยู่นอกเหนือจาก request header/ body ได้
    // console.log('First middleware');
    // next();  // สั่งให้ตัวถัดไปทำงาน
// })

// Middleware ตัวที่ 3
// app.use((req, res, next) => {
    // console.log('Second middleware');
    // console.lolg(req.abc); // ได้ Test ออกมาเพราะ middleware ตัวก่อนหน้ามีการ modefied request obj ทำให้ middleware ตัวถัดๆ ไปสามารถใช้ request obj ที่ถูก modified ได้ เนื่องจาก middleware แต่ละตัวจะเรียกใช้ไปที่ request obj ตัวเดียวกันและ response obj ตัวเดียวกันด้วย
    // req.def = 'DEF';
    // ถ้าไม่มีคำสั่ง next() ตัวถัดไปจะไม่ทำงาน และ request จะค้างอยู่ที่นี่เพราะไม่มีการส่ง respsone ออกไป
    // next();
// })

// Middleware ตัวที่ 4
// app.use((req, res, next) => {
    // สามารถเอา req.def มาใช้ได้เพราะอยู่ถัดจากตัวที่ modified request obj ไปแล้ว
    // console.log(req.def);
    // console.log('Third middleware');
// })

// Error-handling Middleware ดักจับ error ที่เกิดขึ้นใน middleware
app.use(async(req, res, next) => {
    try{
        console.log('Error Handling Middleware');
        throw new Error('Test'); // ถ้า throw อยู่ภายใต้ try..catch มันจะไม่ส่ง error obj ไปที่ Error middelware จนกว่า catch จะส่ง next(err) แต่ถ้า throw ไม่ได้อยู่ใน try..catch พอมันเจอ error จะส่ง error obj ไปให้ Error middelware เลยทันที
    }catch(err){
        next(err); // Error middelware จะทำงานทันที แต่ถ้าไม่ได้สั่งอันนี้ Error middelware จะไม่ทำงาน
    }
})

app.use((err, req, res, next) => {
    console.log('Error Middleware running');
    console.log(err);
})

// app.get('/todos', (req, res, next) => {})

// app.post('/todos', (req, res, next) => {})

// app.put('/todos', (req, res, next) => {})

// Router-level Middleware 
const router = express.Router();
router.get("/", (req, res, next) => {}); // Method GET + /todos/ เข้ามา middleware function อันนี้ทำงาน
router.post("/", (req, res, next) => {}); // Method POST + /todos/ เข้ามา middleware function อันนี้ทำงาน
router.put("/:id", (req, res, next) => {}); // Method PUT + /todos/:id เข้ามา middleware function อันนี้ทำงาน
router.delete("/:id", (req, res, next) => {}); // Method DELETE + /todos/:id เข้ามา middleware function อันนี้ทำงาน

// ถ้ามี path /todos มันจะวิ่งมาทำงานที่ middleware router คือ มี path /todos และ method เป็น get จะมาทำงานที่ middleware router.get('/' path นี้จะไปต่อท้าย path /todos ที่เป็น path เริ่มต้น, (req, res, next) => {}) อันนี้
// ทำวิธีนี้จะได้ไม่ต้องเขียน path /todos ซ้ำๆ เหมือนข้างบน
app.use("/todos", router);

// Approach static file
app.use('/static', express.static('public'));


app.listen(8000, () => console.log('Server running on port 8000'));