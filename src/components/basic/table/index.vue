<template>
  <div>
    <!--  搜索  -->
    <BaseSearch
        :data="formData"
        :searchFormItems="searchFormItems"
        @submit="onFormSubmit"
        @reset="onGetTableData"
    />

    <n-card
        :bordered="false"
        :content-style="{margin:0,padding:'16px' }"
        class="mb-12px mt-10px"
    >
      <BaseTableHeader
          ref="headDom"
          :title="title"
          :desc="desc"
          :loading="loading"
          :isAddAction="isAddAction"
          :isDeleteAction="isDeleteAction"
          @add="addHandle"
          @delete="deleteHandle"
          @refresh="onGetTableData"
      />

      <n-data-table
          :columns="tableColumns"
          :row-key="rowData => rowData[props.rowKey]"
          :data="tableData"
          :loading="props.loading"
          striped
          :pagination="pagination"
          :max-height="tableHeight"
          :scroll-x="tableHeight"
          @update:page-size="onPageSizeChange"
          @update:page="onPageChange"
      >
        <template #empty>
          <div class="flex-col-center">
            <SvgIcon local-icon="empty" class="text-400px text-primary"/>
            <p class="text-20px text-primary" v-if="!props.emptyText">
              无{{ props.title }}数据~
            </p>
            <p class="text-20px text-primary" v-else>
              {{ props.emptyText }}
            </p>
          </div>
        </template>
      </n-data-table>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { BaseFormItemProps } from "@/components/basic/form/index";
import BaseSearch from "@/components/basic/search/index.vue";
import BaseTableHeader from "@/components/basic/table/header-operation.vue";
import { ITableColumn } from "@/components/basic/table/index";
import { generateTableColumnRender } from "@/components/basic/table/render";
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { computed, onMounted, PropType, reactive, ref, unref } from "vue";

defineOptions({
  name: 'BaseTable'
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
  rowKey: {
    type: String,
    default: 'id'
  },
  data: {
    type: Object as PropType<any | any[]>
  },
  loading: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array as PropType<Array<ITableColumn>>,
    default: []
  },
  searchFormItems: {
    type: Array as PropType<Array<BaseFormItemProps>>,
    default: []
  },
  rowAction: Function as PropType<(row: any, rowIndex: number) => any>,
  getData: Function as PropType<({}) => any>,
  // 列表数据取值key
  dataKey: {
    type: String,
    default: 'records'
  },
  // 默认操作按钮
  isAction: {
    type: Boolean,
    default: true
  },
  // 添加按钮
  isAddAction: {
    type: Boolean,
    default: false
  },
  // 编辑按钮
  isEditAction: {
    type: Boolean,
    default: true
  },
  // 删除按钮
  isDeleteAction: {
    type: Boolean,
    default: true
  },
  // 类型 page：分页列表  list：列表
  type: {
    type: String as PropType<'page' | 'list'>,
    default: 'page'
  },
  // 搜索个数
  searchCols: {
    type: Number,
    default: 4
  },
  isSelect: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: String,
    default: null
  },
  // 未使用
  loadingText: {
    type: String,
    default: null
  }
});

const emits = defineEmits<{
  /**
   * 获取数据 返回data
   * @param e 事件名
   * @param data 数据
   */
  (e: 'getData', data: any): void;
  /**
   * 新增
   * @param e 事件名
   */
  (e: 'add'): void;
  /**
   * 编辑
   * @param e 事件名
   * @param data 数据
   */
  (e: 'edit', data: any): void;
  /**
   * 删除
   * @param e 事件名
   */
  (e: 'delete', data: any): void;
}>();

const getDataHandle = (e: any) => {
  emits('getData', e);
};

const addHandle = () => {
  emits('add');
};

const editHandle = (e: any) => {
  emits('edit', e);
};

const deleteHandle = (e: any) => {
  emits('delete', e);
};

const formData = reactive({});

// 分页数据
const pagination = reactive({
  page: parseInt(props.data?.current ?? 1),
  pageSize: parseInt(props.data?.size ?? 10),
  pageCount: parseInt(props.data?.total ?? 1),
  pageSizes: [10, 20, 30, 40, 50],
  showSizePicker: true
});

const tableColumns = computed(() => {
  const columns = props.columns.map((item: ITableColumn) => {
    return {
      key: item.field,
      align: 'center',
      titleAlign: 'center',
      render: item.render ?? generateTableColumnRender(item),
      width: item.labelWidth ?? 100,
      fixed: item.fixed ?? false,
      ...item
    } as any
  });
  if (props.isAction) {
    columns.push({
      key: defaultAction.field,
      align: 'center',
      titleAlign: 'center',
      render: defaultAction.render,
      width: defaultAction.labelWidth ?? 100,
      ...defaultAction
    } as any)
  }
  if (props.isSelect) {
    return [{
      type: 'selection',
    }, ...columns]
  }
  return columns
});

const defaultAction = reactive<ITableColumn>({
  field: 'actions',
  fixed: 'right',
  title: '操作',
  labelWidth: 140,
  render: (row: any, rowIndex: number) => {
    return (
        <NSpace size="small" justify="center">
          {
            props.rowAction?.(row, rowIndex)
          }
          {
              props.isEditAction && (
                  <NButton
                      type="primary"
                      ghost
                      size="small"
                      onClick={ () => editHandle(row) }
                  >
                    编辑
                  </NButton>
              )
          }
          {
              props.isDeleteAction && (
                  <NPopconfirm
                      onPositiveClick={ () => deleteHandle }
                      v-slots={ {
                        trigger: () => {
                          return (
                              <NButton
                                  type="error"
                                  ghost
                                  size="small"
                              >
                                删除
                              </NButton>
                          );
                        },
                      } }
                  >
                    确认删除吗？
                  </NPopconfirm>
              )
          }
        </NSpace>
    );
  }
});

const tableData = computed(() => {
  if (!props.data) {
    return []
  }
  if (props.type === 'list') {
    return props.data
  } else {
    return props.data[props.dataKey]
  }
});

const headDom = ref();
const formDom = ref();

// 获取dom的高度
const getDomHeight = (dom: any) => {
  return unref(dom)?.clientHeight ?? 0
}

const tableHeight = ref(910);

function onPageChange(page: number) {
  pagination.page = page;
  onGetTableData();
}

function onPageSizeChange(pageSize: number) {
  pagination.pageSize = pageSize;
  onGetTableData();
}

// 高度处理
function getTableHeight(num?: number) {
  if (num) {
    tableHeight.value = window.innerHeight - 108 - num - 20 - getDomHeight(headDom) - 80 - 86 - 12
  } else {
    tableHeight.value = window.innerHeight - 108 - formDom.value?.height - getDomHeight(headDom) - 80 - 86 - 6
  }
}

function onFormSubmit(state: boolean) {
  if (state) {
    onGetTableData()
  }
}

function onGetTableData() {
  if (props.type === 'page') {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...unref(formData)
    }
    getDataHandle(params)
    props.getData?.({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...unref(formData)
    })
  } else {
    getDataHandle(unref(formData))
    props.getData?.(unref(formData))
  }
}

onMounted(() => {
  // 获取当前屏幕高度
  getTableHeight()
  onGetTableData()
});
</script>

<style scoped lang="scss"></style>
