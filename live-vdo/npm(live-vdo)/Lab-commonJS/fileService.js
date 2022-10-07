// fs/promises ทำให้สามารถใช้ async await ได้ ถ้า import มาแค่ fs จะต้องใช้แบบ callback
const fs = require('fs/promises');

async function readFileJSON(fileName) {
    const data = await fs.readFile(fileName, 'utf-8')
    return JSON.parse(data);
}

function writeFileJSON(fileName, data) {
    fs.writeFile(fileName, JSON.stringify(data));
}

module.exports = { readFileJSON, writeFileJSON };