/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getAnnualTransactionsCount = async context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/transactions/getAnnualTransactionsCount')
      .then(response => {
        context.commit('setAnnualTransactionsCount', response.data[0].annualTransaction)
        resolve(response)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

export const getMonthlyTransactionsCount = async context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/transactions/getMonthlyTransactionsCount')
      .then(response => {
        context.commit('setMonthlyTransactionsCount', response.data[0].monthlyTransaction)
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getDateRangeTransactions = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/transactions/getDateRangeTransactions?start=' + payload.startDate + "&end=" + payload.endDate)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
