/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://18.162.151.188/api'

export const getMerchantList = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/merchant?startRow=' + payload.startRow + '&fetchCount=' + payload.fetchCount + '&filter=' + payload.filter + '&sortBy=' + payload.sortBy + '&desc=' + payload.descending)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getMerchantListCount = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/getMerchantCount')
      .then(response => {
        context.commit('setMerchantCount', response.data)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
