<template>
    <div class="mp-goodsEdit">
      <div class="mp-right-tit">商品</div>
      <div class="mp-right-body">
        <!-- 显示商品数 -->
        <div class="mp-right-row " style="margin-left: -20px;">
          <section class="mp-right-row-tit" style="width: 100px;">显示商品数：</section>
          <div class="mp_goods_num">
            <el-input-number
              style="width: 100%;"
              v-model="internal.num"
              :precision="0"
              :controls="false"
              :min="1"
              :max="30"
              @change="emitChange"
            ></el-input-number>
          </div>
        </div>
  
        <!-- 商品类目选择 -->
        <div class="mp-right-row" style="margin-left: -20px;">
          <section class="mp-right-row-tit" style="width: 100px;">选择商品类目：</section>
          <el-select
            @change="typeChange"
            style="flex: 1"
            filterable
            v-model="internal.type"
            placeholder="选择商品类目"
          >
            <el-option
              v-for="(every, key) in goodsOptions"
              :key="key"
              :label="every.label"
              :value="every.value"
            />
          </el-select>
        </div>
  
        <!-- 根据 type 展示 -->
        <div class="mp-right-row" v-if="internal.type == '0001'">
          <section class="mp-right-row-tit"><span class="mp-right-star">*</span>商品类目：</section>
          <el-select
            style="flex: 1"
            v-model="internal.categoryId"
            multiple
            @change="categoryChange"
            filterable
            placeholder="商品类目"
          >
            <el-option
              v-for="(every, key) in root.spuCategorylistAll"
              :key="key"
              :label="every.spuCategoryName"
              :value="every.spuCategoryId"
            />
          </el-select>
        </div>
  
        <div class="mp-right-row" v-if="internal.type == '0002'">
          <section class="mp-right-row-tit"><span class="mp-right-star">*</span>商品品牌：</section>
          <el-select
            style="flex: 1"
            multiple
            v-model="internal.brandId"
            filterable
            @change="brandChange"
            placeholder="商品品牌"
          >
            <el-option
              v-for="(every, key) in root.brandOpts"
              :key="key"
              :label="every.brandChName"
              :value="every.brandId"
            />
          </el-select>
        </div>
  
        <div class="mp-right-row" v-if="internal.type == '0003'">
          <section class="mp-right-row-tit"><span class="mp-right-star">*</span>商品：</section>
          <el-input
            style="flex: 1"
            @click.stop="openSelect()"
            placeholder="商品"
            readonly
          >
            <svg class="ali-icon-input" aria-hidden="true" slot="suffix">
              <use xlink:href="#icon-gengduo"></use>
            </svg>
          </el-input>
        </div>
  
        <div class="mp_goods_has" v-if="internal.type == '0003' && internal.list.length > 0">
          <draggable v-model="internal.list" @update="dragEnd" animation="500">
            <div class="mp_goods_item" v-for="(el, key) in internal.list" :key="key">
              <section>{{ el.productName }} &emsp; {{ el.specificationModel }} &emsp; {{ el.brandChName }}</section>
              <i @click="del_list(key)"></i>
            </div>
          </draggable>
        </div>
  
        <div class="mp-dashed-border"></div>
  
        <!-- 样式设置 -->
        <div class="mp-goods-row">
          <section class="mp-right-row-tit">列表样式：</section>
          <el-radio-group v-model="internal.listStyle" @change="emitChange">
            <el-radio-button :label="1">大图</el-radio-button>
            <el-radio-button :label="2">单列</el-radio-button>
            <el-radio-button :label="3">双列</el-radio-button>
            <el-radio-button :label="4">上下</el-radio-button>
          </el-radio-group>
        </div>
  
        <div class="mp-goods-row">
          <section class="mp-right-row-tit">商品样式：</section>
          <el-radio-group v-model="internal.goodsStyle" @change="emitChange">
            <el-radio-button :label="1">无边白底</el-radio-button>
            <el-radio-button :label="2">卡片投影</el-radio-button>
            <el-radio-button :label="3">描边白底</el-radio-button>
          </el-radio-group>
        </div>
  
        <div class="mp-goods-row">
          <section class="mp-right-row-tit">商品倒角：</section>
          <el-radio-group v-model="internal.goodsChamfer" @change="emitChange">
            <el-radio-button :label="1">圆角</el-radio-button>
            <el-radio-button :label="2">直角</el-radio-button>
          </el-radio-group>
        </div>
  
        <div class="mp-goods-row">
          <section class="mp-right-row-tit">图片比例：</section>
          <el-radio-group v-model="internal.imgRatio" @change="emitChange">
            <el-radio-button :label="1">1:1</el-radio-button>
            <el-radio-button :label="2">3:2</el-radio-button>
          </el-radio-group>
        </div>
  
        <div class="mp-goods-row">
          <section class="mp-right-row-tit">文本样式：</section>
          <el-radio-group v-model="internal.fontWeight" @change="emitChange">
            <el-radio-button label="bolder">加粗</el-radio-button>
            <el-radio-button label="normal">正常</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 页面边距 -->
        <div class="mp-goods-row">
          <section class="mp-right-row-tit">页面边距：</section>
          <div style="flex: 1;">
            <slisd
              :min="0"
              :max="30"
              :value="internal.pageEdge"
              :isDrag="true"
              bgColor="#2386ee"
              @input="val => (internal.pageEdge = val, emitChange())"
            />
          </div>
          <div class="mp-goods-edge">
            <el-input-number
              style="width: 68px;"
              v-model="internal.pageEdge"
              :precision="0"
              :controls="false"
              :min="0"
              :max="30"
              @change="emitChange"
            />
          </div>
        </div>
  
        <!-- 商品间距 -->
        <div class="mp-goods-row">
          <section class="mp-right-row-tit">商品间距：</section>
          <div style="flex: 1;">
            <slisd
              :min="0"
              :max="30"
              :value="internal.goodsEdge"
              :isDrag="true"
              bgColor="#2386ee"
              @input="val => (internal.goodsEdge = val,emitChange())"
            />
          </div>
          <div class="mp-goods-edge">
            <el-input-number
              style="width: 68px;"
              v-model="internal.goodsEdge"
              :precision="0"
              :controls="false"
              :min="0"
              :max="30"
              @change="emitChange"
            />
          </div>
        </div>
      </div>
  
      <!-- <mulSelProduct ref="mulSelProduct" @get="getMulSelProduct" /> -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, watch, inject, ref } from 'vue'
  import draggable from 'vuedraggable'
  import slisd from '../components/slisd.vue'
