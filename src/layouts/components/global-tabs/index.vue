<script setup lang="ts">
import Draggable from 'vuedraggable'
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { PageRoute } from "@/types/route";
import { useRoute, useRouter } from "vue-router";
import elementResizeDetectorMaker from "element-resize-detector";
import { renderIcon } from "@/utils";
import { useRouteStore, useTabsStore, useThemeStore } from "@/store";
import { debounce, throttle } from 'lodash-es';

defineOptions({
  name: 'GlobalTabs'
});

const theme = useThemeStore();
const tabsStore = useTabsStore()
const routeStore = useRouteStore()
const router = useRouter();
const route = useRoute();

const tabsScroll = ref<HTMLElement | null>(null);
const tabsWrap = ref<HTMLElement | null>(null);
const pageIsAffix = ref(false);
const activePage = ref<PageRoute | null>(null);

const state = reactive({
  activeTag: computed(() => route.name as string),
  dropdownX: 0,
  dropdownY: 0,
  showDropdown: false,
  scrollable: false,
  currentTab: null as PageRoute | null,
})

// 标签栏高度
const show = computed(() => theme.menu.showTabs);
const tabsHeight = computed(() => theme.menu.tabsHeight);
const tabsList = computed(() => tabsStore.tabList);

const tabsMenuOptions = computed(() => {
  const isDisabled = tabsList.value.length <= 1;
  const isRefresh = activePage.value?.name !== route.name;

  return [
    {
      label: '刷新页面',
      key: 'refresh',
      disabled: isRefresh,
      icon: renderIcon('line-md:rotate-270'),
    },
    {
      label: '关闭当前',
      key: 'closeCurrent',
      disabled: isDisabled || pageIsAffix.value,
      icon: renderIcon('line-md:close-circle'),
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      disabled: isDisabled,
      icon: renderIcon('line-md:close-circle'),
    },
    {
      label: '关闭所有',
      key: 'closeAll',
      icon: renderIcon('line-md:close-circle'),
    },
  ]
})

// 类型定义
type ExpandKey = 'refresh' | 'closeCurrent' | 'closeOther' | 'closeAll'

// 工具函数
const route2PageRoute = (route: any): PageRoute => {
  return {
    name: route.name,
    path: route.path,
    meta: route.meta,
    type: "self"
  }
}

// 判断标签页是否可以关闭
const isClose = (item: PageRoute) => {
  // 固定标签页不能关闭
  if (item.meta?.affix) {
    return false
  }
  // 首页不能关闭
  const { VITE_ROUTE_HOME_PATH } = import.meta.env
  return item.path !== VITE_ROUTE_HOME_PATH;
}

// 标签页点击处理
const onTagClick = (tag: PageRoute) => {
  router.push({ name: tag.name })
}

// 右键菜单处理
const onContextMenu = (e: MouseEvent, tab: PageRoute) => {
  e.preventDefault();
  e.stopPropagation();

  activePage.value = tab;
  pageIsAffix.value = !!tab.meta?.affix;
  state.currentTab = tab;
  state.showDropdown = false;

  nextTick().then(() => {
    state.showDropdown = true;
    state.dropdownX = e.clientX;
    state.dropdownY = e.clientY;
  });
}

// 关闭标签页
const onCloseTabs = (tag: PageRoute) => {
  closeCurrentTabs(tag)
}

// 下拉菜单点击处理
const onDropdownClick = (key: ExpandKey) => {
  switch (key) {
    case 'refresh':
      refreshTabs()
      break;
    case 'closeCurrent':
      closeCurrentTabs(state.currentTab ?? route2PageRoute(route))
      break;
    case 'closeOther':
      closeOtherTabs(route2PageRoute(route))
      break;
    case 'closeAll':
      closeAllTabs()
      break;
  }
  updateTabsScroll()
  state.showDropdown = false
}

// 刷新当前标签页
const refreshTabs = async () => {
  await routeStore.reloadPage()
  await updateTabsScroll()
}

