var express = require('express')
var app = express();
app.use(express.static('public'))
app.set('view engine','ejs');
app.set('views','./views');

var server = require('http').Server(app);//chua biet cong dung cua cai nay
const io = require('socket.io')(server);
server.listen(process.env.PORT || 8888,() => console.log('server is start'));

app.get('/',(req,res) => res.render('index'));

var arrUserInfo= [];
io.on('connection', (socket)=> {
    console.log(socket.id);
    socket.on('NGUOI-DUNG-DANG-KY',user=>{
        socket.peerId = user.peerId;
        var isExit = arrUserInfo.some(i => i.ten === user.ten);
        if(isExit) return socket.emit('DANG-KY-THAT-BAI');
        arrUserInfo.push(user);
        io.sockets.emit('DANH-SACH-ONLINE',arrUserInfo);
    });

    socket.on('disconnect',()=>{
        const index = arrUserInfo.findIndex(user => user.peerId === socket.peerId);
        arrUserInfo.splice(index,1);
        io.sockets.emit('DANH-SACH-ONLINE',arrUserInfo);
    });
})