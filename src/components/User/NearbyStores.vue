<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        v-for="store in nearbyStores"
        v-bind:key="store.id"
      >
        <q-img src="https://jb-ph-cdn.tillster.com/demo/Carousel/Yumburger_MOBILE-BANNER_opt_750x398.jpg_8ec5b093-8e6b-41ed-b2d7-644f08131ef0.jpg" />

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
  max-width: 320px
</style>
