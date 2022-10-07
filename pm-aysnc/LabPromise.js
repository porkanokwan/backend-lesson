function setTimeoutAndLog(input, ms) {
    return new Promise( rs => {
        setTimeout( () => {
           console.log(input)
            rs();
        }, ms)
    })
}

setTimeoutAndLog('a', 1000)
.then( () => setTimeoutAndLog('b', 1000))
.then( () => setTimeoutAndLog('c', 1000))
.then( () => setTimeoutAndLog('d', 1000))
.then( () => setTimeout( () => console.log('e'), 1000))