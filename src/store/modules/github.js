/**
 * A store module representing the GitHub API
 */

import { github } from '@/services/github.service'
import { SET_GH_TOKEN, GH_API_REQUEST, GH_API_SUCCESS, GH_API_FAILURE } from '@/store/mutation-types'

let api

const initialState = {
  api: null,
  token: null,
  currentRequest: {},
  error: null
}

const state = Object.assign({}, initialState)

const mutations = {
  [SET_GH_TOKEN] (state, token) {
    state.token = token
    api = github(token)
  },
  [GH_API_REQUEST] (state, { method, service, params }) {
    state.error = null
    state.currentRequest.method = method
    state.currentRequest.service = service
    state.currentRequest.params = params
  },
  [GH_API_SUCCESS] (state) {
    state.currentRequest = {}
  },
  [GH_API_FAILURE] (state, err) {
    state.currentRequest = {}
    state.error = err
  }
}

const actions = {
  setToken ({ commit }, token) {
    commit(SET_GH_TOKEN, token)
  },
  async call ({ commit, state, dispatch }, { method, params }) {
    // let the store know we're beginning a request
    commit(GH_API_REQUEST, { method, params })
    // make sure we are authenticated
    await dispatch('auth/enticate', null, { root: true })
    // make sure params has a value
    params = params || {}
    // make our api call and handle the result
    return api[method](params).then(
      res => {
        commit(GH_API_SUCCESS)
        return res.data
      },
      err => {
        commit(GH_API_FAILURE, err)
        return state.error
      }
    )
  }
}

const getters = {}

/**
 * A Vuex plugin to subscribe to login/refresh/logout mutations so that
 * the API token can be (re)set, when necessary.
 *
 * @param {Vuex} store The global store
 */
export const setGitHubAPIToken = store => {
  store.subscribe(mutation => {
    // listen for mutations that affect the value of auth.accessToken
    if ([
      'auth/LOGIN_SUCCESS',
      'auth/REFRESH_SUCCESS',
      'auth/LOGIN_FAILURE',
      'auth/REFRESH_FAILURE',
      'auth/LOGOUT',
      'RESTORE_MUTATION'
    ].includes(mutation.type)) {
      // get the access token from auth state
      const token = store.state.auth.user.app_metadata.github_token
      // save it in the github store
      store.dispatch('github/setToken', token)
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
