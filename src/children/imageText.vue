<!--
 * @Description: 图文导航
-->
<template>
    <div :style="{ backgroundColor: data.bgColor, color: data.fontColor }" class="mpp-imageText">
        <template v-if="data.styleType == 1">
            <div v-if="data.list.length > 0" class="mpp-imageText-box">
                <div :style="{ width: 'calc(100% /' + data.list.length + ')' }" class="mpp-imageText-item"
                    v-for="(item, index) in  data.list " :key="index">
                    <img v-if="item.imgUrl" ref="imageText" @load="imgLoaded($event)" class="mpp-imageText-img"
                        :src="item.imgUrl" alt="">
                    <img v-else ref="imageText" @load="imgLoaded($event)" class="mpp-imageText-img"
                        src="/img/mp-default.jpg" alt="">
                    <!-- <section v-else ref="imageText" class="mpp-imageText-bg"></section> -->
                    <section class="mpp-imageText-name">{{ item.navName }}</section>
                </div>
            </div>
            <div v-else class="mpp-imageText-box">
                <div style="width: calc(100% / 5);" class="mpp-imageText-item" v-for="( item, index ) in  5 " :key="index">
                    <!-- <section ref="imageText" class="mpp-imageText-bg"></section> -->
                    <img ref="imageText" @load="imgLoaded($event)" class="mpp-imageText-img" src="/img/mp-default.jpg"
                        alt="">
                    <section class="mpp-imageText-name">导航标题</section>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-if="data.list.length > 0" class="mpp-text-box">
                <section v-for="(item, index) in  data.list " :key="index">{{ item.navName }}</section>
            </div>
            <div v-else class="mpp-text-box">
                <section v-for="(item, index) in  5" :key="index">导航标题</section>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: { data: Object },
    methods: {
        init() {
            if (this.$refs.imageText) {
                this.$refs.imageText.forEach(item => {
                    item.style.height = item.clientWidth + 'px'
                })
            }

        },
        imgLoaded(e) {
            this.$nextTick(() => {
                this.init();
            });
            // let img = e.target;
            // img.style.height = img.clientWidth + 'px'
        },

    },
    watch: {
        'data.list'() {
            this.$nextTick(() => {
                this.init();
            });
        },
        'data.styleType'() {
            this.$nextTick(() => {
                this.init();
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },
}

</script>
<style lang="scss" scoped>
.mpp-imageText {
    .mpp-imageText-box {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        .mpp-imageText-item {
            padding: 12px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
        }

        .mpp-imageText-bg {
            background-color: #eeeeee;
            width: 100%;
        }

        .mpp-imageText-img {
            // object-fit: scale-down;
            width: 100%;
        }

        .mpp-imageText-name {
            margin-top: 6px;
            font-size: 12px;
            // min-height: 18px;
        }
    }

    .mpp-text-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        section {
            padding: 12px;
            text-align: center;
            flex: 1;
        }
    }
}
</style>