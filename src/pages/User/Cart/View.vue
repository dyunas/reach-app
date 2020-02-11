<template>
  <q-page padding>
    <h4 class="pageHeader">My Cart</h4>
    <hr />
    <my-cart
      v-if="this.myCart.length > 0"
      :cart="this.myCart"
      :location="this.currentLocation"
    />
    <q-card v-else>
      <q-card-section>
        <div class="text-h6 text-center">Cart is empty</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import MyCart from 'components/User/MyCart'

export default {
  components: {
    MyCart
  },

  data () {
    return {
      currentLocation: ''
    }
  },

  computed: {
    myCart () {
      return this.$store.getters['userStoresModule/getCartContents']
    }
  },

  watch: {
    myCart () {
      return this.$store.getters['userStoresModule/getCartContents']
    }
  },

  created () {
    this.getCurrentLocation()
  },

  methods: {
    getCurrentLocation () {
      this.watchID = navigator.geolocation.getCurrentPosition(
        this.onLocationSuccess,
        this.onLocationError,
        {
          enableHighAccuracy: true
        }
      )
    },

    onLocationSuccess (position) {
      var lat = position.coords.latitude
      var long = position.coords.longitude

      this.$store.dispatch('userStoresModule/getCurrentLocation', {
        lat: lat,
        long: long
      })
        .then(response => {
          this.currentLocation = response.data.results[0].formatted_address
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    onLocationError (error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>
