/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getTotalAnnualRevenue = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/revenue/getAnnualRevenue')
      .then(response => {
        const revenue = response.data[0].totalRevenue
        context.commit('setAnnualRevenue', parseFloat(revenue))
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getMonthlyRevenue = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/revenue/getMonthlyRevenue')
      .then(response => {
        const revenue = response.data[0].totalRevenue
        context.commit('setMonthlyRevenue', parseFloat(revenue))
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getDateRangeRevenue = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/admin/revenue/getDateRangeRevenue?start=' + payload.startDate + "&end=" + payload.endDate)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
