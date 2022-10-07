var fs = require('fs');

function readMessage(){
    return new Promise(function (fulfill, reject){
        fs.readFile('message.txt', 'utf8', function (err, res){
            if (err) reject(err);
            else fulfill(res);
        });
    });
}

function writeMessage(dat){
    return new Promise(function (fulfill, reject){
        fs.writeFile('out.txt', dat, function (err, res){
            if (err) reject(err);
            else fulfill(res);
        });
    });
}

readMessage()
// .then( writeMessage )
.then( data => writeMessage(data) )
.then( function(res) {
    console.log('success');
    console.log(res); // undefined 
});