/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getNearbyStores = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/stores?custLat=' + payload.lat + '&custLong=' + payload.long)
      .then(response => {
        context.commit('setNearbyStores', response)
        resolve(true)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}
