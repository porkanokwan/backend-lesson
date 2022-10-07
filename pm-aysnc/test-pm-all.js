// Promise all 
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// const pm1 = new Promise( (resolve, reject) => {
//     let number = getRandom(1, 9)
//     if( number < 7) resolve(number)
//     else reject(number)
// })
// const pm2 = new Promise( (resolve, reject) => {
//     let number = getRandom(1, 9)
//     if( number < 7) resolve(number)
//     else reject(number)
// })
// const pm3 = new Promise( (resolve, reject) => {
//     let number = getRandom(1, 9)
//     if( number < 7) resolve(number)
//     else reject(number)
// })

function checkNumber() {
    return new Promise( (resolve, reject) => {
        let number = getRandom(1, 9)
        if( number < 7) resolve(number)
        else reject(number)
    })
}

const pm1 = checkNumber();
const pm2 = checkNumber();
const pm3 = checkNumber();

Promise.all([pm1, pm2, pm3]).then( result => {
    console.log('Pass all')
    console.log(result)
}) 
.catch( err => {
    console.log('Some promise not pass')
    console.log(err)
})
// Promise.all([checkNumber(), checkNumber(), checkNumber()]).then( result => {
//     console.log('Pass all')
//     console.log(result)
// }) 
// .catch( err => {
//     console.log('Some promise not pass')
//     console.log(err)
// })