<template>
  <q-page padding>
    <h4 class="pageHeader">Deliveries</h4>

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
    <delivery-list
      v-if="showList"
      :deliveries="deliveries"
    ></delivery-list>
  </q-page>
</template>

<script>
import DeliveryList from 'components/Dasher/DeliveryList'

export default {
  components: {
    DeliveryList
  },

  data () {
    return {
      loadingState: false,
      showList: false,
      deliveries: {},
    }
  },

  created () {
    this.getDeliveryList()
  },

  methods: {
    getDeliveryList () {
      this.loadingState = true
      this.showList = false

      this.$store.dispatch('dasherDeliveryModule/getDeliveryList')
        .then(response => {
          this.deliveries = response.data

          this.loadingState = false
          this.showList = true
        })
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
