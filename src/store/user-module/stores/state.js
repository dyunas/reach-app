/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

export default function () {
  return {
    cart: (LocalStorage.has('cart')) ? JSON.parse(LocalStorage.getItem('cart')) : Array(),
    cartCount: (LocalStorage.has('cartCount')) ? LocalStorage.getItem('cartCount') : 0,
    merchantID: (LocalStorage.has('merchantID')) ? LocalStorage.getItem('merchantID') : ''
  }
}
