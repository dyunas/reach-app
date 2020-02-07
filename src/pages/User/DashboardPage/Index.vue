<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <h4 class="pageHeader">Dashboard</h4>

    <nearby-stores></nearby-stores>
  </q-page>
</template>

<script>
import NearbyStores from 'components/User/NearbyStores.vue'

export default {
  components: {
    NearbyStores
  },

  data () {
    return {
      isDesktop: true,
    }
  },

  mounted () {
    this.checkPlatform()
  },

  methods: {
    checkPlatform () {
      if (this.$q.platform.desktop) {
        this.isDesktop = true
      } else {
        this.isDesktop = false
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>
