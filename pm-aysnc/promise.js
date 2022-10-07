// let done = true
let done = false

// creater part
const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = 'Here is the thing I built'
    resolve(workDone)
  } else {
    const why = 'Still working on something else'
    reject(why)
  }
})
console.log(isItDoneYet) // done == false ทำให้ function return reject(err obj) ไปเก็บใน promise obj จะได้ Promise { <rejected> 'Still working on something else' }

//user part
const checkIfItsDone = () => {
    isItDoneYet
        .then( ok => {
            console.log('come from resolve state in Promise')
            console.log(ok)
        })
        .catch( err => {
            console.log('come from reject state in Promise')
            console.log(err)
        })
}

// checkIfItsDone(); // come from resolve state in Promise, Here is the thing I built
checkIfItsDone(); // come from reject state in Promise, Here is the thing I built