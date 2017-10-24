var socket = io('http://localhost:8888/');

socket.on('server-send-rooms',function (data) {
    $('#list-room').html('');
    data.map(function (r) {
        $('#list-room').append("<h4 class='room'>"+r+"</h4>")
    })
})
socket.on('server-send-room-socket',function (data) {
    $('.roomHienTai').html(data);
})
socket.on('server-chat',function (data) {
    $('.list-msg').append("<p class=''>"+data+"</p>")
})

$(document).ready(function () {
    $('#btn-room').on('click',function () {
        socket.emit('tao-room',$('#txt-tenroom').val());
    })
    $('#txt-Send-Message').on('click',function () {
        socket.emit('user-chat',$('#txt-Message').val());
    })

})