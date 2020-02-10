<template>
  <q-page padding>
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
    <div
      v-if="storeState"
      class="q-pa-md row items-start q-gutter-md"
    >
      <q-card
        class="my-card"
        v-for="store in nearbyStores"
        v-bind:key="store.id"
      >
        <q-img src="https://jb-ph-cdn.tillster.com/demo/Carousel/Yumburger_MOBILE-BANNER_opt_750x398.jpg_8ec5b093-8e6b-41ed-b2d7-644f08131ef0.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ store.merchant_name }}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              {{ store.distance + 'KM' }}
            </div>
          </div>
          <div class="text-caption text-grey">
            {{ store.location }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle text-grey">
            {{ store.description }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn
            flat
            color="primary"
            :to="{ path: '/user/merchant/' + store.id }"
          >
            View
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      watchID: '',
      loadingState: false,
      storeState: false
    }
  },

  computed: {
    nearbyStores () {
      return this.$store.getters['userDashboardModule/nearbyStores']
    }
  },

  created () {
    this.loadingState = true

    this.getCurrentLocation()
  },

  destroy () {
    navigator.geolocation.clearWatch(watchID)
  },

  methods: {
    getCurrentLocation () {
      this.watchID = navigator.geolocation.watchPosition(
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

      this.getNearbyStores(lat, long)
    },

    onLocationError (error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
    },

    getNearbyStores (lat, long) {
      this.$store.dispatch('userDashboardModule/getNearbyStores', {
        'lat': lat,
        'long': long
      })
        .then(response => {
          this.loadingState = false
          this.storeState = true
        })
        .catch(error => {
          this.loadingState = true
          alert(error.data)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  min-width: 320px
</style>