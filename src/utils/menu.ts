import { PageRoute } from "@/types/route";
import { System } from "@/types/system";
import { renderIcon } from "@/utils/index";

/**
 *
 * 动态生成菜单
 * @param menuList 处理后的路由
 */
export const dynamicGenerateMenus = (menuList: PageRoute[]): System.GlobalMenu[] => {
  const menuOptions: System.GlobalMenu[] = [];

  menuList.forEach((page: PageRoute) => {
    if (page.meta?.hide) {
      return;
    }

    if (page && page.isSingle) {
      if (page.children && page.children.length > 0) {
        menuOptions.push(singlePageToMenu(page.children[0]));
      }
    } else {
      const menu = singlePageToMenu(page);
      if (page.children && page.children.length > 0) {
        menu.children = page.children.map(singlePageToMenu);
      } else {
        menu.children = [];
      }
      menuOptions.push(menu);
    }
  });
  return menuOptions;
};

/**
 * 单页转菜单
 * @param menu
 */
export const singlePageToMenu = (menu: PageRoute): System.GlobalMenu => {
  return {
    label: menu.meta?.title,
    key: menu.name,
    icon: renderIcon(menu.meta?.icon),
    routeName: menu.name,
    routePath: menu.path,
    meta: menu.meta,
  }
};
