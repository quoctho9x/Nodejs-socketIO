var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

var server = require('http').Server(app);//chua biet cong dung cua cai nay
var io  = require('socket.io')(server);
server.listen(8888);

var mang=[];

io.on('connection',function (socket) {
    console.log('co nguoi ket noi vao' + socket.id);
   //console.log(socket.adapter.rooms)//show tat ca cac room
    socket.on('hocvien-gui-thongtin',function (data) {

        mang.push(
            new HocVien(data.hoten,data.email,data.sdt)
        );
        io.sockets.emit('server-gui-ds',mang);
    })
})

function HocVien(hoten,email,sdt) {
    this.HoTen = hoten;
    this.Email = email;
    this.SDT = sdt;
}

app.get('/',function (req,res) {
    res.render('index')
})
