var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

var server = require('http').Server(app);//chua biet cong dung cua cai nay
var io  = require('socket.io')(server);
server.listen(8888);

var mangUser=[""];

io.on('connection',function (socket) {
    console.log('co nguoi ket noi vao' + socket.id);
   //console.log(socket.adapter.rooms)//show tat ca cac room

    socket.on('tao-room',function (data) {
        socket.join(data);
        socket.Phong = data;
        var mang = [];
        console.log(socket.adapter.rooms);
        for(r in socket.adapter.rooms){
            mang.push(r);
        }
        io.sockets.emit('server-send-rooms',mang);
        socket.emit('server-send-room-socket',data);

    })
    socket.on('user-chat',function (data) {
        io.sockets.in(socket.Phong).emit('server-chat',data);

    })

})

app.get('/',function (req,res) {
    res.render('index(chat-room)')
})
