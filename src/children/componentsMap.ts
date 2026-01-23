// componentsMap.ts
import { defineAsyncComponent } from 'vue'

// 异步组件映射
export const asyncComponents = {
  // 页面设置
  pageSetting: defineAsyncComponent(() => import('./pageSetting.vue')),
  pageSettingEdit: defineAsyncComponent(() => import('./pageSettingEdit.vue')),

  // 搜索
  search: defineAsyncComponent(() => import('./search.vue')),
  searchEdit: defineAsyncComponent(() => import('./searchEdit.vue')),

  // 轮播
  swiper: defineAsyncComponent(() => import('./swiper.vue')),
  swiper_edit: defineAsyncComponent(() => import('./swiper_edit.vue')),

  // 图文导航
  imageText: defineAsyncComponent(() => import('./imageText.vue')),
  imageTextEdit: defineAsyncComponent(() => import('./imageTextEdit.vue')),

  // 自定义标题
  customTitle: defineAsyncComponent(() => import('./customTitle.vue')),
  customTitleEdit: defineAsyncComponent(() => import('./customTitleEdit.vue')),

  // 产品
  goods: defineAsyncComponent(() => import('./goods.vue')),
  goodsEdit: defineAsyncComponent(() => import('./goodsEdit.vue')),

  // 辅助分割
  divider: defineAsyncComponent(() => import('./divider.vue')),
  dividerEdit: defineAsyncComponent(() => import('./dividerEdit.vue')),
}
