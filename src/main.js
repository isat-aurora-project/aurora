import Vue from 'vue'
import { abilitiesPlugin, Can } from '@casl/vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store, ability } from '@/store/'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.config.productionTip = false
Vue.use(abilitiesPlugin, ability)
Vue.component('can', Can)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
