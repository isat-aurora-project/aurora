import Vue from 'vue'
import { abilitiesPlugin, Can } from '@casl/vue'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store, ability } from '@/store/'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(abilitiesPlugin, ability)
Vue.component('can', Can)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
