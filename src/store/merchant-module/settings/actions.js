/* import axios */
import axios from 'axios'
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getProfileDetails = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/merchant_settings/getAuthenticatedUser')
      .then(response => {
        context.commit('setProfile', response.data)
        resolve(response)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}
