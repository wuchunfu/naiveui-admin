<template>
  <div
      class="link-container flex flex-wrap items-center b-rd-3 p-3 gap-2 z-8 bg-container"
      @click="handleLinks(content.link)"
  >
    <!-- 网站 logo -->
    <n-image
        class="image-round"
        :lazy="true"
        :preview-disabled="true"
        width="45"
        height="45"
        :src="content.logo"
        :fallback-src="IconLoad"
    />
    <!-- 标题 描述 -->
    <template v-if="themeStore.card.mode === 1">
      <div class="title-summary-container flex flex-col p-l-2">
        <p class="title font-bold mb-1">{{ content.name }}</p>
        <div class="summary">
          <n-performant-ellipsis
              :line-clamp="2"
              :tooltip="{
                width: 'trigger',
                placement: 'bottom-start',
              }"
          >
            {{ content.summary }}
          </n-performant-ellipsis>
        </div>
      </div>
    </template>
    <template v-else-if="themeStore.card.mode === 2">
      <div class="title-views-likes-container flex flex-col p-l-2">
        <p class="title font-bold mb-1">{{ content.name }}</p>
        <div class="views-likes-container flex items-center gap-3">
            <span class="flex items-center gap-1 dark:text-white">
              <SvgIcon icon="line-md:watch" class="text-18px"/>
              {{ formatNumber(content.views) }}
            </span>
          <span class="flex items-center gap-1 dark:text-white">
              <SvgIcon icon="line-md:heart" class="text-18px"/>
              {{ formatNumber(content.likes) }}
            </span>
        </div>
      </div>
      <div class="summary">
        <n-performant-ellipsis
            :line-clamp="2"
            :tooltip="{ width: 'trigger' }"
        >
          {{ content.summary }}
        </n-performant-ellipsis>
      </div>
    </template>

    <template v-else-if="themeStore.card.mode === 3">
      <div class="title-container flex flex-col p-l-2">
        <p class="title font-bold mb-1">{{ content.name }}</p>
      </div>
    </template>
    <template v-else>
      <div class="title-summary-container flex flex-col p-l-2">
        <p class="title font-bold mb-1">{{ content.name }}</p>
        <div class="summary">
          <n-performant-ellipsis
              :line-clamp="2"
              :tooltip="{ width: 'trigger' }"
          >
            {{ content.summary }}
          </n-performant-ellipsis>
        </div>
      </div>
      <div class="views-likes-container w-full flex items-center gap-3">
          <span class="flex items-center gap-1 dark:text-white">
            <SvgIcon icon="line-md:watch" class="text-18px"/>
            {{ formatNumber(content.views) }}
          </span>
        <span class="flex items-center gap-1 dark:text-white">
             <SvgIcon icon="line-md:heart" class="text-18px"/>
            {{ formatNumber(content.likes) }}
          </span>
        <SvgIcon icon="line-md:external-link-rounded" class="text-18px ml-auto dark:text-white"/>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import IconLoad from "@/assets/svg-icon/empty.svg";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/store";
import { PropType } from "vue";

const themeStore = useThemeStore();
const router = useRouter();

interface Content {
  id: number,
  name: string,
  logo: string
  link: string
  views: number
  likes: number
  summary: string
}

const props = defineProps({
  content: {
    type: Object as PropType<Content>,
    default: {},
  },
});

const handleLinks = (val) => {
  const u = btoa(val);
  let routeData = router.resolve({
    name: "jump",
    query: { id: u },
  });
  window.open(routeData.href, "_blank");
};

// 格式化数字串
const formatNumber = (val) => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<style lang="scss" scoped>
.link-container {
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  transform: translateY(0px);
  transition: all 0.3s ease-in-out;

  .image-round {
    border-radius: 50%;
  }

  .title-summary-container,
  .title-views-likes-container,
  .title-container {
    width: calc(100% - 55px);

    .title {
      font-size: 16px;
      line-height: 1.5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .views-likes-container {
    color: #333;
    font-size: 14px;
  }

  .title-summary-container {
    .summary {
      min-height: 38.4px;
    }
  }

  .summary {
    display: inline-flex;
    font-size: 12px;
    color: #7f85a3;
  }
}

// hover 动效
.link-container:hover {
  transform: translateY(-10px);
  box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
}
</style>
