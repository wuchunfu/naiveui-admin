import { usePageRouter } from "@/hooks/use-page-router";
// import { getNavRouteList, getUserInfo, userLogin, userLogout } from "@/service/api/user";
import { useRouteStore } from "@/store/modules/route";
import { SecureStorage } from "@/store/plugins";
import { IMenus } from "@/types/route";
import { defineStore } from "pinia";
import { localStg } from "@/utils";

// 定义 state 的类型
interface AuthState {
  token: string;
  loginFlag: boolean;
  userInfo: Record<string, any>;
  menus: IMenus[];
  permissions: string[];
}

export const useAuthStore = defineStore('auth-store', () => {
  const initState: AuthState = {
    token: '',
    loginFlag: false,
    userInfo: {},
    menus: [],
    permissions: [
      'admin',
      'test',
    ]
  }

  const state = reactive<AuthState>({ ...initState });
  const getLoginFlag = computed(() => state.loginFlag);

  const toLogin = () => {
    state.loginFlag = true;
  };

  const $reset = () => {
    const routeStore = useRouteStore();
    routeStore.$reset();
    Object.assign(state, initState);
  };

  const getUserProfile = async () => {
    state.userInfo = {
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
    state.permissions = [
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

    // try {
    //   const res = await getUserInfo();
    //   state.userInfo = res.data.user;
    //   state.permissions = res.data.permissions;
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const getMenuList = async () => {
    // try {
    //   const res = await getNavRouteList();
    //   state.menus = res.data;
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const login = async (payload: any) => {
    state.token = "123456"
    localStg.set("token", "123456")

    await getUserProfile()
    await getMenuList()

    const routeStore = useRouteStore()
    await routeStore.initRoute()
    const page = usePageRouter(false)
    page.toLoginRedirect()

    // const { account, password } = payload;
    // try {
    //   const res = await userLogin({ username: account, password: password });
    //   state.token = res.data.token;
    //
    //   const routeStore = useRouteStore();
    //   await routeStore.initRoute();
    //   state.loginFlag = false;
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const logout = async () => {
    $reset();
    const page = usePageRouter(false);
    page.toLogin();

    // try {
    //   await userLogout();
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   $reset();
    // }
  };

  // 使用 toRefs 将 state 转换为 ref 对象
  const stateRefs = toRefs(state);

  return {
    ...stateRefs,
    getLoginFlag,
    toLogin,
    $reset,
    getUserProfile,
    getMenuList,
    login,
    logout
  };
}, {
  persist: {
    // 持久化存储 使用加密的存储方式
    storage: SecureStorage
  }
});
