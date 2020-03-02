<template>
  <q-page padding>
    <h4 class="pageHeader">Transactions Report</h4>

    <div class="row">
      <q-card class="my-card q-pa-md col">
        <div class="text-subtitle2 text-uppercase">Generate Report:</div>

        <br />

        <q-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-pa-sm q-gutter-lg">
            <div class="col col-xs-12 col-sm-12 col-md-3">
              <q-input
                outlined
                dense
                v-model="startDate"
                label="Start Date"
                mask="date"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="startDate"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col col-xs-12 col-sm-12 col-md-3">
              <q-input
                outlined
                dense
                v-model="endDate"
                label="End Date"
                mask="date"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="endDate"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col col-xs-12 col-sm-12 col-md-4">
              <q-btn
                label="Generate"
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
          </div>
        </q-form>
      </q-card>
    </div>

    <br />

    <div class="row">
      <q-card
        class="my-card col"
        v-if="generatedReport"
      >
        <div class="q-pa-md text-subtitle2 text-uppercase">{{ "Generated Report: from " + startDate + " - " + endDate }}</div>

        <br />

        <q-table
          dense
          bordered
          :data="data"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          hide-bottom
        >
        </q-table>
        <br />
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      startDate: '',
      endDate: '',
      filterBy: '',
      filterByOptions: '',
      filterWithOptions: '',
      submitting: false,
      generatedReport: false,
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows    
      },
      columns: [
        { name: 'order_id', label: 'ORDER ID', align: 'left', field: 'order_id', sortable: true },
        { name: 'merchant', label: 'MERCHANT', align: 'left', field: 'merchant', sortable: true },
        { name: 'dasher', label: 'DASHER', align: 'left', field: 'dasher', sortable: true },
        { name: 'status', label: 'STATUS', align: 'center', field: 'status', sortable: true },
        { name: 'paymentMode', label: 'M.O.P', align: 'center', field: 'paymentMode', sortable: true },
        { name: 'subTotal', label: 'SUBTOTAL', align: 'right', field: 'subTotal', sortable: true },
        { name: 'distance', label: 'DISTANCE', align: 'right', field: 'distance', sortable: true },
        { name: 'delivery_fee', label: 'DELIVERY FEE', align: 'right', field: 'delivery_fee', sortable: true },
        { name: 'total', label: 'TOTAL', align: 'right', field: 'total', sortable: true },
        { name: 'created_at', label: 'ORDER DATE', align: 'left', field: 'created_at', sortable: true }
      ],
      data: []
    }
  },

  methods: {
    onSubmit () {
      this.submitting = true
      this.data = []

      this.$store.dispatch('adminTransactionModule/getDateRangeTransactions', {
        startDate: this.startDate,
        endDate: this.endDate,
      })
        .then(response => {
          response.data.forEach(item => {
            this.data.push({
              order_id: item.order_id,
              merchant: item.merchant_name,
              dasher: item.fname + ' ' + item.lname,
              status: item.status,
              paymentMode: item.paymentMode,
              subTotal: parseFloat(item.subTotal),
              distance: item.distance + 'KM',
              delivery_fee: parseFloat(item.delivery_fee),
              total: parseFloat(item.total),
              created_at: item.created_date,
            })
          })

          this.submitting = false
          this.generatedReport = true
        })
        .catch(error => {
          console.log(error)
        })
    },

    onReset () {
      this.startDate = ''
      this.endDate = ''
      this.generatedReport = false
      this.data = []
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>