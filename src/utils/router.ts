import { LayoutComponentType, PageRoute } from "@/types/route";

/**
 * 静态pageRoute转换为路由
 * @param pages 配置的路由
 * @param authRouteKey 权限key 由后端返回 如果不传入则全部返回
 */
export function staticPageRouteGenerateRoutes(pages: PageRoute[], authRouteKey: string[] = []) {
  // 排序处理
  pages.sort((a, b) => (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0));
  return pages.map(page => singlePageToRoute(page, authRouteKey)).flat()
}

export function singlePageToRoute(page: PageRoute, authRouteKey: string[]): PageRoute[] {
  const resultRoute: PageRoute[] = [];
  // 判断是否有权限
  if (authRouteKey.length == 0 || authRouteKey.includes(page.name)) {
    const layout = page.type === "self" ? page.component : getLayoutComponent(page.type)
    const isSingle = isSingleRoute(page)
    const itemRoute = { ...page } as PageRoute
    itemRoute.component = layout
    if (hasChildren(page)) {
      // 检查 page.children 是否存在且为数组
      if (page && Array.isArray(page.children)) {
        itemRoute.children = page.children.map(child => singlePageToRoute(child, authRouteKey)).flat();
      } else {
        // 如果 page.children 不存在或者不是数组，可以设置一个空数组作为默认值
        itemRoute.children = [];
      }
    }
    itemRoute.component = layout
    if (isSingle) {
      const parentPath = `${ removeIndexFromPath(page.path) }-parent`
      itemRoute.component = page.component
      return [{
        path: parentPath,
        component: layout,
        isSingle: true,
        redirect: page.path,
        meta: page.meta,
        children: [itemRoute]
      } as PageRoute]
    }
    resultRoute.push(itemRoute)
  }
  return resultRoute
}

/**
 * 根据后端返回的动态菜单生成路由
 * @param menuList 后端返回的动态菜单并且处理过分组的
 */
export function dynamicGenerateRoutes(menuList: IMenus[]): PageRoute[] {
  return menuList.map(menu => singleDynamicMenuToRoute(menu)).flat()
}

function singleDynamicMenuToRoute(menu: IMenus): PageRoute[] {
  const routes: PageRoute[] = []
  // 判断是否为 parentId = 0
  const routeItem = {
    name: removeIndexFromPath(menu.routeName),
    path: menu.isIframe ? removeIndexFromPath('/' + menu.routeName) : removeIndexFromPath(menu.routePath),
    meta: {
      title: menu.menuName,
      icon: menu.icon,
      permissions: menu.permissions,
      keepAlive: menu.isCache,
      hide: menu.isHide,
      href: menu.isIframe ? menu.routePath : undefined,
    },
    type: "self",
    component: menu.isIframe ? getLayoutComponent("iframe") : dynamicGetSelfComponent(menu.component),
  } as PageRoute
  if (menu.parentId.toString() === "0") {
    if (menu.children && menu.children.length == 0) {
      const item = {
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
      } as PageRoute
      return [item]
    } else {
      const children = menu?.children.map(child => singleDynamicMenuToRoute(child)).flat()
      routeItem.component = getLayoutComponent(menu.isIframe ? "iframe" : "basic")
      if (children && children.length > 0) {
        routeItem.children = children
        routeItem.redirect = children[0].path
      }
    }
  }
  routes.push(routeItem)
  return routes
}

function dynamicGetSelfComponent(path: string) {
  let modules = import.meta.glob('@/views/**/*.vue')
  if (path !== "" && path !== undefined) {
    const routePath = `/src/views/${ deleteFirstCharacter(path) }`
    return modules[`${ routePath }.vue`] || modules[`${ routePath }/index.vue`]
  }
}

function deleteFirstCharacter(str: string): string {
  if (str.startsWith('/')) {
    return str.substring(1);
  }
  return str;
}

function removeIndexFromPath(path: string): string {
  const parts = path.split('/');
  if (parts[parts.length - 1] === 'index') {
    // 移除最后一个部分
    parts.pop();
  }
  return parts.join('/');
}

export function isSingleRoute(page: PageRoute) {
  return page?.isSingle ?? false
}

export function hasChildren(page: PageRoute) {
  return page?.children && page?.children.length > 0
}

function getLayoutComponent(component: LayoutComponentType) {
  switch (component) {
    case "iframe":
      return () => import('@/layouts/iframe.vue')
    case "basic":
      return () => import('@/layouts/index.vue')
    case "blank":
      return () => import('@/layouts/blank.vue')
  }
}

// 获取缓存的路由
export const getCacheRoutes = (pages: PageRoute[]) => {
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
}
