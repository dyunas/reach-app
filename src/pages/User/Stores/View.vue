<template>
  <q-page padding>
    <q-card class="my-card">
      <q-img src="https://jb-ph-cdn.tillster.com/demo/Carousel/Yumburger_MOBILE-BANNER_opt_750x398.jpg_8ec5b093-8e6b-41ed-b2d7-644f08131ef0.jpg">
        <div class="absolute-bottom">
          <div class="text-h6 text-center">Jollibee</div>
          <div class="text-center">
            <q-rating
              v-model="stars"
              :max="5"
              size="20px"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              readonly
            />
          </div>
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
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isDesktop: true,
      'stars': 4.5,
      'loadingState': false,
      'afterLoad': false,
      'noProducts': false,
      'tab': '',
      'categories': [],
      'products': []
    }
  },

  mounted () {
    this.checkPlatform()
    this.getStoreCategories()
  },

  methods: {
    checkPlatform () {
      if (this.$q.platform.desktop) {
        this.isDesktop = true
      } else {
        this.isDesktop = false
      }
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
