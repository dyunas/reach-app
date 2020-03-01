<template>
  <q-page padding>
    <q-card class="my-card">
      <q-img :src="'http://18.162.151.188/storage/' + banner">
        <div class="absolute-bottom">
          <div class="text-h6 text-center">Jollibee</div>
        </div>
      </q-img>

      <q-card-actions>
        <div
          class="q-gutter-y-md"
          :class="[ this.isDesktop === false  ? 'tab-width-mobile' : '' ]"
        >
          <q-tabs
            v-model="tab"
            dense
            inline-label
            shrink
            stretch
            narrow-indicator
          >
            <q-tab
              v-for="category in this.categories"
              v-bind:key="category.id"
              :name="category.category"
              :label="category.category"
              @click='getProducts(category.id)'
            />
          </q-tabs>
        </div>
      </q-card-actions>
    </q-card>

    <br />

    <div
      class="q-pa-md"
      v-if="loadingState"
    >
      <q-card
        flat
        style="max-width: 300px"
      >
        <q-skeleton
          height="150px"
          square
        />

        <q-card-section>
          <q-skeleton
            type="text"
            class="text-subtitle1"
          />
          <q-skeleton
            type="text"
            width="50%"
            class="text-subtitle1"
          />
          <q-skeleton
            type="text"
            class="text-caption"
          />
        </q-card-section>
      </q-card>
    </div>

    <q-card v-if="noProducts">
      <q-card-section>
        <div class="text-h6 text-center">No product to show</div>
      </q-card-section>
    </q-card>

    <q-tab-panels
      v-if="afterLoad"
      v-model="tab"
      animated
    >
      <q-tab-panel
        v-for="category in categories"
        v-bind:key="category.id"
        :name="category.category"
        :label="category.category"
      >
        <div class="row items-start q-gutter-md">
          <q-card
            class="my-card"
            v-for="(product, index) in products"
            v-bind:key="product.id"
          >
            <q-img
              :src="'http://18.162.151.188/storage/' + product.avatar"
              :ratio="4/3"
            />

            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  {{ product.product_name }}
                </div>
                <div class="text-subtitle1">
                  <strong>{{ 'Php ' + product.product_price }}</strong>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn
                flat
                color="primary"
                icon="shopping_cart"
                @click="addToCart(index)"
              >
                Add to cart
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      'isDesktop': true,
      'loadingState': false,
      'afterLoad': false,
      'noProducts': false,
      'tab': '',
      'categories': [],
      'products': [],
      'banner': '',
    }
  },

  created () {
    this.checkPlatform()
    this.getStoreCategories()
    this.getStoreBanner()
  },

  computed: {
    isThereMerchant () {
      return this.$store.getters['userStoresModule/isThereMerchant']
    }
  },

  methods: {
    checkPlatform () {
      if (this.$q.platform.desktop) {
        this.isDesktop = true
      } else {
        this.isDesktop = false
      }
    },

    getStoreBanner () {
      this.$store.dispatch('userStoresModule/getStoreBanner', {
        merchant_id: this.$route.params.id
      })
        .then(response => {
          this.banner = response.data[0].photo
        })
        .catch(error => {
          console.log(error)
        })
    },

    addToCart (product) {
      const merchantId = this.$route.params.id
      let item = {
        'id': this.products[product].id,
        'avatar': this.products[product].avatar,
        'name': this.products[product].product_name,
        'price': parseFloat(this.products[product].product_price),
        'qty': 1
      }

      if (this.isThereMerchant !== '' && this.isThereMerchant !== this.$route.params.id) {
        this.$q.notify({
          color: 'red-9',
          textColor: 'white',
          icon: 'far fa-times-circle',
          message: 'Strictly 1 merchant per order',
          position: 'top',
          timeout: 3000,
        })
      } else {
        this.$store.dispatch('userStoresModule/addToCart', { item, merchantId })
          .then(response => {
            this.$q.notify({
              color: 'green-9',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Added to cart',
              position: 'top',
              timeout: 3000,
              multiLine: true,
              actions: [
                { label: 'View Cart', color: 'white', handler: () => { this.$router.push({ path: '/user/my_cart' }) } },
                { label: 'Dismiss', color: 'white', handler: () => { /* console.log('wooow') */ } }
              ]
            })
          })
      }
    },

    removeFromCart () {
      //
    },

    getStoreCategories () {
      this.$store.dispatch('userStoresModule/getStoreCategories', {
        'id': this.$route.params.id
      })
        .then(response => {
          this.categories = response.data
          this.tab = response.data[0].category

          this.getProducts(response.data[0].id)
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    getProducts (categoryID) {
      this.loadingState = true
      this.afterLoad = false
      this.$store.dispatch('userStoresModule/getStoreProductsByCategory', {
        'categoryId': categoryID,
        'merchantId': this.$route.params.id
      })
        .then(response => {
          this.loadingState = false
          this.afterLoad = true

          if (response.data.data.length > 0) {
            this.noProducts = false
            this.products = response.data.data
          } else {
            this.products = []
            this.noProducts = true
          }
        })
        .catch(error => {
          console.log(error.data)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.tab-width-mobile
  max-width: 320px

.my-card
  min-width: 320px
</style>
