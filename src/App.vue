<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import { useInit } from './hooks/useInit';
import { useDrag } from './hooks/useDrag';
import { useLeftPage } from './hooks/useLeftPage';

import { leftList } from './const/miniprogram';
const draggable = defineAsyncComponent(
  () => import("vuedraggable")
)
import { asyncComponents  } from './children/componentsMap'
// 初始化hook
const { initHook } = useInit()
// 左侧页面hook
const { leftPageHook } = useLeftPage(initHook)
// 拖拽hook,hook之间传递hook中的某一属性会丢失响应式，需要使用 toRef
const { dragHook } = useDrag(
  toRef(initHook, 'current'),
  toRef(initHook, 'rightList'),
)
const activeTab = ref<1 | 2>(1);
// 使用 provide 注入
let rootData = reactive({
  spuCategorylistAll: [],
  pageList:initHook.pageList
})
provide('root', rootData)
onMounted(() => {
  // this.getSpuCategorylistAll()
  //           this.getProductBrand()
  //           this.getPageDetail('');
  //           this.getCateMatchProduct()
  // mock
  initHook.getList()
  initHook.getPageDetail(0)
})

// 点击模块切换右侧
const cut = (index: number) => {
  console.log(index,'======cut 点击中间模块');
  console.log(initHook,'======cut 点击中间模块');
  
  initHook.current = index
}
const dragEnd = (e: any) => {
  e.preventDefault()
}
// 上下换位置
const Swap = (index1: number, index2: number) => {
  let temp = initHook.feilds.splice(index2, 1, initHook.feilds[index1]!)[0]!
  initHook.feilds[index1] = temp
}
// 置顶
const toTop = (index: number) => {
  initHook.feilds.unshift(...initHook.feilds.splice(index, 1))
}
// 置底
const toBottom = (index: number) => {
  initHook.feilds.push(...initHook.feilds.splice(index, 1))
}
// 复制
const Copy = (index: number) => {
  // 当前版心
  let obj = cloneDeep(initHook.feilds[index])!
  // 当前右侧
  let rightItem = initHook.rightList.find((item) => item.flag == obj.flag) as any
  // 新的标识符
  let flag = new Date().getTime();
  obj.flag = flag;
  initHook.feilds.splice(index, 0, obj);
  initHook.rightList.push({
    right: rightItem.right, flag
  })
  initHook.current = index + 2
}
// 删除
const Delete = (index: number) => {
  let fg = initHook.feilds[index]!.flag;
  initHook.feilds.splice(index, 1);
  initHook.rightList = initHook.rightList.filter((val) => {
    return val.flag != fg;
  });

  initHook.current = index;
  if (index == 0) {
    initHook.current = 0;
  } else {
    initHook.current = index;
  }
}
const componentsNum = computed(() => {
  return (name: string) => {
    let arr = initHook.feilds.filter((item) => item.name == name);
    return arr.length
  }
})
const canCopy = computed(() => {
  return (name: string) => {
    let temp = leftList.find((item) => item.name == name)!;
    let arr = initHook.feilds.filter((item) => item.name == name);
    if (arr.length < temp.num) {
      return true;
    }
    return false;
  }
})
const sumFeilds = computed(() => {
  console.log(initHook.topFeilds,initHook.feilds,initHook.rightList);
  
  return initHook.topFeilds.concat(initHook.feilds)
})
</script>

