var express = require('express')
var app = express();
app.use(express.static('public'))
app.set('view engine','ejs');
app.set('views','./views');

app.listen(process.env.PORT || 8888,() => console.log('server is start'));

app.get('/',(req,res) => res.render('index'));

