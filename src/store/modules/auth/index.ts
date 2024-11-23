import { usePageRouter } from "@/hooks/use-page-router";
// import { getNavRoute, getSysUserInfo, sysLogin, sysLogout } from "@/service/api/user";
import { useTabsStore } from "@/store";
import { useRouteStore } from "@/store/modules/route";
import { SecureStorage } from "@/store/plugins";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { localStg } from "@/utils";

interface AuthState {
  token: string
  userInfo: Record<string, any>
  routes: RouteRecordRaw[]
  menus: any[]
  permissions: string[]
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): AuthState => ({
    token: '',
    // 用户信息
    userInfo: {},
    // 路由
    routes: [],
    menus: [],
    // 权限
    permissions: []
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state?.token);
    },
    getAuthRouterName(state) {
      return state.menus?.map((item: any) => item?.routeName)
    },
    getMenus(state) {
      return state.menus
    }
  },
  actions: {
    // 重置auth状态
    resetAuthStore() {
      useRouteStore().resetRouteStore()
      useTabsStore().$reset()
      this.$reset()
      this.token = ''
      this.userInfo = {}
      this.permissions = []
      localStg.remove("token")
    },
    /**
     * 通过token进行登录
     * 登录成功后加载用户信息和路由
     * 调整到首页
     * @param token
     */
    async loginByToken(token: string) {
      this.token = token
      // 查询用户信息
      this.userInfo = {
        id: "1",
        phone: "18888888888",
        username: "admin",
        sex: 'man',
        avatar: '',
        menus: []
      }
      const routeStore = useRouteStore()
      const page = usePageRouter(false)
      await routeStore.initRoute()
      page.toHome()
    },
    async getUserInfo() {
      this.userInfo = {
        "id": 7,
        "username": "test",
        "nickname": "test",
        "avatar": "http://47.94.85.16:9000/image/image/image/20240731/5290696fc013415da4641b93a61ce8b9.png",
        "deptId": 1,
        "postIds": "1",
        "roleIds": "9",
        "isMultipoint": 1,
        "isDisable": 0,
        "lastLoginIp": "127.0.0.1",
        "lastLoginTime": "2024-11-23 20:12:03",
        "remark": "",
        "createTime": "2024-09-29 16:42:25",
        "updateTime": "2024-11-23 20:12:03"
      }
      this.permissions = [
        "nav:category:list",
        "nav:category:detail",
        "nav:link:detail",
        "nav:tag:detail",
        "nav:audit:detail",
        "nav:category:add",
        "nav:link:list",
        "nav:link:add",
        "nav:tag:add",
        "nav:audit:add",
        "nav:category:edit",
        "nav:link:edit",
        "nav:tag:list",
        "nav:tag:edit",
        "nav:audit:list",
        "nav:audit:edit",
        "nav:category:delete",
        "nav:link:delete",
        "nav:tag:delete",
        "nav:audit:delete",
        ""
      ]
      // await getSysUserInfo().then((res: any) => {
      //   this.userInfo = res.data.user
      //   this.permissions = res.data.permissions
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    async getMenuList() {
      // this.menus = [
      //   {
      //     "id": "1737364028824821762",
      //     "parentId": "0",
      //     "menuType": "CATEGORY",
      //     "menuName": "首页",
      //     "icon": "line-md:emoji-smile-wink",
      //     "routeName": "home",
      //     "routePath": "/home/index",
      //     "component": "/home/index",
      //     "permissions": "home:view",
      //     "query": "",
      //     "params": "",
      //     "sort": 1,
      //     "isHide": false,
      //     "isCache": 1,
      //     "isIframe": false,
      //     "status": 0,
      //     "createTime": "2023-12-25 18:04:18",
      //     "updateTime": "2023-12-25 18:04:18",
      //     "children": [
      //
      //     ]
      //   },
      //   {
      //     "id": "1737369714325528577",
      //     "parentId": "0",
      //     "menuType": "CATEGORY",
      //     "menuName": "系统管理",
      //     "icon": "tdesign:system-setting",
      //     "routeName": "system",
      //     "routePath": "",
      //     "component": "",
      //     "permissions": "",
      //     "query": "",
      //     "params": "",
      //     "sort": 2,
      //     "isHide": false,
      //     "isCache": 1,
      //     "isIframe": false,
      //     "status": 0,
      //     "createTime": "2023-12-25 18:04:18",
      //     "updateTime": "2023-12-25 18:04:18",
      //     "children": [
      //       {
      //         "id": "1737369714325528577",
      //         "parentId": "173736381381221581",
      //         "menuType": "MENU",
      //         "menuName": "用户管理",
      //         "icon": "line-md:person-search-twotone",
      //         "routeName": "system_user",
      //         "routePath": "/system/user/index",
      //         "component": "/system/user/index",
      //         "permissions": "system:user:view",
      //         "query": "",
      //         "params": "",
      //         "sort": 1,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       },
      //       {
      //         "id": "1737363813812215810",
      //         "parentId": "173736381381221581",
      //         "menuType": "MENU",
      //         "menuName": "角色管理",
      //         "icon": "mingcute:safety-certificate-fill",
      //         "routeName": "system_role",
      //         "routePath": "/system/role/index",
      //         "component": "/system/role/index",
      //         "permissions": "system:role:view",
      //         "query": "",
      //         "params": "",
      //         "sort": 2,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       },
      //       {
      //         "id": "173736381381221583",
      //         "parentId": "173736381381221581",
      //         "menuType": "MENU",
      //         "menuName": "菜单管理",
      //         "icon": "line-md:list-3-filled",
      //         "routeName": "system_menu",
      //         "routePath": "/system/menu/index",
      //         "component": "/system/menu/index",
      //         "permissions": "system:menu:view",
      //         "query": "",
      //         "params": "",
      //         "sort": 3,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "id": "1739223870027972609",
      //     "parentId": "0",
      //     "menuType": "MENU",
      //     "menuName": "组件",
      //     "icon": "line-md:coffee-twotone",
      //     "routeName": "component",
      //     "routePath": "",
      //     "component": "",
      //     "permissions": "",
      //     "query": "",
      //     "params": "",
      //     "sort": 3,
      //     "isHide": false,
      //     "isCache": 1,
      //     "isIframe": false,
      //     "status": 0,
      //     "createTime": "2023-12-25 18:04:18",
      //     "updateTime": "2023-12-25 18:04:18",
      //     "children": [
      //       {
      //         "id": "1739224144796827649",
      //         "parentId": "1739223870027972609",
      //         "menuType": "MENU",
      //         "menuName": "图标",
      //         "icon": "line-md:emoji-smile-wink",
      //         "routeName": "component_icon",
      //         "routePath": "/component/icon/index",
      //         "component": "/component/icon/index",
      //         "permissions": "component:icon:view",
      //         "query": "",
      //         "params": "",
      //         "sort": 1,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       },
      //       {
      //         "id": "1739224376339185665",
      //         "parentId": "1739223870027972609",
      //         "menuType": "MENU",
      //         "menuName": "表单",
      //         "icon": "line-md:emoji-smile-wink",
      //         "routeName": "component_form",
      //         "routePath": "/component/form/index",
      //         "component": "/component/form/index",
      //         "permissions": "component:form:view",
      //         "query": "",
      //         "params": "",
      //         "sort": 2,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       },
      //       {
      //         "id": "1739224547890413570",
      //         "parentId": "1739223870027972609",
      //         "menuType": "MENU",
      //         "menuName": "表单",
      //         "icon": "line-md:emoji-smile-wink",
      //         "routeName": "component_table",
      //         "routePath": "/component/table/index",
      //         "component": "/component/table/index",
      //         "permissions": "component:table:view",
      //         "query": "",
      //         "params": "",
      //         "sort": 3,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "id": "1738099497552429057",
      //     "parentId": "0",
      //     "menuType": "CATEGORY",
      //     "menuName": "文档管理",
      //     "icon": "line-md:text-box",
      //     "routeName": "doc",
      //     "routePath": "",
      //     "component": "",
      //     "permissions": "",
      //     "query": "",
      //     "params": "",
      //     "sort": 4,
      //     "isHide": false,
      //     "isCache": 1,
      //     "isIframe": false,
      //     "status": 0,
      //     "createTime": "2023-12-25 18:04:18",
      //     "updateTime": "2023-12-25 18:04:18",
      //     "children": [
      //       {
      //         "id": "1739115016615215105",
      //         "parentId": "1738099497552429057",
      //         "menuType": "MENU",
      //         "menuName": "Naive UI",
      //         "icon": "line-md:menu",
      //         "routeName": "doc_naive",
      //         "routePath": "https://www.naiveui.com/zh-CN/os-theme",
      //         "component": "",
      //         "permissions": "",
      //         "query": "",
      //         "params": "",
      //         "sort": 1,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "id": "1739224770612150273",
      //     "parentId": "0",
      //     "menuType": "CATEGORY",
      //     "menuName": "异常页",
      //     "icon": "line-md:alert-circle",
      //     "routeName": "exception",
      //     "routePath": "",
      //     "component": "",
      //     "permissions": "",
      //     "query": "",
      //     "params": "",
      //     "sort": 5,
      //     "isHide": false,
      //     "isCache": 1,
      //     "isIframe": false,
      //     "status": 0,
      //     "createTime": "2023-12-25 18:04:18",
      //     "updateTime": "2023-12-25 18:04:18",
      //     "children": [
      //       {
      //         "id": "1739225110254305282",
      //         "parentId": "1739224770612150273",
      //         "menuType": "MENU",
      //         "menuName": "404",
      //         "icon": "line-md:alert-circle",
      //         "routeName": "exception_404",
      //         "routePath": "/exception/404/index",
      //         "component": "/exception/404/index",
      //         "permissions": "",
      //         "query": "",
      //         "params": "",
      //         "sort": 1,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       },
      //       {
      //         "id": "1739225241577963521",
      //         "parentId": "1739224770612150273",
      //         "menuType": "MENU",
      //         "menuName": "403",
      //         "icon": "line-md:alert-circle",
      //         "routeName": "exception_403",
      //         "routePath": "/exception/403/index",
      //         "component": "/exception/403/index",
      //         "permissions": "",
      //         "query": "",
      //         "params": "",
      //         "sort": 2,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       },
      //       {
      //         "id": "1739225337644302337",
      //         "parentId": "1739224770612150273",
      //         "menuType": "MENU",
      //         "menuName": "500",
      //         "icon": "line-md:alert-circle",
      //         "routeName": "exception_500",
      //         "routePath": "/exception/500/index",
      //         "component": "/exception/500/index",
      //         "permissions": "",
      //         "query": "",
      //         "params": "",
      //         "sort": 3,
      //         "isHide": false,
      //         "isCache": 1,
      //         "isIframe": false,
      //         "status": 0,
      //         "createTime": "2023-12-25 18:04:18",
      //         "updateTime": "2023-12-25 18:04:18",
      //         "children": [
      //
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "id": "1739225546147348481",
      //     "parentId": "0",
      //     "menuType": "MENU",
      //     "menuName": "关于",
      //     "icon": "line-md:lightbulb-twotone",
      //     "routeName": "about",
      //     "routePath": "/about/index",
      //     "component": "/about/index",
      //     "permissions": "about:view",
      //     "query": "",
      //     "params": "",
      //     "sort": 6,
      //     "isHide": false,
      //     "isCache": 1,
      //     "isIframe": false,
      //     "status": 0,
      //     "createTime": "2023-12-25 18:04:18",
      //     "updateTime": "2023-12-25 18:04:18",
      //     "children": [
      //
      //     ]
      //   }
      // ]
    },
    async login(payload: any) {
      const { account, password } = payload
      this.token = "123456"
      localStg.set("token", "123456")

      await this.getUserInfo()
      await this.getMenuList()

      const routeStore = useRouteStore()
      await routeStore.initRoute()
      const page = usePageRouter(false)
      page.toLoginRedirect()
      
      // await sysLogin({ username: account, password: password }).then(async res => {
      //   this.token = res.data.token
      //   localStg.set("token", res.data.token)
      //
      //   await this.getUserInfo()
      //   await this.getMenuList()
      //
      //   const routeStore = useRouteStore()
      //   await routeStore.initRoute()
      //   const page = usePageRouter(false)
      //   page.toLoginRedirect()
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    /**
     * 退出登录
     */
    async loginOut() {
      this.resetAuthStore()
      const page = usePageRouter(false)
      page.toLogin()
      
      // await sysLogout().then(res => {
      //   this.resetAuthStore()
      //   const page = usePageRouter(false)
      //   page.toLogin()
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  },
  persist: {
    // 持久化存储 使用加密的存储方式
    storage: SecureStorage
  }
})
