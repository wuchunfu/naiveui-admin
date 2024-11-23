<template>
  <div class="w-full" v-if="isLoading">
    <div class="pt-5" v-for="(item, index) in menuList" :key="index">
      <NavCategoryMenu class="mb-3" :content="item"/>

      <template v-if="item.children.length > 0">
        <NavTabs
            class="mb-4"
            label="menuName"
            :content="item.children"
            :tabId="tabId"
            :tabIndex="tabIndex"
            @on-change="handleTabs"
        />
      </template>

      <n-grid x-gap="20" cols="1 400:2 600:2 800:3 900:4 1100:4 1200:5 1500:7">
        <n-grid-item
            v-for="(cardItem, cardIndex) in linkList"
            :key="cardIndex"
            :span="1"
            class="flex align-center justify-center"
        >
          <NavLinkCard class="mb-6" :content="cardItem"/>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
  <div class="loading-container" :class="{ isLoadingBar: !isLoading }" v-else></div>
</template>

<script setup lang="ts">
import NavCategoryMenu from "@/components/custom/nav-category-menu.vue";
import NavTabs from "@/components/custom/nav-tabs.vue";
import NavLinkCard from "@/components/custom/nav-link-card.vue";
import { nextTick, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store";
import { getByCategoryId } from "@/service/api";

interface MenuItem {
  id: number,
  menuName: string,
  icon: string,
  routePath: string,
  children: Array<MenuItem>
}

interface LinkItem {
  id: number,
  name: string,
  logo: string
  link: string
  summary: string
  views: number
  likes: number
}

const useAuth = useAuthStore();
const route = useRoute();

const isLoading = ref(true);
const linkList = ref<Array<LinkItem>>([]);
const menuList = ref<Array<MenuItem>>([]);
const tabId = ref();
const tabIndex = ref();

const getLinkList = (id: string | number) => {
  getByCategoryId(id).then((res) => {
    linkList.value = res.data
  });
};

const getMenuList = () => {
  const parentId = findParentId(useAuth.menus, route.fullPath)
  const menus = useAuth.menus.filter(row => row.id === parentId);

  if (menus.length > 0) {
    menuList.value = menus;
    menus.forEach((item: MenuItem) => {
      if (item.children.length > 0) {
        item.children.forEach((child: MenuItem, index: number) => {
          if (child.routePath === route.path) {
            tabId.value = child.id
            tabIndex.value = index
            getLinkList(child.id);
          }
        });
      }
    });
  }
};

const handleTabs = (item: any) => {
  getLinkList(item.id);
};

function findParentId(items: any[], targetPath: string): number | null {
  for (const item of items) {
    if (item.routePath === targetPath) {
      return item.parentId;
    }
    const result = findParentId(item.children, targetPath);
    if (result !== null) {
      return result;
    }
  }
  return null;
}

// const linkList = ref<Array<Content>>([{
//   id: 1,
//   name: "测试1",
//   icon: "https://vitejs.dev/logo-with-shadow.png",
//   link: "",
//   views: 1,
//   likes: 1,
//   description: "测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述测试描述"
// }, {
//   id: 2,
//   name: "测试2",
//   icon: "https://vitejs.dev/logo-with-shadow.png",
//   link: "",
//   views: 1,
//   likes: 1,
//   description: "测试描述"
// }]);

// const menuList = ref([{
//   id: 1,
//   name: "首页",
//   icon: "line-md:compass-loop",
//   children: [
//     {
//       id: 1,
//       name: "测试1",
//       icon: "line-md:compass-loop",
//       children: [],
//     },
//     {
//       id: 2,
//       name: "测试2",
//       icon: "line-md:compass-loop",
//       children: [],
//     },
//   ],
// }]);

onMounted(() => {
  nextTick(() => {
    getMenuList();
  })
});
</script>

<style scoped lang="scss">
.loading-container {
  margin-top: 20%;
  letter-spacing: 5px;
  font-weight: bold;
}
</style>
