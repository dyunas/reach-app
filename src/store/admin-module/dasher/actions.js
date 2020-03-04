/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://18.163.185.208/api'

export const getDasherList = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/dasher?startRow=' + payload.startRow + '&fetchCount=' + payload.fetchCount + '&filter=' + payload.filter + '&sortBy=' + payload.sortBy + '&desc=' + payload.descending)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getDasherListCount = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/getDasherCount')
      .then(response => {
        context.commit('setDasherCount', response.data)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getDasherDetails = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/dasher/' + payload.dasher_id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getDasherRating = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/getDasherRating?id=' + payload.dasher_id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
