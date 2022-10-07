function addSync(a, b) {
    return a + b;
}
let sum = addSync(1, 2);

function add(a, b, callbackFunction) {
    callbackFunction(null, a + b);
    return true
}
let sum2;
console.log(add(1, 2, (err, returnValue) => {
    sum2 = returnValue;
})) // true

console.log(sum) //3
console.log(sum2) // 3
// console.log(result)