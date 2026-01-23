<template>
    <div class="mp-searchEdit">
      <div class="mp-right-tit">商品搜索</div>
      <div class="mp-right-body">
        <!-- 框体样式 -->
        <div class="mp-search-row">
          <section class="mp-right-row-tit">框体样式：</section>
          <el-radio-group v-model="internalValue.isBorderRadius" @change="emitChange">
            <el-radio-button :label="1">圆角</el-radio-button>
            <el-radio-button :label="0">方角</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 显示方式 -->
        <div class="mp-search-row">
          <section class="mp-right-row-tit">显示方式：</section>
          <el-radio-group v-model="internalValue.isSticky" @change="emitChange">
            <el-radio-button :label="1">吸顶</el-radio-button>
            <el-radio-button :label="0">默认</el-radio-button>
          </el-radio-group>
        </div>
  
        <div class="mp-dashed-border"></div>
  
        <!-- 背景颜色 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">背景颜色：</section>
          <el-input
            style="width: 135px;"
            v-model="internalValue.bgColor"
            placeholder="背景颜色"
            @input="bgColorPick"
          />
          &ensp;
          <el-color-picker show-alpha v-model="internalValue.bgColor" @change="bgColorPick" />
          &ensp;
          <span class="mp-right-reset" @click="reset('bgColor')">重置</span>
        </div>
  
        <!-- 框体颜色 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">框体颜色：</section>
          <el-input
            style="width: 135px;"
            v-model="internalValue.themeColor"
            placeholder="框体颜色"
            @input="themeColorPick"
          />
          &ensp;
          <el-color-picker v-model="internalValue.themeColor" @change="themeColorPick" />
          &ensp;
          <span class="mp-right-reset" @click="reset('themeColor')">重置</span>
        </div>
  
        <!-- 字体颜色 -->
        <div class="mp-right-row">
          <section class="mp-right-row-tit">字体颜色：</section>
          <el-input
            style="width: 135px;"
            v-model="internalValue.fontColor"
            placeholder="字体颜色"
            @input="fontColorPick"
          />
          &ensp;
          <el-color-picker v-model="internalValue.fontColor" @change="fontColorPick" />
          &ensp;
          <span class="mp-right-reset" @click="reset('fontColor')">重置</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, watch, toRefs } from 'vue'
  
  interface SearchData {
    isBorderRadius: number
    isSticky: number
    bgColor: string
    themeColor: string
    fontColor: string
  }
  
  const props = defineProps<{
    modelValue: SearchData
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: SearchData): void
  }>()
  
  // 内部响应式对象
  const internalValue = reactive({ ...props.modelValue })
  
  // 监听外部 modelValue 的变化，同步内部状态
  watch(
    () => props.modelValue,
    (val) => {
      Object.assign(internalValue, val)
    },
    { deep: true }
  )
  
  // 每次修改内部值都触发父组件同步
  const emitChange = () => {
    emit('update:modelValue', { ...internalValue })
  }
  
  // 背景颜色
  const bgColorPick = (color?: string) => {
    internalValue.bgColor = color || ''
    emitChange()
  }
  
  // 框体颜色
  const themeColorPick = (color?: string) => {
    internalValue.themeColor = color || '#FFFFFF'
    emitChange()
  }
  
  // 字体颜色
  const fontColorPick = (color?: string) => {
    internalValue.fontColor = color || '#999999'
    emitChange()
  }
  
  // 重置方法
  const reset = (type: 'bgColor' | 'themeColor' | 'fontColor') => {
    if (type === 'bgColor') internalValue.bgColor = ''
    else if (type === 'themeColor') internalValue.themeColor = '#FFFFFF'
    else if (type === 'fontColor') internalValue.fontColor = '#999999'
    emitChange()
  }
  </script>
  
  <style scoped lang="scss">
  .mp-searchEdit {
    .mp-search-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
  
    .mp-right-reset {
      cursor: pointer;
      color: #2386ee;
    }
  }
  </style>
  