var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

var server = require('http').Server(app);//chua biet cong dung cua cai nay
var io  = require('socket.io')(server);
server.listen(8888);

var mangUser=["aaa"];

io.on('connection',function (socket) {
    console.log('co nguoi ket noi vao' + socket.id);

    socket.on('client-send-username',function (data) {
        if(mangUser.indexOf(data) >= 0){
        //fail
            socket.emit('server-send-dki-thatbai')
        }else {
        //success
            mangUser.push(data);
            socket.Username = data;
            socket.emit('server-send-dki-thanhcong',data);
            io.sockets.emit('server-send-danhsach-user',mangUser);
        }

    })
    socket.on('logout',function () {
        mangUser.splice(mangUser.indexOf(socket.Username),1);
        console.log(mangUser);
        socket.broadcast.emit('server-send-danhsach-user',mangUser);
    })
    socket.on('user-send-message',function (data) {
        io.sockets.emit('server-send-message',{un:socket.Username,nd:data});
    })
    socket.on('user-typing-start',function () {
        socket.broadcast.emit('server-typing-start',{un:socket.Username});
    })
    socket.on('user-typing-end',function () {
        socket.broadcast.emit('server-typing-end');
    })
})

app.get('/',function (req,res) {
    res.render('index(chat)')
})
