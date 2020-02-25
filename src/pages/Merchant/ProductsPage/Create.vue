<template>
  <q-page>
    <h4 class="pageHeader">New Product</h4>
    <product-form
      v-on:submitted="onSubmit"
      :submitting="submitting"
    />
  </q-page>
</template>

<script>
import ProductForm from 'components/Merchant/ProductForm.vue'

export default {
  data () {
    return {
      isDesktop: true,
      submitting: false
    }
  },

  components: {
    ProductForm
  },

  methods: {
    onSubmit (payload) {
      this.submitting = true
      this.$store.dispatch('merchantProductsModule/createProduct', payload)
        .then(response => {
          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Product saved',
            position: 'top',
            timeout: 5000
          })
          this.$router.push({ path: '/merchant/my_products' })
          this.submitting = false
        })
        .catch(error => {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-exclamation-circle',
            message: 'Something went wrong while saving. Please Try again.',
            position: 'top',
            timeout: 5000
          })
          console.log(error)
          this.submitting = false
        })
    }
  }
}
</script>

<style lang="sass" scoped>  
.pageHeader
  margin: 15px 0px 5px 15px
</style>
