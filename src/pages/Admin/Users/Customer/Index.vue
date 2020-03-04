<template>
  <q-page padding>
    <h4 class="pageHeader">Customer</h4>

    <div>
      <q-table
        :data="data"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="filter"
        @request="getCustomerList"
        binary-state-sort
      >
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
        <template v-slot:body-cell-action="cellProperties">
          <q-td :props="cellProperties">
            <q-btn
              flat
              color="primary"
              icon="search"
              :to="{ path: '/admin/users/customer/view/' + cellProperties.value }"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: ''
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'fname', align: 'left', label: 'FIRSTNAME', field: 'fname', sortable: true },
        { name: 'lname', label: 'LASTNAME', align: 'left', field: 'lname', sortable: true },
        { name: 'account_status', label: 'ACCOUNT STATUS', align: 'center', field: 'account_status', sortable: true },
        {
          name: 'action',
          label: 'ACTION',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
          sortable: false
        }
      ],
      data: []
    }
  },

  mounted () {
    // get initial data from server (1st page)
    this.getCustomerList({
      pagination: this.pagination,
      filter: undefined
    })
  },

  methods: {
    getCustomerList () {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = this.pagination
      let filter = this.filter

      this.pagination.rowsNumber = this.getRowsNumberCount(filter)
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
      let startRow = (page - 1) * rowsPerPage + 1

      this.loading = true
      this.$store.dispatch('adminCustomerModule/getCustomerList', {
        startRow: startRow,
        fetchCount: fetchCount,
        sortBy: sortBy,
        descending: descending
      })
        .then(response => {
          this.data.splice(0, response.length, ...response)

          // don't forget to update local pagination object
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.pagination.sortBy = sortBy
          this.pagination.descending = descending

          // ...and turn of loading indicator
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },

    getRowsNumberCount (filter) {
      this.$store.dispatch('adminCustomerModule/getCustomerListCount')
        .then(response => {
          if (!filter) {
            return response.length
          }
          let count = 0
          response.forEach(data => {
            if (data['id'].includes(filter)) {
              ++count
            }
            if (data['fname'].includes(filter)) {
              ++count
            }
            if (data['lname'].includes(filter)) {
              ++count
            }
            if (data['account_status'].includes(filter)) {
              ++count
            }
          })

          return count
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>
