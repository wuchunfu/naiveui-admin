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
        title="角色信息"
        desc="角色信息"
        @add="onAdd"
        @edit="onEdit"
        @delete="onDelete"
    />

    <role-drawer
        v-model:show="pageState.drawerOpen"
        :is-update="pageState.isUpdate"
        :data="pageState.editData"
        @success="onGetData"
        :form-items="formFiledList"
    />
  </div>
</template>

<script lang="ts" setup>
import { BaseFormItemProps } from "@/components/basic/form/index";
import { ITableColumn } from "@/components/basic/table/index";
import BaseTable from "@/components/basic/table/index.vue";
import RoleDrawer from "@/views/system/role/role-drawer.vue";
import { computed, onMounted, reactive, Ref, ref } from "vue";
// import { deleteSystemRole, queryAllSystemMenu, querySystemRole } from "@/service";
import { deleteSystemRole } from "@/service";

const formRef = ref()
const formData = reactive({})
const menuList: Ref = ref([])

const formFiledList = computed(() => [
  {
    field: 'roleName',
    label: '名称',
    filedType: 'string',
    isSearch: true,
    required: true
  },
  {
    field: 'roleKey',
    label: '角色key',
    filedType: 'string',
    isSearch: true,
    required: true
  },
  {
    field: 'roleScope',
    label: '权限数据',
    filedType: 'select',
    isSearch: false,
    required: true,
    slot: 'roleScope',
    filedOptions: { options: menuList.value, multiple: true }
  },
  {
    field: 'order',
    label: '显示排序',
    filedType: 'number',
    isSearch: false,
    required: true
  },
  {
    field: 'status',
    label: '状态',
    filedType: 'switch',
    isSearch: false,
    required: true
  },
] as BaseFormItemProps[])

const columns: Array<ITableColumn> = [
  { field: 'id', title: 'id', type: 'string' },
  { field: 'roleName', title: '名称', type: 'string' },
  { field: 'roleKey', title: '角色key', type: 'string' },
  { field: 'order', title: '显示排序', type: 'number' },
  // {field: 'roleScope', title: '权限数据', type: 'string'},
  { field: 'status', title: '状态', type: 'switch' },
]

const pageState = reactive({
  drawerOpen: false,
  isUpdate: false,
  editData: {},
  loading: false,
  tableData: {},
})

async function onGetData(params?: any) {
  pageState.loading = true
  // const { data, error } = await querySystemRole(params)
  // if (!error) {
  //   pageState.tableData = data
  // }

  const data = {
    "current": 1,
    "orders": [],
    "pages": 1,
    "records": [
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
    ],
    "searchCount": true,
    "size": 10,
    "total": 2
  }
  pageState.tableData = data
  pageState.loading = false
}

