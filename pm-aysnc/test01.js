const os = require('os');

// console.log(os.cpus())

tmem = os.totalmem();
fmem = os.freemem();
console.log(`Total Ram = ${tmem} and Free memory = ${fmem}`)
console.log(`Usage = ${tmem - fmem}`)
console.log(os.hostname())