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
          PHP 45,570,000.00
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
          PHP 3,797,500.00
        </span>
        <!-- <q-inner-loading :showing="visible">
            <q-spinner-bars
              size="50px"
              color="primary"
            />
          </q-inner-loading> -->
      </q-card-section>
    </q-card>
  </div class="items-start q-gutter-md row">
</template>

<script>
export default {
  props: {
    month: {
      type: Array,
      required: true
    }
  },

  data () {
    return {}
  }
}
</script>