<template>
  <div id="miniprogram">
    <div class="mp-main">
      <!-- 左侧菜单 -->
      <aside class="w-[248px] bg-white overflow-auto relative">
        <!-- Tab 切换 -->
        <div class="py-2 p-[8px] text-center border-b border-gray-200">
          <el-radio-group class="left-tab" v-model="activeTab">
            <el-radio-button :label="1">页面</el-radio-button>
            <el-radio-button :label="2">组件</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 左侧页面列表 -->
        <div v-if="activeTab === 1" class="px-2">
          <section class="text-gray-600 py-2">
            小程序商城最多可装修5个页面
          </section>

          <div v-for="(item, index) in initHook.pageList" :key="index" @click="leftPageHook.cutPage(item.webAppletSettingRelationId)"
            :class="[
              'mp-left-item',
              leftPageHook.currentPageId === item.webAppletSettingRelationId ? 'active' : ''
            ]">
            <div :title="item.pageName" class="truncate max-w-[160px]">{{ item.pageName }}</div>
            <section>
              <img v-if="item.isHomePage === '1'" src="/img/home-fill.svg" title="设为首页" alt="">
              <img v-else @click.stop="leftPageHook.setHomePage(item.webAppletSettingRelationId)" src="/img/home.svg" title="设为首页"
                alt="" />
              <i v-if="initHook.pageList.length < 5" @click.stop="leftPageHook.copyPage(item.webAppletSettingRelationId)"
                class="el-icon-copy-document" title="复制"></i>
              <i v-if="item.isHomePage !== '1'" @click.stop="leftPageHook.removePage(item.webAppletSettingRelationId)"
                class="el-icon-delete" title="删除"></i>
            </section>
          </div>

          <el-button v-if="initHook.pageList.length < 5"
            class="mp-left-add absolute bottom-8 left-2 w-[calc(100%-16px)]" @click.stop="leftPageHook.addPage" type="primary">
            新增页面
          </el-button>
        </div>
        <!-- 组件 -->
        <div v-if="activeTab === 2" class="px-2">
          <!-- 标题 -->
          <div class="mp-left-title">
            <i class="el-icon-caret-bottom"></i>
            <span>基础组件</span>
          </div>

          <!-- 拖拽区域 -->
          <draggable item-key="name" draggable=".canadd" class="mp-left-types" :list="leftList"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="dragHook.cloneComponent"
            :sort="false" @end="dragHook.onEnd">
            <template #item="{ element: item, index }">
              <div :class="[
                'mp-left-type',
                componentsNum(item.name) < item.num ? 'canadd' : ''
              ]">
                <!-- 卡片 -->
                <section class="mp-left-type-detail">
                  <img :src="item.icon" alt="" class="h-[26px] mb-[3px]">
                  <section class="truncate text-sm">{{ item.title }}</section>
                  <span class="text-xs text-gray-500">
                    {{ componentsNum(item.name) }}/{{ item.num }}
                  </span>
                </section>

                <!-- 实际组件（隐藏，仅用于 clone） -->
                <div class="hidden">
                  <component :is="asyncComponents[item.name as keyof typeof asyncComponents]" :data="item.data" />
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </aside>
      <!-- 版心主体 -->
      <div class="mp-center">
        <div
          :style="{ backgroundColor: initHook.pageSetting.bgColor, backgroundImage: 'url(' + initHook.pageSetting.bgImage + ')' }"
          class="mp-center-box">
          <!-- 顶部字段 -->
          <div class="main-list" :class="index == initHook.current ? 'active' : ''" @click="cut(index)"
            v-for="(item, index) in initHook.topFeilds" :key="'top' + index">
            <component :data="item.data" :is="asyncComponents[item.name as keyof typeof asyncComponents]"></component>
          </div>
           <!-- 可拖拽区域 -->
          <draggable v-model="initHook.feilds" item-key="name" @update="dragEnd"  group="componentsGroup"
            animation="500">
            <template #item="{ element:item, index }">
              <div class="main-list" :class="(index + 1) == initHook.current ? 'active' : ''" @click="cut(index + 1)">
              <component :data="item.data" :is="asyncComponents[item.name as keyof typeof asyncComponents]"></component>
              <div class="main-list-action" :class="initHook.feilds.length - 1 == index ? 'last' : ''">
                <img v-if="index != 0" @click.stop="Swap(index, index - 1)" title="上移" src="/img/prev.png" alt="">
                <img v-if="index != initHook.feilds.length - 1" @click.stop="Swap(index, index + 1)" title="下移"
                  src="/img/next.png" alt="">
                <img v-if="index != 0" title="置顶" @click.stop="toTop(index)" src="/img/top.png" alt="">
                <img v-if="index != initHook.feilds.length - 1" title="置底" @click.stop="toBottom(index)"
                  src="/img/bottom.png" alt="">
                <img v-if="canCopy(item.name)" title="复制" @click.stop="Copy(index)" src="/img/copy.png" alt="">
                <img title="删除" @click.stop="Delete(index)" src="/img/delete.png" alt="">
              </div>
            </div>
            </template>
          </draggable>
        </div>
      </div>
      <!-- 右侧编辑 -->
      <div class="mp-right">
                <div v-for="(item, index) in initHook.rightList" :key="item.flag">
                    <component v-if="sumFeilds[initHook.current]!.flag == item.flag" v-model="sumFeilds[initHook.current]!.data"
                        :is="asyncComponents[item.right]">
                    </component>
                </div>
            </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $color: rgba(247, 71, 71, 1);
$colorBlue: #2386ee;
$borderColor: rgba(230, 230, 230, 1);
#miniprogram {
  height: 800px;
  background-color: aliceblue;

  .mp-main {
    height: calc(100% - 43.5px);
    display: flex;
    justify-content: space-between;
  }

  .mp-left-item {
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 4px;
    display: flex;
    padding: 4px 8px;
    cursor: default;
    margin-bottom: 8px;
    justify-content: space-between;
    align-items: center;
  }

  .mp-left-item.active {
    background-color: #e9f3fd;
    border-color: #2386ee;

    &>div {
      color: #2386ee;
    }
  }

  .mp-left-item>section {
    font-size: 14px;
    display: flex;
    align-items: center;

    i {
      margin-left: 5px;
      cursor: pointer;
    }

    img {
      cursor: pointer;
    }
  }

  .mp-left-title {
    padding: 10px 0;
    display: flex;
    align-items: center;

    i {
      font-size: 20px;
      color: #2386EE;
      margin-right: 5px;
      margin-top: -3px;
    }
  }

  .mp-left-types {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    .real-component {
      display: none;
    }

    .mp-left-type-detail {
      // display: block;
      user-select: none;
    }
  }

  /* 组件卡片 */
  .mp-left-type-detail {
    width: 84px;
    height: 84px;
    background-color: #fafafa;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    padding: 8px;
    margin-left: 20px;
    margin-bottom: 20px;
    text-align: center;
    cursor: move;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

  /* 是否可拖拽 */
  .canadd {
    cursor: move;
  }

  .mp-left-type:not(.canadd) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mp-center {
    overflow: auto;
    flex: 1;
    padding-bottom: 130px;
    position: relative;

    .mp-center-box {
      margin: auto;
      width: 375px;
      background-color: #fff;
      // background-attachment: fixed;
      background-position: 0 64px;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }

    .main-list {
      cursor: move;
      border: 1px dashed transparent;
      position: relative;
    }

    .main-list.active {
      border: 1px solid $colorBlue;
    }

    .main-list-action {
      position: absolute;
      z-index: 1;
      top: 0;
      width: 40px;
      right: -41px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: #fff;
      flex-direction: column;
      padding: 5px;
      // opacity: 0;

      display: none;

      img {
        cursor: pointer;
        width: 24px;
        margin: 4px 0;

      }

    }

    .main-list-action.last {
      bottom: 0;
      top: auto;
    }

    .main-list:hover {
      &:not(.active) {
        border: 1px dashed $colorBlue;
      }

      .main-list-action {
        display: flex;
        // opacity: 1;
      }
    }
  }
 
  // 没生效
  .left-tab .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 40px;
  }
}
</style>
