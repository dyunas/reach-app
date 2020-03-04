/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

/* import axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://18.163.185.208/api'

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

export const getStoreBanner = (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/store_getBanner?merchant_id=' + payload.merchant_id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const addToCart = (context, payload) => {
  const cart = (LocalStorage.has('cart') ? JSON.parse(LocalStorage.getItem('cart')) : [])

  if (cart.length > 0) {
    const cartItem = cart.find(cart => cart.id === payload.item.id)

    if (cartItem && Object.keys(cartItem).length > 0) {
      const cartIndex = cart.findIndex(cart => cart.id === payload.item.id)
      cart[cartIndex].qty = parseInt(cart[cartIndex].qty) + 1
    } else {
      cart.push(payload.item)
    }
  } else {
    cart.push(payload.item)
  }

  let parsed = JSON.stringify(cart)
  let cartCount = cart.length

  LocalStorage.set('merchantID', payload.merchantId)
  LocalStorage.set('cart', parsed)
  LocalStorage.set('cartCount', cartCount)

  context.commit('setMerchantID', payload.merchantId)
  context.commit('setCart', cart)
  context.commit('setCartCount', cartCount)
}

export const updateCart = (context, payload) => {
  var cart = (LocalStorage.has('cart') ? JSON.parse(LocalStorage.getItem('cart')) : [])
  cart = []
  cart = payload.cart

  var parsed = JSON.stringify(cart)
  var cartCount = cart.length

  LocalStorage.set('cart', parsed)
  LocalStorage.set('cartCount', cartCount)

  context.commit('setCart', cart)
  context.commit('setCartCount', cartCount)
}

export const removeItemFromCart = (context, payload) => {
  var cart = JSON.parse(LocalStorage.getItem('cart'))
  cart.splice(payload.index, 1)

  var parsed = JSON.stringify(cart)
  var cartCount = cart.length

  if (cartCount === 0) {
    const merchantID = ''
    LocalStorage.set('merchantID', merchantID)
    context.commit('setMerchantID', merchantID)
  }

  LocalStorage.set('cart', parsed)
  LocalStorage.set('cartCount', cartCount)

  context.commit('setCart', cart)
  context.commit('setCartCount', cartCount)
}

export const getMerchantLatLong = () => {
  const id = LocalStorage.getItem('merchantID')
  return new Promise((resolve, reject) => {
    axios.get('/stores/' + id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getStoreDistance = (context) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  return new Promise((resolve, reject) => {
    axios.get('/getStoreDistanceInKM/' + LocalStorage.getItem('merchantID') + '?lat=' + LocalStorage.getItem('lat') + '&long=' + LocalStorage.getItem('long'))
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getCurrentLocation = () => {
  const lat = LocalStorage.getItem('lat')
  const long = LocalStorage.getItem('long')

  return new Promise((resolve, reject) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDjf9uspNjkPTPhhAlNsn-vmsYXMn0oa3E')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const placeOrder = async (context, payload) => {
  axios.defaults.headers.common['Authorization'] = context.rootState.loginModule.token
  let lat = ''
  let long = ''
  const custLat = LocalStorage.getItem('lat')
  const custLong = LocalStorage.getItem('long')
  const customerID = LocalStorage.getItem('ownerID')
  const merchantID = LocalStorage.getItem('merchantID')

  let merchLatLong = await getMerchantLatLong(context.rootState.loginModule.token)

  // console.log(merchLatLong)
  return new Promise((resolve, reject) => {
    axios.post('/customer_orders', {
      cart: payload.cart,
      instruction: payload.instruction,
      location: payload.location,
      custLat: custLat,
      custLong: custLong,
      customerID: customerID,
      merchantID: merchantID,
      merchLat: merchLatLong.data[0].latitude,
      merchLong: merchLatLong.data[0].longitude,
      subTotal: payload.subTotal,
      distance: payload.distance,
      deliveryFee: payload.deliveryFee,
      total: payload.total,
      paymentMode: payload.paymentMode
    })
      .then(result => {
        if (result.data.ok === true) {
          LocalStorage.remove('cart')
          LocalStorage.remove('cartCount')
          LocalStorage.remove('merchantID')

          context.commit('undoCart')
          resolve(result.data)
        }

        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
