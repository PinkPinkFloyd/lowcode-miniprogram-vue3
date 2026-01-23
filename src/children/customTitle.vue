<!--
 * @Description: 自定义标题
-->
<template>
    <div :style="{
        textAlign: data.textAlign,
        backgroundColor: data.bgColor,
        paddingTop: data.upDownEdge + 'px',
        paddingBottom: data.upDownEdge + 'px'
    }" class="mpp-customTitle">
        <div class="mpp-title">
            <section :style="{
                fontSize: data.titleSize + 'px',
                fontWeight: data.titleBold,
                color: data.titleColor
            }" class="mpp-title-con">{{ data.title || '标题内容' }}</section>
            <span class="mpp-title-more" :style="{
                color: data.moreColor,
            }" v-if="data.isMore">{{ data.moreText }}</span>
        </div>
        <div :style="{
            fontSize: data.subTitleSize + 'px',
            fontWeight: data.subTitleBold,
            color: data.subTitleColor
        }" v-if="data.subTitle" class="mpp-subtitle">{{ data.subTitle }}</div>
    </div>
</template>
<script>
export default {
    props: { data: Object },
}

</script>
<style lang="scss" scoped>
.mpp-customTitle {
    padding-left: 8px;
    padding-right: 8px;

    .mpp-title {
        position: relative;
    }

    .mpp-title-more {
        position: absolute;
        top: 3px;
        right: 0;
        z-index: 1;
    }
}
</style>