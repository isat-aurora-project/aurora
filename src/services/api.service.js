import feathers from '@feathersjs/client'
import axios from 'axios'

const app = feathers()
const rc = feathers.rest(process.env.VUE_APP_API_URL)
app.configure(rc.axios(axios))

export const api = token => {
  // TODO: Throw an error if token is not set

  const params = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  // API functions
  return {
    getUser: async (id, query = {}) => app.service('/auth0/users').get(id, { ...params, ...query })
  }
}
