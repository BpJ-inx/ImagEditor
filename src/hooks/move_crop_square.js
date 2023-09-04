import { ref } from 'vue'


const crop = ref()
const img = ref()

export const moveCropSquare = () => {
    crop.value = document.querySelector('.crop_square');
    img.value = document.querySelector('.loadImg')


    crop.value.onmousedown = function (e) {
        if (e.target.classList.contains('south-west')) {

            function onMouseMove(e) {
                increaseSouth(e)
                increaseWest(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;

            };

        }
        else if (e.target.classList.contains('north-west')) {
            function onMouseMove(e) {
                increaseNorth(e)
                increaseWest(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;

            };

        }
        else if (e.target.classList.contains('north-east')) {

            function onMouseMove(e) {
                increaseNorth(e)
                increaseEast(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;
            };

        }
        else if (e.target.classList.contains('south-east')) {

            function onMouseMove(e) {
                increaseSouth(e)
                increaseEast(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;
            };
        }
        else if (e.target.classList.contains('south')) {

            function onMouseMove(e) {
                increaseSouth(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;
            }
        }

        else if (e.target.classList.contains('north')) {

            function onMouseMove(e) {
                increaseNorth(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;

            };


        }
        else if (e.target.classList.contains('west')) {

            function onMouseMove(e) {
                increaseWest(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;
            };

        }
        else if (e.target.classList.contains('east')) {

            function onMouseMove(e) {
                increaseEast(e)
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove)

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;

            }
        } else {

            let shiftX = e.clientX - crop.value.getBoundingClientRect().left;;
            let shiftY = e.clientY - crop.value.getBoundingClientRect().top;;

            moveAt(e.pageX, e.pageY);

            function moveAt(pageX, pageY) {
                crop.value.style.left = pageX - shiftX + 'px';
                crop.value.style.top = pageY - shiftY + 'px';

            }

            function onMouseMove(e) {
                moveAt(e.clientX, e.clientY);
                cropInImgBox()
            }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                crop.value.onmouseup = null;

            };
        }
    };


    crop.value.ondragstart = function () {
        return false;
    }

}


export function cropInImgBox() {
    if (crop.value.getBoundingClientRect().left <= img.value.getBoundingClientRect().left) {
        crop.value.style.left = img.value.getBoundingClientRect().left + 'px'
    }
    if (crop.value.getBoundingClientRect().top <= img.value.getBoundingClientRect().top) {
        crop.value.style.top = img.value.getBoundingClientRect().top + 'px'
    }
    if (crop.value.getBoundingClientRect().right >= img.value.getBoundingClientRect().right) {
        crop.value.style.left = img.value.getBoundingClientRect().right - crop.value.getBoundingClientRect().width + 'px'
    }
    if (crop.value.getBoundingClientRect().bottom >= img.value.getBoundingClientRect().bottom) {
        crop.value.style.top = img.value.getBoundingClientRect().bottom - crop.value.getBoundingClientRect().height - 4.5 + 'px'
    }
}


function increaseSouth(e) {

    let posBot = crop.value.getBoundingClientRect().bottom

    let numberToIncreaseBot;
    if (e.clientY > img.value.getBoundingClientRect().bottom) {
        numberToIncreaseBot = 0
    } else {
        numberToIncreaseBot = e.clientY - posBot
    }
    if (numberToIncreaseBot != 0) {
        crop.value.style.height = crop.value.getBoundingClientRect().height - 4.5 + numberToIncreaseBot + "px";
    } else {
        crop.value.style.height = crop.value.getBoundingClientRect().height
    }

    if (crop.value.getBoundingClientRect().height < 100) {
        crop.value.style.height = 100 + 'px'
    }


}

function increaseEast(e) {

    let posRight = crop.value.getBoundingClientRect().right

    let numberToIncreaseRight;
    if (e.clientX >= img.value.getBoundingClientRect().right) {
        numberToIncreaseRight = 0
    } else {
        numberToIncreaseRight = e.clientX - posRight
    }

    crop.value.style.width = crop.value.getBoundingClientRect().width + numberToIncreaseRight + "px";
    if (crop.value.getBoundingClientRect().width < 100) {
        crop.value.style.width = '100px'
    }

    if (crop.value.getBoundingClientRect().height < 100) {
        crop.value.style.height = 100 + 'px'
    }
}

function increaseWest(e) {

    let posLeft = crop.value.getBoundingClientRect().left

    let numberToIncreaseLeft;
    if (e.clientX <= img.value.getBoundingClientRect().left) {
        numberToIncreaseLeft = 0
    } else {
        numberToIncreaseLeft = posLeft - e.clientX
    }

    crop.value.style.left = e.clientX + 'px'
    if (crop.value.style.left >= posLeft + crop.value.getBoundingClientRect().width + 'px') {
        crop.value.style.left = posLeft + 'px'
    }

    crop.value.style.width = crop.value.getBoundingClientRect().width + numberToIncreaseLeft + "px";

    if (crop.value.getBoundingClientRect().width <= 100) {
        crop.value.style.width = '100px'
        crop.value.style.left = posLeft + 'px'
    }

    if (crop.value.getBoundingClientRect().height < 100) {
        crop.value.style.height = 100 + 'px'
    }
}

function increaseNorth(e) {
    let posTop = crop.value.getBoundingClientRect().top
    let numberToIncreaseTop;

    if (e.clientY < img.value.getBoundingClientRect().top) {
        numberToIncreaseTop = 0
    } else {
        numberToIncreaseTop = posTop - e.clientY
    }

    crop.value.style.top = e.clientY + 'px'

    crop.value.style.height = crop.value.getBoundingClientRect().height + numberToIncreaseTop + "px";


    if (crop.value.getBoundingClientRect().height < 100) {
        crop.value.style.height = 100 + 'px'
    }

    if (crop.value.style.height == 100 + 'px') {
        crop.value.style.top = posTop + 'px'
    }
}