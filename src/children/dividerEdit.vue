<!--
 * @Description: 辅助分割-编辑
-->

<template>
    <div class="mp-dividerEdit">
      <div class="mp-right-tit">辅助分割</div>
      <div class="mp-right-body">
  
        <div class="mp-divider-row">
          <section class="mp-right-row-tit">分割类型：</section>
          <el-radio-group v-model="localData.type">
            <el-radio-button :label="1">辅助空白</el-radio-button>
            <el-radio-button :label="2">辅助线</el-radio-button>
          </el-radio-group>
        </div>
  
        <!-- 空白 -->
        <template v-if="localData.type === 1">
          <div class="mp-divider-row">
            <section class="mp-right-row-tit">空白高度：</section>
            <div style="flex:1">
              <slisd
                :min="0"
                :max="100"
                :value="localData.blankHeight"
                bgColor="#2386ee"
                @input="val => update('blankHeight', val)"
              />
            </div>
            <div class="mp-divider-edge">
              <el-input-number
                v-model="localData.blankHeight"
                :min="0"
                :max="100"
                :controls="false"
              />
            </div>
          </div>
  
          <div class="mp-right-row">
            <section class="mp-right-row-tit">
              <span class="mp-right-star">*</span>空白颜色：
            </section>
            <el-input v-model="localData.blankColor" />
            &ensp;
            <el-color-picker
              show-alpha
              v-model="localData.blankColor"
            />
            &ensp;
            <span class="mp-right-reset" @click="update('blankColor', '#999999')">重置</span>
          </div>
        </template>
  
        <!-- 辅助线 -->
        <template v-if="localData.type === 2">
          <div class="mp-divider-row">
            <section class="mp-right-row-tit">选择样式：</section>
            <el-radio-group v-model="localData.lineStyleType">
              <el-radio-button label="solid">实线</el-radio-button>
              <el-radio-button label="dashed">虚线</el-radio-button>
              <el-radio-button label="dotted">点线</el-radio-button>
            </el-radio-group>
          </div>
  
          <div class="mp-divider-row">
            <section class="mp-right-row-tit">左右边距：</section>
            <el-radio-group v-model="localData.lineLeftRightEdge">
              <el-radio-button :label="0">无边距</el-radio-button>
              <el-radio-button :label="1">左右边距</el-radio-button>
            </el-radio-group>
          </div>
  
          <div class="mp-right-row">
            <section class="mp-right-row-tit">
              <span class="mp-right-star">*</span>辅助线颜色：
            </section>
            <el-input v-model="localData.lineColor" />
            &ensp;
            <el-color-picker v-model="localData.lineColor" />
            &ensp;
            <span class="mp-right-reset" @click="update('lineColor', '#999999')">重置</span>
          </div>
        </template>
  
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { computed } from 'vue'
    
    const props = defineProps<{
      modelValue: any
    }>()
    
    const emit = defineEmits<{
      (e: 'update:modelValue', val: any): void
    }>()
    
    /**
     * 关键点：
     * 1. 不直接修改 props
     * 2. computed + setter 保证响应式链不断
     */
    const localData = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })
    
    function update(key: string, value: any) {
      emit('update:modelValue', {
        ...localData.value,
        [key]: value
      })
    }
    </script>
    
    <style lang="scss" scoped>
        .mp-dividerEdit {
          .mp-divider-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
          }
        
          .mp-divider-edge {
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
        