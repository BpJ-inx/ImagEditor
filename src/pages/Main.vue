<template>
    <head_site></head_site>
    <div class="body">
        <div class="wrapper_img ">
            <drag_and_drop_place v-show="!isImgUploaded"></drag_and_drop_place>
            <crop_square v-show="isImgUploaded"></crop_square>

            <img :src="prewImage" class="loadImg border-2 border-gray-600 border-dashed" v-show="isImgUploaded" />

            <canvas id="drawingCanvas" class="hidden"></canvas>
        </div>
        <down_menu_buttons></down_menu_buttons>
    </div>
</template>

<script>

import { moveCropSquare } from '../hooks/move_crop_square.js'
import down_menu_buttons from '../components/UI/menu_buttons/down_menu_buttons.vue'
import { save, prewImage, isImgUploaded, dragAndDropForLoadImg } from '../hooks/add_image.js'


export default {
    data() {
        return {
            newHeight: 400,
        }
    },
    components: {
        down_menu_buttons,
    },
    mounted() {
        moveCropSquare();
        dragAndDropForLoadImg()


    },
    setup() {
        return {
            moveCropSquare,
            save,
            prewImage,
            isImgUploaded
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/pages_styles/main.scss';
</style>