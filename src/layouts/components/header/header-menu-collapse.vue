
<template>
  <div class="h-full flex-center w-30px cursor-pointer">
    <SvgIcon
        v-if="props.collapsed"
        icon="line-md:menu-unfold-right"
        class="text-20px"
        @click="handleClick"
    />
    <SvgIcon
        v-if="!props.collapsed"
        icon="line-md:menu-unfold-left"
        class="text-20px"
        @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HeaderMenuCollapse'
});

const props = defineProps({
  collapsed: Boolean
});

const emits = defineEmits(["click"])

const handleClick = () => {
  emits('click', !props.collapsed)
}
</script>

<style scoped lang="scss">
</style>