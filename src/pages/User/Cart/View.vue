<template>
  <q-page padding>
    <h4 class="pageHeader">My Cart</h4>
    <hr />
    <my-cart />
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import MyCart from 'components/User/MyCart'

export default {
  components: {
    MyCart
  },

  data () {
    return {
      //
    }
  }
}
</script>

<style lang="sass" scoped>  
.pageHeader
  margin: 15px 0px 5px 15px
</style>
