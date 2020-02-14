import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

const echo = new Echo({
  broadcaster: 'pusher',
  key: '9495d55f813ec982fbbb',
  cluster: 'ap1',
  encrypted: false
})

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$echo = echo
}
