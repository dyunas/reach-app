/* import axios */
import axios from 'axios'
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const login = (context, payload) => {
  return new Promise((resolve, reject) => {
    axios.post("/login",
      {
        data: {
          email: payload.email,
          password: payload.password
        },
        '_method': 'POST'
      }
    )
      .then(response => {
        const token = 'Bearer ' + response.data.token
        const type = response.data.account_type
        const owner = response.data.owner

        LocalStorage.set('token', token)
        LocalStorage.set('type', type)
        LocalStorage.set('owner', owner)

        context.commit('setCredentials', {
          'token': token,
          'type': type,
          'owner': owner
        })

        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const logout = (context) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    if (LocalStorage.has('token')) {
      axios.post('/logout')
        .then(response => {
          LocalStorage.remove('token')
          LocalStorage.remove('type')
          LocalStorage.remove('owner')
          context.commit('destroyToken')
          resolve(response.result)
        })
        .catch(error => {
          LocalStorage.remove('token')
          LocalStorage.remove('type')
          LocalStorage.remove('owner')
          context.commit('destroyToken')
          reject(error)
        })
    }
  })
}
