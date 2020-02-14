<template>
  <q-page padding>
    <h4 class="pageHeader">Checkout</h4>
    <hr />
    <check-out-form
      :cart="this.myCart"
      :location="this.currentLocation"
      v-on:checkOutNow="placeOrder"
    />

    <q-dialog
      v-model="processing"
      ref="placingOrder"
      persistent
    >
      <q-card class="q-pa-md">
        <q-card-section class="q-pb-none">
          <div class="text-h6">Processing order</div>
        </q-card-section>

        <div class="text-center">
          <q-spinner-hourglass
            color="yellow"
            size="4em"
          />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="doneProcessing"
      persistent
    >
      <q-card class="q-pa-md">
        <q-card-section class="q-pb-none">
          <div class="text-h6">{{ dialogHeader }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">{{ dialogMessage }}</div>
        </q-card-section>

        <q-card-actions
          align="center"
          class="text-primary"
        >
          <q-btn
            flat
            label="VIEW ORDER"
            :to="{ path: 'user/orders' }"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { QSpinnerBars, LocalStorage } from 'quasar'

import CheckOutForm from 'components/User/CheckOutForm'

export default {
  components: {
    CheckOutForm
  },

  data () {
    return {
      currentLocation: '',
      processing: false,
      doneProcessing: false,
      dialogHeader: '',
      dialogMessage: '',
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
    },

    placeOrder (payload) {
      this.processing = true

      this.$store.dispatch('userStoresModule/placeOrder', payload)
        .then(response => {
          LocalStorage.remove('cart')
          LocalStorage.remove('cartCount')
          LocalStorage.remove('merchantID')

          setTimeout(() => {
            this.$refs.placingOrder.hide()
            this.doneProcessing = true
            this.dialogHeader = response.header
            this.dialogMessage = response.message
          }, 2000);
        })
        .catch(error => {
          this.$refs.placingOrder.hide()
          this.processing = false
        })
    }
  }
}
</script>

<style lang="sass" scoped>
body
  background-color: #FFFFFF

.pageHeader
  margin: 15px 0px 5px 15px
</style>
