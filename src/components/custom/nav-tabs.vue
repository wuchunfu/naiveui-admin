<template>
  <n-scrollbar x-scrollables>
    <div class="tab-container bg-container">
      <span class="pseudo-elements" :style="{ left: activeLeft + 'px' }"></span>
      <div
          class="tab-btn"
          :class="{ active: activeIndex === index }"
          v-for="(item, index) in content"
          :key="index"
          @mouseover="handleMoveLeft(index)"
          @mouseout="handleOutLeft()"
          @click="handleChange(item.id, index)"
      >
        {{ item[label] }}
      </div>
    </div>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { nextTick, onMounted, PropType, ref } from "vue";

interface TabDetail {
  id: number
}

const props = defineProps({
  content: {
    type: Array as PropType<Array<TabDetail>>,
    required: true,
    default: [],
  },
  label: {
    type: String,
    required: false,
    default: "label",
  },
  tabId: {
    type: Number,
    required: false,
    default: 0,
  },
  tabIndex: {
    type: Number,
    required: false,
    default: 0,
  }
});

const emit = defineEmits(["onChange"]);

const startIndex = ref(0);
const activeIndex = ref(0);
const startLeft = ref(5);
const activeLeft = ref(5);

const handleMoveLeft = (index: number) => {
  if (index === 0) {
    activeLeft.value = 5;
  } else {
    activeLeft.value = index * 120 + 5;
  }
  activeIndex.value = index;
};

const handleOutLeft = () => {
  activeLeft.value = startLeft.value;
  activeIndex.value = startIndex.value;
};

const handleChange = (id: number, index: number, flag: boolean = false) => {
  if (index === 0) {
    startLeft.value = 5;
  } else {
    startLeft.value = index * 120 + 5;
  }
  startIndex.value = index;
  if (flag) {
    activeLeft.value = startLeft.value = index * 120 + 5;
    activeIndex.value = index;
  } else {
    // 设置滚动的距离
    const scrollDistance = activeLeft.value - 120;
    // 获取元素
    const menuElement = document.querySelector(`#menu-Id-${ id }`);
    // 确保 menuElement 存在且其 parentNode 可以滚动
    if (menuElement && menuElement.parentNode instanceof HTMLElement) {
      const parentNode = menuElement.parentNode;
      // 确保 parentNode 可以滚动
      if (parentNode.scrollWidth > parentNode.clientWidth) {
        parentNode.scrollTo({
          left: scrollDistance,
          behavior: 'smooth'
        });
      }
    }
  }
  emit("onChange", {
    id: id,
    index: index
  });
};

onMounted(() => {
  nextTick(() => {
    handleChange(props.tabId, props.tabIndex, true);
  })
});

defineExpose({
  handleChange
});
</script>

<style lang="scss" scoped>
.tab-container {
  width: auto;
  display: inline-block;
  padding: 5px;
  position: relative;
  border-radius: 50px;
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  transform: translateY(0px);
  transition: all 0.3s ease-in-out;

  .pseudo-elements {
    position: absolute;
    bottom: 5px;
    width: 120px;
    height: calc(100% - 10px);
    background-color: rgba(var(--primary-color), 0.2);
    transition: left 0.3s ease;
    border-radius: 50px;
    z-index: 22;
  }

  .tab-btn {
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    position: sticky;
    padding: 0 10px;
    display: inline-block;
    z-index: 25;
  }

  .active {
    color: rgba(var(--primary-color));
  }
}

@media (min-width: 768px) {
  .tab-container {
    overflow-x: hidden;
  }

  .tab-container:hover {
    overflow-x: auto;
  }

  /*滚动条凹槽的颜色 */
  *::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    display: none;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }
}
</style>