async function getMenuList() {
  if (menuList.value.length > 0) {
    return
  }
  // const { data, error } = await queryAllSystemMenu()
  // if (!error) {
  //   menuList.value = groupMenuItems(data)
  // }

  const data = [
    {
      "createTime": "2023-12-20 14:47:18",
      "icon": "line-md:emoji-smile-wink",
      "id": "1737364028824821762",
      "isIframe": false,
      "menuName": "首页",
      "order": 1,
      "routePath": "/home",
      "permissions": "home:view",
      "parentId": "0",
      "routeName": "home",
      "menuType": "MENU",
      "updateTime": "2023-12-20 14:47:18",
      "isHide": false
    },
    {
      "createTime": "2023-12-19 14:38:13",
      "icon": "tdesign:system-setting",
      "id": "173736381381221581",
      "isIframe": false,
      "menuName": "系统管理",
      "order": 2,
      "routePath": "",
      "permissions": "",
      "parentId": "0",
      "routeName": "system",
      "menuType": "CATEGORY",
      "updateTime": "2023-12-19 14:38:19",
      "isHide": false
    },
    {
      "icon": "line-md:list-3-filled",
      "id": "173736381381221583",
      "isIframe": false,
      "menuName": "菜单管理",
      "order": 2,
      "routePath": "/system/menu",
      "permissions": "system:menu:view",
      "parentId": "173736381381221581",
      "routeName": "system_menu",
      "menuType": "MENU",
      "updateTime": "2023-12-20 14:57:03",
      "isHide": false
    },
    {
      "createTime": "2023-12-20 14:46:27",
      "icon": "mingcute:safety-certificate-fill",
      "id": "1737363813812215810",
      "isIframe": false,
      "menuName": "角色管理",
      "order": 2,
      "routePath": "/system/role",
      "permissions": "system:role:view",
      "parentId": "173736381381221581",
      "routeName": "system_role",
      "menuType": "MENU",
      "updateTime": "2023-12-20 14:46:27",
      "isHide": false
    },
    {
      "createTime": "2023-12-20 15:09:53",
      "icon": "line-md:person-search-twotone",
      "id": "1737369714325528577",
      "isIframe": false,
      "menuName": "用户管理",
      "order": 2,
      "routePath": "/system/user",
      "permissions": "system:user:view",
      "parentId": "173736381381221581",
      "routeName": "system_user",
      "menuType": "MENU",
      "updateTime": "2023-12-20 15:09:53",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 17:57:38",
      "icon": "line-md:coffee-twotone",
      "id": "1739223870027972609",
      "isIframe": false,
      "menuName": "组件",
      "order": 3,
      "routePath": "",
      "permissions": "",
      "parentId": "0",
      "routeName": "component",
      "menuType": "CATEGORY",
      "updateTime": "2023-12-25 17:57:38",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 17:58:44",
      "icon": "line-md:emoji-smile-wink",
      "id": "1739224144796827649",
      "isIframe": false,
      "menuName": "图标",
      "order": 3,
      "routePath": "/component/icon",
      "permissions": "component:icon:view",
      "parentId": "1739223870027972609",
      "routeName": "component_icon",
      "menuType": "MENU",
      "updateTime": "2023-12-25 17:58:44",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 17:59:39",
      "icon": "line-md:emoji-smile-wink",
      "id": "1739224376339185665",
      "isIframe": false,
      "menuName": "表单",
      "order": 3,
      "routePath": "/component/form",
      "permissions": "component:form:view",
      "parentId": "1739223870027972609",
      "routeName": "component_form",
      "menuType": "MENU",
      "updateTime": "2023-12-25 17:59:39",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 18:00:20",
      "icon": "line-md:emoji-smile-wink",
      "id": "1739224547890413570",
      "isIframe": false,
      "menuName": "表单",
      "order": 3,
      "routePath": "/component/table",
      "permissions": "component:table:view",
      "parentId": "1739223870027972609",
      "routeName": "component_table",
      "menuType": "MENU",
      "updateTime": "2023-12-25 18:00:20",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 18:01:13",
      "icon": "line-md:alert-circle",
      "id": "1739224770612150273",
      "isIframe": false,
      "menuName": "异常页",
      "order": 4,
      "routePath": "",
      "permissions": "",
      "parentId": "0",
      "routeName": "exception",
      "menuType": "CATEGORY",
      "updateTime": "2023-12-25 18:01:13",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 18:02:34",
      "icon": "line-md:alert-circle",
      "id": "1739225110254305282",
      "isIframe": false,
      "menuName": "404",
      "order": 4,
      "routePath": "/exception/404",
      "permissions": "",
      "parentId": "1739224770612150273",
      "routeName": "exception_404",
      "menuType": "MENU",
      "updateTime": "2023-12-25 18:02:34",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 18:03:05",
      "icon": "line-md:alert-circle",
      "id": "1739225241577963521",
      "isIframe": false,
      "menuName": "403",
      "order": 4,
      "routePath": "/exception/403",
      "permissions": "",
      "parentId": "1739224770612150273",
      "routeName": "exception_403",
      "menuType": "MENU",
      "updateTime": "2023-12-25 18:03:05",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 18:03:28",
      "icon": "line-md:alert-circle",
      "id": "1739225337644302337",
      "isIframe": false,
      "menuName": "500",
      "order": 4,
      "routePath": "/exception/500",
      "permissions": "",
      "parentId": "1739224770612150273",
      "routeName": "exception_500",
      "menuType": "MENU",
      "updateTime": "2023-12-25 18:03:28",
      "isHide": false
    },
    {
      "createTime": "2023-12-22 15:29:47",
      "icon": "line-md:text-box",
      "id": "1738099497552429057",
      "isIframe": false,
      "menuName": "文档管理",
      "order": 5,
      "routePath": "",
      "permissions": "",
      "parentId": "0",
      "routeName": "doc",
      "menuType": "CATEGORY",
      "updateTime": "2023-12-22 15:29:47",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 10:45:06",
      "icon": "line-md:menu",
      "id": "1739115016615215105",
      "isIframe": true,
      "menuName": "Naive UI",
      "order": 5,
      "routePath": "https://www.naiveui.com/zh-CN/os-theme",
      "permissions": "doc:show",
      "parentId": "1738099497552429057",
      "routeName": "doc_naive",
      "menuType": "MENU",
      "updateTime": "2023-12-25 10:45:06",
      "isHide": false
    },
    {
      "createTime": "2023-12-25 18:04:18",
      "icon": "line-md:lightbulb-twotone",
      "id": "1739225546147348481",
      "isIframe": false,
      "menuName": "关于",
      "order": 6,
      "routePath": "/about",
      "permissions": "about:view",
      "parentId": "0",
      "routeName": "about",
      "menuType": "MENU",
      "updateTime": "2023-12-25 18:04:18",
      "isHide": false
    }
  ]
  menuList.value = data
}

async function onAdd() {
  await getMenuList()
  pageState.drawerOpen = true
}

async function onEdit(row: any) {
  await getMenuList()
  pageState.drawerOpen = true
  pageState.isUpdate = true
  pageState.editData = row
}

async function onDelete(row: any) {
  const { data, error } = await deleteSystemRole(row.id)
  if (!error) {
    // @ts-ignore
    window.$message.success(`删除${ row?.roleName ?? '' }成功,共删除${ data }条数据`)
    await onGetData()
  }
}

function groupMenuItems(menuItems: any[], parentId: number | string = '0'): any[] {
  const groupedItems: any[] = [];

  const childItems = menuItems.filter(item => item.parentId === parentId);
  childItems.forEach(childItem => {
    const index = menuItems.indexOf(childItem);
    if (index !== -1) {
      menuItems.splice(index, 1); // 从原始数据中移除已使用的数据
    }
    let items = groupMenuItems(menuItems, childItem.id);
    if (items.length > 0) {
      childItem.children = items;
    }
    groupedItems.push(childItem);
  });
  return groupedItems;
}

onMounted(async () => {

})
</script>
