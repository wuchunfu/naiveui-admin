<script setup lang="ts">
defineOptions({
  name: 'HeaderAppTitle'
});

const route = useRoute()
</script>

<template>
  <n-space align="center" size="small">
    <SvgIcon
      v-if="false"
      icon="material-symbols:arrow-back-ios-rounded"
      class="text-20px text-center hover:cursor-pointer hover:opacity-75"
    />
    <p class="text-16px font-bold">
      {{ route.meta?.title }}
    </p>
  </n-space>
</template>

<style scoped lang="scss">
</style>
