<script setup lang="ts">
import { useDialog } from 'naive-ui';
import localAvatarUrl from "@/assets/images/user-avatar.png"
import { useAuthStore } from "@/store";
import { System } from "@/types/system";
import { renderIcon } from "@/utils";

defineOptions({
  name: 'HeaderAvatar'
});

const authStore = useAuthStore()

const avatarUrl = computed(() => authStore.userInfo?.avatar || localAvatarUrl)
// 个人中心 系统设置 退出登录
const options: System.GlobalDropdown[] = [
  {
    key: 'profile',
    label: '个人中心',
    icon: renderIcon("line-md:person"),
  },
  {
    key: 'setting',
    label: '系统设置',
    icon: renderIcon('line-md:cog-loop'),
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: renderIcon('line-md:logout'),
  },
];

const dialog = useDialog()

const handleSelect = (key: string) => {
  switch (key) {
    case 'profile':
      break
    case 'setting':
      break
    case 'logout':
      dialog.info({
        title: '提示',
        content: '确定退出登录吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          authStore.logout()
        }
      })
      break
  }
}
</script>

<template>
  <div class="flex-center cursor-pointer">
    <n-divider vertical/>
    <base-dropdown-container
      :options="options"
      size="medium"
      @select="handleSelect"
    >
      <n-avatar
        :src="avatarUrl"
        round
        class="ml-6px"
      />
    </base-dropdown-container>
  </div>
</template>

<style scoped lang="scss">
</style>
