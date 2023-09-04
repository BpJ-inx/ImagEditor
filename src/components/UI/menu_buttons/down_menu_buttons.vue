<template>
    <div class="menu_buttons">
        <upload_butt></upload_butt>
        <back_butt @click="cancel" title="Назад"></back_butt>
        <reflect_horizont_butt @click="mirrorPreview('horiz')" title="Отразить по горизонтали"></reflect_horizont_butt>
        <reflect_vert_butt @click="mirrorPreview('vert')" title="Отразить по вертикали"></reflect_vert_butt>
        <crop_butt @click="croping" title="Обрезать"></crop_butt>
        <rotate_left_butt @click="rotate('left')" title="Повернуть против часовой"></rotate_left_butt>
        <rotate_right_butt @click="rotate('right')" title="Повернуть по часовой"></rotate_right_butt>
        <back_reverse_butt @click="cancelBack" title="Вперед"></back_reverse_butt>
        <download_butt @click="downloadCrop" title="Скачать"></download_butt>
    </div>
</template>

<script>

import { croping, downloadCrop, rotate, mirrorPreview, cancel, cancelBack } from '../../../hooks/edit_image.js'

export default {
    name: 'down_menu_buttons',
    setup() {
        return {
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
    display: flex;
    flex-direction: row;
}

input[type="file"] {
    display: none;
}

label {
    cursor: pointer;
}
</style>