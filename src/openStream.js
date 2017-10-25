/*import playVideo from './play';
import Peer from 'simple-peer';
import $ from 'jQuery';*/
import playVideo from './play';

export default function openStream(cb) {
    var config = {audio:true,video:true}
    navigator.mediaDevices.getUserMedia(config)
        .then(
            stream =>{
                cb(stream);
            }
        )
        .catch(
            err => console.log(err)
        )
}


