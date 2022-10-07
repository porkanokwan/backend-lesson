// import chalk แบบ common js
const chalk = require('chalk');
const obj = require('./date');
const {months, days, milli} = require('./date');

console.log(chalk.blue('Welcome'));
console.log(obj);
console.log(chalk.magenta(months));  // chalk.magenta จะ convert เป็น String จะได้ Jan,Feb,Mar
console.log(days);
console.log(milli);
