import { prewImage, image } from '../hooks/add_image.js'
import { ref } from 'vue';

const cropCoordLeft = ref()
const cropCoordTop = ref()
export const wasRotate = ref(false)
export const actionMemory = ref([])
export const actionMemoryPrew = ref([])
export const historyCancel = ref([])
export const historyCancelPrew = ref([])


export const croping = () => {
    const crop = document.querySelector('.crop_square');
    let wrapperImg = document.querySelector('.wrapper_img')
    cropCoordLeft.value = crop.getBoundingClientRect().left - wrapperImg.getBoundingClientRect().left
    cropCoordTop.value = crop.getBoundingClientRect().top - wrapperImg.getBoundingClientRect().top
    let topCrop = cropCoordTop.value
    let leftCrop = cropCoordLeft.value

    let canvas = document.querySelector("#drawingCanvas");
    let ctx = canvas.getContext("2d");

    let img = new Image();

    img.onload = function () {
        let canvasWidth = crop.offsetWidth
        let canvasHeight = crop.offsetHeight

        if (wasRotate.value) {
            canvasWidth = crop.offsetHeight
            canvasHeight = crop.offsetWidth
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;


        ctx.drawImage(this, leftCrop, topCrop, crop.offsetWidth, crop.offsetHeight, 0, 0, canvasWidth, canvasHeight)
        saveInVariables()
        cropOriginalImg()

    }

    img.src = prewImage.value

    let saveInVariables = () => {
        prewImage.value = canvas.toDataURL()
        if (historyCancelPrew.value.length > 0) {
            actionMemoryPrew.value.push(historyCancelPrew.value.pop())

        }
        actionMemoryPrew.value.push(canvas.toDataURL())
        historyCancelPrew.value = [];


    }


    let cropOriginalImg = () => {

        img.onload = function () {
            let canvasWidth = this.naturalWidth;
            let canvasHeight = this.naturalHeight;

            if (wasRotate.value) {
                canvasWidth = this.naturalHeight;
                canvasHeight = this.naturalWidth;
            }

            let aspectRatio = canvasHeight / canvasWidth;

            let newHeight = 400;
            let newWidth = 400 / aspectRatio

            let diffTop = canvasHeight / newHeight
            let diffLeft = canvasWidth / newWidth

            canvas.width = newWidth;
            canvas.height = newHeight;

            let cropWith = crop.offsetWidth
            let cropHight = crop.offsetHeight

            let newHeightImg = cropHight * diffTop
            let newWidthImg = cropWith * diffLeft

            canvas.width = newWidthImg;
            canvas.height = newHeightImg;


            ctx.drawImage(this, leftCrop * diffLeft, topCrop * diffTop, newWidthImg, newHeightImg, 0, 0, newWidthImg, newHeightImg)

            saveInVariables()
            changePositionCropSquare()
        }

        img.src = image.value
        let saveInVariables = () => {
            image.value = canvas.toDataURL()

            if (historyCancel.value.length > 0) {
                actionMemory.value.push(historyCancel.value.pop())
            }

            actionMemory.value.push(image.value)
            historyCancel.value = [];

        }
    }

}

export const changePositionCropSquare = () => {
    let wrapperImg = document.querySelector('.wrapper_img');
    let crop = document.querySelector('.crop_square');
    let loadImmg = document.querySelector('.loadImg')

    crop.style.left = wrapperImg.getBoundingClientRect().left + 'px'
    crop.style.top = loadImmg.getBoundingClientRect().top + 'px'

    if (wasRotate.value && (crop.style.width > wrapperImg.getBoundingClientRect().height + 'px')) {
        crop.style.width = wrapperImg.getBoundingClientRect().height + 'px'

    }else if(wasRotate.value && (crop.style.height > loadImmg.getBoundingClientRect().height + 'px') ){
        crop.style.height = loadImmg.getBoundingClientRect().height + 'px'
    }
}

export const downloadCrop = () => {


    let url = image.value
    Object.assign(document.createElement('a'), { href: url, download: 'image.jpg' })
        .click();
    URL.revokeObjectURL(url);



}

export const rotate = (e) => {
    let degree;
    if (e == 'right') {
        degree = 90
    } else if (e == 'left') {
        degree = -90
    }

    if (wasRotate.value) {
        wasRotate.value = false
    } else {
        wasRotate.value = true
    }

    var canvas = document.querySelector("#drawingCanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image()

    img.onload = function () {

        canvas.width = img.height;
        canvas.height = img.width;

        ctx.translate(img.height / 2, img.width / 2,)
        ctx.rotate(degree * Math.PI / 180);
        ctx.drawImage(this, -img.width / 2, -img.height / 2)

        saveInVariables()
        changeRev()

    }

    img.src = image.value


    let saveInVariables = () => {
        image.value = canvas.toDataURL()

        if (historyCancel.value.length > 0) {
            actionMemory.value.push(historyCancel.value.pop())

        }

        actionMemory.value.push(canvas.toDataURL())
        historyCancel.value = [];
    }

    let changeRev = () => {
        rotatePreview(degree)
    }


}
const rotatePreview = (degree) => {

    var canvas = document.querySelector("#drawingCanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image()

    img.onload = function () {

        canvas.width = img.height;
        canvas.height = img.width;

        ctx.translate(img.height / 2, img.width / 2,)
        ctx.rotate(degree * Math.PI / 180);
        ctx.drawImage(this, -img.width / 2, -img.height / 2)

        saveInVariables()
        setTimeout(changePositionCropSquare,1)
    }

    img.src = prewImage.value

    let saveInVariables = () => {
        prewImage.value = canvas.toDataURL()
        if (historyCancelPrew.value.length > 0) {
            actionMemoryPrew.value.push(historyCancelPrew.value.pop())
        }
        actionMemoryPrew.value.push(canvas.toDataURL())
        historyCancelPrew.value = [];
        
    }
}
export const mirrorPreview = (type) => {
    let canvas = document.querySelector("#drawingCanvas");
    let ctx = canvas.getContext('2d');
    var img = new Image()

    img.src = prewImage.value
    if (type == 'horiz') {
        img.onload = function () {
            if (wasRotate.value) {
                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(img.width, 0);
                ctx.scale(-1, 1)

            } else {
                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(img.width, 0);
                ctx.scale(-1, 1);
            }
            ctx.drawImage(this, 0, 0);

            saveInVariables()
            changeOriginalImg()
        }



    } else if (type == 'vert') {
        img.onload = function () {
            if (wasRotate.value) {
                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(0, img.height);
                ctx.scale(1, -1)

            } else {
                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(0, img.height);
                ctx.scale(1, -1);
            }
            ctx.drawImage(this, 0, 0);

            saveInVariables()
            changeOriginalImg()
        }



    }

    let saveInVariables = () => {
        prewImage.value = canvas.toDataURL()
        if (historyCancelPrew.value.length > 0) {
            actionMemoryPrew.value.push(historyCancelPrew.value.pop())

        }
        actionMemoryPrew.value.push(canvas.toDataURL())
        historyCancelPrew.value = [];

    }

    let changeOriginalImg = () => {
        mirror(type)
    }
}
const mirror = (type) => {
    let canvas = document.querySelector("#drawingCanvas");
    let ctx = canvas.getContext('2d');
    var img = new Image()

    img.src = image.value

    if (type == 'horiz') {
        img.onload = function () {
            if (wasRotate.value) {

                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(img.width, 0);
                ctx.scale(-1, 1)

            } else {
                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(img.width, 0);
                ctx.scale(-1, 1);
            }
            ctx.drawImage(this, 0, 0);

            saveInVariables()
        }
    } else if (type == 'vert') {
        img.onload = function () {
            if (wasRotate.value) {
                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(0, img.height);
                ctx.scale(1, -1)

            } else {
                canvas.width = img.width
                canvas.height = img.height
                ctx.translate(0, img.height);
                ctx.scale(1, -1);
            }
            ctx.drawImage(this, 0, 0);

            saveInVariables()
        }
    }

    let saveInVariables = () => {
        image.value = canvas.toDataURL()
        if (historyCancel.value.length > 0) {
            actionMemory.value.push(historyCancel.value.pop())

        }
        actionMemory.value.push(canvas.toDataURL())
        historyCancel.value = [];
    }
}
export const cancel = () => {
    if (image.value == actionMemory.value.at(-1)) {
        historyCancel.value.push(actionMemory.value.pop())
        historyCancelPrew.value.push(actionMemoryPrew.value.pop())
    }
    if (actionMemory.value.length > 1) {
        historyCancel.value.push(actionMemory.value.at(-1))
        image.value = actionMemory.value.pop()
        historyCancelPrew.value.push(actionMemoryPrew.value.at(-1))
        prewImage.value = actionMemoryPrew.value.pop()

    } else if (actionMemory.value.length == 1) {
        image.value = actionMemory.value[0]
        prewImage.value = actionMemoryPrew.value[0]


    }

    setTimeout(changePositionCropSquare,1)
}
export const cancelBack = () => {
    if (image.value == historyCancel.value.at(-1)) {
        actionMemory.value.push(historyCancel.value.pop())
        actionMemoryPrew.value.push(historyCancelPrew.value.pop())
    }
    if (historyCancel.value.length > 1) {
        actionMemory.value.push(historyCancel.value.at(-1))
        image.value = historyCancel.value.pop()
        actionMemoryPrew.value.push(historyCancelPrew.value.at(-1))
        prewImage.value = historyCancelPrew.value.pop()
    } else if (historyCancel.value.length == 1) {
        image.value = historyCancel.value[0]
        prewImage.value = historyCancelPrew.value[0]
    }
    setTimeout(changePositionCropSquare,1)
}
