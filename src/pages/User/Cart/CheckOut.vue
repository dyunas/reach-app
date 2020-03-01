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
            :to="{ path: '/user/orders/' + orderId }"
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
      orderId: '',
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
          if (response.ok === true) {
            setTimeout(() => {
              this.$refs.placingOrder.hide()
              this.dialogHeader = response.header
              this.dialogMessage = response.message
              this.orderId = response.order_id
              this.doneProcessing = true
            }, 2000, response);
          } else {
            this.$refs.placingOrder.hide()
            const dialog = this.$q.dialog({
              title: response.header,
              message: response.message
            }).onOk(() => {
              dialog.hide()
            })
            this.processing = false
          }
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
.pageHeader
  margin: 15px 0px 5px 15px
</style>
