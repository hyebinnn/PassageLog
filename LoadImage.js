// import spawn from 'child_process';


function loadFile(input, img_name) {
    var file = input.files[0];

    // 업로드한 이미지 보여주기 (이미지 div 생성)
    var ImagePreview = document.querySelector('.preview');
    var Image = document.createElement("img");
    
    ImagePreview.innerHTML = "";

    Image.setAttribute("class", "img");
    Image.src = URL.createObjectURL(file);          // file의 url 주소 만들어서 img 태그의 src로 설정

    Image.style.width = "400px";
    Image.style.height = "550px";
    Image.style.margin = "auto";
    Image.style.marginBottom = "15px";
    Image.style.border = "1px solid gray";
    Image.style.objectFit = "contain";
    ImagePreview.appendChild(Image);
    DownLoadImg(Image);
    
    function DownLoadImg(img) {             // Download Image file on local
        var a = document.createElement("a");
        a.style = "display: none";
        a.href = img.src;
        a.download = img_name;
        document.body.appendChild(a);
        a.click();
    }
}


function ImgOCR(name) {
    // const spawn = require('child_process').spawn;
    const result = spawn('python', ['OCR.py'], name);

    console.log(name)
    console.log(result)
}