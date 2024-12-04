import { PageRoute } from "@/types/route";

const router: PageRoute = {
  name: 'web',
  path: '/web',
  type: 'basic',
  redirect: '/web_new',
  meta: {
    title: '网页测试',
    icon: 'material-symbols:webhook',
  },
  component: () => import('@/layouts/index.vue'),
  children: [
    {
      name: 'web_new',
      path: '/web_new',
      type: 'self',
      meta: {
        title: '新开网页',
        icon: 'line-md:menu',
        href: 'https://www.naiveui.com/zh-CN/os-theme'
      },
      component: () => import('@/layouts/iframe.vue'),
    }, {
      name: 'web_new_2',
      path: '/web_new_2',
      type: 'self',
      meta: {
        title: '新开网页2',
        icon: 'line-md:menu',
        href: 'https://bilibili.com'
      },
      component: () => import('@/layouts/iframe.vue'),
    }
  ]
}

export default router;