<template>
    <div class="crop_square">
        <div class='direction west'>
            <div class="direction north-west"></div>
            <div class="direction south-west"></div>
        </div>
        <div class="vertical">
            <div class='direction north'>
                <div class="direction north-east"></div>
            </div>
            <div class='direction south'>
                <div class="direction south-east"></div>
            </div>
        </div>
        <div class='direction east'>
        </div>
    </div>
</template>

<script>
export default {
    name: 'crop_square'
}
</script>

<style lang="scss" scoped>
.crop_square {
    width: 100px;
    height: 100px;
    border: 0px solid red;
    position: absolute;
    cursor: move;
    display: flex;
    flex-direction: row;
}


.west {
    cursor: ew-resize;
    left: -2.5px;
    width: 3px;
    height: 100%;
    background-color: rgb(255, 51, 51);
    position: relative;
    opacity: 0.7;
}

.east {
    cursor: ew-resize;
    bottom: -2px;
    left: 1.2px;
    width: 3px;
    height: 100%;
    background-color: rgb(255, 51, 51);
    position: relative;
    opacity: 0.7;
}

.north {
    cursor: ns-resize;
    top: -2.5px;
    height: 3px;
    background-color: rgb(255, 51, 51);
    position: relative;
    opacity: 0.7;
    width: 100%;
    left: 1px;
}

.south {
    cursor: ns-resize;
    bottom: -6.5px;
    left: 1px;
    height: 3px;
    background-color: rgb(255, 51, 51);
    position: relative;
    opacity: 0.7;
    width: 100%;
}

.vertical {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
}


.north-west {
    cursor: nwse-resize;
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    right: -3.5px;
    top: -6px;
    background-color: rgb(255, 51, 51);
    height: 10px;
    width: 10px;
}

.north-east {
    cursor: nesw-resize;
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    right: -6.5px;
    top: -3.5px;
    background-color: rgb(255, 51, 51);
    height: 10px;
    width: 10px;
}

.south-east {
    cursor: nwse-resize;
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    right: -6.5px;
    top: -3.5px;
    background-color: rgb(255, 51, 51);
    height: 10px;
    width: 10px;
}

.south-west {
    cursor: nesw-resize;
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    right: -3.5px;
    top: 100%;
    background-color: rgb(255, 51, 51);
    height: 10px;
    width: 10px;
}
</style>