// node

var http = require('http');
var fs = require('fs');
const {dir} = require('console');
require('./LoadImage.js');

var app = http.createServer(function(request, response){
    var url = request.url;
    if (request.url === '/') {
        url = '/UploadPage.html';
    }
 
    if (request.url === '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return ;
    }

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname+url));
});

app.listen(3000);