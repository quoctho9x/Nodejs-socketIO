import playVideo from './play';
const socket = io('https://quoctho.herokuapp.com');
const peer = new Peer({key: 'peerjs',host:'https://quoctho-peer.herokuapp.com',port:443,secure:true});

$('#chat').hide();

socket.on('DANH-SACH-ONLINE',arrayUserInfo =>{
    $('#chat').show();
    $('#dangky').hide();
    $("#list-user-online").html('');
    arrayUserInfo.forEach(user => {
        const {ten,peerId} = user;
        $("#list-user-online").append(`<li id="${peerId}"> ${ten}</li>`)
    });
});
socket.on('DANG-KY-THAT-BAI',()=>{
    alert('user name da ton tai, xin chon user khac');
});


function openStream() {
    var config = {audio: true, video: true}
    return navigator.mediaDevices.getUserMedia(config)
}


peer.on('open',id=>{
    $('#my-peer').append(id);
    $('#btn-signUp').on('click',()=>{
        const username = $('#txtUsername').val();
        socket.emit('NGUOI-DUNG-DANG-KY',{ten:username,peerId:id});
    });
});

//nguoi goi di
$("#btnCall").on('click',()=>{
    const id = $('#remoteId').val();
    openStream()
        .then(
            stream => {
                playVideo('localstream',stream);
                const call = peer.call(id,stream);
                call.on('stream',remoteStream => playVideo('friendstream',remoteStream));
            }
        )
        .catch(
            err => console.log(err)
        )
});
//nguoi nhan
peer.on('call',call =>{
    openStream()
        .then(
            stream => {
                call.answer(stream);
                playVideo('localstream',stream);
                call.on('stream',remoteStream => playVideo('friendstream',remoteStream));
            }
        )
        .catch(
            err => console.log(err)
        )

});

//Click to call
$('#list-user-online').on('click', 'li',function(){
    const id = $(this).attr('id');
    openStream()
        .then(
            stream => {
                playVideo('localstream',stream);
                const call = peer.call(id,stream);
                call.on('stream',remoteStream => playVideo('friendstream',remoteStream));
            }
        )
        .catch(
            err => console.log(err)
        )
});