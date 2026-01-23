import { pageSetting, search, swiper, imageText, customTitle, goods, divider } from '../const/miniprogram'
import type { PageSetting } from '../types/type'
// import { usePageStore } from '../stores/page'
/** 页面组件配置结构 */
interface FieldItem {
    name: string
    data: unknown
    flag: number
  }
export function useInit() {
    // const pageAPI = usePageStore()
    const initHook = reactive({
        pageList: [] as PageSetting[],
        getList() {
            this.pageList = [
                {
                    webAppletSettingRelationId: 0,
                    pageName: '首页',
                    isHomePage: '1'
                }
            ]
        },
        current: 0 as number,
        pageSetting: pageSetting,
        topFeilds: [
            { name: 'pageSetting', data: pageSetting, flag: 1 }
        ] as FieldItem[],
        feilds: [
            { name: 'search', data: search, flag: 2 },
            { name: 'swiper', data: swiper, flag: 3 },
            { name: 'imageText', data: imageText, flag: 4 },
            { name: 'customTitle', data: customTitle, flag: 5 },
            { name: 'goods', data: goods, flag: 6 },
            { name: 'divider', data: divider, flag: 7 },
        ] as FieldItem[],
        rightList: [
            // 右侧组件切换
            { right: 'pageSettingEdit', flag: 1 },
            { right: 'searchEdit', flag: 2 },
            { right: 'swiper_edit', flag: 3 },
            { right: 'imageTextEdit', flag: 4 },
            { right: 'customTitleEdit', flag: 5 },
            { right: 'goodsEdit', flag: 6 },
            { right: 'dividerEdit', flag: 7 },
        ],
        getPageDetail(id?: Number) {
                // mork 初始化detail数据
                initHook.pageSetting = pageSetting
                initHook.current = 0
                initHook.topFeilds = [{ name: 'pageSetting', data: pageSetting, flag: 1 }]
                initHook.feilds = [
                    { name: 'search', data: search, flag: 2 },
                    { name: 'swiper', data: swiper, flag: 3 },
                    { name: 'imageText', data: imageText, flag: 4 },
                    { name: 'customTitle', data: customTitle, flag: 5 },
                    { name: 'goods', data: goods, flag: 6 },
                    { name: 'divider', data: divider, flag: 7 },
                ]
                initHook.rightList = [
                    { right: 'pageSettingEdit', flag: 1 },
                    { right: 'searchEdit', flag: 2 },
                    { right: 'swiper_edit', flag: 3 },
                    { right: 'imageTextEdit', flag: 4 },
                    { right: 'customTitleEdit', flag: 5 },
                    { right: 'goodsEdit', flag: 6 },
                    { right: 'dividerEdit', flag: 7 },
                ]
        }
    })
    return {
        initHook,
    }
}
