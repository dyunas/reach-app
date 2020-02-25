<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <h4 class="pageHeader">Dashboard</h4>

    <div
      class="q-pa-md"
      v-if="loadingState"
    >
      <q-card class="my-card">
        <q-skeleton
          height="150px"
          square
        />

        <q-card-section>
          <q-skeleton
            type="text"
            class="text-subtitle1"
          />
          <q-skeleton
            type="text"
            width="50%"
            class="text-subtitle1"
          />
          <q-skeleton
            type="text"
            class="text-caption"
          />
        </q-card-section>
      </q-card>
    </div>
    <nearby-stores v-if="storeState"></nearby-stores>
  </q-page>
</template>

<script>
import NearbyStores from 'components/User/NearbyStores'

export default {
  components: {
    NearbyStores
  },

  data () {
    return {
      isDesktop: true,
      loadingState: false,
      storeState: false
    }
  },

  created () {
    this.checkPlatform()
    this.getCurrentLocation()
  },

  methods: {
    checkPlatform () {
      if (this.$q.platform.desktop) {
        this.isDesktop = true
      } else {
        this.isDesktop = false
      }
    },

    getCurrentLocation () {
      navigator.geolocation.getCurrentPosition(
        this.onLocationSuccess,
        this.onLocationError,
        {
          enableHighAccuracy: true
        }
      )
    },

    onLocationSuccess (position) {
      var lat = position.coords.latitude.toFixed(7)
      var long = position.coords.longitude.toFixed(7)

      this.setCurrentLocation(lat, long)
      this.getNearbyStores(lat, long)
    },

    onLocationError (error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
    },

    setCurrentLocation (lat, long) {
      this.$store.dispatch('loginModule/setCurrentLocation', {
        lat: lat,
        long: long
      })
    },

    getNearbyStores (lat, long) {
      this.loadingState = true

      this.$store.dispatch('userDashboardModule/getNearbyStores', {
        lat: lat,
        long: long
      })
        .then(response => {
          this.loadingState = false
          this.storeState = true
        })
        .catch(error => {
          this.loadingState = true
          alert(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>
