import { PageRoute } from "@/types/route";

const router: PageRoute = {
  name: 'home',
  path: '/home',
  type: 'basic',
  isSingle: true,
  meta: {
    title: '首页',
    icon: 'line-md:computer',
    sort: 1,
    affix: true,
    keepAlive: true,
  },
  component: () => import('@/views/home/index.vue')
}

export default router;
