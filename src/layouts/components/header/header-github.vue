<template>
  <div class="flex-center w-48px text-24px">
    <ButtonIcon
        icon="line-md:github"
        :tooltip-content="$t('icon.github')"
        tooltip-placement="bottom"
        @click="openGithub"
    />
  </div>
</template>

<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'HeaderGithub'
});

const githubUrl = "https://github.com"

function openGithub() {
  window.open(githubUrl)
}
</script>

<style scoped lang="scss"></style>
