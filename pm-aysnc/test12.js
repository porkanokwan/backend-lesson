function showText(text, time) {
    return new Promise( rs => {
        setTimeout( () => {
            console.log(text)
            rs()
        }, time)
    })
}

// ไม่นิยมเขียนติดกันแบบนี้
// showText('1', 1000).then( () => {return showText('2', 1000)} )

// นิยมเขียนแบบนี้จะอ่านง่ายกว่า
showText('1', 1000)
.then( () => {return showText('2', 1000)} )
.then( () => {return showText('3', 1000)} )
// .then( () => {return showText('4', 1000)})
.then( () => setTimeout( ()=> console.log('4'), 1000))