<template>
  <div class="items-start q-gutter-md row">
    <q-card
      flat
      bordered
      class="my-card col"
    >
      <q-card-section>
        <q-item-label class="text-weight-bold">Annual Transactions</q-item-label>
        <q-item-label caption>Transactions made through app</q-item-label>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-right">
        <span class="text-h4 text-weight-thin">
          {{ this.annualCount }}
        </span>
        <!-- <q-inner-loading :showing="visible">
            <q-spinner-bars
              size="50px"
              color="primary"
            />
          </q-inner-loading> -->
      </q-card-section>
    </q-card>

    <q-card
      flat
      bordered
      class="my-card col"
    >
      <q-card-section>
        <q-item-label class="text-weight-bold">Monthly Transactions</q-item-label>
        <q-item-label caption>Transactions made through app: {{ this.month[new Date().getMonth()] }} 2020</q-item-label>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-right">
        <span class="text-h4 text-weight-thin">
          {{ this.monthlyCount }}
        </span>
        <!-- <q-inner-loading :showing="visible">
            <q-spinner-bars
              size="50px"
              color="primary"
            />
          </q-inner-loading> -->
      </q-card-section>
    </q-card>
  </div class="items-start q-gutter-md">
</template>

<script>
export default {
  props: {
    month: {
      type: Array,
      required: true
    },

    annualCount: {
      type: Number,
      requried: true
    },

    monthlyCount: {
      type: Number,
      required: true
    }
  },

  data () {
    return {}
  }
}
</script>
