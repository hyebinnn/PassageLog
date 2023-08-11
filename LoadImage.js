function loadFile(input) {
    var file = input.files[0];

    // 업로드한 이미지 보여주기 (이미지 div 생성)
    var ImagePreview = document.querySelector('.preview');
    var Image = document.createElement("img");
    
    ImagePreview.innerHTML = "";

    Image.setAttribute("class", "img");
    Image.src = URL.createObjectURL(file);


    Image.style.width = "500px";
    Image.style.height = "650px";
    Image.style.margin = "auto";
    Image.style.marginBottom = "15px";
    Image.style.objectFit = "contain";
    ImagePreview.appendChild(Image);

}