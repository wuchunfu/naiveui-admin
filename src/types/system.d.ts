// Desc: 系统相关的类型定义
import { IRouteMeta } from "@/types/route";
import { RouteComponent } from "vue-router";

declare namespace System {
  // 菜单项
  type GlobalMenu = import('naive-ui').MenuOption & {
    key: string;
    label: string;
    routeName: string;
    routePath: string;
    meta: IRouteMeta;
    component?: RouteComponent;
    icon?: () => import('vue').VNodeChild;
    children?: GlobalMenu[];
  }
  type GlobalBreadcrumb = {
    label: string;
    name: string;
    icon?: () => import('vue').VNodeChild;
    meta?: IRouteMeta;
    children?: GlobalBreadcrumb[]
    // 下拉中disabled
    disabled?: boolean;
  }
  // 下拉菜单
  type GlobalDropdown = {
    label: string;
    key: string;
    icon?: () => import('vue').VNodeChild;
    disabled?: boolean;
    render?: () => import('vue').VNodeChild;
    [x: string]: any;
  }
}
