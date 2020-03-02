<template>
  <q-page padding>
    <h4 class="pageHeader">Dashboard</h4>

    <div class="row items-start q-gutter-md">
      <customer-count
        class="my-card col"
        :count="customerCount"
      ></customer-count>
      <merchant-count
        class="my-card col"
        :count="merchantCount"
      ></merchant-count>
      <dasher-count
        class="my-card col"
        :count="dasherCount"
      ></dasher-count>
    </div>

    <br />

    <transaction-report
      :month="month"
      :annualCount="annualTransaction"
      :monthlyCount="monthlyTransaction"
    ></transaction-report>

    <br />

    <revenue-report
      :month="month"
      :annualRevenue="annualRevenue"
      :monthlyRevenue="monthlyRevenue"
    ></revenue-report>
  </q-page>
</template>

<script>
import CustomerCount from "components/Admin/DashboardPage/CustomerCount"
import MerchantCount from "components/Admin/DashboardPage/MerchantCount"
import DasherCount from "components/Admin/DashboardPage/DasherCount"
import TransactionReport from "components/Admin/DashboardPage/TransactionReport"
import RevenueReport from "components/Admin/DashboardPage/RevenueReport"

export default {
  components: {
    CustomerCount,
    MerchantCount,
    DasherCount,
    TransactionReport,
    RevenueReport
  },

  data () {
    return {
      month: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    }
  },

  created () {
    this.$store.dispatch('adminCustomerModule/getCustomerListCount')
    this.$store.dispatch('adminDasherModule/getDasherListCount')
    this.$store.dispatch('adminMerchantModule/getMerchantListCount')
    this.$store.dispatch('adminTransactionModule/getAnnualTransactionsCount')
    this.$store.dispatch('adminTransactionModule/getMonthlyTransactionsCount')
    this.$store.dispatch('adminRevenueModule/getTotalAnnualRevenue')
    this.$store.dispatch('adminRevenueModule/getMonthlyRevenue')
  },

  computed: {
    customerCount () {
      return this.$store.getters['adminCustomerModule/getCustomerCount']
    },

    dasherCount () {
      return this.$store.getters['adminDasherModule/getDasherCount']
    },

    merchantCount () {
      return this.$store.getters['adminMerchantModule/getMerchantCount']
    },

    annualTransaction () {
      return this.$store.getters['adminTransactionModule/getAnnualTransactionCount']
    },

    monthlyTransaction () {
      return this.$store.getters['adminTransactionModule/getMonthlyTransactionCount']
    },

    annualRevenue () {
      return this.$store.getters['adminRevenueModule/getTotalAnnualRevenue']
    },

    monthlyRevenue () {
      return this.$store.getters['adminRevenueModule/getTotalMonthlyRevenue']
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>
