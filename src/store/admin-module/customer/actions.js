/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getCustomerList = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/customer?startRow=' + payload.startRow + '&fetchCount=' + payload.fetchCount + '&filter=' + payload.filter + '&sortBy=' + payload.sortBy + '&desc=' + payload.descending)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getCustomerListCount = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/getCustomerCount')
      .then(response => {
        context.commit('setCustomerCount', response.data)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
