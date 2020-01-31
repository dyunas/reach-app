/* import axios */
import axios from 'axios'
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getProducts = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((reject) => {
    axios.get('/merchant_products')
      .then(response => {
        context.commit('setProducts', response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}