<template>
  <div class="flex items-center justify-between w-full mb-12px" ref="headRef">
    <!-- 左 -->
    <div class="flex-col">
      <n-space align="start">
        <template v-if="title">
          <n-space align="center" size="small">
            <p class="text-16px h-22px font-bold">
              {{ title }}
            </p>
            <n-tooltip trigger="hover" v-if="desc">
              <template #trigger>
                <icon-line-md:question-circle class="text-18px text-gray-400 cursor-pointer"/>
              </template>
              {{ desc }}
            </n-tooltip>
          </n-space>
        </template>
        <template v-if="!title && isAddAction">
          <n-button
              type="primary"
              size="small"
              ghost
              @click="addHandle"
          >
            <SvgIcon icon="line-md:plus" class='text-icon'/>
            新增
          </n-button>
        </template>
      </n-space>
    </div>

    <!-- 右 -->
    <n-space align="end">
      <n-button
          v-if="title && isAddAction"
          type="primary"
          size="small"
          ghost
          @click="addHandle"
      >
        <SvgIcon icon="line-md:plus" class='text-icon'/>
        新增
      </n-button>
      <n-button
          v-if="title && isDeleteAction"
          type="error"
          size="small"
          ghost
          :disabled="disabledDelete"
          @click="deleteHandle"
      >
        <SvgIcon icon="mdi:delete" class='text-icon'/>
        删除
      </n-button>
      <n-button size="small" @click="refresh">
        <SvgIcon
            icon="line-md:rotate-270"
            class='text-icon'
            :class="{ 'animate-spin': loading }"
        />
        刷新
      </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { NButton, NSpace } from "naive-ui";

defineOptions({
  name: 'BaseTableHeader'
});

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  desc: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 添加按钮
  isAddAction: {
    type: Boolean,
    default: false
  },
  // 删除按钮
  isDeleteAction: {
    type: Boolean,
    default: false
  },
  disabledDelete: {
    type: Boolean,
    default: false
  }
});

interface Emits {
  (e: "add"): void;

  (e: "delete", data: any): void;

  (e: "refresh"): void;
}

const emits = defineEmits<Emits>();

const addHandle = () => {
  emits('add');
};

const deleteHandle = (e: any) => {
  emits('delete', e);
};

const refresh = () => {
  emits('refresh');
}

const headRef = ref();
const headHeight = ref(0)

const getHeadHeight = () => {
  headHeight.value = headRef.value?.clientHeight ?? 0
}

onMounted(() => {
  getHeadHeight()
});

defineExpose({
  height: headHeight.value + 20
});
</script>

<style scoped lang="scss"></style>
