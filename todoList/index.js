const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// Lab 1
// app.get('/', (req, res) => {
// res.send('<h1>My First Web App using Express</h1>');
// res.json({ title: "My First Web App", message: "Our Web App API" })
// });

// Lab 2
// app.get('/todos', (req, res) => {
//     res.json({ message: `${req.method} todos`})
// });
// app.post('/todos', (req, res) => {
//     res.json({ message: `${req.method} todos`})
// });
// app.put('/todos', (req, res) => {
//     res.json({ message: `${req.method} todos`})
// });
// app.delete('/todos', (req, res) => {
//     res.json({ message: `${req.method} todos`})
// });
// app.patch('/todos', (req, res) => {
//     res.json({ message: `${req.method} todos`})
// });

// Lab 3
// app.get('/redirect', (req, res) => {
//     res.redirect('http://google.com')
// })

// Lab 4
// app.get('/404', (req, res) => {
//     res.status(404).send('<h1>This page is not found</h1>')
// })

// Lab 5
// app.get('/', (req, res) => {
//     res.status(200).send('<h1>Welcome To My Website</h1>')
// })

// app.get('/home', (req, res) => {
//     res.status(200).send('<h1>This is home page</h1>')
// })

// app.get('/*', (req, res) => {
//     res.status(404).send('<h1>Page Not Found</h1>')
// })
// app.all คือทุก path จะเข้าอันนี้ ยกเว้นอันที่เรากำหนดเฉพาะเจาะจงไว้จะไม่เข้าอันนี้
// app.all('*', (req, res) => {
//     res.status(404).send('<h1>Page Not Found</h1>')
// })
// เนื่องจาก app.use รับทุก path และทุก method ดังนั้นต้องเอาไว้ล่างสุด เพราะ เมื่อมี path เข้ามามันจะได้รันอันบนที่ match กันก่อน ถ้าเอา app.use อันแรกจะกลายเป็นว่ามัน รับทุก path ทำให้ไม่ลงไปคำสั่งอื่น
// app.use((req, res) => {
//     res.status(404).send('<h1>Page Not Found</h1>')
// })

// Lab 6
// app.get('/', (req, res) => {
//     console.log(__dirname); // __dirname จะใช้บอก path ของไฟล์หรือ folder ปัจจุบันที่เราอยู่
//     res.sendFile(path.join(__dirname, 'index.html')) // เป็นการเอา path ตัวหน้า join กับตัวหลัง
// })

// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, 'home.html'))
// })

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'notFound.html'))
// })

// Lab 7
// app.use(express.json()); // parse request body(content-type: application/json)
// app.use(express.urlencoded({ extended: false })); // parse request body(content-type: application/x-www-form-urlencoded)
// ถ้าจะส่งรูปส่งไฟล์ต้องอาศัย Library busboy, multer, formidable ที่เป็น middleware ในการ parse request body(content-type: multipart/form-data) ที่เป็น binary

// app.post('/login', (req,res) => {
//     console.log(req.body);
// })

// const link =
//     `<a href="/login">login</a>
//     <a href="/register">register</a>`

// app.get('/', (req, res) => {
//     res.send(link)
// })

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'login.html'))
// })
// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'register.html'))
// })
// app.post('/submit_login', (req, res) => {
//     const body = req.body;
//     console.log(body); // [Object: null prototype] { username: 'Dulyapraphant', password: '123456', file: ''}
//     res.redirect('/')
// })
// app.post('/submit_register', (req, res) => {
//     res.redirect('/')
// })

// Lab query 1
// app.get('/sum', (req, res) => {
//     const query = req.query;
//     let num = 0;
//     for(let item in query) {
//         // console.log(+query[item])
//         num += Number(query[item]);
//     }
//     res.send(`Response: { sum: ${num} }`)
// })

// app.get('/sum', (req, res) => {
//     const query = req.query;
//     console.log(query); // { arr: '[1,2,4]' }
//     const arr = JSON.parse(query.arr);
//     let n = 0;
//     for(let i of arr){
//         n += i
//     }
//     res.json({ sum: n })
// })

