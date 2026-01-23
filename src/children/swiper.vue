<!--
 * @Description: 图片广告
-->
<template>
    <div class="mpp-swiper" :style="{
        paddingTop: data.upDownEdge + 'px',
        paddingBottom: data.upDownEdge + 'px',
        paddingLeft: data.leftRightEdge + 'px',
        paddingRight: data.leftRightEdge + 'px'
    }">
        <el-carousel v-if="data.type == 1" :style="{
            borderRadius: data.borderRadius == 1 ? '8px' : '0',
        }" @change="Change" :class="classS()" height="145px" arrow="never"
            :indicator-position="data.pagination == 3 || data.pagination == 4 ? 'none' : ''"
            :interval="data.interval * 1000">
            <el-carousel-item v-for="(item, index) in data.list" :key="index">
                <img v-if="item.imgUrl" class="mpp-swiper-img" :src="item.imgUrl" alt="">
                <img v-else class="mpp-swiper-img" src="/img/default-swiper.png" alt="">
            </el-carousel-item>
            <div v-if="data.pagination == 3" class="custom_indicator">
                {{ index }} / {{ data.list.length }}
            </div>
        </el-carousel>
        <div v-else class="mpp-swiper-tile">
            <div class="mpp-swiper-tile-item"
                :style="[{ borderRadius: data.borderRadius == 1 ? '8px' : '0', }, style(index)]"
                v-for="(item, index) in data.list" :key="index">
                <img v-if="item.imgUrl" class="mpp-swiper-img" :src="item.imgUrl" alt="">
                <img v-else class="mpp-swiper-img" src="/img/default-swiper.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: { data: Object },
    data() {
        return {
            index: 1
        }
    },
    methods: {
        classS() {
            let className = ''
            switch (this.data.pagination) {
                case 1:
                    className = 'aa'
                    break;
                case 2:
                    className = 'bb'
                    break;
                case 3:
                    className = 'cc'
                    break;
                default:
                    break;

            }
            return className;
        },
        Change(val) {
            this.index = val + 1;
        },
        style(index) {
            if (index > 0) {
                return {
                    marginTop: this.data.upDownEdge + 'px'
                }
            }


        },
    },
}

</script>
<style lang="scss" scoped>
.mpp-swiper {
    .mpp-swiper-img {
        width: 100%;
        height: 100%;
    }

    .custom_indicator {
        bottom: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        position: absolute;
        list-style: none;
        margin: 0;
        padding: 0;
        z-index: 2;
        padding: 5px;
        color: #fff;

    }

    .el-carousel.aa {
        ::v-deep .el-carousel__indicator--horizontal {
            padding: 12px 3px;
        }

        ::v-deep .el-carousel__indicator {
            .el-carousel__button {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.6);
            }

            &.is-active button {
                background-color: rgba(255, 255, 255, 1);
            }
        }

    }

    .el-carousel.bb {
        ::v-deep .el-carousel__indicator--horizontal {
            padding: 12px 3px;
        }

        ::v-deep .el-carousel__indicator {
            .el-carousel__button {
                width: 10px;
                height: 4px;
                border-radius: 5px;
                background-color: rgba(0, 0, 0, 0.6);
            }

            &.is-active button {
                width: 16px;
                height: 4px;
                background-color: rgba(255, 255, 255, 1);
            }
        }
    }

    .mpp-swiper-tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .mpp-swiper-tile-item {
            height: 145px;
            width: 100%;
            overflow: hidden;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

}
</style>