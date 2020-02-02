<template>
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
                v-model="status"
                label="STATUS"
                :dense="dense"
                :options-dense="dense"
                :options="statusOptions"
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
            <div class="col col-xs-12 col-sm-12 col-md-4">
              <q-select
                outlined
                v-model="category"
                label="CATEGORY"
                :dense="dense"
                :options-dense="dense"
                :options="this.categories"
                emit-value
                map-options
                :rules="[ val => val || 'Field required']"
                class="q-mr-xs"
              />
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4">
              <q-input
                @change="onFileSelected"
                outlined
                type="file"
              />
            </div>
          </div>
          <div class="row">
            <div class="col col-xs-12 col-sm-12 col-md-12">
              <q-input
                type="textarea"
                outlined
                v-model="details"
                label="DESCRIPTION"
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
</template>

<script>
export default {
  data () {
    return {
      dense: true,
      avatar: null,
      productName: null,
      category: null,
      price: null,
      details: null,
      status: '',
      statusOptions: ['available', 'out-of-stock'],
    }
  },

  props: {
    submitting: {
      type: Boolean,
      required: true
    },
  },

  computed: {
    categories () {
      return this.$store.getters['merchantProductsModule/productCategories']
    }
  },

  mounted () {
    this.getProductCategories()
  },

  methods: {
    onFileSelected (event) {
      this.avatar = event.target.files[0]
    },

    getProductCategories () {
      this.$store.dispatch('merchantProductsModule/getProductCategories')
        .catch(error => {
          console.log(error.data)
        })
    },

    onSubmit () {
      this.$emit('submitted', {
        avatar: this.avatar,
        productName: this.productName,
        category: this.category,
        price: this.price,
        status: this.status,
        details: this.details
      })
    },

    onReset () {
      this.avatar = null
      this.productName = null
      this.category = null
      this.price = null
      this.details = null
      this.status = null
    }
  }
}
</script>
