/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__play__ = __webpack_require__(1);

const socket = io('https://quoctho.herokuapp.com');
const peer = new Peer({key: '8hj8i7m8xoclq5mi'});

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
                Object(__WEBPACK_IMPORTED_MODULE_0__play__["a" /* default */])('localstream',stream);
                const call = peer.call(id,stream);
                call.on('stream',remoteStream => Object(__WEBPACK_IMPORTED_MODULE_0__play__["a" /* default */])('friendstream',remoteStream));
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
                Object(__WEBPACK_IMPORTED_MODULE_0__play__["a" /* default */])('localstream',stream);
                call.on('stream',remoteStream => Object(__WEBPACK_IMPORTED_MODULE_0__play__["a" /* default */])('friendstream',remoteStream));
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
                Object(__WEBPACK_IMPORTED_MODULE_0__play__["a" /* default */])('localstream',stream);
                const call = peer.call(id,stream);
                call.on('stream',remoteStream => Object(__WEBPACK_IMPORTED_MODULE_0__play__["a" /* default */])('friendstream',remoteStream));
            }
        )
        .catch(
            err => console.log(err)
        )
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = playVideo;
function playVideo(idVideo,stream) {
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.onloadedmetadata = function () {
        video.play();
    }
};




/***/ })
/******/ ]);