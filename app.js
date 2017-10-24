var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(8888);
//setup ejs
app.set('view engine','ejs');
app.set('views','./views');

app.get('/',function (req,res) {
    res.render('index');
});
app.get('/danhsach',function (req,res) {
    res.sendFile(__dirname +'/danhsach.txt');
});
app.get('/hello',function (req,res) {
    res.send('day la get');
});
app.post('/hello',urlencodedParser ,function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    if (!req.body)
        res.send('nulll');
    res.send('usename: '+ username+'password'+ password);
});

app.get('/danhsach/:so1/:so2',function (req,res) {
    var so1 = req.params.so1;
    res.send(so1);
    /*res.sendFile(__dirname +'/danhsach.txt');*/
});

app.get('*',function (req,res) {
    res.send("page 404");
    /*res.sendFile(__dirname +'/danhsach.txt');*/
});

