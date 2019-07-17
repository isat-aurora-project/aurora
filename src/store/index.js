import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import VuexPersistence from 'vuex-persist'
import auth from '@/store/modules/auth'
import common from '@/store/modules/common'
import { abilityPlugin, ability as appAbility } from '@/store/abilities'

Vue.use(Vuex)

export const ability = appAbility

const debug = process.env.NODE_ENV !== 'production'
// const debug = false

const local = new VuexPersistence({
  key: 'aurora_vuex',
  storage: localforage,
  asyncStorage: true,
  strictMode: debug
})

// plugin to handle when store has been restored
const handleRestore = () => {
  return store => {
    store._vm.$root.$data['storageReady'] = false
    store.subscribe(mutation => {
      if (mutation.type === 'RESTORE_MUTATION') {
        store._vm.$root.$data['storageReady'] = true
        store._vm.$root.$emit('storageReady')
      }
    })
  }
}

export const store = new Vuex.Store({
  strict: debug,
  modules: {
    auth,
    common
  },
  mutations: {
    RESTORE_MUTATION: local.RESTORE_MUTATION
  },
  plugins: [local.plugin, abilityPlugin, handleRestore()]
})
