/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

const TITLE_SUFFIX = 'Yuu-G.net'

router.afterEach((to, from) => {
  const title = to.meta.title ?? ''

  document.title = title ? title + ' | ' + TITLE_SUFFIX : TITLE_SUFFIX
})

export default router
