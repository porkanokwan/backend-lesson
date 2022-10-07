function dropBall(before, after) {
    before(); // การ callback function จะเรียกใช้ที่ตำแหน่งไหนก็ได้ใน function ที่รับมา
    console.log('catch ball');
    console.log('release');
    after();
}

function kickBall() {
    console.log('kicks ball')
}

function buyBall() {
    console.log('buy ball')
}

// dropBall(buyBall, kickBall)

dropBall(kickBall, buyBall)