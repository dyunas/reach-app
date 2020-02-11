<template>
  <q-page padding>
    <h4 class="pageHeader">Checkout</h4>
    <hr />
    <check-out-form
      :cart="this.myCart"
      :location="this.currentLocation"
    />
    <div class="row justify-end">
      <q-btn
        type="button"
        label="Back to cart"
        class="q-mt-md q-mr-md"
        color="warning"
        text-color="white"
        icon="arrow_back"
        :to="{ path: '/user/my_cart' }"
      />
      <q-btn
        type="button"
        label="Place Order"
        class="q-mt-md"
        color="white"
        text-color="black"
        icon="done"
        :to="{ path: '/user/my_cart/checkout' }"
      />
    </div>
  </q-page>
</template>

<script>
import CheckOutForm from 'components/User/CheckOutForm'

export default {
  components: {
    CheckOutForm
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

  created () {
    this.getCurrentLocation()
  },

  destroy () {
    this.currentLocation = ''
  },

  methods: {
    getCurrentLocation () {
      this.$store.dispatch('userStoresModule/getCurrentLocation')
        .then(response => {
          this.currentLocation = response.data.results[0].formatted_address
        })
        .catch(error => {
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
