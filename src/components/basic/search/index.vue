<template>
  <div class="flex items-center justify-between w-full mb-12px" ref="formRef">
    <n-card
        v-if="searchFormFields.length"
        size="small"
        :bordered="false"
        class="caret-wrapper"
    >
      <n-collapse>
        <n-collapse-item title="搜索" name="search">
          <BaseForm
              ref="formRef"
              :data="data"
              :items="searchFormFields"
              inline
              is-search
              submit-text="搜索"
              :grid-props="{cols: props.searchCols}"
              @collapse="getTableHeight"
              @submit="submit"
              @reset="reset"
          />
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import BaseForm from "@/components/basic/form/index.vue";
import { computed, onMounted, PropType, ref } from "vue";
import { BaseFormItemProps } from "@/components/basic/form/index";

defineOptions({
  name: 'BaseSearch'
});

const props = defineProps({
  data: {
    type: Object as PropType<any | any[]>
  },
  searchFormItems: {
    type: Array as PropType<Array<BaseFormItemProps>>,
    default: []
  },
  // 搜索个数
  searchCols: {
    type: Number,
    default: 4
  }
});

interface Emits {
  /**
   * 提交表单 返回是否验证通过
   * @param e
   * @param data
   */
  (e: "submit", data: boolean): void;

  (e: "reset"): void;
}

const emits = defineEmits<Emits>();

const submit = (e: any) => {
  emits('submit', e);
};

const reset = () => {
  emits('reset');
}

const searchFormFields = computed(() => {
  if (!props.searchFormItems) {
    return []
  }
  const items: BaseFormItemProps[] = [];
  Object.assign(items, props.searchFormItems)
  return items.filter(item => item?.isSearch).map(item => {
    if (item?.filedOptions?.disabled) {
      item.filedOptions.disabled = false
    }
    return item;
  });
});

const formRef = ref();
const formHeight = ref(58)

const getTableHeight = () => {
  formHeight.value = formRef.value?.clientHeight ?? 58
}

onMounted(() => {
  getTableHeight()
});

defineExpose({
  height: formHeight.value + 20
});
</script>

<style scoped lang="scss"></style>