// 关闭当前标签页
const closeCurrentTabs = (page: PageRoute) => {
  // 固定标签页不能关闭
  if (page.meta?.affix) {
    return
  }

  tabsStore.closeCurrentTab(page)

  // 如果关闭的是当前激活的标签页，则跳转到前一个标签页
  if (page.name === state.activeTag) {
    const preTab = tabsStore.tabList[Math.max(0, tabsStore.tabList.length - 1)]
    router.push({ name: preTab.name })
  }

  updateTabsScroll()
}

// 关闭其他标签页
const closeOtherTabs = (page: PageRoute) => {
  tabsStore.closeOtherTabs(page)
  updateTabsScroll()
}

// 关闭所有标签页
const closeAllTabs = () => {
  tabsStore.closeAllTabs()
  router.replace({ path: '/' })
  updateTabsScroll()
}

// 更新标签页滚动状态 - 使用防抖优化
const updateTabsScroll = debounce(async (autoScroll = false) => {
  await nextTick()

  if (!tabsScroll.value) {
    return
  }

  const wrapWidth = tabsScroll.value.scrollWidth
  const scrollWidth = tabsScroll.value.offsetWidth

  state.scrollable = scrollWidth < wrapWidth

  if (state.scrollable && autoScroll) {
    const tagList = tabsScroll.value.querySelectorAll('.tabs-line-scroll-item')
    tagList.forEach((tag: Element) => {
      const htmlTag = tag as HTMLElement
      if (htmlTag.id === `tab_item_${ state.activeTag }`) {
        htmlTag.scrollIntoView?.()
      }
    })
  }
}, 100)

// 滚动到指定位置 - 使用节流优化
const scrollTo = throttle((value: number, amplitude: number) => {
  if (!tabsScroll.value) {
    return
  }

  const currentScroll = tabsScroll.value.scrollLeft
  const scrollWidth =
    (amplitude > 0 && currentScroll + amplitude >= value) ||
    (amplitude < 0 && currentScroll + amplitude <= value)
      ? value
      : currentScroll + amplitude

  tabsScroll.value.scrollTo(scrollWidth, 0)

  if (scrollWidth !== value) {
    window.requestAnimationFrame(() => scrollTo(value, amplitude))
  }
}, 16)

// 向左滚动
const scrollLeft = () => {
  if (!tabsScroll.value) {
    return
  }

  const containerWidth = tabsScroll.value.offsetWidth
  const currentScroll = tabsScroll.value.scrollLeft

  if (!currentScroll) {
    return
  }

  const scrollLeft = currentScroll > containerWidth
    ? currentScroll - containerWidth
    : 0

  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
}

// 向右滚动
const scrollRight = () => {
  if (!tabsScroll.value) {
    return
  }

  const containerWidth = tabsScroll.value.offsetWidth
  const navWidth = tabsScroll.value.scrollWidth
  const currentScroll = tabsScroll.value.scrollLeft

  if (navWidth - currentScroll <= containerWidth) {
    return
  }

  const scrollLeft = navWidth - currentScroll > containerWidth * 2
    ? currentScroll + containerWidth
    : navWidth - containerWidth

  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
}

// 窗口大小变化处理
const onResize = () => {
  updateTabsScroll(true)
}

// 监听元素大小变化
const onElementResize = () => {
  if (tabsScroll.value) {
    elementResizeDetectorMaker().listenTo(tabsScroll.value, onResize)
  }
}

// 滚动事件处理
const onScroll = throttle((e: Event) => {
  // 在页面滚动时确保当前激活的标签页在可视区域内
  if (state.activeTag && tabsScroll.value) {
    const activeTabElement = document.getElementById(`tab_item_${ state.activeTag }`)
    if (activeTabElement) {
      const containerRect = tabsScroll.value.getBoundingClientRect()
      const tabRect = activeTabElement.getBoundingClientRect()

      // 检查标签是否在可视区域内
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        // 如果不在可视区域内，则滚动到该标签
        activeTabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }
}, 100)

// 监听路由变化，添加标签页
watch(() => route.name, () => {
    tabsStore.addTab(route2PageRoute(route))
  },
  { immediate: true }
)

// 组件挂载后初始化
onMounted(() => {
  onElementResize()
})

// 添加全局滚动监听
const scrollHandler = (e: Event) => onScroll(e);
window.addEventListener('scroll', scrollHandler, true)

// 组件卸载时清理事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler, true)
  // 如果使用了 elementResizeDetectorMaker，也应该在这里清理
  if (tabsScroll.value) {
    elementResizeDetectorMaker().removeAllListeners(tabsScroll.value)
  }
})
</script>

