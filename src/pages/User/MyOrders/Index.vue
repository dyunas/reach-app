<template>
  <q-page padding>
    <h4 class="pageHeader">My Orders</h4>

    <div
      class="q-pa-md"
      v-if="loadingState"
    >
      <q-card class="my-card">
        <q-item style="max-width: 300px">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton
                type="text"
                width="65%"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item style="max-width: 300px">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton
                type="text"
                width="65%"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton
                type="text"
                width="65%"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <order-list
      v-if="showList"
      :orders="this.orders"
    ></order-list>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import OrderList from 'components/User/OrderList'

export default {
  components: {
    OrderList
  },

  data () {
    return {
      loadingState: false,
      showList: false,
    }
  },

  created () {
    this.getOrderList()
  },

  mounted () {
    this.$echo.channel('status-order-tracker-' + LocalStorage.getItem('ownerID'))
      .listen('UpdateOrder', (notify) => {
        this.getUpdatedOrderList()
      })
  },

  computed: {
    orders () {
      return this.$store.getters['userOrdersModule/getOrders']
    }
  },

  methods: {
    getOrderList () {
      this.loadingState = true
      this.showList = false

      this.$store.dispatch('userOrdersModule/getOrderList')
        .then(response => {
          this.loadingState = false
          this.showList = true
        })
        .catch(error => {
          alert(error.data)
        })
    },

    getUpdatedOrderList () {
      this.$store.dispatch('userOrdersModule/getOrderList')
        .catch(error => {
          alert(error.data)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>
