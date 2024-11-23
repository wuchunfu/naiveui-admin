<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';

defineOptions({
  name: 'LangSwitch'
});

interface Props {
  /** Current language */
  lang: I18n.LangType;
  /** Language options */
  langOptions: I18n.LangOption[];
  /** Show tooltip */
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true
});

type Emits = {
  (e: 'changeLang', lang: I18n.LangType): void;
};

const emit = defineEmits<Emits>();

function changeLang(lang: I18n.LangType) {
  emit('changeLang', lang);
}

const tooltipContent = computed(() => {
  if (!props.showTooltip) {
    return '';
  }
  return $t('icon.lang');
});
</script>

<template>
  <NDropdown
      :value="lang"
      :options="langOptions"
      :show-arrow="true"
      trigger="hover"
      @select="changeLang"
  >
    <div class="flex-center w-48px text-24px">
      <ButtonIcon
          icon="heroicons:language"
          :tooltip-content="tooltipContent"
          tooltip-placement="left"
      />
    </div>
  </NDropdown>
</template>

<style scoped lang="scss"></style>
