// 链接类型
export type UrlType = '0001' | '0002' | '0003' | '0004' | '0005'

// 对齐枚举值（1 / 0）
export type BooleanNumber = 0 | 1


// 页面设置
export const pageSetting = {
    pageName: "通用模板", //页面名称
    shopName: '', //店铺名称
    bgColor: "#EEEEEE", //背景颜色  是整个页面的底色
    bgImage: "", //背景图片  是整个页面的背景图片
};



// 产品搜索
export const search = {
    isBorderRadius: 1 as BooleanNumber, //框体样式，1：圆角，0：方角
    isSticky: 1 as BooleanNumber, //显示方式 ，1：吸顶，0：默认
    bgColor: '', //背景颜色
    themeColor: '#FFFFFF', //框体颜色
    fontColor: '#999999', //字体颜色
};



// 图片广告
export const swiper = {
    type: 1 as 1 | 2, //模板样式，1：海报轮播，2：一行一个
    list: [
    {
        imgUrl: '',
        urlType: '0001',
        productId: "",
        productName: "",
        systemPage: '',
        categoryId: "",
        microPageId: "",
        articleTitle: '',
        webArticleId: ''
    }, {
        imgUrl: '',
        urlType: '0001',
        productId: "",
        productName: "",
        systemPage: '',
        categoryId: "",
        microPageId: "",
        articleTitle: '',
        webArticleId: ''
    }, {
        imgUrl: '',
        urlType: '0001',
        productId: "",
        productName: "",
        systemPage: '',
        categoryId: "",
        microPageId: "",
        articleTitle: '',
        webArticleId: ''
    }],
    interval: 3, //间隔时间 单位s，使用需要*1000
    pagination: 1 as 1 | 2 | 3 | 4, //分页器 1：样式一；2：样式二，；3：样式三；4：不展示
    borderRadius: 1 as 1 | 2, //图片倒角  1:圆角，2:直角
    upDownEdge: 8, //上下间距
    leftRightEdge: 8, //左右间距


};

// 图片广告-选择分类
export const urlTypeOptions = [
{
    value: '0001',
    label: '商品详情',
},
{
    value: '0002',
    label: '系统页面',
},
{
    value: '0003',
    label: '商品类目',
},
{
    value: '0004',
    label: '微页面',
},
{
    value: '0005',
    label: '官网文章',
}, ] as const;

// 图片广告-系统页面
export const systemPageOptions = [
{
    label: '首页',
    urlType: 1,
},
{
    label: '商品列表',
    urlType: 2,
},
{
    label: '购物车',
    urlType: 3,
},
{
    label: '我的',
    urlType: 4,
}, ] as const;




// 图文导航
export const imageText = {
    styleType: 1 as 1 | 2, //模板样式  1：图文导航，2：文字导航
    bgColor: '', //背景颜色
    fontColor: '#000000', //文字颜色
    list: [
        // {
        //     imgUrl: '',
        //     navName: '导航标题',
        //     urlType: '0001',
        //     productId: "",
        //     productName: "",
        //     systemPage: '',
        //     categoryId: "",
        //     microPageId: ""
        // }
    ]

};


// 自定义标题
export const customTitle = {
    title: '', //标题内容
    subTitle: '', //副标题内容
    textAlign: 'left' as 'left' | 'center' | 'right', //居左：left，居中:center,居右：right
    titleSize: 16 as 12 | 14 | 16, //16,14,12
    subTitleSize: 12 as 12 | 14 | 16, //16,14,12
    titleBold: 'normal' as 'normal' | 'bold', //bold:加粗体，normal：常规体
    subTitleBold: 'normal' as 'normal' | 'bold', //bold:加粗体，normal：常规体
    titleColor: '#000000', //标题颜色
    subTitleColor: '#999999', //副标题颜色
    bgColor: '',
    upDownEdge: 12, //上下间距
    isMore: false, //产看更多
    moreText: '查看更多', //查看更多
    moreColor: '#999999', //查看更多颜色
    urlType: "0001" as UrlType, //链接类型
    productId: "", //
    productName: '', //
    systemPage: '', //
    categoryId: "",
    microPageId: ""

}



// 产品
export const goods = {
    type: '0001' as UrlType, //产品分类
    categoryId: [] as string[], //产品分类
    brandId: [] as string[], //产品品牌
    list: [
        // {
        //     productImage: '',
        //     productName: '',
        //     productId: '',
        //     untaxedUnitPrice: '',
        //     specificationModel: '',
        //     brandChName: ''
        // }
    ], //已选列表
    num: 30, //显示产品数
    listStyle: 3 as 1 | 2 | 3 | 4, //1:大图，2：单列，3：双列，4：上下
    goodsStyle: 1 as 1 | 2 | 3, //1：无边白底，2：卡片投影，3：描边白底
    goodsChamfer: 1 as 1 | 2, //1:圆角，2：直角
    imgRatio: 1 as 1 | 2, //1->1:1,2->3:2
    fontWeight: 'bolder' as 'bolder' | 'normal', //bolder,normal
    pageEdge: 8, //页面边距
    goodsEdge: 8, //商品间距



};
// 选择产品分类
export const goodsOptions = [
{
    value: '0001',
    label: '商品类目',
},
{
    value: '0002',
    label: '商品品牌',
},
{
    value: '0003',
    label: '商品',
}] as const;

// 辅助分割
export const divider = {
    type: 1 as 1 | 2, //分割类型   1->辅助空白,2->辅助线
    blankHeight: 30, //空白高度
    blankColor: "", //空白颜色
    lineStyleType: 'solid' as 'solid' | 'dashed' | 'dotted', //线条样式   solid->实线，dashed->虚线,dotted->点线
    lineLeftRightEdge: 0 as 0 | 1, //左右边距 0->无边距，1->左右留边
    lineColor: '#999999', //辅助线颜色

}
export const leftList = [
    {
        icon: '/img/mp-icon1.png',
        title: '搜索',
        num: 1,
        name: "search",
        data: search,
        right: 'searchEdit'
    }, {
        icon: '/img/mp-icon2.png',
        title: '图片广告',
        num: 5,
        name: "swiper",
        data: swiper,
        right: 'swiper_edit'
    }, {
        icon: '/img/mp-icon3.png',
        title: '导航',
        num: 5,
        name: "imageText",
        data: imageText,
        right: 'imageTextEdit'
    }, {
        icon: '/img/mp-icon4.png',
        title: '标题组件',
        num: 5,
        name: "customTitle",
        data: customTitle,
        right: 'customTitleEdit'
    }, {
        icon: '/img/mp-icon5.png',
        title: '商品',
        num: 5,
        name: "goods",
        data: goods,
        right: 'goodsEdit'
    }, {
        icon: '/img/mp-icon6.png',
        title: '辅助分割',
        num: 20,
        name: "divider",
        data: divider,
        right: 'dividerEdit'
    }
]


// export const mergeCategory = function (data, arr = []) {
//     data.forEach((item) => {
//         arr.push(item)
//         if (item.children && item.children.length > 0) {
//             mergeCategory(item.children, arr)
//             // delete item.children
//         }
//     })
//     return arr
// }