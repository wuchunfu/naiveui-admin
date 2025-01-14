import { PageRoute } from "@/types/route";

const router: PageRoute = {
  name: 'system',
  path: '/system',
  redirect: '/system/user',
  meta: {
    title: '系统管理',
    icon: 'line-md:cog',
    sort: 2,
    keepAlive: true,
  },
  type: 'basic',
  children: [
    {
      name: 'system_user',
      path: '/system/user',
      type: 'self',
      meta: {
        title: '用户管理',
        icon: 'line-md:person-search-twotone',
        keepAlive: true,
      },
      component: () => import('@/views/system/user/index.vue'),
    },
    {
      name: 'system_menu',
      path: '/system/menu',
      type: 'self',
      meta: {
        title: '菜单管理',
        icon: 'line-md:list-3-filled',
        keepAlive: true,
      },
      component: () => import('@/views/system/menu/index.vue'),
    },
    {
      name: 'system_role',
      path: '/system/role',
      type: 'self',
      meta: {
        title: '角色管理',
        icon: 'line-md:document-list',
        keepAlive: true,
      },
      component: () => import('@/views/system/role/index.vue'),
    }
  ]
}

export default router;