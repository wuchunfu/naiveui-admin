<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <BaseTable
        :columns="columns"
        :loading="pageState.loading"
        :data="pageState.tableData"
        :get-data="onGetData"
        :search-form-items="formFiledList"
        is-add-action
        is-select
        title="系统用户"
        desc="系统用户"
        @add="onAdd"
        @edit="onEdit"
        @delete="onDelete"
    />

    <UserDrawer
        v-model:show="pageState.drawerOpen"
        :is-update="pageState.isUpdate"
        :data="pageState.editData"
        @success="onGetData"
        :form-items="formFiledList"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseFormItemProps } from "@/components/basic/form/index";
import { ITableColumn } from "@/components/basic/table/index";
import BaseTable from "@/components/basic/table/index.vue";
import UserDrawer from "@/views/system/user/user-drawer.vue";
import { computed, reactive, ref } from "vue";
// import { deleteSystemUser, queryAllSystemRole, querySystemUser } from "@/service";
import { deleteSystemUser } from "@/service";

defineOptions({
  name: 'User'
})

const pageInfo = reactive({
  routePath: "/system/admin/user",
  menuName: "系统用户",
});

const formRef = ref()
const formData = reactive({})

const genderOptions = [
  { label: '男', value: 'MAN' },
  { label: '女', value: 'WOMAN' },
  { label: '未知', value: 'OTHER' },
]

const roleListOptions = ref<{ label: string; value: string }[]>([])

const formFiledList = computed(() => [
  {
    field: 'username',
    label: '用户名称',
    filedType: 'string',
    isSearch: true,
    required: true
  },
  {
    field: 'phone',
    label: '手机号',
    filedType: 'string',
    isSearch: true,
    required: true
  },
  {
    field: 'password',
    label: '密码',
    labelMessage: `${ pageState.isUpdate ? '密码不为空则自动更新密码' : '' }`,
    filedType: 'string',
    isSearch: false,
    required: !pageState.isUpdate
  },
  {
    field: 'sex',
    label: '用户性别',
    filedType: 'select',
    isSearch: false,
    required: true,
    filedOptions: {
      options: genderOptions
    }
  },
  {
    field: 'roleIdList',
    label: '用户角色',
    filedType: 'select',
    isSearch: false,
    required: true,
    filedOptions: {
      options: roleListOptions.value,
      multiple: true
    }
  },
  {
    field: 'status',
    label: '用户状态',
    filedType: 'switch',
    isSearch: false,
    required: true
  },
] as BaseFormItemProps[])

const columns: Array<ITableColumn> = [
  {
    field: 'id',
    title: 'id',
    type: 'string'
  },
  {
    field: 'phone',
    title: '手机号',
    type: 'string'
  },
  {
    field: 'username',
    title: '用户名称',
    type: 'string'
  },
  {
    field: 'sex',
    title: '用户性别',
    type: 'string'
  },
  {
    field: 'loginIp',
    title: '登录ip',
    type: 'string'
  },
  {
    field: 'status',
    title: '用户状态',
    type: 'switch',
    typeOptions: {
      switchTag: {
        trueText: '正常',
        falseText: '不可用'
      }
    }
  },
]

const pageState = reactive({
  drawerOpen: false,
  isUpdate: false,
  editData: {},
  loading: false,
  tableData: {},
});

async function onGetRoleList() {
  if (roleListOptions.value.length > 0) {
    return
  }
  // const { data, error } = await queryAllSystemRole()
  // if (!error) {
  //   roleListOptions.value = data.map((item: any) => {
  //     return { label: item.roleName, value: item.id }
  //   })
  // }

  const data = [
    {
      "createTime": "2023-12-20 17:45:05",
      "id": "1737408771218792450",
      "order": 1,
      "roleKey": "SuperAdmin",
      "roleName": "超级管理员",
      "roleScope": [
        "173736381381221581",
        "1737363813812215810",
        "173736381381221583",
        "1737364028824821762",
        "1737369714325528577",
        "1738099497552429057",
        "1739115016615215105",
        "1739223870027972609",
        "1739224144796827649",
        "1739224376339185665",
        "1739224547890413570",
        "1739224770612150273",
        "1739225110254305282",
        "1739225241577963521",
        "1739225337644302337",
        "1739225546147348481"
      ],
      "status": true,
      "updateTime": "2023-12-20 17:45:05"
    },
    {
      "createTime": "2023-12-21 17:15:35",
      "id": "1737763732809142273",
      "order": 2,
      "roleKey": "guest",
      "roleName": "游客",
      "roleScope": [
        "1737364028824821762",
        "1739224770612150273",
        "1739225110254305282",
        "1739225241577963521",
        "1739225337644302337",
        "1739225546147348481",
        "1738099497552429057",
        "1739115016615215105",
        "1739223870027972609",
        "1739224144796827649",
        "1739224376339185665",
        "1739224547890413570"
      ],
      "status": true,
      "updateTime": "2023-12-21 17:15:35"
    }
  ]
  roleListOptions.value = data.map((item: any) => {
    return { label: item.roleName, value: item.id }
  })
}

/**
 * 获取数据
 * @param params
 */
async function onGetData(params?: any) {
  pageState.loading = true
  // const { data, error } = await querySystemUser(params)
  // if (!error) {
  //   pageState.tableData = data
  // }

  const data = {
    "current": 1,
    "orders": [],
    "pages": 1,
    "records": [
      {
        "createTime": "2023-12-25 18:07:42",
        "id": "1739226400963280898",
        "password": "e500074630aba91e8b346c09c14387d4",
        "phone": "18800000000",
        "salt": "5LW5",
        "sex": "MAN",
        "status": true,
        "updateTime": "2023-12-25 18:07:42",
        "username": "guest"
      },
      {
        "createTime": "2023-12-18 16:55:22",
        "id": "1736671483388059649",
        "loginIp": "",
        "password": "4066604c3f5a33d64aada1466abc55cf",
        "phone": "18888888888",
        "salt": "Q48G",
        "sex": "MAN",
        "status": true,
        "updateTime": "2023-12-18 16:55:22",
        "username": "admin"
      }
    ],
    "searchCount": true,
    "size": 10,
    "total": 2
  }
  pageState.tableData = data
  pageState.loading = false
}

/**
 * 添加
 *
 */
async function onAdd() {
  await onGetRoleList()
  pageState.drawerOpen = true
  pageState.isUpdate = false
}

/**
 * 编辑
 * @param row
 */
async function onEdit(row: any) {

  await onGetRoleList()
  pageState.drawerOpen = true
  pageState.isUpdate = true
  pageState.editData = row
}

/**
 * 删除
 * @param row
 */
async function onDelete(row: any) {
  const { error } = await deleteSystemUser(row.id)
  if (!error) {
    // @ts-ignore
    window.$message.success(`删除${ row?.username ?? '' }成功`)
    await onGetData()
  }
}
</script>

<style scoped lang="scss"></style>
