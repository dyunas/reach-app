/* import axios */
import axios from 'axios'
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

axios.defaults.baseURL = 'http://18.162.151.188/api'

export const getProducts = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((reject) => {
    axios.get('/merchant_products')
      .then(response => {
        context.commit('setProducts', response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getProductCategories = context => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((reject) => {
    axios.get('/product_categories')
      .then(response => {
        context.commit('setCategories', response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const addCategory = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.post('/product_categories', {
      category: payload.category
    })
      .then(response => {
        context.commit('updateCategory', response.data)
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const createProduct = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    const fd = new FormData()
    fd.append('avatar', payload.avatar)
    fd.append('avatar_name', payload.avatar.name)
    fd.append('productName', payload.productName)
    fd.append('category', payload.category)
    fd.append('price', payload.price)
    fd.append('status', payload.status)
    fd.append('details', payload.details)

    axios.post('/merchant_products', fd)
      .then(response => {
        // context.commit('setProducts', response.data)
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
