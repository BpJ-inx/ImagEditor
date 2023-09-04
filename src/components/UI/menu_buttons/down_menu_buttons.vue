<template>
    <div class="menu_buttons">
        <button title="Загрузить">
            <label for="file1">
                <upload_butt_icon></upload_butt_icon>
            </label>
            <input type="file" id="file1" accept="image/*" hidden @change="save()">
        </button>
        <button @click="cancel" title="Назад">
            <back_icon></back_icon>
        </button>
        <button @click="mirrorPreview('horiz')" title="Отразить по горизонтали">
            <reflect_horizont_icon></reflect_horizont_icon>
        </button>
        <button @click="mirrorPreview('vert')" title="Отразить по вертикали">
            <reflect_vert_butt_icon></reflect_vert_butt_icon>
        </button>
        <button @click="croping" title="Обрезать">
            <crop_but_icon></crop_but_icon>
        </button>
        <button @click="rotate('left')" title="Повернуть против часовой">
            <rotate_left_icon></rotate_left_icon>
        </button>
        <button @click="rotate('right')" title="Повернуть по часовой">
            <rotate_right_icon></rotate_right_icon>
        </button>
        <button @click="cancelBack" title="Вперед">
            <back_reverse_icon></back_reverse_icon>
        </button>
        <button @click="downloadCrop" title="Скачать">
            <download_butt_icon></download_butt_icon>
        </button>
    </div>
</template>

<script>
import { save } from '../../../hooks/add_image.js'
import { croping, downloadCrop, rotate, mirrorPreview, cancel, cancelBack } from '../../../hooks/edit_image.js'

export default {
    name: 'down_menu_buttons',
    setup() {
        return {
            save,
            croping,
            downloadCrop,
            rotate,
            mirrorPreview,
            cancel,
            cancelBack
        }
    }
}
</script>

<style lang="scss" scoped>
.menu_buttons {
    margin-top: 225px;
    
}

input[type="file"] {
    display: none;
}

label {
    cursor: pointer;
}</style>