/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

export const setCart = (state, payload) => {
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

  state.cart = parsed
  state.cartCount = cartCount
}
