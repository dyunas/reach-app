/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getDasherRating = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/ratings')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
