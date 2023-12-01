var fileInput = document.getElementById('uploadImgFile');
var imgName;

fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];

    if (file) {
        var formData = new FormData();
        formData.append('imgFile', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(fileName => {
                imgName = fileName;
                loadFile(imgName);
            });
    }
})


var ocrBtn = document.querySelector('label[for="StartOCR"]');
ocrBtn.addEventListener('click', function() {
    console.log('image name is :', imgName);
    executeOCR(imgName);
})

export function loadFile(imgName) {
    var imgPath = './uploads/' + imgName;
    console.log(imgPath);

    // 업로드한 이미지 보여주기 (이미지 div 생성)
    var ImagePreview = document.querySelector('.preview');
    var Image = document.createElement("img");
    
    ImagePreview.innerHTML = "";

    Image.setAttribute("class", "img");
    Image.src = imgPath;

    Image.style.width = "400px";
    Image.style.height = "500px";
    Image.style.margin = "auto";
    Image.style.marginBottom = "15px";
    Image.style.objectFit = "contain";
    ImagePreview.appendChild(Image);
}

async function executeOCR(imageName) {
    console.log('12', imageName)
    const response = await fetch(`/executeOCR/${imageName}`)
    const result = await response.text();
    console.log(result);

}

