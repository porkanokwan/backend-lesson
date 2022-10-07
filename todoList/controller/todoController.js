const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const Todo = require('../models/todo');

// Model เพราะ เชื่อมต่อกับฐานข้อมูลและใช้จัดการข้อมูล
const readTodo = async() => {
    const data = await fs.readFile('todolist.json', 'utf-8');
    return JSON.parse(data);
}

const saveTodo = async(data) => {
    await fs.writeFile('todolist.json', JSON.stringify(data), 'utf-8');
};
// และ Model ที่จะจำลองข้อมูลมาต้องอยู่ในรูปแบบที่กำหนดใน Resource จะจำลองโดยใช้ Class

// Resource: todo => { id(type: string, format: uuid): 'uuid', title(type: string, required กำหนดว่าต้องใส่): '', completed(type: boolean, default: false ใช้กำหนดว่า ถ้าไม่ส่งค่า completed มาจะให้ค่าเริ่มต้นมันเป็น false): true, dueDate(type: string, format: Date obj, default: null ถ้าไม่ส่งค่า dueDate มา ให้ค่าเริ่มต้นเป็น null คือไม่มีค่า): '2021-09-24' }

// Create: POST /todo
// parameter: client ส่งข้อมูลในรูป body { title: , completed: , dueDate: }
// Response: 201 created, ส่งข้อมูลกลับ response body { todo: { id, title, completed, dueDate}(, success: true, message: '' ใส่ไม่ใส่ก็ได้) } }
// Error ที่เกิดขึ้นได้: 400 Bad request, { message: 'error message ควรบอกว่า error เพราะอะไร ทำไม bad request เช่น format date ไม่ถูกต้องหรือ title is require' }
// และ 500 Internal server error, { message: 'Internal server error' } ควรใส่ไปแบบนี้ไม่ให้ผู้ใช้งานรู้ว่า server มีปัญหาอะไรตอนใช้งาน แต่ถ้าเป็นตอนพัฒนาเว็บส่ง error ที่เกิดขึ้นไปได้
const createTodo = (req, res, next) => {
    try{
        const { title, completed, dueDate } = req.body;
        // ต้องครวจสอบก่อนว่า req.body ที่ส่งมาถูกต้องมั้ย เช่น title มัน required ต้องดูว่าส่งมามั้ย ถ้าไม่ส่งมาให้ response กลับออกไป ถ้าส่งมาก็ check ตัวอื่นต่อ
        if(typeof title !== 'string') {
            return res.status(400).json({ message: 'Title must be String'})
        }
        if(title.trim() === ''){
            return res.status(400).json({ message: 'Title is required' })
        }
        if(completed !== undefined && typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Completed must be Boolean' })
        }
        if(dueDate !== undefined && isNaN(new Date(dueDate).getTime())){ // ถ้า convert เป็น Date obj ได้ getTime จะ return ค่าเป็นเวลาที่เป็นตัวเลข
            return res.status(400).json({ message: 'dueDate is invalid Date format' })
        }
        // const newTodo = { title, id: uuidv4(), completed: completed ?? false, dueDate: dueDate ? new Date(dueDate) : null }
        // เป็นการสร้าง obj ผ่าน Model
        const newTodo = new Todo(title, completed, dueDate);
        newTodo.save();

        // controller เชื่อมต่อกับ Model ตรงนี้ เพราะ เป็นส่วนที่จัดการกับข้อมูลคือ ส่งไปให้ read ข้อมูลจากไฟล์ข้อมูลและ สร้างข้อมูลลงไฟล์
        // const oldTodos = readTodo();
        // oldTodos.push(newTodo);
        // saveTodo(oldTodos);

        res.status(201).json({ todo: newTodo });
        // ใช้รูปแบบของ view ต้องเขียนแบบนี้: res.render(viewTemplateEngine); ซึ่่ง viewTemplateEngine จะเป็นพวก Library เช่น EJS, pug เป็นต้น
    }catch(err) {
        next(err);
    }
}

