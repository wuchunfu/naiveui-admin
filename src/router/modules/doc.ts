import { PageRoute } from "@/typings/route";

const router: PageRoute = {
  name: 'doc',
  path: '/doc',
  type: 'basic',
  redirect: '/doc/naive',
  meta: {
    title: '文档管理',
    icon: 'line-md:text-box',
    sort: 2
  },
  component: () => import('@/layouts/index.vue'),
  children: [
    {
      name: 'doc_naive',
      path: '/doc/naive',
      type: 'self',
      meta: {
        title: 'Naive UI',
        icon: 'logos:naiveui',
        href: 'https://www.naiveui.com/zh-CN/os-theme'
      },
      component: () => import('@/layouts/iframe.vue'),
    }
  ]
}

export default router;