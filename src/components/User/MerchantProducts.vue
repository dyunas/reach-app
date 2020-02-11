<template>
  <q-page>
    <div class="row items-start q-gutter-md">
      <q-card
        class="my-card"
        v-for="product in products"
        v-bind:key="product.id"
      >
        <q-img :src="'http://localhost/reach-php/public/storage/' + product.avatar" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ product.product_name }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{ 'Php ' + product.product_price + ' ・ '+ product.description }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn
            flat
            color="primary"
            icon="shopping_cart"
          >
            Add to cart
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  props: {
    categoryId: {
      type: Number,
      required: true
    },

    merchantId: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      'products': []
    }
  },

  watch: {
    categoryId () {
      this.runGetProduct(this.categoryId, this.merchantId)
    }
  },

  created () {
    this.runGetProduct = this.getProducts(this.categoryId, this.merchantId)
  },

  methods: {
    getProducts (categoryId, merchantId) {
      this.$emit('whileLoading', {
        'loadingState': true,
        'afterLoad': false
      })
      this.$store.dispatch('userStoresModule/getStoreProductsByCategory', {
        'categoryId': categoryId,
        'merchantId': merchantId
      })
        .then(response => {
          var loadingState = false
          var afterLoad = true

          if (response.data.data.length > 0) {
            var noProducts = false
            this.products = response.data.data
          } else {
            var noProducts = true
            this.products = []
          }

          this.$emit('doneLoading', {
            'loadingState': loadingState,
            'afterLoading': afterLoad,
            'noProducts': noProducts
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
