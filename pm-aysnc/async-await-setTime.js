function setTimeoutAndLog(input, ms) {
    return new Promise( (rs, rj) => {
        setTimeout( () => {
           console.log(input)
            rs();
        }, ms)
    })
}

async function runText(input, ms) {
    try{
    await setTimeoutAndLog('a', 1000)
    await setTimeoutAndLog('b', 1000)
    await setTimeoutAndLog('c', 1000)
    await setTimeoutAndLog('d', 1000)
    setTimeout( () => console.log(input), ms)
    } catch(err) {
        console.log(`Error is ${err}`)
    }
}

runText('e', 1000);