<template>
  <div
    class="tabs-view flex w-full items-center px-12px bg-#fff dark:bg-dark"
    :style="{ height: `${tabsHeight}px` }"
    v-if="show"
  >
    <div class="tabs-view-main">
      <div
        ref="tabsWrap"
        class="tabs-line"
        :class="{'tabs-line-scroll--ed': state.scrollable}"
      >
        <div
          class="tabs-line-left bg-#f8f8f8 text-#666 dark:text-#999"
          @click="scrollLeft"
          v-if="state.scrollable"
        >
          <SvgIcon icon="line-md:chevron-left"/>
        </div>
        <div
          class="tabs-line-right bg-#f8f8f8 text-#666 dark:text-#999"
          @click="scrollRight"
          v-if="state.scrollable"
        >
          <SvgIcon icon="line-md:chevron-right"/>
        </div>
        <div class="tabs-line-scroll" ref="tabsScroll">
          <!-- 标签页拖拽区域 -->
          <Draggable
            :list="tabsList"
            animation="300"
            item-key="fullPath"
            class="flex"
            @end="updateTabsScroll"
          >
            <template #item="{element}">
              <div
                class="tabs-line-scroll-item"
                :id="`tab_item_${element.name}`"
                @click.stop="onTagClick(element)"
                @contextmenu="onContextMenu($event, element)"
              >
                <div class="flex-1 flex items-center justify-center">
                  <n-button
                    size="small"
                    :type="state.activeTag === element.name ? 'primary' : 'default'"
                    ghost
                  >
                    <SvgIcon
                      :icon="element.meta.icon"
                      :class="{'text-primary': state.activeTag === element.name}"
                      class="mr-6px"
                    />
                    {{ element.meta.title }}
                    <SvgIcon
                      icon="line-md:close"
                      class="text-14px ml-6px mr--6px p-1px rounded-50 hover:bg-primary_3 hover:text-#fff"
                      v-if="isClose(element)"
                      @click.stop="onCloseTabs(element)"
                    />
                  </n-button>
                </div>
              </div>
            </template>
          </Draggable>
        </div>
      </div>

      <!-- 下拉菜单 -->
      <n-dropdown
        trigger="hover"
        :options="tabsMenuOptions"
        placement="bottom-end"
        @select="onDropdownClick"
      >
        <div class="bg-#f8f8f8 dark:bg-#333 text-#666 dark:text-#999 rounded-4px ml-12px">
          <n-button class="w-32px h-32px" size="small" :bordered="false">
            <template #icon>
              <SvgIcon icon="solar:alt-arrow-down-linear"/>
            </template>
          </n-button>
        </div>
      </n-dropdown>

      <!-- 右键菜单 -->
      <n-dropdown
        :show="state.showDropdown"
        :x="state.dropdownX"
        :y="state.dropdownY"
        :options="tabsMenuOptions"
        @select="onDropdownClick"
        placement="bottom-start"
        @clickoutside="state.showDropdown=false"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-view {
  &-main {
    display: flex;
    align-items: center;
    max-width: 100%;
    min-width: 100%;
  }
}

.tabs-line {
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  position: relative;

  &-scroll {
    white-space: nowrap;
    overflow: hidden;

    &--ed {
      padding: 0 32px;
      overflow: hidden;
    }

    &-item {
      margin-right: 12px;
      cursor: pointer;
      display: inline-block;
      position: relative;
      flex: 0 0 auto;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }
  }

  .tabs-line-left, .tabs-line-right {
    width: 32px;
    text-align: center;
    position: absolute;
    height: 32px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    z-index: 10;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .tabs-line-left {
    left: 0;
  }

  .tabs-line-right {
    right: 0;
  }
}

.tabs-close {
  min-width: 32px;
  width: 32px;
  height: 32px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-active-bg {
  background-color: var(--n-color)
}
</style>
