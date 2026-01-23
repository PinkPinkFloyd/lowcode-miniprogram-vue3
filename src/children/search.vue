<!--
 * @Description: 商品搜索
-->
<template>
    <div :style="{ '--input-clor': data.fontColor,backgroundColor:data.bgColor }" class="mpp-search">
        <div :style="{borderRadius: data.isBorderRadius?'50px':'0',backgroundColor:data.themeColor}" class="mpp-search-box">
            <i class="el-icon-search"></i>
            <input :style="{color:data.fontColor}" type="text" placeholder="搜索商品名称 规格型号 品牌 商品货号">
        </div>
    </div>
</template>
<script>
export default {
    props: { data: Object },
}
</script>
<style scoped lang="scss">
*::-webkit-input-placeholder {
  color: var(--input-clor);
  opacity: .6;
}
*:-moz-placeholder {
  color: var(--input-clor);
  opacity: .6;
}
*::-moz-placeholder {
  color: var(--input-clor);
  opacity: .6;
}
*::-ms-input-placeholder {
  color: var(--input-clor);
  opacity: .6;
}
*:-ms-input-placeholder {
  color: var(--input-clor);
  opacity: .6;
}
.mpp-search{
    height: 50px;
    padding:5px 8px;
    .mpp-search-box{
        display: flex;
        align-items: center;
        height: 40px;
        padding:0 10px;
        i{
            font-size: 15px;
            color: var(--input-clor);
            opacity: .7;
        }
        input{
            outline: medium;
            border: none;
            flex:1;
            height: 100%;
            margin-left: 5px;
            background-color: transparent;
            
        }
    }

}
</style>
