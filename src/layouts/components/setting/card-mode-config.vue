<script setup lang="ts">
import { useThemeStore } from '@/store';

defineOptions({
  name: 'CardModeConfig'
});

const themeStore = useThemeStore();

const handleSkeleton = (val: number) => {
  themeStore.setCardMode(val);
};
</script>

<template>
  <n-divider>卡片模式配置</n-divider>
  <div class="flex gap-3 flex-wrap justify-between">
    <n-space
        class="skeleton-content cursor-pointer p-4px border-2px hover:border-primary rounded-6px text-100px"
        :class="[themeStore.card.mode === 1 ? 'border-primary' : 'border-transparent']"
        @click="handleSkeleton(1)"
    >
      <n-skeleton height="20px" circle/>
      <div>
        <n-skeleton height="10px" :width="65"/>
        <n-skeleton class="mt-1" height="10px" :width="65"/>
      </div>
      <n-skeleton class="delete-skeleton-line" height="10px" :width="97"/>
    </n-space>

    <n-space
        class="skeleton-content cursor-pointer p-4px border-2px hover:border-primary rounded-6px text-100px"
        :class="[themeStore.card.mode === 2 ? 'border-primary' : 'border-transparent']"
        @click="handleSkeleton(2)"
    >
      <n-skeleton height="20px" circle/>
      <div>
        <n-skeleton height="10px" :width="65"/>
        <div class="flex items-center gap-4 mt-1" style="width: 65px">
          <n-skeleton height="10px" circle/>
          <n-skeleton height="10px" circle/>
        </div>
      </div>
      <n-skeleton height="10px" :width="97"/>
    </n-space>

    <n-space
        class="skeleton-content cursor-pointer p-4px border-2px hover:border-primary rounded-6px text-100px"
        :class="[themeStore.card.mode === 3 ? 'border-primary' : 'border-transparent']"
        @click="handleSkeleton(3)"
    >
      <n-skeleton height="20px" circle/>
      <div>
        <n-skeleton height="10px" :width="65"/>
        <n-skeleton class="mt-1 delete-skeleton-line" height="10px" :width="65"/>
      </div>
      <n-skeleton class="delete-skeleton-line" height="10px" :width="97"/>
    </n-space>

    <n-space
        class="skeleton-content cursor-pointer p-4px border-2px hover:border-primary rounded-6px text-100px"
        :class="[themeStore.card.mode === 4 ? 'border-primary' : 'border-transparent']"
        @click="handleSkeleton(4)"
    >
      <n-skeleton height="20px" circle/>
      <div>
        <n-skeleton height="10px" :width="65"/>
        <n-skeleton class="mt-1" height="10px" :width="65"/>
      </div>
      <div class="flex items-center gap-1" style="width: 97px">
        <n-skeleton height="10px" circle/>
        <n-skeleton height="10px" circle/>
        <n-skeleton class="ml-auto" height="10px" circle/>
      </div>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.skeleton-content {
  width: 45%;
}

.cardActive {
  border-radius: 6px;
  border: 2px solid var(--primary-hover);
}

.delete-skeleton-line {
  position: relative;
  background: none;
  animation: 0;
}

.delete-skeleton-line::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  border: 1px solid #eee;
  border-radius: 2px;
}
</style>
