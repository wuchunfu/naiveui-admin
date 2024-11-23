<template>
  <div class="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
    <div class="flex text-400px text-primary">
      <SvgIcon :local-icon="icon"/>
    </div>
    <NButton type="primary" @click="backHome">
      {{ $t('common.backToHome') }}
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { $t } from '@/locales';
import { useRouter } from "vue-router";

defineOptions({
  name: 'ExceptionBase'
});

type ExceptionType = '401' | '403' | '404' | '500'

const props = defineProps({
  type: {
    type: String as PropType<ExceptionType>,
    default: '404'
  }
})

const iconMap: Record<ExceptionType, string> = {
  '401': 'un-authorized',
  '403': 'no-permission',
  '404': 'not-found',
  '500': 'server-error'
};

const icon = computed(() => iconMap[props.type]);

const emits = defineEmits(['click'])

const router = useRouter()

function backHome() {
  const { VITE_ROUTE_HOME_PATH } = import.meta.env
  router.push({ path: VITE_ROUTE_HOME_PATH })
  emits('click')
}
</script>

<style scoped lang="scss">
</style>