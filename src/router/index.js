// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
        meta: {
          title: "Home",
          desc: "Yuu-G.netは自作ツールなどを公開している個人サイトです。"
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
        meta: {title: "About"}
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'),
        meta: {title: "404 NotFound"}
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach(to => {
  if ('meta' in to) {
    if ('title' in to.meta) {
      document.title = to.meta.title + " | Yuu-G.net"
    }
    if ('desc' in to.meta) {
      document.querySelector('meta[name="description"]').setAttribute('content', to.meta.desc)
    }
  }
})

export default router
