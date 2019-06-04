import Vue from 'vue'
import Router from 'vue-router'
import { mdiHome, mdiInformation, mdiViewDashboard } from '@mdi/js'
import { store, ability } from '@/store'
import Home from '@/views/Home.vue'
import TheHandleAuthPage from '@/components/pages/TheHandleAuthPage'
import TheDashboardPage from '@/components/pages/TheDashboardPage'
import TheRepositoriesPage from '@/components/pages/TheRepositoriesPage'
import TheRepositoryPage from '@/components/pages/TheRepositoryPage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        icon: mdiHome
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: {
        icon: mdiInformation
      }
    },
    {
      path: '/handle-auth',
      name: 'handle-auth',
      component: TheHandleAuthPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: TheDashboardPage,
      meta: {
        icon: mdiViewDashboard
      }
    },
    {
      path: '/repositories',
      name: 'repositories',
      component: TheRepositoriesPage,
      meta: {
        icon: 'mdi-github-circle'
      }
    },
    {
      path: '/repositories/:username/:reponame',
      name: 'repository',
      component: TheRepositoryPage
    }
  ]
})

const waitForStorageToBeReady = (to, from, next) => {
  if (!store._vm.$root.$data['vuexPersistStateRestored']) {
    store._vm.$root.$on('vuexPersistStateRestored', () => {
      // restore abilities on page reload
      ability.update(store.state.auth.abilities)
      next()
    })
  } else {
    next()
  }
}
router.beforeEach(waitForStorageToBeReady)

export default router
