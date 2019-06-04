import feathers from '@feathersjs/client'
import axios from 'axios'

const app = feathers()
const rc = feathers.rest(process.env.VUE_APP_API_URL)
app.configure(rc.axios(axios))

export const api = token => {
  // configure axios to ALWAYS send the specified Authorization header
  app.rest.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return app
}
