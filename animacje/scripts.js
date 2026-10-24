/* LOGOS */
const body = document.getElementsByTagName('body')[0];
const boxWrapper = document.getElementsByClassName('box-wrapper')[0];

let objectsImg = document.querySelectorAll('.object');
let objectsWrapper = document.getElementsByClassName('objects-panel')[0];


objectsWrapper.addEventListener('mouseenter', function (event) {
    body.style.overflow = 'hidden';
});

objectsWrapper.addEventListener('mouseleave', function (event) {
    body.style.overflow = 'auto';
});


let closeIcon = document.createElement('i');
closeIcon.classList.add('far', 'fa-times-circle');

let floatSliderX = document.getElementsByClassName('float-slider-x')[0];
let floatSliderY = document.getElementsByClassName('float-slider-y')[0];

let floatBox = document.createElement('div');
floatBox.classList.add('box', 'box-float');

let objectsArr = [];

function floatObject(object, img, close, floatBox, sliderX, sliderY) {
    this.object = object;
    this.img = img;
    this.close = close;
    this.floatBox = floatBox;
    this.sliderX = sliderX;
    this.sliderY = sliderY;
}

Array.from(objectsImg).forEach(img => {

    let object = img;
    // let floatImg;
    // if(img.nextSibling) {
    //     // floatImg = img.nextSibling;
    //     console.log(img.nextSibling);
    // } else {
    //     // floatImg = img.cloneNode();
    // }
    let panelImg = img.getElementsByClassName('panel-img')[0];
    let floatImg = img.getElementsByClassName('float-img')[0];

    let objectClose = closeIcon.cloneNode();
    let objectFloatBox = floatBox.cloneNode();

    if(floatImg) {
        objectFloatBox.appendChild(floatImg);
    } else {
        floatImg = panelImg.cloneNode();
        objectFloatBox.appendChild(floatImg);
    }
    let objectFloatSliderX = floatSliderX.cloneNode();
    let objectFloatSliderY = floatSliderY.cloneNode();

    var currentfloatObject = new floatObject(object, panelImg, objectClose, objectFloatBox, objectFloatSliderX, objectFloatSliderY);

    objectsArr.push(currentfloatObject);

}, false);


let addedObjects = document.getElementsByClassName('object added');
let addedFloatBoxes = document.getElementsByClassName('box-float');
let addedObjectsSlidersX = document.getElementsByClassName('float-slider-x');
let addedObjectsSlidersY = document.getElementsByClassName('float-slider-y');

Array.from(objectsArr).forEach(obj => {

    obj.img.addEventListener('click', function (e) {

        [].forEach.call(objectsArr, function (el) {
            el.object.classList.remove("active");
            el.sliderX.style.display = 'none';
            el.sliderY.style.display = 'none';
        });

        obj.object.classList.add('active');
        obj.sliderX.style.display = 'block';
        obj.sliderY.style.display = 'block';


        if (!obj.object.classList.contains('added')) {
            obj.object.classList.add('added');
            obj.object.appendChild(obj.close);
            boxWrapper.appendChild(obj.floatBox);
            boxWrapper.appendChild(obj.sliderX);
            boxWrapper.appendChild(obj.sliderY);
        }
        
    });

    obj.sliderX.addEventListener('input', function (e) {
        obj.floatBox.style.left = this.value + '%';
    });

    obj.sliderY.addEventListener('input', function (e) {
        obj.floatBox.style.top = this.value + '%';
    });

    obj.close.addEventListener('click', function (e) {

        obj.object.classList.remove('added', 'active');

        if(addedObjects.length > 0) {
            addedObjects[addedObjects.length - 1].classList.add('active');
            addedObjectsSlidersX[addedObjectsSlidersX.length - 1].style.display = 'block';
            addedObjectsSlidersY[addedObjectsSlidersY.length - 1].style.display = 'block';
        }  
        
        obj.close.remove();
        obj.floatBox.style.top = '33.33%';
        obj.floatBox.style.left = '33.33%';
        obj.sliderX.value = '33.33%';
        obj.sliderY.value = '33.33%';
        obj.floatBox.remove();
        obj.sliderX.remove();
        obj.sliderY.remove();
    
    });
});



/* INICJUM */

let radialEllipse = document.getElementsByClassName('radial-ellipse');
let radialEllipseRotateSlider = document.getElementsByClassName('radial-ellipse-rotate-slider')[0];

radialEllipseRotateSlider.addEventListener('input', function (e) {
    radialEllipse[0].style.transform = 'rotate(' + (radialEllipseRotateSlider.value - 180) + 'deg)';
});

let radialEllipseWidthSlider = document.getElementsByClassName('radial-ellipse-width-slider')[0];

