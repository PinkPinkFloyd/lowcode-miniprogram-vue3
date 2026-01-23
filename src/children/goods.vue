<!--
 * @Description: 商品
-->
<template>
    <div class="mpp-goods">
        <template v-if="data.list.length == 0">
            <!-- 大图 -->
            <div v-if="data.listStyle == 1" class="mpp-goods1" :style="pageEdgeStyle()">
                <div class="mpp-goods1-item" :style="[style(), borderStyle(), goodsEdgeStyle(index)]"
                    v-for="(item, index) in 3" :key="index">
                    <img class="mpp-goods1-item-img" @load="imgLoaded($event)" ref="goodsImg" src="/img/mp-default.jpg"
                        alt="">
                    <section :style="[textStyle()]" class="mpp-goods1-item-tit">
                        这里显示商品名称，最多显示两行
                    </section>
                    <section class="mpp-goods1-item-price">登录后查看</section>
                </div>


            </div>
            <!-- 单列 -->
            <div v-else-if="data.listStyle == 2" class="mpp-goods2" :style="pageEdgeStyle()">
                <div class="mpp-goods2-item" :style="[style(), borderStyle(), goodsEdgeStyle(index)]"
                    v-for="(item, index) in 4" :key="index">
                    <img class="mpp-good2-item-img" @load="imgLoaded($event)" ref="goodsImg" src="/img/mp-default.jpg"
                        alt="">
                    <div class="mpp-good2-item-right">
                        <section :style="[textStyle()]" class="mpp-goods2-item-tit">
                            这里显示商品名称，最多显示两行
                        </section>
                        <section class="mpp-goods2-item-price">登录后查看</section>
                    </div>
                </div>
            </div>
            <!-- 双列 -->
            <div v-else-if="data.listStyle == 3" class="mpp-goods3" :style="pageEdgeStyle()">
                <div class="mpp-goods3-item" :style="[style(), borderStyle(), goodsEdgeStyle3(index),]"
                    v-for="(item, index) in 4" :key="index">
                    <img class="mpp-good3-item-img" @load="imgLoaded($event)" ref="goodsImg" src="/img/mp-default.jpg"
                        alt="">
                    <section :style="[textStyle()]" class="mpp-goods3-item-tit">
                        这里显示商品名称，最多显示两行
                    </section>
                    <section class="mpp-goods3-item-price">登录后查看</section>
                </div>
            </div>
            <!-- 上下 -->
            <div v-else-if="data.listStyle == 4" class="mpp-goods3" :style="pageEdgeStyle()">
                <div class="mpp-goods3-item" :style="[style(), borderStyle(), goodsEdgeStyle4(index),]"
                    v-for="(item, index) in 3" :key="index">
                    <img class="mpp-good3-item-img" @load="imgLoaded($event)" ref="goodsImg" src="/img/mp-default.jpg"
                        alt="">
                    <section :style="[textStyle()]" class="mpp-goods3-item-tit">
                        这里显示商品名称，最多显示两行
                    </section>
                    <section class="mpp-goods3-item-price">登录后查看</section>
                </div>
            </div>
        </template>
        <template v-else>
            <!-- 大图 -->
            <div v-if="data.listStyle == 1" class="mpp-goods1" :style="pageEdgeStyle()">
                <div class="mpp-goods1-item" :style="[style(), borderStyle(), goodsEdgeStyle(index)]"
                    v-for="(item, index) in data.list.slice(0,data.num)" :key="index">

                    <img v-if="item.productImage" class="mpp-goods1-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        :src="item.productImage" alt="">
                    <img v-else class="mpp-goods1-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        src="/img/mp-default.jpg" alt="">
                    <section :style="[textStyle()]" class="mpp-goods1-item-tit">
                        {{ item.productName }} {{ item.specificationModel }} {{ item.brandChName }}
                    </section>
                    <section v-if="item.untaxedUnitPrice" class="mpp-goods1-item-price">￥{{ subNumberCommon(item.untaxedUnitPrice, 2)[0] }} / {{ item.unitMeasurementName }}</section>
                    <section v-else class="mpp-goods1-item-price">待询价</section>
                </div>
            </div>
            <!-- 单列 -->
            <div v-else-if="data.listStyle == 2" class="mpp-goods2" :style="pageEdgeStyle()">
                <div class="mpp-goods2-item" :style="[style(), borderStyle(), goodsEdgeStyle(index)]"
                    v-for="(item, index) in data.list.slice(0,data.num)" :key="index">
                    <img v-if="item.productImage" class="mpp-good2-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        :src="item.productImage" alt="">
                    <img v-else class="mpp-good2-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        src="/img/mp-default.jpg" alt="">
                    <div class="mpp-good2-item-right">
                        <section :style="[textStyle()]" class="mpp-goods2-item-tit">
                            {{ item.productName }} {{ item.specificationModel }} {{ item.brandChName }}
                        </section>
                        <section v-if="item.untaxedUnitPrice" class="mpp-goods2-item-price">￥{{ subNumberCommon(item.untaxedUnitPrice, 2)[0] }} / {{ item.unitMeasurementName }}</section>
                        <section v-else class="mpp-goods2-item-price">待询价</section>
                    </div>
                </div>
            </div>
            <!-- 双列 -->
            <div v-else-if="data.listStyle == 3" class="mpp-goods3" :style="pageEdgeStyle()">
                <div class="mpp-goods3-item" :style="[style(), borderStyle(), goodsEdgeStyle3(index),]"
                    v-for="(item, index) in data.list.slice(0,data.num)" :key="index">
                    <img v-if="item.productImage" class="mpp-good3-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        :src="item.productImage" alt="">
                    <img v-else class="mpp-good3-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        src="/img/mp-default.jpg" alt="">
                    <section :style="[textStyle()]" class="mpp-goods3-item-tit">
                        {{ item.productName }} {{ item.specificationModel }} {{ item.brandChName }}
                    </section>
                    <section v-if="item.untaxedUnitPrice" class="mpp-goods3-item-price">￥{{ subNumberCommon(item.untaxedUnitPrice, 2)[0] }} / {{ item.unitMeasurementName }}</section>
                    <section v-else class="mpp-goods3-item-price">待询价</section>
                </div>
            </div>
            <!-- 上下 -->
            <div v-else-if="data.listStyle == 4" class="mpp-goods3" :style="pageEdgeStyle()">
                <div class="mpp-goods3-item" :style="[style(), borderStyle(), goodsEdgeStyle4(index),]"
                    v-for="(item, index) in data.list.slice(0,data.num)" :key="index">
                    <img v-if="item.productImage" class="mpp-good3-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        :src="item.productImage" alt="">
                    <img v-else class="mpp-good3-item-img" @load="imgLoaded($event)" ref="goodsImg"
                        src="/img/mp-default.jpg" alt="">
                    <section :style="[textStyle()]" class="mpp-goods3-item-tit">
                        {{ item.productName }} {{ item.specificationModel }} {{ item.brandChName }}
                    </section>
                    <section v-if="item.untaxedUnitPrice" class="mpp-goods3-item-price">￥{{ subNumberCommon(item.untaxedUnitPrice, 2)[0] }} / {{ item.unitMeasurementName }}</section>
                    <section v-else class="mpp-goods3-item-price">待询价</section>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: { data: Object },
    methods: {
        style() {
            if (this.data.goodsStyle == 1) {
                return {
                    backgroundColor: '#ffffff'
                };
            } else if (this.data.goodsStyle == 2) {
                return {
                    boxShadow: '0 2px 6px rgba(0,0,0,.1)'
                };
            } else if (this.data.goodsStyle == 3) {
                return {
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(230, 230, 230, 1)'
                };
            }


        },
        borderStyle() {
            if (this.data.goodsChamfer == 1) {
                return {
                    borderRadius: '6px'
                };
            } else if (this.data.goodsChamfer == 2) {
                return {
                    borderRadius: '0'
                };
            }


        },
        textStyle() {
            return {
                fontWeight: this.data.fontWeight
            };
        },
        pageEdgeStyle() {
            return {
                padding: this.data.pageEdge + 'px'
            }
        },
        goodsEdgeStyle(index) {
            return {
                marginTop: index > 0 ? this.data.goodsEdge + 'px' : '0'
            }
        },
        goodsEdgeStyle3(index) {
            return {
                marginTop: index > 1 ? this.data.goodsEdge + 'px' : '0',
                marginRight: index % 2 == 0 ? this.data.goodsEdge + 'px' : '0',
                width: `calc((100% - ${this.data.goodsEdge}px) / 2)`
            }
        },
        goodsEdgeStyle4(index) {
            return {
                marginTop: index > 0 ? this.data.goodsEdge + 'px' : '0',
                marginRight: (index + 1) % 2 == 0 ? this.data.goodsEdge + 'px' : '0',
                width: index == 0 ? '100%' : `calc((100% - ${this.data.goodsEdge}px) / 2)`


            }
        },
        imgLoad() {
            if (this.$refs.goodsImg) {
                this.$refs.goodsImg.forEach(item => {
                    if (this.data.imgRatio == 1) {
                        item.style.height = item.clientWidth + 'px'
                    } else {
                        item.style.height = (item.clientWidth / 3 * 2) + 'px'
                    }

                })
            }
        },
        imgLoaded(e) {
            let img = e.target;
            if (this.data.imgRatio == 1) {
                img.style.height = img.clientWidth + 'px'
            } else {
                img.style.height = (img.clientWidth / 3 * 2) + 'px'
            }

        },

    },
    watch: {
        'data.imgRatio'() {
            this.$nextTick(() => {
                this.imgLoad();
            });
        },
        'data.listStyle'() {
            this.$nextTick(() => {
                this.imgLoad();
            });
        },

    },
    mounted() {

    },
}

