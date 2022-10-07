const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');

// ทำ Model จำลองข้อมูลโดยใช้ Class ซึ่ง Model นี้ต้องเชื่อมต่อกับฐานข้อมูลและ controller (จริงๆ ไม่ต้องเขียนเป็นตัวอย่างเฉยๆ)
class Todo {
    constructor(title, completed, dueDate) {
        this.title = title;
        this.completed = completed;
        this.dueDate = dueDate;
    };

    readTodo = async() => {
        const data = await fs.readFile('todolist.json', 'utf-8');
        return JSON.parse(data);
    };

    saveTodo = async(data) => {
        await fs.writeFile('todolist.json', JSON.stringify(data), 'utf-8');
    };

    async save() {
        const data = await this.readTodo();
        this.id = uuidv4()
        data.push({ title: this.title, id: this.id, completed: this.completed, dueDate: this.dueDate });
        await this.saveTodo(data);
    }
}

// new Todo( title, completed, dueDate )

module.exports = Todo;