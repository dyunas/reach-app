<template>
  <q-page padding>
    <h4 class="pageHeader">My Cart</h4>
    <hr />
    <my-cart
      v-if="this.myCart.length > 0"
      :cart="this.myCart"
    />
    <q-card v-else>
      <q-card-section>
        <div class="text-h6 text-center">Cart is empty</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import MyCart from 'components/User/MyCart'

export default {
  components: {
    MyCart
  },

  data () {
    return {
      //
    }
  },

  computed: {
    myCart () {
      return this.$store.getters['userStoresModule/getCartContents']
    }
  }
}
</script>

<style lang="sass" scoped>
body
  background-color: #FFFFFF
  
.pageHeader
  margin: 15px 0px 5px 15px
</style>
