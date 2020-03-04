/* import axios */
import axios from 'axios'
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

axios.defaults.baseURL = 'http://18.163.185.208/api'

export const getProfileDetails = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/merchant_settings/getAuthenticatedUser')
      .then(response => {
        context.commit('setProfile', response.data)
        resolve(response)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}

export const getCurrentLocation = (context, payload) => {
  return new Promise((resolve, reject) => {
    axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=' + payload.lat + ',' + payload.long + '&key=AIzaSyDjf9uspNjkPTPhhAlNsn-vmsYXMn0oa3E')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const updateProfile = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.post('/merchant_settings/' + payload.id, {
      data: {
        merchantName: payload.merchantName,
        openingTime: payload.openingTime,
        closingTime: payload.closingTime,
        email: payload.email,
        contactNumber: payload.contactNumber,
        location: payload.location,
        lat: payload.lat,
        long: payload.long
      },
      _method: 'PATCH'
    })
      .then(response => {
        context.commit('setProfile', response.data)
        resolve(response)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}

export const changeBanner = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    const fd = new FormData()
    fd.append('banner', payload.banner)
    fd.append('banner_name', payload.banner.name)

    axios.post('/merchant_settings/changeBanner', fd)
      .then(response => {
        context.commit('setBanner', response.data[0].photo)
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
