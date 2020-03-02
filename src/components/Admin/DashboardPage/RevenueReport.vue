<template>
  <div class="items-start q-gutter-md row">
    <q-card
      flat
      bordered
      class="my-card col"
    >
      <q-card-section>
        <q-item-label class="text-weight-bold">Annual Revenue</q-item-label>
        <q-item-label caption>Yearly generated revenue</q-item-label>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-right">
        <span class="text-h4 text-weight-thin">
          PHP {{ this.annualRevenue }}
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
        <q-item-label class="text-weight-bold">Monthly Revenue</q-item-label>
        <q-item-label caption>Monthly generated revenue: {{ this.month[new Date().getMonth()] }} 2020</q-item-label>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-right">
        <span class="text-h4 text-weight-thin">
          PHP {{ this.monthlyRevenue }}
        </span>
        <!-- <q-inner-loading :showing="visible">
            <q-spinner-bars
              size="50px"
              color="primary"
            />
          </q-inner-loading> -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    month: {
      type: Array,
      required: true
    },

    annualRevenue: {
      type: Number,
      required: true
    },

    monthlyRevenue: {
      type: Number,
      required: true
    }
  },

  data () {
    return {}
  }
}
</script>
