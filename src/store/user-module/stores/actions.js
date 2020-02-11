/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/reach-php/public/api'

export const getStoreCategories = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/store_categories?id=' + payload.id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}

export const getStoreProductsByCategory = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/store_products_by_category?category_id=' + payload.categoryId + "&merchant_id=" + payload.merchantId)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}

export const addToCart = (context, payload) => {
  const cart = (LocalStorage.has('cart') ? JSON.parse(LocalStorage.getItem('cart')) : [])

  if (cart.length > 0) {
    const cartItem = cart.find(cart => cart.id === payload.id)

    if (cartItem && Object.keys(cartItem).length > 0) {
      const cartIndex = cart.findIndex(cart => cart.id === payload.id)
      cart[cartIndex].qty = parseInt(cart[cartIndex].qty) + 1
    } else {
      cart.push(payload)
    }
  } else {
    cart.push(payload)
  }

  let parsed = JSON.stringify(cart)
  let cartCount = cart.length

  LocalStorage.set('cart', parsed)
  LocalStorage.set('cartCount', cartCount)

  context.commit('setCart', parsed)
  context.commit('setCartCount', cartCount)
}

export const updateCart = (context, payload) => {
  let cart = JSON.parse(LocalStorage.getItem('cart'))
  cart = []
  cart = payload.cart

  let parsed = JSON.stringify(cart)
  let cartCount = cart.length

  LocalStorage.set('cart', parsed)
  LocalStorage.set('cartCount', cartCount)

  context.commit('setCart', parsed)
  context.commit('setCartCount', cartCount)
}

export const removeItemFromCart = (context, payload) => {
  const cart = JSON.parse(LocalStorage.getItem('cart'))
  cart.splice(payload.index, 1)

  let parsed = JSON.stringify(cart)
  let cartCount = cart.length

  LocalStorage.set('cart', parsed)
  LocalStorage.set('cartCount', cartCount)

  context.commit('setCart', parsed)
  context.commit('setCartCount', cartCount)
}

export const getCurrentLocation = (context, payload) => {
  // axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + payload.lat + ',' + payload.long + '&key=AIzaSyDjf9uspNjkPTPhhAlNsn-vmsYXMn0oa3E')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error.data)
      })
  })
}