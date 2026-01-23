// stores/page.ts
import { defineStore } from 'pinia'
import type { PageSetting } from '../types/type'
export const usePageStore = defineStore('page', {
    state: () => ({
        pageList: [] as PageSetting[],
        detail: {
            current: 0,
            customTitleVO:[],
            dividerVO:[],
            goodsVO:[],
            imageTextVO:[],
            isShow:"1",
            pageSettingVO:[],
            rightTextVO:[],
            searchVO:[],
            swiperVO:[],
            webAppleSettingId:'0',
            webAppletSettingRelationId:'0',
        } ,
    }),
    getters: {
        homePages: (state) => state.pageList.filter(p => p.isHomePage === '1')
    },
    actions: {
        initList() {
            let datajson = localStorage.getItem("page-store")
            let obj = JSON.parse(datajson || '{}')
            console.log("obj", obj);
            this.pageList = obj.pageList || []
        },
    },
    persist: {
        key: 'page-store',       // localStorage  key
        storage: localStorage,
        // pick: ['pageList']      // 只持久化 pageList
    }
})
