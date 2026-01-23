<!--
 * @Author: fanggang
 * @Date: 2023-08-30 13:57:34
 * @LastEditTime: 2023-09-20 13:29:06
 * @LastEditors: fanggang
 * @Description: 小程序商城装修
 * @FilePath: index.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
    <div id="miniprogram" v-if="getPermissions('market_minipro_view')" v-loading="loading">
        <div class="mp-main">
            <!-- 左侧菜单 -->
            <aside class="mp-left">
                <div class="mp-left-tab">
                    <el-radio-group class="left-tab" v-model="activeTab">
                        <el-radio-button :label="1">页面</el-radio-button>
                        <el-radio-button :label="2">组件</el-radio-button>
                    </el-radio-group>
                </div>
                <!-- 页面 -->
                <div v-if="activeTab == 1" class="mp-left-main">
                    <section class="mp-left-tip">
                        小程序商城最多可装修5个页面
                    </section>
                    <div @click="cutPage(item.webAppletSettingRelationId)"
                        :class="currentPageId == item.webAppletSettingRelationId ? 'active' : ''" class="mp-left-item"
                        v-for="(item, index) in pageList" :key="index">
                        <div :title="item.pageName">{{ item.pageName }}</div>
                        <section>
                            <img v-if="item.isHomePage == '1'" src="/img/home-fill.svg" title="设为首页" alt="">
                            <img @click="setHomePage(item.webAppletSettingRelationId)" v-else title="设为首页"
                                src="/img/home.svg" alt="">
                            <i v-if="pageList.length < 5" @click.stop="copyPage(item.webAppletSettingRelationId)"
                                class="el-icon-copy-document" title="复制"></i>
                            <i v-if="item.isHomePage != '1'" @click.stop="removePage(item.webAppletSettingRelationId)"
                                class="el-icon-delete" title="删除"></i>
                        </section>
                    </div>
                    <el-button v-if="pageList.length < 5" class="mp-left-add" @click.stop="addPage"
                        type="primary">新增页面</el-button>
                </div>
                <!-- 组件 -->
                <div v-if="activeTab == 2" class="mp-left-main">
                    <div class="mp-left-title">
                        <i class="el-icon-caret-bottom"></i> 基础组件
                    </div>
                    <draggable draggable=".canadd" class="mp-left-types" :list="leftList"
                        :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
                        :sort="false" @end="onEnd">
                        <div class="mp-left-type" v-for="(item, index) in leftList"
                            :class="componentsNum(item.name) >= item.num ? '' : 'canadd'" :key="index">
                            <section class="mp-left-type-detail">
                                <img :src="item.icon" alt="">
                                <section>{{ item.title }}</section>
                                <span>{{ componentsNum(item.name) }}/{{ item.num }}</span>
                            </section>
                            <div class="real-component">
                                <component :is="item.name" :data="item.data"></component>
                            </div>
                        </div>
                    </draggable>

                </div>
            </aside>
            <!-- 版心主体 -->
            <div class="mp-center">
                <div :style="{ backgroundColor: pageSetting.bgColor, backgroundImage: 'url(' + pageSetting.bgImage + ')' }"
                    class="mp-center-box">
                    <div class="main-list" :class="index == current ? 'active' : ''" @click="cut(index)"
                        v-for="(item, index) in topFeilds" :key="'top' + index">
                        <component :data="item.data" :is="item.name"></component>
                    </div>
                    <draggable v-model="feilds" @update="dragEnd($event)" :group="{ name: 'component' }"
                        group="componentsGroup" animation="500">
                        <div class="main-list" :class="(index + 1) == current ? 'active' : ''" @click="cut(index + 1)"
                            v-for="(item, index) in feilds" :key="index">
                            <component :data="item.data" :is="item.name"></component>
                            <div class="main-list-action" :class="feilds.length - 1 == index ? 'last' : ''">
                                <img v-if="index != 0" @click.stop="Swap(index, index - 1)" title="上移" src="@/img/prev.png"
                                    alt="">
                                <img v-if="index != feilds.length - 1" @click.stop="Swap(index, index + 1)" title="下移"
                                    src="@/img/next.png" alt="">
                                <img v-if="index != 0" title="置顶" @click.stop="toTop(index)" src="@/img/top.png" alt="">
                                <img v-if="index != feilds.length - 1" title="置底" @click.stop="toBottom(index)"
                                    src="@/img/bottom.png" alt="">
                                <img v-if="canCopy(item.name)" title="复制" @click.stop="Copy(index)" src="@/img/copy.png"
                                    alt="">
                                <img title="删除" @click.stop="Delete(index)" src="@/img/delete.png" alt="">
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <!-- 右侧编辑 -->
            <div class="mp-right">
                <div v-for="(item, index) in rightList" :key="index">
                    <component v-if="sumFeilds[current].flag == item.flag" v-model="sumFeilds[current].data"
                        :is="item.right">
                    </component>
                </div>
            </div>
        </div>
        <div class="mp-footer">
            <el-button v-if="isCanSetHome" @click="setHomePage(currentPageId)" type="primary"
                plain>&ensp;设为首页&ensp;</el-button>
            <el-button @click="Save()" type="primary">&ensp;保存&ensp;</el-button>
        </div>
    </div>
