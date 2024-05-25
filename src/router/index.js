import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'
import SongView from '@/views/SongView.vue'
import useUserStore from '@/stores/user'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: 'manage',
    // alias works like the below redirect code: it will redirect to /manage-music
    // But the below redirect code might be prefered because it might be better for SEO
    // alias: '/manage',
    path: '/manage-music',
    component: ManageView,
    beforeEnter: (to, from, next) => {
      next()
    },
    meta: {
      requiredAuth: true
    }
  },
  // works same as alias above
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  // no auth required, let user proceed to page
  if (!to.meta.requiredAuth) {
    next()
    return
  }

  const store = useUserStore()

  if (store.userLoggedIn) {
    next() // user is logged in, so proceed
  } else {
    next({ name: 'home' }) // user is not logged in and page requires auth, so redirect to home page
  }
})

export default router
