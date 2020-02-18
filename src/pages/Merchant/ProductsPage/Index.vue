<template>
  <q-page>
    <h4 class="pageHeader">Products</h4>

    <div class="q-pa-md row">
      <div class="col col-md-12 col-lg-12">
        <q-table
          :data="this.products"
          :columns="columns"
          row-key="id"
          :filter="filter"
        >
          <template v-slot:top-left>
            <q-btn
              flat
              color="primary"
              label="Add new"
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
              v-model="filter"
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
                :src="'http://localhost/reach-php/public/storage/' + cellProperties.value"
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
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isDesktop: true,
      addNewBtnLoading: false,
      filter: '',
      columns: [
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
      ]
    };
  },

  computed: {
    products () {
      return this.$store.getters['merchantProductsModule/products']
    }
  },

  created () {
    this.getProducts()
  },

  methods: {
    getProducts () {
      this.$store.dispatch('merchantProductsModule/getProducts')
    },

    addNewData () {
      this.addNewBtnLoading = true
      this.$router.push('/merchant/my_products/create')
      this.addNewBtnLoading = false
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>
