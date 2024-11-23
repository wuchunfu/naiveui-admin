<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <eg-tree-table
        :loading="pageState.loading"
        :get-data="onGetData"
        :search-form-items="formFiledList"
        :data="tableData"
        :columns="columns"
        is-select
        title="菜单管理"
        desc="系统的菜单管理"
        @add="onAdd"
        @edit="onEdit"
        :row-action="rowAction"
        @delete="onDelete"
    />

    <MenuDrawer
        v-model:show="pageState.drawerOpen"
        :is-update="pageState.isUpdate"
        :data="pageState.editData"
        @success="onGetData"
        :form-items="formFiledList"
    />
  </div>
</template>

<script setup lang="tsx">
import { BaseFormItemProps } from "@/components/basic/form/index";
import { ITableColumn } from "@/components/basic/table/index";
import { groupDynamicMenu } from "@/utils";
import MenuDrawer from "@/views/system/menu/menu-drawer.vue";
import { NButton } from 'naive-ui';
import { computed, reactive, Ref, ref } from "vue";
// import { deleteSystemMenu, queryAllSystemMenu } from "@/service/api/system";
import { deleteSystemMenu } from "@/service/api/system";
import { MenuEnum } from "@/enums/MenuTypeEnum";

const formRef = ref()
const formData = reactive({})
const pageState = reactive({
  drawerOpen: false,
  isUpdate: false,
  editData: {} as any,
  loading: false,
})

const tableData: Ref = ref()

const menuTypeOptions = computed(() => [
  { label: '目录', value: MenuEnum.CATEGORY },
  { label: '菜单', value: MenuEnum.MENU },
  { label: '按钮', value: MenuEnum.BUTTON },
])

const formFiledList = computed(() => [
  {
    field: 'parentId',
    label: '上级ID',
    filedType: 'string',
    slot: 'parentId',
    required: true,
    filedOptions: {
      options: [{
        id: '0',
        name: '根目录',
        children: tableData.value
      }]
    }
  },
  {
    field: 'menuName',
    label: '菜单名称',
    filedType: 'string',
    isSearch: true,
    required: true
  },
  {
    field: 'routeName',
    label: '路由key',
    filedType: 'string',
    isSearch: false,
    required: true,
    labelMessage: "同对应的后端项目中的routerName"
  },
  {
    field: 'menuType',
    label: '菜单类型',
    filedType: 'select',
    required: true,
    filedOptions: { options: menuTypeOptions.value },
  },
  {
    field: 'order',
    label: '显示顺序',
    filedType: 'number',
    isSearch: false,
    required: true
  },
  {
    field: 'icon',
    label: '菜单icon',
    filedType: 'string',
    isSearch: false,
    required: false,
    labelMessage: "icones中的icon名称"
  },
  {
    field: 'localIcon',
    label: '本地icon',
    filedType: 'string',
    isSearch: false,
    required: false,
    labelMessage: "本地图标名称，优先级高于菜单icon"
  },
  {
    field: 'isHide',
    label: '是否隐藏',
    filedType: 'switch',
    isSearch: true,
    required: true
  },
] as BaseFormItemProps[])

const columns: Array<ITableColumn> = [
  { field: 'id', title: 'id', type: 'string', labelWidth: 140 },
  // {field: 'aprentId', title: '上级ID', type: 'string',labelWidth:120},
  { field: 'menuName', title: '菜单名称', type: 'string' },
  { field: 'routeName', title: '路由key', type: 'string' },
  {
    field: 'isIframe',
    title: '是否为网页',
    type: 'switch',
    typeOptions: { switchTag: { trueText: '是', falseText: '否' } }
  },
  { field: 'routePath', title: '路径地址', type: 'string' },
  { field: 'icon', title: 'icones图标 ', type: 'string' },
  { field: 'localIcon', title: '本地图标', type: 'string' },
  { field: 'order', title: '显示顺序', type: 'string' },
  {
    field: 'isHide',
    title: '是否隐藏',
    type: 'switch',
    typeOptions: { switchTag: { trueText: '是', falseText: '否' } }
  },
  { field: 'permissions', title: '权限标识', type: 'string' },
  { field: 'menuType', title: '菜单类型', type: 'string' },
  { field: 'remark', title: '备注', type: 'string' },
]

