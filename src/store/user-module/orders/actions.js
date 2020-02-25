/* import axios */
import axios from 'axios'
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getOrderList = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/customer_orders')
      .then(response => {
        context.commit('setOrders', response.data)
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getOrderDetails = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/customer_orders/' + payload.id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}