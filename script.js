const canvas = document.getElementById('ascii');
const img = new Image();
img.src = 'flower.png'; //all images taken from pixelbay

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const textScale = 12;
const boxArea = textScale * textScale;
const boxContent = boxArea * 4; //4 is getimagedata pixel colors
const asciiChars = ` .:,'-^=*+?!|0#X%WM@ ` //extra blank space is a jank fix for images with large blocks of transparency (for case where 255/12.75 causes undefined)

//next step: add calculator for parts of image with some transparency, assign char based on transparent pixels?
function getAveragedColor(data) {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    for (let i = 0; i < boxContent; i += 4) {
        r += data.data[i];
        g += data.data[i + 1];
        b += data.data[i + 2];
        a += data.data[i + 2];
    }
    r = Math.floor(r / boxArea);
    g = Math.floor(g / boxArea);
    b = Math.floor(b / boxArea);
    //a = Math.floor(a / boxArea);
    grey = (r + g + b) / 3;
    let colorArray = new Object();
    colorArray[0] = `rgb(${r} ${g} ${b})`;
    colorArray[1] = grey;
    //colorArray[2] = a; //alpha channel data;
    return colorArray;
}

img.onload = function () {
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);


    console.log('halt');
    for (let i = 0; i < img.width; i = i + textScale) {
        for (let j = 0; j < img.height; j = j + textScale) {
            const dataTest = ctx.getImageData(i, j, textScale, textScale);
            const colorData = getAveragedColor(dataTest);
            ctx.fillStyle = colorData[0];
            ctx.font = `${textScale * 2}px vt323`; //maybe change this multi
            ctx.clearRect(i, j, textScale, textScale);
            let printChar = asciiChars[Math.floor(colorData[1] / 12.75)];
            ctx.fillText(printChar, i, j);
        }
    }
};
