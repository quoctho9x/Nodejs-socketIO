var socket = io('http://localhost:8888/');

socket.on('server-send-dki-thatbai',function () {
    alert('ten nay  da duoc dung');
});
socket.on('server-send-dki-thanhcong',function (data) {
    $('#current-user').html(data);
    $('#loginForm').hide();
    $('#chatForm').show();
});
socket.on('server-send-danhsach-user',function (data) {
    $('#box-content').html('');
    data.forEach(function (i) {
        $('#box-content').append("<div class='user-online'>"+i+"</div>");
    });
});
socket.on('server-send-message',function (data) {
    $('.list-msg').append("<div class='ms'>"+data.un+" : "+data.nd +"</div>");
});
socket.on('server-typing-start',function (data) {
    $('.status-typing').html('').show().append("<div class=''>"+data.un+" dang go</div>");
});
socket.on('server-typing-end',function (data) {
    $('.status-typing').html('').hide();
});


$(document).ready(function () {
    $('#loginForm').show();
    $('#chatForm').hide();

    $('#btn-register').on("click",function () {
        var user  =$('#txt-username').val();
        socket.emit('client-send-username',user);
    });
    $('#btn-logout').on("click",function () {
        socket.emit('logout');
        $('#chatForm').hide(2);
        $('#loginForm').show(1);
    });
    $('#txt-Send-Message').on("click",function () {
        socket.emit('user-send-message',$('#txt-Message').val());
    });
    $('#txt-Message').focusin(function () {
        socket.emit('user-typing-start');
    })
    $('#txt-Message').focusout(function () {
        socket.emit('user-typing-end');
    })

})