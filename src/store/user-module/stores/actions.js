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
