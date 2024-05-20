/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  }
})

const TITLE_SUFFIX = 'Yuu-G.net'

router.afterEach((to, from) => {
  const title = to.meta.title ?? ''
  const description = to.meta.description ?? ''

  const metaDescription = document.querySelector('meta[name="description"]')

  document.title = title ? title + ' | ' + TITLE_SUFFIX : TITLE_SUFFIX

  if(!metaDescription) {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = description
    document.head.appendChild(meta)
  } else {
    metaDescription.setAttribute('content', description)
  }
})

export default router
