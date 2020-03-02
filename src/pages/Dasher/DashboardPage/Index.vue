<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-weight-medium text-uppercase">{{ header }}</div>
      </q-card-section>

      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div
            class="text-center q-pa-md"
            v-show="showReturnData"
          >
            <q-spinner-comment
              color="yellow"
              size="5em"
            />

            <div class="text-h6">{{ message }}</div>
            <br />
            <q-btn :to="{ path: path }">Click here to view</q-btn>
          </div>
        </transition>
      </q-card-section>

      <q-inner-loading :showing="visible">
        <q-spinner-hourglass
          color="yellow"
          size="4em"
        />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from 'quasar'

export default {
  data () {
    return {
      header: 'Standing by...',
      visible: true,
      showReturnData: false,
      rider_id: LocalStorage.getItem('ownerID'),
      intervalID: '',
      message: '',
      path: '',
      audio: {
        file: new Audio('statics/audios/loud_alarm.mp3'),
        isPlaying: false
      }
    }
  },

  beforeDestroy () {
    clearInterval(this.intervalID)
    this.audio.isPlaying = false
    this.audio.file.pause()
    this.audio.file.currentTime = 0
  },

  created () {
    this.checkPendingDelivery()
  },

  mounted () {
    this.$echo.channel('rider-tracker-' + this.rider_id)
      .listen('PlacedOrder', (notify) => {
        this.orderUp(notify)
        this.audio.isPlaying = true
        this.audio.file.play()
        this.audio.file.currentTime = 0
        clearInterval(this.intervalID)
      })
  },

  methods: {
    checkPendingDelivery () {
      this.$store.dispatch('dasherDeliveryModule/checkPendingDelivery')
        .then(response => {
          if (response.data.length > 0) {
            this.visible = false
            this.showReturnData = true
            this.header = 'Order up!'
            this.message = 'You still have pending delivery!'
            this.path = '/dasher/deliveries/' + response.data[0].id
          } else {
            this.getCurrentLocation()
          }
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    getCurrentLocation () {
      this.intervalID = setInterval(() => {
        this.watchID = navigator.geolocation.getCurrentPosition(
          this.onLocationSuccess,
          this.onLocationError,
          {
            enableHighAccuracy: true
          }
        )
      }, 5000)
    },

    onLocationSuccess (position) {
      var lat = position.coords.latitude.toFixed(7)
      var long = position.coords.longitude.toFixed(7)

      this.$store.dispatch('loginModule/setCurrentLocation', {
        lat: lat,
        long: long
      })
    },

    onLocationError (error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
    },

    orderUp (notify) {
      this.visible = false
      this.showReturnData = true
      this.header = 'Order up!'
      this.message = notify.notify.message
      this.path = '/dasher/deliveries/' + notify.notify.path
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  min-width: 320px
  height: 450px
</style>
