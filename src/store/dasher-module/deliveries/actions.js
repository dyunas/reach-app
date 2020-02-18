/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

/* import axios */
import axios from 'axios'

export const checkPendingDelivery = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/checkPendingDelivery')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}