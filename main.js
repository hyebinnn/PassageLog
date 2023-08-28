// node
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// var http = require('http');
import http from 'http';
import fs from 'fs';
import dir from 'console';
import path from 'path';
const __dirname = path.resolve();
// var fs = require('fs');
// const { dir } = require('console');

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
    console.log(__dirname + url)
    response.end(fs.readFileSync(__dirname+url));
});





// import { spawn } from 'child_process';

// function loadFile(input, img_name) {
//     var file = input.files[0];
    
//     // 업로드한 이미지 보여주기 (이미지 div 생성)
//     var ImagePreview = document.querySelector('.preview');
//     var Image = document.createElement("img");
    
//     ImagePreview.innerHTML = "";
    
//     Image.setAttribute("class", "img");
//     Image.src = URL.createObjectURL(file);          // file의 url 주소 만들어서 img 태그의 src로 설정
    
//     Image.style.width = "400px";
//     Image.style.height = "550px";
//     Image.style.margin = "auto";
//     Image.style.marginBottom = "15px";
//     Image.style.border = "1px solid gray";
//     Image.style.objectFit = "contain";
//     ImagePreview.appendChild(Image);
//     DownLoadImg(Image);
    
//     function DownLoadImg(img) {             // Download Image file on local
//         var a = document.createElement("a");
//         a.style = "display: none";
//         a.href = img.src;
//         a.download = img_name;
//         document.body.appendChild(a);
//         a.click();
//     }
// }


// function ImgOCR(name) {
//     // python file 불러오기
//     const cp = require('child_process').spawn;
//     const result = cp.spawn('python', ['OCR.py', name]);
    
//     console.log(name)
//     console.log(result)
    
//     result.stdout.on('data', function(data) {
//         console.log(data.toString());
//     });
// }

app.listen(3000, function() {
    console.log("server is running!");
});