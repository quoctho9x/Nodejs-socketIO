/*
var buffer = new Buffer('hello','utf-8');
console.log(buffer);

//buffer to string
console.log(buffer.toString());
//buffer to json
console.log(buffer.toJSON());
*/

var fs= require('fs');

var noidung = fs.readFileSync(__dirname + '/danhsach.txt');

console.log(noidung)
console.log(noidung.toString());
