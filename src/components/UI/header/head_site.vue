<template>
    <div class="head_site">
        <a href="/">
            <site_icon class="flex cursor-pointer"></site_icon>
        </a>
        <a href="/">
            <site_name></site_name>
        </a>
    </div>
</template>

<script>
export default {
    name: 'head_site'
}
</script>

<style lang="scss" scoped>
.head_site {
    display: flex;
    width: 100%;
    height: 50px;
    padding: 14px 30px;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
    border-radius: 0px 0px 50px 50px;
    background: var(--gray-700, #495057);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.15);
}</style>