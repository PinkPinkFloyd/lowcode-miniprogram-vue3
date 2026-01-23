<!--
 * @Description: 页面设置
-->
<template>
    <div class="mpp-pageSetting">
        <section>{{ data.shopName }}</section>
    </div>
</template>
<script>
export default {
    props: { data: Object },
    data() {
        return {

        }
    }
}

</script>
<style lang="scss" scoped>
.mpp-pageSetting {
    height: 64px;
    background-image: url('/img/phone-header.png');
    background-size: 100% 100%;

    section {
        font-size: 18px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 30px;
        max-width: 190px;
        margin: auto;
    }
}
</style>