var socket = io('https://quoctho.herokuapp.com/');

socket.on('server-gui-ds',function (data) {
    $('#ds').html('');
    data.map(function (hocvien,index) {
        $('#ds').append(
            "<div class='hocvien'>"
            +  "<div class='hang1'>id :"+ index +"<span>"+hocvien.HoTen+"</span></div>"
            +  "<div class='hang2'>"+hocvien.Email+"-"+hocvien.SDT+"</div>"
            +"</div>"
        );
    });

})

$(document).ready(function () {
    $('#btn-dangky').on('click',function () {
        socket.emit('hocvien-gui-thongtin', {hoten:$('#hoten').val(),email:$('#email').val(),sdt:$('#sdt').val()});
    })

})