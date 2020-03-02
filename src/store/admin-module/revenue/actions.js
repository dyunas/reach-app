/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getTotalAnnualRevenue = async context => {
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

export const getMonthlyRevenue = async context => {
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
