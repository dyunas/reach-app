<template>
  <q-page padding>
    <h4 class="pageHeader">Products</h4>

    <div class="q-pa-md-row">
      <q-card>
        <div class="col col-md-12 col-lg-12">
          <q-tabs
            v-model="tab"
            align="left"
            inline-label
            active-color="primary"
            indicator-color="primary"
            class="text-grey"
            narrow-indicator
          >
            <q-tab
              name="products"
              icon=""
              label="Products"
              @click='getProducts()'
            />
            <q-tab
              name="category"
              icon=""
              label="Category"
              @click='getCategories()'
            />
          </q-tabs>
        </div>
        <div class="col col-md-12 col-lg-12">
          <q-tab-panels
            v-model="tab"
            animated
          >
            <q-tab-panel name="products">
              <q-table
                :data="this.products"
                :columns="prodColumns"
                row-key="id"
                :filter="prodFilter"
              >
                <template v-slot:top-left>
                  <q-btn
                    flat
                    color="primary"
                    label="Add New Product"
                    icon="add_circle_outline"
                    align="around"
                    :loading="addNewBtnLoading"
                    @click="addNewData"
                  >
                    <template v-slot:loading>
                      <q-spinner-bars class="q-mr-sm" />
                      Please wait
                    </template>
                  </q-btn>
                </template>
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="prodFilter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body-cell-avatar="cellProperties">
                  <q-td>
                    <q-img
                      :src="'http://18.162.151.188/storage/' + cellProperties.value"
                      alt="Avatar"
                    />
                  </q-td>
                </template>
                <template v-slot:body-cell-action="cellProperties">
                  <q-td :props="cellProperties">
                    <router-link
                      class="q-mr-sm"
                      :to="{ path: '/merchant/my_products/view/' + cellProperties.value }"
                    >
                      <q-btn
                        flat
                        color="primary"
                        icon="search"
                      >
                      </q-btn>
                    </router-link>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="category">
              <q-table
                :data="this.categories"
                :columns="catColumns"
                row-key="id"
                :filter="catFilter"
              >
                <template v-slot:top-left>
                  <q-btn
                    flat
                    color="primary"
                    label="Add New Categories"
                    icon="add_circle_outline"
                    align="around"
                    @click="addCategory = true"
                  >
                    <template v-slot:loading>
                      <q-spinner-bars class="q-mr-sm" />
                      Please wait
                    </template>
                  </q-btn>
                </template>
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="catFilter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body-cell-action="cellProperties">
                  <q-td :props="cellProperties">
                    <router-link
                      class="q-mr-sm"
                      :to="{ path: '/merchant/my_products/category/delete/' + cellProperties.value }"
                    >
                      <q-btn
                        flat
                        color="primary"
                        icon="close"
                      >
                      </q-btn>
                    </router-link>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card>
    </div>

    <q-dialog
      v-model="addCategory"
      persistent
      ref="addingCategory"
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
          >
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form
            @submit="saveCategory"
            @reset="resetCategory"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="category"
              label="Category"
              dense
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type a category']"
            />

            <div>
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
                :loading="addCatBtnLoading"
              />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isDesktop: true,
      addNewBtnLoading: false,
      addCatBtnLoading: false,
      addCategory: false,
      category: '',
      tab: 'products',
      prodFilter: '',
      catFilter: '',
      prodColumns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'avatar', align: 'center', label: 'Avatar', field: 'avatar', sortable: false },
        { name: 'product_name', align: 'left', label: 'Product Name', field: 'product_name', sortable: true },
        { name: 'product_price', align: 'right', label: 'Price', field: 'product_price', sortable: true },
        { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: true },
        {
          name: 'action',
          label: 'ACTION',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
          sortable: false
        }
      ],
      catColumns: [
        {
          name: 'value',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.value,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'label', align: 'left', label: 'Category', field: 'label', sortable: true },
        {
          name: 'action',
          label: 'ACTION',
          align: 'center',
          field: row => row.value,
          format: val => `${val}`,
          sortable: false
        }
      ]
    };
  },

  computed: {
    products () {
      return this.$store.getters['merchantProductsModule/products']
    },

    categories () {
      return this.$store.getters['merchantProductsModule/productCategories']
    }
  },

  created () {
    this.getProducts()
  },

  methods: {
    getProducts () {
      this.$store.dispatch('merchantProductsModule/getProducts')
    },

    getCategories () {
      this.$store.dispatch('merchantProductsModule/getProductCategories')
    },

    addNewData () {
      this.addNewBtnLoading = true
      this.$router.push('/merchant/my_products/create')
      this.addNewBtnLoading = false
    },

    saveCategory () {
      this.addCatBtnLoading = true

      this.$store.dispatch('merchantProductsModule/addCategory', {
        category: this.category
      })
        .then(response => {
          this.addCatBtnLoading = false
          this.$refs.addingCategory.hide()

          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'far fa-check-circle',
            message: 'Category added!',
            position: 'top',
            timeout: 3000,
          })
        })
        .catch(error => {
          this.addCatBtnLoading = false
          this.$refs.addingCategory.hide()

          this.$q.notify({
            color: 'red-9',
            textColor: 'white',
            icon: 'far fa-times-circle',
            message: error.data,
            position: 'top',
            timeout: 3000,
          })
        })
    },

    resetCategory () {
      this.category = ''
    }
  }
}
</script>

<style lang="sass" scoped>  
.pageHeader
  margin: 15px 0px 5px 15px
</style>
