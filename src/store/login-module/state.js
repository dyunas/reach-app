/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

export default {
  'token': (LocalStorage.has('token')) ? LocalStorage.getItem('token') : null,
  'type': (LocalStorage.has('type')) ? LocalStorage.getItem('type') : null,
  'owner': (LocalStorage.has('owner')) ? LocalStorage.getItem('owner') : null
}