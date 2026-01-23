<template>
    <div class="mp-ct-edit">
      <div class="mp-right-tit">自定义标题</div>
      <div class="mp-right-body">
        <!-- 标题 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit"><span class="mp-right-star">*</span>标题内容：</section>
          <el-input
            style="flex:1;"
            :maxLength="10"
            v-model="internal.title"
            @input="emitChange"
            placeholder="标题内容"
          />
        </div>
  
        <!-- 副标题 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">副标题内容：</section>
          <el-input
            style="flex:1;"
            :maxLength="50"
            v-model="internal.subTitle"
            @input="emitChange"
            placeholder="副标题内容"
          />
        </div>
  
        <div class="mp-dashed-border"></div>
  
        <!-- 显示位置 -->
        <div class="mp-ct-row">
          <section class="mp-right-row-tit">显示位置：</section>
          <el-radio-group
            class="mp-right-radio"
            v-model="internal.textAlign"
            @change="emitChange"
          >
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">居右</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 标题大小 -->
        <div class="mp-ct-row">
          <section class="mp-right-row-tit">标题大小：</section>
          <el-radio-group
            class="mp-right-radio"
            v-model="internal.titleSize"
            @change="emitChange"
          >
            <el-radio-button :label="16">16号</el-radio-button>
            <el-radio-button :label="14">14号</el-radio-button>
            <el-radio-button :label="12">12号</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 副标题大小 -->
        <div class="mp-ct-row">
          <section class="mp-right-row-tit">副标题大小：</section>
          <el-radio-group
            class="mp-right-radio"
            v-model="internal.subTitleSize"
            @change="emitChange"
          >
            <el-radio-button :label="16">16号</el-radio-button>
            <el-radio-button :label="14">14号</el-radio-button>
            <el-radio-button :label="12">12号</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 标题粗细 -->
        <div class="mp-ct-row">
          <section class="mp-right-row-tit">标题粗细：</section>
          <el-radio-group
            class="mp-right-radio"
            v-model="internal.titleBold"
            @change="emitChange"
          >
            <el-radio-button label="bold">加粗体</el-radio-button>
            <el-radio-button label="normal">常规体</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 副标题粗细 -->
        <div class="mp-ct-row">
          <section class="mp-right-row-tit">副标题粗细：</section>
          <el-radio-group
            class="mp-right-radio"
            v-model="internal.subTitleBold"
            @change="emitChange"
          >
            <el-radio-button label="bold">加粗体</el-radio-button>
            <el-radio-button label="normal">常规体</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 颜色选择 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">标题颜色：</section>
          <el-input
            style="width: 135px;"
            v-model="internal.titleColor"
            @input="titleColorPick"
            placeholder="标题颜色"
          />
          &ensp;
          <el-color-picker v-model="internal.titleColor" @change="titleColorPick" />
          &ensp;
          <span @click="internal.titleColor='#000000'; emitChange()" class="mp-right-reset">重置</span>
        </div>
  
        <div class="mp-right-row">
          <section class="mp-right-row-tit">副标题颜色：</section>
          <el-input
            style="width: 135px;"
            v-model="internal.subTitleColor"
            @input="subTitleColorPick"
            placeholder="副标题颜色"
          />
          &ensp;
          <el-color-picker v-model="internal.subTitleColor" @change="subTitleColorPick" />
          &ensp;
          <span @click="internal.subTitleColor='#999999'; emitChange()" class="mp-right-reset">重置</span>
        </div>
  
        <div class="mp-right-row">
          <section class="mp-right-row-tit">标题背景色：</section>
          <el-input
            style="width: 135px;"
            v-model="internal.bgColor"
            @input="bgColorPick"
            placeholder="标题背景色"
          />
          &ensp;
          <el-color-picker show-alpha v-model="internal.bgColor" @change="bgColorPick" />
          &ensp;
          <span @click="internal.bgColor=''; emitChange()" class="mp-right-reset">重置</span>
        </div>
  
        <!-- 更多设置 -->
        <div class="mp-right-row" style="align-items: center;">
          <section class="mp-right-row-tit">查看更多：</section>
          <el-checkbox v-model="internal.isMore" @change="emitChange">显示</el-checkbox>
          &emsp;
          <el-input
            style="flex:1;"
            v-if="internal.isMore"
            placeholder="查看更多"
            :maxLength="8"
            v-model="internal.moreText"
            @input="emitChange"
          ></el-input>
        </div>
  
        <template v-if="internal.isMore">
          <div class="mp-right-row">
            <section style="width: 100px;margin-left: -20px;" class="mp-right-row-tit">查看更多颜色：</section>
            <el-input
              style="width: 135px;"
              v-model="internal.moreColor"
              @input="moreColorPick"
              placeholder="标题背景色"
            />
            &ensp;
            <el-color-picker v-model="internal.moreColor" @change="moreColorPick" />
            &ensp;
            <span @click="internal.moreColor='#999999'; emitChange()" class="mp-right-reset">重置</span>
          </div>
          <!-- 跳转链接 -->
          <div class="mp-ct-row">
            <section class="mp-right-row-tit">跳转链接：</section>
            <el-select
              style="flex:1"
              filterable
              v-model="internal.urlType"
              @change="emitChange"
              placeholder="链接类型"
            >
              <el-option
                v-for="(opt, key) in urlTypeOptions"
                :key="key"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </div>
        </template>
      </div>
  
      <!-- <selProduct ref="selProduct" :id="currentProductId" @get="getSelProduct" /> -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, watch, inject } from 'vue'
