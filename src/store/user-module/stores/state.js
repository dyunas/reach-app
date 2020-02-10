/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

export default function () {
  return {
    cart: (LocalStorage.has('cart')) ? LocalStorage.getItem('cart') : [],
    cartCount: (LocalStorage.has('cartCount')) ? LocalStorage.getItem('cartCount') : 0,
  }
}
