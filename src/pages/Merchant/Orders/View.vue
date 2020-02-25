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
    <order-details
      v-if="doneFetching"
      :details="details"
      :orderStatus="orderStatus"
      v-on:updateOrderStatus="updateOrderStatus"
    ></order-details>
  </q-page>
</template>

<script>
import OrderDetails from 'components/Merchant/OrderDetails'

export default {
  components: {
    OrderDetails
  },

  data () {
    return {
      loadingState: false,
      doneFetching: false,
      details: [],
      orderStatus: []
    }
  },

  created () {
    this.orderOpened()
    this.getOrderDetails()
    this.getOrderStatus()
  },

  methods: {
    orderOpened () {
      this.$store.dispatch('merchantOrdersModule/orderOpened', {
        id: this.$route.params.id
      })
    },

    getOrderStatus () {
      this.$store.dispatch('merchantOrdersModule/getOrderStatus')
        .then(response => {
          response.data.forEach(status => {
            this.orderStatus.push(status.status)
          })
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    getOrderDetails () {
      this.loadingState = true
      this.doneFetching = false

      this.$store.dispatch('merchantOrdersModule/getOrderDetails', {
        id: this.$route.params.id
      })
        .then(response => {
          this.details = response.data

          this.loadingState = false
          this.doneFetching = true
        })
        .catch(error => {
          alert(error.data)
        })
    },

    updateOrderStatus (status) {
      this.details[0].status = status.orderStatus
    }
  }
}
</script>
