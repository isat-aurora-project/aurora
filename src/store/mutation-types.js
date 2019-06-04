/**
 * Mutation Types
 *
 * This file contains a global list of all of the different
 * types of mutations that can be made to our Vuex store.
 */

/**
 * Authentication
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REFRESH_REQUEST = 'REFRESH_REQUEST'
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS'
export const REFRESH_FAILURE = 'REFRESH_FAILURE'
export const LOGOUT = 'LOGOUT'

/**
 * User profile management
 */
export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'
export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST'
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS'
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE'

/**
 * Feathers API
 */
export const SET_API = 'SET_API'
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_FAILURE = 'API_FAILURE'

/**
 * GitHub API
 */
export const SET_GH_TOKEN = 'SET_GH_TOKEN'
export const GH_API_REQUEST = 'GH_API_REQUEST'
export const GH_API_SUCCESS = 'GH_API_SUCCESS'
export const GH_API_FAILURE = 'GH_API_FAILURE'

/**
 * Common
 */
export const TOGGLE_NAV_DRAWER_MINI = 'TOGGLE_NAV_DRAWER_MINI'