// Read: GET /todo (เอาข้อมูลทั้งหมด)
// parameter: query { limit(กำหนดจำนวนที่จะเอามา), offset, orderby, field } อาจจะกำหนดให้ orderby=dueDate, desc(ทิศทางการเรียงข้อมูล) หรือ field=title, dueDate คือเอาแค่ title กับ dueDate พอ ซึ่งต้องส่งผ่าน query เพราะ GET ไม่มี body และ params ไม่ได้เพราะไม่ตรงกับ rest api
// Response: 200 OK, { todos: [todo Obj] }
// Error ที่เกิดขึ้นได้: 400 Bad request, { message: 'error message ควรบอกว่า error เพราะอะไร ทำไม bad request เช่น ส่ง limit/offset เป็นอย่างอื่นที่ไม่ใช่เลข' }
// และ 500 Internal server error, { message: 'Internal server error' } 
const getAllTodo = async(req, res, next) => {
    try{
        const data = await readTodo();
        res.status(200).json({ todos: data })
    }catch(err) {
        next(err);
    }
}

// GET /todo/:id (เอาข้อมูลแค่ id นั้น)
// parameter: params{ id }
// Response: 200 OK, { todo: { todo } || null } ถ้าส่ง id มาผิดหรือไม่มี id นั้นอยู่ในข้อมูล ให้ response ออกไปเป็น null จะเท่ากับว่า ไม่มีค่าของ id นั้น ถือว่าไม่ error เพราะมี response ส่งกลับไปแล้ว
// Error ที่เกิดขึ้นได้: 500 Internal server error, { message: 'Internal server error' }
const getTodoById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const data = await readTodo();
        // console.log(data);
        const itemId = data.find(item => item.id === id);
        res.status(200).json({ todo: itemId || "Can not find this id" })
    }catch(err) {
        next(err);
    }
}

// Update: PUT /todo/:id
// parameter: params{ id }, body { title: , completed: , dueDate: }
// Response: 200 ok, { todo: {todo updated} }
// Error ที่เกิดขึ้นได้: 400 Bad request { message: 'error message' },500 Internal server error { message: 'Internal server error' }
const updateTodo = async(req, res, next) => {
    try{
        const {id} = req.params;
        // การ Valid ใน Update ต้องเป็นรูปแบบเดียวกันกับ Create เสมอ
        const { title, completed, dueDate } = req.body;
        if(typeof title !== 'string') {
            return res.status(400).json({ message: 'Title must be String'})
        }
        if(title.trim() === ''){
            return res.status(400).json({ message: 'Title is required' })
        }
        if(completed !== undefined && typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Completed must be Boolean' })
        }
        if(dueDate !== undefined && isNaN(new Date(dueDate).getTime())){
            return res.status(400).json({ message: 'dueDate is invalid Date format' })
        }
        const data = await readTodo();
        const idx = data.findIndex(item => item.id === id);
        if(idx === -1) {
            return res.status(400).json({ message: 'Todo with this id not found' })
        }
        data[idx] = {...data[idx], title, completed: completed ?? data[idx].completed, dueDate: dueDate ? new Date(dueDate) : data[idx].dueDate};
        await saveTodo(data);
        res.status(200).json({ todo: data[idx] });
    }catch(err) {
        next(err);
    }
}

// DELETE: /todo/:id
// parameter: params{ id }
// Response: 204 no content (จะไม่มีการส่ง body กลับ)
// Error ที่เกิดขึ้นได้: 400 Bad request { message: 'todo with this id not found' } ส่ง id มาไม่ถูกต้องลบข้อมูลไม่ได้
// 500 Internal server error { message: 'Internal server error' } 
const deleteTodo = async(req, res, next) => {
    try{
        const { id } = req.params;
        const data = readTodo();
        const idx = await data.findIndex(item => item.id === id);
        if(idx === -1) {
            return res.status(400).json({ message: 'Todo with this id not found' })
        }
        data.splice(idx, 1);
        await saveTodo(data);
        res.status(204).json();
    }catch(err) {
        next(err);
    }
}
module.exports = { createTodo, getAllTodo, getTodoById, updateTodo, deleteTodo };