</template>
<script>

import { pageSetting, search, swiper, imageText, customTitle, goods, divider } from '@/const/markManagement/miniprogram'
import { publicMixins } from '@/mixins/publicMixins'
import * as API from '@/api/marketManagement/miniprogram.js'
import { getStore } from '@/util/store'
export default {
    mixins: [publicMixins],
    components: {
        draggable: () => import('vuedraggable'),
        pageSetting: () => import('./children/pageSetting'),
        pageSettingEdit: () => import('./children/pageSettingEdit'),
        search: () => import('./children/search'),
        searchEdit: () => import('./children/searchEdit'),
        swiper: () => import('./children/swiper'),
        swiper_edit: () => import('./children/swiper_edit'),
        imageText: () => import('./children/imageText'),
        imageTextEdit: () => import('./children/imageTextEdit'),
        customTitle: () => import('./children/customTitle'),
        customTitleEdit: () => import('./children/customTitleEdit'),
        goods: () => import('./children/goods'),
        goodsEdit: () => import('./children/goodsEdit'),
        divider: () => import('./children/divider'),
        dividerEdit: () => import('./children/dividerEdit'),
    },
    data() {
        return {
            activeTab: 1,//左侧页面，组件切换
            current: 0, //右侧当前显示
            loading: false,
            activeClass: '',
            topFeilds: [
                { name: 'pageSetting', data: pageSetting, flag: 1 },
            ],
            feilds: [
                // 页面主组件
                // { name: 'pageSetting', data: pageSetting, flag: 1 },
                { name: 'search', data: this.deepClone(search), flag: 2 },
                { name: 'swiper', data: this.deepClone(swiper), flag: 3 },
                { name: 'imageText', data: this.deepClone(imageText), flag: 4 },
                { name: 'customTitle', data: this.deepClone(customTitle), flag: 5 },
                { name: 'goods', data: this.deepClone(goods), flag: 6 },
                { name: 'divider', data: this.deepClone(divider), flag: 7 },
            ],
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
            leftList: [
                {
                    icon: '/img/mp-icon1.png',
                    title: '搜索',
                    num: 1,
                    name: "search",
                    data: this.deepClone(search),
                    right: 'searchEdit'
                }, {
                    icon: '/img/mp-icon2.png',
                    title: '图片广告',
                    num: 5,
                    name: "swiper",
                    data: this.deepClone(swiper),
                    right: 'swiper_edit'
                }, {
                    icon: '/img/mp-icon3.png',
                    title: '导航',
                    num: 5,
                    name: "imageText",
                    data: this.deepClone(imageText),
                    right: 'imageTextEdit'
                }, {
                    icon: '/img/mp-icon4.png',
                    title: '标题组件',
                    num: 5,
                    name: "customTitle",
                    data: this.deepClone(customTitle),
                    right: 'customTitleEdit'
                }, {
                    icon: '/img/mp-icon5.png',
                    title: '商品',
                    num: 5,
                    name: "goods",
                    data: this.deepClone(goods),
                    right: 'goodsEdit'
                }, {
                    icon: '/img/mp-icon6.png',
                    title: '辅助分割',
                    num: 20,
                    name: "divider",
                    data: this.deepClone(divider),
                    right: 'dividerEdit'
                }
            ],
            tempItem: null,
            pageSetting,
            // 
            pageList: [],
            currentPageId: '',
            webAppletSettingId: ''

        }
    },
    provide() {
        return {
            // 商品分类
            root: this,
        }
    },
    computed: {
        sumFeilds() {
            return this.topFeilds.concat(this.feilds)
        },
        componentsNum() {
            return (name) => {
                let arr = this.feilds.filter((item) => item.name == name);
                return arr.length
            }
        },
        canCopy() {
            return (name) => {
                let temp = this.leftList.find((item) => item.name == name);
                let arr = this.feilds.filter((item) => item.name == name);
                if (arr.length < temp.num) {
                    return true;
                }
                return false;

            }
        },
        isCanSetHome() {
            let temp = this.pageList.find(item => item.webAppletSettingRelationId == this.currentPageId);
            if (temp && temp.isHomePage == '1') {
                return false;
            }
            return true;
        }
    },
    methods: {
        dragEnd(e) {
            e.preventDefault()
        },
        // 点击模块切换右侧
        cut(key) {
            this.current = key
        },
        // 开始拖拽
        cloneComponent(val) {
            let origin = this.deepClone(val)
            let flag = new Date().getTime().toString()

            this.tempItem = {
                right: origin.right,
                flag
            }
            return {
                name: origin.name, data: origin.data, flag
            }
        },
        onEnd(e) {
            if (e.from !== e.to && this.tempItem) {
                this.rightList.splice(e.newIndex + 1, 0, this.tempItem)
                this.current = e.newIndex + 1
            }
        },
        // 上下换位置
        Swap(index1, index2) {
            swapArr(this.feilds, index1, index2);
            // this.$nextTick(function () {
            //     document
            //         .querySelectorAll(".mp-center-box .main_list")
            //     [index2].scrollIntoView({
            //         behavior: "smooth",
            //         inline: "nearest",
            //         block: "center",
            //     });
            // });
            function swapArr(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            }

        },
        // 置顶
        toTop(index) {
            this.feilds.unshift(...this.feilds.splice(index, 1));
        },
        // 置底
        toBottom(index) {
            this.feilds.push(...this.feilds.splice(index, 1));
        },
        // 复制
        Copy(index) {
            // 当前版心
            let obj = this.deepClone(this.feilds[index]);
            // 当前右侧
            let rightItem = this.rightList.find(item => item.flag == obj.flag);
            // 新的标识符
            let flag = new Date().getTime().toString();
            obj.flag = flag;
            this.feilds.splice(index, 0, obj);
            this.rightList.push({
                right: rightItem.right, flag
            });
            this.current = index + 2;




        },
        // 删除
        Delete(index) {
            this.$confirm("确认删除当前组件?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let fg = this.feilds[index].flag;
                this.feilds.splice(index, 1);
                this.rightList = this.rightList.filter((val) => {
                    return val.flag != fg;
                });

                this.current = index;
                if (index == 0) {
                    this.current = 0;
                } else {
                    this.current = index;
                }
            });
        },
        mousehover(e) {
            //         var tp = document.documentElement.clientTop,
            //     lt = document.documentElement.clientLeft,
            //     rect = el.getBoundingClientRect();
            // return {
            //     top: rect.top - tp,
            //     right: rect.right - lt,
            //     bottom: rect.bottom - tp,
            //     left: rect.left - lt
            // }

            this.$nextTick(() => {
                let dom = document.querySelector('.main-list-action');
                console.log(dom)
                let parent = dom.offsetParent;
                console.log(parent)
                // if (parent.offsetTop > 200 && parent.clientHeight < dom.clientHeight) {
                //     dom.style.bottom='0';
                //     dom.style.top='auto';
                // }

            })

        },
        // 获取页面列表
        async getList() {
            this.loading = true;
            await API.getList().then(({ data }) => {
                if (data.code == 200) {
                    this.pageList = data.data;
                    if (!this.currentPageId) {
                        let temp = this.pageList.find(item => item.isHomePage == '1')
                        this.currentPageId = temp.webAppletSettingRelationId;
                    }

                }

                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        // 页面复制
        copyPage(id) {
            API.copyPage(id).then(({ data }) => {
                if (data.code == 200) {
                    this.$message.success('操作成功！');
                    this.getList();
                }
            })
        },
        // 页面删除
        removePage(id) {
            this.$confirm("确认删除当前页面?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                API.removePage(id).then(({ data }) => {
                    if (data.code == 200) {
                        this.$message.success('页面删除成功！');
                        this.getList();
                    }
                })
            })

        },
        // 页面新增
        addPage() {
            API.addPage().then(({ data }) => {
                if (data.code == 200) {
                    this.getList();
                    this.currentPageId = data.data;
                    this.getPageDetail(data.data)
                }
            })
        },
        // 设置首页 
        setHomePage(id) {
            API.setHomePage(id).then(({ data }) => {
                if (data.code == 200) {
                    this.$message.success('操作成功！');
                    this.getList();
                }
            })
        },
        // 切换页面
        cutPage(id) {
            if (this.currentPageId == id) {
                return false;
            }
            this.currentPageId = id;
            this.getPageDetail(id);
        },
        // 获取详情
        getPageDetail(id) {
            this.loading = true
            API.getPageDetail({
                webAppletSettingRelationId: id, tenantId: getStore({
                    name: 'tenantId',
                }),
            }).then(({ data }) => {
                if (data.code == 200) {
                    let obj = data.data
                    // this.currentPageId = obj.webAppletSettingRelationId;
                    this.webAppletSettingId = obj.webAppletSettingId
                    this.pageSetting = pageSetting;
                    // 如果没有数据，第一次进来
                    if (obj.isShow == 0) {
                        this.loading = false
                        this.current = 0;
                        this.topFeilds = [
                            { name: 'pageSetting', data: pageSetting, flag: 1 },
                        ];
                        this.feilds = [
                            { name: 'search', data: this.deepClone(search), flag: 2 },
                            { name: 'swiper', data: this.deepClone(swiper), flag: 3 },
                            { name: 'imageText', data: this.deepClone(imageText), flag: 4 },
                            { name: 'customTitle', data: this.deepClone(customTitle), flag: 5 },
                            { name: 'goods', data: this.deepClone(goods), flag: 6 },
                            { name: 'divider', data: this.deepClone(divider), flag: 7 },
                        ]
                        this.rightList = [
                            // 右侧组件切换
                            { right: 'pageSettingEdit', flag: 1 },
                            { right: 'searchEdit', flag: 2 },
                            { right: 'swiper_edit', flag: 3 },
                            { right: 'imageTextEdit', flag: 4 },
                            { right: 'customTitleEdit', flag: 5 },
                            { right: 'goodsEdit', flag: 6 },
                            { right: 'dividerEdit', flag: 7 },
                        ]
                        return false;
                    }
                    this.current = obj.current
                    this.rightList = obj.rightVOList;
                    let arr = [], topFeilds = [], feilds = [];

                    arr.push(...obj.pageSettingVO);
                    arr.push(...obj.searchVO)
                    arr.push(...obj.swiperVO)
                    arr.push(...obj.imageTextVO)
                    arr.push(...obj.customTitleVO)
                    arr.push(...obj.goodsVO)
                    arr.push(...obj.dividerVO)
                    arr.sort((a, b) => {
                        return a.index - b.index
                    })
                    arr.forEach((item) => {
                        if (item.name == 'pageSetting') {
                            this.pageSetting = item.data;
                            topFeilds.push(item)
                        } else {
                            feilds.push(item)
                        }
                    })
                    this.topFeilds = topFeilds
                    this.feilds = feilds
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        },
        Save() {
            let flag = true
            let msg = ''
            for (let i = 0; i < this.sumFeilds.length; i++) {
                let item = this.sumFeilds[i]
                if (item.name == 'pageSetting' && !item.data.pageName) {
                    msg = '页面设置-页面名称必填'
                    flag = false
                }
                if (item.name == 'pageSetting' && !item.data.shopName) {
                    msg = '页面设置-店铺名称必填'
                    flag = false
                }
                if (item.name == 'swiper' && item.data.list.length == 0) {
                    msg = '图片广告至少添加一项'
                    flag = false
                }

                if (item.name == 'imageText' && item.data.list.length == 0) {
                    item.data.list
                    msg = '图文导航至少添加一项'
                    flag = false
                }
                if (item.name == 'imageText') {
                    for (let key = 0; key < item.data.list.length; key++) {
                        let el = item.data.list[key]
                        if (!el.navName) {
                            msg = '图文导航-导航名称必填'
                            flag = false
                        }
                        if (!flag) {
                            break
                        }
                    }
                }
                if (item.name == 'goods' && item.data.list.length == 0) {
                    msg = '商品必须添加'
                    flag = false
                }
                if (item.name == 'customTitle' && !item.data.title) {
                    msg = '自定义内容-标题内容必填'
                    flag = false
                }
                if (!flag) {
                    break
                }
            }
            if (!flag) {
                this.$message.warning(msg)
                return
            }

            let pageSettingVO = [],
                searchVO = [],
                swiperVO = [],
                imageTextVO = [],
                customTitleVO = [],
                goodsVO = [],
                dividerVO = []

            this.sumFeilds.forEach((item, index) => {
                item.index = index
                if (item.name == 'pageSetting') {
                    pageSettingVO.push(item)
                } else if (item.name == 'search') {
                    searchVO.push(item)
                } else if (item.name == 'swiper') {
                    swiperVO.push(item)
                } else if (item.name == 'imageText') {
                    imageTextVO.push(item)
                } else if (item.name == 'customTitle') {
                    customTitleVO.push(item)
                } else if (item.name == 'goods') {
                    goodsVO.push(item)
                } else if (item.name == 'divider') {
                    dividerVO.push(item)
                }
            })
            let obj = {
                current: this.current,
                pageSettingVO,
                searchVO,
                swiperVO,
                imageTextVO,
                customTitleVO,
                goodsVO,
                dividerVO,
                rightVOList: this.rightList,
            }
            API.save({ setting: JSON.stringify(obj), webAppletSettingRelationId: this.currentPageId, webAppletSettingId: this.webAppletSettingId }).then(({ data }) => {
                if (data.code == 200) {
                    this.$message.success('操作成功！')
                    this.webAppletSettingId = data.data;
                    this.getList();
                }
            });

        }
    },
    mounted() {
        if (this.getPermissions('market_minipro_view')) {
            this.getSpuCategorylistAll()
            this.getProductBrand()

            this.getList();
            this.getPageDetail('');
            this.getCateMatchProduct()
        }

    },
}
</script>
<style lang="scss">
$color: rgba(247, 71, 71, 1);
$colorBlue: #2386ee;
$borderColor: rgba(230, 230, 230, 1);
// .mp-center .sortable-ghost {
//     position: relative;
//     display: block;
//     overflow: hidden;

//     &::before {
//         content: " ";
//         position: absolute;
//         left: 0;
//         right: 0;
//         top: 0;
//         height: 3px;
//         background: rgb(89, 89, 223);
//         z-index: 2;
//     }
// }

#miniprogram {
    padding: 8px 8px 0;
    min-width: 1080px;
    overflow: auto;
    font-size: 12px;


    .mp-main {
        height: calc(100% - 43.5px);
        display: flex;
        justify-content: space-between;

    }

    .mp-left {
        width: 248px;
        background-color: #fff;
        overflow: auto;
        position: relative;

        .mp-left-tab {
            text-align: center;
            border-bottom: 1px solid rgba(230, 230, 230, 1);
            padding: 8px 0;
        }

        .left-tab .el-radio-button--mini .el-radio-button__inner {
            padding: 7px 40px;
        }

        .mp-left-main {
            padding: 0 8px;

        }

        .mp-left-tip {
            color: #666;
            padding: 10px 0;
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

        .mp-left-item>div {
            flex: 1;
            max-width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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

        .mp-left-add {
            position: absolute;
            bottom: 30px;
            width: calc(100% - 16px);
            left: 8px;
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

        .mp-left-type-box {
            margin-top: 5px;
        }

        .mp-left-types {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;

        }

        .mp-left-type-detail {
            width: 84px;
            height: 84px;
            background-color: rgba(250, 250, 250, 1);
            border: 1px solid rgba(230, 230, 230, 1);
            border-radius: 2px;
            margin-left: 20px;
            cursor: pointer;
            margin-bottom: 20px;
            text-align: center;
            padding: 8px;
            cursor: move;

            img {
                height: 26px;
                margin-bottom: 3px;
            }
        }


    }

    .mp-right {
        width: 415px;
        background-color: #fff;
        overflow: auto;

        .mp-right-star {
            color: $color;
        }

        .mp-right-body {
            padding: 15px 20px;
        }

        .mp-right-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;

            &.margin {
                margin-top: -10px;
            }
        }

        .mp-right-tip {
            color: #999;
            align-self: center;
        }

        .mp-right-row-tit {
            width: 80px;
            text-align: right;
            height: 28px;
            line-height: 28px;
        }

        .mp-right-reset {
            cursor: pointer;
            height: 28px;
            line-height: 28px;

            &:hover {
                color: $colorBlue;
            }
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

        .mp-right-tit {
            padding: 10px 15px;
            border-bottom: 1px solid rgba(230, 230, 230, 1);
            font-size: 14px;
            display: flex;
            align-items: center;
        }

        .map-right-tit-tip {
            font-size: 12px;
            color: #999;
            margin-left: 10px;
        }
    }

    .mp-left .mp-left-types {

        .real-component {
            display: none;
        }

        .mp-left-type-detail {
            display: block;
            user-select: none;
        }
    }

    .mp-center .mp-left-type.sortable-ghost {
        .real-component {
            display: block;

            .mpp-good3-item-img {
                height: 175px !important;
            }

            .mpp-imageText-img {
                height: 51px !important;
            }
        }

        .mp-left-type-detail {
            display: none;
        }
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

    .mp-footer {
        padding: 8px 15px;
        background-color: #fff;
        border-top: 1px solid rgba(230, 230, 230, 1);
        text-align: right;
    }
}
</style>

<style lang="scss">
#miniprogram {
    .el-col {
        padding-left: 2px !important;
        padding-right: 2px !important;
    }

    .el-form-item__label {
        padding-right: 7px !important;
    }

    .el-dialog__header {
        border-bottom: 1px solid #c0c4cc;
    }

    .el-button.el-button--meduim {
        padding: 6px 10px !important;
    }

    .el-dialog__body {
        padding-top: 8px !important;
    }

    .avue-crud__menu {
        display: none;
    }

    .el-button+.el-button,
    .el-checkbox.is-bordered+.el-checkbox.is-bordered {
        margin-left: 5px !important;
    }

    .high_search.el-button--text {
        padding: 6px 0px !important;
    }

    // 弹窗头部
    .select_dialog_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
    }

    .select_dialog_page {
        padding-top: 2px;
        display: inline-block;
    }

    .mark_dialog_bottom {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .mark_dialog_bottom>section {
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        padding: 3px 20px;
        cursor: pointer;
    }

    .mark_dialog_bottom>section>span {
        color: #2386ee;
    }

    .p_link_btn {
        color: #2386ee;
        cursor: pointer;
        // border-bottom: 1px solid #2386EE;
    }

    .status_tag {
        border-style: solid;
        border-width: 1px;
        border-radius: 10px;
        padding: 2px 12px;
        color: #a8a6a6;
        background-color: #eee;
        border-color: #b7b7b7;
    }

    .status_tag.yellow {
        color: #e6a23c;
        background-color: #fdf6ec;
        border-color: #faecd8;
    }

    .status_tag.green {
        color: #67c23a;
        background-color: #f0f9eb;
        border-color: #e1f3d8;
    }

    .status_tag.red {
        color: #f56c6c;
        background-color: #fef0f0;
        border-color: #fde2e2;
    }

    .status_tag.blue {
        color: #409eff;
        background-color: #ecf5ff;
        border-color: #b3d8ff;
    }
}
</style>
