import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import VuexPersistence from 'vuex-persist'
import auth from '@/store/modules/auth'
import api, { setAPIToken } from '@/store/modules/api'
import github, { setGitHubAPIToken } from '@/store/modules/github'
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
  strictMode: debug,
  modules: [
    'auth',
    'common'
  ]
})

export const store = new Vuex.Store({
  strict: debug,
  modules: {
    auth,
    api,
    github,
    common
  },
  mutations: {
    RESTORE_MUTATION: local.RESTORE_MUTATION
  },
  plugins: [local.plugin, setAPIToken, setGitHubAPIToken, abilityPlugin]
})
