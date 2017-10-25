export default function playVideo(idVideo,stream) {
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.onloadedmetadata = function () {
        video.play();
    }
};


