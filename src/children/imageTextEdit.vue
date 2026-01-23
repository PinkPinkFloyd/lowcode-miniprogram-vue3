<template>
    <div class="mp-imageTextEdit">
      <div class="mp-right-tit">
        图文导航
        <span class="map-right-tit-tip">
          添加多个导航，可上下拖拽换序
        </span>
      </div>
  
      <div class="mp-right-body">
        <!-- 模板样式选择 -->
        <div class="mp-imageText-row">
          <section class="mp-right-row-tit">模板样式：</section>
          <el-radio-group
            class="mp-right-radio"
            v-model="internal.styleType"
            @change="emitChange"
          >
            <el-radio-button :value="1">图文导航</el-radio-button>
            <el-radio-button :value="0">文字导航</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 背景颜色 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">背景颜色：</section>
          <el-input
            style="width: 135px;"
            v-model="internal.bgColor"
            placeholder="背景颜色"
            @input="bgColorPick"
          />
          &ensp;
          <el-color-picker
            show-alpha
            v-model="internal.bgColor"
            @change="bgColorPick"
          />
          &ensp;
          <span @click="resetColor('bgColor')" class="mp-right-reset">重置</span>
        </div>
  
        <!-- 文字颜色 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">文字颜色：</section>
          <el-input
            style="width: 135px;"
            v-model="internal.fontColor"
            placeholder="文字颜色"
            @input="fontColorPick"
          />
          &ensp;
          <el-color-picker v-model="internal.fontColor" @change="fontColorPick" />
          &ensp;
          <span @click="resetColor('fontColor')" class="mp-right-reset">重置</span>
        </div>
  
        <!-- 添加导航说明 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">
            <span class="mp-right-star">*</span>添加导航：
          </section>
          <section class="mp-right-tip">
            最多添加5个导航，拖动选中的导航可对其排序
          </section>
        </div>
  
        <!-- 导航列表 -->
        <div class="mp-imageText-box">
          <draggable
            v-model="internal.list"
            @update="dragEnd"
            animation="500"
            item-key="urlType"
          >
            <template #item="{ element: item, index }">
              <div class="mp-imageText-item">
                <!-- 图片导航 -->
                <div
                  v-if="internal.styleType === 1"
                  class="upload-market-img"
                  :class="item.imgUrl ? 'ff' : ''"
                >
                  <img v-if="item.imgUrl" class="upload-goods__bg" :src="item.imgUrl" />
                  <div v-else class="upload-goods__text">
                    <i class="el-icon-plus"></i>
                    <section>添加图片</section>
                  </div>
                </div>
  
                <!-- 导航内容右侧 -->
                <div class="imageText-item-right">
                  <div class="imageText-item-row">
                    <section class="mp-right-row-tit">
                      <span class="mp-right-star">*</span>导航名称：
                    </section>
                    <el-input
                      style="flex: 1"
                      v-model="item.navName"
                      :maxLength="12"
                      placeholder="导航名称"
                      @input="emitChange"
                    />
                  </div>
  
                  <div class="imageText-item-row">
                    <section class="mp-right-row-tit">请选择分类：</section>
                    <el-select
                      style="flex: 1"
                      filterable
                      v-model="item.urlType"
                      placeholder="链接类型"
                      @change="emitChange"
                    >
                      <el-option
                        v-for="(opt, key) in urlTypeOptions"
                        :key="key"
                        :label="opt.label"
                        :value="opt.value"
                      />
                    </el-select>
                  </div>
  
                  <!-- 商品选择 -->
                  <div v-if="item.urlType === '0001'" class="imageText-item-row">
                    <section class="mp-right-row-tit">选择商品：</section>
                    <el-input
                      style="flex: 1"
                      v-model="item.productName"
                      placeholder="选择商品"
                      @click.stop="openProduct(index)"
                    />
                  </div>
  
                  <!-- 系统页面 -->
                  <div v-else-if="item.urlType === '0002'" class="imageText-item-row">
                    <section class="mp-right-row-tit">系统页面：</section>
                    <el-select
                      style="flex: 1"
                      v-model="item.systemPage"
                      filterable
                      placeholder="系统页面"
                      @change="emitChange"
                    >
                      <el-option
                        v-for="(opt, key) in systemPageOptions"
                        :key="key"
                        :label="opt.label"
                        :value="opt.urlType"
                      />
                    </el-select>
                  </div>
  
                  <!-- 商品类目 -->
                  <div v-else-if="item.urlType === '0003'" class="imageText-item-row">
                    <section class="mp-right-row-tit">商品类目：</section>
                    <el-select
                      style="flex: 1"
                      v-model="item.categoryId"
                      filterable
                      placeholder="商品类目"
                      @change="emitChange"
                    >
                      <el-option
                        v-for="cat in root?.spuCategorylistAll"
                        :key="cat.spuCategoryId"
                        :label="cat.spuCategoryName"
                        :value="cat.spuCategoryId"
                      />
                    </el-select>
                  </div>
  
                  <!-- 微页面 -->
                  <div v-else-if="item.urlType === '0004'" class="imageText-item-row">
                    <section class="mp-right-row-tit">微页面：</section>
                    <el-select
                      style="flex: 1"
                      v-model="item.microPageId"
                      filterable
                      placeholder="微页面"
                      @change="emitChange"
                    >
                      <el-option
                        v-for="page in root?.pageList"
                        :key="page.webAppletSettingRelationId"
                        :label="page.pageName"
                        :value="page.webAppletSettingRelationId"
                      />
                    </el-select>
                  </div>
                </div>
  
                <!-- 删除按钮 -->
                <i @click="delItem(index)" class="el-icon-circle-close mp-imageText-close"></i>
              </div>
            </template>
          </draggable>
  
          <div
            v-if="internal.list.length < 5"
            class="mp-imageTextEdit-btn"
            @click="addItem"
          >
            <i class="el-icon-plus"></i> 添加导航（{{ internal.list.length }}/5）
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, watch, inject } from 'vue'
  import draggable from 'vuedraggable'
  // import selProduct from '../../pageDesign/components/selProduct.vue'
  import { urlTypeOptions, systemPageOptions } from '../const/miniprogram'
  
  interface ImageTextItem {
    imgUrl: string
    navName: string
    urlType: string
    productId: string
    productName: string
    systemPage: string
    categoryId: string
    microPageId: string
  }
  interface ImageTextData {
    styleType: number
    bgColor: string
    fontColor: string
    list: ImageTextItem[]
  }
  
  interface RootData {
    spuCategorylistAll: { spuCategoryId: string; spuCategoryName: string }[]
    pageList: { webAppletSettingRelationId: string; pageName: string }[]
  }
  
  const props = defineProps<{ modelValue: ImageTextData }>()
  const emit = defineEmits<{ (e: 'update:modelValue', value: ImageTextData): void }>()
  
  const root = inject<RootData>('root')
  
  // 内部响应式对象
  const internal = reactive({ ...props.modelValue })
  
  watch(
    () => props.modelValue,
    (val) => Object.assign(internal, val),
    { deep: true }
  )
  
  // 同步父组件
  const emitChange = () => emit('update:modelValue', { ...internal })
  
  const bgColorPick = (color: string) => {
    internal.bgColor = color || ''
    emitChange()
  }
  
  const fontColorPick = (color: string) => {
    internal.fontColor = color || '#000000'
    emitChange()
  }
  
  const dragEnd = (e: Event) => {
    e.preventDefault()
    emitChange()
  }
  
  const delItem = (index: number) => {
    internal.list.splice(index, 1)
    emitChange()
  }
  
  const addItem = () => {
    internal.list.push({
      imgUrl: '',
      navName: '',
      urlType: '0001',
      productId: '',
      productName: '',
      systemPage: '',
      categoryId: '',
      microPageId: ''
    })
    emitChange()
  }
  
  // 商品选择弹窗示例
  // const selProductRef = ref<InstanceType<typeof selProduct> | null>(null)
  // const current = ref<number>(0)
  // const currentProductId = ref<string>('')
  
  // const openProduct = (index: number) => {
  //   current.value = index
  //   currentProductId.value = internal.list[index].productId || ''
  //   selProductRef.value!.visible = true
  // }
  
  // const getSelProduct = (val: { skuId: string; productName: string }) => {
  //   internal.list[current.value].productId = val.skuId
  //   internal.list[current.value].productName = val.productName
  //   emitChange()
  // }
  </script>
  
  <style lang="scss" scoped>
    $color: #2386ee;
    $bgColor: rgba(242, 242, 242, 1);
    $borderColor: rgba(230, 230, 230, 1);
    
    .mp-imageTextEdit {
        .mp-imageText-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
        }
    
        .mp-imageText-box {
            background-color: $bgColor;
            padding: 8px;
            margin-top: -7px;
        }
    
        .mp-imageText-item {
            display: flex;
            align-items: flex-start;
            cursor: move;
            position: relative;
            padding: 8px;
            background-color: #fff;
        }
    
        .mp-imageText-item:nth-child(n+2) {
            margin-top: 8px;
        }
    
        .mp-imageText-close {
            position: absolute;
            z-index: 2;
            font-size: 16px;
            color: #999;
            cursor: pointer;
            top: -8px;
            right: -8px;
            display: none;
        }
    
        .mp-imageText-item:hover .mp-imageText-close {
            display: inline;
        }
    
        .imageText-item-right {
            flex: 1;
    
            .imageText-item-row {
                display: flex;
                align-items: center;
            }
    
            .imageText-item-row:nth-child(n+2) {
                margin-top: 8px;
            }
        }
    
    
    
        .upload-market-img {
            height: 64px;
            width: 64px;
            border: 1px solid $borderColor;
            border-radius: 2px;
            position: relative;
            cursor: pointer;
            margin-right: 15px;
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
    
            ::v-deep input {
                width: 100%;
                height: 100%;
            }
        }
    
        .mp-imageTextEdit-btn {
            height: 45px;
            border-radius: 2px;
            width: 100%;
            border: 1px solid $color;
            color: $color;
            font-size: 14px;
            cursor: pointer;
            background-color: #fff;
            text-align: center;
            line-height: 45px;
            margin-top: 8px;
        }
    
    
    }
    .mp-right-row-tit{
        width: 100px;
    }
    </style>