// Desc: 系统相关的类型定义
import { VNodeChild } from "vue";
import type { MenuOption } from "naive-ui";
import { IRouteMeta } from "@/types/route";
import { RouteComponent } from "vue-router";

declare namespace System {
  // 菜单项
  type GlobalMenu = MenuOption & {
    key: string;
    label: string;
    routeName: string;
    routePath: string;
    meta: IRouteMeta;
    component?: RouteComponent;
    icon: () => VNodeChild;
    children?: GlobalMenu[];
  }
  type GlobalBreadcrumb = {
    label: string;
    name: string;
    icon: () => VNodeChild;
    meta?: IRouteMeta;
    children?: GlobalBreadcrumb[]
    // 下拉中disabled
    disabled?: boolean;
  }
  // 下拉菜单
  type GlobalDropdown = {
    label: string;
    key: string;
    icon: () => VNodeChild;
    disabled?: boolean;
    render?: () => VNodeChild;
    [x: string]: any;
  }
}
