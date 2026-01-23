import type { OptionItem,HeaderBar,FooterBar } from './type';
// 链接类型
export const urlTypeOptions:OptionItem[] = [
    {
        value: '0001',
        label: '上架商品',
        url: '/shop/goods-details',
    },
    {
        value: '0002',
        label: '商品类目',
        url: '/shop/goods-center',
    },
    {
        value: '0003',
        label: '商品品牌',
        url: '/shop/goods-center',
    },
    {
        value: '0004',
        label: '官网文章',
        url: '/shop/about',
    },
    {
        value: '0005',
        label: '官网页面',
        url: ``,
    }, ];
    
    // 官网页面 下拉
    export const homePageOptions:OptionItem[] = [
    {
        value: '0001',
        label: '官网首页',
        url: '/shop/home',
    }, {
        value: '0002',
        label: '品牌中心',
        url: '/shop/brand-center',
    }, {
        value: '0003',
        label: '商品中心',
        url: '/shop/goods-center',
    }, {
        value: '0004',
        label: '文章中心',
        url: '/shop/about',
    }]
    
    // 头部导航
    // const tenantDomain = getStore({ name: 'tenantInfo' }).tenantDomain `https://${tenantDomain}`
    export const headerBar:HeaderBar = {
        list: [{ name: '首页', url: `/shop/home`, urlType: '0005', webUrl: '/shop/home', webCode: '0001', productId: "", productName: "", categoryId: '', categoryLevel: "", brandId: "", webArticleId: '', articleTitle: "" }],
        contactNumber: '',
        tenantLogoUrl: ''
    }
    
    // 轮播分类-无用
    export const swiperNav:{ list: [] } = {
        list: [
            // {
            //     imgUrl: 'https://files.axshare.com/gsc/SEU6BF/61/f4/31/61f431e1ad244cd8ab35b12f9a878efd/images/pc%E7%AB%AF%E5%AE%98%E7%BD%91/u64933.png',
            //     url: ``,
            //     urlType: '',
            //     webUrl: '',
            //     webCode: '',
            //     productId: '',
            //     productName: "",
            //     categoryId: '',
            // categoryLevel:'',
            //     brandId: "",
            //     webArticleId: "",
            //     articleTitle: ""
            // }
        ],
        // category: []
    }
    //   分类推荐-无用
    export const categoryRec:{ list: [] } = {
        list: [
            // {
            //     imgUrl: 'https://files.axshare.com/gsc/SEU6BF/61/f4/31/61f431e1ad244cd8ab35b12f9a878efd/images/pc%E7%AB%AF%E5%AE%98%E7%BD%91/u64933.png',
            //     urlType: '0002',
            //     categoryId: '',
            //     categoryName: '分类名称',
            //     categoryLevel:''
            // }, 
        ],
    }
    // 精品推荐-无用
    export const supremeRec:{urlType:string, list: [] } = {
        urlType: '0001',
        list: [
            // { productImage: '',productId:"",productName: '产品编码 产品编码产品编码产品编码产品编码产品编码',untaxedUnitPrice:"",specificationModel:"",brandChName:"" },
        ],
    }
    // 分类产品-无用
    export const categoryGoods:{bgUrl:string, list: [] } = {
        bgUrl: '',
        list: [
            // {
            //     categoryId:'',
            //     categoryName:"",
            //     categoryProducts: [
            //         {
            //             productImage: '',
            //             productId: "",
            //             productName: '产品编码 产品编码产品编码产品编码产品编码产品编码',
            //             untaxedUnitPrice: "",
            //             specificationModel: "",
            //             brandChName: ""
            //         }, 
            //     ],
            // }
        ],
    
    }
    
    // 底部导航
    export const footerBar:FooterBar = {
        codeUrl: '',
        systemInfo: {
            tenantDomain: '',
            unitName: '',
            contactNumber: '',
            email: '',
            tenantOfficeAddressAll: '',
        },
        list: [
            // {
            //     title: '',
            //     articleList: [
            //             {
            //             webArticleId: '',
            //             articleTitle: ""
            //         }
            //     ],
            //     // urls: [
            //     //     { url: '/shop/about?code=0002', name: '公司文化' },
            //     //     { url: '/shop/about?code=0003', name: '企业文化' },
            //     // ],
            // }, 
        ],
    }
    
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