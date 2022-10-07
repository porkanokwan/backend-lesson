// console.log('1')
// new Promise( rs => {
//     setTimeout( () => {
//         console.log('2')
//         rs()
//     }, 1000)
// }).then( () => setTimeout( () => {
//     console.log('3')
//     rs()
// }, 1000
//     )).then( () => console.log('4')) // 1 2 4 3 


console.log('1')
new Promise( rs => {
    setTimeout( () => {
        console.log('2')
        rs()
    }, 1000)
}).then( () => 
new Promise( rs => {
setTimeout( () => {
    console.log('3')
    rs()
}, 1000) }
    )).then( () => setTimeout( () => console.log('4'), 1000) )