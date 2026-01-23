export interface OptionItem {
    value: string
    label: string
    url?: string
}
export interface HeaderNavItem {
    name: string
    url: string
    urlType: string
    webUrl: string
    webCode: string
    productId: string
    productName: string
    categoryId: string
    categoryLevel: string
    brandId: string
    webArticleId: string
    articleTitle: string
}

export interface HeaderBar {
    list: HeaderNavItem[]
    contactNumber: string
    tenantLogoUrl: string
}


  
  export interface FooterBar {
    codeUrl: string
    systemInfo: {
      tenantDomain: string
      unitName: string
      contactNumber: string
      email: string
      tenantOfficeAddressAll: string
    }
    list: []
  }
