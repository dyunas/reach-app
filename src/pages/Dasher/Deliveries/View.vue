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
      :order="order"
    ></order-details>
  </q-page>
</template>

<script>
import OrderDetails from 'components/Dasher/OrderDetails'

export default {
  components: {
    OrderDetails
  },

  data () {
    return {
      loadingState: false,
      doneFetching: false,
      order: {}
    }
  },

  created () {
    this.getOrderDetails()
  },

  methods: {
    getOrderDetails () {
      this.loadingState = true

      this.$store.dispatch('dasherDeliveryModule/getOrderDetails', {
        id: this.$route.params.id
      })
        .then(response => {
          this.loadingState = false
          this.doneFetching = true
          this.order = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
