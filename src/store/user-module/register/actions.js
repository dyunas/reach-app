/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://18.163.185.208/api'

export const registerUser = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.post('/register', {
      email: payload.email,
      password: payload.password,
      fname: payload.fname,
      lname: payload.lname,
      cnum: payload.cnum,
      account_type: 'customer'
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const verifyUser = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/verify_email?id=' + payload.id + '&token=' + payload.token)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