//   import mulSelProduct from '../../pageDesign/components/mulSelProduct'
  import { goodsOptions } from '../const/miniprogram'
//   import { pageSkuInfo } from '@/api/marketManagement/commodity.js'
  
  interface RootData {
    spuCategorylistAll: { spuCategoryId: string; spuCategoryName: string }[]
    brandOpts: { brandId: string; brandChName: string }[]
  }
  
  interface GoodsItem {
    productImage: string
    productName: string
    productId: string
    untaxedUnitPrice: number
    specificationModel: string
    brandChName: string
    unitMeasurementName: string
  }
  
  interface GoodsData {
    num: number
    type: string
    categoryId: string[]
    brandId: string[]
    list: GoodsItem[]
    listStyle: number
    goodsStyle: number
    goodsChamfer: number
    imgRatio: number
    fontWeight: string
    pageEdge: number
    goodsEdge: number
  }
  
  const props = defineProps<{ modelValue: GoodsData }>()
  const emit = defineEmits<{ (e: 'update:modelValue', value: GoodsData): void }>()
  
  const root = inject<RootData>('root')
  
  // 内部响应式对象
  const internal = reactive({ ...props.modelValue })
  
  watch(
    () => props.modelValue,
    (val) => Object.assign(internal, val),
    { deep: true }
  )
  
  const emitChange = () => emit('update:modelValue', { ...internal })
  
  // 拖拽
  const dragEnd = (e: Event) => {
    e.preventDefault()
    emitChange()
  }
  
  // 删除
  const del_list = (index: number) => {
    internal.list.splice(index, 1)
    emitChange()
  }
  
  // 商品选择弹窗
  const mulSelProductRef = ref<InstanceType<typeof mulSelProduct> | null>(null)
  const openSelect = () => {
    mulSelProductRef.value!.visible = true
  }
  
  const getMulSelProduct = (val: GoodsItem[]) => {
    for (let item of val) {
      if (internal.list.length >= 30) {
        // @ts-ignore
        window.$message?.warning('单个模块下最多可添加30个商品')
        break
      }
      internal.list.push(item)
    }
    emitChange()
  }
  
  // 商品类目 / 品牌
  const categoryChange = () => {
    if (!internal.categoryId.length) {
      internal.list = []
      emitChange()
      return
    }
    // pageSkuInfo({
    //   current: 1,
    //   size: 30,
    //   productCategoryId: internal.categoryId.join(',')
    // }).then(({ data }) => {
    //   if (data.code === 200) {
    //     internal.list = data.data.records.map((item: any) => ({
    //       productImage: item.productImage,
    //       productName: item.productName,
    //       productId: item.skuId,
    //       untaxedUnitPrice: item.retailPrice,
    //       specificationModel: item.specificationModel,
    //       brandChName: item.brandChName,
    //       unitMeasurementName: item.unitMeasurementName
    //     }))
    //     emitChange()
    //   }
    // })
  }
  
  const brandChange = () => {
    if (!internal.brandId.length) {
      internal.list = []
      emitChange()
      return
    }
    // pageSkuInfo({
    //   current: 1,
    //   size: 30,
    //   brandId: internal.brandId.join(',')
    // }).then(({ data }) => {
    //   if (data.code === 200) {
    //     internal.list = data.data.records.map((item: any) => ({
    //       productImage: item.productImage,
    //       productName: item.productName,
    //       productId: item.skuId,
    //       untaxedUnitPrice: item.retailPrice,
    //       specificationModel: item.specificationModel,
    //       brandChName: item.brandChName,
    //       unitMeasurementName: item.unitMeasurementName
    //     }))
    //     emitChange()
    //   }
    // })
  }
  
  const typeChange = () => {
    internal.list = []
    emitChange()
  }
  </script>
  
<style lang="scss" scoped>
$color: #2386ee;
$bgColor: rgba(242, 242, 242, 1);
$borderColor: rgba(230, 230, 230, 1);


.mp-goodsEdit {

    .mp-goods-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }



    .mp_goods_has {
        background-color: $bgColor;
        padding: 10px 8px;
        max-height: 260px;
        overflow: auto;
        margin-bottom: 15px;
        margin-top: -5px;
    }

    .mp_goods_item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        height: 30px;
        border-radius: 20px;
        padding: 0 12px;
        cursor: move;
    }

    .mp_goods_item:nth-child(n+2) {
        margin-top: 10px;
    }

    .mp_goods_item>section {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 15px;
    }

    .mp_goods_item>i {
        cursor: pointer;
    }

    .mp_goods_num {
        flex: 1;

        ::v-deep .el-input-number .el-input__inner {
            text-align: left !important;

        }
    }

    .mp-goods-edge {
        margin-left: 15px;
        
        ::v-deep .el-input-number .el-input__inner {
            text-align: left !important;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 2px;
        }
    }
}
</style>
