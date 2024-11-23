<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({
  name: 'AnimationConfig'
});

const themeStore = useThemeStore();

/**
 * 过渡动画类型
 * 过渡动画类型
 * fade-slide 滑动
 * fade 淡入淡出
 * fade-bottom 底部消退
 * fade-scale 缩放消退
 * zoom-fade 渐变
 * zoom-out 闪现
 * none 无动画
 */
const animationOptions = [
  { label: '滑动', value: 'fade-slide' },
  { label: '淡入淡出', value: 'fade' },
  { label: '底部消退', value: 'fade-bottom' },
  { label: '缩放消退', value: 'fade-scale' },
  { label: '渐变', value: 'zoom-fade' },
  { label: '闪现', value: 'zoom-out' },
  { label: '无动画', value: 'none' }
]
</script>

<template>
  <n-divider><p>动画配置</p></n-divider>
  <div class="flex items-center justify-between">
    <p class="text-16px ">过渡动画</p>
    <n-switch v-model:value="themeStore.animation.enable"/>
  </div>
  <div class="flex items-center justify-between mt-12px">
    <p class="text-16px ">动画效果</p>
    <n-select
        class="w-120px text-center"
        v-model:value="themeStore.animation.type"
        :options="animationOptions"
        placeholder="选择效果"
    >
    </n-select>
  </div>
</template>

<style scoped lang="scss"></style>
