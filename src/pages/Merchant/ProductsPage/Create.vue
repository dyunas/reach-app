<template>
  <q-page>
    <h4 class="pageHeader">New Product</h4>

    <div class="q-pa-md row">
      <div class="col col-md-12 col-lg-12">
        <q-card class="q-pa-md">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <div class="row">
              <div class="col col-xs-12 col-sm-12 col-md-4">
                <q-select
                  outlined
                  v-model="status"
                  label="STATUS"
                  :dense="dense"
                  :options-dense="dense"
                  :options="statusOptions"
                  :rules="[ val => val && val.length > 0 || 'Field required']"
                  class="q-mr-xs"
                />
              </div>
            </div>
            <div class="row">
              <div class="col col-xs-12 col-sm-12 col-md-4">
                <q-input
                  outlined
                  v-model="productName"
                  label="PRODUCT NAME"
                  :dense="dense"
                  :rules="[ val => val && val.length > 0 || 'Field required']"
                  class="q-mr-xs"
                />
              </div>
              <div class="col col-xs-12 col-sm-12 col-md-4">
                <q-select
                  outlined
                  v-model="category"
                  label="CATEGORY"
                  :dense="dense"
                  :options-dense="dense"
                  :options="[]"
                  emit-value
                  map-options
                  :rules="[ val => val && val.length > 0 || 'Field required']"
                  class="q-mr-xs"
                />
              </div>
              <div class="col col-xs-12 col-sm-12 col-md-4">
                <q-input
                  outlined
                  v-model="price"
                  label="PRICE"
                  :dense="dense"
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  :rules="[ val => val > 0 || 'Field required']"
                  class="q-mr-xs"
                />
              </div>
            </div>
            <div class="row">
              <div class="col col-xs-12 col-sm-12 col-md-12">
                <q-input
                  outlined
                  v-model="details"
                  label="DETAILS"
                  :dense="dense"
                  :rules="[ val => val && val.length > 0 || 'Field required']"
                  class="q-mr-xs"
                />
              </div>
            </div>
            <div>
              <q-btn
                label="Save"
                :loading="submitting"
                type="submit"
                color="primary"
              >
                <template v-slot:loading>
                  <q-spinner-bars />
                </template>
              </q-btn>
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                style="margin-left: 10px!important;"
              />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isDesktop: true,
      dense: true,
      rfid_tag: null,
      productName: null,
      category: null,
      price: null,
      details: null,
      status: '',
      statusOptions: ['available', 'out-of-stock'],
      submitting: false
    }
  },

  methods: {
    onSubmit (payload) {
      this.submitting = true
      this.$store.dispatch('createProduct', payload)
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
    },

    onSubmit () {
      this.$store.dispatch('merchantProductsModule/createProduct', {
        productName: this.productName,
        category: this.category,
        price: this.price,
        status: this.status,
        details: this.details
      })
    },

    onReset () {
      this.productName = null
      this.category = null
      this.price = null
      this.details = null
      this.status = null
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>
