function loadFile(input) {
    var file = input.files[0];

    // 업로드한 이미지 보여주기 (이미지 div 생성)
    var ImagePreview = document.querySelector('.preview');
    var Image = document.createElement("img");
    
    ImagePreview.innerHTML = "";

    Image.setAttribute("class", "img");
    Image.src = URL.createObjectURL(file);


    Image.style.width = "400px";
    Image.style.height = "550px";
    Image.style.margin = "auto";
    Image.style.marginBottom = "15px";
    Image.style.border = "1px solid gray";
    Image.style.objectFit = "contain";
    ImagePreview.appendChild(Image);

}
