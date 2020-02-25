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
    ></order-details>
  </q-page>
</template>

<script>
import OrderDetails from 'components/User/OrderDetails'

export default {
  components: {
    OrderDetails
  },

  data () {
    return {
      loadingState: false,
      doneFetching: false,
      details: [],
    }
  },

  created () {
    this.getOrderDetails()
  },

  methods: {
    getOrderDetails () {
      this.loadingState = true
      this.doneFetching = false

      this.$store.dispatch('userOrdersModule/getOrderDetails', {
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
    }
  }
}
</script>
