<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        v-for="store in nearbyStores"
        v-bind:key="store.id"
      >
        <q-img
          :src="'http://18.162.151.188/storage/' + store.photo"
          :ratio="4/3"
        />

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
          <div class="text-caption text-grey ellipsis">
            {{ store.location }}
          </div>
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
      //
    }
  },

  computed: {
    nearbyStores () {
      return this.$store.getters['userDashboardModule/nearbyStores']
    }
  },

  methods: {
    //
  }
}
</script>

<style lang="sass" scoped>
.my-card
  min-width: 320px
  max-width: 400px
  width: 100%
</style>
