import { PageRoute } from "@/types/route";

const page: PageRoute = {
  name: 'component',
  path: '/component',
  type: 'basic',
  redirect: '/component/icon',
  meta: {
    title: '组件',
    icon: 'line-md:coffee-twotone',
    sort: 3,
    keepAlive: false,
  },
  children: [
    {
      name: 'component_icon',
      path: '/component/icon',
      type: 'self',
      meta: {
        title: '图标',
        icon: 'line-md:emoji-smile-wink',
        keepAlive: false,
      },
      component: () => import('@/views/component/icon/index.vue'),
    },
    {
      name: 'component_form',
      path: '/component/form',
      type: 'self',
      meta: {
        title: '表单',
        icon: 'line-md:emoji-smile-wink',
        keepAlive: false,
      },
      component: () => import('@/views/component/form/index.vue'),
    },
    {
      name: 'component_table',
      path: '/component/table',
      type: 'self',
      meta: {
        title: '表格',
        icon: 'line-md:emoji-smile-wink',
        keepAlive: false,
      },
      component: () => import('@/views/component/table/index.vue'),
    }
  ]
}

export default page;