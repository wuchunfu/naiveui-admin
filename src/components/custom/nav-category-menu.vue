<template>
  <div class="category-container flex justify-start items-center mb-2">
    <SvgIcon :icon="content.icon" class="text-18px ml-3"/>
    <p class="title ml-2 font-bold" :id="`menu-Id-${content.id}`">
      {{ content.menuName }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineOptions({
  name: 'NavCategoryMenu'
});

interface Content {
  id: number,
  menuName: string,
  icon: string
}

const props = defineProps({
  content: {
    type: Object as PropType<Content>,
    default: {},
  }
});
</script>

<style lang="scss" scoped>
.category-container {
  .title {
    font-size: 16px;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transform: translateY(0px);
    transition: all 0.3s ease-in-out;
  }
}
</style>
