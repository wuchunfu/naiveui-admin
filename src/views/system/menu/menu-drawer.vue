<template>
  <n-drawer
      v-model:show="drawerOpen"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
      :width="props.width"
  >
    <n-drawer-content :title="`${title}菜单`">
      <BaseForm
          label-width="140px"
          label-align="right"
          ref="formRef"
          v-model:data="formData"
          :items="filedItems"
          :grid-props="{cols:1}"
          @submit="onSubmit"
      >
        <template #parentId="{model,field,item}">
          <menu-select
              v-model:value="model[field]"
              :options="item?.filedOptions?.options"
          />
        </template>
      </BaseForm>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed, PropType, Ref, ref } from "vue";
import BaseForm from "@/components/basic/form/index.vue"
import { BaseFormItemProps } from "@/components/basic/form/index";
import MenuSelect from "@/views/system/menu/menu-select.vue";
import { saveOrUpdateSystemMenu } from "@/service";
import { MenuEnum } from "@/enums/MenuTypeEnum";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  isUpdate: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: {}
  },
  formItems: {
    type: Array as PropType<Array<BaseFormItemProps>>,
    default: []
  },
  width: {
    type: String,
    default: "1000px"
  },
});

const filedItems = computed(() => {
  const dynamicItems: BaseFormItemProps[] = [];
  switch (formData.value?.menuType) {
    case MenuEnum.CATEGORY:
      dynamicItems.push({
        field: 'remark',
        label: '备注',
        filedType: 'string',
        isSearch: false,
        required: false
      })
      break;
    case MenuEnum.MENU:
      dynamicItems.push({
        field: 'routePath',
        label: '路径或者地址',
        labelMessage: "非网页为路径：同对应的后端项目中的 routePath。网页模式则为网址。",
        filedType: 'string',
        isSearch: false,
        required: true
      })
      dynamicItems.push({
        field: 'permissions',
        label: '权限标识',
        labelMessage: "controller中定义的权限标识",
        filedType: 'string',
        isSearch: false,
        required: false
      })
      dynamicItems.push({
        field: 'isIframe',
        label: '是否为网页',
        filedType: 'switch',
        isSearch: false,
        required: true
      })
      dynamicItems.push({
        field: 'remark',
        label: '备注',
        filedType: 'string',
        isSearch: false,
        required: false
      })
      break;
    case MenuEnum.BUTTON:
      dynamicItems.push({
        field: 'permissions',
        label: '权限标识',
        labelMessage: "controller中定义的权限标识",
        filedType: 'string',
        isSearch: false,
        required: true
      })
      dynamicItems.push({
        field: 'remark',
        label: '备注',
        filedType: 'string',
        isSearch: false,
        required: false
      })
      break;
  }
  return props.formItems.concat(dynamicItems)
});

const drawerOpen = computed({
  get() {
    return props.show
  },
  set(val) {
    emits("update:show", val)
  }
});

const emits = defineEmits(["update:show", "success"]);
const formRef = ref();
const formData: Ref = ref({});
const title = computed(() => {
  return props.isUpdate ? "编辑" : "新增"
});

async function onSubmit(valid: boolean) {
  if (valid) {
    if (formData.value?.menuType === MenuEnum.CATEGORY || formData.value?.menuType === MenuEnum.MENU) {
      formData.value.routePath = ""
      formData.value.permissions = ""
      formData.value.isIframe = false
    }
    const { data, error } = await saveOrUpdateSystemMenu(formData.value, props.isUpdate)
    if (!error) {
      // @ts-ignore
      window.$message.success(`${ props.isUpdate ? "编辑" : "新增" }${ data?.name ?? '' }成功`)
      emits("update:show", false)
      emits("success")
      drawerOpen.value = false
    }
  }
}

function onAfterEnter() {
  if (props.isUpdate) {
    const obj = {}
    Object.assign(obj, props.data)
    formData.value = obj
  } else {
    formData.value = {
      drawerOpen: true,
      isIframe: false,
      menuType: MenuEnum.CATEGORY,
      parentId: '0',
      ...props?.data
    }
  }
}

function onAfterLeave() {
  formData.value = {}
}
</script>

<style scoped lang="scss"></style>
