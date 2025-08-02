<script setup lang="ts">
import { RouteLocationMatched, useRoute, useRouter } from "vue-router";
import { System } from "@/types/system";
import { renderIcon } from "@/utils";
import { computed } from "vue";
import { useThemeStore } from "@/store";

defineOptions({
  name: 'GlobalBreadcrumb'
});

const route = useRoute()
const router = useRouter();
const theme = useThemeStore();

// 显示面包屑
const show = computed(() => theme.menu.showBreadcrumb);
// 显示图标
const showIcon = computed(() => theme.menu.showBreadcrumbIcon);

// 生成面包屑列表
const generateBreadcrumbList = (matched: RouteLocationMatched[]): System.GlobalBreadcrumb[] => {
  if (!matched?.length) {
    return [];
  }

  return matched
    .filter(item => item.name) // 过滤掉没有名称的路由
    .map(item => {
      const breadcrumb: System.GlobalBreadcrumb = {
        label: (item.meta?.title as string) || '',
        name: item.name as string,
        icon: showIcon.value && item.meta?.icon ? renderIcon(item.meta?.icon as string) : undefined,
        disabled: item.name === route.name,
      };

      // 处理子路由, 只有当子路由有有效名称时才添加子级面包屑
      if (item.children?.length) {
        const validChildren = item.children.filter(child => child.name);
        if (validChildren.length > 0) {
          breadcrumb.children = generateBreadcrumbList(validChildren as RouteLocationMatched[]);
        }
      }
      return breadcrumb;
    });
};

// 计算面包屑列表
const breadcrumbList = computed(() => generateBreadcrumbList(route.matched))

// 面包屑点击处理
const breadcrumbClick = (itemName: string) => {
  // 确保传入的是有效字符串且不是当前路由
  if (!itemName || itemName === route.name) {
    return;
  }

  router.push({ name: itemName });
}
</script>

<template>
  <n-breadcrumb v-if="show">
    <n-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.name"
    >
      <n-dropdown
        v-if="item.children?.length"
        :options="item.children"
        @select="breadcrumbClick"
        key-field="name"
        :disabled="item.disabled"
      >
        <div class="flex-center">
          <component
            v-if="item.icon && showIcon"
            :is="item.icon"
            class="mr-4px"
          />
          {{ item.label }}
        </div>
      </n-dropdown>
      <div v-else class="flex-center">
        <component
          v-if="item.icon && showIcon"
          :is="item.icon"
          class="mr-4px"
        />
        {{ item.label }}
      </div>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped lang="scss">
</style>
