var http = require('http');
var fs = require('fs');

http.createServer(function (req,res) {
    console.log(__dirname +"/index.html");
    res.writeHead(200,{'Content-Type':'application/json'});
    //cach 1 dung fs
   /* var data = fs.readFileSync(__dirname + '/index.html','utf-8');
    data =data.replace("{name}","quoc tho");
    res.end(data);*/

   //cach 2 dung pipe
    /*fs.createReadStream(__dirname +'/index.html','utf-8').pipe(res);*/

    var obj= {
        ho:'pham',
        ten:'tho',
        namsinh:1009
    };
    res.end(JSON.stringify(obj));

}).listen(8888);