radialEllipseWidthSlider.addEventListener('input', function (e) {
    radialEllipse[0].style.width = radialEllipseWidthSlider.value + '%';
    radialEllipse[0].style.left = 'calc(50% - ' + radialEllipseWidthSlider.value / 2 + '%)';
});

/* METANOJA */

const metanoja = document.getElementById('metanoja');

let metanojaBg = document.getElementsByClassName('metanoja-bg')[0];
let metanojaCircle = document.getElementsByClassName('metanoja-circle')[0];
let metanojaRadialEllipse = metanoja.getElementsByClassName('radial-ellipse')[0];

let metanojaBgSlider = document.getElementsByClassName('metanoja-bg-slider')[0];
let metanojaCircleSlider = document.getElementsByClassName('metanoja-circle-slider')[0];

let metanojaBgReset = document.getElementsByClassName('metanoja-bg-reset')[0];
let metanojaCircleReset = document.getElementsByClassName('metanoja-circle-reset')[0];


metanojaBgSlider.addEventListener('input', function (e) {
    metanojaBg.style.transformOrigin = 'center';
    metanojaBg.style.transform = 'rotate(' + (metanojaBgSlider.value - 180) + 'deg)';
});

metanojaCircleSlider.addEventListener('input', function (e) {
    metanojaCircle.style.transformOrigin = 'center';
    metanojaCircle.style.transform = 'rotate(' + (metanojaCircleSlider.value - 180) + 'deg)';
    metanojaRadialEllipse.style.transform = 'rotate(' + (metanojaCircleSlider.value - 90) + 'deg)';
});

metanojaBgReset.addEventListener('click', function (e) {
    metanojaBgSlider.value = 180;
});

metanojaCircleReset.addEventListener('click', function (e) {
    metanojaCircleSlider.value = 180;
});

/* METANOJA RADIAL ELLIPSE */

let metanojaRadialEllipseWidthSlider = metanoja.getElementsByClassName('radial-ellipse-width-slider')[0];

// metanojaRadialEllipseWidthSlider.addEventListener('input', function (e) {
//     metanojaRadialEllipse[0].style.width = metanojaRadialEllipseWidthSlider.value + '%';
//     metanojaRadialEllipse[0].style.height = metanojaRadialEllipseWidthSlider.value + '%';
//     metanojaRadialEllipse[0].style.left = 'calc(50% - ' + metanojaRadialEllipseWidthSlider.value / 2 + '%)';
//     metanojaRadialEllipse[0].style.top = 'calc(50% - ' + metanojaRadialEllipseWidthSlider.value / 2 + '%)';
// });

metanojaRadialEllipseWidthSlider.addEventListener('input', function (e) {
    metanojaRadialEllipse.style.width = metanojaRadialEllipseWidthSlider.value + '%';
    metanojaRadialEllipse.style.left = 'calc(50% - ' + metanojaRadialEllipseWidthSlider.value / 2 + '%)';
    metanojaRadialEllipse.style.opacity = 'calc(' + metanojaRadialEllipseWidthSlider.value / 200 + ')';
});

/* PRECYZJA */

const precyzja = document.getElementById('precyzja');

let bgLightSlider = document.getElementsByClassName('light-bg-slider')[0];
let bgImg = document.getElementsByClassName('bg-img')[0];

let circleLightSlider = document.getElementsByClassName('light-circle-slider')[0];
let circle = document.getElementsByClassName('circle')[0];

bgLightSlider.addEventListener('input', function (e) {
    bgImg.style.filter = 'brightness(' + bgLightSlider.value / 100 + ')';
});

circleLightSlider.addEventListener('input', function (e) {
    circle.style.filter = 'brightness(' + circleLightSlider.value / 100 + ')';
});

/* PRECYZJA RADIAL CIRCLE */

let precyzjaRadialCircle = precyzja.getElementsByClassName('radial-circle')[0];

let precyzjaRadialCircleSizeSlider = precyzja.getElementsByClassName('radial-circle-size-slider')[0];

precyzjaRadialCircleSizeSlider.addEventListener('input', function (e) {
    precyzjaRadialCircle.style.width = precyzjaRadialCircleSizeSlider.value + '%';
    precyzjaRadialCircle.style.height = precyzjaRadialCircleSizeSlider.value + '%';
    precyzjaRadialCircle.style.opacity = 'calc(' + precyzjaRadialCircleSizeSlider.value / 400 + ')';
    precyzjaRadialCircle.style.left = 'calc(50% - ' + precyzjaRadialCircleSizeSlider.value / 2 + '%)';
    precyzjaRadialCircle.style.top = 'calc(50% - ' + precyzjaRadialCircleSizeSlider.value / 2 + '%)';
});

