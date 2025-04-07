import { IMenus, LayoutComponentType, PageRoute } from "@/types/route";

/**
 * 静态pageRoute转换为路由
 * @param menuList 配置的路由
 * @param permissions 权限 由后端返回 如果不传入则全部返回
 */
export const staticPageRouteGenerateRoutes = (menuList: PageRoute[], permissions: string[] = []): PageRoute[] => {
  // 排序处理
  menuList.sort((a, b) => (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0));
  return menuList.flatMap(menu => singlePageToRoute(menu, permissions));
};

export const singlePageToRoute = (page: PageRoute, permissions: string[]): PageRoute[] => {
  const resultRoute: PageRoute[] = [];
  const flag = !page?.meta?.permissions || page.meta.permissions.filter(permission => permissions.includes(permission)).length > 0;
  // 判断是否有权限
  if (flag) {
    const layout = page.type === "self" ? page.component : getLayoutComponent(page.type);
    const isSingle: boolean = Boolean(page.isSingle);

    const itemRoute = { ...page } as PageRoute;
    itemRoute.component = isSingle ? page.component : layout;

    // 处理子路由
    if (page.children && page.children.length > 0) {
      itemRoute.children = page.children.flatMap(child => singlePageToRoute(child, permissions));
    } else {
      itemRoute.children = [];
    }

    // 单独路由处理
    if (isSingle) {
      const parentPath = `${ removeIndexFromPath(page.path) }-parent`;
      const singleRoute = {
        path: parentPath,
        redirect: page.path,
        isSingle: true,
        component: layout,
        meta: page.meta,
        children: [itemRoute],
      } as PageRoute;
      resultRoute.push(singleRoute);
    } else {
      resultRoute.push(itemRoute);
    }
  }
  return resultRoute;
};

/**
 * 根据后端返回的动态菜单生成路由
 * @param menuList 后端返回的动态菜单并且处理过分组的
 */
export const dynamicGenerateRoutes = (menuList: IMenus[]): PageRoute[] => {
  // 排序处理
  menuList.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  return menuList.flatMap(menu => singleDynamicMenuToRoute(menu));
};

export const singleDynamicMenuToRoute = (menu: IMenus): PageRoute[] => {
  const routes: PageRoute[] = [];
  const routeItem = createRouteItem(menu);
  if (menu.parentId.toString() === "0") {
    if (menu.children && menu.children.length === 0) {
      const parentRoute = createParentRoute(menu, routeItem);
      return [parentRoute];
    } else {
      const children = menu.children.flatMap(child => singleDynamicMenuToRoute(child));
      routeItem.component = getLayoutComponent(menu.isIframe ? "iframe" : "basic")
      if (children && children.length > 0) {
        routeItem.children = children
        routeItem.redirect = children[0].path
      }
    }
  }

  routes.push(routeItem);
  return routes;
};

export const createRouteItem = (menu: IMenus): PageRoute => {
  return {
    name: removeIndexFromPath(menu.routeName),
    path: menu.isIframe ? removeIndexFromPath('/' + menu.routeName) : removeIndexFromPath(menu.routePath),
    type: "self",
    meta: {
      title: menu.menuName,
      icon: menu.icon,
      permissions: menu.permissions,
      keepAlive: menu.isCache,
      hide: menu.isHide,
      href: menu.isIframe ? menu.routePath : undefined,
    },
    component: menu.isIframe ? getLayoutComponent("iframe") : dynamicGetSelfComponent(menu.component),
  } as PageRoute;
};

export const createParentRoute = (menu: IMenus, routeItem: PageRoute): PageRoute => {
  return {
    name: `${ removeIndexFromPath(menu.routeName) }-parent`,
    path: `${ menu.isIframe ? removeIndexFromPath('/' + menu.routeName) : removeIndexFromPath(menu.routePath) }-parent`,
    isSingle: true,
    redirect: menu.isIframe ? removeIndexFromPath('/' + menu.routeName) : removeIndexFromPath(menu.routePath),
    type: menu.isIframe ? "iframe" : "basic",
    meta: {
      title: menu.menuName,
      icon: menu.icon,
      permissions: menu.permissions,
      keepAlive: menu.isCache,
      hide: menu.isHide,
      href: menu.isIframe ? menu.routePath : undefined,
    },
    component: getLayoutComponent("basic"),
    children: [routeItem]
  } as PageRoute;
};

export const dynamicGetSelfComponent = (path: string): any => {
  if (!path) {
    return undefined;
  }

  const modules = import.meta.glob('@/views/**/*.vue');
  const routePath = `/src/views/${ deleteFirstCharacter(path) }`;
  return modules[`${ routePath }.vue`] || modules[`${ routePath }/index.vue`] || undefined;
};

export const deleteFirstCharacter = (str: string): string => {
  if (str.startsWith('/')) {
    return str.substring(1);
  }
  return str;
};

export const removeIndexFromPath = (path: string): string => {
  const parts = path.split('/');
  if (parts[parts.length - 1] === 'index') {
    // 移除最后一个部分
    parts.pop();
  }
  return parts.join('/');
};

export const getLayoutComponent = (component: LayoutComponentType): any => {
  switch (component) {
    case "iframe":
      return () => import('@/layouts/iframe.vue')
    case "basic":
      return () => import('@/layouts/index.vue')
    case "blank":
      return () => import('@/layouts/blank.vue')
  }
};

// 获取缓存的路由
export const getCacheRoutes = (pages: PageRoute[]): string[] => {
  const cacheRoutes: string[] = []
  pages.forEach((page: PageRoute) => {
    if (page.meta && page.meta.keepAlive) {
      cacheRoutes.push(page.name)
    }
    if (page.children && page.children.length > 0) {
      cacheRoutes.push(...getCacheRoutes(page.children))
    }
  })
  return cacheRoutes
};