// เฉลย Lab query 1
// app.get('/sum', (req, res) => {
//     const query = req.query;
//     res.json({ sum: +query.a + +query.b })
// });

// app.get('/sum', (req, res) => {
//     const query = req.query;
//     // sum = [query]
//     const sum = Object.values(query).reduce((acc, el) => acc + +el, 0);
//     res.json({sum});
// });

// app.get('/sum', (req, res) => {
//     const query = req.query;
//     const arr = JSON.parse(query.arr);
//     const result = arr.reduce( (acc, item) => acc + item , 0)
    // const result = Object.values(query).reduce( (acc, item) => {
    //     const val = JSON.parse(item);
    //     // check ว่า value ที่รับเข้ามาเป็น array มั้ย
    //     if(Array.isArray(val)){
    //         acc += val.reduce( (num, el) => num + +el ,0)
    //     } else {
    //         acc += +item
    //     }
    // } , 0)
    // res.json({ sum: result })
// })

// Lab query 2
// const fs = require('fs');
// app.get('/countries', (req, res) => {
//     const query = req.query; // { region: 'Asia' }
//     fs.readFile('country.json', 'utf-8', (err, data) => {
//         // console.log(data)
//         if( query.region ){
//             const region = JSON.parse(data).filter(item => item.region.toLocaleLowerCase() === query.region.toLocaleLowerCase())
//             return res.json({ countries: region })
//         }else if( query.nameinclude ) {
//             const nameInclude = JSON.parse(data).filter(item => item.name.common.includes(query.nameinclude.toLocaleLowerCase()) || item.name.official.includes(query.nameinclude.toLocaleLowerCase()));
//             return res.json({ countries: nameInclude });
//         }
//     })
// })

// app.get('/countries', (req, res) => {
//     fs.readFile('country.json', 'utf-8', (err, data) => {
//         const query = req.query;
//         console.log(JSON.parse(data)[40]);
//         const clone = [...JSON.parse(data)];
//         console.log(clone);
//         const limit = clone.splice(+query.offset, +query.limit)
//         res.json({ countries: limit })
//     })
// })

// เฉลย
// const fs = require('fs/promises');
// app.get('/countries', async (req, res) => {
//     const query = req.query; // { region: 'Asia' }
//     const data = await fs.readFile('country.json', 'utf-8');
//     ถ้าไม่ใส่ region ใน query จะ return ค่าทุกตัวออกมาเลย จะได้ไม่ต้อง fliter หาให้เสียเวลา 
//     const countries = JSON.parse(data).filter(item => query.region === undefined || item.region.toLocaleLowerCase() === query.region.toLocaleLowerCase());
//     res.json({ countries })
// })
// app.get('/countries', async (req, res) => {
//     const query = req.query;
//     const data = await fs.readFile('country.json', 'utf-8');
//     const countries = JSON.parse(data).filter(item => query.nameinclude === undefined || item.name.common.includes(query.nameinclude.toLocaleLowerCase()) || item.name.official.includes(query.nameinclude.toLocaleLowerCase()));
//     res.json({ countries })
// })
// app.get('/countries', async (req, res) => {
//     const query = req.query;
//     const data = await fs.readFile('country.json', 'utf-8');
//     const countries = JSON.parse(data).slice(query.offset ?? 0, query.limit ? +query.limit + (+query.offset ?? 0) : JSON.parse(data).length )
//     res.json({ countries });
// })
// app.get('/countries', async (req, res) => {
//     // ควรกำหนดค่าเริ่มต้น เผื่อว่าไม่ได้ใส่ข้อมูลเข้ามา
//     const { region='', nameinclude='', limit, offset=0 } = req.query;
//     const data = await fs.readFile('country.json', 'utf-8');
//     const countries = JSON.parse(data).filter(item => (region === '' || item.region.toLocaleLowerCase() === region.toLocaleLowerCase())
//     && (nameinclude === '' || item.name.common.toLocaleLowerCase().includes(nameinclude.toLocaleLowerCase()) || item.name.official.toLocaleLowerCase().includes(nameinclude.toLocaleLowerCase()) ))
//     res.json({ countries: limit ? countries.slice(offset ?? 0, +limit + +(offset ?? 0)) : countries.slice(offset ?? 0, +limit ?? countries.length ) });
// })

