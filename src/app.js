import playVideo from './play';
import Peer from 'simple-peer';
import $ from 'jQuery';
import openStream from './openStream';
openStream(function (stream) {
    playVideo(stream,'localstream');
    const p  = new Peer({initiator:location.hash === "#1",stream: stream,trickle:false});
    p.on('signal',token => {
        $('#txtMySingal').val(JSON.stringify(token));
    });

    p.on('stream', friendStream => playVideo(friendStream,'friendstream'));

    $('#btnConnect').on('click',()=>{
        const friendSignal = JSON.parse($('#txtFriendSignal').val());
        p.signal(friendSignal);
    });
});
