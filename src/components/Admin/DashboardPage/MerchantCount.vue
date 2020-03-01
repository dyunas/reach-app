<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card col"
    >
      <q-card-section>
        <q-item-label class="text-weight-bold">Merchant Count</q-item-label>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-right">
        <span class="text-h4 text-weight-thin">
          {{ this.count }}
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
    count: {
      type: Number,
      required: true
    }
  },

  data () {
    return {}
  }
}
</script>
