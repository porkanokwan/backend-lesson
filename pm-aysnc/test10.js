// console.log('1')
// setTimeout( () => console.log('2'), 1000)
// console.log('3')

// promise จะเก็บ constructor function ที่เขียนไว้ ดังนั้น จะสามารถเอาไปใช้กับ method ได้ ก็คือ promise เป็น obj ของ prototype Promise ดังนั้น จึงใช้ method ของ Promise ได้
// const promise = new Promise( rs => {
//     setTimeout( () => {
//         console.log('2')
//         rs()
//     }, 1000)
// })

// console.log('1')
// promise.then( () => console.log('3'))

console.log('1')
new Promise( rs => {
    setTimeout( () => {
        console.log('2')
        rs()
    }, 1000)
}).then( () => console.log('3'))