//   import selProduct from '../../pageDesign/components/selProduct'
  import { urlTypeOptions, systemPageOptions } from '../const/miniprogram'
  
  interface RootData {
    spuCategorylistAll: { spuCategoryId: string; spuCategoryName: string }[]
    pageList: { webAppletSettingRelationId: string; pageName: string }[]
  }
  
  interface CustomTitleData {
    title: string
    subTitle: string
    textAlign: string
    titleSize: number
    subTitleSize: number
    titleBold: string
    subTitleBold: string
    titleColor: string
    subTitleColor: string
    bgColor: string
    upDownEdge: number
    isMore: boolean
    moreText: string
    moreColor: string
    urlType: string
    productId: string
    productName: string
    systemPage: string
    categoryId: string
    microPageId: string
  }
  
  const props = defineProps<{ modelValue: CustomTitleData }>()
  const emit = defineEmits<{ (e: 'update:modelValue', value: CustomTitleData): void }>()
  
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
  
  // 颜色选择
  const titleColorPick = (color: string) => {
    internal.titleColor = color || '#000000'
    emitChange()
  }
  
  const subTitleColorPick = (color: string) => {
    internal.subTitleColor = color || '#999999'
    emitChange()
  }
  
  const bgColorPick = (color: string) => {
    internal.bgColor = color || ''
    emitChange()
  }
  
  const moreColorPick = (color: string) => {
    internal.moreColor = color || '#999999'
    emitChange()
  }
  
  // 商品选择
  let currentProductId = ''
  const selProductRef = ref<InstanceType<typeof selProduct> | null>(null)
  const openProduct = () => {
    currentProductId = internal.productId || ''
    selProductRef.value!.visible = true
  }
  const getSelProduct = (val: { skuId: string; productName: string }) => {
    internal.productId = val.skuId
    internal.productName = val.productName
    emitChange()
  }
  </script>
  <style lang="scss" scoped>
    $color: #2386ee;
    $bgColor: rgba(242, 242, 242, 1);
    $borderColor: rgba(230, 230, 230, 1);
    
    .mp-ct-edit {
        .mp-ct-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
        }
    
        .mp-ct-edge {
            margin-left: 15px;
    
            ::v-deep .el-input-number .el-input__inner {
                text-align: left !important;
                padding-left: 10px;
                padding-right: 10px;
                border-radius: 2px;
            }
        }
    }</style>