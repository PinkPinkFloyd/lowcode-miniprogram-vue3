<template>
    <div class="mp-pageSettingEdit">
      <div class="mp-right-tit">页面设置</div>
  
      <div class="mp-right-body">
        <div class="mp-right-row">
          <section class="mp-right-row-tit">
            <span class="mp-right-star">*</span>
            页面名称：
          </section>
          <el-input
            style="flex: 1"
            placeholder="页面名称"
            :maxlength="10"
            v-model="model.pageName"
          />
        </div>
  
        <div class="mp-right-row">
          <section class="mp-right-row-tit">
            <span class="mp-right-star">*</span>
            店铺名称：
          </section>
          <el-input
            style="flex: 1"
            placeholder="店铺名称"
            :maxlength="20"
            v-model="model.shopName"
          />
        </div>
  
        <div class="mp-right-row">
          <section class="mp-right-row-tit">
            背景颜色：
          </section>
          <el-input
            style="width: 135px"
            v-model="model.bgColor"
            placeholder="背景颜色"
          />
          &ensp;
          <el-color-picker
            show-alpha
            v-model="model.bgColor"
          />
          &ensp;
          <span class="mp-right-reset" @click="resetBgColor">重置</span>
        </div>
  
        <div class="mp-right-row">
          <section class="mp-right-row-tit">
            背景图片：
          </section>
  
          <div class="upload-market-img">
            <!-- <ImmediateUpload
              domIdName="pageSettingEdit"
              uploadFolderName="/images/websiteConfig/"
              :maxSize="10"
              :acceptList="acceptList"
              @returnSrc="getUploadLink"
            /> -->
  
            <img
              v-if="model.bgImage"
              class="upload-goods__bg"
              :src="model.bgImage"
            />
            <div v-else class="upload-goods__text">
              <i class="el-icon-plus"></i>
            </div>
          </div>
  
          &ensp;
          <span class="mp-right-reset" @click="model.bgImage = ''">重置</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  
  interface PageSetting {
    pageName?: string
    shopName?: string
    bgColor?: string
    bgImage?: string
  }
  
  const props = defineProps<{
    modelValue: PageSetting
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: PageSetting): void
  }>()
  
  /**
   * v-model 代理
   *  model.xxx = xxx 能自动回传给父组件
   */
  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })
  
  const acceptList = ['.jpg', '.jpeg', '.png', '.gif']
  
  const resetBgColor = () => {
    model.value.bgColor = '#EEEEEE'
  }
  
  const getUploadLink = (links: string[]) => {
    if (links?.length) {
      model.value.bgImage = links[0]
    }
  }
  </script>
  <style lang="scss" scoped>
    $color: #2386ee;
    $colorBlue: #2386ee;
    $bgColor: rgba(242, 242, 242, 1);
    $borderColor: rgba(230, 230, 230, 1);
    
    .mp-pageSettingEdit {
        .mp-right-row-tit {
            width: 100px;
        }

        .mp-dashed-border {
            border-bottom: 1px dotted #000;
            padding-top: 5px;
            margin-bottom: 15px;
        }

        .mp-right-radio {
            .el-radio-button__orig-radio:checked+.el-radio-button__inner {
                color: $colorBlue;
                background-color: #e9f3fd;
                border-color: $colorBlue;
            }

            .el-radio-button:first-child .el-radio-button__inner {
                border-radius: 2px 0 0 2px;
            }

            .el-radio-button--mini .el-radio-button__inner {
                padding: 5px 10px;
            }

            .el-radio-button:last-child .el-radio-button__inner {
                border-radius: 0 2px 2px 0;
            }
        }

      

        .map-right-tit-tip {
            font-size: 12px;
            color: #999;
            margin-left: 10px;
        }
        .upload-market-img {
            height: 46px;
            width: 46px;
            border: 1px solid $borderColor;
            border-radius: 2px;
            position: relative;
            cursor: pointer;
        }
    
        .upload-goods__text {
            height: 100%;
            line-height: 46px;
            position: absolute;
            // z-index: -1;
            width: 100%;
            left: 0;
            top: 0;
            text-align: center;
            font-size: 18px;
            color: #999;
        }
    
        .upload-goods__bg {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
        }
    
        .upload-market-img:hover {
            border: 1px solid $color;
            color: $color;
    
            .upload-goods__text {
                color: $color;
            }
        }
        
        .mp-right-reset {
            cursor: pointer;
            height: 28px;
            line-height: 28px;

            &:hover {
                color: $colorBlue;
            }
        }
        .immediate-wrap {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            z-index: 10;
    
            ::v-deep #pageSettingEdit {
                width: 100%;
                height: 100%;
            }
        }
    }
    </style>