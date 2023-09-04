import { ref } from "vue";
import {
    actionMemory,
    actionMemoryPrew,
    historyCancel,
    historyCancelPrew,

} from '../hooks/edit_image.js'

export const image = ref()
export const prewImage = ref()
export const isImgUploaded = ref(false)

export const save = (file) => {
    let blobImg;
    if (file) {
        blobImg = new Blob([file.files[0]]);

    } else {
        blobImg = new Blob([file1.files[0]]);
    }
    if (blobImg) {
        image.value = URL.createObjectURL(blobImg)
    }


    var canvas = document.querySelector("#drawingCanvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();

    img.onload = function () {


        let aspectRatio = img.height / img.width;

        img.height = 400
        img.width = 400 / aspectRatio;

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(this, 0, 0, canvas.width, canvas.height)

        saveInVariables()

    }


    img.src = image.value

    let saveInVariables = () => {
        prewImage.value = canvas.toDataURL()
        isImgUploaded.value = true
        actionMemory.value = [];
        actionMemoryPrew.value = [];
        historyCancel.value = [];
        historyCancelPrew.value = [];
        actionMemory.value.push(img.src);
        actionMemoryPrew.value.push(canvas.toDataURL());
        setTimeout(() => {
            let crop = document.querySelector('.crop_square');

            let wrapperImg = document.querySelector('.wrapper_img');
            crop.style.height = '100px'
            crop.style.width = '100px'
            crop.style.top = wrapperImg.getBoundingClientRect().top + 'px'
            crop.style.left = wrapperImg.getBoundingClientRect().left + 'px'
        },1)

    }



}

export const dragAndDropForLoadImg = () => {
    let dropPlace = document.querySelector('.drop_place');
    function drag() {
        event.preventDefault()
        dropPlace.classList.add('border-black')
    };
    function unDrag() {
        event.preventDefault()
        dropPlace.classList.remove('border-black')
    }

    dropPlace.addEventListener('dragover', (e) => {
        drag(e)
    })
    dropPlace.addEventListener('dragenter', (e) => {
        drag(e)
    })
    dropPlace.addEventListener('dragleave', (e) => {
        unDrag(e)

    })
    dropPlace.addEventListener('drop', (e) => {
        let file = e.dataTransfer
        save(file);
        unDrag()
    })

}