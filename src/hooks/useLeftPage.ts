export function useLeftPage(initHook: any) {
    const leftPageHook = reactive({
        currentPageId: 0 as number | null,
        // 切换页面
        cutPage(id: number) {
            if (leftPageHook.currentPageId == id) {
                return false
            }
            leftPageHook.currentPageId = id
            initHook.getPageDetail(id)
        },
        setHomePage(id: number) { },
        copyPage(id: number) { },
        removePage(id: number) { },
        addPage() {
            //mock
            initHook.pageList.push(
                {
                    webAppletSettingRelationId: initHook.pageList.length + 1,
                    pageName: '通用模板',
                    isHomePage: '0'
                }
            )
        }
    })
    return {
        leftPageHook,
    }
}
