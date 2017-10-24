var express = require('express');
var app = express();

var server = require('http').createServer(app);

server.listen(8888);

app.get('/',function (req,res) {
    res.sendFile(__dirname +'/index.html');
});
app.get('/danhsach',function (req,res) {
    res.sendFile(__dirname +'/danhsach.txt');
});

app.get('/danhsach/:so1/:so2',function (req,res) {
    var so1 = req.params.so1;
    res.send(so1);
    /*res.sendFile(__dirname +'/danhsach.txt');*/
});

