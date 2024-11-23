import { PageRoute } from "@/typings/route";

const router: PageRoute = {
  name: 'about',
  path: '/about',
  type: 'basic',
  isSingle: true,
  meta: {
    title: '关于',
    icon: 'line-md:lightbulb-twotone',
    sort: 10,
    affix: false,
    keepAlive: true,
  },
  component: () => import('@/views/about/index.vue')
}

export default router;