const rowAction = (row: any, rowIndex: number) => {
  return (
      <NButton
          type="primary"
          ghost
          size="small"
          onClick={ () => {
            pageState.drawerOpen = true
            pageState.isUpdate = false
            pageState.editData = {
              parentId: row.id,
              order: row.order,
              open: row.isHide,
              permissions: row.permissions,
            }
            if (row.menuType === MenuEnum.CATEGORY) {
              pageState.editData.menuType = MenuEnum.MENU
            } else if (row.menuType === MenuEnum.MENU) {
              pageState.editData.menuType = MenuEnum.BUTTON
            }
          } }
      >
        添加
      </NButton>
  )
}

function onAdd() {
  pageState.drawerOpen = true
  pageState.isUpdate = false
}

function onEdit(row: any) {
  pageState.drawerOpen = true
  pageState.isUpdate = true
  pageState.editData = row
}

async function onDelete(row: any) {
  const { error } = await deleteSystemMenu(row.id)
  if (!error) {
    await onGetData()
  }
}

async function onGetData(params?: any) {
  pageState.loading = true
  // const { data, error } = await queryAllSystemMenu(params)
  // if (!error) {
  //   tableData.value = data
  //   tableData.value = groupDynamicMenu(data)
  // }

  // const data = [
  //   {
  //     "createTime": "2023-12-20 14:47:18",
  //     "icon": "line-md:emoji-smile-wink",
  //     "id": "1737364028824821762",
  //     "isIframe": false,
  //     "menuName": "首页",
  //     "order": 1,
  //     "routePath": "/home",
  //     "permissions": "home:view",
  //     "parentId": "0",
  //     "routeName": "home",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-20 14:47:18",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-19 14:38:13",
  //     "icon": "tdesign:system-setting",
  //     "id": "173736381381221581",
  //     "isIframe": false,
  //     "menuName": "系统管理",
  //     "order": 2,
  //     "routePath": "",
  //     "permissions": "",
  //     "parentId": "0",
  //     "routeName": "system",
  //     "menuType": "CATEGORY",
  //     "updateTime": "2023-12-19 14:38:19",
  //     "isHide": false
  //   },
  //   {
  //     "icon": "line-md:list-3-filled",
  //     "id": "173736381381221583",
  //     "isIframe": false,
  //     "menuName": "菜单管理",
  //     "order": 2,
  //     "routePath": "/system/menu",
  //     "permissions": "system:menu:view",
  //     "parentId": "173736381381221581",
  //     "routeName": "system_menu",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-20 14:57:03",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-20 14:46:27",
  //     "icon": "mingcute:safety-certificate-fill",
  //     "id": "1737363813812215810",
  //     "isIframe": false,
  //     "menuName": "角色管理",
  //     "order": 2,
  //     "routePath": "/system/role",
  //     "permissions": "system:role:view",
  //     "parentId": "173736381381221581",
  //     "routeName": "system_role",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-20 14:46:27",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-20 15:09:53",
  //     "icon": "line-md:person-search-twotone",
  //     "id": "1737369714325528577",
  //     "isIframe": false,
  //     "menuName": "用户管理",
  //     "order": 2,
  //     "routePath": "/system/user",
  //     "permissions": "system:user:view",
  //     "parentId": "173736381381221581",
  //     "routeName": "system_user",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-20 15:09:53",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 17:57:38",
  //     "icon": "line-md:coffee-twotone",
  //     "id": "1739223870027972609",
  //     "isIframe": false,
  //     "menuName": "组件",
  //     "order": 3,
  //     "routePath": "",
  //     "permissions": "",
  //     "parentId": "0",
  //     "routeName": "component",
  //     "menuType": "CATEGORY",
  //     "updateTime": "2023-12-25 17:57:38",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 17:58:44",
  //     "icon": "line-md:emoji-smile-wink",
  //     "id": "1739224144796827649",
  //     "isIframe": false,
  //     "menuName": "图标",
  //     "order": 3,
  //     "routePath": "/component/icon",
  //     "permissions": "component:icon:view",
  //     "parentId": "1739223870027972609",
  //     "routeName": "component_icon",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 17:58:44",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 17:59:39",
  //     "icon": "line-md:emoji-smile-wink",
  //     "id": "1739224376339185665",
  //     "isIframe": false,
  //     "menuName": "表单",
  //     "order": 3,
  //     "routePath": "/component/form",
  //     "permissions": "component:form:view",
  //     "parentId": "1739223870027972609",
  //     "routeName": "component_form",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 17:59:39",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 18:00:20",
  //     "icon": "line-md:emoji-smile-wink",
  //     "id": "1739224547890413570",
  //     "isIframe": false,
  //     "menuName": "表单",
  //     "order": 3,
  //     "routePath": "/component/table",
  //     "permissions": "component:table:view",
  //     "parentId": "1739223870027972609",
  //     "routeName": "component_table",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 18:00:20",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 18:01:13",
  //     "icon": "line-md:alert-circle",
  //     "id": "1739224770612150273",
  //     "isIframe": false,
  //     "menuName": "异常页",
  //     "order": 4,
  //     "routePath": "",
  //     "permissions": "",
  //     "parentId": "0",
  //     "routeName": "exception",
  //     "menuType": "CATEGORY",
  //     "updateTime": "2023-12-25 18:01:13",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 18:02:34",
  //     "icon": "line-md:alert-circle",
  //     "id": "1739225110254305282",
  //     "isIframe": false,
  //     "menuName": "404",
  //     "order": 4,
  //     "routePath": "/exception/404",
  //     "permissions": "",
  //     "parentId": "1739224770612150273",
  //     "routeName": "exception_404",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 18:02:34",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 18:03:05",
  //     "icon": "line-md:alert-circle",
  //     "id": "1739225241577963521",
  //     "isIframe": false,
  //     "menuName": "403",
  //     "order": 4,
  //     "routePath": "/exception/403",
  //     "permissions": "",
  //     "parentId": "1739224770612150273",
  //     "routeName": "exception_403",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 18:03:05",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 18:03:28",
  //     "icon": "line-md:alert-circle",
  //     "id": "1739225337644302337",
  //     "isIframe": false,
  //     "menuName": "500",
  //     "order": 4,
  //     "routePath": "/exception/500",
  //     "permissions": "",
  //     "parentId": "1739224770612150273",
  //     "routeName": "exception_500",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 18:03:28",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-22 15:29:47",
  //     "icon": "line-md:text-box",
  //     "id": "1738099497552429057",
  //     "isIframe": false,
  //     "menuName": "文档管理",
  //     "order": 5,
  //     "routePath": "",
  //     "permissions": "",
  //     "parentId": "0",
  //     "routeName": "doc",
  //     "menuType": "CATEGORY",
  //     "updateTime": "2023-12-22 15:29:47",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 10:45:06",
  //     "icon": "line-md:menu",
  //     "id": "1739115016615215105",
  //     "isIframe": true,
  //     "menuName": "Naive UI",
  //     "order": 5,
  //     "routePath": "https://www.naiveui.com/zh-CN/os-theme",
  //     "permissions": "doc:show",
  //     "parentId": "1738099497552429057",
  //     "routeName": "doc_naive",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 10:45:06",
  //     "isHide": false
  //   },
  //   {
  //     "createTime": "2023-12-25 18:04:18",
  //     "icon": "line-md:lightbulb-twotone",
  //     "id": "1739225546147348481",
  //     "isIframe": false,
  //     "menuName": "关于",
  //     "order": 6,
  //     "routePath": "/about",
  //     "permissions": "about:view",
  //     "parentId": "0",
  //     "routeName": "about",
  //     "menuType": "MENU",
  //     "updateTime": "2023-12-25 18:04:18",
  //     "isHide": false
  //   }
  // ]
  
  const data = [
    {
      "createTime": "2023-12-20 14:47:18",
      "icon": "line-md:emoji-smile-wink",
      "id": "1737364028824821762",
      "isIframe": false,
      "menuName": "首页",
      "order": 1,
      "routePath": "/home/index",
      "permissions": "home:view",
      "parentId": "0",
      "routeName": "home",
      "menuType": "MENU",
      "updateTime": "2023-12-20 14:47:18",
      "isHide": false,
      "children": [

      ]
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
      "isHide": false,
      "children": [
        {
          "createTime": "2023-12-20 15:09:53",
          "icon": "line-md:person-search-twotone",
          "id": "1737369714325528577",
          "isIframe": false,
          "menuName": "用户管理",
          "order": 1,
          "routePath": "/system/user/index",
          "permissions": "system:user:view",
          "parentId": "173736381381221581",
          "routeName": "system_user",
          "menuType": "MENU",
          "updateTime": "2023-12-20 15:09:53",
          "isHide": false,
          "children": [

          ]
        },
        {
          "createTime": "2023-12-20 14:46:27",
          "icon": "mingcute:safety-certificate-fill",
          "id": "1737363813812215810",
          "isIframe": false,
          "menuName": "角色管理",
          "order": 2,
          "routePath": "/system/role/index",
          "permissions": "system:role:view",
          "parentId": "173736381381221581",
          "routeName": "system_role",
          "menuType": "MENU",
          "updateTime": "2023-12-20 14:46:27",
          "isHide": false,
          "children": [

          ]
        },
        {
          "icon": "line-md:list-3-filled",
          "id": "173736381381221583",
          "isIframe": false,
          "menuName": "菜单管理",
          "order": 3,
          "routePath": "/system/menu/index",
          "permissions": "system:menu:view",
          "parentId": "173736381381221581",
          "routeName": "system_menu",
          "menuType": "MENU",
          "updateTime": "2023-12-20 14:57:03",
          "isHide": false,
          "children": [

          ]
        }
      ]
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
      "isHide": false,
      "children": [
        {
          "createTime": "2023-12-25 17:58:44",
          "icon": "line-md:emoji-smile-wink",
          "id": "1739224144796827649",
          "isIframe": false,
          "menuName": "图标",
          "order": 3,
          "routePath": "/component/icon/index",
          "permissions": "component:icon:view",
          "parentId": "1739223870027972609",
          "routeName": "component_icon",
          "menuType": "MENU",
          "updateTime": "2023-12-25 17:58:44",
          "isHide": false,
          "children": [

          ]
        },
        {
          "createTime": "2023-12-25 17:59:39",
          "icon": "line-md:emoji-smile-wink",
          "id": "1739224376339185665",
          "isIframe": false,
          "menuName": "表单",
          "order": 3,
          "routePath": "/component/form/index",
          "permissions": "component:form:view",
          "parentId": "1739223870027972609",
          "routeName": "component_form",
          "menuType": "MENU",
          "updateTime": "2023-12-25 17:59:39",
          "isHide": false,
          "children": [

          ]
        },
        {
          "createTime": "2023-12-25 18:00:20",
          "icon": "line-md:emoji-smile-wink",
          "id": "1739224547890413570",
          "isIframe": false,
          "menuName": "表单",
          "order": 3,
          "routePath": "/component/table/index",
          "permissions": "component:table:view",
          "parentId": "1739223870027972609",
          "routeName": "component_table",
          "menuType": "MENU",
          "updateTime": "2023-12-25 18:00:20",
          "isHide": false,
          "children": [

          ]
        }
      ]
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
      "isHide": false,
      "children": [
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
          "isHide": false,
          "children": [

          ]
        }
      ]
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
      "isHide": false,
      "children": [
        {
          "createTime": "2023-12-25 18:02:34",
          "icon": "line-md:alert-circle",
          "id": "1739225110254305282",
          "isIframe": false,
          "menuName": "404",
          "order": 4,
          "routePath": "/exception/404/index",
          "permissions": "",
          "parentId": "1739224770612150273",
          "routeName": "exception_404",
          "menuType": "MENU",
          "updateTime": "2023-12-25 18:02:34",
          "isHide": false,
          "children": [

          ]
        },
        {
          "createTime": "2023-12-25 18:03:05",
          "icon": "line-md:alert-circle",
          "id": "1739225241577963521",
          "isIframe": false,
          "menuName": "403",
          "order": 4,
          "routePath": "/exception/403/index",
          "permissions": "",
          "parentId": "1739224770612150273",
          "routeName": "exception_403",
          "menuType": "MENU",
          "updateTime": "2023-12-25 18:03:05",
          "isHide": false,
          "children": [

          ]
        },
        {
          "createTime": "2023-12-25 18:03:28",
          "icon": "line-md:alert-circle",
          "id": "1739225337644302337",
          "isIframe": false,
          "menuName": "500",
          "order": 4,
          "routePath": "/exception/500/index",
          "permissions": "",
          "parentId": "1739224770612150273",
          "routeName": "exception_500",
          "menuType": "MENU",
          "updateTime": "2023-12-25 18:03:28",
          "isHide": false,
          "children": [

          ]
        }
      ]
    },
    {
      "createTime": "2023-12-25 18:04:18",
      "icon": "line-md:lightbulb-twotone",
      "id": "1739225546147348481",
      "isIframe": false,
      "menuName": "关于",
      "order": 6,
      "routePath": "/about/index",
      "permissions": "about:view",
      "parentId": "0",
      "routeName": "about",
      "menuType": "MENU",
      "updateTime": "2023-12-25 18:04:18",
      "isHide": false,
      "children": [

      ]
    }
  ]

  tableData.value = data
  // tableData.value = groupDynamicMenu(data)
  pageState.loading = false
}
</script>

<style scoped lang="scss"></style>
