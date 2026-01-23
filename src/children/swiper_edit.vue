<!--
 * @Description: 图片广告-编辑
-->
<template>
    <div class="mp-swiperEdit">
        <div class="mp-right-tit">
            图片广告
            <span class="map-right-tit-tip">添加多张图片，可上下拖拽换序</span>
        </div>

        <div class="mp-right-body">
            <!-- 模板样式 -->
            <div class="mp-swiper-row">
                <section class="mp-right-row-tit">模板样式：</section>
                <el-radio-group v-model="model.type">
                    <el-radio-button :label="1">海报轮播</el-radio-button>
                    <el-radio-button :label="2">一行一个</el-radio-button>
                </el-radio-group>
            </div>

            <!-- 图片列表 -->
            <div class="mp-swiper-box">
                <draggable v-model="model.list" item-key="imgUrl">
                    <template #item="{ element, index }">
                        <div class="mp-swiper-item">
                            <div class="upload-market-img" :class="{ ff: element.imgUrl }">
                                <!-- <ImmediateUpload :domIdName="`swiperEdit${index}`"
                                    uploadFolderName="/images/websiteConfig/" :maxSize="5" :acceptList="acceptList"
                                    @returnSrc="links => getUploadLink(links, element)" /> -->
                                <img v-if="element.imgUrl" class="upload-goods__bg" :src="element.imgUrl" />
                                <div v-else class="upload-goods__text">
                                    <i class="el-icon-plus"></i>
                                    <section>添加图片</section>
                                </div>
                            </div>

                            <div class="swiper-item-right">
                                <el-select v-model="element.urlType" filterable placeholder="链接类型">
                                    <el-option v-for="opt in urlTypeOptions" :key="opt.value" :label="opt.label"
                                        :value="opt.value" />
                                </el-select>

                                <!-- 商品 -->
                                <el-input v-if="element.urlType === '0001'" v-model="element.productName"
                                    placeholder="选择商品" @click="openProduct(index)" />

                                <!-- 系统页面 -->
                                <el-select v-else-if="element.urlType === '0002'" v-model="element.systemPage">
                                    <el-option v-for="opt in systemPageOptions" :key="opt.urlType" :label="opt.label"
                                        :value="opt.urlType" />
                                </el-select>
                            </div>

                            <i class="el-icon-circle-close mp-swiper-close" @click="delItem(index)" />
                        </div>
                    </template>
                </draggable>

                <!-- <uploadImg
            v-if="model.list.length < 10"
            :max="10"
            :current="model.list.length"
            uploadFolderName="/images/websiteConfig/"
            :maxSize="5"
            @returnSrc="addItem"
          /> -->
            </div>
            <!-- 轮播速度 -->
            <div v-if="model.type === 1" class="mp-swiper-row">
                <section class="mp-right-row-tit">
                    轮播速度：
                </section>
                <div class="mp-swiper-interval">
                    <el-input-number style="width: 40px" v-model="model.interval" :precision="0" :controls="false"
                        :min="0" :max="5" />
                    <span>秒</span>
                </div>
            </div>

            <!-- 分页器 -->
            <div v-if="model.type === 1" class="mp-swiper-row">
                <section class="mp-right-row-tit">
                    分页器：
                </section>
                <el-radio-group v-model="model.pagination">
                    <el-radio-button :label="1">样式一</el-radio-button>
                    <el-radio-button :label="2">样式二</el-radio-button>
                    <el-radio-button :label="3">样式三</el-radio-button>
                    <el-radio-button :label="4">不展示</el-radio-button>
                </el-radio-group>
            </div>

            <!-- 图片倒角 -->
            <div class="mp-swiper-row">
                <section class="mp-right-row-tit">
                    图片倒角：
                </section>
                <el-radio-group v-model="model.borderRadius">
                    <el-radio-button :label="1">圆角</el-radio-button>
                    <el-radio-button :label="2">直角</el-radio-button>
                </el-radio-group>
            </div>

            <!-- 上下间距 -->
            <div class="mp-swiper-row">
                <section class="mp-right-row-tit">
                    上下间距：
                </section>

                <div style="flex: 1;">
                    <slisd :min="0" :max="50" :value="model.upDownEdge" :isDrag="true" bgColor="#2386ee"
                        @input="(val: number) => (model.upDownEdge = val)" />
                </div>

                <div class="mp-swiper-edge">
                    <el-input-number style="width: 68px" v-model="model.upDownEdge" :precision="0" :controls="false"
                        :min="0" :max="50" />
                </div>
            </div>

            <!-- 左右间距 -->
            <div class="mp-swiper-row">
                <section class="mp-right-row-tit">
                    左右间距：
                </section>

                <div style="flex: 1;">
                    <slisd :min="0" :max="50" :value="model.leftRightEdge" :isDrag="true" bgColor="#2386ee"
                        @input="(val: number) => (model.leftRightEdge = val)" />
                </div>

                <div class="mp-swiper-edge">
                    <el-input-number style="width: 68px" v-model="model.leftRightEdge" :precision="0" :controls="false"
                        :min="0" :max="50" />
                </div>
            </div>

        </div>
        <!-- 弹窗 -->
        <!-- <selProduct ref="selProductRef" :id="currentProductId" @get="getSelProduct" />
      <selArticle ref="selArticleRef" :id="currentArticleId" @get="getSelArticle" /> -->
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, inject } from 'vue'
    import draggable from 'vuedraggable'
    // import uploadImg from '../components/uploadImg.vue'
    import slisd from '../components/slisd.vue'
    // import selProduct from '../../pageDesign/components/selProduct.vue'
    // import selArticle from '../../pageDesign/components/selArticle.vue'
    import {
      urlTypeOptions,
      systemPageOptions
    } from '../const/miniprogram'
    
    /* ---------------- 类型定义 ---------------- */
    
    interface SwiperItem {
      imgUrl?: string
      urlType: string
      productId?: string
      productName?: string
      systemPage?: string
      categoryId?: string
      microPageId?: string
      articleTitle?: string
      webArticleId?: string
    }
    
    interface SwiperData {
      type: number
      list: SwiperItem[]
      interval?: number
      pagination?: number
      borderRadius?: number
      upDownEdge?: number
      leftRightEdge?: number
    }
    
    /* ---------------- props / emits ---------------- */
    
    const props = defineProps<{
      modelValue: SwiperData
    }>()
    
    const emit = defineEmits<{
      (e: 'update:modelValue', value: SwiperData): void
    }>()
    
    /**
     * v-model 代理
     * template 中统一使用 model.xxx
     */
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })
    
    /* ---------------- inject ---------------- */
    
    const root = inject<any>('root')
    
    /* ---------------- refs ---------------- */
    
    const selProductRef = ref<any>(null)
    const selArticleRef = ref<any>(null)
    
    const currentIndex = ref(0)
    const currentProductId = ref<string>('')
    const currentArticleId = ref<string>('')
    
    /* ---------------- 常量 ---------------- */
    
    const acceptList = ['.jpg', '.jpeg', '.png', '.bmp']
    
    /* ---------------- methods ---------------- */
    
    // 拖拽结束（占位，防止默认行为）
    const dragEnd = (e: Event) => {
      e.preventDefault()
    }
    
    // 删除图片
    const delItem = (index: number) => {
      model.value.list.splice(index, 1)
    }
    
    // 单个图片上传
    const getUploadLink = (links: string[], item: SwiperItem) => {
      if (links && links.length > 0) {
        item.imgUrl = links[0]
      }
    }
    
    // 添加图片
    const addItem = (links: string[]) => {
      if (links && links.length > 0) {
        model.value.list.push({
          imgUrl: links[0],
          urlType: '0001',
          productId: '',
          productName: '',
          systemPage: '',
          categoryId: '',
          microPageId: '',
          articleTitle: ''
        })
      }
    }
    
    // 选择商品
    const openProduct = (index: number) => {
      currentIndex.value = index
      currentProductId.value = model.value.list[index]!.productId || ''
      selProductRef.value.visible = true
    }
    
    const getSelProduct = (val: any) => {
      const item = model.value.list[currentIndex.value]
      item!.productName = val.productName
      item!.productId = val.skuId
    }
    
    // 选择文章
    const openArticle = (index: number) => {
      currentIndex.value = index
      currentArticleId.value = model.value.list[index]!.webArticleId || ''
      selArticleRef.value.visible = true
    }
    
    const getSelArticle = (val: any) => {
      const item = model.value.list[currentIndex.value]
      item!.webArticleId = val.webArticleId
      item!.articleTitle = val.articleTitle
    }
    </script>
    

