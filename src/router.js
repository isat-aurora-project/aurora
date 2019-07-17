import Vue from 'vue'
import Router from 'vue-router'
import { mdiHome, mdiInformation, mdiViewDashboard } from '@mdi/js'
import { store, ability } from '@/store'
import Home from '@/views/Home.vue'
import TheHandleAuthPage from '@/components/pages/TheHandleAuthPage'
import TheDashboardPage from '@/components/pages/TheDashboardPage'
import TheEditorPage from '@/components/pages/TheEditorPage'
import TheLEDSimulatorPage from '@/components/pages/TheLEDSimulatorPage'

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
      path: '/editor',
      name: 'editor',
      component: TheEditorPage,
      meta: {
        icon: 'mdi-file-document-edit'
      }
    },
    {
      path: '/ledsimulator',
      name: 'led Simulator',
      component: TheLEDSimulatorPage,
      meta: {
        icon: 'mdi-file-document-edit'
      }
    }
  ]
})

const waitForStorageToBeReady = (to, from, next) => {
  if (!store._vm.$root.$data['storageReady']) {
    store._vm.$root.$on('storageReady', () => {
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
