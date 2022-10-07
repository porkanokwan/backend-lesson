// refracter

function showText(text, time) {
    return new Promise( rs => {
        console.log(text)
        setTimeout( () => rs(), time)
    })
}

showText('1', 1000)
.then( () => showText('2', 1000) ) // มีคำสั่งบรรทัดเดียว เอา { return } ออกได้
.then( () => showText('3', 1000) )
// .then( () => showText('4', 1000) )
.then( () => setTimeout( ()=> console.log('4'), 1000))