// let floatSlider = document.getElementsByClassName('float-slider')[0];
// let floatBox = document.getElementsByClassName('box-float');

// floatSlider.addEventListener('input', function (e) {
//     floatBox[0].style.left = floatSlider.value + '%';
// });


/* ROZDZIELNOSC */

const rozdzielnosc = document.getElementsByClassName('transform-circle')[0];

let rotateSliderLeft = document.getElementsByClassName('rotate-circle-left')[0];
let rotateSliderLine = document.getElementsByClassName('rotate-circle-line')[0];
let rotateSliderRight = document.getElementsByClassName('rotate-circle-right')[0];

/* ROZDZIELNOSC RADIAL CIRCLE */

let rozdzielnoscRadialCircle = rozdzielnosc.getElementsByClassName('radial-circle')[0];

console.log(rozdzielnoscRadialCircle);

let rozdzielnoscRadialCircleSizeSlider = rozdzielnosc.getElementsByClassName('radial-circle-size-slider')[0];

console.log(rozdzielnoscRadialCircleSizeSlider);

rozdzielnoscRadialCircleSizeSlider.addEventListener('input', function (e) {
    rozdzielnoscRadialCircle.style.width = rozdzielnoscRadialCircleSizeSlider.value + '%';
    rozdzielnoscRadialCircle.style.height = rozdzielnoscRadialCircleSizeSlider.value + '%';
    rozdzielnoscRadialCircle.style.opacity = 'calc(' + rozdzielnoscRadialCircleSizeSlider.value / 200 + ')';
    rozdzielnoscRadialCircle.style.left = 'calc(50% - ' + rozdzielnoscRadialCircleSizeSlider.value / 2 + '%)';
    rozdzielnoscRadialCircle.style.top = 'calc(50% - ' + rozdzielnoscRadialCircleSizeSlider.value / 2 + '%)';
});

var mySVG = document.getElementById("rozdzielnosc");

console.log(mySVG);

mySVG.addEventListener("load", function () {

    var svgDoc = mySVG.contentDocument;

    console.log(svgDoc);

    let circleLeft = svgDoc.getElementById("left");
    let circleLine = svgDoc.getElementById("line");
    let circleRight = svgDoc.getElementById("right");

    circleLeft.style.mixBlendMode = 'multiply';
    circleLeft.style.transition = '0.3s transform';
    circleLine.style.mixBlendMode = 'multiply';
    circleLine.style.transition = '0.3s transform';
    circleRight.style.mixBlendMode = 'multiply';
    circleRight.style.transition = '0.3s transform';

    rotateSliderLeft.addEventListener('input', function (e) {
        circleLeft.style.transformOrigin = 'center';
        circleLeft.style.transform = 'rotate(' + (rotateSliderLeft.value - 180) + 'deg)';
    });

    rotateSliderLine.addEventListener('input', function (e) {
        circleLine.style.transformOrigin = 'center';
        circleLine.style.transform = 'rotate(' + (rotateSliderLine.value - 180) + 'deg)';
    });

    rotateSliderRight.addEventListener('input', function (e) {
        circleRight.style.transformOrigin = 'center';
        circleRight.style.transform = 'rotate(' + (rotateSliderRight.value - 180) + 'deg)';
    });


    /* Reset to default */

    let resetCircleLeft = document.getElementsByClassName('default circle-left')[0];
    let resetCircleLine = document.getElementsByClassName('default circle-line')[0];
    let resetCircleRight = document.getElementsByClassName('default circle-right')[0];


    resetCircleLeft.addEventListener('click', function (e) {
        circleLeft.style.transform = 'rotate(0)';
        rotateSliderLeft.value = 180;
    });

    resetCircleLine.addEventListener('click', function (e) {
        circleLine.style.transform = 'rotate(0)';
        rotateSliderLine.value = 180;
    });

    resetCircleRight.addEventListener('click', function (e) {
        circleRight.style.transform = 'rotate(0)';
        rotateSliderRight.value = 180;
    });

}, false);


/* Reset to default */

let resetBg = document.getElementsByClassName('metanoja-bg-reset')[0];
let resetCircle = document.getElementsByClassName('metanoja-circle-reset')[0];

resetBg.addEventListener('click', function (e) {
    metanojaBg.style.transform = 'rotate(0)';
});

resetCircle.addEventListener('click', function (e) {
    metanojaCircle.style.transform = 'rotate(0)';
});



const inputs = document.getElementsByTagName('input');

Array.from(inputs).forEach(input => {
    input.addEventListener('touchmove', function (event) {
        this.blur();
    });
});