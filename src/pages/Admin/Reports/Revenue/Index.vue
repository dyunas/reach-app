<template>
  <q-page class="q-pa-sm">
    <h4 class="pageHeader">Revenue Report</h4>

    <div class="row">
      <q-card class="my-card q-pa-sm col">
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

        <div class="q-pa-md">
          <div class="col">
            <div class="text-subtitle2 text-weight-normal">TOTAL TRANSACTION: <span class="text-weight-normal">{{ transactions }}</span></div>
          </div>
        </div>
        <div class="q-pa-md">
          <div class="row">
            <div class="col">
              <div class="text-subtitle2 text-weight-normal">REVENUE FROM MERCHANT: <span class="text-weight-normal">PHP {{ merchRev.toFixed(2) }}</span></div>
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-normal">REVENUE FROM DASHER: <span class="text-weight-normal">PHP {{ dasherRev.toFixed(2) }}</span></div>
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-normal">TOTAL REVENUE: <span class="text-weight-normal">PHP {{ totalRev.toFixed(2) }}</span></div>
            </div>
          </div>
        </div>
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
          style="font-size:10px"
        >
        </q-table>
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
      submitting: false,
      generatedReport: false,
      transactions: 0,
      merchRev: 0,
      dasherRev: 0,
      totalRev: 0,
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
        { name: 'merch_rev', label: 'R.F.M', align: 'right', field: 'merch_rev', sortable: true },
        { name: 'delivery_rev', label: 'R.F.D', align: 'right', field: 'delivery_rev', sortable: true },
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
      this.merchRev = 0
      this.dasherRev = 0
      this.totalRev = 0
      this.transactions = 0

      this.$store.dispatch('adminRevenueModule/getDateRangeRevenue', {
        startDate: this.startDate,
        endDate: this.endDate,
      })
        .then(response => {
          if (response.data.length > 0) {
            response.data.forEach(item => {
              this.data.push({
                order_id: item.order_id,
                merchant: item.merchant_name,
                dasher: item.fname + ' ' + item.lname,
                status: item.status,
                paymentMode: item.paymentMode,
                merch_rev: parseFloat(item.merch_rev).toFixed(2),
                delivery_rev: parseFloat(item.delivery_rev).toFixed(2),
                total: (parseFloat(item.merch_rev) + parseFloat(item.delivery_rev)).toFixed(2),
                created_at: item.created_date,
              })

              this.merchRev += parseFloat(item.merch_rev)
              this.dasherRev += parseFloat(item.delivery_rev)
            })

            this.totalRev = this.merchRev + this.dasherRev
            this.transactions = response.data.length
          }

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
      this.merchRev = 0
      this.dasherRev = 0
      this.totalRev = 0
      this.transactions = 0
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>
