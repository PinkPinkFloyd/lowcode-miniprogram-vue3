<template>
    <!-- 外层容器，表示整个滑动条 -->
    <div class="slider" ref="sliderRef" @click.stop="handleClickSlider">
      <!-- 已滑动进度条 -->
      <div
        class="process"
        :style="{ width: widthStyle, background: bgColor }"
      ></div>
  
      <!-- 拖拽手柄 -->
      <div
        class="thunk"
        ref="thunkRef"
        :style="{ left: leftStyle }"
      >
        <!-- 手柄的小圆点 -->
        <div class="block" ref="dotRef"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, nextTick } from 'vue'
  
  /* ---------------- props / emits ---------------- */
  // 定义组件可接收的参数和类型
  const props = defineProps({
    min: {           // 最小值
      type: Number,
      default: 0
    },
    max: {           // 最大值
      type: Number,
      default: 100
    },
    value: {         // 当前值（父组件传入）
      type: Number,
      default: 0
    },
    bgColor: {       // 进度条颜色
      type: String,
      default: '#4ab157'
    },
    isDrag: {        // 是否允许拖拽
      type: Boolean,
      default: true
    }
  })
  
  // 定义事件
  const emit = defineEmits<{
    (e: 'input', value: number): void     // 拖拽或点击更新值
    (e: 'stop', value: number): void      // 拖拽结束
  }>()
  
  /* ---------------- refs ---------------- */
  // DOM 引用
  const sliderRef = ref<HTMLDivElement | null>(null)  // 滑动条容器
  const thunkRef = ref<HTMLDivElement | null>(null)   // 手柄容器
  const dotRef = ref<HTMLDivElement | null>(null)     // 手柄圆点
  
  // 当前值，响应式，内部使用
  const per = ref<number>(props.value)
  
  /* ---------------- computed ---------------- */
  // 当前值对应的比例（0~1）
  const scale = computed(() => {
    return (per.value - props.min) / (props.max - props.min)
  })
  
  // 进度条宽度
  const widthStyle = computed(() => {
    if (!sliderRef.value) return '0px'
    // 进度条宽度 = 总宽度 * 百分比
    return sliderRef.value.offsetWidth * scale.value + 'px'
  })
  
  // 手柄位置
  const leftStyle = computed(() => {
    if (!sliderRef.value || !thunkRef.value) return '0px'
    // 手柄居中对齐进度条末端
    return (
      sliderRef.value.offsetWidth * scale.value -
      thunkRef.value.offsetWidth / 2 +
      'px'
    )
  })
  
  /* ---------------- methods ---------------- */
  
  // 点击滑动条跳转
  const handleClickSlider = (event: MouseEvent) => {
    if (!props.isDrag) return                // 禁止拖拽模式
    if (event.target === dotRef.value) return // 点击手柄本身不触发
    if (!sliderRef.value) return
  
    const width = sliderRef.value.offsetWidth          // 滑动条总宽
    const offsetX = event.offsetX                     // 点击位置距离左侧距离
    const scale = ((offsetX / width) * props.max).toFixed(0) // 转换成数值
    per.value = Number(scale)                         // 更新内部值
    emit('input', per.value)                          // 触发父组件更新
  }
  
  // 初始化拖拽
  const initDrag = () => {
    if (!props.isDrag) return
    if (!thunkRef.value || !sliderRef.value) return
  
    // 鼠标按下
    thunkRef.value.onmousedown = (e: MouseEvent) => {
      const startX = e.clientX                  // 鼠标起始位置
      const startWidth = parseInt(widthStyle.value) // 当前进度条宽度
  
      // 鼠标移动事件
      document.onmousemove = (e: MouseEvent) => {
        if (!sliderRef.value) return
  
        const newWidth = e.clientX - startX + startWidth // 拖动后的宽度
        const scale = newWidth / sliderRef.value.offsetWidth // 换算比例
        let val = Math.ceil((props.max - props.min) * scale + props.min) // 换算成数值
  
        // 限制数值在 min ~ max
        val = Math.max(val, props.min)
        val = Math.min(val, props.max)
  
        per.value = val                 // 更新内部值
        emit('input', per.value)        // 触发父组件更新
      }
  
      // 鼠标释放
      document.onmouseup = () => {
        emit('stop', per.value)        // 拖拽结束事件
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
  
  /* ---------------- lifecycle ---------------- */
  onMounted(() => {
    // 下一次 DOM 更新后初始化拖拽事件
    nextTick(() => {
      initDrag()
    })
  })
  
  /* ---------------- watch ---------------- */
  // 监听父组件传入的 value 改变
  watch(
    () => props.value,
    (val) => {
      per.value = val
    }
  )
  </script>
  
  <style scoped>
  /* 整个滑动条 */
  .slider {
    position: relative;
    width: 100%;
    height: 8px;
    background: rgba(238, 238, 238, 1);
    border-radius: 5px;
    cursor: pointer;
    z-index: 9;
  }
  
  /* 进度条样式 */
  .slider .process {
    position: absolute;
    left: 0;
    top: 0;
    height: 8px;
    border-radius: 5px;
    z-index: 11;
  }
  
  /* 拖拽手柄 */
  .slider .thunk {
    position: absolute;
    top: -2px;
    width: 8px;
    height: 8px;
    z-index: 12;
  }
  
  /* 手柄小圆点 */
  .slider .block {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    transition: 0.2s all;
    border: 1px solid #2386ee;
  }
  
  /* hover 手柄放大效果 */
  .slider .block:hover {
    transform: scale(1.1);
  }
  </style>
  