// Lab params 1
// app.get('/sum/:a/:b', (req, res) => {
//     const params = req.params;
//     res.json({ a: params.a, b: params.b });
// })

// app.get('/products/:productid', (req, res) => {
//     const params = req.params; // params = { productid: ค่าที่ส่งมาใน path }
//     res.json({id: params.productid})
// })

// app.get('/users/:userid/bookings/:bookingid', (req, res) => {
//     const params = req.params;
//     res.json({userid: params.userid, bookingid: params.bookingid });
// })

// Lab params 2
// const fs = require('fs/promises')
// app.get('/countries/:commonName', async(req, res) => {
//     const params = req.params;
//     const data = await fs.readFile('country.json', 'utf-8');
//     const countries = JSON.parse(data).filter(item => item.name.common.toLocaleLowerCase() === params.commonName.toLocaleLowerCase())
//     // console.log(countries)
//     res.json({ countries })
// })

// Lab body 1
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get('/users', (req, res) => {
//     const { id, email } = req.body;
// })

// app.post('/login', (req, res) => {
//     const { email, pasword } = req.body;
// })

// app.put('/products/:id', (req, res) => {
//     const { name, price, description } = req.body;
// })

// app.delete('/products', (req, res) => {
//     const { productId } = req.body;
// })

// Lab Middleware 1
// const cors = require('cors');
// app.use(express.json());
// app.use(cors()); // จริงๆ ต้องอยู่บนสุดของทุกๆ อัน

// Lab Middleware 2
// ควรเอาไว้ล่างสุด เพื่อให้มัน check path ที่กำหนดก่อนว่า มีอันไหนตรงไหม ถ้าไม่มีอันไหนตรงเลย ถึงจะเข้าอันนี้
// app.all('*', (req, res, next) => {
//     res.status(404).json({ message: 'path not found on this server' })
// })

// app.use((req, res, next) => {
//     res.status(404).json({ message: 'path not found on this server' })
// })

// Lab Middleware 3
// const router = express.Router();
// router.get('/', (req, res, next) => {
//     res.json({ message: `${req.method} todos` })
// });
// router.post('/', (req, res, next) => {
//     res.json({ message: `${req.method} todos` })
// });
// router.put('/', (req, res, next) => {
//     res.json({ message: `${req.method} todos` })
// });
// router.patch('/', (req, res, next) => {
//     res.json({ message: `${req.method} todos` })
// });
// router.delete('/', (req, res, next) => {
//     res.json({ message: `${req.method} todos` })
// });

// app.use('/todos', router);

// Lab Middleware 4
// const axios = require('axios');
// app.get('/dog', async(req, res, next) => {
//     try{
//         const dog = await axios.get('https://dog.ceo/api/breeds/image/random');
//         console.log(dog.data);
//         // res.redirect(dog.data.message);
//         res.json({ pic: dog.data.message })
//         // res.send('<img src="dog.data.message" alt="dogs"></img>')
//     } catch(err) {
//         next(err);
//     }
// })

// app.use((err, req, res, next) => {
// console.log(err); ได้ {"message": {...} } ออกมา
//     res.status(500).json({ message: err.message})
// })

// Lab Static File
// app.use(express.static('public'));
// app.use('/static', express.static('public'));

// Lab body 2 ใช้หลัก REST API ออกแบบ
const todoRouter = require('./routes/todoRoute');
const userRoute = require('./routes/userRoute');
const { query } = require("express");
const e = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// มี Resource todo กับ user
app.use('/todo', todoRouter);
app.use('/user', userRoute)

// Handle Path not found
app.use((req, res) => res.status(404).json( { message: 'Resource not found on this server' } ))

// Handle Error
app.use((err, req, res, next) => {
    console.log(err);
    res.json({ message: err.message })
});

app.listen(8888, () => console.log("Server running on port 8888"));