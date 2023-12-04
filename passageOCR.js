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

var loadingDiv = document.getElementById('loading');
var middleLine = document.querySelector('.middleLine');

var ocrBtn = document.querySelector('label[for="StartOCR"]');
ocrBtn.addEventListener('click', function() {
    console.log('image name is :', imgName);
    showLoading();
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

var ocrResultView = document.getElementById('OutputView');

async function executeOCR(imageName) {
    const response = await fetch(`/executeOCR/${imageName}`)
    var result = await response.text();
    console.log(result);
    
    ocrResultView.value = result;
    hideLoading();
}

function showLoading() {
    loadingDiv.style.display = 'block';
    middleLine.style.display = 'none';

}

function hideLoading() {
    middleLine.style.display = 'block';
    loadingDiv.style.display = 'none';
}

var modifyBtn = document.getElementById('modifyBtn');
modifyBtn.addEventListener('click', function() {
    if (modifyBtn.innerText == '✍🏻 수정하기') {
        ocrResultView.readOnly = false;
        modifyBtn.textContent = '💡 수정 완료';
    } else if (modifyBtn.innerText == '💡 수정 완료') {
        const Toast = Swal.mixin({
            toast: true,
            position: 'center-center',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        Toast.fire({
            icon: 'success',
            title: '수정이 완료되었습니다!'
        });
        ocrResultView.readOnly = true;
        modifyBtn.textContent = '✍🏻 수정하기';
    }
})

var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function() {
    console.log(ocrResultView.value)
})