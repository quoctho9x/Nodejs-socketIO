/*import playVideo from './play';
import Peer from 'simple-peer';
import $ from 'jQuery';*/

export default function openStream(cb) {
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
        .then(
            stream =>{
                cb(stream);
            }
        )
        .catch(
            err => console.log(err)
        )
}


