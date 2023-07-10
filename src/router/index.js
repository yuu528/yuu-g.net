// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
        meta: {title: "Home"}
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
        meta: {title: "About"}
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach(to => {
  document.title = to.meta.title + " | Yuu-G.net"
})

export default router