<style lang="scss" scoped>
$color: #2386ee;
$bgColor: rgba(242, 242, 242, 1);
$borderColor: rgba(230, 230, 230, 1);



.mp-swiperEdit {
    .mp-swiper-body {
        padding: 15px 15px;
    }

    .mp-swiper-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .mp-swiper-box {
        background-color: $bgColor;
        padding: 8px;
        margin-top: -7px;
    }

    .mp-swiper-item {
        display: flex;
        align-items: center;
        cursor: move;
        position: relative;
        padding: 8px;
        background-color: #fff;
    }

    .mp-swiper-item:nth-child(n+2) {
        margin-top: 8px;
    }

    .mp-swiper-close {
        position: absolute;
        z-index: 2;
        font-size: 16px;
        color: #999;
        cursor: pointer;
        top: -8px;
        right: -8px;
        display: none;
    }

    .mp-swiper-item:hover .mp-swiper-close {
        display: inline;
    }

    .mp-swiper-item>img {
        width: 64px;
        height: 64px;
        margin-right: 15px;
    }

    .swiper-item-right {
        flex: 1;
        height: 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .swiper-item-row {
        display: flex;
        align-items: center;
    }


    .upload-market-img {
        height: 64px;
        width: 80px;
        border: 1px solid $borderColor;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
        margin-right: 15px;
    }

    .upload-goods__text {
        height: 100%;
        position: absolute;
        // z-index: -1;
        width: 100%;
        left: 0;
        top: 0;
        text-align: center;
        font-size: 16px;
        padding-top: 15px;

        i {
            color: #999;
        }

        section {
            font-size: 12px;
        }
    }

    .upload-goods__bg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        background-color: #f8f8ff;
        object-fit: scale-down;
    }

    .upload-market-img.ff::after {
        content: '替换';
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        z-index: 5;
    }

    .upload-market-img:hover {
        // border: 1px solid $color;

        // .upload-goods__text {
        //     color: $color;

        //     i {
        //         color: $color;
        //     }
        // }
    }

    .immediate-wrap {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 10;
        
        :deep(input){
            width: 100%;
            height: 100%;
        }
    }

    .mp-swiper-interval {
        display: flex;
        align-items: center;

        span {
            line-height: 28px;
            text-align: center;
            background-color: rgba(215, 215, 215, 1);
            width: 28px;
            height: 28px;
            border-radius: 2px 0 0 2px;
        }

        ::v-deep .el-input-number .el-input__inner {
            text-align: center !important;
            padding-left: 5px;
            padding-right: 5px;
            border-radius: 2px 0 0 2px;
        }
    }

    .mp-swiper-edge {
        margin-left: 15px;
        :deep(.el-input-number .el-input__inner) {
            text-align: left !important;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 2px;
        }
    }

}
</style>