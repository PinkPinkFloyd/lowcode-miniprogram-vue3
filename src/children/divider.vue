<!--
 * @Description: 辅助分割
-->

<template>
    <div class="mpp-divider">
        <div v-if="data.type == 1" :style="{
            backgroundColor: data.blankColor,
            height: data.blankHeight + 'px'
        }">
        </div>
        <div v-else :style="{
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: data.lineLeftRightEdge ? '8px' : '',
            paddingRight: data.lineLeftRightEdge ? '8px' : '',
        }">
            <div :style="{
                borderBottomWidth: '1px',
                borderBottomStyle: data.lineStyleType,
                borderBottomColor: data.lineColor
            }"></div>
        </div>

    </div>
</template>
<script>
export default {
    props: { data: Object },
}
</script>

<style lang="scss" scoped></style>