</script>
<style lang="scss" scoped>
.mpp-goods {
    $bgColor: rgba(242, 242, 242, 1);

    // 大图
    .mpp-goods1-item {
        overflow: hidden;
        padding-bottom: 8px;
    }

    .mpp-goods1-item-img {
        width: 100%;
        // object-fit: scale-down;
    }

    .mpp-goods1-item-tit {
        height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        margin-top: 5px;
        padding: 0 8px;
    }

    .mpp-goods1-item-price {
        padding: 0 8px;
        color: #F74747;
        margin-top: 5px;
    }

    // 单列
    .mpp-goods2-item {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        padding: 8px;
    }

    .mpp-good2-item-img {
        width: 102px;
    }

    .mpp-good2-item-right {
        width: calc(100% - 115px);
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;


    }

    .mpp-goods2-item-tit {
        height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
    }

    .mpp-goods2-item-price {
        color: #F74747;
    }

    // 双列
    .mpp-goods3 {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

    }

    .mpp-goods3-item {
        overflow: hidden;
    }

    .mpp-good3-item-img {
        width: 100%;
    }

    .mpp-goods3-item-tit {
        height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        padding: 0 8px;
        margin-top: 5px;
    }

    .mpp-goods3-item-price {
        color: #F74747;
        padding:8px;
    }


}
</style>