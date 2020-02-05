<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <h4 class="pageHeader">Dashboard</h4>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        v-for="store in nearbyStores"
        v-bind:key="store.id"
      >
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

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

          <q-rating
            v-model="stars"
            :max="5"
            size="32px"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            readonly
          />
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
      isDesktop: true,
      stars: 4.5,
      watchID: ''
    };
  },

  computed: {
    nearbyStores () {
      return this.$store.getters['userDashboardModule/nearbyStores']
    }
  },

  mounted () {
    this.checkPlatform()
    this.getCurrentLocation()
  },

  destroy () {
    navigator.geolocation.clearWatch(watchID)
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
    }
  }
};
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px

.my-card
  min-width: 320px
</style>
